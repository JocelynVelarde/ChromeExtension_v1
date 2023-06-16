// Send a message to the content script to retrieve the profile name
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'getProfileName' }, function(response) {
      const profileName = response.profileName;
      console.log('Profile Name:', profileName);
      sendProfileNameToBackgroundScript(profileName);
    });
  });
  
  // Send the profile name to the background script
  function sendProfileNameToBackgroundScript(profileName) {
    chrome.runtime.sendMessage({ profileName }, function(response) {
      console.log('Message sent to background script:', response);
    });
  }
  