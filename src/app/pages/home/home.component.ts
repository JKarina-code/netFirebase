import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatToolbarModule, MatButtonModule],
})
export class HomeComponent {
  private _router = inject(Router);
  private authService = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/auth/login');
    } catch (error) {
      console.error(error);
    }
  }
}
