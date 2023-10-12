import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  employee: Employee = new Employee();
  constructor(private employeesService: EmployeesService,private router: Router) {}

  saveEmployee()
  {
    this.employeesService.createEmployee(this.employee).subscribe(data =>{
    console.log(data);
    this.goToEmployeeList();
    },
    error => console.log(error));
    
  }

  goToEmployeeList(){
    this.router.navigate(['/atos/employees']);
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }
}
