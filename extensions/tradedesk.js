// Trade Desk Constants
const tradeDeskAdvertiserID = ""; // Format: aa00a0a (Trade Desk advertiser ID)
const tradeDeskPixelIDs = []; // Format: ["aaaa00a"] (Trade Desk Universal Pixel IDs, one or more)

// Trade Desk Conditional Statement
if (tradeDeskAdvertiserID && tradeDeskPixelIDs.length) setupTradeDesk();

// Trade Desk setup function (Add this to the bottom of the delayed.js)
// Load Trade Desk Universal Pixel late
function setupTradeDesk() {
  console.log('Setup Trade Desk with advertiser ID ' + tradeDeskAdvertiserID);

  // The queue and both pushes must exist before up_loader is injected,
  // it drains ttdConversionEventsLayer as soon as it executes
  window.ttdConversionEventsLayer = window.ttdConversionEventsLayer || [];
  function ttdConversionEvents() {
    window.ttdConversionEventsLayer.push(arguments);
  }

  const payload = {
    advertiserId: tradeDeskAdvertiserID,
    pixelIds: tradeDeskPixelIDs
  };

  ttdConversionEvents("init", payload);
  ttdConversionEvents("event", payload);

  const script = document.createElement('script');
  script.src = 'https://js.adsrvr.org/up_loader.3.0.0.js';
  script.async = true;

  document.getElementsByTagName('body')[0].appendChild(script);
}
