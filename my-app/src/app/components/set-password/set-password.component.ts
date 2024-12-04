import { Component, inject, signal, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'set-password',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {
  private fb = inject(FormBuilder);

  @Input() formGroup!: FormGroup;

  readonly PASSWORD_MIN_LENGTH = 8;
  readonly PASSWORD_MIN_UPPER = 1;
  readonly PASSWORD_MIN_LOWER = 1;
  readonly PASSWORD_MIN_NUMBER = 1;
  readonly PASSWORD_MIN_SYMBOL = 1;

  isPasswordVisible = signal(false);
  isConfirmPasswordVisible = signal(false);
  togglePasswordVisibility(event: MouseEvent) {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    event.stopPropagation();
  }
  toggleConfirmPasswordVisibility(event: MouseEvent) {
    this.isConfirmPasswordVisible.set(!this.isConfirmPasswordVisible());
    event.stopPropagation();
  }
  
  clearPasswordField() {
    this.password?.setValue('');
  }
  clearConfirmPasswordField() {
    this.confirmPassword?.setValue('');
  }
  resetConfirmPasswordField() {
    this.confirmPassword?.reset();
  }
  markConfirmPasswordUntouched() {
    this.confirmPassword?.markAsUntouched();
  }
  markConfirmPasswordUntouchedIfPasswordInvalid() {
    if (!this.password?.valid) {
      this.markConfirmPasswordUntouched();
    }
  }

  constructor() {}

  ngOnInit() {
    console.log("formGroup:", this.formGroup);
    if (this.formGroup) {
      this.formGroup.addControl('password', this.fb.control('', [Validators.required,
        this.isLongEnoughValidator,
        this.hasUppercaseValidator,
        this.hasLowercaseValidator,
        this.hasNumberValidator,
        this.hasSymbolValidator,]));
      this.formGroup.addControl('confirmPassword', this.fb.control('', [Validators.required, this.passwordsMatchValidator]))
    }
  }

  get password() {
    return this.formGroup.get('password');
  }
  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  private isLongEnoughValidator = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const value = control.value;
    return value != null && value.length >= this.PASSWORD_MIN_LENGTH
      ? null
      : { notLongEnough: true };
  };
  private hasUppercaseValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    return /[A-Z]/.test(value) ? null : { noUppercase: true };
  }
  private hasLowercaseValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    return /[a-z]/.test(value) ? null : { noLowercase: true };
  }
  private hasNumberValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    return /\d/.test(value) ? null : { noNumber: true };
  }
  private hasSymbolValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    return /[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : { noSymbol: true };
  }
  private passwordsMatchValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.invalid || password?.value == confirmPassword?.value
      ? null
      : { passwordsDontMatch: true };
  }
  
}
