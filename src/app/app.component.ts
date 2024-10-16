import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, LoginComponent, SignupComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exchangeapp';
  protected readonly RouterOutlet = RouterOutlet;
  showHeader: boolean = false;

  constructor(private router: Router) {
    // Escucha cambios en la ruta
    this.router.events.subscribe(() => {
      this.updateHeaderVisibility();
    });
  }

  updateHeaderVisibility() {
    // Mostrar header solo en la ruta 'home'
    this.showHeader = this.router.url === '/home';
  }
}
