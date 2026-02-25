import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getTopHeadlines, searchArticles } from '@services/newsService';
import type { Article, Category } from '@/./types';
import type { AppContextType } from '@app/Layout';
import SearchBar from '@components/SearchBar';
import FilterBar from '@components/FilterBar';
import ArticleCard from '@components/ArticleCard';
import SkeletonCard from '@components/SkeletonCard';

const Home: React.FC = () => {
  const {
    language,
    handleSaveToggle,
    isArticleSaved,
    handleSelectArticle,
    isArticleRead,
    handleReaction,
    getArticleReactions,
  } = useOutletContext<AppContextType>();

  // Page-specific state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<Category | 'all'>('all');

  const fetchNews = useCallback(async (query: string, cat: Category | 'all') => {
    setLoading(true);
    setError(null);
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
    fetchNews(searchQuery, category);
  }, [language, category, searchQuery, fetchNews]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCategory('all'); // Reset category when searching
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const commonArticleCardProps = (article: Article) => ({
    onReadMore: () => handleSelectArticle(article),
    onSaveToggle: handleSaveToggle,
    isSaved: isArticleSaved(article.url),
    isRead: isArticleRead(article.url),
    reactions: getArticleReactions(article.url),
    onReact: handleReaction,
  });

  const renderContent = () => {
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
    <>
      <div className="flex flex-col items-center gap-8 mb-8 w-full">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} currentQuery={searchQuery} />
        <FilterBar
          selectedCategory={category}
          onCategoryChange={setCategory}
          isDisabled={!!searchQuery}
          language={language}
        />
      </div>
      {renderContent()}
    </>
  );
};

export default Home;