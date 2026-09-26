import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedMarketIds, setSavedMarketIds] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_saved_markets');
      return saved ? JSON.parse(saved) : ['heritage-square-farmers-market'];
    } catch {
      return ['heritage-square-farmers-market'];
    }
  });

  const [savedProduceIds, setSavedProduceIds] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_saved_produce');
      return saved ? JSON.parse(saved) : ['golden-chanterelle', 'honeycrisp-apple'];
    } catch {
      return ['golden-chanterelle', 'honeycrisp-apple'];
    }
  });

  const [marketNotes, setMarketNotes] = useState(() => {
    try {
      const notes = localStorage.getItem('freshfind_market_notes');
      return notes ? JSON.parse(notes) : {
        'heritage-square-farmers-market': 'Visit Stall 14-A for Roxbury Russet apples and check out the goat chevre before 10 AM!'
      };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshfind_saved_markets', JSON.stringify(savedMarketIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedMarketIds]);

  useEffect(() => {
    try {
      localStorage.setItem('freshfind_saved_produce', JSON.stringify(savedProduceIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedProduceIds]);

  useEffect(() => {
    try {
      localStorage.setItem('freshfind_market_notes', JSON.stringify(marketNotes));
    } catch (e) {
      console.error(e);
    }
  }, [marketNotes]);

  const toggleSaveMarket = (id) => {
    setSavedMarketIds((prev) => {
      const isSaved = prev.includes(id);
      if (!isSaved) {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.85 },
          colors: ['#2D5A27', '#E2725B', '#F3E8B1']
        });
        return [...prev, id];
      }
      return prev.filter((item) => item !== id);
    });
  };

  const toggleSaveProduce = (id) => {
    setSavedProduceIds((prev) => {
      const isSaved = prev.includes(id);
      if (!isSaved) {
        confetti({
          particleCount: 24,
          spread: 50,
          origin: { y: 0.85 },
          colors: ['#2D5A27', '#E2725B', '#F3E8B1']
        });
        return [...prev, id];
      }
      return prev.filter((item) => item !== id);
    });
  };

  const updateMarketNote = (marketId, note) => {
    setMarketNotes((prev) => ({
      ...prev,
      [marketId]: note
    }));
  };

  const deleteMarketNote = (marketId) => {
    setMarketNotes((prev) => {
      const next = { ...prev };
      delete next[marketId];
      return next;
    });
  };

  const isMarketSaved = (id) => savedMarketIds.includes(id);
  const isProduceSaved = (id) => savedProduceIds.includes(id);

  const totalSavedCount = savedMarketIds.length + savedProduceIds.length;

  return (
    <SavedContext.Provider
      value={{
        savedMarketIds,
        savedProduceIds,
        marketNotes,
        toggleSaveMarket,
        toggleSaveProduce,
        updateMarketNote,
        deleteMarketNote,
        isMarketSaved,
        isProduceSaved,
        totalSavedCount
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
}
