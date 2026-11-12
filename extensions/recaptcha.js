/**
 * Gravity Forms reCAPTCHA v2 (invisible) extension
 *
 * REQUIRES a functions.php snippet. Gravity Forms enqueues the reCAPTCHA API
 * itself (handle: gform_recaptcha). That tag must be suppressed so the API
 * only loads through setupRecaptcha() below. Add to the theme's functions.php
 * (or fold into an existing script_loader_tag filter such as ps_defer_scripts):
 *
 *   add_filter( 'script_loader_tag', function ( $tag, $handle ) {
 *     if ( 'gform_recaptcha' === $handle ) {
 *       return '';
 *     }
 *     return $tag;
 *   }, 10, 2 );
 *
 * Without the snippet, Gravity Forms loads reCAPTCHA on page load as usual and
 * this extension adds nothing but a second copy of the API.
 */

// reCAPTCHA Constants
// Global variable to prevent setupRecaptcha from running more than once (add near delayedScriptsInitialized)
let recaptchaInitialized = false;

// reCAPTCHA Interaction Listener (add inside the DOMContentLoaded listener)
// Load reCAPTCHA right away if the user interacts with a Gravity Form
['focusin', 'pointerdown'].forEach((type) => {
  document.addEventListener(type, (event) => {
    if (event.target.closest && event.target.closest('.gform_wrapper')) {
      setupRecaptcha();
    }
  }, { passive: true });
});

// reCAPTCHA Conditional Statement (add inside delayedScripts)
// setupRecaptcha checks for .ginput_recaptcha itself, no ID required
setupRecaptcha();

// reCAPTCHA setup function (Add this to the bottom of the delayed.js)
/**
 * Loads Google reCAPTCHA v2 (invisible) for Gravity Forms CAPTCHA fields
 * Core gform_recaptcha script tag is suppressed in functions.php (see top of file)
 * renderRecaptcha() is defined by Gravity Forms and renders each .ginput_recaptcha widget
 */
function setupRecaptcha() {
  if (recaptchaInitialized || !document.querySelector('.ginput_recaptcha')) {
    return;
  }
  recaptchaInitialized = true;

  window.psRecaptchaOnload = () => {
    if (typeof window.renderRecaptcha === 'function') {
      window.renderRecaptcha();
    }
  };

  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?hl=en&render=explicit&onload=psRecaptchaOnload';
  script.async = true;
  document.head.appendChild(script);
}
