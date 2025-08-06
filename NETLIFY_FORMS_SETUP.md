# Netlify Forms - Zero Configuration

## If You Deploy to Netlify Instead of GitHub Pages

### Step 1: Deploy to Netlify
1. Push your code to GitHub
2. Go to https://netlify.com
3. Connect your GitHub repo
4. Deploy (automatic)

### Step 2: Add One Attribute to Your Form

Just add `data-netlify="true"` to any form:

```html
<form name="waitlist" data-netlify="true" class="space-y-6">
    <input type="text" name="name" placeholder="Name (Optional)">
    <input type="email" name="email" required placeholder="Email">
    <button type="submit">Join Waitlist</button>
</form>
```

### That's literally it!

- Netlify automatically detects the form
- Stores all submissions
- Export to CSV anytime
- 100 submissions/month free
- Zero configuration
- No CORS issues ever

### Custom Domain
Netlify also provides free SSL and easy custom domain setup.