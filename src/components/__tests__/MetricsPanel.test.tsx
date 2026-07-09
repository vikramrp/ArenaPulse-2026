import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MetricsPanel from '../MetricsPanel';
import { LogEntry } from '../../types';

describe('MetricsPanel Component', () => {
  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '12:00:00 PM',
      moduleId: 'operations',
      moduleName: 'AI Operations Center',
      scenarioTitle: 'Power Interruption',
      status: 'warning',
      analysis: 'Backup generator activated.',
    },
  ];

  const defaultProps = {
    logs: mockLogs,
    onClearLogs: vi.fn(),
    carbonSaved: 120.5,
    averageWaitTime: 12,
    staffEfficiency: 85,
    emergencyResponseTime: 180,
    theme: 'dark' as const,
  };

  it('renders correctly with given telemetry stats', () => {
    render(<MetricsPanel {...defaultProps} />);
    
    expect(screen.getByText('120.5')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();
  });

  it('correctly reports Warning risk index when a warning log is present', () => {
    render(<MetricsPanel {...defaultProps} />);
    expect(screen.getByText('WARNING')).toBeInTheDocument();
  });

  it('correctly reports Stable status when there are no logs', () => {
    render(<MetricsPanel {...defaultProps} logs={[]} />);
    expect(screen.getByText('STABLE')).toBeInTheDocument();
  });

  it('triggers onClearLogs when Clear stream button is clicked', () => {
    render(<MetricsPanel {...defaultProps} />);
    const clearButton = screen.getByText('Clear stream');
    fireEvent.click(clearButton);
    expect(defaultProps.onClearLogs).toHaveBeenCalled();
  });
});
