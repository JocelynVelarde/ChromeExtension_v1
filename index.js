const express = require('express');
const app = express();
const {google} = require('googleapis');

app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    //crear instancia para el cliente autenticado
    const client = await auth.getClient();

    //instanciar Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1B4pCDi83qnGhVEbfAOyvS_uHkdQXkgDLzMZJNiVlEKA";

    //leer la metadata del spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Hoja 1!A1:C3"
    });

    //escribir filas en el spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Hoja 1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                ["Nombre", "Apellido", "Edad"],
                ["Jocelynaaaaaaaaaa", "Velarde", "18"],
                ["Maria", "Gomez", "30"],
                ["Juan", "Perez", "25"]
                
            ]
        }
    });



    res.send(getRows.data);
});

app.listen(1338, (req, res) => console.log("Server running on port 1337")); 
