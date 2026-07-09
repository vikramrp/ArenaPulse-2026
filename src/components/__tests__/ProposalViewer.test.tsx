import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProposalViewer from '../ProposalViewer';

describe('ProposalViewer Component', () => {
  it('renders correctly with default slide active', () => {
    render(<ProposalViewer theme="dark" />);
    
    // The "exec" (Executive Summary) is the default slide
    expect(screen.getByRole('heading', { name: /Executive Summary/i })).toBeInTheDocument();
    expect(screen.getByText('CENTRAL PROJECT BRIEF')).toBeInTheDocument();
  });

  it('switches slide when a different category tab is clicked', () => {
    render(<ProposalViewer theme="dark" />);
    
    // Switch to elevator pitch slide
    const pitchButton = screen.getByRole('button', { name: /The Elevator Pitch/i });
    fireEvent.click(pitchButton);
    
    expect(screen.getByRole('heading', { name: /The Elevator Pitch/i })).toBeInTheDocument();
    expect(screen.getByText('FIFA WORLD CUP 2026 HACKATHON')).toBeInTheDocument();
    expect(screen.getByText(/When 80,000 passionate fans flood a stadium/i)).toBeInTheDocument();
  });

  it('switches to Accessibility & Inclusivity slide', () => {
    render(<ProposalViewer theme="dark" />);
    
    const accessibilityButton = screen.getByRole('button', { name: /Accessibility & Inclusivity/i });
    fireEvent.click(accessibilityButton);
    
    expect(screen.getByRole('heading', { name: /Accessibility & Inclusivity/i })).toBeInTheDocument();
    expect(screen.getByText('EQUALITY & INCLUSIVITY')).toBeInTheDocument();
    expect(screen.getByText('Zero-Stair Routing Engine')).toBeInTheDocument();
  });
});
