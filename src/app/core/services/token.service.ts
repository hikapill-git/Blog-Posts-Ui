import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
('jwt-decode');

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl =
    'https://blog-platform-fydbc3fmdaffbggk.centralindia-01.azurewebsites.net/api/auth/';

  //private apiUrl = 'http://localhost:5017/api/auth';
  /**
   *
   */
  userId: number = 0;
  constructor(private http: HttpClient) {}
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setToken(token: string, refreshToken: string, role: string) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role', role);
    const decoded: any = jwtDecode(token);
    this.userSubject.next(decoded);
  }

  loadUserFromStorage() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userSubject.next(decoded);
    }
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  getRefreshToken() {
    const token = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.apiUrl}/refresh`, { token }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('role', res.role);
      }),
    );
  }
  getUserId(): number | 0 {
    this.user$.subscribe((user) => {
      if (user) {
        // console.log(user);
        this.userId = user?.Id || null;
      }
    });
    return this.userId;
  }
  getRole() {
    return localStorage.getItem('role');
  }
  //   private userSubject = new BehaviorSubject<any>(null);
  //   user$ = this.userSubject.asObservable();

  //   getDecodedToken() {
  //     const token = localStorage.getItem('accessToken');

  //     //const token = localStorage.getItem('accessToken');

  //     if (!token || token.trim() === '') {
  //       console.error('No token found');
  //       return null;
  //     }

  //     try {
  //       const decoded: any = jwtDecode(token);
  //       return this.userSubject.next(decoded);
  //     } catch (error) {
  //       console.error('Token decoding failed:', error);
  //       return null;
  //     }
  //   }

  //   getUserRole(): string | null {
  //     // const decoded: any = this.getDecodedToken();
  //     // return decoded?.UserRole || null;

  //     this.user$.subscribe((user) => {
  //       if (user) {
  //         return user?.UserRole || null;
  //       }
  //     });
  //   }
  //   getUserEmail(): string | null {
  //     const decoded: any = this.getDecodedToken();
  //     return decoded?.UserEmail || null;
  //   }
  //   getUserId(): string | null {
  //     const decoded: any = this.getDecodedToken();
  //     return decoded?.Id || null;
  //   }

  //   isTokenExpired(): boolean {
  //     const decoded: any = this.getDecodedToken();
  //     if (!decoded?.exp) return true;

  //     const expiry = decoded.exp * 1000;
  //     return Date.now() > expiry;
  //   }
  //   getFullName(): string {
  //     const decoded: any = this.getDecodedToken();
  //     alert(decoded?.FullName);
  //     return decoded?.FullName || null;
  //   }
}
