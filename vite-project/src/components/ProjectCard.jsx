import './ProjectCard.css';

/**
 * ProjectCard
 * Displays a single project as a numbered catalog entry.
 *
 * Props:
 *  - project (object): { id, title, client, category, year, description, image, tags }
 *  - index (number): position in the *currently filtered* list, used for the running index number
 *  - onRemove (function(id)): removes this project from the catalog
 */
export default function ProjectCard({ project, index, onRemove }) {
  const number = String(index + 1).padStart(3, '0');

  return (
    <li className="project-card">
      <div className="project-card__media">
        <img src={project.image} alt="" loading="lazy" />
        <span className="project-card__number mono" aria-hidden="true">
          {number}
        </span>
      </div>

      <div className="project-card__body">
        <div className="project-card__row mono">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__client">{project.client}</p>
        <p className="project-card__desc">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <ul className="project-card__tags mono" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="project-card__remove"
          onClick={() => onRemove(project.id)}
        >
          Remove from index
        </button>
      </div>
    </li>
  );
}
