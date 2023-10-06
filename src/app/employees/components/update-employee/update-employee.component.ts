import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId : string ;
  employee: Employee = new Employee();
  
  constructor(private employeesService : EmployeesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.employeeId = "";
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.employeesService.getEmployeeById(this.employeeId).subscribe(data => {
      this.employee = data;
    } , error => console.log(error));
  }
  
  onSubmit() {
    this.employeesService.updateEmployee(this.employeeId, this.employee).subscribe(data => {
      this.goToEmployeeList();
    }, error => console.log(error))
    }
  
    goToEmployeeList(){
      this.router.navigate(['/atos/employees']);
    }
}
