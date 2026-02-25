import React from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Article } from '@/./types';
import type { AppContextType } from '@app/Layout';
import ArticleCard from '@components/ArticleCard';

const Saved: React.FC = () => {
  // Get shared state and handlers from the Layout
  const {
    language,
    savedArticles,
    handleSaveToggle,
    isArticleSaved,
    handleSelectArticle,
    isArticleRead,
    handleReaction,
    getArticleReactions,
  } = useOutletContext<AppContextType>();

  const commonArticleCardProps = (article: Article) => ({
    onReadMore: () => handleSelectArticle(article),
    onSaveToggle: handleSaveToggle,
    isSaved: isArticleSaved(article.url),
    isRead: isArticleRead(article.url),
    reactions: getArticleReactions(article.url),
    onReact: handleReaction,
  });

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
};

export default Saved;