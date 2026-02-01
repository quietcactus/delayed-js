/**
 * Loads scripts/features in a deferred manner for WordPress sites
 * @version 2.0.0
 *
 * Optimizations:
 * - IIFE pattern to avoid global scope pollution
 * - Event listeners removed after first trigger
 * - Timeout cleared on user interaction
 * - Reusable script loader with error handling
 * - Configurable debug mode
 * - Better code readability
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  var config = {
    // Debug mode - set to false for production
    debug: false,

    // DATA AND ANALYTICS SERVICES
    googleAnalyticsV4ID: "",      // Format: 'G-0000000000' (Google Analytics 4 – gtag.js)
    googleTagManagerID: "",       // Format: 'GTM-0000000' (Google Tag Manager)
    googleAdsID: "",              // Format: 'AW-000000000' (Google Ads)
    googleCallMetricsID: "",      // Format: 'AW-000000000/00000000000000000000'
    googleCallMetricsPhone1: "",  // Format: '1-000-000-0000'
    googleCallMetricsPhone2: "",  // Format: '1-000-000-0000'
    googleLeadConversionID: "",   // Format: 'AW-000000000/00000000000000000000'
    googleLeadConversionValue: 1.0,
    googleLeadConversionCurrency: 'USD',
    facebookPixelID: "",          // Format: '000000000000000'
    bingConversionID: "",         // Format: '000000000'

    // CONDITIONAL SERVICES
    useClickCease: false,
    useGoogleTranslate: false,

    // CHAT SERVICES
    ngageChatID: "",              // Format: '0-000-000-000-000-000-000-000'
    olarkChatID: "",              // Format: '0000-000-00-0000'
    apexLiveChatID: "",           // Format: 'companyname'
    intakerChatID: "",            // Format: 'sitename'
    juvoLeadsChatID: "",          // Format: '0000000000'
    hubspotChatID: "",            // Format: '00000000'

    // TIMING
    delayTimeout: 5000            // Milliseconds before auto-loading scripts
  };

  // ============================================
  // INTERNAL STATE
  // ============================================

  var initialized = false;
  var delayedTimeout = null;
  var eventListeners = [];

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Conditional logging based on debug mode
   */
  function log(message) {
    if (config.debug && window.console && console.log) {
      console.log('[Delayed.js] ' + message);
    }
  }

  /**
   * Log warnings (always shown)
   */
  function warn(message) {
    if (window.console && console.warn) {
      console.warn('[Delayed.js] ' + message);
    }
  }

  /**
   * Reusable script loader with error handling
   * @param {Object} options - Script loading options
   * @param {string} options.src - Script source URL
   * @param {boolean} [options.async=true] - Load asynchronously
   * @param {boolean} [options.defer=false] - Defer loading
   * @param {Function} [options.onload] - Callback on successful load
   * @param {Function} [options.onerror] - Callback on error
   * @param {string} [options.appendTo='body'] - Where to append ('head', 'body', 'footer')
   * @param {Object} [options.attributes] - Additional attributes to set
   * @returns {HTMLScriptElement} The created script element
   */
  function loadScript(options) {
    var script = document.createElement('script');
    script.src = options.src;
    script.async = options.async !== false;

    if (options.defer) {
      script.defer = true;
    }

    if (options.onload) {
      script.onload = options.onload;
    }

    script.onerror = function() {
      warn('Failed to load script: ' + options.src);
      if (options.onerror) {
        options.onerror();
      }
    };

    // Set additional attributes
    if (options.attributes) {
      for (var key in options.attributes) {
        if (options.attributes.hasOwnProperty(key)) {
          script.setAttribute(key, options.attributes[key]);
        }
      }
    }

    // Determine parent element with fallbacks
    var parent = document.body;
    if (options.appendTo === 'head') {
      parent = document.head || document.getElementsByTagName('head')[0] || document.body;
    } else if (options.appendTo === 'footer') {
      parent = document.getElementsByTagName('footer')[0] || document.body;
    }

    parent.appendChild(script);
    return script;
  }

  /**
   * Create a noscript fallback element
   * @param {string} innerHTML - Content for noscript tag
   * @param {string} [appendTo='body'] - Where to append
   */
  function createNoscript(innerHTML, appendTo) {
    var noscript = document.createElement('noscript');
    noscript.innerHTML = innerHTML;

    var parent = document.body;
    if (appendTo === 'head') {
      parent = document.head || document.getElementsByTagName('head')[0] || document.body;
    }

    parent.appendChild(noscript);
    return noscript;
  }

  /**
   * Remove all registered event listeners
   */
  function removeEventListeners() {
    for (var i = 0; i < eventListeners.length; i++) {
      var listener = eventListeners[i];
      document.removeEventListener(listener.event, listener.handler);
    }
    eventListeners = [];
  }

  // ============================================
  // SERVICE SETUP FUNCTIONS
  // ============================================

  /**
   * Initialize Google Analytics 4
   */
  function setupGoogleAnalytics() {
    if (!config.googleAnalyticsV4ID) {
      log('Google Analytics ID not configured');
      return;
    }

    log('Setting up Google Analytics: ' + config.googleAnalyticsV4ID);

    loadScript({
      src: 'https://www.googletagmanager.com/gtag/js?id=' + config.googleAnalyticsV4ID,
      defer: true,
      onload: function() {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

        gtag('js', new Date());

        // Configure GA4
        gtag('config', config.googleAnalyticsV4ID);

        // Configure Google Ads if set
        if (config.googleAdsID) {
          gtag('config', config.googleAdsID);
        }

        // Configure Call Metrics
        if (config.googleCallMetricsID) {
          if (config.googleCallMetricsPhone1) {
            gtag('config', config.googleCallMetricsID, {
              'phone_conversion_number': config.googleCallMetricsPhone1
            });
          }
          if (config.googleCallMetricsPhone2) {
            gtag('config', config.googleCallMetricsID, {
              'phone_conversion_number': config.googleCallMetricsPhone2
            });
          }
        }

        // Track Lead Conversion
        if (config.googleLeadConversionID) {
          gtag('event', 'conversion', {
            'send_to': config.googleLeadConversionID,
            'value': config.googleLeadConversionValue,
            'currency': config.googleLeadConversionCurrency
          });
        }
      }
    });
  }

  /**
   * Initialize Google Tag Manager
   */
  function setupGoogleTagManager() {
    if (!config.googleTagManagerID) return;

    log('Setting up Google Tag Manager: ' + config.googleTagManagerID);

    var gtmId = config.googleTagManagerID;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Load GTM script
    loadScript({
      src: 'https://www.googletagmanager.com/gtm.js?id=' + gtmId,
      appendTo: 'head'
    });

    // Create noscript iframe fallback
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + gtmId;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';

    var noscript = document.createElement('noscript');
    noscript.appendChild(iframe);

    if (document.body.firstChild) {
      document.body.insertBefore(noscript, document.body.firstChild);
    } else {
      document.body.appendChild(noscript);
    }
  }

  /**
   * Initialize Facebook Pixel
   */
  function setupFacebookPixel() {
    if (!config.facebookPixelID) return;

    log('Setting up Facebook Pixel: ' + config.facebookPixelID);

    var pixelId = config.facebookPixelID;

    // Initialize fbq
    if (window.fbq) return;

    var fbq = window.fbq = function() {
      fbq.callMethod ?
        fbq.callMethod.apply(fbq, arguments) :
        fbq.queue.push(arguments);
    };

    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];

    loadScript({
      src: 'https://connect.facebook.net/en_US/fbevents.js',
      onload: function() {
        window.fbq('init', pixelId, {}, {
          'agent': 'wordpress-delayed-js'
        });
        window.fbq('track', 'PageView', []);
      }
    });

    // Noscript fallback
    createNoscript(
      '<img height="1" width="1" style="display:none" alt="fbpx" ' +
      'src="https://www.facebook.com/tr?id=' + pixelId + '&ev=PageView&noscript=1" />',
      'head'
    );
  }

  /**
   * Initialize Bing Conversion Tracking
   */
  function setupBingConversion() {
    if (!config.bingConversionID) return;

    log('Setting up Bing Conversion: ' + config.bingConversionID);

    var tagId = config.bingConversionID;
    window.uetq = window.uetq || [];

    loadScript({
      src: '//bat.bing.com/bat.js',
      onload: function() {
        var uetConfig = { ti: tagId };
        uetConfig.q = window.uetq;
        window.uetq = new UET(uetConfig);
        window.uetq.push('pageLoad');
      }
    });
  }

  /**
   * Initialize Ngage Chat
   */
  function setupNgageChat() {
    if (!config.ngageChatID) return;

    log('Setting up Ngage Chat: ' + config.ngageChatID);

    loadScript({
      src: 'https://messenger.ngageics.com/ilnksrvr.aspx?websiteid=' + config.ngageChatID
    });
  }

  /**
   * Initialize Olark Chat
   */
  function setupOlarkChat() {
    if (!config.olarkChatID) return;

    log('Setting up Olark Chat: ' + config.olarkChatID);

    var olarkId = config.olarkChatID;

    // Initialize Olark object
    var olark = window.olark = function() {
      olark._.s.push(arguments);
      olark._.t.push(+new Date);
    };

    olark.extend = function(i, j) { olark('extend', i, j); };
    olark.identify = function(i) { olark('identify', olark._.i = i); };
    olark.configure = function(i, j) { olark('configure', i, j); olark._.c[i] = j; };

    olark._ = {
      s: [],
      t: [+new Date],
      c: {},
      l: 'static.olark.com/jsclient/loader.js'
    };

    loadScript({
      src: '//static.olark.com/jsclient/loader.js',
      onload: function() {
        window.olark.identify(olarkId);
      }
    });
  }

  /**
   * Initialize Apex Chat
   */
  function setupApexChat() {
    if (!config.apexLiveChatID) return;

    log('Setting up Apex Chat: ' + config.apexLiveChatID);

    loadScript({
      src: '//www.apex.live/scripts/invitation.ashx?company=' + config.apexLiveChatID
    });
  }

  /**
   * Initialize Hubspot Chat
   */
  function setupHubspotChat() {
    if (!config.hubspotChatID) return;

    log('Setting up Hubspot Chat: ' + config.hubspotChatID);

    loadScript({
      src: 'https://js.hs-scripts.com/' + config.hubspotChatID + '.js'
    });
  }

  /**
   * Initialize Intaker Chat
   */
  function setupIntakerChat() {
    if (!config.intakerChatID) return;

    log('Setting up Intaker Chat: ' + config.intakerChatID);

    window.Intaker = window.Intaker || {};
    window.Intaker.odl = config.intakerChatID;

    loadScript({
      src: 'https://intaker.azureedge.net/widget/chat.min.js'
    });
  }

  /**
   * Initialize Juvo Leads
   */
  function setupJuvoLeads() {
    if (!config.juvoLeadsChatID) return;

    log('Setting up Juvo Leads: ' + config.juvoLeadsChatID);

    // Cache busting parameter
    var cacheBuster = Math.floor(Math.random() * 9999999999);

    loadScript({
      src: 'https://cdn.juvoleads.com/tag/' + config.juvoLeadsChatID + '.js?v=' + cacheBuster,
      appendTo: 'footer'
    });
  }

  /**
   * Initialize ClickCease
   */
  function setupClickCease() {
    if (!config.useClickCease) return;

    log('Setting up ClickCease');

    loadScript({
      src: 'https://www.clickcease.com/monitor/stat.js',
      appendTo: 'head'
    });

    // Noscript fallback
    createNoscript(
      '<a href="https://www.clickcease.com">' +
      '<img src="https://monitor.clickcease.com/stats/stats.aspx" alt="Click Fraud Protection" />' +
      '</a>'
    );
  }

  /**
   * Initialize Google Translate
   * Note: This is for custom implementations, not the WordPress plugin
   */
  function setupGoogleTranslate() {
    if (!config.useGoogleTranslate) return;

    log('Setting up Google Translate');

    // Define the init function globally
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'cy,de,es,fr,hi,it,nl,no,ru,tr,zh-CN',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        gaTrack: config.googleAnalyticsV4ID ? true : false,
        gaId: config.googleAnalyticsV4ID || ''
      }, 'google_translate_element');
    };

    loadScript({
      src: 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
      appendTo: 'footer'
    });
  }

  // ============================================
  // MAIN INITIALIZATION
  // ============================================

  /**
   * Main function to load all delayed scripts
   */
  function initDelayedScripts() {
    // Prevent multiple initializations
    if (initialized) return;
    initialized = true;

    // Clear the timeout if it's still pending
    if (delayedTimeout) {
      clearTimeout(delayedTimeout);
      delayedTimeout = null;
    }

    // Remove event listeners to free memory
    removeEventListeners();

    log('Initializing delayed scripts...');

    // Analytics & Tracking
    setupGoogleAnalytics();
    setupGoogleTagManager();
    setupFacebookPixel();
    setupBingConversion();

    // Chat Services
    setupNgageChat();
    setupOlarkChat();
    setupApexChat();
    setupHubspotChat();
    setupIntakerChat();
    setupJuvoLeads();

    // Conditional Services
    setupClickCease();
    setupGoogleTranslate();

    log('Delayed scripts initialization complete');
  }

  /**
   * Register event listener and track it for cleanup
   */
  function addTrackedEventListener(eventName) {
    var handler = function() {
      initDelayedScripts();
    };

    document.addEventListener(eventName, handler, { passive: true });
    eventListeners.push({ event: eventName, handler: handler });
  }

  /**
   * Bootstrap the delayed loading
   */
  function bootstrap() {
    // Events that trigger script loading
    var triggerEvents = [
      'scroll',
      'mousemove',
      'touchstart',
      'keydown',    // For keyboard navigation
      'click'       // For immediate interactions
    ];

    // Register event listeners
    for (var i = 0; i < triggerEvents.length; i++) {
      addTrackedEventListener(triggerEvents[i]);
    }

    // Fallback: load after timeout using requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(function() {
        delayedTimeout = setTimeout(initDelayedScripts, config.delayTimeout);
      }, { timeout: 1000 });
    } else {
      delayedTimeout = setTimeout(initDelayedScripts, config.delayTimeout);
    }

    log('Delayed.js bootstrapped, waiting for user interaction or ' + config.delayTimeout + 'ms timeout');
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    // DOM already loaded
    bootstrap();
  }

  // Expose config for external modification if needed
  window.delayedJsConfig = config;

})();
