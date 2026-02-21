import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel, refreshModel, registerModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl =
  //   'https://blog-platform-fydbc3fmdaffbggk.centralindia-01.azurewebsites.net/api/auth/';
  private apiUrl = 'http://localhost:5017/api/auth/';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(login: loginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, login);
  }
  register(reg: registerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, reg);
  }
  refreshToken(ref: refreshModel): Observable<any> {
    return this.http.post(`${this.apiUrl}refresh`, ref);
  }
  private loggedIn = false;
  isLoggedIn(): boolean {
    let val = false;
    this.tokenService.user$.subscribe({
      next: (data) => {
        if (data) {
          val = true;
        }
      },
    });
    return val;
  }
}
