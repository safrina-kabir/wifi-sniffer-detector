import { useState, useCallback } from 'react';
import { WiFiNetwork, ScanResult, NetworkDetailsResult } from '../types/wifi';

const API_BASE_URL = 'http://localhost:3001/api';

export const useWiFiScanner = () => {
  const [networks, setNetworks] = useState<WiFiNetwork[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scanNetworks = useCallback(async () => {
    setIsScanning(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/scan`);
      const data: ScanResult = await response.json();

      if (data.success) {
        setNetworks(data.networks);
        setLastScanTime(data.scanTime);
      } else {
        setError(data.error || 'Failed to scan networks');
      }
    } catch (err) {
      setError('Network error: Unable to connect to scanning service');
    } finally {
      setIsScanning(false);
    }
  }, []);

  const getNetworkDetails = useCallback(async (ssid: string): Promise<WiFiNetwork | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/details/${encodeURIComponent(ssid)}`);
      const data: NetworkDetailsResult = await response.json();

      if (data.success) {
        return data.network;
      } else {
        setError(data.error || 'Failed to get network details');
        return null;
      }
    } catch (err) {
      setError('Network error: Unable to get network details');
      return null;
    }
  }, []);

  return {
    networks,
    isScanning,
    lastScanTime,
    error,
    scanNetworks,
    getNetworkDetails
  };
};