import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
//import { LoginComponent } from "../login/login.component";
//import {ROOT_PATH} from "../../../app-constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  constructor(
    private keycloakService: KeycloakService,
    
  ) {
  }

  ngOnInit() {

  }

  Login() {
    this.keycloakService.logout().then(() => {
      window.location.reload();
    });
  }
}
