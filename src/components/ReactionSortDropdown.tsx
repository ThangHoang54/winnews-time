import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const SORT_OPTIONS = {
  'publishedAt:desc': { en: 'Date (Newest First)', fr: 'Date (Plus Récent)' },
  'publishedAt:asc': { en: 'Date (Oldest First)', fr: 'Date (Plus Ancien)' },
  'source.name:asc': { en: 'Source (A-Z)', fr: 'Source (A-Z)' },
  'source.name:desc': { en: 'Source (Z-A)', fr: 'Source (Z-A)' },
};

export type SortOptionKey = keyof typeof SORT_OPTIONS;

interface SortDropdownProps {
  selectedSort: SortOptionKey;
  onSortChange: (value: SortOptionKey) => void;
  language: 'en' | 'fr';
}

const ReactionSortDropdown: React.FC<SortDropdownProps> = ({
  selectedSort,
  onSortChange,
  language,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Label */}
      <label
        className="block text-sm font-medium text-ink/70 dark:text-dark-ink/70 mb-1"
      >
        {language === 'en' ? 'Sort by' : 'Trier par'}
      </label>

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-48 px-4 py-2 bg-white dark:bg-gray-900
                   border border-ink/10 dark:border-dark-ink/20 rounded-md shadow-sm text-sm font-medium
                   text-ink/90 dark:text-dark-ink/90 hover:bg-stone-50 dark:hover:bg-gray-800
                   focus:outline-none focus:ring-2 focus:ring-accent/60 dark:focus:ring-dark-accent/60
                   transition-all duration-200"
      >
        {SORT_OPTIONS[selectedSort][language]}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute z-20 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 
                     border border-ink/10 dark:border-dark-ink/20 rounded-lg shadow-xl 
                     ring-1 ring-black/5 dark:ring-white/10 focus:outline-none transition-all"
        >
          <ul className="py-1">
            {Object.entries(SORT_OPTIONS).map(([key, labels]) => {
              const active = key === selectedSort;
              return (
                <li key={key}>
                  <button
                    onClick={() => {
                      onSortChange(key as SortOptionKey);
                      setOpen(false);
                    }}
                    className={`w-full text-left flex justify-between items-center px-4 py-2 text-sm 
                      transition-all duration-150 ${
                        active
                          ? 'text-accent dark:text-dark-accent bg-accent/5 dark:bg-dark-accent/10'
                          : 'text-ink/80 dark:text-dark-ink/80 hover:bg-stone-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    {labels[language]}
                    {active && <Check className="w-4 h-4 text-accent dark:text-dark-accent" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReactionSortDropdown;