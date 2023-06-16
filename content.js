// Listen for the button click event
document.getElementById('saveProfileButton').addEventListener('click', function() {
    // Get the name of the LinkedIn profile
    const profileNameElement = document.querySelector('h1.text-heading-xlarge');
    const profileName = profileNameElement.textContent;
  
    // Send a message to the background script with the profile name
    chrome.runtime.sendMessage({ name: profileName });
  });
  
  