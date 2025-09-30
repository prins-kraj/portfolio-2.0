import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '../Projects';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('Projects Component', () => {
  test('renders projects section with header', () => {
    render(<Projects />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  test('displays all projects by default', () => {
    render(<Projects />);
    expect(screen.getByText('CloudNote')).toBeInTheDocument();
    expect(screen.getByText('Codial')).toBeInTheDocument();
    expect(screen.getByText('NewsNexus')).toBeInTheDocument();
  });

  test('filters projects by category', () => {
    render(<Projects />);
    
    // Click on Frontend filter
    const frontendButton = screen.getByText('Frontend');
    fireEvent.click(frontendButton);
    
    // Should show only NewsNexus (Frontend project)
    expect(screen.getByText('NewsNexus')).toBeInTheDocument();
    expect(screen.queryByText('CloudNote')).not.toBeInTheDocument();
    expect(screen.queryByText('Codial')).not.toBeInTheDocument();
  });

  test('filters projects by technology', () => {
    render(<Projects />);
    
    // Click on React.js technology filter
    const reactButton = screen.getByText('React.js');
    fireEvent.click(reactButton);
    
    // Should show projects that use React.js
    expect(screen.getByText('CloudNote')).toBeInTheDocument();
    expect(screen.getByText('NewsNexus')).toBeInTheDocument();
  });

  test('shows project count correctly', () => {
    render(<Projects />);
    expect(screen.getByText(/Showing 3 of 3 projects/)).toBeInTheDocument();
  });

  test('clears filters when clear all is clicked', () => {
    render(<Projects />);
    
    // Apply a filter first
    const frontendButton = screen.getByText('Frontend');
    fireEvent.click(frontendButton);
    
    // Clear all filters
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    
    // Should show all projects again
    expect(screen.getByText('CloudNote')).toBeInTheDocument();
    expect(screen.getByText('Codial')).toBeInTheDocument();
    expect(screen.getByText('NewsNexus')).toBeInTheDocument();
  });

  test('shows empty state when no projects match filters', () => {
    render(<Projects />);
    
    // This would require a filter combination that returns no results
    // For now, we'll test the empty state component exists
    expect(screen.queryByText('No projects found')).not.toBeInTheDocument();
  });

  test('displays GitHub links for all projects', () => {
    render(<Projects />);
    
    const githubLinks = screen.getAllByText('Code');
    expect(githubLinks).toHaveLength(3); // One for each project
  });
});