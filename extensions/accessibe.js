// Accessibe Constants
const useAccessibe = true; // True or false to enable/disable (Accessibe)

// Accessibe Conditional Statement
if (useAccessibe) setupAccessibe();

// Load Accessibe script late
function setupAccessibe() {
  console.log('Setup Accessibe');

  var s = document.createElement('script');
  var h = document.querySelector('head') || document.body;
  s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
  s.async = true;
  s.onload = function () {
    acsbJS.init({
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
    });
  };
  h.appendChild(s);
}