import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../layouts/header/header.component";
import {Chart, registerables} from "chart.js";
import {CustomSelectComponent} from "../../components/custom-select/custom-select.component";
import {CustomTableComponent} from "../../components/custom-table/custom-table.component";
import {ExchangeRateService} from "../../core/services/exchange-rate.service";
import {RecordExchangeRateResponse} from "../../core/models/RecordExchangeRateResponse";
import {RecordExchangeRateRequest} from "../../core/models/RecordExchangeRateRequest";
import {ExchangeRequestModel} from "../../core/models/ExchangeRequestModel";
import {FormsModule} from "@angular/forms";
import {ExchangeModel} from "../../core/models/ExchangeModel";
import {AuthService} from "../../core/services/auth.service";

Chart.register(...registerables)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CustomSelectComponent,
    CustomTableComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private exchangeRateService: ExchangeRateService, private authService: AuthService) {
  }

  public config: any = {
    type: 'line',
    data: {
      labels: [], // Etiquetas vacías, se actualizarán dinámicamente
      datasets: [{
        label: 'Historial de Conversión',
        data: [], // Datos vacíos, se actualizarán dinámicamente
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Historial de Conversión de Divisas'
        }
      }
    }
  };

  // Datos del historial de tipo de cambio
  public data: RecordExchangeRateResponse[] = []
  chart: any;
  options: string[] = [];

  // Monedas seleccionadas
  selectedMount: number = 0;
  selectedOriginCurrency: string = '';
  selectedDestinationCurrency: string = '';

  // Capturar la divisa de origen seleccionada
  onOriginCurrencyChange(selectedCurrency: string): void {
    this.selectedOriginCurrency = selectedCurrency;
  }

  // Capturar la divisa de destino seleccionada
  onDestinationCurrencyChange(selectedCurrency: string): void {
    this.selectedDestinationCurrency = selectedCurrency;
  }

  applyExchange(): void {
    if (this.selectedOriginCurrency && this.selectedDestinationCurrency && this.selectedMount) {
      let request: ExchangeRequestModel = {
        monto: this.selectedMount,  // Aquí puedes solicitar el monto dinámicamente
        moneda_origen: this.selectedOriginCurrency,
        moneda_destino: this.selectedDestinationCurrency
      };

      // Llamada al servicio para obtener la conversión
      this.exchangeRateService.applyExchangeRate(request).subscribe(result => {
        this.data.push({...result, fecha: new Date()});
        // Actualizamos el gráfico con el resultado de la conversión
        this.updateChartWithResult(result);
      });
    } else {
      console.error('Seleccione las divisas de origen y destino.');
    }
  }

  // Función para actualizar el gráfico con el historial de conversiones
  updateChartData(exchangeRates: RecordExchangeRateResponse[]): void {
    // Actualizamos las etiquetas y los datos del gráfico
    this.chart.data.labels = exchangeRates.map(item => new Date(item.fecha).toLocaleDateString('es', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })); // Usamos las fechas como etiquetas
    this.chart.data.datasets[0].data = exchangeRates.map(item => item.monto_con_tipo_de_cambio); // Los montos convertidos como datos
    this.chart.update(); // Actualizamos el gráfico
  }

  // Función para actualizar el gráfico con el resultado de la conversión
  updateChartWithResult(result: ExchangeModel): void {
    // Agregar el nuevo resultado al gráfico
    const now = new Date().toLocaleDateString('es', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }); // Fecha actual como etiqueta
    this.chart.data.labels.push(now); // Agregar la fecha actual a las etiquetas
    this.chart.data.datasets[0].data.push(result.monto_con_tipo_de_cambio); // Agregar el monto convertido a los datos
    this.chart.update(); // Actualizamos el gráfico
  }

  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config)

    let requestExchangeRecords: RecordExchangeRateRequest = {
      correo: this.authService.getEmail() || ''
    }

    // Obteniendo el historial
    this.exchangeRateService.getExchangeRateRecords(requestExchangeRecords).subscribe(exchangeRates => {
      this.data = exchangeRates;

      this.updateChartData(exchangeRates);
    });

    this.exchangeRateService.getExchangeRates().subscribe(exchangeRates => {
      this.options = exchangeRates.map(data => data.codigo);
    })
  }
}
