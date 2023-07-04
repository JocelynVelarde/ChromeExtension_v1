


// Create the button
const profileNameElement = document.querySelector('.pv-top-card-v2-ctas');
const locationElement = document.querySelector('.pv-text-details__left-panel.mt2');


const injectElement = document.createElement('div');
injectElement.className = 'info-container';


const profileInfo = document.createElement('div');
profileInfo.className = 'profile-info';


const hoverElement = document.createElement('div');
hoverElement.className = 'hover-element';
hoverElement.textContent = 'WoW';
hoverElement.style.display = 'inline-block';
hoverElement.style.marginTop = '16px';
hoverElement.style.padding = '8px 16px';
hoverElement.style.background = 'linear-gradient(to right, #0a66c2, #00bcd4)';
hoverElement.style.color = '#fff';
hoverElement.style.border = 'none';
hoverElement.style.borderRadius = '20px';
hoverElement.style.cursor = 'pointer';


const iconSpan = document.createElement('span');
iconSpan.className = 'plus-icon';
iconSpan.innerHTML = '&#43;';
iconSpan.style.fontSize = '17px';

hoverElement.appendChild(iconSpan);

hoverElement.addEventListener("click", function() {
    const infoContainer = document.createElement('div');
    infoContainer.style.background = 'linear-gradient(to right, #0a66c2, #00bcd4)';
    infoContainer.style.color = '#fff';
    infoContainer.style.padding = '16px';
    infoContainer.style.marginTop = '16px';
    infoContainer.style.borderRadius = '18px';


    const nombrePersonaElement = document.querySelector('.pv-text-details__left-panel');
    const urlPerfil = window.location.href;
    const nombrePersona = nombrePersonaElement ? nombrePersonaElement.textContent.trim() : null;
    const locationElement = document.querySelector('.pv-text-details__left-panel.mt2'); // New element
    const profileInfoData = separateProfileInfo(nombrePersona);
    const locationRaw = locationElement ? locationElement.textContent.trim() : null;
    const separator = 'Contact info';
    const location = locationRaw.replace(separator, '').trim();
    
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    profileInfo.style.color = '#fff';

    profileInfo.innerHTML = `
    <p><strong>Profile Name:</strong> ${profileInfoData.nombrePersona}</p>
        <p><strong>Pronouns:</strong> ${profileInfoData.pronouns}</p>
        <p><strong>Connection:</strong> ${profileInfoData.connection}</p>
        <p><strong>Headline:</strong> ${profileInfoData.headline}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Linkedin:</strong> <a href="${urlPerfil}" target="_blank">${urlPerfil}</a></p>
      `;

      infoContainer.appendChild(profileInfo);
      injectElement.appendChild(infoContainer);

    //profileInfo.style.display = 'block';

    const infoToSend = {
        nombrePersona: profileInfoData.nombrePersona,
        pronouns: profileInfoData.pronouns,
        connection: profileInfoData.connection,
        headline: profileInfoData.headline,
        location: location,
        urlPerfil: urlPerfil
    };

    chrome.runtime.sendMessage(infoToSend, function(response) {
        console.log('response', response);
      });
});


/*hoverElement.addEventListener("mouseleave", function() {
    profileInfo.style.display = 'none';
});*/

injectElement.appendChild(profileInfo);
injectElement.appendChild(hoverElement);

profileNameElement.parentNode.insertBefore(injectElement, profileNameElement.nextSibling);


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
  


