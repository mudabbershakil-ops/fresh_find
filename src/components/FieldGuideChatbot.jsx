import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, X, Send, Sparkles, Sprout, CornerDownLeft, 
  MapPin, ArrowUpRight, RotateCcw, HelpCircle, ExternalLink,
  Search, Compass, CheckCircle2
} from 'lucide-react';
import faqData from '../data/faq.json';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';
import { useSaved } from '../context/SavedContext';
import RecommendedDestinations from './RecommendedDestinations';
import ErrorBoundary from './ErrorBoundary';

export default function FieldGuideChatbot() {
  const [opn, setOpn]= useState(false);

  const [val, setVal]= useState('');
  const [arr1, setArr1]  = useState([]);
  const savedContext = useSaved();
  const toggleSaveMarket = savedContext?.toggleSaveMarket;
  const isMarketSaved = savedContext?.isMarketSaved || savedContext?.isSav;
  const checkSaved = (id) => (typeof isMarketSaved === 'function' ? isMarketSaved(id) : false);
  const handleToggleSave = (id) => {
    if (typeof toggleSaveMarket === 'function' && id) {
      toggleSaveMarket(id);
    }
  };

  const [messages, setMessages] = useState(() => [
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: faqData.greeting.message,
      chips: faqData.greeting.quickChips,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendations: [],
      recommendedDestinations: []
    }
  ]);


  var ref1= useRef(null);
  var inputRef = useRef(null);


  useEffect(() => {
    if (opn) {
      ref1.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, opn]);

  
  useEffect(() => {
    if (!val.trim() || val.length < 2) {
      setArr1([]);
      return;
    }

    let query = val.toLowerCase();
    var suggestions = [];

    
    faqData.intents.forEach((intent) => {
      if (intent.question.toLowerCase().includes(query) || intent.keywords.some((k) => k.includes(query))) {
        suggestions.push({ type: 'question', text: intent.question, intentId: intent.id });
      }
    });

    
    marketsData.forEach((market) => {
      if (market.name.toLowerCase().includes(query) || market.region.toLowerCase().includes(query)) {
        suggestions.push({ type: 'market', text: `Market: ${market.name}`, marketId: market.id });
      }
    });

    
    produceData.forEach((produce) => {
      if (produce.name.toLowerCase().includes(query)) {
        suggestions.push({ type: 'produce', text: `Produce: ${produce.name}`, produceId: produce.id });
      }
    });

    setArr1(suggestions.slice(0, 4));
  }, [val]);

  
  var DOMAIN_KEYWORDS  = [
    'hour', 'hours', 'time', 'times', 'schedule', 'when', 'open', 'opening', 'closed', 'closing', 'today', 'tomorrow', 'weekend', 'days', 'day',
    'location', 'locations', 'where', 'address', 'directions', 'transit', 'bus', 'train', 'metro', 'parking', 'bike', 'car', 'drive',
    'market', 'markets', 'pavilion', 'pavilions', 'wharf', 'square', 'shed', 'sheds', 'plaza', 'stall', 'stalls', 'booth', 'booths',
    'vendor', 'vendors', 'farmer', 'farmers', 'grower', 'growers', 'craft', 'artisan', 'farm', 'farms',
    'produce', 'crop', 'crops', 'vegetable', 'vegetables', 'fruit', 'fruits', 'greens', 'organic', 'harvest', 'season', 'seasonal',
    'spring', 'summer', 'autumn', 'fall', 'winter',
    'snap', 'ebt', 'card', 'cards', 'cash', 'payment', 'payments', 'pricing', 'price', 'cost', 'token', 'tokens', 'double', 'bucks',
    'dog', 'dogs', 'pet', 'pets', 'leash', 'animal', 'animals',
    'mushroom', 'mushrooms', 'dairy', 'milk', 'cheese', 'chevre', 'chèvre', 'egg', 'eggs', 'honey', 'apple', 'apples', 'tomato', 'tomatoes',
    'asparagus', 'peach', 'lemon', 'berry', 'berries', 'lettuce', 'garlic', 'herb', 'herbs', 'bread', 'bakery',
    'save', 'saved', 'bookmark', 'bookmarks', 'note', 'notes', 'export', 'print', 'list',
    'about', 'contact', 'team', 'volunteer', 'apply', 'freshfind', 'local', 'food', 'slow food'
  ];

  var STOP_WORDS = new Set([
    'what', 'is', 'a', 'an', 'the', 'of', 'to', 'in', 'how', 'can', 'i', 'do', 'tell', 'me', 'about',
    'are', 'there', 'any', 'my', 'your', 'and', 'or', 'for', 'with', 'on', 'at', 'by', 'from', 'this', 'that', 'it'
  ]);

  
  let processUserQuery= (queryText) => {
    var cleanQuery = queryText.toLowerCase().trim();
    var queryTokens = cleanQuery.split(/[\s,?.!]+/).filter(Boolean);
    var contentTokens = queryTokens.filter((token) => !STOP_WORDS.has(token));

    
    let domainHits = 0;
    contentTokens.forEach((token) => {
      if (DOMAIN_KEYWORDS.some((kw) => kw === token || (kw.length >= 4 && (token.includes(kw) || kw.includes(token))))) {

        domainHits += 1;
      }
    });

    
    let matchedMarket  = marketsData.find((m) => {

      let mName = m.name.toLowerCase();
      if (cleanQuery.includes(mName)) return true;
      var distinctiveWords = mName
        .split(/\s+/)
        .filter((w) => !['the', 'market', 'farmers', 'farmers\'', 'commons', 'wharf', 'square', 'plaza', 'sheds'].includes(w) && w.length >= 4);
      return distinctiveWords.some((w) => contentTokens.includes(w) || cleanQuery.includes(w));
    });

    
    var matchedProduce = produceData.find((p) => {
      let pName = p.name.toLowerCase();
      if (cleanQuery.includes(pName)) return true;
      let distinctiveWords  = pName
        .split(/\s+/)
        .filter((w) => !['organic', 'fresh', 'heritage', 'wild', 'and', 'the'].includes(w) && w.length >= 4);
      return distinctiveWords.some((w) => contentTokens.includes(w) || cleanQuery.includes(w));
    });

    let bestIntent = null;
    let highestScore = 0;

    faqData.intents.forEach((intent) => {
      let score  = 0;

      
      intent.keywords.forEach((keyword) => {
        if (cleanQuery.includes(keyword)) {
          score += 3;
        }
      });

      
      var questionTokens= intent.question.toLowerCase().split(/\s+/);
      contentTokens.forEach((token) => {
        if (questionTokens.includes(token)) {
          score += 2;
        }
        if (intent.keywords.some((k) => k.includes(token) || token.includes(k))) {
          score += 1.5;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestIntent= intent;
      }
    });

    
    if (domainHits == 0 && !matchedMarket && !matchedProduce && highestScore < 2) {
      return {
        text: faqData.outOfDomain?.message || "I am the FreshFind Field Guide, built specifically to help you discover local farmers' markets, seasonal produce, and market policies. I'm sorry, but I can't assist with general tech or unrelated topics! Try asking about market hours, dog policies, or seasonal crops.",
        chips: faqData.outOfDomain?.chips || [
          "Which markets are open today?",
          "Can I use SNAP / EBT?",
          "Are dogs allowed?",
          "What produce is in season?"
        ],
        actionRoute: null,
        marketRecommendations: [],
        recommendedDestinations: []
      };
    }

    if (matchedMarket && highestScore < 3) {
      return {
        text: `**${matchedMarket.name}** is located at ${matchedMarket.address} in the ${matchedMarket.region}. It features ${matchedMarket.produceTypes.slice(0, 4).join(', ')}.\n\nOpen days: ${matchedMarket.openDays.join(', ')}.`,
        chips: ["Operating hours", "Directions & transit", "View full market detail"],
        actionRoute: `/markets/${matchedMarket.id}`,
        marketRecommendations: [matchedMarket.id],
        recommendedDestinations: [
          { id: matchedMarket.id, name: matchedMarket.name, location: matchedMarket.region }
        ]
      };
    }

    if (matchedProduce && highestScore < 3) {
      var marketsList= marketsData
        .filter((m) => (matchedProduce.linkedMarketIds || []).includes(m.id))
        .map((m) => m.name)
        .join(', ');

      return {
        text: `**${matchedProduce.name}** is in peak harvest during **${matchedProduce.peakSeasons.join(' & ')}** (${matchedProduce.harvestWindow}).\n\n**Flavor Profile:** ${matchedProduce.flavorProfile}\n**Culinary Uses:** ${matchedProduce.culinaryUses.join(' • ')}\n\nFound at: ${marketsList || 'Local stalls'}.`,
        chips: ["Storage tip", "View Seasonal Matrix", "Show other autumn crops"],
        actionRoute: "/produce",
        marketRecommendations: matchedProduce.linkedMarketIds || [],
        recommendedDestinations: (matchedProduce.linkedMarketIds || []).map((id) => {
          const m = marketsData.find((x) => x.id === id);
          return {
            id: m?.id || id,
            name: m?.name || 'Featured Market',
            location: m?.region || 'Local Farmers Market'
          };
        })
      };
    }

    if (bestIntent && highestScore >= 1.5) {
      var intentRecs = bestIntent.marketRecommendations || [];
      var intentDests = bestIntent.recommendedDestinations || intentRecs.map((id) => {
        const m = marketsData.find((x) => x.id === id);
        return {
          id: m?.id || id,
          name: m?.name || 'Featured Market',
          location: m?.region || 'Local Farmers Market'
        };
      });

      return {
        text: bestIntent.answer,
        chips: bestIntent.suggestedChips || [],
        actionRoute: bestIntent.actionRoute,
        marketRecommendations: intentRecs,
        recommendedDestinations: intentDests
      };
    }

    return {
      text: faqData.fallback.message,
      chips: faqData.fallback.chips,
      actionRoute: null,
      marketRecommendations: [],
      recommendedDestinations: []
    };
  };

  var handleSendMessage= (textToSend) => {
    var query  = textToSend || val;
    if (!query.trim()) return;

    var userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setVal('');
    setArr1([]);

    setTimeout(() => {
      var response = processUserQuery(query);
      var recs = Array.isArray(response?.marketRecommendations) ? response.marketRecommendations : [];
      var recDestinations = Array.isArray(response?.recommendedDestinations) && response.recommendedDestinations.length > 0
        ? response.recommendedDestinations
        : recs.map((id) => {
            const m = marketsData.find((mkt) => mkt?.id === id);
            return {
              id: m?.id || id,
              name: m?.name || 'Featured Market',
              location: m?.region || m?.address || 'Local Farmers Market'
            };
          });

      let botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response?.text || '',
        chips: Array.isArray(response?.chips) ? response.chips : [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionRoute: response?.actionRoute || null,
        recommendations: recs,
        recommendedDestinations: recDestinations
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 350);
  };

  var handleResetConversation  = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'bot',
        text: faqData.greeting.message,
        chips: faqData.greeting.quickChips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: [],
        recommendedDestinations: []
      }
    ]);
  };


  return (
    <>
      
      <div className="fixed bottom-6 right-6 z-[80]">
        {!opn && (
          <button
            onClick={() => setOpn(true)}
            aria-label="Open Field Guide Botanical Assistant"
            className="group relative flex items-center gap-3 bg-[#2D5A27] text-white px-4 py-3.5 border border-[#1E3D1A] shadow-tactile-lg hover:bg-[#23461e] hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_rgba(45,90,39,0.3)] active:translate-y-0 active:shadow-none cursor-pointer transition-all duration-200"
          >
            <div className="relative">
              <Sprout className="w-5 h-5 text-[#F3E8B1] group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E2725B] animate-ping" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#F3E8B1] font-bold">
                Field Guide Bot
              </span>
              <span className="block text-xs font-serif italic text-white/90">
                Ask hours, SNAP, produce...
              </span>
            </div>
          </button>
        )}
      </div>

      
      {opn && (
        <aside
          role="dialog"
          aria-label="FreshFind Botanical Assistant Chat"
          className="fixed bottom-4 right-4 z-[90] w-[95vw] sm:w-[420px] max-h-[85vh] h-[640px] flex flex-col bg-[#F7F5ED] border-2 border-[#2D5A27] shadow-tactile-lg font-sans overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          
          <div className="bg-[#2D5A27] text-white px-4 py-3 border-b border-[#1E3D1A] flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#F7F5ED] text-[#2D5A27] flex items-center justify-center font-serif font-bold text-sm border border-[#1E3D1A]">
                🌿
              </div>
              <div>
                <h3 className="font-editorial text-base font-bold tracking-tight text-[#F7F5ED] leading-none">
                  Botanical Field Guide
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F3E8B1]">

                  Local Rule Engine • Offline Ready
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetConversation}

                title="Restart Conversation"
                className="p-1.5 text-white/80 hover:text-white hover:bg-[#1E3D1A] transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOpn(false)}
                title="Close Assistant"
                className="p-1.5 text-white/80 hover:text-white hover:bg-[#1E3D1A] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          
          <div className="bg-[#EFECE1] border-b border-crisp px-4 py-1.5 text-[11px] text-[#5C685B] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27] inline-block" />
              <span>Cataloged: 6 Markets, 12 Produce varieties</span>
            </span>
            <span className="font-mono text-[10px] uppercase text-[#2D5A27] font-semibold">
              v1.0 Local Knowledge
            </span>
          </div>

          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              let isBot = msg.sender == 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 ${
                      isBot
                        ? 'bg-white border-crisp text-[#1C241B] shadow-tactile-sm'
                        : 'bg-[#2D5A27] text-white border border-[#1E3D1A]'
                    }`}
                  >
                    
                    {isBot && (
                      <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-[#E7E4D8] text-[10px] uppercase tracking-wider text-[#5C685B] font-mono">
                        <span className="font-bold text-[#2D5A27] flex items-center gap-1">
                          <Sprout className="w-3 h-3" /> Field Naturalist
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                    )}

                    
                    <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">
                      {msg.text.split('\n').map((paragraph, idx) => {

                        var parts  = paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g);
                        return (
                          <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-bold text-[#2D5A27]">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              if (part.startsWith('*') && part.endsWith('*')) {
                                return (
                                  <em key={pIdx} className="italic text-[#5C685B]">
                                    {part.slice(1, -1)}
                                  </em>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    
                    {isBot && msg.actionRoute && (
                      <div className="mt-3 pt-2 border-t border-[#E7E4D8]">
                        <Link
                          to={msg.actionRoute}
                          onClick={() => setOpn(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E2725B] hover:text-[#C45742] uppercase tracking-wider group cursor-pointer"
                        >
                          <span>Explore Related Section</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    )}

                    
                    {isBot && ((Array.isArray(msg.recommendedDestinations) && msg.recommendedDestinations.length > 0) || (Array.isArray(msg.recommendations) && msg.recommendations.length > 0)) && (
                      <ErrorBoundary>
                        <RecommendedDestinations
                          destinations={Array.isArray(msg.recommendedDestinations) && msg.recommendedDestinations.length > 0 ? msg.recommendedDestinations : msg.recommendations}
                          onSelectDestination={() => setOpn(false)}
                          isSaved={checkSaved}
                          onToggleSave={handleToggleSave}
                        />
                      </ErrorBoundary>
                    )}
                  </div>

                  
                  {isBot && msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handleSendMessage(chip)}
                          className="filter-pill text-[11px] font-medium bg-white hover:bg-[#2D5A27] hover:text-white text-[#2D5A27] border border-[#2D5A27]/40 px-3 py-1 rounded-full transition-colors shadow-tactile-sm"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  {!isBot && (
                    <span className="text-[10px] text-[#5C685B] font-mono mt-1 mr-1">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={ref1} />
          </div>

          
          {arr1.length > 0 && (
            <div className="bg-white border-t border-crisp px-3 py-2 space-y-1 shadow-inner">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#5C685B] block">
                Instant suggestions:
              </span>
              <div className="flex flex-col gap-1">
                {arr1.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.text.replace(/^(Market: |Produce: )/, ''))}
                    className="text-left text-xs px-2 py-1.5 hover:bg-[#F7F5ED] hover:text-[#2D5A27] text-[#1C241B] flex items-center justify-between group cursor-pointer transition-colors"
                  >
                    <span className="truncate">{item.text}</span>
                    <CornerDownLeft className="w-3 h-3 text-[#5C685B] opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>

            </div>

          )}

          
          <div className="p-3 bg-white border-t border-crisp">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Ask a question or topic (e.g. dogs, honey, SNAP)..."
                  className="w-full text-xs sm:text-[13px] bg-[#F7F5ED] text-[#1C241B] border border-crisp pl-3 pr-8 py-2.5 focus:outline-none focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] rounded-none transition-colors"
                />
                {val && (
                  <button
                    type="button"
                    onClick={() => setVal('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C685B] hover:text-[#1C241B] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button

                type="submit"
                disabled={!val.trim()}
                className="btn-primary p-2.5 disabled:opacity-40 disabled:cursor-not-allowed rounded-none"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </aside>
      )}
    </>
  );
}
