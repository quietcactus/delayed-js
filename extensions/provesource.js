// Prove Source Constants
const proveSourceAPI = ""; // Add API Key for ProveSource
const proveSourceVersion = "0.0.4"; // Add version number for ProveSource (default: 0.0.4, see original script for version as needed)

// Prove Source Conditional Statement
if (proveSourceAPI) setupProveSource(window, document);

// Prove Source setup function (Add this to the bottom of the delayed.js)
// Load ProveSource script late
function setupProveSource(o, i) {
  console.log('Setup ProveSource');

  window.provesrc && window.console && console.error && console.error("ProveSource is included twice in this page."),
    provesrc = window.provesrc = {
      dq: [],
      display: function () {
        this.dq.push(arguments)
      }
    },
    o._provesrcAsyncInit = function () {
      provesrc.init({
        apiKey: proveSourceAPI,
        v: proveSourceVersion
      })
    };
  var r = i.createElement("script");
  r.type = "text/javascript",
    r.async = !0,
    r["ch" + "ar" + "set"] = "UTF-8",
    r.src = "https://cdn.provesrc.com/provesrc.js";
  var e = i.getElementsByTagName("script")[0];
  e.parentNode.insertBefore(r, e)
}