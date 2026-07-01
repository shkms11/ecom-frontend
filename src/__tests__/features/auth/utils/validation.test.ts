import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateName,
  validatePhone,
  validateLoginForm,
  validateRegisterForm,
  validateForgotPasswordForm,
  validateResetPasswordForm,
  validateChangePasswordForm,
  sanitizeInput,
} from '../../../../features/auth/utils/validation';
import { ERROR_MESSAGES } from '../../../../features/auth/constants/auth.constants';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate a correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.EMAIL_REQUIRED);
    });

    it('should reject invalid email format', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_EMAIL);
    });

    it('should reject email without domain', () => {
      const result = validateEmail('test@');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate a strong password', () => {
      const result = validatePassword('StrongPass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty password', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(ERROR_MESSAGES.PASSWORD_REQUIRED);
    });

    it('should reject short password', () => {
      const result = validatePassword('Short1!');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should require uppercase letter', () => {
      const result = validatePassword('lowercase123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(ERROR_MESSAGES.PASSWORD_UPPERCASE);
    });

    it('should require lowercase letter', () => {
      const result = validatePassword('UPPERCASE123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(ERROR_MESSAGES.PASSWORD_LOWERCASE);
    });

    it('should require number', () => {
      const result = validatePassword('NoNumbers!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(ERROR_MESSAGES.PASSWORD_NUMBER);
    });

    it('should require special character', () => {
      const result = validatePassword('NoSpecial123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(ERROR_MESSAGES.PASSWORD_SPECIAL);
    });
  });

  describe('validatePasswordConfirmation', () => {
    it('should validate matching passwords', () => {
      const result = validatePasswordConfirmation('Password123!', 'Password123!');
      expect(result.isValid).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const result = validatePasswordConfirmation('Password123!', 'Different123!');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.PASSWORD_MISMATCH);
    });
  });

  describe('validateName', () => {
    it('should validate a correct name', () => {
      const result = validateName('John Doe');
      expect(result.isValid).toBe(true);
    });

    it('should reject empty name', () => {
      const result = validateName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.NAME_REQUIRED);
    });

    it('should reject name shorter than 2 characters', () => {
      const result = validateName('A');
      expect(result.isValid).toBe(false);
    });

    it('should reject name longer than 50 characters', () => {
      const result = validateName('A'.repeat(51));
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate a correct phone number', () => {
      const result = validatePhone('+1234567890');
      expect(result.isValid).toBe(true);
    });

    it('should accept empty phone (optional field)', () => {
      const result = validatePhone('');
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid phone format', () => {
      const result = validatePhone('invalid');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateLoginForm', () => {
    it('should validate correct login form', () => {
      const result = validateLoginForm('test@example.com', 'Password123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should reject form with invalid email', () => {
      const result = validateLoginForm('invalid-email', 'Password123!');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should reject form with empty password', () => {
      const result = validateLoginForm('test@example.com', '');
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBeDefined();
    });
  });

  describe('validateRegisterForm', () => {
    it('should validate correct register form', () => {
      const result = validateRegisterForm({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });
      expect(result.isValid).toBe(true);
    });

    it('should reject form with mismatched passwords', () => {
      const result = validateRegisterForm({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Different123!',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toBeDefined();
    });
  });

  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const result = sanitizeInput('<script>alert("xss")</script>');
      expect(result).not.toContain('<script>');
    });

    it('should remove javascript: protocol', () => {
      const result = sanitizeInput('javascript:alert("xss")');
      expect(result).not.toContain('javascript:');
    });

    it('should trim whitespace', () => {
      const result = sanitizeInput('  test  ');
      expect(result).toBe('test');
    });
  });
});

