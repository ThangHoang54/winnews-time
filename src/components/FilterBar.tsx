import React from 'react';
import type { Category } from '../types';

interface FilterBarProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  isDisabled: boolean;
  language: 'en' | 'fr';
}

const categories: Category[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const allCategories: (Category | 'all')[] = ['all', ...categories];

type Language = 'en' | 'fr';

const categoryLabels: Record<Language, Record<Category | 'all', string>> = {
  en: {
    all: 'All',
    business: 'Business',
    entertainment: 'Entertainment',
    general: 'General',
    health: 'Health',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technology',
  },
  fr: {
    all: 'Tout',
    business: 'Affaires',
    entertainment: 'Divertissement',
    general: 'Général',
    health: 'Santé',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technologie',
  },
};

const FilterBar: React.FC<FilterBarProps> = ({ selectedCategory, onCategoryChange, isDisabled, language }) => {
  return (
    <div
      className="w-full flex justify-center"
      title={
        isDisabled
          ? language === 'en'
            ? 'Category filters are disabled during search'
            : 'Les filtres de catégorie sont désactivés pendant la recherche'
          : ''
      }
    >
      <div
        className={`flex flex-wrap justify-center gap-2 pb-2 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-paper focus:ring-accent dark:focus:ring-dark-accent ${
              selectedCategory === cat
                ? 'bg-ink dark:bg-dark-ink text-paper dark:text-dark-paper shadow-md'
                : 'bg-paper dark:bg-gray-700 text-ink/80 dark:text-dark-ink/80 hover:bg-ink/10 dark:hover:bg-dark-ink/20'
            }`}
          >
            {categoryLabels[language][cat]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;