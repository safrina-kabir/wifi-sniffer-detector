import React from 'react';
import { WiFiNetwork } from '../types/wifi';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  networks: WiFiNetwork[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ networks }) => {
  const exportToCSV = () => {
    const headers = ['SSID', 'MAC Address', 'Signal (dBm)', 'Channel', 'Frequency (MHz)', 'Encryption', 'Vendor', 'Last Seen'];
    const csvContent = [
      headers.join(','),
      ...networks.map(network => [
        `"${network.ssid}"`,
        `"${network.mac}"`,
        network.rssi,
        network.channel,
        network.frequency,
        `"${network.encryption}"`,
        `"${network.vendor}"`,
        `"${network.lastSeen}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `wifi-scan-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify({
      scanTime: new Date().toISOString(),
      totalNetworks: networks.length,
      networks: networks
    }, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `wifi-scan-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Download className="w-5 h-5 text-gray-500" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Export:</span>
      <button
        onClick={exportToCSV}
        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors duration-200"
      >
        CSV
      </button>
      <button
        onClick={exportToJSON}
        className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors duration-200"
      >
        JSON
      </button>
    </div>
  );
};

export default ExportButton;