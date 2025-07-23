# WiFi Sniffer Detector

A professional WiFi network scanner and analyzer built with React, Node.js, and Tailwind CSS.

## Features

- **Real-time WiFi Network Scanning**: Discover nearby networks with detailed information
- **Comprehensive Network Details**: SSID, MAC address, signal strength, channel, frequency, and encryption type
- **Advanced Filtering & Sorting**: Filter by security type and sort by various criteria
- **Signal Strength Visualization**: Interactive signal meters and quality indicators
- **Export Functionality**: Download scan results as CSV or JSON files
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Responsive Design**: Optimized for mobile and desktop devices
- **Security Features**: Input sanitization and MAC address masking

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Supabase (optional)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

This will start both the frontend (port 5173) and backend (port 3001) servers.

## API Endpoints

- `GET /api/scan` - Scan for WiFi networks
- `GET /api/details/:ssid` - Get detailed network information
- `GET /api/health` - Health check endpoint

## Security Features

- Rate limiting on API endpoints
- Input sanitization
- MAC address masking
- CORS protection
- Helmet security headers

## Technical Note

This application uses simulated WiFi data for demonstration purposes. Real WiFi packet capture requires specialized hardware and system-level access that isn't available in web browsers. For production use, consider integrating with dedicated WiFi scanning hardware or network monitoring tools.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License
