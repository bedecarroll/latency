# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a network latency calculator web application that estimates one-way and round-trip time (RTT) latency based on the distance between network sites. The calculator uses the theoretical speed of light in fiber optic cables (124 miles/millisecond) with adjustable fudge factors for real-world conditions.

## Development Commands

- `npm install` - Install TypeScript dependencies
- `npm run build` - Compile TypeScript and create production build in `public/` directory
- `npm run dev` - Run TypeScript compiler in watch mode for development
- `npm run serve` - Serve the built application (requires `serve` package)
- `npm run serve:python` - Alternative: serve using Python's built-in HTTP server on port 8000

## Architecture

### Core Application Structure
- **Single-page application** with real-time calculations
- **TypeScript-based** with strict type checking enabled
- **No external runtime dependencies** - pure HTML/CSS/JavaScript output
- **Module system**: ES2020 modules with TypeScript compilation to `dist/`

### Key Components
- `src/main.ts` - Main `LatencyCalculator` class that handles:
  - DOM element binding and event handling
  - Real-time latency calculations on input changes  
  - Theme persistence (light/dark mode)
  - Core calculation logic using speed of light constants

### Calculation Logic
- **Speed constants**: 124 miles/ms and 199.65 km/ms for fiber optic cables
- **Formula**: `(Distance ÷ Speed) × (1 + Fudge Factor %) = One-way latency`
- **RTT**: One-way latency × 2
- **Unit conversion**: Automatic conversion between miles and kilometers

### Build Process
The build system:
1. Compiles TypeScript from `src/` to `dist/`
2. Creates `public/` directory with HTML, CSS, and compiled JavaScript
3. Copies static assets (index.html, styles.css) to public directory
4. Results in a deployable static site in `public/`

### Styling Architecture
- **Monospace font theme** (Courier New) for technical calculator aesthetic
- **4px solid black borders** throughout for consistent visual style
- **Grid-based responsive layout** for result cards
- **Dark/light theme support** with localStorage persistence
- **Mobile-responsive** design with breakpoints

## Important Notes

- The application calculates latency in real-time as users type (no submit button needed)
- Theme preference is persisted in localStorage
- All calculations happen client-side with no server dependencies
- The fudge factor defaults to 30% to account for routing overhead and real-world conditions