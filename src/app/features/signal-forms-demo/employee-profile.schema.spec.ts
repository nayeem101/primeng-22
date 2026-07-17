import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';

import { createEmptyEmployeeProfile, EmployeeProfile } from './employee-profile.model';
import { employeeProfileSchema } from './employee-profile.schema';

function createTestForm(overrides: Partial<EmployeeProfile> = {}) {
  return TestBed.runInInjectionContext(() => {
    const model = signal({
      ...createEmptyEmployeeProfile(),
      ...overrides,
      personal: {
        ...createEmptyEmployeeProfile().personal,
        ...overrides.personal,
      },
      credentials: {
        ...createEmptyEmployeeProfile().credentials,
        ...overrides.credentials,
      },
      employment: {
        ...createEmptyEmployeeProfile().employment,
        ...overrides.employment,
      },
      address: {
        ...createEmptyEmployeeProfile().address,
        ...overrides.address,
      },
      preferences: {
        ...createEmptyEmployeeProfile().preferences,
        ...overrides.preferences,
      },
      shipping: {
        ...createEmptyEmployeeProfile().shipping,
        ...overrides.shipping,
      },
      emergencyContacts: overrides.emergencyContacts ?? [],
    });

    return { model, employeeForm: form(model, employeeProfileSchema) };
  });
}

describe('employeeProfileSchema', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should mark an empty profile invalid', () => {
    const { employeeForm } = createTestForm();
    expect(employeeForm().valid()).toBe(false);
    expect(employeeForm.personal.firstName().invalid()).toBe(true);
    expect(employeeForm.personal.email().invalid()).toBe(true);
  });

  it('should require a valid email', () => {
    const { employeeForm } = createTestForm({
      personal: {
        ...createEmptyEmployeeProfile().personal,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'not-an-email',
        username: 'ada',
        age: 30,
        birthDate: '1990-01-01',
      },
    });

    expect(employeeForm.personal.email().invalid()).toBe(true);
    expect(employeeForm.personal.email().errors().some((e) => e.kind === 'email')).toBe(true);
  });

  it('should enforce minimum age', () => {
    const { employeeForm } = createTestForm({
      personal: {
        ...createEmptyEmployeeProfile().personal,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        username: 'ada',
        age: 16,
        birthDate: '2010-01-01',
      },
    });

    expect(employeeForm.personal.age().invalid()).toBe(true);
    expect(employeeForm.personal.age().errors().some((e) => e.kind === 'min')).toBe(true);
  });

  it('should detect password mismatch', () => {
    const { employeeForm } = createTestForm({
      credentials: {
        password: 'Secret123',
        confirmPassword: 'Different123',
      },
    });

    expect(employeeForm.credentials.confirmPassword().invalid()).toBe(true);
    expect(
      employeeForm.credentials.confirmPassword().errors().some((e) => e.kind === 'mismatch'),
    ).toBe(true);
  });

  it('should require US ZIP only when country is US', () => {
    const usForm = createTestForm({
      address: {
        street: '1 Main',
        city: 'Austin',
        country: 'US',
        zip: '',
      },
    }).employeeForm;

    expect(usForm.address.zip().invalid()).toBe(true);

    const caForm = createTestForm({
      address: {
        street: '1 Main',
        city: 'Toronto',
        country: 'CA',
        zip: '',
      },
    }).employeeForm;

    expect(caForm.address.zip().errors().some((e) => e.kind === 'required')).toBe(false);
  });

  it('should hide shipping when sameAsMailing is true', () => {
    const { employeeForm } = createTestForm({
      preferences: {
        theme: 'aura',
        sameAsMailing: true,
      },
    });

    expect(employeeForm.shipping().hidden()).toBe(true);
  });

  it('should disable salary for junior level', () => {
    const { employeeForm } = createTestForm({
      employment: {
        ...createEmptyEmployeeProfile().employment,
        level: 'junior',
        salary: 50000,
      },
    });

    expect(employeeForm.employment.salary().disabled()).toBe(true);
  });

  it('should mark taken usernames invalid after async validation', async () => {
    const { employeeForm } = createTestForm({
      personal: {
        ...createEmptyEmployeeProfile().personal,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        username: 'admin',
        age: 30,
        birthDate: '1990-01-01',
      },
    });

    await vi.waitFor(
      () => {
        expect(employeeForm.personal.username().pending()).toBe(false);
        expect(employeeForm.personal.username().errors().some((e) => e.kind === 'taken')).toBe(true);
      },
      { timeout: 3000 },
    );
  });
});
