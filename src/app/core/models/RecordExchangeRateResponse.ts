export interface RecordExchangeRateResponse {
  monto: number;
  monto_con_tipo_de_cambio: number;
  moneda_origen: string;
  moneda_destino: string;
  tipo_de_cambio: number;
  fecha: Date;
}
