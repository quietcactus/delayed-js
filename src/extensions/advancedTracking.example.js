/**
 * Example Extension: Advanced Tracking
 *
 * This example demonstrates how to create a delayed.js extension.
 * Rename this file to "advancedTracking.js" and enable it in delayed.js
 * to use this extension.
 *
 * Features included:
 * - Scroll depth tracking
 * - Time on page tracking
 * - Link click tracking
 * - Form interaction tracking
 */

// Main initialization function - called automatically when extension loads
function initAdvancedTracking() {
  console.log('Advanced Tracking extension initialized');

  // Initialize tracking features
  setupScrollDepthTracking();
  setupTimeOnPageTracking();
  setupLinkClickTracking();
  setupFormInteractionTracking();
}

/**
 * Track scroll depth at 25%, 50%, 75%, and 100%
 */
function setupScrollDepthTracking() {
  const scrollDepths = [25, 50, 75, 100];
  const trackedDepths = new Set();

  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollDepths.forEach(function(depth) {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);

        // Send to Google Analytics if available
        if (typeof gtag === 'function') {
          gtag('event', 'scroll_depth', {
            'depth_percentage': depth,
            'event_category': 'Engagement'
          });
        }

        console.log('Scroll depth tracked: ' + depth + '%');
      }
    });
  });
}

/**
 * Track time spent on page in 30-second intervals
 */
function setupTimeOnPageTracking() {
  let timeOnPage = 0;
  const interval = 30; // seconds

  setInterval(function() {
    timeOnPage += interval;

    // Send to Google Analytics if available
    if (typeof gtag === 'function') {
      gtag('event', 'time_on_page', {
        'duration_seconds': timeOnPage,
        'event_category': 'Engagement'
      });
    }

    console.log('Time on page: ' + timeOnPage + ' seconds');
  }, interval * 1000);
}

/**
 * Track external link clicks
 */
function setupLinkClickTracking() {
  document.addEventListener('click', function(e) {
    // Find the closest anchor tag
    const link = e.target.closest('a');

    if (link && link.href) {
      const isExternal = link.hostname !== window.location.hostname;

      if (isExternal) {
        // Send to Google Analytics if available
        if (typeof gtag === 'function') {
          gtag('event', 'click', {
            'event_category': 'External Link',
            'event_label': link.href
          });
        }

        console.log('External link clicked: ' + link.href);
      }
    }
  });
}

/**
 * Track form field interactions
 */
function setupFormInteractionTracking() {
  const trackedForms = new Set();

  document.addEventListener('focus', function(e) {
    // Check if focused element is a form field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      const form = e.target.closest('form');

      if (form && !trackedForms.has(form)) {
        trackedForms.add(form);

        // Get form name or ID for identification
        const formIdentifier = form.name || form.id || 'unnamed_form';

        // Send to Google Analytics if available
        if (typeof gtag === 'function') {
          gtag('event', 'form_interaction', {
            'event_category': 'Form',
            'event_label': formIdentifier
          });
        }

        console.log('Form interaction tracked: ' + formIdentifier);
      }
    }
  }, true);
}
