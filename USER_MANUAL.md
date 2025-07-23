# WiFi Sniffer Detector - User Manual

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Interface Guide](#interface-guide)
4. [Features](#features)
5. [Troubleshooting](#troubleshooting)
6. [Technical Information](#technical-information)
7. [FAQ](#faq)

## Overview

WiFi Sniffer Detector is a professional web application designed to scan and analyze nearby WiFi networks. It provides detailed information about network properties including signal strength, security protocols, and technical specifications.

### Key Capabilities
- Real-time WiFi network scanning
- Comprehensive network analysis
- Signal strength visualization
- Advanced filtering and sorting
- Data export functionality
- Dark/light theme support
- Mobile-responsive design

## Getting Started

### Accessing the Application
1. Open your web browser
2. Navigate to the application URL
3. The dashboard will load automatically

### System Requirements
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Internet Connection**: Required for initial loading
- **JavaScript**: Must be enabled

### First Scan
1. Click the **"Scan Networks"** button in the control panel
2. Wait for the scanning process to complete (1-3 seconds)
3. View the discovered networks in the results area

## Interface Guide

### Header Section
- **WiFi Sniffer Logo**: Application branding and navigation
- **Network Counter**: Shows total number of discovered networks
- **Last Scan Time**: Displays when the most recent scan was performed
- **Theme Toggle**: Switch between light and dark modes

### Control Panel
The control panel contains all primary interaction elements:

#### Scan Button
- **Location**: Top-left of control panel
- **Function**: Initiates network scanning
- **States**: 
  - Normal: "Scan Networks"
  - Active: "Scanning..." with spinning icon
- **Shortcut**: Click to start immediate scan

#### Search Bar
- **Location**: Next to scan button
- **Function**: Filter networks by SSID, MAC address, or encryption type
- **Usage**: Type any part of the network information
- **Real-time**: Results update as you type

#### Export Options
- **Location**: Top-right of control panel
- **Formats Available**:
  - **CSV**: Spreadsheet-compatible format
  - **JSON**: Developer-friendly structured data
- **File Naming**: Automatically includes current date

### Filter Controls

#### Sort Options
**Available Sort Criteria**:
- **Signal Strength**: Orders by RSSI values
- **Network Name**: Alphabetical sorting by SSID
- **Channel**: Numerical order by WiFi channel
- **Encryption**: Groups by security protocol

**Sort Direction**:
- **↑ (Ascending)**: Low to high values
- **↓ (Descending)**: High to low values (default)

#### Filter Categories
- **All Networks**: Shows every discovered network
- **Secure Only**: Displays encrypted networks only
- **Open Networks**: Shows unsecured networks
- **WPA2 Only**: Filters for WPA2 encryption
- **WPA3 Only**: Shows latest security standard

### Network Cards

Each network is displayed in an individual card containing:

#### Header Information
- **Network Name (SSID)**: Primary identifier
- **MAC Address**: Hardware identifier (partially masked for privacy)
- **Security Icon**: Visual encryption status indicator
  - 🛡️ Green: WPA3 (Excellent security)
  - 🛡️ Yellow: WPA2 (Good security)
  - ❌ Red: Open (No security)

#### Technical Details
- **Channel & Frequency**: WiFi channel and band information
- **Last Seen**: Time since network was detected
- **Signal Meter**: Visual representation of signal strength
- **Vendor**: Network equipment manufacturer

## Features

### Network Scanning

#### How It Works
1. Click "Scan Networks" to initiate discovery
2. Application simulates network detection process
3. Results populate in real-time
4. Scan completes with summary information

#### Scan Results Include
- **SSID**: Network name/identifier
- **MAC Address**: Hardware address (privacy-masked)
- **Signal Strength**: RSSI value in dBm
- **Channel**: WiFi channel number
- **Frequency**: Operating frequency in MHz
- **Encryption**: Security protocol type
- **Vendor**: Equipment manufacturer
- **Last Seen**: Detection timestamp

### Signal Strength Analysis

#### Signal Meter Visualization
- **4-Bar Display**: Visual signal strength indicator
- **Color Coding**:
  - Green: Excellent (-50 dBm or higher)
  - Blue: Good (-50 to -60 dBm)
  - Yellow: Fair (-60 to -70 dBm)
  - Red: Poor (below -70 dBm)

#### Signal Quality Percentage
- Calculated from RSSI values
- Range: 0-100%
- Formula: (RSSI + 100) × 2

### Data Export

#### CSV Export
- **Use Case**: Spreadsheet analysis, reporting
- **Contains**: All network data in tabular format
- **Filename**: `wifi-scan-YYYY-MM-DD.csv`

#### JSON Export
- **Use Case**: Developer integration, data processing
- **Contains**: Structured data with metadata
- **Includes**: Scan timestamp and network count
- **Filename**: `wifi-scan-YYYY-MM-DD.json`

### Theme Support

#### Light Mode
- Clean, bright interface
- Optimal for daylight use
- High contrast text

#### Dark Mode
- Reduced eye strain
- Better for low-light environments
- Modern aesthetic

**Switching Themes**:
1. Click the theme toggle button in header
2. Setting persists across sessions
3. Automatic system preference detection

### Search and Filtering

#### Search Functionality
- **Search Fields**: SSID, MAC address, encryption type
- **Case Insensitive**: Matches regardless of capitalization
- **Partial Matching**: Finds networks containing search term
- **Real-time Results**: Updates as you type

#### Advanced Filtering
- **Security-based**: Filter by encryption protocol
- **Combined Filters**: Search + filter work together
- **Result Counter**: Shows filtered network count

## Troubleshooting

### Common Issues

#### No Networks Found
**Possible Causes**:
- First-time loading
- Network connectivity issues
- Browser compatibility

**Solutions**:
1. Click "Scan Networks" button
2. Refresh the page
3. Check internet connection
4. Try a different browser

#### Slow Loading
**Possible Causes**:
- Slow internet connection
- Browser performance issues

**Solutions**:
1. Wait for scan to complete
2. Close unnecessary browser tabs
3. Clear browser cache

#### Export Not Working
**Possible Causes**:
- Browser security settings
- Pop-up blockers

**Solutions**:
1. Allow downloads in browser settings
2. Disable pop-up blockers for the site
3. Try right-click "Save As"

### Error Messages

#### "Network error: Unable to connect to scanning service"
- **Meaning**: Backend API unavailable
- **Solution**: Refresh page, try again later

#### "Failed to scan networks"
- **Meaning**: Scanning process encountered an error
- **Solution**: Wait a moment and retry scan

## Technical Information

### Data Simulation
This application uses simulated WiFi data for demonstration purposes. Real WiFi packet capture requires:
- Specialized hardware
- System-level access
- Native applications

### Privacy & Security
- **MAC Address Masking**: Only first 2 and last 2 octets shown
- **No Personal Data**: No user information collected
- **Local Processing**: All filtering/sorting done in browser

### Performance
- **Scan Duration**: 1-3 seconds (simulated)
- **Network Limit**: Optimized for 50+ networks
- **Browser Memory**: Minimal impact on system resources

### API Endpoints
- `GET /api/scan`: Retrieve network list
- `GET /api/details/:ssid`: Get specific network info
- `GET /api/health`: Service status check

## FAQ

### General Questions

**Q: Is this real WiFi scanning?**
A: No, this application uses simulated data for demonstration. Real WiFi scanning requires specialized hardware and system-level access not available in web browsers.

**Q: Can I use this for security auditing?**
A: This is a demonstration tool only. For professional security auditing, use dedicated tools like Wireshark, Kismet, or Aircrack-ng.

**Q: Does this work on mobile devices?**
A: Yes, the interface is fully responsive and optimized for mobile and tablet use.

### Technical Questions

**Q: Why are MAC addresses partially hidden?**
A: For privacy protection. Only the vendor prefix and device suffix are shown.

**Q: How accurate is the signal strength?**
A: Signal values are simulated and include realistic variations. Real measurements would require hardware access.

**Q: Can I integrate this with other tools?**
A: Yes, exported JSON data can be imported into other network analysis tools.

### Usage Questions

**Q: How often should I scan?**
A: Networks are simulated, so each scan will show slight variations in signal strength and timing.

**Q: What's the difference between WPA2 and WPA3?**
A: WPA3 is the latest WiFi security standard with improved encryption and protection against attacks.

**Q: Why do some networks show as "Open"?**
A: Open networks have no password protection and are potentially less secure.

---

## Support

For technical support or feature requests, please refer to the project documentation or contact the development team.

**Version**: 1.0.0  
**Last Updated**: December 2024