const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

let credentials;
// Fetch the credentials from the JSON file
async function fetchCredentials() {
  try {
    const response = await fetch(chrome.runtime.getURL('credentials.json'));
    credentials = await response.json();
  } catch (error) {
    console.error('Error fetching credentials:', error);
  }
}

// Load the credentials when the extension is installed or updated
chrome.runtime.onInstalled.addListener(fetchCredentials);
chrome.runtime.onStartup.addListener(fetchCredentials);

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  const profileName = message.name;

  // Use the credentials to authenticate and access the Google Sheets API
  const { client_email, private_key } = credentials;

  // Authenticate with the Google Sheets API using the credentials
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  auth.getClient()
    .then(client => {
      // Use the authenticated client to append the profile name to the Google Sheet
      const sheets = google.sheets({ version: 'v4', auth: client });

      sheets.spreadsheets.values.append({
        spreadsheetId: '1vpHBkND5ap3-9ocSkbWxBT1xYijSKgLNaX4MaLnkJ3E',
        range: 'Sheet1!A:A', // Adjust the range as per your sheet's structure
        valueInputOption: 'RAW',
        resource: {
          values: [[profileName]],
        },
      }, (err, response) => {
        if (err) {
          console.error('Error appending data to Google Sheet:', err);
        } else {
          console.log('Data appended successfully:', response.data);
        }
      });
    })
    .catch(error => {
      console.error('Error authenticating with Google Sheets API:', error);
    });
});
