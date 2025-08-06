# BlockWill Waitlist - Formspree Integration Guide

## Why Formspree?

After experiencing persistent CORS issues with Google Apps Script, Formspree provides a reliable, free alternative that:
- ✅ Works immediately without CORS issues
- ✅ Sends data to your email
- ✅ Can integrate with Google Sheets via Zapier
- ✅ Free tier includes 50 submissions/month

## Quick Setup (5 Minutes)

### Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Sign up for a free account
3. Click "New Form"
4. Name it "BlockWill Waitlist"

### Step 2: Get Your Form Endpoint

After creating the form, you'll get an endpoint like:
```
https://formspree.io/f/YOUR_FORM_ID
```

### Step 3: Update Your Website

Replace the Google Apps Script URL in your `index.html` with your Formspree endpoint.

### Step 4: Configure Form Settings

In Formspree dashboard:
1. Go to your form settings
2. Enable "Email notifications"
3. Add your email to receive submissions
4. Optional: Set up reCAPTCHA for spam protection

## Alternative Solutions

### Option A: Google Forms (Simplest)

1. Create a Google Form: https://forms.google.com
2. Add Name (optional) and Email (required) fields
3. Get the embed code or share link
4. Responses automatically go to Google Sheets

### Option B: Netlify Forms (If Using Netlify)

If you switch to Netlify hosting:
1. Add `data-netlify="true"` to your form
2. Submissions automatically collected
3. Export to CSV anytime

### Option C: Web3Forms (Another Free Alternative)

1. Go to https://web3forms.com
2. Get an access key
3. No signup required
4. 250 submissions/month free

## Connect Formspree to Google Sheets

### Using Zapier (Free Tier)

1. Create a Zapier account
2. Create new Zap: Formspree → Google Sheets
3. Map form fields to sheet columns
4. Automatic sync every 15 minutes

### Using Make.com (Alternative)

1. Similar to Zapier
2. Better free tier limits
3. Real-time sync available

## Implementation Code

```javascript
// Replace GOOGLE_APPS_SCRIPT_URL with:
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Update submitToGoogleSheets function:
async function submitToFormspree(data) {
    const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}
```

## Testing

1. Submit a test form
2. Check your email for the submission
3. View all submissions in Formspree dashboard
4. Export to CSV when needed

## Benefits Over Google Apps Script

- ✅ No CORS issues
- ✅ Works on localhost and production
- ✅ Built-in spam protection
- ✅ Email notifications
- ✅ Form analytics
- ✅ Export to CSV
- ✅ Webhook support
- ✅ No coding required

Your waitlist will be fully functional in 5 minutes!