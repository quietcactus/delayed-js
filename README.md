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
```
### Turn features on/off
For Google Translate and ClickCease, set the switches:
```
const useCickCease = true;        // turn on ClickCease
const useGoogleTranslate = true;  // turn on Translate
```
For chats: fill the matching ID and the script will load it automatically.
For trackers (GA4, GTM, Pixel, Bing): fill the ID and it loads automatically.

## Comment out original scripts

Comment out original scripts in the header and footer that have been added to delayed.js to avoid the scripts loading in twice.

## Prove Source

Since Prove Source is very rarely used. It was removed from delayed.js and added to its own file. Please add the code to delayed.js as needed.
1. Add the Prove Source constants go near the top of the file with the rest of the constants.
2. Add the conditional statements inside of the `delayedScripts()` function.
3. Add the setup function at the end of the file.

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

### Console log

The `console.log()` in the functions should also appear in the console of dev tools after interaction with the page, and indicate if the scripts were loaded in correctly.

## Common Errors
- Check to make sure that when enqueuing the script, the [dependency parameter](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) is empty: `array()` NOT `array('jquery')`
- Duplicate tags: If GTM is enabled here, remove any hardcoded GTM elsewhere (or vice versa).
- WordPress caching/optimization plugins and WordPress Engine: Clear cache if the website has any caching plugins. Clear wordpress engine cache. 
