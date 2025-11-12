import React from 'react';
import { ThumbsUp, Heart, Laugh, Meh, Frown, Angry } from 'lucide-react'; // Lucide icons
import type { Article } from '../types';

interface ReactionBarProps {
  article: Article;
  reactions: Record<string, number>;
  onReact: (article: Article, emoji: string) => void;
}

// Map icons to reaction keys
const REACTION_ICONS = [
  { key: '👍', Icon: ThumbsUp, color: 'text-blue-500' },
  { key: '❤️', Icon: Heart, color: 'text-red-500' },
  { key: '😂', Icon: Laugh, color: 'text-yellow-500' },
  { key: '😮', Icon: Meh, color: 'text-amber-500' },
  { key: '😢', Icon: Frown, color: 'text-sky-500' },
  { key: '😡', Icon: Angry, color: 'text-red-600' },
];

const ReactionBar: React.FC<ReactionBarProps> = ({
  article,
  reactions,
  onReact,
}) => {
  const handleReact = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    e.preventDefault();
    onReact(article, key);
  };

  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      {REACTION_ICONS.map(({ key, Icon, color }) => {
        const isActive = (reactions[key] || 0) > 0;

        return (
        <button
          key={key}
          onClick={(e) => handleReact(e, key)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full hover:scale-110 transition-all duration-200 group ${isActive ? 'bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700' : 'bg-paper dark:bg-gray-700 hover:bg-ink/10 dark:hover:bg-dark-ink/20'}`}
          aria-label={`React with ${key}`}
        >
          <Icon
            className={`w-4 h-4 ${color} group-hover:scale-125 transition-transform`}
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className={`text-xs font-semibold ${isActive ? 'text-blue-700 dark:text-blue-200' :'text-ink/70 dark:text-dark-ink/70'}`}>
            {reactions[key] || 0}
          </span>
        </button>
        );
    })}
    </div>
  );
};

export default ReactionBar;