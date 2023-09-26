import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from './components/node-details/node-details.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { ExportComponent } from "./components/export/export.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { EmployeesRoutingModule } from "./employees-routing.module";
import {MatSelectModule} from "@angular/material/select";
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NodeDetailsComponent,
    EmployeeListComponent,
    ExportComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    HttpClientModule,
    ProgressbarModule.forRoot(),
    MatGridListModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    DataTablesModule
  ]
})
export class EmployeesModule { }
