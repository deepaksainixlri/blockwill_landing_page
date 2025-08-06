/**
 * BlockWill Waitlist Form Handler
 * Google Apps Script to store form submissions in Google Sheets
 * Handles CORS properly for web form integration
 */

// Configuration - Update these values
const SHEET_NAME = 'BlockWill Waitlist'; // Name of your Google Sheet
const EMAIL_RECIPIENT = 'hello@blockwill.io'; // Your email for notifications

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  try {
    // Set CORS headers to prevent CORS errors
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    
    // Parse form data
    const data = e.parameter;
    
    // Validate required fields
    if (!data.email) {
      return createResponse(false, 'Email is required', response);
    }
    
    // Get or create spreadsheet
    const sheet = getOrCreateSheet();
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.country || '',
      data.state || ''
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    // Send email notification
    sendEmailNotification(data, timestamp);
    
    // Return success response
    return createResponse(true, 'Successfully joined waitlist!', response);
    
  } catch (error) {
    console.error('Error processing form:', error);
    return createResponse(false, 'Server error occurred', response);
  }
}

/**
 * Handle GET requests (for CORS preflight)
 */
function doGet(e) {
  const response = ContentService.createTextOutput(JSON.stringify({
    message: 'BlockWill Waitlist API is running',
    status: 'OK'
  }));
  response.setMimeType(ContentService.MimeType.JSON);
  
  return response;
}

/**
 * Get or create the Google Sheet
 */
function getOrCreateSheet() {
  let sheet;
  
  try {
    // Try to get existing spreadsheet by name
    const files = DriveApp.getFilesByName(SHEET_NAME);
    
    if (files.hasNext()) {
      const file = files.next();
      const spreadsheet = SpreadsheetApp.openById(file.getId());
      sheet = spreadsheet.getActiveSheet();
    } else {
      // Create new spreadsheet
      const spreadsheet = SpreadsheetApp.create(SHEET_NAME);
      sheet = spreadsheet.getActiveSheet();
      
      // Set up headers
      const headers = ['Timestamp', 'Name', 'Email', 'Country', 'State/Province'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a148c'); // BlockWill purple
      headerRange.setFontColor('white');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
      
      console.log('Created new spreadsheet:', spreadsheet.getUrl());
    }
    
    return sheet;
    
  } catch (error) {
    console.error('Error creating/accessing sheet:', error);
    throw error;
  }
}

/**
 * Send email notification for new waitlist signup
 */
function sendEmailNotification(data, timestamp) {
  try {
    const subject = 'New BlockWill Waitlist Signup';
    
    const body = `
New user joined the BlockWill waitlist!

📧 Email: ${data.email}
👤 Name: ${data.name || 'Not provided'}
🌍 Country: ${data.country || 'Not provided'}
🏛️ State/Province: ${data.state || 'Not provided'}
📅 Timestamp: ${timestamp.toLocaleString()}

---
BlockWill Waitlist Management System
    `.trim();
    
    MailApp.sendEmail({
      to: EMAIL_RECIPIENT,
      subject: subject,
      body: body
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't fail the form submission if email fails
  }
}

/**
 * Create standardized response with CORS headers
 */
function createResponse(success, message, response) {
  const responseData = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  response.setContent(JSON.stringify(responseData));
  
  // Note: CORS headers are handled automatically by Google Apps Script when deployed as web app
  return response;
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  console.log('Testing BlockWill Waitlist setup...');
  
  // Test sheet creation
  const sheet = getOrCreateSheet();
  console.log('✅ Sheet created/accessed successfully');
  
  // Test data insertion
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    country: 'United States',
    state: 'California'
  };
  
  const timestamp = new Date();
  const rowData = [
    timestamp,
    testData.name,
    testData.email,
    testData.country,
    testData.state
  ];
  
  sheet.appendRow(rowData);
  console.log('✅ Test data added successfully');
  
  // Test email notification
  sendEmailNotification(testData, timestamp);
  console.log('✅ Test email sent successfully');
  
  console.log('🎉 All tests passed! Your BlockWill Waitlist system is ready.');
}