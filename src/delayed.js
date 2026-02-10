/**
 * Loads scripts/features in a deferred manner
 * @version 1.8.0
 */

// Global variable to prevent delayedScripts from running more than once
let delayedScriptsInitialized = false;

/**
 * Constant variables that are referenced within their respective functions
 * Enter IDs for services you plan to use.
 */

// DATA AND ANALYTICS SERVICES
const googleAnalyticsV4ID = ""; // Format: 'G-0000000000 (Google Analytics 4 – gtag.js)
const googleTagManagerID = ""; // Format: GTM-0000000 (Google Tag Manager)
const googleAdsID = ""; // Format AW-000000000 (Google Ads)
const googleCallMetricsID = ""; // Format AW-000000000/00000000000000000000 (Google Call Metrics ID, associated with Google Ads)
const googleCallMetricsPhone1 = ""; // Format 1-000-000-0000 (Google Call Metrics Phone Number)
const googleCallMetricsPhone2 = "";// Format 1-000-000-0000 (Google Call Metrics Phone Number)
const googleLeadConversionID = ""; // Format AW-000000000/00000000000000000000 (Google Lead Conversion ID, associated with Google Ads)
const googleLeadConversionValue = 1.0; // Decimal value, 1.0 set by default. Update as needed
const googleLeadConversioncurrency = 'USD'; // Currency, USD set by default. Update as needed
const facebookPixelID = ""; // Format: 000000000000000 (Facebook pixel tracking)
const bingConversionID = ""; // Format: 000000000 (Bing conversion tracking)

// CONDITIONAL SERVICES
const useCickCease = false; // True or false to enable/disable (ClickCease)
const useGoogleTranslate = false; // True or false to enable/disable (Google Translate)

// CHAT SERVICES
const ngageChatID = ""; // Format: 0-000-000-000-000-000-000-000 (Ngage live chat)
const oClarkChatID = ""; // Format: 0000-000-00-0000 (Olark live chat)
const apexLiveChatID = ""; // Format: String, as in "companyname" (Apex live chat)
const intakerChatID = ""; // Format: sitename (Intaker live chat)
const juvoLeadsChatID = ""; // Format: 0000000000 (Juvo Leads live Chat)
const hubspotChatID = ""; // Format: 00000000 (Hubspot live chat)

// EXTENSION MODULES
// Enable/disable optional extension modules by setting to true/false
// Extensions are loaded from the ./extensions/ folder
const extensions = {
  // advancedTracking: false,  // Example: Advanced analytics tracking features
  // customChat: false,         // Example: Custom chat integrations
  // ecommerce: false,          // Example: E-commerce tracking features
}

// JavaScript code to execute after the DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  // Load script(s) after the user scrolls, moves the mouse, or touches the screen
  document.addEventListener('scroll', delayedScripts);
  document.addEventListener('mousemove', delayedScripts);
  document.addEventListener('touchstart', delayedScripts);

  setTimeout(function () {
    delayedScripts();
  }, 5000);
});

// Run scripts when user interacts with the page
function delayedScripts(event) {
  // Trigger this function only once
  if (delayedScriptsInitialized) return;

  setupGoogleAnalytics();

  // Execute functions based on the IDs above
  if (googleTagManagerID) setupGoogleTagManager(window, document, 'script', 'dataLayer', googleTagManagerID);
  if (facebookPixelID) setupPixel(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  if (bingConversionID) setupBingConversion(window, document, "script", "//bat.bing.com/bat.js", "uetq");

  if (ngageChatID) setupNgageChat("https://messenger.ngageics.com/ilnksrvr.aspx?websiteid=", document, "script", ngageChatID);
  if (oClarkChatID) setupOlarkChat(window, document, "static.olark.com/jsclient/loader.js");
  if (apexLiveChatID) setupApexChat();
  if (intakerChatID) setupIntaker(window, document, 'script', 'Intaker', intakerChatID);
  if (hubspotChatID) setupHubspotChat();
  if (juvoLeadsChatID) setupJuvoLeads()

  if (useCickCease) setupClickease();
  if (useGoogleTranslate) setupGoogleTranslate();

  // Load enabled extensions
  loadExtensions();

  // Set variable to true to prevent delayedScripts from rerunning
  delayedScriptsInitialized = true;
}

// Initializes Google Analytics
function setupGoogleAnalytics() {
  // Return if googleAnalyticsV4ID is not set
  if (!googleAnalyticsV4ID) {
    console.log('Analytics variable is not set!');
    return;
  }

  console.log('Setup analytics with ID ' + googleAnalyticsV4ID);

  // Create the script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    if (googleAnalyticsV4ID)
      gtag('config', googleAnalyticsV4ID);
    if (googleAdsID)
      gtag('config', googleAdsID);
    if (googleCallMetricsID && googleCallMetricsPhone1)
      gtag('config', googleCallMetricsID, {
        'phone_conversion_number': googleCallMetricsPhone1
      });
    if (googleCallMetricsID && googleCallMetricsPhone2)
      gtag('config', googleCallMetricsID, {
        'phone_conversion_number': googleCallMetricsPhone2
      });
    if (googleLeadConversionID)
      gtag('event', 'conversion', {
        'send_to': googleLeadConversionID,
        'value': googleLeadConversionValue,
        'currency': googleLeadConversioncurrency
      });
  }

  // Set the source of the script based on the variables above
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsV4ID;

  //Set attribute
  script.defer = true;

  // Append the script to the body of the document
  document.getElementsByTagName('body')[0].appendChild(script);
}

// Load chat feature late
function setupNgageChat(ng, a, g, e) {
  console.log('Setup Ngage with ID ' + ngageChatID);

  var l = document.createElement(g);
  l.async = 1;
  l.src = (ng + e);
  var c = a.getElementsByTagName(g)[0];
  c.parentNode.insertBefore(l, c);
}

// Load Olark chat late
function setupOlarkChat(o, l, a, r, k, y) {
  console.log('Setup Olark with ID ' + oClarkChatID);

  r = "script";
  y = l.createElement(r);
  r = l.getElementsByTagName(r)[0];
  y.async = 1;
  y.src = "//" + a;
  r.parentNode.insertBefore(y, r);
  y = o.olark = function () { k.s.push(arguments); k.t.push(+new Date) };
  y.extend = function (i, j) { y("extend", i, j) };
  y.identify = function (i) { y("identify", k.i = i) };
  y.configure = function (i, j) { y("configure", i, j); k.c[i] = j };
  k = y._ = { s: [], t: [+new Date], c: {}, l: a };

  olark.identify(oClarkChatID);
}

// Load Google Tag Manager late
function setupGoogleTagManager(w, d, s, l, i) {
  console.log('Setup Google Tag Manager ' + i);

  // Head script
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(), event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);

  // Body script
  const script = document.createElement('noscript');
  const iframe = document.createElement('iframe');

  iframe.src = "https://www.googletagmanager.com/ns.html?id=" + i;
  iframe.height = 0;
  iframe.width = 0;
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";

  // Move elements to correct locations
  script.appendChild(iframe);
  document.getElementsByTagName('body')[0].prepend(script);
}

// Load Pixel script late
function setupPixel(f, b, e, v, n, t, s) {
  console.log('Setup Pixel ' + facebookPixelID);

  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ?
      n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s)

  fbq('init', facebookPixelID, {}, {
    "agent": "wordpress-5.7.1-3.0.5"
  });

  fbq('track', 'PageView', []);

  const noScript = document.createElement('noscript');
  noScript.innerHTML += "<img height=\"1\" width=\"1\" style=\"display:none\" alt=\"fbpx\"src=\"https://www.facebook.com/tr?id=" + facebookPixelID + "&ev=PageView&noscript=1\" />";

  // Move elements to correct locations
  document.getElementsByTagName('head')[0].append(noScript);
}

// Load Bing Conversion script late
function setupBingConversion(w, d, t, r, u) {
  console.log('Setup Bing Conversion ' + bingConversionID);

  var f, n, i;
  w[u] = w[u] || [],
    f = function () {
      var o = { ti: bingConversionID };
      o.q = w[u],
        w[u] = new UET(o),
        w[u].push("pageLoad")
    },
    n = d.createElement(t),
    n.src = r,
    n.async = 1,
    n.onload = n.onreadystatechange = function () {
      var s = this.readyState;
      s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
    },
    i = d.getElementsByTagName(t)[0],
    i.parentNode.insertBefore(n, i)
}

// Load Apex Chat
function setupApexChat() {
  console.log('Setup Apex Chat with ID ' + apexLiveChatID);

  const script = document.createElement('script');
  script.src = '//www.apex.live/scripts/invitation.ashx?company=' + apexLiveChatID;
  script.async = true;

  // Add script to body
  document.getElementsByTagName('body')[0].appendChild(script);
}

// Load Hubspot Chat
function setupHubspotChat() {
  console.log('Setup Hubspot Chat with ID ' + hubspotChatID);
  const script = document.createElement('script');
  script.src = 'https://js.hs-scripts.com/' + hubspotChatID + '.js';
  script.async = true;
  document.getElementsByTagName('body')[0].appendChild(script);
}

// Load Intake chat service late
function setupIntaker(w, d, s, v, odl) {
  console.log('Intaker Loaded');

  (w[v] = w[v] || {})['odl'] = odl;
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  j.src = 'https://intaker.azureedge.net/widget/chat.min.js';
  f.parentNode.insertBefore(j, f);
}

/**
 * Load Google 
 script late
 * 
 * This function does not work with wordpress google translate plugin
 * This should only be used for custom google translate install. Example on https://www.thorntaxlaw.com/
 * 
 * HTML *
 * <li class="translator"><a href="#" class="translator-button"><i class="fab fa-language"></i></a>
 *    <div id="translator">
 *      <div id="google_translate_element"></div>
 *  </div>
 * </li>
 * 
 * If there is google tracking, the googleAnalyticsID should be filled in, or updated accordingly
 */
function setupGoogleTranslate() {
  console.log('Setup Google Translate');

  // Create script to add to the footer
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;

  // Create script for google translate init function to add to the footer
  const script2 = document.createElement('script');
  script2.innerHTML = function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: "cy,de,es,fr,hi,it,nl,no,ru,tr,zh-CN",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      gaTrack: !0,
      gaId: googleAnalyticsID || '',
    }, "google_translate_element")
  };
  script2.async = true;

  // Add google translate script to the footer, followed by the init function
  document.getElementsByTagName('footer')[0].appendChild(script);
  document.getElementsByTagName('footer')[0].appendChild(script2);
}

/** 
 * Load Clickease late
 * 
 * Does not require any global variables to be set. 
 * Just uncomment the function call to use
 *  */
function setupClickease() {
  console.log('Setup Clickease');

  // Create the script element
  var scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.type = "text/javascript";

  // Set the source of the script element
  var target = "https://www.clickcease.com/monitor/stat.js";
  scriptElement.src = target;

  // Append the script element to the head of the document
  var headElement = document.head || document.getElementsByTagName("head")[0];
  headElement.appendChild(scriptElement);

  // Create the noscript element
  var noscriptElement = document.createElement("noscript");

  // Create the anchor element and set its href attribute
  var anchorElement = document.createElement("a");
  anchorElement.href = "https://www.clickcease.com";

  // Create the image element, set its src and alt attributes, and append it to the anchor element
  var imageElement = document.createElement("img");
  imageElement.src = "https://monitor.clickcease.com/stats/stats.aspx";
  imageElement.alt = "Click Fraud Protection";
  anchorElement.appendChild(imageElement);

  // Append the anchor element to the noscript element
  noscriptElement.appendChild(anchorElement);

  // Append the noscript element to the body of the document
  document.body.appendChild(noscriptElement);
}

// Load Juvo Leads Tag script late
function setupJuvoLeads() {
  console.log('Setup Juvoleads');

  const script = document.createElement('script');
  script.src = 'https://cdn.juvoleads.com/tag/' + juvoLeadsChatID + '.js?v=' + Math.floor(Math.random() * 9999999999);
  script.async = true;

  // Add script to body
  document.getElementsByTagName('footer')[0].appendChild(script);
}

/**
 * Load Extension Modules
 *
 * Dynamically loads extension scripts based on the extensions configuration object.
 * Each extension should export an initialization function that will be called after the script loads.
 *
 * Extension file naming convention:
 * - Config key: "advancedTracking" -> File: "./extensions/advancedTracking.js"
 * - Config key: "customChat" -> File: "./extensions/customChat.js"
 *
 * Each extension file should define a global init function:
 * function initAdvancedTracking() { ... }
 * function initCustomChat() { ... }
 */
function loadExtensions() {
  // Check if extensions object exists and has enabled extensions
  if (!extensions || typeof extensions !== 'object') {
    return;
  }

  // Iterate through extension config
  Object.keys(extensions).forEach((extensionName) => {
    // Only load if extension is enabled
    if (extensions[extensionName] === true) {
      console.log('Loading extension: ' + extensionName);

      // Create script element
      const script = document.createElement('script');
      script.src = './extensions/' + extensionName + '.js';
      script.async = true;

      // Call initialization function after script loads
      script.onload = function() {
        // Construct the init function name (e.g., "initAdvancedTracking")
        const initFunctionName = 'init' + extensionName.charAt(0).toUpperCase() + extensionName.slice(1);

        // Call the init function if it exists
        if (typeof window[initFunctionName] === 'function') {
          console.log('Initializing extension: ' + extensionName);
          window[initFunctionName]();
        } else {
          console.warn('Extension loaded but init function not found: ' + initFunctionName);
        }
      };

      // Handle load errors
      script.onerror = function() {
        console.error('Failed to load extension: ' + extensionName);
      };

      // Append script to document
      document.body.appendChild(script);
    }
  });
}