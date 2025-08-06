# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BlockWill is a blockchain-based estate planning platform with a waitlist landing page. The project features a modern HTML/CSS/JS frontend with Express.js backend for form handling, Supabase database integration, and comprehensive admin dashboard functionality.

## Development Commands

### CSS Build Process
- **Build CSS**: `npm run build:css` - Compiles Tailwind CSS using component tagger then builds to css/main.css
- **Watch CSS**: `npm run watch:css` - Watches for changes and rebuilds CSS automatically  
- **Development**: `npm run dev` - Alias for watch:css, used for development

### Server Operations
- **Start Server**: `npm start` or `npm run serve` - Starts Express server on port 3001
- **Local Development**: `node server.js` - Direct server execution

### Installation
- `npm install` - Install all dependencies including Tailwind plugins and Express

## Architecture & Structure

### Core Application Files
- `index.html` - Main waitlist landing page with embedded JavaScript functionality
- `admin.html` - Administrative dashboard for viewing submissions and statistics
- `server.js` - Express server handling waitlist API endpoints (/api/waitlist, /api/waitlist/stats)
- `config.js` - Supabase configuration and API keys

### Styling System
- `css/tailwind.css` - Tailwind source file with custom utilities, fonts (Inter, Satoshi), and component classes
- `css/main.css` - Compiled CSS output (auto-generated, do not edit manually)
- `tailwind.config.js` - Extensive custom theme with Accenture purple colors, typography system, animations, and mesh gradients

### Database Integration
- **Supabase**: Primary database for waitlist submissions with Row Level Security enabled
- **Table**: `waitlist_submissions` with email uniqueness constraints
- **Fallback**: In-memory storage in server.js for development/testing

### Key Features Architecture
- **Form Handling**: Dual-mode submission (Supabase primary, Express fallback) with validation
- **Real-time Updates**: Live waitlist count updates and submission feedback
- **Interactive Elements**: Asset calculator with sliders, tabbed product showcase, FAQ accordions
- **Admin Dashboard**: Real-time statistics, CSV export, submission management
- **Responsive Design**: Mobile-first approach with custom breakpoints

### Build Pipeline
1. `@dhiwise/component-tagger` - Pre-processes HTML for component tagging
2. `tailwindcss` - Compiles custom CSS with extensive plugin ecosystem
3. Express server serves static files and handles API endpoints

## Configuration Files

### Tailwind Configuration (`tailwind.config.js`)
- **Color System**: Accenture-inspired purple theme with semantic color variables
- **Typography**: Inter (body), Satoshi (display), custom fluid sizing
- **Components**: Custom button system, card variants, form inputs, glass morphism
- **Animations**: Float, pulse, gradient, fade effects with custom keyframes
- **Plugins**: Forms, typography, aspect-ratio, container queries

### Package Dependencies
- **Core**: Express.js for server, Supabase client for database
- **Styling**: Tailwind CSS with plugins (forms, typography, animations, elevation, fluid-type)
- **Build Tools**: Component tagger for pre-processing

## Backend API Structure

### Endpoints
- `GET /` - Serves main landing page
- `POST /api/waitlist` - Handles waitlist form submissions with validation
- `GET /api/waitlist/stats` - Returns submission statistics
- `GET /health` - Health check endpoint

### Data Validation
- Email format validation and uniqueness checking
- Country/state selection validation
- Error handling with appropriate HTTP status codes

## JavaScript Functionality

All interactive features are implemented in vanilla JavaScript within the HTML files:
- Asset value calculations and risk assessment algorithms
- Dynamic tab switching for product feature showcase
- FAQ accordion expand/collapse with smooth animations
- Multi-step onboarding quiz with progress tracking
- Real-time countdown timers for launch date
- Form validation and submission with loading states
- Admin dashboard data visualization and CSV export

## Database Schema

### Supabase Table: `waitlist_submissions`
```sql
CREATE TABLE waitlist_submissions (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  country VARCHAR(255), 
  state VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security Policies
- Row Level Security enabled
- Anonymous insert permissions for waitlist submissions
- Read permissions for admin dashboard access

## Development Workflow

1. **CSS Development**: Use `npm run watch:css` for live Tailwind compilation
2. **Server Development**: Run `npm start` for Express server with API endpoints
3. **Database Testing**: Use admin.html dashboard to verify Supabase integration
4. **Form Testing**: Verify both Supabase and fallback submission paths

## Deployment Considerations

- **Static Deployment**: index.html can be deployed to GitHub Pages, Netlify, etc.
- **Server Deployment**: Express server required for advanced form handling and admin features
- **Database**: Supabase handles scaling, backups, and security
- **Environment**: Configure SUPABASE_CONFIG in config.js for production