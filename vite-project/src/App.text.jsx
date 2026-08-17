import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

describe('App', () => {
  it('renders the seeded projects on first load', () => {
    render(<App />);
    expect(screen.getByText('Marrow Coffee Roasters')).toBeInTheDocument();
    expect(screen.getByText('Lumen Architecture Studio')).toBeInTheDocument();
  });

  it('filters the list as the visitor types in the search box', () => {
    render(<App />);
    const search = screen.getByPlaceholderText(
      'Search by title, client, or tag…'
    );

    fireEvent.change(search, { target: { value: 'lumen' } });

    expect(screen.getByText('Lumen Architecture Studio')).toBeInTheDocument();
    expect(
      screen.queryByText('Marrow Coffee Roasters')
    ).not.toBeInTheDocument();
  });

  it('shows the empty state when no project matches the search', () => {
    render(<App />);
    const search = screen.getByPlaceholderText(
      'Search by title, client, or tag…'
    );

    fireEvent.change(search, { target: { value: 'zzzzzz-no-match' } });

    expect(screen.getByText('Nothing filed under that.')).toBeInTheDocument();
  });

  it('opens the form, adds a project, and shows it in the list', () => {
    render(<App />);

    fireEvent.click(screen.getByText('+ New project'));

    fireEvent.change(screen.getByPlaceholderText('Marrow Coffee Roasters'), {
      target: { value: 'Brand New Project' },
    });
    fireEvent.change(screen.getByPlaceholderText('Marrow Coffee'), {
      target: { value: 'Brand New Client' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        'One or two sentences on the brief and the work.'
      ),
      { target: { value: 'Description of the brand new project.' } }
    );

    fireEvent.click(screen.getByText('Add to index'));

    expect(screen.getByText('Brand New Project')).toBeInTheDocument();
  });
});
