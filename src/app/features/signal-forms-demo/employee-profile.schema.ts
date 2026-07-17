import { resource } from '@angular/core';
import {
  applyEach,
  applyWhen,
  debounce,
  disabled,
  email,
  hidden,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  readonly,
  required,
  schema,
  validate,
  validateAsync,
} from '@angular/forms/signals';

import { EmployeeProfile, TAKEN_USERNAMES } from './employee-profile.model';

export const employeeProfileSchema = schema<EmployeeProfile>((s) => {
  required(s.personal.firstName, { message: 'First name is required' });
  minLength(s.personal.firstName, 2, { message: 'At least 2 characters' });

  required(s.personal.lastName, { message: 'Last name is required' });
  minLength(s.personal.lastName, 2, { message: 'At least 2 characters' });

  required(s.personal.email, { message: 'Email is required' });
  email(s.personal.email, { message: 'Enter a valid email' });

  required(s.personal.username, { message: 'Username is required' });
  minLength(s.personal.username, 3, { message: 'At least 3 characters' });
  pattern(s.personal.username, /^[a-z0-9_]+$/, {
    message: 'Use lowercase letters, numbers, or underscore',
  });
  debounce(s.personal.username, 300);
  validateAsync(s.personal.username, {
    params: ({ value }) => value(),
    factory: (username) =>
      resource({
        params: username,
        loader: async ({ params: value }) => {
          await new Promise((resolve) => setTimeout(resolve, 200));
          return TAKEN_USERNAMES.has(value.toLowerCase());
        },
      }),
    onSuccess: (isTaken) =>
      isTaken ? { kind: 'taken', message: 'Username is already taken' } : undefined,
    onError: () => ({ kind: 'async', message: 'Could not check username' }),
  });

  maxLength(s.personal.bio, 240, { message: 'Bio must be 240 characters or fewer' });

  required(s.personal.age, { message: 'Age is required' });
  min(s.personal.age, 18, { message: 'Must be at least 18' });
  max(s.personal.age, 75, { message: 'Must be 75 or younger' });

  required(s.personal.birthDate, { message: 'Birth date is required' });
  validate(s.personal.birthDate, ({ value }) => {
    const raw = value();
    if (!raw) {
      return undefined;
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return { kind: 'invalidDate', message: 'Enter a valid date' };
    }
    if (date > new Date()) {
      return { kind: 'future', message: 'Birth date cannot be in the future' };
    }
    return undefined;
  });

  required(s.credentials.password, { message: 'Password is required' });
  minLength(s.credentials.password, 8, { message: 'At least 8 characters' });
  pattern(s.credentials.password, /(?=.*[A-Z])(?=.*\d)/, {
    message: 'Include an uppercase letter and a number',
  });

  required(s.credentials.confirmPassword, { message: 'Confirm your password' });
  validate(s.credentials.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(s.credentials.password)) {
      return { kind: 'mismatch', message: 'Passwords do not match' };
    }
    return undefined;
  });

  required(s.employment.department, { message: 'Department is required' });
  required(s.employment.level, { message: 'Level is required' });
  required(s.employment.startDate, { message: 'Start date is required' });
  validate(s.employment.startDate, ({ value }) => {
    const raw = value();
    if (!raw) {
      return undefined;
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return { kind: 'invalidDate', message: 'Enter a valid date' };
    }
    return undefined;
  });

  min(s.employment.salary, 30000, { message: 'Salary must be at least 30,000' });
  max(s.employment.salary, 400000, { message: 'Salary must be 400,000 or less' });

  minLength(s.employment.skills, 1, { message: 'Select at least one skill' });
  min(s.employment.satisfaction, 1, { message: 'Rate your satisfaction' });
  min(s.employment.focusScore, 0);
  max(s.employment.focusScore, 100);

  disabled(s.employment.salary, {
    when: ({ valueOf }) => valueOf(s.employment.level) === 'junior',
  });

  required(s.address.street, { message: 'Street is required' });
  required(s.address.city, { message: 'City is required' });
  required(s.address.country, { message: 'Country is required' });

  applyWhen(
    s.address.zip,
    ({ valueOf }) => valueOf(s.address.country) === 'US',
    (zip) => {
      required(zip, { message: 'ZIP is required for US addresses' });
      pattern(zip, /^\d{5}(-\d{4})?$/, { message: 'Use a valid US ZIP code' });
    },
  );

  applyEach(s.emergencyContacts, (contact) => {
    required(contact.name, { message: 'Contact name is required' });
    required(contact.phone, { message: 'Phone is required' });
    pattern(contact.phone, /^\+?[\d\s()-]{7,}$/, { message: 'Enter a valid phone number' });
    required(contact.relation, { message: 'Relation is required' });
  });

  readonly(s.preferences.theme);

  hidden(s.shipping, {
    when: ({ valueOf }) => valueOf(s.preferences.sameAsMailing),
  });

  applyWhen(
    s.shipping,
    ({ valueOf }) => !valueOf(s.preferences.sameAsMailing),
    (shipping) => {
      required(shipping.street, { message: 'Shipping street is required' });
      required(shipping.city, { message: 'Shipping city is required' });
    },
  );
});
