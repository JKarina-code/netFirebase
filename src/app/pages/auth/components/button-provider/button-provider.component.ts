import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
export type Provider = 'google' | 'github';
@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  selector: 'app-button-provider',
  templateUrl: './button-provider.component.html',
  styleUrls: ['./button-provider.component.css'],
})
export class ButtonProvider {
  @Input() isLogin = false;

  private AuthService = inject(AuthService);
  private router = inject(Router);

  //Action Google or Github

  providerAction(provider: Provider): void {
    if (provider === 'google') {
      this.googleLogin();
    } else {
      this.githubLogin();
    }
  }
  async googleLogin(): Promise<void> {
    try {
      const result = await this.AuthService.signInWithGoogleProvider();
      console.log(result);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }

  async githubLogin() {


    try {
      const result = await this.AuthService.signInWithGithubProvider();
      console.log(result);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }
}
