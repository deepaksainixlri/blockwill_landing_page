function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
    if (!data.email) {
      return ContentService.createTextOutput('{"status":400,"message":"Email required"}');
    }
    
    // Create or get spreadsheet
    let sheet;
    try {
      sheet = SpreadsheetApp.openById('YOUR_SHEET_ID_HERE').getSheets()[0];
    } catch (error) {
      const ss = SpreadsheetApp.create('BlockWill Waitlist Data');
      sheet = ss.getSheets()[0];
      sheet.getRange('A1:D1').setValues([['Timestamp', 'Name', 'Email', 'Source']]);
    }
    
    // Add data
    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email,
      'Website'
    ]);
    
    return ContentService.createTextOutput('{"status":200,"message":"Success"}');
    
  } catch (error) {
    return ContentService.createTextOutput('{"status":500,"message":"Error: ' + error.toString() + '"}');
  }
}

function doGet(e) {
  return ContentService.createTextOutput('{"status":200,"message":"API running"}');
}