import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginModel, loginResponse } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
// import { loginModel, loginResponse } from '../../../../core/models/auth.model';
// import { AuthService } from '../../../../core/services/auth.service';
// import { Router } from '@angular/router';
// import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-loginpage',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class Loginpage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  logModel: loginModel = { EmailId: '', Password: '' };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/),
        ],
      ],
    });

    // throw new Error('Method not implemented.');
  }
  OnLogin() {
    if (!this.loginForm.invalid) {
      this.logModel.EmailId = this.loginForm.value.email;
      this.logModel.Password = this.loginForm.value.password;

      this.authService.login(this.logModel).subscribe({
        next: (res: loginResponse) => {
          this.errorMessage = ''; // clear error

          this.tokenService.setToken(res.accessToken, res.refreshToken, res.role);

          // 🚀 Redirect to dashboard
          //if (res.role === 'Admin') {
          //  this.router.navigate(['/admin-dashboard']);
          //} else {
          this.router.navigate(['/dashboard']);
          //}
        },
        error: (err) => {
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
}
