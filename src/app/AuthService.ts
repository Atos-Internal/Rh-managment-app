import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  logoutAndRedirect(redirectUrl: string): void {
    this.keycloakService.logout({ redirectUri: redirectUrl });
  }
}
