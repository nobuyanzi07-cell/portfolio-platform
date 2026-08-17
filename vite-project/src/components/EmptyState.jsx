import './EmptyState.css';

/**
 * EmptyState
 * No props — a static message shown whenever the filtered project
 * list is empty, either from a search or from removing every project.
 */
export default function EmptyState() {
  return (
    <div className="empty-state">
      <p className="mono empty-state__code">404 / NO ENTRY</p>
      <h3 className="empty-state__title">Nothing filed under that.</h3>
      <p className="empty-state__hint">
        Try a different search term, clear the category filter, or add a new
        project to the index.
      </p>
    </div>
  );
}
