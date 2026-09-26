import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { getMarketCurrentStatus } from '../utils/marketSchedule';

// Create bespoke botanical map pins matching Warm Editorial Earth palette
function createCustomPin(isSelected = false, isOpen = false) {
  const bg = isSelected ? '#E2725B' : isOpen ? '#2D5A27' : '#5C685B';
  const border = '#FFFFFF';
  
  return L.divIcon({
    className: 'custom-editorial-marker',
    html: `
      <div style="
        position: relative;
        width: 34px;
        height: 34px;
        background: ${bg};
        color: white;
        border: 2px solid ${border};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 2px 3px 6px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        ">🌱</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}

function RecenterMap({ lat, lng, zoom = 12 }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  }, [lat, lng, zoom, map]);
  return null;
}

export default function MarketMap({ markets = [], selectedMarketId = null, onSelectMarket = () => {}, center = [37.7749, -122.425], zoom = 12, height = "100%" }) {
  const [mapReady, setMapReady] = useState(false);

  // Find coordinates for selected market if any
  const selectedMarket = markets.find((m) => m.id === selectedMarketId);
  const activeCenter = selectedMarket ? [selectedMarket.lat, selectedMarket.lng] : center;

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="relative z-10 w-full overflow-hidden border-crisp bg-[#EDEAE1]" style={{ height }}>
      {/* Editorial Map Badge */}
      <div className="absolute top-3 left-3 z-20 bg-[#FFFFFF]/95 backdrop-blur-sm border-crisp px-3 py-1.5 shadow-tactile-sm text-xs font-semibold tracking-wide text-[#2D5A27] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></span>
        <span>CARTOGRAPHIC REGIONAL PREVIEW</span>
      </div>

      {mapReady && (
        <MapContainer
          center={activeCenter}
          zoom={zoom}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ minHeight: '380px', height: '100%', width: '100%' }}
        >
          {/* CartoDB Positron / Voyager muted tiles for beautiful warm editorial styling */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {selectedMarket && (
            <RecenterMap lat={selectedMarket.lat} lng={selectedMarket.lng} zoom={13} />
          )}

          {markets.map((market) => {
            const isSelected = market.id === selectedMarketId;
            const status = getMarketCurrentStatus(market.operatingHours);

            return (
              <Marker
                key={market.id}
                position={[market.lat, market.lng]}
                icon={createCustomPin(isSelected, status.isOpen)}
                eventHandlers={{
                  click: () => onSelectMarket(market.id)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px] max-w-[240px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${status.isOpen ? 'bg-[#2D5A27]' : 'bg-[#5C685B]'}`}></span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C685B]">
                        {status.statusLabel}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1C241B] leading-tight mb-1">
                      {market.name}
                    </h4>
                    <p className="text-xs text-[#5C685B] line-clamp-2 mb-2 leading-relaxed">
                      {market.tagline}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E7E4D8]">
                      <span className="text-[#2D5A27] font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#2D5A27]" /> {market.rating}
                      </span>
                      <Link
                        to={`/markets/${market.id}`}
                        className="text-[#E2725B] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}
