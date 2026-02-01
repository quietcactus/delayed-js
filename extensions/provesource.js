/**
 * ProveSource Extension for Delayed.js
 *
 * Usage: Add this to your delayed.js config and call setupProveSource() from initDelayedScripts()
 *
 * Add to config:
 *   proveSourceAPI: "",        // Your ProveSource API key
 *   proveSourceVersion: "0.0.4" // ProveSource version (default: 0.0.4)
 *
 * Add to initDelayedScripts():
 *   setupProveSource();
 */

/**
 * Initialize ProveSource social proof notifications
 * Requires: config.proveSourceAPI to be set
 */
function setupProveSource() {
  if (!config.proveSourceAPI) return;

  log('Setting up ProveSource: ' + config.proveSourceAPI);

  var apiKey = config.proveSourceAPI;
  var version = config.proveSourceVersion || '0.0.4';

  // Check if already loaded
  if (window.provesrc) {
    warn('ProveSource is already loaded on this page');
    return;
  }

  // Initialize ProveSource object
  window.provesrc = {
    dq: [],
    display: function() {
      this.dq.push(arguments);
    }
  };

  // Set up the async init callback
  window._provesrcAsyncInit = function() {
    window.provesrc.init({
      apiKey: apiKey,
      v: version
    });
  };

  loadScript({
    src: 'https://cdn.provesrc.com/provesrc.js',
    attributes: {
      charset: 'UTF-8'
    }
  });
}
