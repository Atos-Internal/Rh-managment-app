import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Subject, Subscription, take } from "rxjs";
//import { LoginComponent } from "../../../shared/components/login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { ExportComponent } from "../../components/export/export.component";
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

//import { ToastrService } from "ngx-toastr";
//import {EMPLOYEES} from "../../../app-constants";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  userRoles: string[] = [];  
  public employees: Employee[] = [];
 selectedEmployeeIds: string[] = [];
  private subscription: Subscription | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  showEmployeeId = false;
  public fromExportByList = false;
  public fromExport  = false;

  columnsVisibility = [
   //  { label: 'Identifiant', visible: false },
    // { label :}
    // { label: 'Select', visible: true },
    { label: 'DAS', visible: true },
    { label: 'CIN', visible: true },
    { label: 'Civilité', visible: true },
    { label: 'Prénom', visible: true },
    { label: 'Nom', visible: true },
    { label: 'Numéro CNSS', visible: true },
    { label: 'Type de contrat', visible: true },
    { label: 'Poste', visible: true },
    { label: 'Date d\'intégration', visible: true },
    { label: 'Date de sortie', visible: true },
    { label: 'Salaire mensuel brut', visible: true },
    { label: 'Numéro de compte bancaire', visible: true },
  ];
  selectedEmployees: any;
  
  getCellValue(employee: any, columnName: string): any {
    // Créez une correspondance entre les noms de colonnes en français et les propriétés en anglais
    const columnMappings: { [key: string]: any } = {
      // 'Select':'selected',
      'Identifiant': 'employeeId',
      'DAS': 'das',
      'CIN': 'cin',
      'Civilité': 'civility',
      'Prénom': 'firstName',
      'Nom': 'lastName',
      'Numéro CNSS': 'cnssNumber',
      'Type de contrat': 'typeContrat',
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
    private keycloakService: KeycloakService,
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
    this.userRoles = this.keycloakService.getUserRoles();
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
  onSelectionChange(event : any) {
    this.selectedEmployees = event.selected;
  }

  exportAttestations(){
   this.fromExportByList = true;
    this.selectedEmployeeIds = this.employees
    .filter(employee => employee.selected)
    .map(employee => employee.employeeId);
    


    const exportRef = this.dialog.open(ExportComponent, {
      width: '400px',
      /*height: '350px',*/
      autoFocus: false,
    
      data: { selectedEmployeeIds : this.selectedEmployeeIds,
        fromExportByList: this.selectedEmployeeIds  },
    });

    

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
