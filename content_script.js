// content_script.js

// Check if the current page URL contains 'linkedin.com'
if (window.location.href.includes('linkedin.com')) {
    // Send a Chrome notification
    chrome.runtime.sendMessage({
      action: 'notification',
      message: 'You opened LinkedIn!',
    });
  }
  