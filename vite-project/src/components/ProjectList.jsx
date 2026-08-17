import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import './ProjectList.css';

/*
 * Props:
 *  - projects (array): filtered projects to display
 *  - onRemove (function(id)): passed through to each card
 */
export default function ProjectList({ projects, onRemove }) {
  return (
    <section className="project-grid-section">
      <div className="container">
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onRemove={onRemove}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
