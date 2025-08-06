/**
 * BlockWill Waitlist Handler - Fresh Start Version
 * This should definitely work without CORS issues
 */

function doPost(e) {
  Logger.log('POST request received: ' + JSON.stringify(e));
  
  try {
    // Parse the incoming data
    let formData = {};
    
    if (e.postData && e.postData.contents) {
      formData = JSON.parse(e.postData.contents);
      Logger.log('Parsed JSON data: ' + JSON.stringify(formData));
    } else if (e.parameter) {
      formData = e.parameter;
      Logger.log('URL parameters: ' + JSON.stringify(formData));
    } else {
      Logger.log('No data found in request');
      return createTextResponse(400, 'No data received');
    }
    
    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      Logger.log('Invalid email: ' + formData.email);
      return createTextResponse(400, 'Valid email required');
    }
    
    // Get or create the Google Sheet
    const sheet = getWaitlistSheet();
    
    // Add the data to the sheet
    const rowData = [
      new Date(),
      formData.name || '',
      formData.email,
      formData.source || 'Website Form',
      formData.timestamp || new Date().toISOString()
    ];
    
    sheet.appendRow(rowData);
    Logger.log('Data added to sheet: ' + JSON.stringify(rowData));
    
    return createTextResponse(200, 'Successfully added to waitlist!');
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createTextResponse(500, 'Server error: ' + error.toString());
  }
}

function doGet(e) {
  Logger.log('GET request received');
  return createTextResponse(200, 'BlockWill Waitlist API is running - ' + new Date().toISOString());
}

function getWaitlistSheet() {
  const SHEET_NAME = 'BlockWill Waitlist';
  
  try {
    // Try to find existing spreadsheet
    const files = DriveApp.getFilesByName('BlockWill Waitlist Data');
    let spreadsheet;
    
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.openById(files.next().getId());
      Logger.log('Found existing spreadsheet');
    } else {
      spreadsheet = SpreadsheetApp.create('BlockWill Waitlist Data');
      Logger.log('Created new spreadsheet: ' + spreadsheet.getId());
    }
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      Logger.log('Created new sheet: ' + SHEET_NAME);
    }
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Name', 'Email', 'Source', 'Submitted At'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
      Logger.log('Added headers to sheet');
    }
    
    return sheet;
    
  } catch (error) {
    Logger.log('Error in getWaitlistSheet: ' + error.toString());
    throw error;
  }
}

function createTextResponse(status, message) {
  const response = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  Logger.log('Returning response: ' + JSON.stringify(response));
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to test your setup
 */
function testFunction() {
  Logger.log('=== Testing BlockWill Waitlist Setup ===');
  
  try {
    // Test sheet creation
    const sheet = getWaitlistSheet();
    Logger.log('✓ Sheet test passed: ' + sheet.getName());
    
    // Test adding data
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      source: 'Test Function',
      timestamp: new Date().toISOString()
    };
    
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };
    
    const result = doPost(mockEvent);
    Logger.log('✓ doPost test result: ' + result.getContent());
    
    // Test GET request
    const getResult = doGet({});
    Logger.log('✓ doGet test result: ' + getResult.getContent());
    
    Logger.log('🎉 All tests passed!');
    return 'Setup test completed successfully!';
    
  } catch (error) {
    Logger.log('❌ Test failed: ' + error.toString());
    return 'Test failed: ' + error.toString();
  }
}