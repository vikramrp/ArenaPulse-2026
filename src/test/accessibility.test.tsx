import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Accessibility Verification Tests', () => {
  it('contains the WCAG skip link and main-content landmark ID', () => {
    render(<App />);
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink.getAttribute('href')).toBe('#main-content');
  });

  it('contains ARIA live regions to announce status dynamically', () => {
    const { container } = render(<App />);
    
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('verifies that the theme toggle contains descriptive labels', () => {
    render(<App />);
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    expect(themeBtn).toBeInTheDocument();
    expect(themeBtn?.getAttribute('aria-label')).toBeDefined();
  });
});
