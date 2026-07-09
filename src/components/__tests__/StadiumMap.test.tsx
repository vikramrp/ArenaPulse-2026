import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StadiumMap from '../StadiumMap';

describe('StadiumMap Component', () => {
  const mockSectorStatuses = {
    NorthStand: 'critical' as const,
    SouthStand: 'normal' as const,
    WestStand: 'warning' as const,
    EastStand: 'normal' as const,
    SuitesLevel2: 'normal' as const,
    ConcourseLevel1: 'normal' as const,
    PlazaZone: 'normal' as const,
    PitchZone: 'normal' as const,
  };

  const defaultProps = {
    sectorStatuses: mockSectorStatuses,
    activeSectorId: 'NorthStand',
    onSelectSector: vi.fn(),
    isScanning: false,
  };

  it('renders SVG sectors correctly with accessible roles', () => {
    render(<StadiumMap {...defaultProps} />);
    
    // Check all interactive sectors have buttons
    const sectors = screen.getAllByRole('button');
    expect(sectors.length).toBeGreaterThanOrEqual(8);
  });

  it('correctly associates active sector visual state', () => {
    render(<StadiumMap {...defaultProps} />);
    
    const northStand = screen.getByLabelText(/North Stand/i);
    expect(northStand).toBeInTheDocument();
    expect(northStand.getAttribute('class')).toContain('stroke-2');
  });

  it('calls onSelectSector when a sector is clicked', () => {
    render(<StadiumMap {...defaultProps} />);
    
    const southStand = screen.getByLabelText(/South Stand/i);
    fireEvent.click(southStand);
    expect(defaultProps.onSelectSector).toHaveBeenCalledWith('SouthStand');
  });

  it('supports keyboard navigation via Enter and Space key presses', () => {
    render(<StadiumMap {...defaultProps} />);
    
    const eastStand = screen.getByLabelText(/East Stand/i);
    
    // Enter key
    fireEvent.keyDown(eastStand, { key: 'Enter', code: 'Enter' });
    expect(defaultProps.onSelectSector).toHaveBeenCalledWith('EastStand');

    // Space key
    fireEvent.keyDown(eastStand, { key: ' ', code: 'Space' });
    expect(defaultProps.onSelectSector).toHaveBeenCalledWith('EastStand');
  });
});
