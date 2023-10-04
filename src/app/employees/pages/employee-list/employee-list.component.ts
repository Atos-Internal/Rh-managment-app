import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Subject, Subscription, take } from "rxjs";
import { LoginComponent } from "../../../shared/components/login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { ExportComponent } from "../../components/export/export.component";
import { EmployeesService } from "../../employees.service";
import { ToastrService } from "ngx-toastr";
import {EMPLOYEES} from "../../../app-constants";

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

  constructor(
    public dialog: MatDialog,
    private employeesService: EmployeesService,
    private toastr: ToastrService
  ) {
  }

  dtoptions: DataTables.Settings={};

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

    /*this.employeesService.getEmployeesList()
      .pipe(take(1))
      .subscribe({
        next: (employees) => this.employees = employees,
        error: (error) => this.toastr.error('Some error occurred while retrieving Employees', 'Error'),
      });*/


/*   ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  } */
  

  onExportEmployee(employeeId: string) {
    const exportRef = this.dialog.open(ExportComponent, {
      width: '400px',
      /*height: '350px',*/
      autoFocus: false,
      data: employeeId
    });
    // Appel à la méthode setEmployeeId du service pour définir la valeur de employeeId
    this.employeesService.setEmployeeId(employeeId);
  }
}
