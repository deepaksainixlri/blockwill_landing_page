/**
 * BlockWill Waitlist Form Handler - WORKING VERSION
 * Google Apps Script to store form submissions in Google Sheets
 */

// Configuration
const SHEET_NAME = 'BlockWill Waitlist';
const NOTIFICATION_EMAIL = 'your-email@example.com'; // Change this to your email

/**
 * Handle POST requests from the waitlist form
 */
function doPost(e) {
  try {
    console.log('Received POST request:', JSON.stringify(e));
    
    // Parse the form data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameters) {
      data = {};
      Object.keys(e.parameters).forEach(key => {
        data[key] = e.parameters[key][0];
      });
    } else {
      throw new Error('No form data received');
    }
    
    // Validate required fields
    if (!data.email || !data.email.includes('@')) {
      return createResponse(400, 'Invalid email address');
    }
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Check for duplicate email
    if (isDuplicateEmail(sheet, data.email)) {
      return createResponse(409, 'Email already registered');
    }
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp.toISOString(),
      data.name || '',
      data.email,
      data.source || 'Website Form',
      data.interests || '',
      data.company || '',
      'Direct'
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    // Optional: Send notification email
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== 'your-email@example.com') {
      try {
        sendNotificationEmail(data);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }
    
    console.log('Successfully added:', data.email);
    
    return createResponse(200, 'Successfully added to waitlist', {
      timestamp: timestamp.toISOString(),
      email: data.email
    });
    
  } catch (error) {
    console.error('Error processing form:', error.toString());
    return createResponse(500, 'Internal server error: ' + error.toString());
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return createResponse(200, 'BlockWill Waitlist API is running', {
    timestamp: new Date().toISOString(),
    status: 'active'
  });
}

/**
 * Get or create the spreadsheet and sheet
 */
function getOrCreateSheet() {
  try {
    let spreadsheet;
    let sheet;
    
    // Try to find existing spreadsheet by name
    const files = DriveApp.getFilesByName('BlockWill Waitlist Data');
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.openById(files.next().getId());
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
      }
    } else {
      // Create new spreadsheet
      spreadsheet = SpreadsheetApp.create('BlockWill Waitlist Data');
      sheet = spreadsheet.getActiveSheet();
      sheet.setName(SHEET_NAME);
    }
    
    // Set up headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Name', 
        'Email',
        'Source',
        'Interests',
        'Company',
        'Form Location'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, headers.length);
    }
    
    return sheet;
    
  } catch (error) {
    console.error('Error getting/creating sheet:', error);
    throw error;
  }
}

/**
 * Check if email already exists in the sheet
 */
function isDuplicateEmail(sheet, email) {
  try {
    const emailColumn = 3; // Column C (Email)
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Skip header row
      if (data[i][emailColumn - 1] && data[i][emailColumn - 1].toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking duplicate email:', error);
    return false; // If error, don't block submission
  }
}

/**
 * Send notification email when someone joins waitlist
 */
function sendNotificationEmail(data) {
  try {
    const subject = '🚀 New BlockWill Waitlist Registration';
    const body = `
New waitlist registration:

Name: ${data.name || 'Not provided'}
Email: ${data.email}
Source: ${data.source || 'Website Form'}
Timestamp: ${new Date().toLocaleString()}

View the waitlist: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `;
    
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't fail the entire request if email fails
  }
}

/**
 * Create standardized response object - SIMPLIFIED VERSION
 */
function createResponse(status, message, data = null) {
  const response = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to test your setup
 */
function testSetup() {
  console.log('Testing BlockWill Waitlist Setup...');
  
  try {
    // Test sheet creation
    const sheet = getOrCreateSheet();
    console.log('✓ Sheet created/found:', sheet.getName());
    
    // Test adding sample data
    const testData = {
      name: 'Test User',
      email: 'test@blockwill.io',
      source: 'Test Run'
    };
    
    const rowData = [
      new Date().toISOString(),
      testData.name,
      testData.email,
      testData.source,
      '',
      '',
      'Test'
    ];
    
    sheet.appendRow(rowData);
    console.log('✓ Test data added successfully');
    
    // Test duplicate check
    const isDupe = isDuplicateEmail(sheet, testData.email);
    console.log('✓ Duplicate check working:', isDupe);
    
    console.log('🎉 All tests passed! Your setup is ready.');
    
    return 'Setup test completed successfully!';
    
  } catch (error) {
    console.error('❌ Test failed:', error.toString());
    return 'Setup test failed: ' + error.toString();
  }
}