# BlockWill Formspree Integration - Quick Setup

## 2-Minute Setup Guide

### Step 1: Get Your Formspree Endpoint
1. Go to https://formspree.io
2. Enter your email address in the quick setup box
3. You'll instantly get an endpoint like: `https://formspree.io/f/xyzabc123`

### Step 2: Replace Google Form with Simple HTML Form

Replace the Google Form iframe section (lines 175-188) in index.html with this:

```html
<div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <form id="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                </label>
                <input type="text" name="name" id="name" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe">
            </div>
            
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                </label>
                <input type="email" name="email" id="email" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com">
            </div>
            
            <button type="submit" 
                class="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Join Waitlist for Q2 2025 Launch
            </button>
            
            <p class="text-center text-sm text-gray-500">
                Be among the first 1,000 users to get exclusive launch pricing
            </p>
        </form>
        
        <!-- Success Message (Hidden by default) -->
        <div id="success-message" class="hidden text-center py-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
            <p class="text-gray-600">Check your email for confirmation and updates.</p>
        </div>
    </div>
</div>
```

### Step 3: Add JavaScript (Optional - for better UX)

Add this script before closing </body> tag:

```javascript
<script>
document.getElementById('waitlist-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Joining...';
    button.disabled = true;
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Hide form, show success message
            form.style.display = 'none';
            document.getElementById('success-message').classList.remove('hidden');
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        alert('There was an error. Please try again.');
        button.textContent = originalText;
        button.disabled = false;
    });
});
</script>
```

## That's it! 

- No CORS issues
- Works immediately
- Free tier: 50 submissions/month
- You get email notifications instantly
- Export data anytime from Formspree dashboard