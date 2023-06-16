document.addEventListener("DOMContentLoaded", function() {
    const saveProfileButton = document.getElementById("saveProfileButton");
    saveProfileButton.addEventListener("click", saveProfileName);
  });
  
  function saveProfileName() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: getProfileName,
        },
        function(results) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
  
          const profileName = results[0]?.result;
          if (profileName) {
            chrome.identity.getAuthToken({ interactive: true, scopes: ["https://www.googleapis.com/auth/spreadsheets"] }, function(token) {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
              }
  
              saveProfileNameToSheets(token, profileName);
            });
          } else {
            console.error("Failed to get profile name from content script.");
          }
        }
      );
    });
  }
  
  function getProfileName() {
    const nameElement = document.querySelector("h1");
    return nameElement?.textContent.trim();
  }
  
  function saveProfileNameToSheets(token, profileName) {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1vpHBkND5ap3-9ocSkbWxBT1xYijSKgLNaX4MaLnkJ3E/values/Sheet1!A1:A1:append", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[profileName]],
      }),
    })
      .then(function(response) {
        if (response.ok) {
          console.log("Profile name saved successfully!");
        } else {
          console.error("Failed to save profile name:", response.statusText);
        }
      })
      .catch(function(error) {
        console.error("Failed to save profile name:", error);
      });
  }
  