/**
 * posthog-pnu.js
 * PIP Navigator UK — PostHog Analytics
 * Version: 1.0.0 — 2 June 2026
 *
 * EVENTS TRACKED:
 *   page_view                — every page load
 *   gumroad_checkout_click   — paid Gumroad product link clicked
 *   free_guide_download_click — free guide Gumroad links clicked
 *
 * SESSION RECORDINGS: ON for all pages
 *
 * CONSENT: PostHog starts opted-out. Opts in when cookie consent accepted.
 *          Reads pnu_cookies_accepted from localStorage (set by cookie banner).
 *
 * DEPLOY: add one line to every page <head>:
 *   <script src="/posthog-pnu.js" defer></script>
 *   Then add posthog.opt_in_capturing() to the loadTracking() function.
 *
 * NOTE: Shares NIBN PostHog project key. Traffic is distinguished by
 *       $host property (pipnavigator.co.uk vs nibenefitsnavigator.com).
 *       Operator can create a separate PNU project later if desired.
 */

(function () {
  'use strict';

  // 1. POSTHOG LOADER
  !function (t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        2 == o.length && (t = t[o[0]], e = o[1]);
        t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
      }
      (p = t.createElement("script")).type = "text/javascript";
      p.crossOrigin = "anonymous";
      p.async = !0;
      p.src = s.api_host + "/static/array.js";
      (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
      var u = e;
      void 0 !== a ? u = e[a] = [] : a = "posthog";
      u.people = u.people || [];
      u.toString = function (t) {
        var e = "posthog";
        return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
      };
      u.people.toString = function () { return u.toString(1) + " (stub)"; };
      o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" ");
      for (n = 0; n < o.length; n++) g(u, o[n]);
      e._i.push([i, s, a]);
    }, e.__SV = 1);
  }(document, window.posthog || []);

  // 2. INIT — same project key as NIBN, filtered by $host in PostHog dashboard
  posthog.init('phc_AL3RmQ5ZjYpzfMpoSFwa57qPuqViTzPKej8qBkSMLhY6', {
    api_host: 'https://eu.i.posthog.com',
    autocapture: false,
    capture_pageview: false,
    opt_out_capturing_by_default: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
        email: true,
        text: true,
        textarea: true
      }
    },
    loaded: function (ph) {
      // Opt in if user already consented in a prior visit
      if (localStorage.getItem('pnu_cookies_accepted') === 'true') {
        ph.opt_in_capturing();
      }
    }
  });

  // 3. page_view — fires on every page
  posthog.capture('page_view', {
    path: window.location.pathname,
    referrer: document.referrer || 'direct',
    title: document.title,
    brand: 'pnu'
  });

  // 4. gumroad_checkout_click + free_guide_download_click
  var FREE_GUIDE_SLUGS = /free-uk-pip-guide/i;

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="gumroad.com"]');
    if (!link) return;

    var href = link.href;
    var slug = href.split('/').pop().split('?')[0];

    if (FREE_GUIDE_SLUGS.test(href)) {
      posthog.capture('free_guide_download_click', {
        product_slug: slug,
        page: window.location.pathname,
        brand: 'pnu'
      });
    } else {
      posthog.capture('gumroad_checkout_click', {
        product_slug: slug,
        page: window.location.pathname,
        brand: 'pnu'
      });
    }
  });

})();
