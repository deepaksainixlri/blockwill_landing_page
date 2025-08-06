// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_CONFIG = {
    url: 'https://hbjzhtnqhrkgwilzycsp.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhianpodG5xaHJrZ3dpbHp5Y3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTE0ODAsImV4cCI6MjA3MDA4NzQ4MH0.Q1N8APngPUSkbDIqrIQ5Dw_RsMbEcrpzmkBjOLQF6rU'
};

// Example format:
// url: 'https://your-project-id.supabase.co'
// anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
