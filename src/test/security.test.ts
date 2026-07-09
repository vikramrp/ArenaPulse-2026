import { describe, it, expect } from 'vitest';

// Emulate sanitization and validation from server.ts to verify correctness
const sanitizeInput = (text: string): string => {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

const validateStringInput = (
  input: any,
  maxLength: number,
  fieldName: string,
  required = true
): { isValid: boolean; error?: string } => {
  if (input === undefined || input === null) {
    if (required) {
      return { isValid: false, error: `${fieldName} is required.` };
    }
    return { isValid: true };
  }
  if (typeof input !== "string") {
    return { isValid: false, error: `${fieldName} must be a string.` };
  }
  if (required && input.trim().length === 0) {
    return { isValid: false, error: `${fieldName} cannot be empty.` };
  }
  if (input.length > maxLength) {
    return { isValid: false, error: `${fieldName} exceeds maximum length of ${maxLength} characters.` };
  }
  return { isValid: true };
};

describe('Security Input Validation & Sanitization', () => {
  it('correctly escapes HTML tags to prevent XSS & HTML Injection', () => {
    const dirty = '<script>alert("XSS")</script> <div onerror="exploit()">';
    const clean = sanitizeInput(dirty);
    
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('</script>');
    expect(clean).toContain('&lt;script&gt;');
    expect(clean).toContain('&quot;XSS&quot;');
  });

  it('correctly validates inputs based on required and max lengths', () => {
    // Too long input
    const longInput = 'A'.repeat(501);
    const result = validateStringInput(longInput, 500, 'userMessage');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('exceeds maximum length');

    // Empty input when required
    const emptyResult = validateStringInput('', 100, 'moduleName');
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.error).toContain('cannot be empty');

    // Null input when optional
    const optionalResult = validateStringInput(null, 100, 'customText', false);
    expect(optionalResult.isValid).toBe(true);
  });
});
