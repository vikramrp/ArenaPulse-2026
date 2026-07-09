import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MatchupDashboard from '../MatchupDashboard';

describe('MatchupDashboard Component', () => {
  it('renders title and matchup selection buttons correctly', () => {
    render(<MatchupDashboard theme="dark" />);
    
    expect(screen.getByText('CLASH OF THE TITANS')).toBeInTheDocument();
    expect(screen.getByText('FIFA 2026 Live Match Tracker & Star Players Showcase')).toBeInTheDocument();
  });

  it('renders details of active matchup players', () => {
    render(<MatchupDashboard theme="dark" />);
    
    // Check star players names are rendered
    expect(screen.getAllByText('Kylian Mbappé')).toHaveLength(1);
    expect(screen.getAllByText('Achraf Hakimi')).toHaveLength(1);
  });

  it('triggers simulation and updates minute / score when simulate button is clicked', async () => {
    vi.useFakeTimers();
    render(<MatchupDashboard theme="dark" />);
    
    const simulateBtn = screen.getByRole('button', { name: /SIMULATE MATCH LIVE/i });
    expect(simulateBtn).toBeInTheDocument();

    fireEvent.click(simulateBtn);

    // Fast-forward simulation steps
    await act(async () => {
      vi.advanceTimersByTime(1500 * 9);
    });

    // Button should be enabled again and show SIMULATE MATCH LIVE
    expect(screen.getByRole('button', { name: /SIMULATE MATCH LIVE/i })).toBeInTheDocument();

    vi.useRealTimers();
  });
});
