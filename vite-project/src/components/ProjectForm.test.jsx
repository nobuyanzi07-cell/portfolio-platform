import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectForm from './ProjectForm';

describe('ProjectForm', () => {
  it('shows validation errors and does not submit when required fields are empty', () => {
    const handleAdd = vi.fn();
    render(<ProjectForm onAddProject={handleAdd} onClose={() => {}} />);

    fireEvent.click(screen.getByText('Add to index'));

    expect(screen.getByText('Give the project a title.')).toBeInTheDocument();
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('submits a well-formed project and resets/closes on success', () => {
    const handleAdd = vi.fn();
    const handleClose = vi.fn();
    render(<ProjectForm onAddProject={handleAdd} onClose={handleClose} />);

    fireEvent.change(screen.getByPlaceholderText('Marrow Coffee Roasters'), {
      target: { value: 'New Project' },
    });
    fireEvent.change(screen.getByPlaceholderText('Marrow Coffee'), {
      target: { value: 'New Client' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('One or two sentences on the brief and the work.'),
      { target: { value: 'A description of the new work.' } }
    );

    fireEvent.click(screen.getByText('Add to index'));

    expect(handleAdd).toHaveBeenCalledTimes(1);
    const submitted = handleAdd.mock.calls[0][0];
    expect(submitted.title).toBe('New Project');
    expect(submitted.client).toBe('New Client');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel is clicked', () => {
    const handleClose = vi.fn();
    render(<ProjectForm onAddProject={() => {}} onClose={handleClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
