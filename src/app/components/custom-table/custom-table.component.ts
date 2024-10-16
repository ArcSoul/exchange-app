import {Component, Input} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {RecordExchangeRateResponse} from "../../core/models/RecordExchangeRateResponse";

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
  @Input() data: RecordExchangeRateResponse[] = []
}
