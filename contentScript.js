

const init = function () {
  const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');

  if (profileNameElement) {
    const injectElement = document.createElement('div');
    injectElement.className = 'info-container';

    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';

    const addToCRMButton = document.createElement('button');
    addToCRMButton.className = 'button-crm';

    addToCRMButton.style.border = 'none';
    addToCRMButton.style.borderRadius = '16px';
    addToCRMButton.style.padding = '8px 16px';
    addToCRMButton.style.background = '#0a66c2';
    addToCRMButton.style.color = '#fff';
    addToCRMButton.style.fontWeight = 'bold';
    addToCRMButton.style.marginTop = '16px';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'plus-icon';
    iconSpan.innerHTML = '&#43;';
    iconSpan.style.fontSize = '17px';

    addToCRMButton.appendChild(iconSpan);
    addToCRMButton.innerHTML += ' Add to CRM';

    var element = document.querySelector(profileInfo);
    element.parentElement.removeChild(element);


    addToCRMButton.addEventListener('click', function () {
      const nombrePersonaElement = document.querySelector('.pv-text-details__left-panel');
      const nombrePersona = nombrePersonaElement ? nombrePersonaElement.textContent.trim() : null;

      const profileInfoData = separateProfileInfo(nombrePersona);

      profileInfo.innerHTML = `
        <p><strong>Profile Name:</strong> ${profileInfoData.nombrePersona}</p>
        <p><strong>Pronouns:</strong> ${profileInfoData.pronouns}</p>
        <p><strong>Connection:</strong> ${profileInfoData.connection}</p>
        <p><strong>Headline:</strong> ${profileInfoData.headline}</p>
      `;

      profileInfo.style.display = 'block';
    });

    injectElement.appendChild(profileInfo);
    injectElement.appendChild(addToCRMButton);

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
    if (line.includes('He/Him') || line.includes('She/Her') || line.includes('They/Them') || line.includes('ze/zir') || line.includes('xe/xem') || line.includes('Other')) {
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