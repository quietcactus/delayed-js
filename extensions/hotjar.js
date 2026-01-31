// HotJar Constants
const hotJarID = ""; // Format: 0000000 (HotJar tracking)

// HotJar Conditional Statement
if (hotJarID) setupHotJar(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

// Load HotJar script late
function setupHotJar(h, o, t, j, a, r) {
  console.log('Setup HotJar');

  h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
  h._hjSettings = { hjid: hotJarID, hjsv: 6 };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script'); r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
}