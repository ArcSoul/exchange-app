import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FontAwesomeModule
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
  faCaretDown = faCaretDown;
  @Input() options: string[] = [];
  @Input() titulo: string = "";
  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string | null = null;
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.selectionChange.emit(option);
  }
}
