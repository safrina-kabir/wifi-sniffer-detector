export interface WiFiNetwork {
  ssid: string;
  mac: string;
  rssi: number;
  channel: number;
  frequency: number;
  encryption: string;
  vendor: string;
  lastSeen: string;
  signalQuality?: number;
  securityDetails?: {
    encryption: string;
    authenticated: boolean;
    wpsEnabled: boolean;
  };
}

export interface ScanResult {
  success: boolean;
  networks: WiFiNetwork[];
  scanTime: string;
  totalNetworks: number;
  error?: string;
}

export interface NetworkDetailsResult {
  success: boolean;
  network: WiFiNetwork;
  error?: string;
}

export type SortBy = 'rssi' | 'ssid' | 'channel' | 'encryption';
export type SortOrder = 'asc' | 'desc';
export type FilterBy = 'all' | 'secure' | 'open' | 'wpa2' | 'wpa3';