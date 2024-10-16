import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthModel} from "../models/AuthModel";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = `${environment.apiUrl}/api/auth/sign-in`;
  private REGISTER_URL = `${environment.apiUrl}/api/auth/sign-up`;
  private FORGET_PASSWORD_URL = `${environment.apiUrl}/api/auth/forgot-password`;
  private RESET_PASSWORD_URL = `${environment.apiUrl}/api/auth/reset-password`;
  private name_token = "auth-token";
  private name_email = "auth-email";

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(correo: string, clave: string) {
    return this.httpClient.post<AuthModel>(this.LOGIN_URL, {correo, clave})
      .pipe(tap(response => {
        this.setToken(response.token)
        localStorage.setItem(this.name_email, response.correo)
      }))
  }

  sendEmail(correo: string) {
    return this.httpClient.post<{ resultado: boolean }>(this.FORGET_PASSWORD_URL, {correo})
      .pipe()
  }

  resetPassword(nueva_clave: string, token: string) {
    return this.httpClient.post<{ resultado: boolean }>(this.RESET_PASSWORD_URL, {nueva_clave, token})
      .pipe()
  }

  logout() {
    localStorage.removeItem(this.name_token)
  }

  private setToken(token: string): void {
    localStorage.setItem(this.name_token, token)
  }

  public getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.name_token)
    } else {
      return null;
    }
  }

  public getEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.name_email)
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  register(correo: string, clave: string) {
    return this.httpClient.post<AuthModel>(this.REGISTER_URL, {correo, clave})
      .pipe(tap(response => {
        this.setToken(response.token)
      }))
  }

}
