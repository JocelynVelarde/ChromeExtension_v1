document.addEventListener("DOMContentLoaded", function () {
    var linkedinButton = document.getElementById("linkedinButton");
    var messageText = document.getElementById("messageText");
  
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      var currentUrl = currentTab.url;
  
      // Verificar si la URL es de LinkedIn
      if (currentUrl.includes("linkedin.com/in/")) {
        linkedinButton.addEventListener("click", function () {
          messageText.textContent = "You have clicked the button";
        });
      } else {
        linkedinButton.disabled = true;
        messageText.textContent = "This is not a LinkedIn profile";
      }
    });
  });
  