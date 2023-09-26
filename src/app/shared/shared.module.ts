import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './pages/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from "@angular/material/grid-list";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      FaqComponent,
      LoginComponent,
      NotFoundComponent,
    ],
    exports: [
      BrowserAnimationsModule,
      HeaderComponent,
      FooterComponent
    ],
  imports: [
    CommonModule,
    RouterLink,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class SharedModule { }
