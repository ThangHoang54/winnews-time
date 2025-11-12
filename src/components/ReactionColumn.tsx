import React from 'react';
import { Icon } from 'lucide-react';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';

// Define the shape of the common props
type CommonCardProps = {
  onReadMore: () => void;
  onSaveToggle: (article: Article) => void;
  isSaved: boolean;
  isRead: boolean;
  reactions: Record<string, number>;
  onReact: (article: Article, emoji: string) => void;
};

interface ReactionColumnProps {
  title: string;
  Icon: Icon;
  articles: Article[];
  getCommonArticleCardProps: (article: Article) => CommonCardProps;
}

const ReactionColumn: React.FC<ReactionColumnProps> = ({
  title,
  Icon,
  articles,
  getCommonArticleCardProps,
}) => {
  return (
    // This is the column container
    <div className="flex-shrink-0 w-full md:w-[400px] lg:w-[450px]">
      <div className="sticky top-0 z-10 bg-paper/90 dark:bg-dark-paper/90 backdrop-blur-sm pt-2 pb-4">
        <h2 className="flex items-center gap-3 text-2xl font-serif font-semibold text-ink dark:text-dark-ink">
          <Icon className="w-6 h-6" />
          <span>{title}</span>
          <span className="text-lg font-sans text-ink/50 dark:text-dark-ink/50">
            ({articles.length})
          </span>
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        {articles.length === 0 ? (
          <p className="text-sm text-ink/60 dark:text-dark-ink/60 px-2">
            No articles in this category.
          </p>
        ) : (
          articles.map((article, index) => (
            <ArticleCard
              key={article.url + index}
              article={article}
              {...getCommonArticleCardProps(article)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReactionColumn;