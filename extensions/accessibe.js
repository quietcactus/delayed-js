/**
 * Accessibe Extension for Delayed.js
 *
 * Usage: Add this to your delayed.js config and call setupAccessibe() from initDelayedScripts()
 *
 * Add to config:
 *   useAccessibe: true,
 *   accessibeOptions: {
 *     statementLink: '',
 *     footerHtml: 'ADA Website Access',
 *     hideMobile: false,
 *     hideTrigger: false,
 *     language: 'en',
 *     position: 'right',
 *     leadColor: '#146ff8',
 *     triggerColor: '#146ff8',
 *     triggerRadius: '50%',
 *     triggerPositionX: 'right',
 *     triggerPositionY: 'center',
 *     triggerIcon: 'people',
 *     triggerSize: 'medium',
 *     triggerOffsetX: 20,
 *     triggerOffsetY: 49
 *   }
 *
 * Add to initDelayedScripts():
 *   setupAccessibe();
 */

/**
 * Initialize Accessibe accessibility widget
 * Requires: config.useAccessibe to be true
 */
function setupAccessibe() {
  if (!config.useAccessibe) return;

  log('Setting up Accessibe');

  // Default options
  var defaultOptions = {
    statementLink: '',
    footerHtml: 'ADA Website Access',
    hideMobile: false,
    hideTrigger: false,
    disableBgProcess: false,
    language: 'en',
    position: 'right',
    leadColor: '#146ff8',
    triggerColor: '#146ff8',
    triggerRadius: '50%',
    triggerPositionX: 'right',
    triggerPositionY: 'center',
    triggerIcon: 'people',
    triggerSize: 'medium',
    triggerOffsetX: 20,
    triggerOffsetY: 49,
    mobile: {
      triggerSize: 'small',
      triggerPositionX: 'right',
      triggerPositionY: 'center',
      triggerOffsetX: 10,
      triggerOffsetY: 20,
      triggerRadius: '50%'
    }
  };

  // Merge user options with defaults
  var options = config.accessibeOptions || defaultOptions;

  loadScript({
    src: 'https://acsbapp.com/apps/app/dist/js/app.js',
    appendTo: 'head',
    onload: function() {
      if (window.acsbJS && window.acsbJS.init) {
        window.acsbJS.init(options);
      }
    }
  });
}
