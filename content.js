chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getProfileName") {
      const nameElement = document.querySelector("h1");
      const profileName = nameElement?.textContent.trim();
      sendResponse({ profileName: profileName });
    }
  });
  