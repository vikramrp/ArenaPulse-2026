import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Speech API
if (typeof window !== 'undefined') {
  window.speechSynthesis = {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn().mockReturnValue([
      { name: 'Google US English', lang: 'en-US', default: true }
    ]),
  } as any;

  (window as any).SpeechSynthesisUtterance = vi.fn().mockImplementation(() => {
    return {
      lang: 'en-US',
      pitch: 1.0,
      rate: 1.0,
      text: '',
      voice: null,
      volume: 1.0,
      onstart: null,
      onend: null,
      onerror: null,
    };
  });
}
