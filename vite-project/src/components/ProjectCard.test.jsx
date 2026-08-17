import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './ProjectCard';

const project = {
  id: 'p-test',
  title: 'Test Project',
  client: 'Test Client',
  category: 'Branding',
  year: 2025,
  description: 'A short description of the work.',
  image: 'https://example.com/image.jpg',
  tags: ['identity', 'print'],
};

describe('ProjectCard', () => {
  it('renders the project title, client, and description', () => {
    render(<ProjectCard project={project} index={0} onRemove={() => {}} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(
      screen.getByText('A short description of the work.')
    ).toBeInTheDocument();
  });

  it('shows a zero-padded index number based on its position', () => {
    render(<ProjectCard project={project} index={4} onRemove={() => {}} />);
    expect(screen.getByText('005')).toBeInTheDocument();
  });

  it('renders each tag prefixed with #', () => {
    render(<ProjectCard project={project} index={0} onRemove={() => {}} />);
    expect(screen.getByText('#identity')).toBeInTheDocument();
    expect(screen.getByText('#print')).toBeInTheDocument();
  });

  it('calls onRemove with the project id when "Remove from index" is clicked', () => {
    const handleRemove = vi.fn();
    render(
      <ProjectCard project={project} index={0} onRemove={handleRemove} />
    );
    fireEvent.click(screen.getByText('Remove from index'));
    expect(handleRemove).toHaveBeenCalledWith('p-test');
  });
});
