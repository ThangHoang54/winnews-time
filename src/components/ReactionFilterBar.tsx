import React from 'react';
import type { ComponentType } from 'react';

// Define the shape of one reaction
interface ReactionInfo {
  key: string;
  Icon: ComponentType<{ className?: string }>;
  color: string;
  label: string;
}

interface ReactionFilterBarProps {
  reactions: ReactionInfo[];
  activeFilters: string[];
  onToggleFilter: (key: string) => void;
  language: 'en' | 'fr';
}

const ReactionFilterBar: React.FC<ReactionFilterBarProps> = ({
  reactions,
  activeFilters,
  onToggleFilter,
  language,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 p-4 bg-stone-100 dark:bg-dark-paper rounded-lg border border-ink/10 dark:border-dark-ink/10">
      
      {/* Label */}
      <p className="text-sm font-semibold mb-3 sm:mb-0 sm:pr-2 flex-shrink-0">
        {language === 'en' ? 'Filter by reaction:' : 'Filtrer par réaction :'}
      </p>
      
      {/* This new wrapper groups all buttons, allowing 'ml-auto' to work correctly */}
      <div className="flex flex-wrap items-center gap-3 w-full">
        {reactions.map(({ key, Icon, color, label }) => {
          const isActive = activeFilters.includes(key);
          return (
            <button
              key={key}
              onClick={() => onToggleFilter(key)}
              aria-pressed={isActive}
              title={label}
              className={`flex items-center justify-center w-10 h-10 p-2 rounded-full transition-all duration-200
                ${isActive
                  ? `ring-2 ring-offset-2 dark:ring-offset-dark-paper ${color.replace('text', 'ring')}`
                  : 'bg-paper dark:bg-gray-700 hover:bg-ink/10 dark:hover:bg-dark-ink/20'
                }
                ${activeFilters.length > 0 && !isActive ? 'opacity-50 hover:opacity-100' : ''}
              `}
            >
              <Icon className={`w-5 h-5 ${color}`} />
            </button>
          );
        })}
        
        {activeFilters.length > 0 && (
          <button
            onClick={() => onToggleFilter('__ALL__')} // Special key to clear all
            className="text-sm text-accent dark:text-dark-accent hover:underline ml-auto"
          >
            {language === 'en' ? 'Show All' : 'Tout Afficher'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReactionFilterBar;