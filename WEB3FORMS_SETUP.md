# Web3Forms - Instant Setup (No Signup!)

## 1-Minute Setup - No Account Needed!

### Step 1: Get Your Access Key
1. Go to https://web3forms.com
2. Enter your email
3. Get instant access key (no signup!)

### Step 2: Replace in index.html

Replace the Google Form section with:

```html
<div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <form id="waitlist-form" class="space-y-6">
            <!-- Hidden field with your access key -->
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
            
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                </label>
                <input type="text" name="name" id="name" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                </label>
                <input type="email" name="email" id="email" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            
            <button type="submit" 
                class="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Join Waitlist
            </button>
        </form>
    </div>
</div>

<script>
const form = document.getElementById('waitlist-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    });
    
    const result = await response.json();
    if (result.success) {
        alert('Successfully joined the waitlist!');
        form.reset();
    }
});
</script>
```

## Benefits:
- NO signup required
- 250 free submissions/month
- Instant email notifications
- Zero CORS issues
- Works in 1 minute