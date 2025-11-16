import React, { useEffect } from 'react';
import { type Article } from '../types';
import { CloseIcon } from './icons/Icons';

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
  language: 'en' | 'fr';
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose, language }) => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  const formattedDate = new Date(article.publishedAt).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 md:p-8 relative font-serif"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-ink/60 dark:text-dark-ink/60 hover:text-ink dark:hover:text-dark-ink hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h1 className="text-3xl md:text-4xl font-black mb-2 text-accent dark:text-dark-accent">{article.title}</h1>
        <div className="text-sm text-ink/70 dark:text-dark-ink/70 mb-4 border-b border-ink/20 dark:border-dark-ink/20 pb-4">
          <p>
            {language === 'en' ? 'By' : 'Par'} <span className="font-bold">{article.author || article.source.name}</span>
          </p>
          <p>{formattedDate}</p>
        </div>

        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} className="w-full h-auto max-h-96 object-contain my-6" />
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-justify leading-relaxed">
           <p className="text-lg leading-relaxed">
            {article.content || article.description || (language === 'en' ? 'No content available.' : 'Aucun contenu disponible.')}
          </p>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 text-accent dark:text-dark-accent font-bold hover:underline"
        >
          {language === 'en' ? 'Read full story at' : 'Lire l\'article complet sur'} {article.source.name} &rarr;
        </a>
      </div>
    </div>
  );
};

export default ArticleDetail;
