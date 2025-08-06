# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML landing page for BlockWill, a blockchain-based estate planning platform. The project uses Tailwind CSS for styling and component tagging for development workflow.

## Development Commands

### CSS Build Process
- **Build CSS**: `npm run build:css` - Compiles Tailwind CSS from source to output
- **Watch CSS**: `npm run watch:css` - Watches for changes and rebuilds CSS automatically  
- **Development**: `npm run dev` - Alias for watch:css, used for development

### Installation
- `npm install` - Install all dependencies

## Architecture & Structure

### Core Files
- `index.html` - Main Landing page
- `css/tailwind.css` - Tailwind source file with custom utilities and imports
- `css/main.css` - Compiled CSS output (generated, do not edit manually)
- `tailwind.config.js` - Tailwind configuration with custom theme, colors, and fonts

### Styling System
- **Primary Colors**: Deep purple theme (#4a148c primary, #7b1fa2 primary-light)
- **Typography**: Inter for body text, Playfair Display for serif accents
- **Components**: Custom btn-primary, card, and form-input classes
- **Build Process**: Uses @dhiwise/component-tagger before Tailwind compilation

### Key Features
- Interactive asset risk calculator with sliders
- Tabbed product showcase (SecureVault, Digital Will, HeirKey)
- FAQ accordion functionality
- Multi-step onboarding quiz
- Countdown timers and jurisdiction checker
- Responsive design with mobile-specific CTA

### JavaScript Functionality
All JavaScript is inline within landing_page.html and handles:
- Asset value calculations and risk assessment
- Tab switching for product features
- FAQ expand/collapse
- Quiz navigation and results
- Real-time countdown timers
- Jurisdiction validation checker

## Development Notes

- The project uses component tagging via @dhiwise/component-tagger before CSS compilation
- All interactive features are implemented with vanilla JavaScript
- External dependencies are minimal (only Tailwind and related plugins)
- Images use Unsplash/Pexels with fallback URLs for reliability
- Mobile-first responsive design approach