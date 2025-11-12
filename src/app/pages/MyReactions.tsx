import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { AppContextType } from '../Layout';
import type { Article } from '../../types';
import ArticleCard from '../../components/ArticleCard';
import ReactionFilterBar from '../../components/ReactionFilterBar';
import ReactionSortDropdown, { type SortOptionKey } from '../../components/ReactionSortDropdown';
import { ThumbsUp, Heart, Laugh, Meh, Frown, Angry } from 'lucide-react';
import { SearchIcon } from '../../components/icons/Icons';

// This map now holds all info, including labels, and is our single source of truth
const REACTION_MAP = [
  { key: '👍', Icon: ThumbsUp, color: 'text-blue-500', en: 'Liked', fr: 'Aimé' },
  { key: '❤️', Icon: Heart, color: 'text-red-500', en: 'Loved', fr: 'Adoré' },
  { key: '😂', Icon: Laugh, color: 'text-yellow-500', en: 'Laughed at', fr: 'Rié de' },
  { key: '😮', Icon: Meh, color: 'text-amber-500', en: 'Surprised by', fr: 'Surpris par' },
  { key: '😢', Icon: Frown, color: 'text-sky-500', en: 'Saddened by', fr: 'Attristé par' },
  { key: '😡', Icon: Angry, color: 'text-red-600', en: 'Angered by', fr: 'En colère contre' },
];

// Helper for sorting
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const MyReactions: React.FC = () => {
  const {
    language,
    reactedArticles,
    getArticleReactions,
    handleReaction,
    handleSelectArticle,
    handleSaveToggle,
    isArticleSaved,
    isArticleRead,
  } = useOutletContext<AppContextType>();

  // State for all our filters and sorting
  const [filterQuery, setFilterQuery] = useState('');
  const [activeReactionFilters, setActiveReactionFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOptionKey>('publishedAt:desc');

  const allArticles = Object.values(reactedArticles);

  // This function bundles the common props for ArticleCard
  const getCommonArticleCardProps = (article: Article) => ({
    onReadMore: () => handleSelectArticle(article),
    onSaveToggle: handleSaveToggle,
    isSaved: isArticleSaved(article.url),
    isRead: isArticleRead(article.url),
    reactions: getArticleReactions(article.url),
    onReact: handleReaction,
  });

  // Handler for the filter bar
  const handleToggleReactionFilter = (key: string) => {
    if (key === '__ALL__') {
      setActiveReactionFilters([]);
    } else {
      setActiveReactionFilters(prev =>
        prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
      );
    }
  };

  // This big 'useMemo' hook calculates the final data to display
  const processedRows = useMemo(() => {
    // 1. Text Filter
    const textFilteredArticles = filterQuery
      ? allArticles.filter(article => {
        const query = filterQuery.toLowerCase();
        return article.title.toLowerCase().includes(query) ||
          article.description?.toLowerCase().includes(query) ||
          article.source.name.toLowerCase().includes(query);
      })
      : allArticles;

    // 2. Group by reaction
    const grouped = REACTION_MAP.map(reactionInfo => {
      const articles = textFilteredArticles.filter(article => {
        const reactions = getArticleReactions(article.url);
        return (reactions[reactionInfo.key] || 0) > 0;
      });
      return { ...reactionInfo, articles };
    });

    // 3. Reaction Filter (filter the *rows* themselves)
    const filteredGroups = activeReactionFilters.length > 0
      ? grouped.filter(group => activeReactionFilters.includes(group.key))
      : grouped;

    // 4. Sort articles *within* each filtered group
    const [sortKey, sortDir] = sortBy.split(':'); // e.g., 'publishedAt', 'desc'

    return filteredGroups.map(group => {
      const sortedArticles = [...group.articles].sort((a, b) => {
        const valA = getNestedValue(a, sortKey);
        const valB = getNestedValue(b, sortKey);

        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
      return { ...group, articles: sortedArticles };
    });

  }, [allArticles, filterQuery, activeReactionFilters, sortBy, getArticleReactions, language]);

  // Check for the "No results" edge case
  const totalVisibleArticles = processedRows.reduce((sum, row) => sum + row.articles.length, 0);

  // Main Render
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-serif font-bold border-b border-ink/20 pb-4">
        {language === 'en' ? 'Your Reactions' : 'Votre Réactions'}
      </h1>

      <div className="space-y-4">
        {/* Filter + Sort Bar */}
        <div
          className="flex flex-col lg:flex-row items-stretch lg:items-center 
               justify-between gap-3 lg:gap-4 bg-white/70 dark:bg-gray-900/70 
               backdrop-blur-sm border border-ink/10 dark:border-dark-ink/10 
               rounded-xl px-4 py-3 shadow-sm"
        >
          {/* Search / Filter Input */}
          <div className="relative flex-1 min-w-[240px]">
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-ink/50 dark:text-dark-ink/50" />
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search by title or source...'
                  : 'Rechercher par titre ou source...'
              }
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-paper dark:bg-gray-800 
                   border border-ink/20 dark:border-dark-ink/20 focus:outline-none 
                   focus:ring-2 focus:ring-accent/70 dark:focus:ring-dark-accent/70 
                   placeholder:text-ink/50 dark:placeholder:text-dark-ink/50
                   transition-all duration-200"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex-shrink-0">
            <ReactionSortDropdown
              selectedSort={sortBy}
              onSortChange={setSortBy}
              language={language}
            />
          </div>
        </div>

        {/* Reaction Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <ReactionFilterBar
            reactions={REACTION_MAP.map((r) => ({ ...r, label: r[language] }))}
            activeFilters={activeReactionFilters}
            onToggleFilter={handleToggleReactionFilter}
            language={language}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-12">
        {/* Edge Case: No articles saved at all */}
        {allArticles.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-semibold mb-2">
              {language === 'en' ? 'No Reactions Yet' : 'Aucune Réaction Pour le Moment'}
            </h2>
            <p className="text-ink/70 dark:text-dark-ink/70">
              {language === 'en' ? 'React to an article to see it here.' : 'Réagissez à un article pour le voir ici.'}
            </p>
          </div>
        )}

        {/* Edge Case: Articles exist, but filters hide them all */}
        {allArticles.length > 0 && totalVisibleArticles === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-semibold mb-2">
              {language === 'en' ? 'No Matching Articles' : 'Aucun Article Correspondant'}
            </h2>
            <p className="text-ink/70 dark:text-dark-ink/70">
              {language === 'en' ? 'Try adjusting your filters.' : 'Essayez d’ajuster vos filtres.'}
            </p>
          </div>
        )}

        {/* Render each reaction row */}
        {processedRows.map(({ key, Icon, color, articles, ...labels }) => {
          // Don't render empty rows
          if (articles.length === 0) return null;

          return (
            <section key={key} className="flex flex-col gap-6">
              {/* Row Header */}
              <div className={`flex items-center gap-3 border-b-2 pb-3 ${color.replace('text', 'border')}`}>
                <Icon className={`w-7 h-7 ${color}`} />
                <h2 className={`text-2xl font-serif font-bold ${color}`}>
                  {labels[language]}
                </h2>
                <span className="text-lg font-sans font-medium text-ink/60 dark:text-dark-ink/60">
                  ({articles.length})
                </span>
              </div>

              {/* Grid of Articles for this row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.url + index}
                    article={article}
                    {...getCommonArticleCardProps(article)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default MyReactions;