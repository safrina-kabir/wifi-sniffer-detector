import React, { useState, useEffect } from 'react';
import { useWiFiScanner } from './hooks/useWiFiScanner';
import { useTheme } from './hooks/useTheme';
import { sortNetworks, filterNetworks } from './utils/networkUtils';
import { SortBy, SortOrder, FilterBy } from './types/wifi';
import Header from './components/Header';
import NetworkCard from './components/NetworkCard';
import FilterControls from './components/FilterControls';
import ExportButton from './components/ExportButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Search, Wifi, RefreshCw } from 'lucide-react';

function App() {
  const { theme } = useTheme();
  const { networks, isScanning, lastScanTime, error, scanNetworks } = useWiFiScanner();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('rssi');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  // Initial scan on component mount
  useEffect(() => {
    scanNetworks();
  }, [scanNetworks]);

  // Filter and sort networks
  const filteredNetworks = filterNetworks(networks, filterBy);
  const searchedNetworks = filteredNetworks.filter(network =>
    network.ssid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    network.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
    network.encryption.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedNetworks = sortNetworks(searchedNetworks, sortBy, sortOrder);

  const handleSortChange = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (newFilterBy: FilterBy) => {
    setFilterBy(newFilterBy);
  };

  const handleScan = () => {
    scanNetworks();
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme}`}>
      <Header totalNetworks={networks.length} lastScanTime={lastScanTime} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning...' : 'Scan Networks'}</span>
              </button>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search networks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ExportButton networks={sortedNetworks} />
            </div>
          </div>
          
          <div className="mt-6">
            <FilterControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              filterBy={filterBy}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => {}}
          />
        )}

        {/* Loading State */}
        {isScanning && (
          <div className="flex justify-center py-12">
            <LoadingSpinner message="Scanning for WiFi networks..." size="lg" />
          </div>
        )}

        {/* Network Results */}
        {!isScanning && (
          <>
            {sortedNetworks.length === 0 ? (
              <div className="text-center py-12">
                <Wifi className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No networks found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'Try adjusting your search criteria.' : 'Click "Scan Networks" to start scanning.'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Found {sortedNetworks.length} network{sortedNetworks.length !== 1 ? 's' : ''}
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {searchQuery && (
                      <span>Filtered by "{searchQuery}" • </span>
                    )}
                    {filterBy !== 'all' && (
                      <span>Showing {filterBy} networks • </span>
                    )}
                    Sorted by {sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedNetworks.map((network) => (
                    <NetworkCard
                      key={`${network.ssid}-${network.mac}`}
                      network={network}
                      onClick={() => setSelectedNetwork(network.ssid)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Technical Note */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Wifi className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                Technical Note
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                This application uses simulated WiFi data for demonstration purposes. 
                Real WiFi packet capture requires specialized hardware and system-level access 
                that isn't available in web browsers. For production use, consider integrating 
                with dedicated WiFi scanning hardware or network monitoring tools.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;