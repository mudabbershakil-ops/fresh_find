import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, Trash2, Download, Printer, ArrowRight, 

  MapPin, Clock, FileEdit, CheckCircle2, Sprout, Store, 
  Share2, Copy, Check
} from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';
import { getMarketCurrentStatus, formatSchedule } from '../utils/marketSchedule';


export default function SavedItems() {
  const { 
    savedMarketIds, savedProduceIds, marketNotes, 
    toggleSaveMarket, toggleSaveProduce, updateMarketNote, deleteMarketNote 
  }= useSaved();

  const [activeTab, setActiveTab]= useState('all');

  const [editingNoteMarketId, setEditingNoteMarketId]= useState(null);
  const [noteEditDraft, setNoteEditDraft]= useState('');
  const [copiedExport, setCopiedExport]  = useState(false);

  var savedMarkets= marketsData.filter((m) => savedMarketIds.includes(m.id));
  var savedProduce  = produceData.filter((p) => savedProduceIds.includes(p.id));

  let handleStartEditNote = (marketId, currentNote = '') => {
    setEditingNoteMarketId(marketId);
    setNoteEditDraft(currentNote);
  };

  let handleSaveNoteDraft  = (marketId) => {
    updateMarketNote(marketId, noteEditDraft);
    setEditingNoteMarketId(null);
  };

  
  var generateExportText= () => {
    let output= `# FRESHFIND SLOW-FOOD MARKET ITINERARY\n`;
    output += `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`;

    output += `## BOOKMARKED MARKETS (${savedMarkets.length})\n`;
    savedMarkets.forEach((m, idx) => {
      var status  = getMarketCurrentStatus(m.operatingHours);
      output += `\n${idx + 1}. ${m.name} (${m.region})\n`;
      output += `   Address: ${m.address}\n`;
      output += `   Schedule: ${formatSchedule(m.operatingHours)}\n`;
      output += `   Status: ${status.statusLabel}\n`;
      if (marketNotes[m.id]) {
        output += `   Notes: "${marketNotes[m.id]}"\n`;
      }
      output += `   Produce Highlights: ${m.produceTypes.slice(0, 5).join(', ')}\n`;
    });

    output += `\n\n## BOOKMARKED SEASONAL PRODUCE (${savedProduce.length})\n`;
    savedProduce.forEach((p, idx) => {
      output += `\n${idx + 1}. ${p.name} [${p.category}]\n`;
      output += `   Harvest Season: ${p.peakSeasons.join(' & ')} (${p.harvestWindow})\n`;
      output += `   Flavor Notes: ${p.flavorProfile}\n`;
      output += `   Storage Tip: ${p.storageTip}\n`;
    });

    output += `\n\nPlan crafted with FreshFind — TechWiz 7 Category 1\n`;
    return output;
  };

  let handleDownloadExport = () => {
    var text = generateExportText();
    var blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download  = `freshfind-market-itinerary-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  var handleCopyExport = () => {
    var text = generateExportText();
    navigator.clipboard?.writeText(text);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2200);
  };

  var handlePrint= () => {
    window.print();
  };


  var hasAnySaved = savedMarkets.length > 0 || savedProduce.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      <div className="border-b border-crisp pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-semibold mb-1">
              <Bookmark className="w-3.5 h-3.5 text-[#E2725B]" />
              <span>Personal Slow-Food Archive</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1C241B]">
              Saved Markets & Field Notes
            </h1>
            <p className="text-xs sm:text-sm text-[#5C685B] mt-1 max-w-xl">
              Curate your weekend farmstead route, maintain custom grocery notes per market, and export your personal slow-food itinerary.
            </p>
          </div>

          
          {hasAnySaved && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyExport}
                className="btn-secondary px-3.5 py-2 text-xs font-mono uppercase rounded-none"
              >
                {copiedExport ? <Check className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Copy className="w-3.5 h-3.5 text-[#5C685B]" />}
                <span>{copiedExport ? 'Copied to Clipboard!' : 'Copy Itinerary'}</span>
              </button>

              <button
                onClick={handleDownloadExport}
                className="btn-primary px-3.5 py-2 text-xs font-mono uppercase rounded-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2.5 bg-white border border-crisp text-xs font-mono text-[#5C685B] hover:text-[#1C241B] btn-icon-tactile"
                title="Print Itinerary"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      
      <div className="flex items-center gap-2 border-b border-crisp pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`filter-pill px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border ${
            activeTab == 'all'
              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm'
              : 'bg-white text-[#1C241B] border-crisp hover:bg-[#F7F5ED]'
          }`}
        >
          All Items ({savedMarkets.length + savedProduce.length})
        </button>

        <button
          onClick={() => setActiveTab('markets')}

          className={`filter-pill px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border ${
            activeTab == 'markets'
              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm'
              : 'bg-white text-[#1C241B] border-crisp hover:bg-[#F7F5ED]'
          }`}
        >
          Markets ({savedMarkets.length})
        </button>

        <button
          onClick={() => setActiveTab('produce')}
          className={`filter-pill px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border ${
            activeTab == 'produce'
              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-tactile-sm'
              : 'bg-white text-[#1C241B] border-crisp hover:bg-[#F7F5ED]'

          }`}
        >
          Produce Varieties ({savedProduce.length})
        </button>
      </div>

      

      {!hasAnySaved ? (
        <div className="bg-white border border-crisp p-12 text-center space-y-4 shadow-tactile-sm max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 bg-[#F7F5ED] border border-crisp text-[#2D5A27] flex items-center justify-center mx-auto text-2xl">
            🧺
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#1C241B]">
            Your Market Basket is Empty
          </h3>
          <p className="text-xs sm:text-sm text-[#5C685B] max-w-md mx-auto">
            You haven't bookmarked any farmers' markets or seasonal produce yet. Browse our directory and harvest matrix to build your personal slow-food roster.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/markets"
              className="btn-primary px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-none"
            >
              Explore Markets Directory
            </Link>
            <Link

              to="/produce"
              className="btn-secondary px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-none"
            >
              Browse Seasonal Produce
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          
          {(activeTab == 'all' || activeTab === 'markets') && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-2xl font-bold text-[#1C241B] flex items-center gap-2">
                  <Store className="w-5 h-5 text-[#2D5A27]" />
                  <span>Bookmarked Market Pavilions ({savedMarkets.length})</span>
                </h2>
              </div>

              {savedMarkets.length === 0 ? (
                <p className="text-xs text-[#5C685B] italic bg-white p-4 border border-crisp">
                  No markets bookmarked yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedMarkets.map((market) => {
                    var status= getMarketCurrentStatus(market.operatingHours);

                    var currentNote= marketNotes[market.id];
                    var isEditing  = editingNoteMarketId === market.id;

                    return (
                      <div
                        key={market.id}
                        className="card-editorial flex flex-col justify-between"
                      >
                        <div className="p-5 space-y-4">

                          
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                                    status.isOpen
                                      ? 'bg-[#2D5A27] text-white'

                                      : 'bg-[#1C241B]/80 text-[#F3E8B1]'
                                  }`}
                                >
                                  {status.statusLabel}
                                </span>
                                <span className="text-xs font-mono text-[#5C685B]">
                                  {market.region}
                                </span>
                              </div>
                              <h3 className="font-editorial text-2xl font-bold text-[#1C241B] hover:text-[#2D5A27] transition-colors">
                                <Link to={`/markets/${market.id}`}>{market.name}</Link>
                              </h3>
                            </div>

                            <button
                              onClick={() => toggleSaveMarket(market.id)}
                              className="text-[#5C685B] hover:text-[#E2725B] p-2 border border-crisp hover:bg-[#F7F5ED] btn-icon-tactile"
                              title="Remove from saved"

                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>

                          <p className="text-xs text-[#5C685B] leading-relaxed">
                            {market.address} • <strong className="text-[#2D5A27]">{formatSchedule(market.operatingHours)}</strong>
                          </p>

                          
                          <div className="p-3 bg-[#FAF8F2] border border-[#D6D3C7] space-y-2">

                            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#2D5A27] font-bold">
                              <span className="flex items-center gap-1">
                                <FileEdit className="w-3.5 h-3.5 text-[#E2725B]" /> Custom Session Note
                              </span>
                              {!isEditing && (
                                <button

                                  onClick={() => handleStartEditNote(market.id, currentNote)}
                                  className="text-xs text-[#E2725B] hover:underline cursor-pointer"
                                >
                                  {currentNote ? 'Edit' : '+ Add Note'}
                                </button>
                              )}
                            </div>

                            {isEditing ? (
                              <div className="space-y-2">
                                <textarea
                                  value={noteEditDraft}
                                  onChange={(e) => setNoteEditDraft(e.target.value)}
                                  placeholder="Write notes (e.g. ask for raw goat chevre at Stall 8B)..."
                                  rows={2}
                                  className="w-full text-xs bg-white border border-crisp p-2 text-[#1C241B] focus:outline-none focus:border-[#2D5A27] resize-none"
                                />
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setEditingNoteMarketId(null)}
                                    className="px-2.5 py-1 text-xs text-[#5C685B] hover:text-[#1C241B] cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveNoteDraft(market.id)}
                                    className="btn-primary text-xs px-3 py-1 font-mono uppercase rounded-none"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-[#1C241B] italic">
                                {currentNote ? `"${currentNote}"` : 'No custom note attached yet. Click "+ Add Note" to jot down groceries or stalls.'}
                              </p>
                            )}
                          </div>
                        </div>

                        

                        <div className="p-4 border-t border-[#E7E4D8] bg-[#F7F5ED] flex items-center justify-between text-xs">
                          <span className="text-[#5C685B] font-mono">
                            {market.vendors.length} certified vendors
                          </span>
                          <Link
                            to={`/markets/${market.id}`}
                            className="text-[#2D5A27] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:text-[#E2725B] cursor-pointer hover:translate-x-0.5 transition-transform"
                          >
                            <span>Inspect Stalls</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          
          {(activeTab == 'all' || activeTab === 'produce') && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-2xl font-bold text-[#1C241B] flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#2D5A27]" />
                  <span>Saved Seasonal Harvests ({savedProduce.length})</span>
                </h2>
              </div>

              {savedProduce.length == 0 ? (
                <p className="text-xs text-[#5C685B] italic bg-white p-4 border border-crisp">
                  No produce varieties saved yet.
                </p>
              ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedProduce.map((produce) => (
                    <div
                      key={produce.id}
                      className="card-editorial p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-[#2D5A27] font-semibold">
                              {produce.category} • {produce.harvestWindow}
                            </span>
                            <h3 className="font-editorial text-lg font-bold text-[#1C241B] mt-0.5">
                              {produce.name}
                            </h3>
                          </div>
                          <button

                            onClick={() => toggleSaveProduce(produce.id)}
                            className="text-[#5C685B] hover:text-[#E2725B] p-1.5 border border-crisp hover:bg-[#F7F5ED] btn-icon-tactile"
                            title="Remove produce"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-[#5C685B] mt-2 line-clamp-2 leading-relaxed">
                          {produce.flavorProfile}
                        </p>
                      </div>


                      <div className="pt-2 border-t border-[#E7E4D8] flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono text-[#5C685B]">
                          Peak: {produce.peakSeasons.join(', ')}
                        </span>
                        <Link
                          to="/produce"
                          className="text-[#E2725B] font-bold uppercase tracking-wider text-[11px] cursor-pointer hover:translate-x-0.5 transition-transform"
                        >
                          View Matrix &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>

  );
}
