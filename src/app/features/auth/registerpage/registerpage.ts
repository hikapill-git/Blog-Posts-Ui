import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { loginResponse, registerModel } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-registerpage',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registerpage.html',
  styleUrl: './registerpage.css',
})
export class Registerpage implements OnInit {
  regForm!: FormGroup;
  errorMessage: string = '';
  regModel: registerModel = { EmailId: '', FName: '', LName: '', Password: '' };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
  ) {}
  ngOnInit() {
    this.regForm = this.fb.group(
      {
        fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,25}$/)]],
        lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,25}$/)]],
        email: ['', [Validators.required, Validators.email]],
        //password: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }
  OnRegister() {
    //console.log(this.regForm.get('confirmPassword')?.errors);
    //console.log(this.regForm.value);
    if (!this.regForm.invalid) {
      this.regModel.FName = this.regForm.value.fname;
      this.regModel.LName = this.regForm.value.lname;
      this.regModel.EmailId = this.regForm.value.email;
      this.regModel.Password = this.regForm.value.confirmPassword;
      this.authService.register(this.regModel).subscribe({
        next: (res: loginResponse) => {
          console.log(res);
          this.errorMessage = ''; // clear error
          // 🔐 Save tokens & role

          this.tokenService.setToken(res.accessToken, res.refreshToken, res.role);

          // localStorage.setItem('accessToken', res.accessToken);
          // localStorage.setItem('refreshToken', res.refreshToken);
          // localStorage.setItem('role', res.role);

          //           const token = localStorage.getItem('accessToken');
          // const decoded = this.decodeToken(token!);

          // 🚀 Redirect to dashboard
          // if (res.role === 'Admin') {
          //   this.router.navigate(['/admin-dashboard']);
          // } else {
          this.router.navigate(['/dashboard']);
          // }
        },

        error: (err) => {
          //console.error('Login failed', err);
          //alert(err.error);
          if (err.error === 'Email already exists') {
            this.errorMessage =
              'This email is already registered. Please use another email or login.';
          } else {
            this.errorMessage = err.error;
          }
        },
      });
    }
  }
  // Custom password validator
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[@$!%*?&#]/.test(value);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !isValid ? { strongPassword: true } : null;
  }

  // Form-level validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
