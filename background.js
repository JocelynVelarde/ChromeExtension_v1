chrome.action.onClicked.addListener(async (tab) => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const profileName = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getProfileName,
    });

    if (profileName && profileName[0]?.result) {
      const token = await chrome.identity.getAuthToken({ interactive: true });
      await saveProfileName(token, profileName[0].result);
    } else {
      console.error("Failed to get profile name from content script.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

async function saveProfileName(token, profileName) {
  try {
    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1vpHBkND5ap3-9ocSkbWxBT1xYijSKgLNaX4MaLnkJ3E/values/Sheet1!A1:A1:append",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[profileName]],
        }),
      }
    );

    if (response.ok) {
      console.log("Profile name saved successfully!");
    } else {
      console.error("Failed to save profile name:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to save profile name:", error);
  }
}

function getProfileName() {
  const nameElement = document.querySelector("h1");
  return nameElement?.textContent.trim();
}
