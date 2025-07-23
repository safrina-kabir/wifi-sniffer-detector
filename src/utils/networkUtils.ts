import { WiFiNetwork, SortBy, SortOrder, FilterBy } from '../types/wifi';

export const sortNetworks = (networks: WiFiNetwork[], sortBy: SortBy, sortOrder: SortOrder): WiFiNetwork[] => {
  return [...networks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rssi':
        comparison = b.rssi - a.rssi; // Higher signal strength first by default
        break;
      case 'ssid':
        comparison = a.ssid.localeCompare(b.ssid);
        break;
      case 'channel':
        comparison = a.channel - b.channel;
        break;
      case 'encryption':
        comparison = a.encryption.localeCompare(b.encryption);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const filterNetworks = (networks: WiFiNetwork[], filterBy: FilterBy): WiFiNetwork[] => {
  switch (filterBy) {
    case 'secure':
      return networks.filter(network => network.encryption !== 'Open');
    case 'open':
      return networks.filter(network => network.encryption === 'Open');
    case 'wpa2':
      return networks.filter(network => network.encryption.includes('WPA2'));
    case 'wpa3':
      return networks.filter(network => network.encryption.includes('WPA3'));
    case 'all':
    default:
      return networks;
  }
};

export const getSignalQuality = (rssi: number): number => {
  return Math.max(0, Math.min(100, (rssi + 100) * 2));
};

export const getSignalLevel = (rssi: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (rssi >= -50) return 'excellent';
  if (rssi >= -60) return 'good';
  if (rssi >= -70) return 'fair';
  return 'poor';
};

export const getFrequencyBand = (frequency: number): '2.4GHz' | '5GHz' | '6GHz' => {
  if (frequency >= 5955) return '6GHz';
  if (frequency >= 5000) return '5GHz';
  return '2.4GHz';
};