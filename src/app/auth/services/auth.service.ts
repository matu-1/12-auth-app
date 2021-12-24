import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../constants/api.constant';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { TOKEN } from '../../constants/constants';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: User;

  constructor(private http: HttpClient) {}

  get user(): User {
    return this._user ? { ...this._user } : this.user;
  }

  login(user: any) {
    return this.http.post<AuthResponse>(API.AUTH.LOGIN, user).pipe(
      tap((res) => {
        AuthService.setToken(res.access_token);
        this._user = res.data;
      })
    );
  }

  register(user: any) {
    return this.http.post<AuthResponse>(API.AUTH.REGISTER, user).pipe(
      tap((res) => {
        AuthService.setToken(res.access_token);
        this._user = res.data;
      })
    );
  }

  validarToken() {
    // if (this._user) return of(true);
    const headers = {
      Authorization: `Bearer ${AuthService.getToken()}`,
    };
    return this.http.get<AuthResponse>(API.AUTH.RENEW, { headers }).pipe(
      tap((res) => {
        AuthService.setToken(res.access_token);
        this._user = res.data;
      }),
      map((_) => true),
      catchError((_) => of(false))
    );
  }

  logout() {
    localStorage.removeItem(TOKEN);
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static setToken(accessToken: string) {
    localStorage.setItem(TOKEN, accessToken);
  }
}
