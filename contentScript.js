const init = function() {
    // Find the profile name element on LinkedIn
    const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');
  
    if (profileNameElement) {
      // Create the injected button element
      const injectElement = document.createElement('button');
      injectElement.className = 'button-crm';
  
      // Apply additional CSS styles to the button
      injectElement.style.border = 'none';
      injectElement.style.borderRadius = '16px';
      injectElement.style.padding = '8px 16px';
      injectElement.style.background = '#0a66c2';
      injectElement.style.color = '#fff';
      injectElement.style.fontWeight = 'bold';
      injectElement.style.marginTop = '16px';
  
      // Create the span element for the icon
      const iconSpan = document.createElement('span');
      iconSpan.className = 'plus-icon';
      iconSpan.innerHTML = '&#43;'; // Plus sign icon
  
      // Apply styles to the icon span
      iconSpan.style.fontSize = '17px'; // Adjust the font size as needed
  
      // Append the icon span to the button element
      injectElement.appendChild(iconSpan);
  
      // Add the text to the button
      injectElement.innerHTML += ' Add to CRM';
  
      // Append the injected button element as a sibling to the profile name element
      profileNameElement.parentNode.insertBefore(injectElement, profileNameElement.nextSibling);
    }
  };
  
  // Call the init function
  init();
  