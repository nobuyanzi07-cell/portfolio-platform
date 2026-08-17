import { useState } from 'react';
import './ProjectForm.css';

const BLANK_FORM = {
  title: '',
  client: '',
  category: 'Branding',
  year: new Date().getFullYear(),
  description: '',
  image: '',
  tags: '',
};

const CATEGORY_OPTIONS = ['Branding', 'Web Design', 'Packaging', 'Motion', 'Photography'];

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80';

/*
 * Props:
 *  - onAddProject (function(project)): called with the new project object
 *  - onClose (function): called to dismiss the panel (cancel, or after submit)
 */
export default function ProjectForm({ onAddProject, onClose }) {
  const [form, setForm] = useState(BLANK_FORM);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Give the project a title.';
    if (!form.client.trim()) nextErrors.client = 'Who was this made for?';
    if (!form.description.trim())
      nextErrors.description = 'Add a line describing the work.';
    if (form.year && (form.year < 1990 || form.year > 2100)) {
      nextErrors.year = 'Enter a realistic year.';
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onAddProject({
      title: form.title.trim(),
      client: form.client.trim(),
      category: form.category,
      year: Number(form.year),
      description: form.description.trim(),
      image: form.image.trim() || FALLBACK_IMAGE,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    });

    setForm(BLANK_FORM);
    setErrors({});
    onClose();
  }

  return (
    <div className="project-form-backdrop" onClick={onClose}>
      <div
        className="project-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-form__header">
          <h2 id="project-form-heading" className="project-form__heading">
            File new work
          </h2>
          <button
            type="button"
            className="project-form__close"
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="project-form__grid">
            <label className="project-form__field">
              <span className="mono">Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Marrow Coffee Roasters"
              />
              {errors.title && (
                <span className="project-form__error">{errors.title}</span>
              )}
            </label>

            <label className="project-form__field">
              <span className="mono">Client</span>
              <input
                type="text"
                value={form.client}
                onChange={(event) => updateField('client', event.target.value)}
                placeholder="Marrow Coffee"
              />
              {errors.client && (
                <span className="project-form__error">{errors.client}</span>
              )}
            </label>

            <label className="project-form__field">
              <span className="mono">Category</span>
              <select
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="project-form__field">
              <span className="mono">Year</span>
              <input
                type="number"
                value={form.year}
                onChange={(event) => updateField('year', event.target.value)}
              />
              {errors.year && (
                <span className="project-form__error">{errors.year}</span>
              )}
            </label>

            <label className="project-form__field project-form__field--wide">
              <span className="mono">Image URL (optional)</span>
              <input
                type="url"
                value={form.image}
                onChange={(event) => updateField('image', event.target.value)}
                placeholder="https://…"
              />
            </label>

            <label className="project-form__field project-form__field--wide">
              <span className="mono">Tags (comma separated)</span>
              <input
                type="text"
                value={form.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                placeholder="identity, print"
              />
            </label>

            <label className="project-form__field project-form__field--wide">
              <span className="mono">Description</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) =>
                  updateField('description', event.target.value)
                }
                placeholder="One or two sentences on the brief and the work."
              />
              {errors.description && (
                <span className="project-form__error">
                  {errors.description}
                </span>
              )}
            </label>
          </div>

          <div className="project-form__actions">
            <button
              type="button"
              className="project-form__cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="project-form__submit">
              Add to index
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
