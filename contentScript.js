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
      const profileInfo = separateProfileInfo(nombrePersona);
      alert('Profile Name: ' + profileInfo.nombrePersona);
      alert('Connection: ' + profileInfo.connection);
      alert('Headline: ' + profileInfo.headline);
    });

    profileNameElement.parentNode.insertBefore(injectElement, profileNameElement.nextSibling);
  }
};

function separateProfileInfo(nombrePersona) {
  const parts = nombrePersona.split(/\s{2,}/);
  const name = parts[0].trim();
  const connection = parts[1].trim();
  const headline = parts[3].trim();

  return {
    nombrePersona: name,
    connection: connection,
    headline: headline
  };
}

// Call the init function
init();
