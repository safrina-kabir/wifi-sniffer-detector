import React from 'react';
import { Wifi, Shield, Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  totalNetworks: number;
  lastScanTime: string | null;
}

const Header: React.FC<HeaderProps> = ({ totalNetworks, lastScanTime }) => {
  const formatScanTime = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Wifi className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                WiFi Sniffer
              </h1>
            </div>
            <div className="hidden sm:flex items-center space-x-4 ml-8">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {totalNetworks} Networks
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Last Scan: {formatScanTime(lastScanTime)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;