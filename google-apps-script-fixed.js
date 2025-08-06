/**
 * BlockWill Waitlist Form Handler - FIXED VERSION
 * Google Apps Script to store form submissions in Google Sheets
 * No CORS errors - simplified and reliable
 */

// Configuration
const SHEET_NAME = 'BlockWill Waitlist';
const EMAIL_RECIPIENT = 'info@blockwill.io'; // Change this to your email

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  try {
    // Get form data
    const data = e.parameter;
    
    // Validate required email field
    if (!data.email) {
      return createJsonResponse(false, 'Email is required');
    }
    
    // Get or create spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add data to sheet
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.country || '',
      data.state || ''
    ];
    
    sheet.appendRow(rowData);
    
    // Send email notification
    try {
      sendEmailNotification(data, timestamp);
    } catch (emailError) {
      console.log('Email notification failed:', emailError);
      // Continue even if email fails
    }
    
    return createJsonResponse(true, 'Successfully joined waitlist!');
    
  } catch (error) {
    console.error('Error processing form:', error);
    return createJsonResponse(false, 'Server error occurred: ' + error.toString());
  }
}

/**
 * Handle GET requests
 */
function doGet(e) {
  return createJsonResponse(true, 'BlockWill Waitlist API is running');
}

/**
 * Create JSON response
 */
function createJsonResponse(success, message) {
  const responseData = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  const response = ContentService.createTextOutput(JSON.stringify(responseData));
  response.setMimeType(ContentService.MimeType.JSON);
  
  return response;
}

/**
 * Get or create Google Sheet
 */
function getOrCreateSheet() {
  try {
    // Try to get existing spreadsheet
    const files = DriveApp.getFilesByName(SHEET_NAME);
    let spreadsheet;
    
    if (files.hasNext()) {
      const file = files.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      // Create new spreadsheet
      spreadsheet = SpreadsheetApp.create(SHEET_NAME);
      
      // Set up headers
      const sheet = spreadsheet.getActiveSheet();
      const headers = ['Timestamp', 'Name', 'Email', 'Country', 'State/Province'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a148c');
      headerRange.setFontColor('white');
      
      sheet.autoResizeColumns(1, headers.length);
    }
    
    return spreadsheet.getActiveSheet();
    
  } catch (error) {
    console.error('Error with spreadsheet:', error);
    throw new Error('Could not access spreadsheet: ' + error.toString());
  }
}

/**
 * Send email notification
 */
function sendEmailNotification(data, timestamp) {
  const subject = 'New BlockWill Waitlist Signup';
  const body = `
New user joined the BlockWill waitlist!

📧 Email: ${data.email}
👤 Name: ${data.name || 'Not provided'}
🌍 Country: ${data.country || 'Not provided'}
🏛️ State/Province: ${data.state || 'Not provided'}
📅 Timestamp: ${timestamp.toLocaleString()}

---
BlockWill Waitlist Management
  `.trim();
  
  MailApp.sendEmail({
    to: EMAIL_RECIPIENT,
    subject: subject,
    body: body
  });
}

/**
 * Test function
 */
function testSetup() {
  console.log('Testing BlockWill Waitlist setup...');
  
  try {
    // Test sheet access
    const sheet = getOrCreateSheet();
    console.log('✅ Sheet access successful');
    
    // Test data insertion
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      country: 'United States',
      state: 'California'
    };
    
    const mockEvent = { parameter: testData };
    const result = doPost(mockEvent);
    console.log('✅ Form processing test:', result.getContent());
    
    console.log('🎉 All tests completed successfully!');
    return 'Setup test completed successfully!';
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return 'Setup test failed: ' + error.toString();
  }
}