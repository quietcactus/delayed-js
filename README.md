# delayed-js

Waits until a visitor interacts with the page (scroll/move/touch) or 5 seconds pass.

Then it loads the tracking/marketing/chat tools you turned on (Google Analytics 4, GTM, Facebook Pixel, Bing, chat widgets, etc.).

This defers non-essential scripts so pages feel faster.

# How to use

## Create the `delayed.js` file 
Create `delayed.js` inside of the `/js/` folder when using SFTP.

If it exists already, make sure its up to date with the code from above. If it doesn't match, then just replace the existing code with the code above.

### How to copy the code above

1. Near the top of the code snippet, press `Raw`
2. Press `CTRL + A`  to select all
3. Press `CTRL + C` to copy all the selected text
4. Press `CTRL + V` to paste the copied text in the JS file

## Load `delayed.js` on the site
Enqueue the `delayed.js` file to within the file `functions.php`. There should be a bunch of other enqueues for other files. Add this code next to the other enqueued files. 

```
// Delayed scripts including analytics
wp_enqueue_script('delayed-scripts', get_template_directory_uri() . '/js/delayed.js', array(), $cachedVersion);
```

The `$cachedVersion` variable may not be present on every website. If it is not present, this can be resolved by updating it to the current version of the delayed.js file:

```
// Delayed scripts including analytics
wp_enqueue_script('delayed-scripts', get_template_directory_uri() . '/js/delayed.js', array(), '1.7.46');
```

### Example of where to add the code:

```
/**
 * Enqueues files in the footer for improved performance
 */
function ps_enqueue_late()
{
	global $cachedVersion;

        . . .

	// Main JavaScript file
	// Sequence of script loading matters, or expect undefined function errors
	wp_enqueue_script('main-js', get_template_directory_uri() . '/js/main.js', array('jquery'), $cachedVersion);

	// Contact form and reCAPTCHA processing
	wp_enqueue_script('contact-js', get_template_directory_uri() . '/js/contact.js', array('jquery'), $cachedVersion);

	// Header lazy search script
	wp_enqueue_script('header-search-js', get_template_directory_uri() . '/js/headerSearch.js', array('jquery'), $cachedVersion);

	// Delayed scripts including analytics
	wp_enqueue_script('delayed-scripts', get_template_directory_uri() . '/js/delayed.js', array(), $cachedVersion);

       . . .
}
add_action('get_footer', 'ps_enqueue_late');
```
If we need to, we can always create a new enqueue function and `add_action()`
```
function delayed_js_enqueue() {
  wp_enqueue_script( 'delayed-scripts', get_template_directory_uri() .'/js/delayed.js', array(), '1.7.46');
}
add_action('get_footer', 'delayed_js_enqueue');
```

## Add IDs For Needed Services
Near the top of the file there the IDs for the different services are stored in variables. Fill in the ones that are needed on the site between the quotes

```
// DATA AND ANALYTICS SERVICES
const googleAnalyticsV4ID = ""; // Format: 'G-0000000000 (Google Analytics 4 – gtag.js)
const googleTagManagerID = ""; // Format: GTM-0000000 (Google Tag Manager)
const googleAdsID = ""; // Format AW-000000000 (Google Ads). Multiple: "AW-000000000, AW-111111111" or ["AW-000000000", "AW-111111111"]
const googleCallMetricsID = ""; // Format AW-000000000/00000000000000000000 (Google Call Metrics ID, associated with Google Ads). Accepts multiple, comma separated or as an array
const googleCallMetricsPhone1 = ""; // Format 1-000-000-0000 (Google Call Metrics Phone Number)
const googleCallMetricsPhone2 = "";// Format 1-000-000-0000 (Google Call Metrics Phone Number)
const googleLeadConversionID = ""; // Format AW-000000000/00000000000000000000 (Google Lead Conversion ID, associated with Google Ads). Accepts multiple, comma separated or as an array. Note: fires on every page load, see README
const googleLeadConversionValue = 1.0; // Decimal value, 1.0 set by default. Update as needed
const googleLeadConversioncurrency = 'USD'; // Currency, USD set by default. Update as needed
const facebookPixelID = ""; // Format: 000000000000000 (Facebook pixel tracking)
const bingConversionID = ""; // Format: 000000000 (Bing conversion tracking)
const linkedInPartnerID = ""; // Format: 000000000 (LinkedIn Insight Tag partner ID)
const tiktokPixelID = ""; // Format: 00000000000000000000 (TikTok Pixel ID, also called the sdkid)
const redditPixelID = ""; // Format: a2_000000000000 (Reddit Pixel ID)

// CONDITIONAL SERVICES
const useCickCease = false; // True or false to enable/disable (ClickCease)
const useGoogleTranslate = false; // True or false to enable/disable (Google Translate)

// CHAT SERVICES
const ngageChatID = ""; // Format: 0-000-000-000-000-000-000-000 (Ngage live chat)
const oClarkChatID = ""; // Format: 0000-000-00-0000 (Olark live chat)
const apexLiveChatID = ""; // Format: String, as in "companyname" (Apex live chat)
const intakerChatID = ""; // Format: sitename (Intaker live chat)
const juvoLeadsChatID = ""; // Format: 0000000000 (Juvo Leads live Chat)  
```
### Turn features on/off
For Google Translate and ClickCease, set the switches:
```
const useCickCease = true;        // turn on ClickCease
const useGoogleTranslate = true;  // turn on Translate
```
For chats: fill the matching ID and the script will load it automatically.
For trackers (GA4, GTM, Pixel, Bing, LinkedIn, TikTok, Reddit): fill the ID and it loads automatically.

### Multiple Google Ads IDs

`googleAdsID`, `googleCallMetricsID`, and `googleLeadConversionID` each accept more than one ID. Use either a comma separated string or an array — both work the same way:

```
// Comma separated
const googleAdsID = "AW-111111111, AW-222222222";

// Or as an array
const googleAdsID = ["AW-111111111", "AW-222222222"];
```

Spacing does not matter, each value is trimmed and empty values are dropped. Every ID gets its own `gtag('config', ...)` call, and only one gtag loader is requested for all of them.

To confirm all of the IDs were picked up, check the console after interacting with the page. The log prints the full resolved list:

```
Setup gtag with IDs G-ABC1234567, AW-111111111, AW-222222222
```

If an ID is missing from that line, it was empty or malformed in the const.

**Note:** gtag now loads whenever *either* `googleAnalyticsV4ID` or `googleAdsID` is filled in. Previously it was skipped entirely when `googleAnalyticsV4ID` was empty, so sites running Google Ads without GA4 were not firing anything. Those sites will begin reporting conversions once this version is deployed — annotate the Google Ads account on the deploy date.

## Comment out original scripts

Comment out original scripts in the header and footer that have been added to delayed.js to avoid the scripts loading in twice.

## Prove Source

Since Prove Source is very rarely used. It was removed from delayed.js and added to its own file. Please add the code to delayed.js as needed.
1. Add the Prove Source constants go near the top of the file with the rest of the constants.
2. Add the conditional statements inside of the `delayedScripts()` function.
3. Add the setup function at the end of the file.

## Trade Desk

The Trade Desk is a programmatic DSP that is only bought through an agency or trading desk, so it is rarely used on these sites. It lives in `extensions/tradedesk.js` rather than the main file. Add the code to delayed.js as needed.
1. Add the Trade Desk constants near the top of the file with the rest of the constants.
2. Add the conditional statement inside of the `delayedScripts()` function.
3. Add the setup function at the end of the file.

`tradeDeskPixelIDs` is an array because the vendor tag itself takes a list. Even with a single pixel it stays in brackets:

```
const tradeDeskAdvertiserID = "ah37n9r";
const tradeDeskPixelIDs = ["fkwa03p"];
```

The conversion events queue and both the `init` and `event` pushes are set up **before** `up_loader.3.0.0.js` is injected. The loader drains that queue as soon as it executes, so do not reorder those lines or the pixel silently does nothing.

## Known Behavior / Future Work

### Lead conversions fire on every page load

`googleLeadConversionID` sends a gtag `conversion` event every time `delayedScripts()` runs — that is, on **every page view**, not on an actual form submission. This is long-standing behavior and is **intentionally unchanged** as of v1.10.0.

Reported conversion counts on any site using this const should be read as page views, not leads.

**Future work:** move the `gtag('event', 'conversion', ...)` call out of `setupGoogleAnalytics()` and into the contact form's success handler (`contact.js`), so it fires once per submitted lead. This will change reported numbers — annotate the Google Ads account on the day it ships.

## How to test if implementation was correct

1. Open your site in Chrome Incognito.
2. Reload the page and wait 5–10 seconds or scroll a little.
3. Use helpers if you have them:
    - Google Tag Assistant (Chrome extension)
    - Meta Pixel Helper
    - UET Tag Helper
4.  Confirm your chat bubble appears if you enabled a chat.
5. If something isn’t loading, re-check the ID format and make sure you didn’t also load the same tool somewhere else.

### Browser Extensions
- **Checking Google Tag / Google Analytics** **[Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk?hl=en)**
- **Checking Bing** [**UET Tag Helper (by Microsoft Advertising)**](https://chrome.google.com/webstore/detail/uet-tag-helper-by-microso/naijndjklgmffmpembnkfbcjbognokbf)
- **Checking Pixel** **[Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc?hl=en)**
- **Checking LinkedIn** **[Insight Tag Checker](https://chrome.google.com/webstore/detail/insight-tag-checker/feeednoflloccfhgoiiohjammanphoef)**
- **Checking TikTok** **[TikTok Pixel Helper](https://chromewebstore.google.com/detail/tiktok-pixel-helper/aelgobmabdmlfmiblddjfnjodalhidnn)**
- **Checking Reddit** **[Reddit Pixel Helper](https://chromewebstore.google.com/detail/reddit-pixel-helper/nmpldhkhcgjhpjfmiglldjcbdgocmefk)**

### Console log

The `console.log()` in the functions should also appear in the console of dev tools after interaction with the page, and indicate if the scripts were loaded in correctly.

## Common Errors
- Check to make sure that when enqueuing the script, the [dependency parameter](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) is empty: `array()` NOT `array('jquery')`
- Duplicate tags: If GTM is enabled here, remove any hardcoded GTM elsewhere (or vice versa). Same goes for the TikTok, Reddit, LinkedIn, and Trade Desk tags — check the header, the footer, **and** GTM, since these are commonly pasted into all three. Leaving a duplicate double counts page views and conversions, which distorts paid campaign bidding.
- WordPress caching/optimization plugins and WordPress Engine: Clear cache if the website has any caching plugins. Clear wordpress engine cache. 
