import React from 'react';
import { type Article } from '../types';
import { BookmarkIcon, BookmarkFilledIcon } from './icons/Icons';
import ReactionBar from './ReactionBar';

interface ArticleCardProps {
  article: Article;
  onReadMore: () => void;
  isMain?: boolean;
  onSaveToggle: (article: Article) => void;
  isSaved: boolean;
  isRead: boolean;
  reactions: Record<string, number>;
  onReact: (articleUrl: string, emoji: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadMore, isMain = false, onSaveToggle, isSaved, isRead, reactions, onReact }) => {
  const { title, description, urlToImage, source, author, publishedAt } = article;
  
  const formattedDate = new Date(publishedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onReadMore from firing
    onSaveToggle(article);
  };

  return (
    <div
      onClick={onReadMore}
      className={`group relative flex flex-col h-full bg-stone-100 dark:bg-gray-800 border border-ink/10 dark:border-dark-ink/10 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isMain ? 'p-4 md:p-6' : 'p-4'} ${isRead ? 'opacity-70 hover:opacity-100' : ''}`}
    >
      <button
        onClick={handleSaveClick}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-paper/70 dark:bg-dark-paper/70 hover:bg-paper dark:hover:bg-dark-paper transition-colors"
        aria-label={isSaved ? "Remove from saved" : "Save for later"}
      >
        {isSaved ? (
          <BookmarkFilledIcon className="w-5 h-5 text-accent dark:text-dark-accent" />
        ) : (
          <BookmarkIcon className="w-5 h-5 text-ink/60 dark:text-dark-ink/60 group-hover:text-ink dark:group-hover:text-dark-ink" />
        )}
      </button>

      {urlToImage && (
        <div className="overflow-hidden mb-4">
          <img
            src={urlToImage}
            alt={title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isMain ? 'h-64 md:h-80' : 'h-48'}`}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}
      <div className="flex-grow flex flex-col">
        <p className="text-xs uppercase font-semibold text-accent dark:text-dark-accent mb-1">{source.name}</p>
        <h2 className={`font-serif font-bold group-hover:text-accent dark:group-hover:text-dark-accent transition-colors ${isMain ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {title}
        </h2>
        <p className={`mt-2 flex-grow text-ink/80 dark:text-dark-ink/80 ${isMain ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-ink/10 dark:border-dark-ink/10">
           <div className="text-xs text-ink/60 dark:text-dark-ink/60">
            <span>{author || 'Unknown Author'}</span> &bull; <span>{formattedDate}</span>
          </div>
           <ReactionBar
            articleUrl={article.url}
            reactions={reactions}
            onReact={onReact}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;