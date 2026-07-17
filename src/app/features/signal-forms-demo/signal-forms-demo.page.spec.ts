import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import {
  createEmptyEmployeeProfile,
  EmployeeProfile,
} from './employee-profile.model';
import { SignalFormsDemoPage } from './signal-forms-demo.page';

function validProfile(): EmployeeProfile {
  return {
    ...createEmptyEmployeeProfile(),
    personal: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      username: 'ada_dev',
      bio: 'Mathematician',
      age: 36,
      birthDate: '1988-12-10',
    },
    credentials: {
      password: 'Secret123',
      confirmPassword: 'Secret123',
    },
    employment: {
      department: 'engineering',
      level: 'senior',
      startDate: '2026-08-01',
      salary: 120000,
      remoteFriendly: true,
      newsletter: true,
      skills: ['angular', 'typescript'],
      satisfaction: 4,
      focusScore: 80,
    },
    address: {
      street: '1 Analytical Engine Way',
      city: 'London',
      country: 'GB',
      zip: '',
    },
    emergencyContacts: [],
    preferences: {
      theme: 'aura',
      sameAsMailing: true,
    },
    shipping: {
      street: '',
      city: '',
    },
  };
}

describe('SignalFormsDemoPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsDemoPage],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();
  });

  it('should create the page', async () => {
    const fixture = TestBed.createComponent(SignalFormsDemoPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="signal-forms-demo"]')).toBeTruthy();
  });

  it('should keep submit from saving when the form is invalid', async () => {
    const fixture = TestBed.createComponent(SignalFormsDemoPage);
    const page = fixture.componentInstance;
    await fixture.whenStable();

    const form = fixture.nativeElement.querySelector('[data-testid="employee-form"]') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    expect(page['submittedPayload']()).toBe('');
    expect(page['employeeForm']().valid()).toBe(false);
  });

  it('should submit a valid profile and expose the payload', async () => {
    const fixture = TestBed.createComponent(SignalFormsDemoPage);
    const page = fixture.componentInstance;
    page['model'].set(validProfile());
    await fixture.whenStable();

    // Wait for async username validation to settle.
    await vi.waitFor(() => expect(page['employeeForm']().pending()).toBe(false), {
      timeout: 3000,
    });

    expect(page['employeeForm']().valid()).toBe(true);

    const form = fixture.nativeElement.querySelector('[data-testid="employee-form"]') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    expect(page['submittedPayload']()).toContain('ada@example.com');
    expect(fixture.nativeElement.querySelector('[data-testid="submitted-payload"]')?.textContent).toContain(
      'Ada',
    );
  });

  it('should add and remove emergency contacts via the model', async () => {
    const fixture = TestBed.createComponent(SignalFormsDemoPage);
    const page = fixture.componentInstance;
    await fixture.whenStable();

    const addButton = fixture.nativeElement.querySelector(
      '[data-testid="add-contact"]',
    ) as HTMLButtonElement;
    addButton.click();
    await fixture.whenStable();
    expect(page['model']().emergencyContacts.length).toBe(1);
    expect(fixture.nativeElement.querySelector('[data-testid="contact-0"]')).toBeTruthy();

    const removeButton = fixture.nativeElement.querySelector(
      '[data-testid="remove-contact-0"]',
    ) as HTMLButtonElement;
    removeButton.click();
    await fixture.whenStable();
    expect(page['model']().emergencyContacts.length).toBe(0);
  });
});
