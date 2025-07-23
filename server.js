import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Mock WiFi network data generator
const generateMockNetworks = () => {
  const networks = [
    {
      ssid: "HomeNetwork_5G",
      mac: "AA:BB:CC:DD:EE:FF",
      rssi: -45,
      channel: 36,
      frequency: 5180,
      encryption: "WPA3",
      vendor: "Netgear",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "CoffeeShop_WiFi",
      mac: "11:22:33:44:55:66",
      rssi: -72,
      channel: 6,
      frequency: 2437,
      encryption: "WPA2",
      vendor: "Cisco",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "Office_Network",
      mac: "77:88:99:AA:BB:CC",
      rssi: -38,
      channel: 149,
      frequency: 5745,
      encryption: "WPA2-Enterprise",
      vendor: "Ubiquiti",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "AndroidAP_1234",
      mac: "DD:EE:FF:00:11:22",
      rssi: -85,
      channel: 11,
      frequency: 2462,
      encryption: "WPA2",
      vendor: "Samsung",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "SmartHome_IoT",
      mac: "33:44:55:66:77:88",
      rssi: -55,
      channel: 44,
      frequency: 5220,
      encryption: "WPA3",
      vendor: "TP-Link",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "Guest_Network",
      mac: "99:AA:BB:CC:DD:EE",
      rssi: -68,
      channel: 1,
      frequency: 2412,
      encryption: "Open",
      vendor: "Linksys",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "Enterprise_Secure",
      mac: "FF:00:11:22:33:44",
      rssi: -42,
      channel: 157,
      frequency: 5785,
      encryption: "WPA3-Enterprise",
      vendor: "Aruba",
      lastSeen: new Date().toISOString()
    },
    {
      ssid: "Neighbor_WiFi",
      mac: "55:66:77:88:99:AA",
      rssi: -78,
      channel: 3,
      frequency: 2422,
      encryption: "WPA2",
      vendor: "D-Link",
      lastSeen: new Date().toISOString()
    }
  ];

  // Add some randomization to signal strength
  return networks.map(network => ({
    ...network,
    rssi: network.rssi + Math.floor(Math.random() * 10 - 5),
    lastSeen: new Date().toISOString()
  }));
};

// Mask MAC address for privacy
const maskMacAddress = (mac) => {
  const parts = mac.split(':');
  return `${parts[0]}:${parts[1]}:XX:XX:${parts[4]}:${parts[5]}`;
};

// API Routes
app.get('/api/scan', (req, res) => {
  try {
    // Simulate scanning delay
    setTimeout(() => {
      const networks = generateMockNetworks();
      const maskedNetworks = networks.map(network => ({
        ...network,
        mac: maskMacAddress(network.mac)
      }));
      
      res.json({
        success: true,
        networks: maskedNetworks,
        scanTime: new Date().toISOString(),
        totalNetworks: maskedNetworks.length
      });
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to scan networks'
    });
  }
});

app.get('/api/details/:ssid', (req, res) => {
  try {
    const { ssid } = req.params;
    const networks = generateMockNetworks();
    const network = networks.find(n => n.ssid === ssid);
    
    if (!network) {
      return res.status(404).json({
        success: false,
        error: 'Network not found'
      });
    }
    
    res.json({
      success: true,
      network: {
        ...network,
        mac: maskMacAddress(network.mac),
        signalQuality: Math.max(0, Math.min(100, (network.rssi + 100) * 2)),
        securityDetails: {
          encryption: network.encryption,
          authenticated: network.encryption !== 'Open',
          wpsEnabled: Math.random() > 0.5
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get network details'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`WiFi Sniffer API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});