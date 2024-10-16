import {Component} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  nueva_clave: string = ""
  token: string = ""
  message: string = ""
  error: string = ""

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  sendResetPassword() {
    this.message = ""
    this.error = ""
    this.authService.resetPassword(this.nueva_clave, this.token).subscribe({
      next: (response) => {
        if (response.resultado) {
          this.message = "Se reseteo el password"
        } else {
          this.error = "Se reseteo el password"
        }
      },
      error: (err) => {
        this.error = err.error.mensaje
      }
    })
  }
}
