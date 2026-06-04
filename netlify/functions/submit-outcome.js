// PNU Outcomes — Supabase only (no Airtable for PNU)
// Accepts outcomes from PNU form (brand='pnu')

var CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://pipnavigator.co.uk',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' };
  }

  var body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!body.outcome_type) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing required field: outcome_type' }) };
  }

  if (!body.consent_confirmed) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Explicit consent is required to submit outcomes data' }) };
  }

  var SUPABASE_URL = process.env.SUPABASE_URL;
  var SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log(JSON.stringify({ fn: 'submit-outcome-pnu', error: 'Missing SUPABASE env vars' }));
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  var row = {
    brand:              'pnu',
    email:              null,
    product:            body.product || null,
    condition_category: body.condition_category || null,
    claim_stage:        body.claim_stage || null,
    outcome_type:       body.outcome_type,
    award_result:       body.award_result || null,
    notes:              body.notes ? String(body.notes).slice(0, 500) : null,
    source_url:         body.source_url || null,
    utm_source:         body.utm_source || null,
    utm_medium:         body.utm_medium || null,
    utm_campaign:       body.utm_campaign || null,
    consent_confirmed:  !!body.consent_confirmed,
    consent_timestamp:  new Date().toISOString(),
    consent_wording_version: body.consent_wording_version || null
  };

  var log = { fn: 'submit-outcome-pnu', ts: new Date().toISOString() };

  try {
    var res = await fetch(SUPABASE_URL + '/rest/v1/outcomes', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (res.ok || res.status === 201) {
      log.supabase = 'ok';
      console.log(JSON.stringify(log));
      return {
        statusCode: 200,
        headers: Object.assign({ 'Content-Type': 'application/json' }, CORS_HEADERS),
        body: JSON.stringify({ ok: true })
      };
    }

    var errText = await res.text();
    log.supabase = 'error: ' + res.status + ' ' + errText.slice(0, 200);
    console.log(JSON.stringify(log));
    return {
      statusCode: 500,
      headers: Object.assign({ 'Content-Type': 'application/json' }, CORS_HEADERS),
      body: JSON.stringify({ error: 'Database error' })
    };
  } catch (e) {
    log.supabase = 'exception: ' + e.message;
    console.log(JSON.stringify(log));
    return {
      statusCode: 500,
      headers: Object.assign({ 'Content-Type': 'application/json' }, CORS_HEADERS),
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
