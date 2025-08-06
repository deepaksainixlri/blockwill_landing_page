const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Store waitlist submissions in memory (in production, use a database)
let waitlistSubmissions = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle waitlist form submissions
app.post('/api/waitlist', (req, res) => {
    try {
        const { email, name, country, state } = req.body;
        
        // Validate email
        if (!email || !email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            });
        }
        
        // Check if email already exists
        const existingSubmission = waitlistSubmissions.find(sub => sub.email === email);
        if (existingSubmission) {
            return res.status(409).json({ 
                success: false, 
                message: 'This email is already on our waitlist!' 
            });
        }
        
        // Add to waitlist
        const submission = {
            email,
            name: name || '',
            country: country || '',
            state: state || '',
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        };
        
        waitlistSubmissions.push(submission);
        
        console.log('New waitlist submission:', submission);
        console.log('Total submissions:', waitlistSubmissions.length);
        
        res.json({ 
            success: true, 
            message: 'Successfully joined the waitlist!',
            submissionCount: waitlistSubmissions.length
        });
        
    } catch (error) {
        console.error('Error processing waitlist submission:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error. Please try again.' 
        });
    }
});

// Get waitlist statistics
app.get('/api/waitlist/stats', (req, res) => {
    res.json({
        totalSubmissions: waitlistSubmissions.length,
        recentSubmissions: waitlistSubmissions.slice(-10) // Last 10 submissions
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        submissions: waitlistSubmissions.length
    });
});

app.listen(PORT, () => {
    console.log(`🚀 BlockWill server running on http://localhost:${PORT}`);
    console.log(`📊 Waitlist submissions: ${waitlistSubmissions.length}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📈 Stats: http://localhost:${PORT}/api/waitlist/stats`);
});