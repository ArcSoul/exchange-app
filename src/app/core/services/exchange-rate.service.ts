import {Injectable} from '@angular/core';
import {RecordExchangeRateResponse} from "../models/RecordExchangeRateResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeExchangeRateResponse} from "../models/TypeExchangeRateResponse";
import {ExchangeModel} from "../models/ExchangeModel";
import {ExchangeRequestModel} from "../models/ExchangeRequestModel";
import {RecordExchangeRateRequest} from "../models/RecordExchangeRateRequest";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private apiUrl = 'http://localhost:8080/api/exchange-rate';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private getToken(): string | null {
    return this.authService.getToken();
  }

  // Metodo para agregar el token JWT en las cabeceras
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 1. Servicio para aplicar un tipo de cambio a un monto
  applyExchangeRate(request: ExchangeRequestModel): Observable<ExchangeModel> {
    return this.http.post<ExchangeModel>(`${this.apiUrl}/apply`, request, {headers: this.getAuthHeaders()});
  }

  // 2. Servicio para obtener los tipos de cambio disponibles
  getExchangeRates(): Observable<TypeExchangeRateResponse[]> {
    return this.http.get<TypeExchangeRateResponse[]>(this.apiUrl, {headers: this.getAuthHeaders()});
  }

  // 3. Servicio para obtener los registros históricos de conversión
  getExchangeRateRecords(request: RecordExchangeRateRequest): Observable<RecordExchangeRateResponse[]> {
    return this.http.post<RecordExchangeRateResponse[]>(`${this.apiUrl}/records`, request, {headers: this.getAuthHeaders()});
  }
}
