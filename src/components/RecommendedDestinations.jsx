import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';
import marketsData from '../data/markets.json';

export default function RecommendedDestinations({
  destinations,
  onSelectDestination,
  isSaved,
  onToggleSave
}) {
  const navigate = useNavigate();

  if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 space-y-2 border-t border-[#E7E4D8] pt-2">
      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5C685B]">
        Explore Related Section
      </p>
      {destinations.map((item, index) => {
        if (!item) return null;

        const isString = typeof item === 'string';
        const marketObj = isString ? marketsData.find((m) => m?.id === item) : item;

        const id = marketObj?.id || (isString ? item : `destination-${index}`);
        const title = marketObj?.title || marketObj?.name || 'Featured Market';
        const location =
          marketObj?.location ||
          marketObj?.region ||
          marketObj?.address ||
          marketObj?.description ||
          'Local Farmers Market';

        const saved = typeof isSaved === 'function' ? isSaved(id) : false;

        const handleView = () => {
          if (typeof onSelectDestination === 'function') {
            onSelectDestination(id);
          } else if (id) {
            navigate(`/markets/${id}`);
          }
        };

        return (
          <div
            key={id || index}
            className="flex items-center justify-between p-2.5 bg-[#F7F5ED] rounded-sm border border-crisp hover:border-[#2D5A27] hover:bg-stone-100 transition-colors cursor-pointer gap-2"
            onClick={handleView}
          >
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="font-editorial text-xs font-bold text-[#1C241B] truncate">
                {title}
              </h4>
              <p className="text-[11px] text-[#5C685B] truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#E2725B] shrink-0" />
                <span className="truncate">{location}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {typeof onToggleSave === 'function' && (
                <button
                  type="button"
                  onClick={() => onToggleSave(id)}
                  className={`p-1 border text-[11px] btn-icon-tactile cursor-pointer ${
                    saved
                      ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                      : 'bg-white text-[#1C241B] border-crisp hover:bg-[#EFECE1]'
                  }`}
                  title={saved ? 'Market saved' : 'Save market'}
                >
                  {saved ? <CheckCircle2 className="w-3 h-3" /> : 'Save'}
                </button>
              )}
              <button
                type="button"
                onClick={handleView}
                className="px-2 py-1 text-[10px] bg-[#2D5A27] text-white rounded-none font-medium hover:bg-[#1E3D1A] cursor-pointer"
              >
                VIEW
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
