import React from 'react';
import { ThumbsUp, Heart, Laugh, Meh, Frown, Angry } from 'lucide-react'; // Lucide icons

interface ReactionBarProps {
  articleUrl: string;
  reactions: Record<string, number>;
  onReact: (articleUrl: string, emoji: string) => void;
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
  articleUrl,
  reactions,
  onReact,
}) => {
  const handleReact = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    e.preventDefault();
    onReact(articleUrl, key);
  };

  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      {REACTION_ICONS.map(({ key, Icon, color }) => (
        <button
          key={key}
          onClick={(e) => handleReact(e, key)}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-paper dark:bg-gray-700 
                     hover:scale-110 hover:bg-ink/10 dark:hover:bg-dark-ink/20 
                     transition-all duration-200 group"
          aria-label={`React with ${key}`}
        >
          <Icon
            className={`w-4 h-4 ${color} group-hover:scale-125 transition-transform`}
            strokeWidth={2}
          />
          <span className="text-xs font-semibold text-ink/70 dark:text-dark-ink/70">
            {reactions[key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;