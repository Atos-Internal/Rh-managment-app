import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Subject, Subscription, take } from "rxjs";
//import { LoginComponent } from "../../../shared/components/login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { ExportComponent } from "../../components/export/export.component";
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';

//import { ToastrService } from "ngx-toastr";
//import {EMPLOYEES} from "../../../app-constants";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employees: Employee[] = [];
  private subscription: Subscription | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  showEmployeeId = false;

  columnsVisibility = [
    { label: 'Identifiant', visible: false },
    { label: 'DAS', visible: true },
    { label: 'CIN', visible: true },
    { label: 'Prénom', visible: true },
    { label: 'Nom', visible: true },
    { label: 'Numéro CNSS', visible: true },
    { label: 'Poste', visible: true },
    { label: 'Date d\'intégration', visible: true },
    { label: 'Date de sortie', visible: true },
    { label: 'Salaire mensuel brut', visible: true },
    { label: 'Numéro de compte bancaire', visible: true },
  ];
  
  getCellValue(employee: any, columnName: string): any {
    // Créez une correspondance entre les noms de colonnes en français et les propriétés en anglais
    const columnMappings: { [key: string]: string } = {
      'Identifiant': 'employeeId',
      'DAS': 'das',
      'CIN': 'cin',
      'Prénom': 'firstName',
      'Nom': 'lastName',
      'Numéro CNSS': 'cnssNumber',
      'Poste': 'position',
      'Date d\'intégration': 'integrationDate',
      'Date de sortie': 'releaseDate',
      'Salaire mensuel brut': 'grossMonthlySalary',
      'Numéro de compte bancaire': 'bankAccountNumber',
    };
  
    // Utilisez la correspondance pour obtenir la propriété correspondante
    const propertyName = columnMappings[columnName];
  
    // Vérifiez si la propriété existe avant de la récupérer
    if (propertyName && employee.hasOwnProperty(propertyName)) {
      return employee[propertyName];
    } else {
      return '';
    }
  }

  constructor(
    public dialog: MatDialog,
    private employeesService: EmployeesService,
    private router: Router
    // private toastr: ToastrService
  ) {
  }

  dtoptions: DataTables.Settings = {};

  ngOnInit() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }
    this.getEmployees();
    //this.employees = EMPLOYEES;

  }

  private getEmployees() {
    this.employeesService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.dtTrigger.next(null);
    })
  }

  updateEmployee(employeeId: string)
  {
    this.router.navigate(['atos/employees/update-employee',employeeId]);
  }


  onExportEmployee(employeeId: String, firstName: String, lastName: String) {
    const exportRef = this.dialog.open(ExportComponent, {
      width: '400px',
      /*height: '350px',*/
      autoFocus: false,
      data: { employeeId, firstName, lastName },
    });
  }
}
