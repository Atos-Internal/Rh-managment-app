import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import {ROOT_PATH} from "../../../app-constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {

  }

  Login() {
    const LoginRef = this.dialog.open(LoginComponent, {
      width: '400px',
      /*height: '350px',*/
      autoFocus: false
    });
  }

  protected readonly ROOT_PATH = ROOT_PATH;
}
