import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 

  Sprout, Search, Filter, Bookmark, CheckCircle2, 
  MapPin, ArrowRight, X, Calendar, Sparkles, ChefHat, 
  ShieldAlert, Info, Layers
} from 'lucide-react';
import produceData from '../data/produce.json';
import marketsData from '../data/markets.json';
import { useSaved } from '../context/SavedContext';

var DEFAULT_BOTANICAL_IMAGE= "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80";

export default function SeasonalProduce() {
  const [searchParams]= useSearchParams();
  var initialSearch= searchParams.get('search') || '';

  const [selectedSeason, setSelectedSeason]= useState('All');
  const [selectedCategory, setSelectedCategory]  = useState('All');
  const [searchQuery, setSearchQuery]  = useState(initialSearch);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const { toggleSaveProduce, isProduceSaved }= useSaved();

  
  useEffect(() => {
    var param  = searchParams.get('search');
    if (param != null) {

      setSearchQuery(param);
      
      var exactMatch  = produceData.find(
        (p) => p.name.toLowerCase() === param.toLowerCase() || p.id === param.toLowerCase()
      );
      if (exactMatch) {
        setActiveModalItem(exactMatch);
      }
    }
  }, [searchParams]);

  var seasons  = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];
  let categories  = ['All', 'Fruit', 'Vegetable', 'Fungi & Herbs', 'Artisan & Dairy'];

  
  var filteredProduce = useMemo(() => {
    return produceData.filter((item) => {
      
      if (selectedSeason != 'All') {
        var matchesSeason  = item.peakSeasons.includes(selectedSeason) || item.allSeasons.includes(selectedSeason);
        if (!matchesSeason) return false;
      }

      
      if (selectedCategory !== 'All' && item.category != selectedCategory) {
        return false;
      }

      
      if (searchQuery.trim()) {
        var q = searchQuery.toLowerCase();
        var matchesName  = item.name.toLowerCase().includes(q);
        var matchesFlavor= item.flavorProfile.toLowerCase().includes(q);
        var matchesCulinary = item.culinaryUses.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesFlavor && !matchesCulinary) return false;
      }

      return true;
    });
  }, [selectedSeason, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
      
      <div className="border-b border-crisp pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-semibold mb-1">
              <Sprout className="w-3.5 h-3.5 text-[#E2725B]" />
              <span>Agrarian Terroir Almanac</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1C241B]">
              Seasonal Harvest Matrix
            </h1>
            <p className="text-xs sm:text-sm text-[#5C685B] mt-1 max-w-xl">
              An interactive botanical index tracking peak ripeness, storage recommendations, and the regional market stalls that stock each harvest.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#5C685B]">
            <span>Varieties:</span>
            <span className="font-bold text-[#2D5A27] bg-white px-2.5 py-1 border border-crisp shadow-tactile-sm">
              {filteredProduce.length} of {produceData.length} Cataloged
            </span>

          </div>
        </div>
      </div>


      
      <div className="bg-white border border-crisp p-5 shadow-tactile-sm space-y-5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#5C685B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search produce, flavor notes, culinary pairings..."
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

          
          <div className="lg:col-span-7 flex flex-wrap items-center gap-2 justify-start lg:justify-end">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C685B] mr-1 hidden sm:inline">
              Peak Season:
            </span>
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`filter-pill px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border ${
                  selectedSeason === season
                    ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm'
                    : 'bg-[#F7F5ED] text-[#1C241B] border-crisp hover:bg-white hover:border-[#2D5A27]'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>


        
        <div className="pt-3 border-t border-[#E7E4D8] flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C685B] mr-2">
            Classification:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-pill px-3.5 py-1.5 text-xs rounded-full font-medium ${
                selectedCategory == category
                  ? 'bg-[#1C241B] text-[#F3E8B1] shadow-tactile-sm'
                  : 'bg-[#F7F5ED] text-[#5C685B] hover:bg-[#EFECE1] hover:text-[#1C241B]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduce.map((item) => {
          var isSaved = isProduceSaved(item.id);
          let linkedMarkets = marketsData.filter((m) => item.linkedMarketIds.includes(m.id));

          return (
            <article
              key={item.id}
              className="card-editorial flex flex-col justify-between group cursor-pointer"
            >
              <div>
                
                <div className="relative h-48 overflow-hidden border-b border-crisp bg-[#EDEAE1]">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src= DEFAULT_BOTANICAL_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-[#1C241B]/90 text-[#F3E8B1] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-tactile-sm">
                      {item.badge}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProduce(item.id);

                    }}
                    className={`absolute top-3 right-3 p-2 border btn-icon-tactile ${
                      isSaved
                        ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                        : 'bg-white/95 text-[#1C241B] border-crisp hover:bg-[#F3E8B1]'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save produce'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5C685B] font-mono">
                    <span className="uppercase text-[#2D5A27] font-semibold">
                      {item.category}
                    </span>
                    <span>{item.harvestWindow}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#1C241B] group-hover:text-[#2D5A27] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#5C685B] line-clamp-2 leading-relaxed">
                    {item.flavorProfile}
                  </p>

                  
                  <div className="pt-1 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#5C685B]">

                      Peak:
                    </span>
                    {item.peakSeasons.map((s) => (
                      <span
                        key={s}
                        className="filter-pill px-2 py-0.5 text-[10px] uppercase font-mono font-bold bg-[#F3E8B1] text-[#1C241B] border border-[#D6D3C7]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  
                  <div className="pt-2 text-xs space-y-1">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#5C685B]">
                      Stocked At:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {linkedMarkets.map((m) => (
                        <Link
                          key={m.id}
                          to={`/markets/${m.id}`}
                          className="filter-pill text-[10px] px-2 py-0.5 bg-[#F7F5ED] hover:bg-[#2D5A27] hover:text-white text-[#2D5A27] border border-[#D6D3C7] font-medium"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="p-5 pt-0 border-t border-[#E7E4D8] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#5C685B]">
                  Storage: {item.storageTip.slice(0, 24)}...
                </span>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="text-xs uppercase font-bold text-[#E2725B] hover:text-[#C45742] flex items-center gap-1 cursor-pointer transition-transform hover:translate-x-0.5"
                >
                  <span>Full Field Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1C241B]/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="relative z-[110] bg-white border-2 border-[#2D5A27] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-tactile-lg p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 text-[#5C685B] hover:text-[#1C241B] border border-crisp hover:bg-[#F7F5ED] cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2D5A27] font-bold">
              <Sprout className="w-4 h-4 text-[#E2725B]" />
              <span>Botanical Terroir Dossier • {activeModalItem.category}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              <div className="sm:col-span-5 h-48 sm:h-56 overflow-hidden border border-crisp bg-[#EDEAE1]">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src  = DEFAULT_BOTANICAL_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-2">
                <span className="inline-block px-2.5 py-0.5 bg-[#1C241B] text-[#F3E8B1] text-[10px] font-mono uppercase font-bold">
                  {activeModalItem.badge}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C241B]">
                  {activeModalItem.name}
                </h3>
                <p className="text-xs font-mono text-[#5C685B]">
                  Harvest Window: <strong className="text-[#1C241B]">{activeModalItem.harvestWindow}</strong>
                </p>
                <p className="text-xs sm:text-sm text-[#5C685B] leading-relaxed">
                  {activeModalItem.flavorProfile}
                </p>
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F7F5ED] border border-crisp space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#2D5A27]">
                  <ChefHat className="w-4 h-4 text-[#E2725B]" />
                  <span>Culinary Applications</span>
                </div>
                <ul className="text-xs text-[#5C685B] space-y-1 list-disc list-inside">
                  {activeModalItem.culinaryUses.map((use, idx) => (
                    <li key={idx}>{use}</li>

                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#F7F5ED] border border-crisp space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#2D5A27]">
                  <Info className="w-4 h-4 text-[#2D5A27]" />

                  <span>Cellar & Storage Wisdom</span>

                </div>
                <p className="text-xs text-[#5C685B] leading-relaxed">
                  {activeModalItem.storageTip}
                </p>
                <p className="text-[11px] text-[#2D5A27] font-semibold pt-1 border-t border-[#D6D3C7]">
                  {activeModalItem.nutritionHighlights}
                </p>
              </div>
            </div>

            
            <div className="p-4 bg-[#F3E8B1]/30 border border-[#D6D3C7] space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-[#2D5A27] block">
                Where to Find in Local Stalls:
              </span>
              <div className="flex flex-wrap gap-2">
                {marketsData
                  .filter((m) => activeModalItem.linkedMarketIds.includes(m.id))
                  .map((m) => (
                    <Link
                      key={m.id}
                      to={`/markets/${m.id}`}
                      onClick={() => setActiveModalItem(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D6D3C7] text-xs font-semibold text-[#1C241B] hover:text-[#2D5A27] hover:border-[#2D5A27] shadow-tactile-sm btn-icon-tactile"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E2725B]" />
                      <span>{m.name}</span>
                    </Link>
                  ))}
              </div>
            </div>

            
            <div className="pt-2 flex items-center justify-between border-t border-crisp">
              <button
                onClick={() => toggleSaveProduce(activeModalItem.id)}
                className="btn-primary text-xs px-4 py-2 rounded-none"
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {isProduceSaved(activeModalItem.id) ? 'Saved in Personal Haul' : 'Bookmark Variety'}
                </span>
              </button>

              <button
                onClick={() => setActiveModalItem(null)}
                className="text-xs font-mono uppercase font-semibold text-[#5C685B] hover:text-[#1C241B] cursor-pointer transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}
