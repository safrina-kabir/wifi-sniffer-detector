import React from 'react';
import { WiFiNetwork } from '../types/wifi';

interface SignalMeterProps {
  network: WiFiNetwork;
  showPercentage?: boolean;
}

const SignalMeter: React.FC<SignalMeterProps> = ({ network, showPercentage = false }) => {
  // Convert RSSI to signal quality percentage (0-100)
  const signalQuality = Math.max(0, Math.min(100, (network.rssi + 100) * 2));
  
  // Determine signal strength level
  const getSignalLevel = (rssi: number) => {
    if (rssi >= -50) return 'excellent';
    if (rssi >= -60) return 'good';
    if (rssi >= -70) return 'fair';
    return 'poor';
  };

  const level = getSignalLevel(network.rssi);
  
  const getSignalColor = () => {
    switch (level) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getBars = () => {
    const bars = [];
    const barCount = 4;
    const filledBars = Math.ceil((signalQuality / 100) * barCount);
    
    for (let i = 0; i < barCount; i++) {
      const isFilled = i < filledBars;
      bars.push(
        <div
          key={i}
          className={`w-1 bg-gray-300 dark:bg-gray-600 rounded-sm transition-all duration-300 ${
            isFilled ? getSignalColor() : ''
          }`}
          style={{
            height: `${12 + (i * 4)}px`,
            opacity: isFilled ? 1 : 0.3
          }}
        />
      );
    }
    
    return bars;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-end space-x-0.5">
        {getBars()}
      </div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {network.rssi} dBm
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          ({Math.round(signalQuality)}%)
        </div>
      )}
    </div>
  );
};

export default SignalMeter;