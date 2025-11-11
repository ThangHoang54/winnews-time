import React, { useState, useEffect } from 'react';
import { SearchIcon, CloseIcon } from './icons/Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  currentQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, currentQuery }) => {
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
      setQuery('');
      onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex items-center relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news..."
        className="w-full py-3 pl-4 pr-24 border-2 border-ink/30 dark:border-dark-ink/30 rounded-full bg-paper dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent transition-all"
      />
      {currentQuery && (
          <button type="button" onClick={handleClear} className="absolute right-14 p-1 text-ink/50 dark:text-dark-ink/50 hover:text-ink dark:hover:text-dark-ink rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
      )}
      <button type="submit" className="absolute right-2 p-2 bg-ink dark:bg-dark-ink text-paper dark:text-dark-paper rounded-full hover:bg-accent dark:hover:bg-dark-accent transition-colors">
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;