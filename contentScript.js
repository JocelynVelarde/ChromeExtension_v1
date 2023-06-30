const init = function() {
  const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');

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
      const nombrePersonaElement = document.querySelector('.pv-text-details__left-panel');
      const nombrePersona = nombrePersonaElement ? nombrePersonaElement.textContent.trim() : null;

      const profileInfo = separateProfileInfo(nombrePersona);
      alert('Profile Name: ' + profileInfo.nombrePersona);
      alert('Pronouns: ' + profileInfo.pronouns);
      alert('Connection: ' + profileInfo.connection);
      alert('Headline: ' + profileInfo.headline);
    });

    profileNameElement.parentNode.insertBefore(injectElement, profileNameElement.nextSibling);
  }
};

function separateProfileInfo(nombrePersona) {
  const parts = nombrePersona.split('\n').map(line => line.trim());
  const name = parts[0];

  let pronouns = '';
  let connection = '';
  let headline = '';

  for (let i = 1; i < parts.length; i++) {
    const line = parts[i];
    if (line.includes('he/him') || line.includes('she/her') || line.includes('they/them') || line.includes('ze/zir') || line.includes('xe/xem') || line.includes('other')) {
      pronouns = line;
    } else if (line.includes('1st degree connection') || line.includes('2nd degree connection') || line.includes('3rd')) {
      connection = line;
    } else {
      headline = line;
    }
  }

  return {
    nombrePersona: name,
    pronouns: pronouns,
    connection: connection,
    headline: headline
  };
}

// Call the init function
init();
