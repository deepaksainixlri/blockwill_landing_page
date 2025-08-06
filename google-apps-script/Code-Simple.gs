/**
 * BlockWill Waitlist Form Handler - ULTRA SIMPLE VERSION
 */

function doPost(e) {
  try {
    // Parse incoming data
    let data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
    // Validate email
    if (!data.email || !data.email.includes('@')) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 400,
        message: 'Invalid email address'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get spreadsheet
    let sheet = getSheet();
    
    // Add data
    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email,
      data.source || 'Website Form'
    ]);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      status: 200,
      message: 'Successfully added to waitlist',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 500,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 200,
    message: 'BlockWill Waitlist API is running',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  // Try to find existing spreadsheet
  let spreadsheet;
  try {
    const files = DriveApp.getFilesByName('BlockWill Waitlist Data');
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.openById(files.next().getId());
    } else {
      spreadsheet = SpreadsheetApp.create('BlockWill Waitlist Data');
    }
  } catch (error) {
    spreadsheet = SpreadsheetApp.create('BlockWill Waitlist Data');
  }
  
  let sheet = spreadsheet.getSheets()[0];
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Name', 'Email', 'Source']]);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  return sheet;
}