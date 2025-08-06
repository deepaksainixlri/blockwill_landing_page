# BlockWill - Digital Estate Planning Platform

A modern, blockchain-based estate planning platform launching in Q4 2025. This repository contains the waitlist landing page and form handling system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3001`

### Build CSS
To build the Tailwind CSS:
```bash
npm run build:css
```

To watch for CSS changes:
```bash
npm run watch:css
```

## 🔧 Recent Fixes

### Fixed Issues
1. **SVG Path Error**: Fixed invalid arc flag in SVG path that was causing rendering errors
2. **CORS Error**: Replaced Google Apps Script form submission with Supabase for GitHub Pages compatibility
3. **Form Handling**: Implemented proper form validation and submission handling with real-time database

### Technical Changes
- Integrated Supabase for database operations
- Added real-time waitlist count updates
- Implemented duplicate email prevention
- Created admin dashboard for viewing submissions
- Added CSV export functionality

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Get your project URL and anon key from Settings → API

### 2. Create Database Table
Run this SQL in your Supabase SQL Editor:

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

### 3. Update Configuration
Edit `config.js` with your Supabase credentials:
```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-anon-key-here'
};
```

## 📊 Admin Dashboard

Access your admin dashboard at `admin.html` to:
- View all waitlist submissions
- See real-time statistics
- Export data to CSV
- Monitor submission trends

## 🎨 Features

- **Modern UI**: Built with Tailwind CSS and modern design principles
- **Interactive Calculator**: Asset protection calculator with real-time updates
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Form Validation**: Client and server-side validation
- **Waitlist Management**: Track and manage waitlist submissions
- **Launch Countdown**: Dynamic countdown to Q4 2025 launch

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: Supabase client library
- **Icons**: Heroicons (SVG)

## 📁 Project Structure

```
blockwill/
├── index.html          # Main landing page
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── css/                # Stylesheets
│   ├── main.css        # Compiled Tailwind CSS
│   └── tailwind.css    # Tailwind source
├── Image/              # Images and assets
├── public/             # Public assets
└── README.md           # This file
```

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. Set the source to your main branch
4. Your site will be available at `https://yourusername.github.io/your-repo-name`

### Local Development
```bash
# For local testing with Supabase
# Just open index.html in your browser or use a simple HTTP server
python -m http.server 8000
# or
npx serve .
```

### Production Considerations
1. ✅ Database: Supabase handles this
2. ✅ Security: Row Level Security enabled
3. ✅ Monitoring: Supabase dashboard provides analytics
4. ✅ Scalability: Supabase scales automatically

## 📝 Environment Variables

Create a `.env` file for configuration:
```env
PORT=3001
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support or questions, please contact the development team.

---

**BlockWill** - Securing your digital legacy with blockchain technology.
