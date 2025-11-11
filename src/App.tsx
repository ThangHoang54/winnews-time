import React, { useState, useEffect, useCallback } from 'react';
import { getTopHeadlines, searchArticles } from './services/newsService';
import type { Article, Category, Reactions } from './types';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import useLocalStorage from './hooks/useLocalStorage';
import SkeletonCard from './components/SkeletonCard';

type Theme = 'light' | 'dark';
type Language = 'en' | 'fr';
type View = 'home' | 'saved';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>('savedArticles', []);
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [readArticles, setReadArticles] = useLocalStorage<string[]>('readArticles', []);
  const [reactions, setReactions] = useLocalStorage<Reactions>('reactions', {});

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const fetchNews = useCallback(async (query: string, cat: Category | 'all') => {
    setLoading(true);
    setError(null);
    setSelectedArticle(null);
    try {
      const newsData = query
        ? await searchArticles(query, language)
        : await getTopHeadlines(language, cat === 'all' ? undefined : cat);
      setArticles(newsData.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    if (view === 'home') {
      fetchNews(searchQuery, category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, category, view]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCategory('all'); // Reset category when searching
    fetchNews(query, 'all');
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    fetchNews('', category);
  };
  
  const handleSaveToggle = (articleToToggle: Article) => {
    const isSaved = savedArticles.some(article => article.url === articleToToggle.url);
    if (isSaved) {
      setSavedArticles(savedArticles.filter(article => article.url !== articleToToggle.url));
    } else {
      setSavedArticles([...savedArticles, articleToToggle]);
    }
  };

  const isArticleSaved = (url: string) => savedArticles.some(article => article.url === url);
  
  const handleSelectArticle = (article: Article) => {
    if (!readArticles.includes(article.url)) {
      setReadArticles(prev => [...prev, article.url]);
    }
    setSelectedArticle(article);
  };

  const handleReaction = (articleUrl: string, emoji: string) => {
    setReactions(prevReactions => {
      const newReactions = JSON.parse(JSON.stringify(prevReactions)); // Deep copy
      if (!newReactions[articleUrl]) {
        newReactions[articleUrl] = {};
      }
      newReactions[articleUrl][emoji] = (newReactions[articleUrl][emoji] || 0) + 1;
      return newReactions;
    });
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const renderContent = () => {
    const commonArticleCardProps = (article: Article) => ({
        onReadMore: () => handleSelectArticle(article),
        onSaveToggle: handleSaveToggle,
        isSaved: isArticleSaved(article.url),
        isRead: readArticles.includes(article.url),
        reactions: reactions[article.url] || {},
        onReact: handleReaction,
    });

    if (view === 'saved') {
      return (
        <div>
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">{language === 'en' ? 'Saved Articles' : 'Articles Sauvegardés'}</h2>
          {savedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedArticles.map((article, index) => (
                <div key={article.url + index} className="col-span-1">
                  <ArticleCard article={article} {...commonArticleCardProps(article)} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg mt-10">{language === 'en' ? 'You have no saved articles.' : 'Vous n\'avez aucun article sauvegardé.'}</p>
          )}
        </div>
      );
    }

    if (loading) return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={`skel-main-${i}`} className="md:col-span-2 lg:col-span-2">
            <SkeletonCard isMain />
          </div>
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={`skel-sub-${i}`} className="col-span-1">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

    if (articles.length === 0) {
      return <p className="text-center text-lg mt-10">{language === 'en' ? `No results found for "${searchQuery}".` : `Aucun résultat trouvé pour "${searchQuery}".`}</p>;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => {
          const isShowcase = index < 2;
          const gridClass = isShowcase ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';
          
          return (
            <div key={article.url + index} className={gridClass}>
              <ArticleCard
                article={article}
                isMain={isShowcase}
                {...commonArticleCardProps(article)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink font-sans transition-colors duration-300">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        currentView={view}
        setView={setView}
      />
      <main className="container mx-auto px-4 py-8">
        {view === 'home' && (
          <div className="flex flex-col items-center gap-8 mb-8 w-full">
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} currentQuery={searchQuery} />
            <FilterBar
              selectedCategory={category}
              onCategoryChange={setCategory}
              isDisabled={!!searchQuery}
              language={language}
            />
          </div>
        )}

        {renderContent()}
      </main>
      
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          language={language}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;