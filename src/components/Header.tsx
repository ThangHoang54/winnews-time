import React, { type Dispatch, type SetStateAction } from 'react';
import useClock from '../hooks/useClock';
import { SunIcon, MoonIcon, GlobeIcon, BookmarkIcon, BookmarkFilledIcon } from './icons/Icons';
import WeatherWidget from './WeatherWidget';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'fr';
  setLanguage: Dispatch<SetStateAction<'en' | 'fr'>>;
  currentView: 'home' | 'saved';
  setView: Dispatch<SetStateAction<'home' | 'saved'>>;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, setLanguage, currentView, setView }) => {
  const currentTime = useClock();

  const formattedDate = new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(currentTime);

  const handleSavedClick = () => {
    setView(currentView === 'home' ? 'saved' : 'home');
  }

  return (
    <header className="border-b-4 border-b-ink dark:border-b-dark-ink/50 bg-paper dark:bg-dark-paper sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="font-serif font-black text-3xl md:text-5xl text-ink dark:text-dark-ink tracking-tight cursor-pointer" onClick={() => setView('home')}>
              {language === "en" ? "The WinNews Time" : "L'heure de WinNews"}
            </h1>
            <p className="font-sans text-[10px] md:text-sm text-ink/70 dark:text-dark-ink/70 -mt-1 md:mt-0 tracking-wider">
              {language === 'en' ? "Inspired by iconic print publications" : "Inspiré par des publications imprimées emblématiques"}
            </p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
             <div className="hidden md:flex items-center gap-4 text-ink/80 dark:text-dark-ink/80">
              <WeatherWidget language={language} />
              <div className="text-center">
                <p className="font-semibold">{formattedDate}</p>
                <p className="text-sm">{formattedTime}</p>
              </div>
            </div>
            <button
              onClick={handleSavedClick}
              className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Saved Articles"
            >
              {currentView === 'saved' ? <BookmarkFilledIcon className="w-6 h-6 text-accent dark:text-dark-accent" /> : <BookmarkIcon className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Toggle Language"
            >
              <GlobeIcon className="w-6 h-6" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;