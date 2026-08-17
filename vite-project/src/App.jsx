import { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Footer from './components/Footer';
import useProjects from './hooks/useProjects';

 
export default function App() {
  const { projects, addProject, removeProject, categories } = useProjects();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [
        project.title,
        project.client,
        project.category,
        project.description,
        ...(project.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [projects, searchTerm, activeCategory]);

  return (
    <>
      <Header projectCount={projects.length} onAddClick={() => setIsFormOpen(true)} />
      <main>
        <Hero />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          resultCount={visibleProjects.length}
        />
        <ProjectList projects={visibleProjects} onRemove={removeProject} />
      </main>
      <Footer />

      {isFormOpen && (
        <ProjectForm
          onAddProject={addProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}
