const init = function () {
  const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');


  if (profileNameElement) {
    const injectElement = document.createElement('div');
    injectElement.className = 'info-container';

    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';

    const hoverElement = document.createElement('div');
    hoverElement.className = 'hover-element';
    hoverElement.textContent = 'Hover me for more info ';
    hoverElement.style.display = 'inline-block';
    hoverElement.style.marginTop = '16px';
    hoverElement.style.padding = '8px 16px';
    hoverElement.style.background = '#0a66c2';
    hoverElement.style.color = '#fff';
    hoverElement.style.border = 'none';
    hoverElement.style.borderRadius = '20px';
    hoverElement.style.cursor = 'pointer';



    const iconSpan = document.createElement('span');
    iconSpan.className = 'plus-icon';
    iconSpan.innerHTML = '&#43;';
    iconSpan.style.fontSize = '17px';

    hoverElement.appendChild(iconSpan);

    hoverElement.addEventListener('mouseenter', function () {
      const nombrePersonaElement = document.querySelector('.pv-text-details__left-panel');
      const urlPerfil = window.location.href;
      const nombrePersona = nombrePersonaElement ? nombrePersonaElement.textContent.trim() : null;

      const profileInfoData = separateProfileInfo(nombrePersona);

      profileInfo.innerHTML = `
        <p><strong>Profile Name:</strong> ${profileInfoData.nombrePersona}</p>
        <p><strong>Pronouns:</strong> ${profileInfoData.pronouns}</p>
        <p><strong>Connection:</strong> ${profileInfoData.connection}</p>
        <p><strong>Headline:</strong> ${profileInfoData.headline}</p>
        <p><strong>Linkedin:</strong> <a href="${urlPerfil}" target="_blank">${urlPerfil}</a></p>
      `;

      profileInfo.style.display = 'block';
    });

    hoverElement.addEventListener('mouseleave', function () {
      profileInfo.style.display = 'none';
    });

    injectElement.appendChild(profileInfo);
    injectElement.appendChild(hoverElement);

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
