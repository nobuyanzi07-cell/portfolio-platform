import './SearchBar.css';

/*
 * Props:
 *  - searchTerm (string)
 *  - onSearchChange (function(nextValue))
 *  - categories (string[])
 *  - activeCategory (string)
 *  - onCategoryChange (function(nextCategory))
 *  - resultCount (number)
 */
export default function SearchBar({
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  resultCount,
}) {
  return (
    <div className="toolbar">
      <div className="container toolbar__inner">
        <label className="toolbar__search" htmlFor="project-search">
          <span className="mono toolbar__search-icon" aria-hidden="true">
            /
          </span>
          <input
            id="project-search"
            type="search"
            placeholder="Search by title, client, or tag…"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div
          className="toolbar__filters"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                'toolbar__chip mono' +
                (category === activeCategory ? ' toolbar__chip--active' : '')
              }
              onClick={() => onCategoryChange(category)}
              aria-pressed={category === activeCategory}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mono toolbar__count">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </p>
      </div>
    </div>
  );
}
