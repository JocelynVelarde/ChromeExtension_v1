const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');

const RESPONSES_SHEET_ID = "1B4pCDi83qnGhVEbfAOyvS_uHkdQXkgDLzMZJNiVlEKA";
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);



const CREDENTIALS = JSON.parse(fs.readFileSync('credentials.json'));

const getRow = async (email) => {
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.email === email) {
            console.log(row.password);
        }
    }
};

getRow("email@gmail.com");
