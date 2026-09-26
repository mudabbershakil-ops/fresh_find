import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Compass, Sprout, MapPin, Clock, Star, 
  Bookmark, CheckCircle2, Sparkles, Calendar, ShieldCheck,
  Award, Leaf, HeartHandshake, ChevronRight
} from 'lucide-react';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';
import { useSaved } from '../context/SavedContext';
import { getMarketCurrentStatus } from '../utils/marketSchedule';

const DEFAULT_BOTANICAL_IMAGE = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80";

export default function Home() {
  const { toggleSaveMarket, isMarketSaved, toggleSaveProduce, isProduceSaved } = useSaved();

  const featuredMarkets = marketsData.slice(0, 3);
  const spotlightProduce = produceData.find((p) => p.id === 'honeycrisp-apple') || produceData[0];
  const seasonalProduce = produceData.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-20 border-b border-crisp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#2D5A27]/30 text-xs font-mono uppercase tracking-wider text-[#2D5A27] shadow-tactile-sm">
                <Leaf className="w-3.5 h-3.5 text-[#E2725B]" />
                <span>Regional Slow-Food Almanac • Autumn Harvest Edition</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C241B] leading-[1.08]">
                Where Soil Meets the Town Square.
              </h1>

              <p className="text-base sm:text-lg text-[#5C685B] leading-relaxed max-w-2xl">
                A human-crafted directory connecting conscious eaters with independent orchardists, raw cheesemakers, and wild foragers. Track real-time market hours, discover peak harvest produce, and plan your weekend farm haul.
              </p>

              {/* Action Buttons: Primary & Secondary with Tactile Hover */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/markets"
                  className="btn-primary px-6 py-3.5 text-sm rounded-none"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Market Directory</span>
                </Link>

                <Link
                  to="/produce"
                  className="btn-secondary px-6 py-3.5 text-sm rounded-none"
                >
                  <Sprout className="w-4 h-4 text-[#2D5A27]" />
                  <span>Seasonal Harvest Guide</span>
                </Link>
              </div>

              {/* Community Metrics Strip */}
              <div className="pt-6 border-t border-crisp grid grid-cols-3 gap-4 max-w-lg">
                <div className="group cursor-default">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-[#2D5A27] group-hover:scale-105 transition-transform origin-left">
                    6
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5C685B] font-mono mt-0.5">
                    Verified Pavilions
                  </span>
                </div>
                <div className="group cursor-default">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-[#E2725B] group-hover:scale-105 transition-transform origin-left">
                    12+
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5C685B] font-mono mt-0.5">
                    Peak Crops
                  </span>
                </div>
                <div className="group cursor-default">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-[#1C241B] group-hover:scale-105 transition-transform origin-left">
                    100%
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5C685B] font-mono mt-0.5">
                    Local & EBT Friendly
                  </span>
                </div>
              </div>
            </div>

            {/* Right Featured Archival Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border border-crisp p-4 sm:p-5 shadow-tactile-lg rotate-1 hover:rotate-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative h-64 sm:h-80 overflow-hidden border border-crisp bg-[#EDEAE1]">
                  <img
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80"
                    alt="Farmers market produce basket"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C241B]/90 text-[#F3E8B1] px-2.5 py-1 text-xs font-mono font-semibold tracking-wider">
                    MARKET OF THE WEEK
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-[#5C685B]">
                      Historic Downtown • Est. 1912
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#2D5A27]">
                      <Star className="w-3.5 h-3.5 fill-[#2D5A27]" /> 4.9 (218 reviews)
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#1C241B] group-hover:text-[#2D5A27] transition-colors">
                    Heritage Square Market
                  </h3>
                  <p className="text-xs text-[#5C685B] leading-relaxed">
                    Century-old timber pavilion gathering heirloom orchardists, raw goat cheesemakers, and wild chanterelle foragers.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      to="/markets/heritage-square-farmers-market"
                      className="text-xs uppercase font-bold text-[#E2725B] hover:text-[#C45742] flex items-center gap-1 group/btn cursor-pointer py-1"
                    >
                      <span>Read Field Inspection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveMarket('heritage-square-farmers-market');
                      }}
                      className={`p-2 border text-xs btn-icon-tactile ${
                        isMarketSaved('heritage-square-farmers-market')
                          ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                          : 'bg-[#F7F5ED] text-[#1C241B] border-crisp hover:bg-white'
                      }`}
                      aria-label="Save Heritage Square Market"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REAL-TIME FEATURED MARKETS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Directory</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C241B]">
              Featured Regional Marketplaces
            </h2>
          </div>

          <Link
            to="/markets"
            className="text-xs uppercase font-bold tracking-wider text-[#2D5A27] hover:text-[#E2725B] flex items-center gap-1.5 group cursor-pointer transition-all"
          >
            <span>View All 6 Markets & Interactive Map</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMarkets.map((market) => {
            const status = getMarketCurrentStatus(market.operatingHours);
            const saved = isMarketSaved(market.id);

            return (
              <div
                key={market.id}
                className="card-editorial flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-48 overflow-hidden border-b border-crisp bg-[#EDEAE1]">
                    <img
                      src={market.coverImage}
                      alt={market.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                          status.isOpen
                            ? 'bg-[#2D5A27] text-white shadow-tactile-sm'
                            : 'bg-[#1C241B]/80 text-[#F3E8B1]'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-[#F3E8B1] animate-pulse' : 'bg-[#E2725B]'}`} />
                        {status.statusLabel}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveMarket(market.id);
                      }}
                      className={`absolute top-3 right-3 p-2 border btn-icon-tactile ${
                        saved
                          ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                          : 'bg-white/95 text-[#1C241B] border-crisp hover:bg-[#F3E8B1]'
                      }`}
                      title={saved ? 'Remove bookmark' : 'Bookmark market'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#5C685B] font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E2725B]" />
                        {market.region}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#2D5A27]">
                        <Star className="w-3 h-3 fill-[#2D5A27]" />
                        {market.rating}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#1C241B] group-hover:text-[#2D5A27] transition-colors">
                      {market.name}
                    </h3>

                    <p className="text-xs text-[#5C685B] line-clamp-2 leading-relaxed">
                      {market.tagline}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1">
                      {market.openDays.map((day) => (
                        <span
                          key={day}
                          className="filter-pill px-2 py-0.5 text-[10px] uppercase font-mono font-medium bg-[#F7F5ED] text-[#2D5A27] border border-[#D6D3C7]"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E7E4D8] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#5C685B] font-mono truncate max-w-[170px]">
                    {status.detail}
                  </span>
                  <Link
                    to={`/markets/${market.id}`}
                    className="text-xs uppercase font-bold text-[#2D5A27] group-hover:text-[#E2725B] flex items-center gap-1 transition-all duration-200 cursor-pointer hover:translate-x-0.5"
                  >
                    <span>View Stalls</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SEASONAL HARVEST SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D5A27] text-white border-2 border-[#1E3D1A] shadow-tactile-lg p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle background watermark */}
          <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none text-[180px] font-editorial select-none">
            APPLE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1E3D1A] text-[#F3E8B1] text-xs font-mono uppercase tracking-widest border border-[#F3E8B1]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#E2725B]" />
                <span>Peak Crop Spotlight: Honeycrisp Heirloom Apple</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F5ED] leading-tight">
                Crisp Cold-Snap Orchards in Autumn Prime.
              </h2>

              <p className="text-xs sm:text-sm text-[#D6D3C7] leading-relaxed max-w-2xl">
                {spotlightProduce.flavorProfile} Harvested by Alder Creek Orchard and valley growers with crisp cellar crunch. High in natural soluble pectin and quercetin.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="bg-[#1E3D1A] px-3 py-1 border border-white/20 text-[#F3E8B1]">
                  Harvest: {spotlightProduce.harvestWindow}
                </span>
                <span className="bg-[#1E3D1A] px-3 py-1 border border-white/20 text-white">
                  Found at: Heritage Square & North Valley Sheds
                </span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/produce"
                  className="btn-terracotta px-5 py-2.5 text-xs rounded-none"
                >
                  Explore Full Produce Matrix
                </Link>
                <Link
                  to="/markets/heritage-square-farmers-market"
                  className="btn-secondary bg-transparent border-white text-white hover:bg-white/10 hover:text-white hover:border-white px-5 py-2.5 text-xs rounded-none shadow-none"
                >
                  Locate Orchard Stalls
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white text-[#1C241B] p-4 border border-crisp shadow-tactile space-y-3 group card-editorial">
                <div className="h-44 overflow-hidden border border-crisp bg-[#EDEAE1]">
                  <img
                    src={spotlightProduce.image}
                    alt={spotlightProduce.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_BOTANICAL_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-editorial text-lg font-bold text-[#1C241B]">
                    Culinary Field Recommendation
                  </h4>
                  <ul className="text-xs text-[#5C685B] space-y-1 list-disc list-inside">
                    {spotlightProduce.culinaryUses.map((use, idx) => (
                      <li key={idx}>{use}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEASONAL PRODUCE QUICK GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-semibold block mb-1">
              Field Matrix
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#1C241B]">
              In Season This Fortnight
            </h2>
          </div>
          <Link
            to="/produce"
            className="text-xs uppercase font-bold text-[#2D5A27] hover:text-[#E2725B] flex items-center gap-1 cursor-pointer transition-all duration-200 hover:translate-x-0.5"
          >
            <span>See All 12 Varieties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalProduce.map((item) => {
            const saved = isProduceSaved(item.id);
            return (
              <div
                key={item.id}
                className="card-editorial p-4 space-y-3 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-36 overflow-hidden border border-crisp bg-[#EDEAE1] mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_BOTANICAL_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#1C241B]/90 text-[#F3E8B1] px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                      {item.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProduce(item.id);
                      }}
                      className={`absolute top-2 right-2 p-1.5 border text-xs btn-icon-tactile ${
                        saved
                          ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                          : 'bg-white/95 text-[#1C241B] border-crisp hover:bg-[#F3E8B1]'
                      }`}
                      title={saved ? 'Remove saved produce' : 'Save produce'}
                    >
                      <Bookmark className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#5C685B] block">
                    {item.category} • {item.harvestWindow}
                  </span>

                  <h3 className="font-editorial text-base font-bold text-[#1C241B] mt-1 group-hover:text-[#2D5A27] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#5C685B] line-clamp-2 mt-1 leading-relaxed">
                    {item.flavorProfile}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E4D8] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#2D5A27] font-semibold">
                    {item.peakSeasons.join(' & ')}
                  </span>
                  <Link
                    to="/produce"
                    className="text-[#E2725B] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer hover:translate-x-0.5 transition-transform"
                  >
                    Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SLOW FOOD PHILOSOPHY PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border border-crisp bg-[#EDEAE1] p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-bold block mb-1">
              Field Charter
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C241B]">
              Our Regional Slow-Food Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-editorial p-5 space-y-2">
              <div className="w-8 h-8 bg-[#2D5A27] text-[#F7F5ED] flex items-center justify-center font-bold text-sm shadow-tactile-sm">
                01
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#1C241B]">
                150-Mile Terroir Radius
              </h4>
              <p className="text-xs text-[#5C685B] leading-relaxed">
                Growers must harvest their crops within a strictly governed 150-mile radius, ensuring minimal transport carbon and maximum flavor retention.
              </p>
            </div>

            <div className="card-editorial p-5 space-y-2">
              <div className="w-8 h-8 bg-[#E2725B] text-white flex items-center justify-center font-bold text-sm shadow-tactile-sm">
                02
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#1C241B]">
                Universal SNAP & Double Bucks
              </h4>
              <p className="text-xs text-[#5C685B] leading-relaxed">
                Fresh food is a human right. Every market supports electronic benefit transfer with matching dollar tokens for fresh seasonal greens and roots.
              </p>
            </div>

            <div className="card-editorial p-5 space-y-2">
              <div className="w-8 h-8 bg-[#1C241B] text-[#F3E8B1] flex items-center justify-center font-bold text-sm shadow-tactile-sm">
                03
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#1C241B]">
                Compost & Zero-Waste Stalls
              </h4>
              <p className="text-xs text-[#5C685B] leading-relaxed">
                All vendor packaging is biodegradable unbleached pulp, corn PLA, or customer tote containers with active drop-off compost stations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
