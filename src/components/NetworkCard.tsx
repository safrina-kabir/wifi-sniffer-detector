import React from 'react';
import { WiFiNetwork } from '../types/wifi';
import SignalMeter from './SignalMeter';
import { Shield, ShieldCheck, ShieldX, Wifi, Clock, MapPin } from 'lucide-react';

interface NetworkCardProps {
  network: WiFiNetwork;
  onClick?: () => void;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ network, onClick }) => {
  const getEncryptionIcon = () => {
    if (network.encryption === 'Open') {
      return <ShieldX className="w-5 h-5 text-red-500" />;
    } else if (network.encryption.includes('WPA3')) {
      return <ShieldCheck className="w-5 h-5 text-green-500" />;
    } else {
      return <Shield className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getFrequencyBand = () => {
    return network.frequency >= 5000 ? '5GHz' : '2.4GHz';
  };

  const formatLastSeen = () => {
    const now = new Date();
    const lastSeen = new Date(network.lastSeen);
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return 'Just now';
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return `${Math.floor(diffSecs / 3600)}h ago`;
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wifi className="w-6 h-6 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {network.ssid}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {network.mac}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getEncryptionIcon()}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {network.encryption}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Ch {network.channel} ({getFrequencyBand()})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formatLastSeen()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Signal:</span>
          <SignalMeter network={network} showPercentage />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {network.vendor}
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;