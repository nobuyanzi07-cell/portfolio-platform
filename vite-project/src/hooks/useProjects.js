import { useEffect, useMemo, useState } from 'react';
import seedProjects from '../data/projects';

const STORAGE_KEY = 'portfolio-platform:projects';

// Reads the saved catalog from localStorage, falling back to the seed
// data the very first time the app runs (or if storage is unavailable).
function loadInitialProjects() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore malformed/blocked storage and fall back to the seed set.
  }
  return seedProjects;
}

/**
 * useProjects centralizes all state for the project catalog: the list
 * itself, persistence to localStorage, and add/remove actions. Keeping
 * this logic in one hook (rather than spread across components) means
 * App.jsx only has to wire props together, and the same hook could be
 * reused anywhere else the catalog needs to live.
 */
export default function useProjects() {
  const [projects, setProjects] = useState(loadInitialProjects);

  // Persist any change to the catalog automatically.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Storage may be full or disabled (e.g. private browsing) — the
      // app still works in-memory for the session either way.
    }
  }, [projects]);

  function addProject(newProject) {
    const project = {
      ...newProject,
      id: `p-${Date.now()}`,
    };
    // New work goes to the top of the index.
    setProjects((prev) => [project, ...prev]);
  }

  function removeProject(id) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }

  // Every distinct category currently in the catalog, for the filter chips.
  const categories = useMemo(() => {
    const set = new Set(projects.map((project) => project.category));
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  return { projects, addProject, removeProject, categories };
}
