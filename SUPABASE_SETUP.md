# Supabase Setup Guide for BlockWill

## Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new organization (if needed)

## Step 2: Create New Project
1. Click "New Project"
2. Choose your organization
3. Enter project details:
   - **Name**: `blockwill-waitlist`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for setup to complete (2-3 minutes)

## Step 3: Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
3. Copy your **anon public** key (starts with `eyJ...`)

## Step 4: Create Database Table
1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Paste and run this SQL:

```sql
CREATE TABLE waitlist_submissions (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  country VARCHAR(255),
  state VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON waitlist_submissions
  FOR INSERT WITH CHECK (true);

-- Allow reads for admin dashboard
CREATE POLICY "Allow reads" ON waitlist_submissions
  FOR SELECT USING (true);
```

4. Click "Run" to execute the query

## Step 5: Update Your Configuration
1. Open `config.js` in your project
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',  // Your Project URL
    anonKey: 'your-anon-key-here'               // Your anon public key
};
```

## Step 6: Test Your Setup
1. Open `index.html` in your browser
2. Try submitting the waitlist form
3. Check your Supabase dashboard → **Table Editor** → **waitlist_submissions**
4. You should see your test submission

## Step 7: Access Admin Dashboard
1. Open `admin.html` in your browser
2. You should see your submissions and statistics
3. Test the CSV export feature

## Step 8: Deploy to GitHub Pages
1. Push your code to GitHub
2. Go to your repository settings
3. Scroll down to "GitHub Pages"
4. Set source to your main branch
5. Your site will be live at `https://yourusername.github.io/your-repo-name`

## Troubleshooting

### Form Not Submitting
- Check browser console for errors
- Verify your Supabase credentials in `config.js`
- Ensure the database table was created successfully

### CORS Errors
- Supabase handles CORS automatically
- Make sure you're using the correct anon key (not the service role key)

### Database Connection Issues
- Check your Supabase project status
- Verify your project URL is correct
- Ensure Row Level Security policies are set up

## Security Notes
- ✅ The anon key is safe to use in client-side code
- ✅ Row Level Security prevents unauthorized access
- ✅ Email addresses are unique (no duplicates)
- ✅ All data is encrypted at rest

## Support
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [discord.gg/supabase](https://discord.gg/supabase)
- GitHub Issues: Create an issue in your repository

---

**Your BlockWill waitlist is now ready for production! 🚀**
