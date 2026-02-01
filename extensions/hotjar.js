/**
 * HotJar Extension for Delayed.js
 *
 * Usage: Add this to your delayed.js config and call setupHotJar() from initDelayedScripts()
 *
 * Add to config:
 *   hotJarID: "0000000"   // Format: '0000000' (HotJar tracking ID)
 *
 * Add to initDelayedScripts():
 *   setupHotJar();
 */

/**
 * Initialize HotJar analytics
 * Requires: config.hotJarID to be set
 */
function setupHotJar() {
  if (!config.hotJarID) return;

  log('Setting up HotJar: ' + config.hotJarID);

  // Initialize HotJar queue
  window.hj = window.hj || function() {
    (window.hj.q = window.hj.q || []).push(arguments);
  };

  window._hjSettings = {
    hjid: config.hotJarID,
    hjsv: 6
  };

  loadScript({
    src: 'https://static.hotjar.com/c/hotjar-' + config.hotJarID + '.js?sv=6',
    appendTo: 'head'
  });
}
