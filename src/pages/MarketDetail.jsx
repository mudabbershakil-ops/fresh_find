import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Calendar, Star, Bookmark, 
  CheckCircle2, Share2, Bus, Car, Sprout, Store, 
  Check, FileEdit, Trash2, ShieldCheck, HeartHandshake
} from 'lucide-react';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';
import { useSaved } from '../context/SavedContext';
import { getMarketCurrentStatus, formatSchedule } from '../utils/marketSchedule';
import MarketMap from '../components/MarketMap';

export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    isMarketSaved, toggleSaveMarket, 
    marketNotes, updateMarketNote, deleteMarketNote 
  } = useSaved();

  const market = marketsData.find((m) => m.id === id);

  const [copiedLink, setCopiedLink] = useState(false);
  const [noteInput, setNoteInput] = useState(marketNotes[id] || '');
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);

  if (!market) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-editorial text-3xl font-bold text-[#1C241B]">
          Market Pavilion Not Found
        </h2>
        <p className="text-sm text-[#5C685B]">
          The market identifier "{id}" does not exist in our regional slow-food archive.
        </p>
        <Link
          to="/markets"
          className="btn-primary px-5 py-2.5 text-xs rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Directory</span>
        </Link>
      </div>
    );
  }

  const status = getMarketCurrentStatus(market.operatingHours);
  const isSaved = isMarketSaved(market.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    updateMarketNote(market.id, noteInput);
    setSavedNoteSuccess(true);
    setTimeout(() => setSavedNoteSuccess(false), 2200);
  };

  const handleDeleteNote = () => {
    deleteMarketNote(market.id);
    setNoteInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
      {/* Back button breadcrumb */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5C685B] hover:text-[#2D5A27] font-semibold cursor-pointer transition-transform hover:-translate-x-1 duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>
      </div>

      {/* Hero Banner Header */}
      <section className="bg-white border border-crisp shadow-tactile-lg overflow-hidden group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Cover image */}
          <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[320px] bg-[#EDEAE1] border-b lg:border-b-0 lg:border-r border-crisp overflow-hidden">
            <img
              src={market.coverImage}
              alt={market.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider ${
                  status.isOpen
                    ? 'bg-[#2D5A27] text-white shadow-tactile-sm'
                    : 'bg-[#1C241B]/90 text-[#F3E8B1]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-[#F3E8B1] animate-pulse' : 'bg-[#E2725B]'}`} />
                {status.statusLabel}
              </span>
            </div>
          </div>

          {/* Details header */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#5C685B]">
                <span className="flex items-center gap-1 text-[#2D5A27] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#E2725B]" />
                  {market.region} • Est. {market.yearEstablished}
                </span>
                <span className="flex items-center gap-1 font-bold text-[#2D5A27]">
                  <Star className="w-3.5 h-3.5 fill-[#2D5A27]" />
                  {market.rating} ({market.reviewCount} inspections)
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C241B] leading-tight">
                {market.name}
              </h1>

              <p className="text-sm sm:text-base text-[#5C685B] italic leading-relaxed">
                "{market.tagline}"
              </p>

              <div className="pt-2 text-xs font-mono text-[#1C241B] space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5C685B] shrink-0" />
                  <span>{market.address}</span>
                </p>
                <p className="flex items-center gap-2 text-[#2D5A27] font-semibold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{status.detail}</span>
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E7E4D8] flex flex-wrap items-center gap-3">
              <button
                onClick={() => toggleSaveMarket(market.id)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold border flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                  isSaved
                    ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm hover:bg-[#23461e] hover:-translate-y-0.5'
                    : 'bg-[#F7F5ED] text-[#1C241B] border-crisp hover:bg-white hover:-translate-y-0.5 hover:shadow-tactile-sm'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved to Bookmarks' : 'Bookmark Market'}</span>
              </button>

              <button
                onClick={handleShare}
                className="btn-secondary px-4 py-2.5 text-xs font-mono uppercase rounded-none"
              >
                <Share2 className="w-4 h-4 text-[#5C685B]" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Editorial Narrative, Vendors, Produce */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Editorial Description */}
          <section className="bg-white border border-crisp p-6 sm:p-7 shadow-tactile-sm space-y-3">
            <h2 className="font-editorial text-2xl font-bold text-[#1C241B]">
              Field Naturalist Inspection
            </h2>
            <p className="text-xs sm:text-sm text-[#5C685B] leading-relaxed">
              {market.description}
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs font-mono text-[#2D5A27] bg-[#F7F5ED] border border-[#D6D3C7] px-3 py-1">
                📌 Harvest Tip: {market.seasonalityNote}
              </span>
            </div>
          </section>

          {/* Certified Vendors Row */}
          <section className="bg-white border border-crisp p-6 sm:p-7 shadow-tactile-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E7E4D8] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2D5A27] font-bold block">
                  Artisans & Terroir
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1C241B]">
                  Featured Stalls & Producers ({market.vendors.length})
                </h3>
              </div>
              <Store className="w-5 h-5 text-[#2D5A27]" />
            </div>

            <div className="space-y-4">
              {market.vendors.map((vendor, idx) => (
                <div
                  key={idx}
                  className="border border-crisp bg-[#F7F5ED] p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:-translate-y-0.5 hover:shadow-tactile-sm hover:border-[#2D5A27] transition-all duration-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-editorial text-base font-bold text-[#1C241B]">
                        {vendor.name}
                      </h4>
                      <span className="text-[10px] font-mono uppercase bg-[#1C241B] text-[#F3E8B1] px-2 py-0.5 font-bold">
                        {vendor.stall}
                      </span>
                      {vendor.organicCertified && (
                        <span className="text-[10px] font-mono uppercase bg-[#2D5A27] text-white px-2 py-0.5 flex items-center gap-1 font-semibold">
                          <Check className="w-2.5 h-2.5" /> Organic
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#2D5A27]">
                      {vendor.specialty}
                    </p>
                    <p className="text-xs text-[#5C685B] leading-relaxed">
                      {vendor.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Produce Availability Matrix */}
          <section className="bg-white border border-crisp p-6 sm:p-7 shadow-tactile-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4D8] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2D5A27] font-bold block">
                  Soil Inventory
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1C241B]">
                  Cataloged Produce & Crops
                </h3>
              </div>
              <Sprout className="w-5 h-5 text-[#2D5A27]" />
            </div>

            <p className="text-xs text-[#5C685B]">
              The following seasonal varieties are supplied by partner orchards and farms at this pavilion:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {market.produceTypes.map((item, idx) => {
                const matchedCrop = produceData.find(
                  (p) => p.name.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
                );

                return (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#F7F5ED] border border-crisp flex items-center justify-between text-xs hover:border-[#2D5A27] hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="font-medium text-[#1C241B]">{item}</span>
                    {matchedCrop ? (
                      <Link
                        to="/produce"
                        className="text-[11px] font-mono uppercase font-bold text-[#E2725B] hover:underline cursor-pointer"
                      >
                        Profile &rarr;
                      </Link>
                    ) : (
                      <span className="text-[10px] font-mono text-[#5C685B] uppercase">Fresh Daily</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CUSTOM USER SESSION NOTES (Stored in localStorage) */}
          <section className="bg-[#FAF8F2] border-2 border-[#2D5A27] p-6 shadow-tactile space-y-4">
            <div className="flex items-center justify-between border-b border-[#D6D3C7] pb-3">
              <div className="flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-[#2D5A27]" />
                <h3 className="font-editorial text-xl font-bold text-[#1C241B]">
                  Personal Shopping Notes for {market.name}
                </h3>
              </div>
              {marketNotes[market.id] && (
                <button
                  onClick={handleDeleteNote}
                  className="text-xs text-[#E2725B] hover:text-[#C45742] flex items-center gap-1 font-mono uppercase font-bold cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Note</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[#5C685B]">
              Add your personalized market itinerary, stall orders, or custom notes. Automatically preserved in your browser's private local state.
            </p>

            <form onSubmit={handleSaveNote} className="space-y-3">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="E.g., Remind to buy 3 lbs of Roxbury Russet apples at Stall 14-A and double check if goat milk is in stock..."
                rows={3}
                className="w-full text-xs sm:text-sm bg-white border border-crisp p-3 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] rounded-none resize-none font-sans"
              />

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2.5 rounded-none"
                >
                  Save Personal Note
                </button>

                {savedNoteSuccess && (
                  <span className="text-xs font-mono text-[#2D5A27] flex items-center gap-1 font-bold animate-in zoom-in">
                    <CheckCircle2 className="w-4 h-4" /> Note Saved!
                  </span>
                )}
              </div>
            </form>
          </section>

        </div>

        {/* Right Column (5 cols): Operational Schedule, Amenities, Transit, Mini Map */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Operating Hours Box */}
          <div className="bg-white border border-crisp p-6 shadow-tactile-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E7E4D8] pb-3 text-[#1C241B]">
              <Calendar className="w-5 h-5 text-[#2D5A27]" />
              <h3 className="font-editorial text-xl font-bold">
                Operating Schedule
              </h3>
            </div>

            <div className="space-y-2">
              {market.operatingHours.map((sched, idx) => {
                const isToday = sched.day.toLowerCase() === status.currentDayName?.toLowerCase();

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 text-xs font-mono border transition-all ${
                      isToday
                        ? 'bg-[#F3E8B1]/40 border-[#2D5A27] font-bold text-[#1C241B] shadow-tactile-sm'
                        : 'bg-[#F7F5ED] border-crisp text-[#5C685B] hover:bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27]" />}
                      <span>{sched.day}</span>
                    </span>
                    <span className="text-[#1C241B]">
                      {sched.open} – {sched.close}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amenities & Standards */}
          <div className="bg-white border border-crisp p-6 shadow-tactile-sm space-y-3">
            <h3 className="font-editorial text-xl font-bold text-[#1C241B] border-b border-[#E7E4D8] pb-2">
              Pavilion Amenities
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {market.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="filter-pill px-2.5 py-1 text-xs font-mono bg-[#F7F5ED] text-[#2D5A27] border border-[#D6D3C7] flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-[#E2725B]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Transit & Parking Info */}
          <div className="bg-white border border-crisp p-6 shadow-tactile-sm space-y-3">
            <h3 className="font-editorial text-xl font-bold text-[#1C241B] border-b border-[#E7E4D8] pb-2">
              Getting There
            </h3>

            <div className="space-y-3 text-xs text-[#5C685B]">
              <div className="flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#1C241B]">Public Transit:</strong> {market.transportTip}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#1C241B]">Parking & Valet:</strong> {market.parking}
                </p>
              </div>
            </div>
          </div>

          {/* Mini Embedded Cartographic Preview */}
          <div className="bg-white border border-crisp p-1 shadow-tactile space-y-1">
            <div className="p-2 border-b border-crisp text-xs font-mono uppercase text-[#2D5A27] font-bold flex items-center justify-between">
              <span>Cartographic Location</span>
              <span>{market.lat}, {market.lng}</span>
            </div>
            <MarketMap
              markets={[market]}
              selectedMarketId={market.id}
              center={[market.lat, market.lng]}
              zoom={14}
              height="280px"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
