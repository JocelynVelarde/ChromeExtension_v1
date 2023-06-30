const init = function() {
  const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');
  const nombrePersonaElement = document.querySelector('.pv-text-details__left-panel');
  const nombrePersona = nombrePersonaElement ? nombrePersonaElement.textContent.trim() : null;

  if (profileNameElement) {
    const injectElement = document.createElement('button');
    injectElement.className = 'button-crm';

    injectElement.style.border = 'none';
    injectElement.style.borderRadius = '16px';
    injectElement.style.padding = '8px 16px';
    injectElement.style.background = '#0a66c2';
    injectElement.style.color = '#fff';
    injectElement.style.fontWeight = 'bold';
    injectElement.style.marginTop = '16px';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'plus-icon';
    iconSpan.innerHTML = '&#43;';

    iconSpan.style.fontSize = '17px';

    injectElement.appendChild(iconSpan);

    injectElement.innerHTML += ' Add to CRM';

    injectElement.addEventListener('click', function() {
      alert('Profile Name: ' + nombrePersona);
    });

    profileNameElement.parentNode.insertBefore(injectElement, profileNameElement.nextSibling);
  }
};

// Call the init function
init();
