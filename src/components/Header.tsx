import React, { useState, useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useClock from '../hooks/useClock';
import { 
  SunIcon, MoonIcon, LanguageIcon, BookmarkIcon, BookmarkFilledIcon, 
  MenuVerticalIcon, HomeIcon, HeartIcon, InfoIcon, ShieldIcon, DocumentIcon 
} from './icons/Icons';
import WeatherWidget from './WeatherWidget';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'fr';
  setLanguage: Dispatch<SetStateAction<'en' | 'fr'>>;
  savedArticleCount: number;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, setLanguage, savedArticleCount }) => {
  const location = useLocation();
  const isSavePage = location.pathname === '/saved';
  const currentTime = useClock();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

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

  const handleClick = (e: React.MouseEvent) => {
    if (isSavePage) {
      e.preventDefault(); // prevent Link navigation
      navigate(-1); // go back to previous page
    }
  };

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Logic for display count
  const getDisplayCount = () => {
    if (savedArticleCount === 0) return null;
    if (savedArticleCount > 99) return '99+';
    return savedArticleCount;
  };
  const displayCount = getDisplayCount();

  // Define menu items for clarity
  const menuItems = [
    { to: "/", icon: HomeIcon, label: "Home", labelFr: "Accueil" },
    { to: "/saved", icon: BookmarkIcon, label: "Saved", labelFr: "Enregistrés" },
    { to: "/reactions", icon: HeartIcon, label: "Reactions", labelFr: "Réactions" },
    { to: "/about", icon: InfoIcon, label: "About", labelFr: "À propos" },
    { to: "/privacy", icon: ShieldIcon, label: "Privacy", labelFr: "Confidentialité" },
    { to: "/terms", icon: DocumentIcon, label: "Terms", labelFr: "Conditions" },
  ];
  
  const getLabel = (item: typeof menuItems[0]) => language === 'en' ? item.label : item.labelFr;

  return (
    <header className="border-b-4 border-b-ink dark:border-b-dark-ink/50 bg-paper dark:bg-dark-paper sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <Link to="/">
              <h1 className="font-serif font-black text-3xl md:text-5xl text-ink dark:text-dark-ink tracking-tight cursor-pointer">
                {language === "en" ? "The WinNews Time" : "L'heure de WinNews"}
              </h1>
            </Link>
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
            
            {/* Main Saved Icon */}
            <Link
              to={isSavePage ? "#" : "/saved"}
              onClick={handleClick}
              className="relative p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Saved Articles"
              title='Saved'
            >
              {isSavePage
                  ? <BookmarkFilledIcon className="w-6 h-6 text-accent dark:text-dark-accent" />
                  : <BookmarkIcon className="w-6 h-6" />
              }
              {/* Notification Count Badge */}
              {displayCount && (
                <span className=' absolute -top-1 -right-1 flex justify-center items-center w-5 h-5 bg-accent dark:bg-dark-accent text-paper dark:text-dark-paper text-[10px] font-bold rounded-full leading-none shadow-md p-1'>
                 {savedArticleCount}
                </span>
              )}
            </Link>
            
            {/* Language Icon */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Toggle Language"
            >
              <LanguageIcon className="w-6 h-6" />
            </button>
            
            {/* Theme Icon */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
            
            {/* Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className="p-2 rounded-full hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
                aria-label="Open Menu"
              >
                <MenuVerticalIcon className="w-6 h-6" />
              </button>
              
              {isMenuOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 w-56 p-2 bg-paper dark:bg-dark-paper shadow-xl rounded-lg border border-ink/20 dark:border-dark-ink/20 z-30"
                >
                  <div className="grid grid-cols-3 gap-2">
                    {menuItems.map((item) => {
                      // Check if the current page matches the item's route
                      const isActive = location.pathname === item.to;
                      
                      // Dynamically choose the icon (e.g., filled bookmark)
                      let IconComponent = item.icon;
                      if (item.to === '/saved' && isActive) {
                        IconComponent = BookmarkFilledIcon;
                      }

                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          // Apply active styles conditionally
                          className={`relative flex flex-col items-center justify-center p-3 rounded-lg transition-colors text-center ${
                            isActive
                              ? 'bg-ink/5 dark:bg-dark-ink/10' // Subtle active background
                              : 'hover:bg-ink/10 dark:hover:bg-dark-ink/10'
                          }`}
                          title={getLabel(item)}
                        >
                          <IconComponent 
                            // Apply active text/icon color
                            className={`w-6 h-6 ${
                              isActive 
                                ? 'text-accent dark:text-dark-accent' 
                                : ''
                            }`} 
                          />
                          <span 
                            // Apply active text color and font weight
                            className={`text-xs font-medium mt-1 truncate w-full ${
                              isActive 
                                ? 'font-bold text-accent dark:text-dark-accent' 
                                : ''
                            }`}
                          >
                            {getLabel(item)}
                          </span>

                          {/* Badge (for dropdown item) */}
                          {item.to === '/saved' && displayCount && (
                             <span className="absolute top-1 right-1 flex justify-center items-center w-5 h-5 bg-accent dark:bg-dark-accent text-paper dark:text-dark-paper text-[10px] font-bold rounded-full leading-none p-1">
                              {displayCount}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;