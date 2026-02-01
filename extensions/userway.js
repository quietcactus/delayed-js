/**
 * UserWay Extension for Delayed.js
 *
 * Usage: Add this to your delayed.js config and call setupUserWay() from initDelayedScripts()
 *
 * Add to config:
 *   useUserWay: true,
 *   userWayOptions: {
 *     account: '9bypO3Ua9N',  // Your UserWay account ID
 *     position: 5,
 *     color: '#2d68ff',
 *     type: '1'
 *   }
 *
 * Add to initDelayedScripts():
 *   setupUserWay();
 */

/**
 * Initialize UserWay accessibility widget
 * Requires: config.useUserWay to be true
 */
function setupUserWay() {
  if (!config.useUserWay) return;

  log('Setting up UserWay');

  // Default options
  var defaults = {
    account: '',
    position: 5,
    color: '#2d68ff',
    type: '1'
  };

  // Merge user options with defaults
  var options = config.userWayOptions || defaults;

  if (!options.account) {
    warn('UserWay account ID is required');
    return;
  }

  loadScript({
    src: 'https://cdn.userway.org/widget.js',
    appendTo: 'footer',
    attributes: {
      'data-account': options.account,
      'data-position': options.position,
      'data-color': options.color,
      'data-type': options.type
    }
  });
}
