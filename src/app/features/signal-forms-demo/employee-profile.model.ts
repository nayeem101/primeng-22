export type EmploymentLevel = 'junior' | 'mid' | 'senior' | '';

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface EmployeeProfile {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    bio: string;
    age: number;
    birthDate: string;
  };
  credentials: {
    password: string;
    confirmPassword: string;
  };
  employment: {
    department: string;
    level: EmploymentLevel;
    startDate: string;
    salary: number;
    remoteFriendly: boolean;
    newsletter: boolean;
    skills: string[];
    satisfaction: number;
    focusScore: number;
  };
  address: {
    street: string;
    city: string;
    country: string;
    zip: string;
  };
  emergencyContacts: EmergencyContact[];
  preferences: {
    theme: string;
    sameAsMailing: boolean;
  };
  shipping: {
    street: string;
    city: string;
  };
}

export function createEmptyEmergencyContact(): EmergencyContact {
  return {
    name: '',
    phone: '',
    relation: '',
  };
}

export function createEmptyEmployeeProfile(): EmployeeProfile {
  return {
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      bio: '',
      age: 0,
      birthDate: '',
    },
    credentials: {
      password: '',
      confirmPassword: '',
    },
    employment: {
      department: '',
      level: '',
      startDate: '',
      salary: 0,
      remoteFriendly: false,
      newsletter: false,
      skills: [],
      satisfaction: 0,
      focusScore: 50,
    },
    address: {
      street: '',
      city: '',
      country: '',
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

/** Usernames treated as unavailable by the demo async validator. */
export const TAKEN_USERNAMES = new Set(['admin', 'root', 'taken']);

export const DEPARTMENT_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Product', value: 'product' },
  { label: 'People Ops', value: 'people' },
];

export const LEVEL_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid', value: 'mid' },
  { label: 'Senior', value: 'senior' },
];

export const SKILL_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Angular', value: 'angular' },
  { label: 'PrimeNG', value: 'primeng' },
  { label: 'RxJS', value: 'rxjs' },
  { label: 'Testing', value: 'testing' },
];

export const COUNTRY_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Germany', value: 'DE' },
];

export const RELATION_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Spouse', value: 'spouse' },
  { label: 'Parent', value: 'parent' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Friend', value: 'friend' },
];
