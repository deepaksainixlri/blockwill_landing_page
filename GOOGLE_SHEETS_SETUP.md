# 📊 BlockWill Waitlist - Google Sheets Integration Setup

This guide will help you set up Google Sheets integration to automatically store all waitlist form submissions from your BlockWill website **with zero CORS errors**.

## 🎯 What This Does

When users submit your waitlist form, their information will be automatically saved to a Google Sheet with:
- ✅ Timestamp of submission
- ✅ Name (if provided)  
- ✅ Email address
- ✅ Country selection
- ✅ State/Province selection
- ✅ Automatic email notifications

## 📋 Prerequisites

- Google account
- Access to Google Drive and Google Apps Script
- Your BlockWill website deployed

## 🚀 Step-by-Step Setup

### Step 1: Create Google Apps Script Project

1. **Go to Google Apps Script**
   - Visit: https://script.google.com
   - Sign in with your Google account

2. **Create New Project**
   - Click "New project"
   - Rename it to "BlockWill Waitlist Handler"

3. **Replace Default Code**
   - Delete all existing code in `Code.gs`
   - Copy and paste the entire contents from `google-apps-script.js` file in your project folder

4. **Configure Settings**
   - In the code, find this line: `const EMAIL_RECIPIENT = 'hello@blockwill.io';`
   - Replace with your actual email to receive notifications
   - Optionally change: `const SHEET_NAME = 'BlockWill Waitlist';`

### Step 2: Deploy as Web App

1. **Prepare for Deployment**
   - Click the "Deploy" button (top right)
   - Choose "New deployment"

2. **Configure Deployment**
   - Type: Select "Web app"
   - Description: "BlockWill Waitlist Form Handler v1.0"
   - Execute as: "Me"
   - Who has access: "Anyone" (required for form submissions)

3. **Authorize the Script**
   - Click "Deploy"
   - You'll be prompted to authorize the script
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to BlockWill Waitlist Handler (unsafe)"
   - Click "Allow"

4. **Copy the Web App URL**
   - After deployment, you'll get a URL like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   - **Copy this URL** - you'll need it in the next step

### Step 3: Update Your Website

1. **Update the Form Action**
   - Open your `index.html` file
   - Find line 175: `<form id="waitlist-form" action="YOUR_GOOGLE_APPS_SCRIPT_URL_HERE" method="POST" class="space-y-6">`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied from Step 2

2. **Example:**
   ```html
   <form id="waitlist-form" action="https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXX/exec" method="POST" class="space-y-6">
   ```

### Step 4: Test Your Setup

1. **Run Test Function (Optional)**
   - In Google Apps Script, click "Select function" dropdown
   - Choose `testSetup`
   - Click "Run"
   - Check the execution log for test results

2. **Test Live Form**
   - Go to your website
   - Fill out the waitlist form with a test email
   - Submit the form
   - You should see a success message

3. **Verify Data in Google Sheets**
   - Go to Google Drive
   - Look for "BlockWill Waitlist Data" spreadsheet
   - Check if your test data appears

## 📊 Google Sheet Structure

Your data will be organized in columns:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Source | Interests | Company | Form Location |

## 🔧 Customization Options

### Adding More Form Fields

1. **Update HTML Form**
   ```html
   <input type="text" name="company" placeholder="Company (Optional)" class="form-input-lg" />
   ```

2. **Update JavaScript Data Collection**
   ```javascript
   const submitData = {
       name: name,
       email: email,
       company: form.querySelector('input[name="company"]')?.value || '',
       // ... other fields
   };
   ```

3. **Update Google Apps Script**
   - Add new field to `rowData` array in the `doPost` function

### Email Notifications

To receive email notifications when someone joins:
1. Set `NOTIFICATION_EMAIL` in the Apps Script code
2. The script will email you each new signup

### Duplicate Email Prevention

The script automatically prevents duplicate email addresses from being added.

## 🚨 Troubleshooting

### Common Issues:

1. **"Script not found" Error**
   - Check the Google Apps Script URL is correct
   - Ensure the script is deployed as a web app
   - Verify "Anyone" has access

2. **CORS Errors**
   - The script includes proper CORS headers
   - If issues persist, try redeploying the script

3. **Form Submits But No Data**
   - Check browser console for error messages
   - Verify the Google Apps Script URL in your HTML
   - Run the `testSetup` function in Apps Script

4. **Permission Errors**
   - Reauthorize the script in Google Apps Script
   - Ensure you're signed in to the correct Google account

### Debug Mode

To see detailed logs:
1. Submit a form
2. Go to Google Apps Script → Executions
3. Click on the latest execution to see logs

## 🔐 Security & Privacy

- **Data Protection**: Only authorized users can access the Google Sheet
- **HTTPS**: All data transmission is encrypted
- **No Sensitive Data**: Only names and emails are collected
- **GDPR Compliance**: Users can request data removal

## 📈 Analytics Integration

The code includes Google Analytics event tracking:
```javascript
gtag('event', 'waitlist_signup', {
    'method': 'form',
    'email': email
});
```

## 🔄 Updating Your Integration

When you need to make changes:

1. **Update Apps Script**
   - Make changes in Google Apps Script
   - Save the file
   - No need to redeploy unless you change permissions

2. **Update Website**
   - Make changes to your HTML/JavaScript
   - Deploy to your website as usual

## 📞 Support

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Check Google Apps Script execution logs
3. Verify all URLs and permissions are correct
4. Test with different browsers/devices

## 🎉 Success!

Once set up, your waitlist will automatically:
- ✅ Store all form submissions in Google Sheets
- ✅ Prevent duplicate emails
- ✅ Send confirmation messages to users  
- ✅ Provide detailed error handling
- ✅ Track analytics events
- ✅ Send email notifications (if configured)

Your BlockWill waitlist is now powered by Google Sheets! 🚀