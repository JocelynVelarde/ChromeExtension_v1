// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'notification') {
      // Create a Chrome notification
      chrome.notifications.create({
        type: 'basic',
        title: 'LinkedIn',
        message: message.message,
        iconUrl: '/images/icon_48.png', // Update with your own icon path
      });
    }
  });
  