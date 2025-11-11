import React from 'react';

interface SkeletonCardProps {
  isMain?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ isMain = false }) => {
  return (
    <div
      className={`relative flex flex-col h-full bg-stone-100 dark:bg-gray-800 border border-ink/10 dark:border-dark-ink/10 animate-pulse ${isMain ? 'p-4 md:p-6' : 'p-4'}`}
    >
      <div className={`bg-gray-300 dark:bg-gray-700 w-full ${isMain ? 'h-64 md:h-80' : 'h-48'} mb-4`}></div>
      <div className="flex-grow flex flex-col">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className={`h-6 bg-gray-300 dark:bg-gray-700 rounded w-full ${isMain ? 'mb-4' : 'mb-2'}`}></div>
        {isMain && <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4 flex-grow"></div>
        <div className="mt-4 pt-4 border-t border-ink/10 dark:border-dark-ink/10">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;