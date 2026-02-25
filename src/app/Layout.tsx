import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import type { Article, Reactions } from '@/types';
import useLocalStorage from '@hooks/useLocalStorage';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ArticleDetail from '@components/ArticleDetail';

type Theme = 'light' | 'dark';
type Language = 'en' | 'fr';

// This is the context that will be passed down to Home and Saved pages
export interface AppContextType {
  language: Language;
  savedArticles: Article[];
  readArticles: string[];
  reactions: Reactions;
  handleSaveToggle: (articleToToggle: Article) => void;
  isArticleSaved: (url: string) => boolean;
  handleSelectArticle: (article: Article) => void;
  isArticleRead: (url: string) => boolean;
  reactedArticles: Record<string, Article>;
  handleReaction: (article: Article, emoji: string) => void;
  getArticleReactions: (articleUrl: string) => Record<string, number>;
}

const Layout: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>('savedArticles', []);
  const [readArticles, setReadArticles] = useLocalStorage<string[]>('readArticles', []);
  const [reactions, setReactions] = useLocalStorage<Reactions>('reactions', {});
  const [reactedArticles, setReactedArticles] = useLocalStorage<Record<string, Article>>('reactedArticles', {});

  function enableThemeTransition() {
    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300); 
  };

  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", theme === "dark");
    };

    if (document.startViewTransition) {
      document.startViewTransition(applyTheme);
    } else {
      enableThemeTransition();
      applyTheme();
    }
  }, [theme]);



  // Lock background scroll when ArticleDetail modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
   }, [selectedArticle]);

  const handleSaveToggle = (articleToToggle: Article) => {
    const isSaved = savedArticles.some(article => article.url === articleToToggle.url);
    if (isSaved) {
      setSavedArticles(savedArticles.filter(article => article.url !== articleToToggle.url));
    } else {
      setSavedArticles([...savedArticles, articleToToggle]);
    }
  };

  const isArticleSaved = (url: string) => savedArticles.some(article => article.url === url);

  const isArticleRead = (url: string) => readArticles.includes(url);

  const handleSelectArticle = (article: Article) => {
    if (!readArticles.includes(article.url)) {
      setReadArticles(prev => [...prev, article.url]);
    }
    setSelectedArticle(article);
  };

  const handleReaction = (article: Article, emoji: string) => {
    const articleUrl = article.url; // Get URL frrom the article object

    setReactions(prevReactions => {
      const newReactions = JSON.parse(JSON.stringify(prevReactions)); // Deep copy
      if (!newReactions[articleUrl]) {
        newReactions[articleUrl] = {};
      }
      const currentArticleReactions = newReactions[articleUrl];
      const isAlreadyReacted = (currentArticleReactions[emoji] || 0) > 0;

      let newReactionsForArticle: Record<string, number>;

      if (isAlreadyReacted) {
        // UNDO: Set reaction count to 0
        newReactionsForArticle = {...currentArticleReactions, [emoji]: 0 };

        // Remove from reactedArticles list
        setReactedArticles(prev => {
          const newState = { ...prev };
          delete newState[articleUrl];
          return newState;
        });

      } else {
        // Set all others to 0 and this one to 1
        newReactionsForArticle = { [emoji]: 1 }

        // Add to reactedArticles list
        setReactedArticles(prev => ({
          ...prev,
          [articleUrl]: article // Adds or updates the article
        }));
      }
      // Return the new top-level state
      return {
        ...prevReactions,
        [articleUrl]: newReactionsForArticle,
      }
    });
  };
  
  const getArticleReactions = (articleUrl: string) => reactions[articleUrl] || {};

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // This context object is passed down to the child routes
  const outletContext: AppContextType = {
    language,
    savedArticles,
    readArticles,
    reactions,
    handleSaveToggle,
    isArticleSaved,
    handleSelectArticle,
    isArticleRead,
    reactedArticles,
    handleReaction,
    getArticleReactions,
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink font-sans transition-colors duration-300">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        savedArticleCount={savedArticles.length}
      />
      <main className="container mx-auto px-4 py-8">
        {/* The  page will be rendered here */}
        <Outlet context={outletContext} />
      </main>
      
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          language={language}
        />
      )}
      <Footer language={language} />
    </div>
  );
};

export default Layout;