import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Sprout, Store, ArrowRight, CornerDownLeft } from 'lucide-react';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';

export default function GlobalSearch({ isMobile = false, onSelect = () => {} }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter matching results
  const trimmedQuery = query.trim().toLowerCase();
  const hasMinChars = trimmedQuery.length >= 2;

  const matchedMarkets = hasMinChars
    ? marketsData.filter((m) => {
        return (
          m.name.toLowerCase().includes(trimmedQuery) ||
          m.region.toLowerCase().includes(trimmedQuery) ||
          m.tagline.toLowerCase().includes(trimmedQuery) ||
          m.address.toLowerCase().includes(trimmedQuery)
        );
      }).slice(0, 4)
    : [];

  const matchedProduce = hasMinChars
    ? produceData.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery) ||
          p.flavorProfile.toLowerCase().includes(trimmedQuery) ||
          p.peakSeasons.some((s) => s.toLowerCase().includes(trimmedQuery))
        );
      }).slice(0, 4)
    : [];

  const totalMatches = matchedMarkets.length + matchedProduce.length;

  const handleSelectMarket = (marketId) => {
    navigate(`/markets/${marketId}`);
    setQuery('');
    setIsOpen(false);
    onSelect();
  };

  const handleSelectProduce = (produceName) => {
    navigate(`/produce?search=${encodeURIComponent(produceName)}`);
    setQuery('');
    setIsOpen(false);
    onSelect();
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMinChars) return;

    if (matchedMarkets.length > 0) {
      handleSelectMarket(matchedMarkets[0].id);
    } else if (matchedProduce.length > 0) {
      handleSelectProduce(matchedProduce[0].name);
    } else {
      navigate(`/markets?search=${encodeURIComponent(trimmedQuery)}`);
      setQuery('');
      setIsOpen(false);
      onSelect();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex-shrink min-w-0 ${
        isMobile
          ? 'w-full'
          : 'w-36 md:w-44 lg:w-48 focus-within:w-56 lg:focus-within:w-64 transition-all duration-300'
      }`}
    >
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => {
            if (query.trim().length >= 1) setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length >= 1) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
          placeholder={isMobile ? "Search markets, crops, chèvre..." : "Search stalls..."}
          className="w-full text-xs bg-white text-[#1C241B] placeholder:text-[#5C685B]/70 border border-crisp pl-7 pr-6 py-1.5 focus:outline-none focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] transition-all rounded-sm font-sans truncate"
        />

        <Search className="w-3.5 h-3.5 text-[#5C685B] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#5C685B] hover:text-[#1C241B] cursor-pointer p-0.5"
            aria-label="Clear search input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 bg-white border border-[#D6D3C7] shadow-tactile-lg z-50 rounded-sm overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-150 ${
            isMobile ? 'left-0 right-0 w-full' : 'right-0 w-72 sm:w-80 md:w-96'
          }`}
        >
          {!hasMinChars ? (
            <div className="p-3 text-[11px] font-mono text-[#5C685B] bg-[#F7F5ED]/50 border-b border-crisp">
              Type at least 2 characters to search across markets & seasonal crops...
            </div>
          ) : totalMatches === 0 ? (
            <div className="p-5 text-center space-y-1">
              <span className="text-xl">🔍</span>
              <p className="font-editorial text-sm font-bold text-[#1C241B]">
                No Results for "{query}"
              </p>
              <p className="text-[11px] text-[#5C685B]">
                Try searching for "Square", "Apple", "Downtown", or "Chevre".
              </p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto divide-y divide-[#E7E4D8]">
              {/* Category 1: Markets & Pavilions */}
              {matchedMarkets.length > 0 && (
                <div>
                  <div className="bg-[#F7F5ED] px-3 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-[#2D5A27] flex items-center justify-between border-b border-[#E7E4D8]">
                    <span className="flex items-center gap-1.5">
                      <Store className="w-3 h-3 text-[#2D5A27]" />
                      <span>Markets & Pavilions</span>
                    </span>
                    <span className="text-[#5C685B] font-normal">
                      {matchedMarkets.length} found
                    </span>
                  </div>

                  <div className="py-1">
                    {matchedMarkets.map((market) => (
                      <div
                        key={market.id}
                        onClick={() => handleSelectMarket(market.id)}
                        className="px-3 py-2 hover:bg-[#F7F5ED] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="font-editorial text-xs font-bold text-[#1C241B] group-hover:text-[#2D5A27] truncate">
                            {market.name}
                          </h4>
                          <p className="text-[11px] text-[#5C685B] truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#E2725B] shrink-0" />
                            <span>{market.region}</span>
                            <span className="text-[#D6D3C7]">•</span>
                            <span className="truncate">{market.tagline}</span>
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#5C685B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 2: Produce & Harvest Items */}
              {matchedProduce.length > 0 && (
                <div>
                  <div className="bg-[#F7F5ED] px-3 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-[#E2725B] flex items-center justify-between border-b border-[#E7E4D8]">
                    <span className="flex items-center gap-1.5">
                      <Sprout className="w-3 h-3 text-[#E2725B]" />
                      <span>Produce & Harvest Items</span>
                    </span>
                    <span className="text-[#5C685B] font-normal">
                      {matchedProduce.length} found
                    </span>
                  </div>

                  <div className="py-1">
                    {matchedProduce.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduce(item.name)}
                        className="px-3 py-2 hover:bg-[#F7F5ED] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-editorial text-xs font-bold text-[#1C241B] group-hover:text-[#2D5A27] truncate">
                              {item.name}
                            </h4>
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-[#F3E8B1] text-[#1C241B] font-semibold border border-[#D6D3C7]">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C685B] truncate mt-0.5">
                            Peak: <strong className="text-[#2D5A27]">{item.peakSeasons.join(' & ')}</strong> ({item.harvestWindow})
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#5C685B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Action */}
              <div className="p-2 bg-[#F7F5ED]/60 flex items-center justify-between text-[10px] font-mono text-[#5C685B] border-t border-[#E7E4D8]">
                <span>Press Enter to select</span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Esc to dismiss</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
