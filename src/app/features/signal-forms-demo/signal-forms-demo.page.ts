import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, submit } from '@angular/forms/signals';
import { ArrowLeft } from '@primeicons/angular/arrow-left';
import { Briefcase } from '@primeicons/angular/briefcase';
import { Check } from '@primeicons/angular/check';
import { Cog } from '@primeicons/angular/cog';
import { FileCheck } from '@primeicons/angular/file-check';
import { FileEdit } from '@primeicons/angular/file-edit';
import { Lock } from '@primeicons/angular/lock';
import { MapMarker } from '@primeicons/angular/map-marker';
import { Plus } from '@primeicons/angular/plus';
import { Spinner } from '@primeicons/angular/spinner';
import { Trash } from '@primeicons/angular/trash';
import { User } from '@primeicons/angular/user';
import { Users } from '@primeicons/angular/users';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { Divider } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { MultiSelect } from 'primeng/multiselect';
import { Rating } from 'primeng/rating';
import { SelectButton } from 'primeng/selectbutton';
import { Slider } from 'primeng/slider';
import { Textarea } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { IsoDateField } from './controls/iso-date-field';
import { PasswordField } from './controls/password-field';
import { SelectField } from './controls/select-field';
import {
  COUNTRY_OPTIONS,
  createEmptyEmergencyContact,
  createEmptyEmployeeProfile,
  DEPARTMENT_OPTIONS,
  LEVEL_OPTIONS,
  RELATION_OPTIONS,
  SKILL_OPTIONS,
} from './employee-profile.model';
import { employeeProfileSchema } from './employee-profile.schema';
import { FieldErrors } from './field-errors';

@Component({
  selector: 'app-signal-forms-demo-page',
  imports: [
    RouterLink,
    FormField,
    ButtonDirective,
    Card,
    Checkbox,
    Divider,
    FloatLabel,
    InputNumber,
    InputText,
    Message,
    MultiSelect,
    Rating,
    SelectButton,
    Slider,
    Textarea,
    Toast,
    ToggleSwitch,
    IsoDateField,
    PasswordField,
    SelectField,
    FieldErrors,
    ArrowLeft,
    Briefcase,
    Check,
    Cog,
    FileCheck,
    FileEdit,
    Lock,
    MapMarker,
    Plus,
    Spinner,
    Trash,
    User,
    Users,
  ],
  providers: [MessageService],
  templateUrl: './signal-forms-demo.page.html',
  styleUrl: './signal-forms-demo.page.css',
})
export class SignalFormsDemoPage {
  private readonly messages = inject(MessageService);

  protected readonly departmentOptions = DEPARTMENT_OPTIONS;
  protected readonly levelOptions = LEVEL_OPTIONS;
  protected readonly skillOptions = SKILL_OPTIONS;
  protected readonly countryOptions = COUNTRY_OPTIONS;
  protected readonly relationOptions = RELATION_OPTIONS;

  protected readonly submittedPayload = signal('');

  protected readonly model = signal(createEmptyEmployeeProfile());
  protected readonly employeeForm = form(this.model, employeeProfileSchema);

  protected addEmergencyContact(): void {
    this.model.update((current) => ({
      ...current,
      emergencyContacts: [...current.emergencyContacts, createEmptyEmergencyContact()],
    }));
  }

  protected removeEmergencyContact(index: number): void {
    this.model.update((current) => ({
      ...current,
      emergencyContacts: current.emergencyContacts.filter((_, i) => i !== index),
    }));
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.employeeForm, async () => {
      this.submittedPayload.set(JSON.stringify(this.model(), null, 2));
      this.messages.add({
        severity: 'success',
        summary: 'Profile saved',
        detail: 'Signal Forms submit() ran with a valid model.',
        life: 3500,
      });
    });
  }
}
