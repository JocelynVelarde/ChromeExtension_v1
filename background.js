const API_KEY = 'AIzaSyDRCWGYQGnmtXWw58v5t9bZiJidBYBHZfU';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1B4pCDi83qnGhVEbfAOyvS_uHkdQXkgDLzMZJNiVlEKA';
const SPREADSHEET_TAB_NAME = 'Hoja 1';

function onGAPILoad() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
}

// Listen for messages from inject.js
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Get the token
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      // Set GAPI auth token
      gapi.auth.setToken({
        'access_token': token,
      });
      

      const body = {values: [[
        request.nombrePersona,
        request.pronouns,
        request.connection,
        request.headline,
        request.location,
        request.urlPerfil
      ]]};

      // Append values to the spreadsheet
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then((response) => {
        // On success
        console.log(`${response.result.updates.updatedCells} cells appended.`)
        sendResponse({success: true});
      });
    })

    // Wait for response
    return true;
  }
);