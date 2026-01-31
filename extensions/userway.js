// UserWay constants
const useUserWay = true; // True or false to enable/disable (UserWay)

// UserWay Conditional Statement
if (useUserWay) setupUserWay();

// Load UserWay Script Late
function setupUserWay() {
  console.log('Setup UserWay');

  const script = document.createElement('script');
  script.src = 'https://cdn.userway.org/widget.js';
  script.setAttribute('data-position', 5);
  script.setAttribute('data-account', '9bypO3Ua9N');
  script.setAttribute('data-color', '#2d68ff');
  script.setAttribute("data-type", "1");
  script.async = true;

  // Add script to body
  document.getElementsByTagName('footer')[0].appendChild(script);
}