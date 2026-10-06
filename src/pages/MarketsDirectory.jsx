import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, MapPin, Clock, Star, Bookmark, CheckCircle2, 
  ArrowRight, X, Sparkles, SlidersHorizontal, Layers, Compass
} from 'lucide-react';
import marketsData from '../data/markets.json';
import { useSaved } from '../context/SavedContext';

import { getMarketCurrentStatus, formatSchedule } from '../utils/marketSchedule';
import MarketMap from '../components/MarketMap';

export default function MarketsDirectory() {
  const [searchParams, setSearchParams]  = useSearchParams();
  var initialFilter = searchParams.get('filter') || 'all';

  let initialSearch  = searchParams.get('search') || searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [onlyOpenNow, setOnlyOpenNow]  = useState(initialFilter == 'open-now');
  const [selectedProduceType, setSelectedProduceType]  = useState('all');
  const [activeMarketId, setActiveMarketId]= useState(marketsData[0]?.id || null);

  const { toggleSaveMarket, isMarketSaved } = useSaved();


  
  useEffect(() => {
    var queryParam = searchParams.get('search') || searchParams.get('q');
    if (queryParam != null) {
      setSearchQuery(queryParam);
    }

  }, [searchParams]);

  

  var regions = useMemo(() => {
    return Array.from(new Set(marketsData.map((m) => m.region)));
  }, []);

  
  var allDays= ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  
  let produceTypes = useMemo(() => {

    let set= new Set();
    marketsData.forEach((m) => m.produceTypes.forEach((p) => set.add(p)));
    return Array.from(set).slice(0, 10);
  }, []);

  
  let filteredMarkets= useMemo(() => {
    return marketsData.filter((market) => {
      var status = getMarketCurrentStatus(market.operatingHours);

      
      if (searchQuery.trim()) {
        let q= searchQuery.toLowerCase();
        var matchesName = market.name.toLowerCase().includes(q);
        let matchesTagline  = market.tagline.toLowerCase().includes(q);
        var matchesRegion = market.region.toLowerCase().includes(q);
        var matchesProduce= market.produceTypes.some((p) => p.toLowerCase().includes(q));
        let matchesVendor  = market.vendors.some((v) => v.name.toLowerCase().includes(q) || v.specialty.toLowerCase().includes(q));

        if (!matchesName && !matchesTagline && !matchesRegion && !matchesProduce && !matchesVendor) {
          return false;
        }
      }


      
      if (selectedRegion != 'all' && market.region != selectedRegion) {
        return false;
      }

      
      if (selectedDay != 'all' && !market.openDays.includes(selectedDay)) {
        return false;
      }

      
      if (onlyOpenNow && !status.isOpen) {
        return false;

      }

      
      if (selectedProduceType != 'all' && !market.produceTypes.includes(selectedProduceType)) {
        return false;

      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedDay, onlyOpenNow, selectedProduceType]);

  let resetAllFilters  = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedDay('all');
    setOnlyOpenNow(false);
    setSelectedProduceType('all');
    setSearchParams();
  };

  var hasActiveFilters =
    searchQuery.trim() != '' ||
    selectedRegion != 'all' ||
    selectedDay != 'all' ||
    onlyOpenNow ||
    selectedProduceType != 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      <div className="border-b border-crisp pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-semibold mb-1">
              <Compass className="w-3.5 h-3.5 text-[#E2725B]" />
              <span>Cartographic & Live Gazette</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1C241B]">
              Marketplace Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#5C685B] mt-1 max-w-xl">
              Split-view directory and interactive map preview. Filter regional farm pavilions by operational schedule, day of week, or seasonal harvests.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#5C685B]">
            <span>Catalog:</span>
            <span className="font-bold text-[#2D5A27] bg-white px-2.5 py-1 border border-crisp shadow-tactile-sm">
              {filteredMarkets.length} of {marketsData.length} Pavilions Available
            </span>
          </div>
        </div>
      </div>


      

      <div className="bg-white border border-crisp p-4 sm:p-5 shadow-tactile-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#5C685B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets by name, heirloom crop, vendor, or district..."

              className="w-full text-xs sm:text-sm bg-[#F7F5ED] border border-crisp pl-9 pr-8 py-2.5 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] rounded-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C685B] hover:text-[#1C241B] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          
          <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`w-full md:w-auto px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                onlyOpenNow
                  ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm hover:bg-[#23461e] hover:-translate-y-0.5'
                  : 'bg-[#F7F5ED] text-[#1C241B] border-crisp hover:bg-white hover:-translate-y-0.5 hover:shadow-tactile-sm'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyOpenNow ? 'bg-[#F3E8B1] animate-pulse' : 'bg-[#5C685B]'}`} />
              <span>Open Right Now</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#E2725B] hover:text-[#C45742] hover:underline font-mono uppercase font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Reset

              </button>
            )}
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E7E4D8]">
          
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#5C685B] font-bold mb-1">
              District / Region

            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs bg-[#F7F5ED] border border-crisp px-3 py-2 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] rounded-none cursor-pointer transition-colors hover:border-[#5C685B]"
            >
              <option value="all">All Regions & Districts</option>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#5C685B] font-bold mb-1">
              Market Day of Week
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full text-xs bg-[#F7F5ED] border border-crisp px-3 py-2 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] rounded-none cursor-pointer transition-colors hover:border-[#5C685B]"
            >
              <option value="all">Any Operating Day</option>
              {allDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#5C685B] font-bold mb-1">
              Produce Specialty
            </label>
            <select
              value={selectedProduceType}
              onChange={(e) => setSelectedProduceType(e.target.value)}
              className="w-full text-xs bg-[#F7F5ED] border border-crisp px-3 py-2 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] rounded-none cursor-pointer transition-colors hover:border-[#5C685B]"
            >
              <option value="all">All Specialties</option>
              {produceTypes.map((type) => (
                <option key={type} value={type}>

                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        
        <div className="lg:col-span-7 space-y-5">
          {filteredMarkets.length == 0 ? (
            <div className="bg-white border border-crisp p-12 text-center space-y-4 shadow-tactile-sm">

              <div className="w-12 h-12 bg-[#F7F5ED] border border-crisp text-[#5C685B] flex items-center justify-center mx-auto text-xl font-serif">
                🔍
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#1C241B]">
                No Regional Markets Found
              </h3>
              <p className="text-xs sm:text-sm text-[#5C685B] max-w-md mx-auto">
                None of our cataloged markets match your current filter selection. Try removing the "Open Right Now" constraint or broadening your district choice.
              </p>
              <button
                onClick={resetAllFilters}
                className="btn-primary px-5 py-2.5 text-xs rounded-none"
              >
                Clear All Filters
              </button>

            </div>
          ) : (
            filteredMarkets.map((market) => {
              let status= getMarketCurrentStatus(market.operatingHours);
              var saved= isMarketSaved(market.id);
              var isActive= activeMarketId === market.id;

              return (
                <article
                  key={market.id}
                  onMouseEnter={() => setActiveMarketId(market.id)}

                  onClick={() => setActiveMarketId(market.id)}
                  className={`bg-white border cursor-pointer group transition-all duration-300 ${
                    isActive
                      ? 'border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-tactile-lg -translate-y-1'
                      : 'border-crisp hover:border-[#2D5A27] hover:-translate-y-1 hover:shadow-md'
                  }`}
                >

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                    
                    <div className="sm:col-span-4 relative h-48 sm:h-auto overflow-hidden bg-[#EDEAE1] border-b sm:border-b-0 sm:border-r border-crisp">
                      <img

                        src={market.coverImage}
                        alt={market.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                            status.isOpen
                              ? 'bg-[#2D5A27] text-white shadow-tactile-sm'
                              : 'bg-[#1C241B]/90 text-[#F3E8B1]'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-[#F3E8B1] animate-pulse' : 'bg-[#E2725B]'}`} />
                          {status.statusLabel}
                        </span>
                      </div>

                    </div>

                    
                    <div className="sm:col-span-8 p-4 sm:p-5 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#5C685B] font-mono mb-1">
                          <span className="flex items-center gap-1">

                            <MapPin className="w-3.5 h-3.5 text-[#E2725B]" />
                            {market.region}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-[#2D5A27]">
                            <Star className="w-3.5 h-3.5 fill-[#2D5A27]" /> {market.rating} ({market.reviewCount})
                          </span>
                        </div>

                        <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C241B] group-hover:text-[#2D5A27] transition-colors">
                          <Link to={`/markets/${market.id}`}>{market.name}</Link>
                        </h2>

                        <p className="text-xs text-[#5C685B] line-clamp-2 mt-1 leading-relaxed">
                          {market.tagline}
                        </p>

                        
                        <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[10px] font-mono uppercase text-[#5C685B] mr-1">
                            Days:

                          </span>
                          {market.openDays.map((day) => (
                            <span
                              key={day}
                              className={`filter-pill px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                                day == status.currentDayName && status.isOpen
                                  ? 'bg-[#2D5A27] text-white'
                                  : 'bg-[#F7F5ED] text-[#2D5A27] border border-[#D6D3C7]'
                              }`}
                            >

                              {day.slice(0, 3)}
                            </span>
                          ))}
                        </div>

                        
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {market.produceTypes.slice(0, 3).map((item, pIdx) => (
                            <span
                              key={pIdx}
                              className="filter-pill text-[10px] px-2 py-0.5 bg-white text-[#5C685B] border border-dashed border-[#D6D3C7] hover:border-[#2D5A27]"
                            >
                              {item}
                            </span>
                          ))}
                          {market.produceTypes.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-[#5C685B]">
                              +{market.produceTypes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>


                      
                      <div className="pt-3 border-t border-[#E7E4D8] flex items-center justify-between">

                        <div className="text-[11px] font-mono text-[#5C685B] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#2D5A27]" />

                          <span>{status.detail}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveMarket(market.id);
                            }}
                            className={`p-2 border text-xs btn-icon-tactile ${
                              saved
                                ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                                : 'bg-[#F7F5ED] text-[#1C241B] border-crisp hover:bg-white'
                            }`}
                            title={saved ? 'Remove saved bookmark' : 'Bookmark this market'}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>

                          <Link
                            to={`/markets/${market.id}`}
                            className="btn-primary text-xs px-3.5 py-2 rounded-none"
                          >
                            <span>Inspect Stalls</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                </article>
              );
            })
          )}
        </div>

        
        <div className="lg:col-span-5 sticky top-24 self-start z-10">
          <div className="space-y-3">
            <div className="bg-white border border-crisp p-1 shadow-tactile transition-shadow hover:shadow-tactile-lg">
              <MarketMap
                markets={filteredMarkets.length > 0 ? filteredMarkets : marketsData}
                selectedMarketId={activeMarketId}
                onSelectMarket={(id) => setActiveMarketId(id)}
                height="560px"
              />
            </div>

            
            <div className="bg-white border border-crisp p-3 text-[11px] font-mono text-[#5C685B] flex flex-wrap items-center justify-between gap-2 shadow-tactile-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2725B]" />
                <span>Selected Pin</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]" />
                <span>Open Right Now</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5C685B]" />
                <span>Scheduled Days</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
