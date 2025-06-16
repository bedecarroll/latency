# Network Latency Calculator

A simple web tool to estimate network latency based on distance between sites.

## Features

- Calculate one-way and round-trip time (RTT) latency estimates
- Support for both miles and kilometers distance units
- Adjustable fudge factor to account for real-world conditions
- Based on speed of light in fiber optic cables (124 miles/millisecond)

## Usage

1. Open `index.html` in your web browser
2. Enter the distance between network sites
3. Select distance unit (miles or kilometers)
4. Adjust the fudge factor percentage (default accounts for routing overhead)
5. View calculated one-way latency and RTT estimates

## Calculation Method

The calculator uses the theoretical speed of light in fiber optic cables:
- **Speed of light in fiber**: 124 miles per millisecond (199.65 km/ms)
- **One-way latency** = (Distance / Speed of light in fiber) × (1 + Fudge factor)
- **Round-trip time (RTT)** = One-way latency × 2

The fudge factor accounts for:
- Routing inefficiencies
- Equipment processing delays
- Non-direct path routing
- Real-world fiber characteristics

## Development

1. Run `npm install` to install dependencies
2. Run `npm run build` to compile TypeScript
3. Open `index.html` in your browser or use `npm run serve`

## Technical Details

- Built with TypeScript for type safety
- Responsive design for various screen sizes
- Real-time calculation as you type
- Light/dark theme support
