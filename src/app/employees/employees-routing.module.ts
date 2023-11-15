import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from "./pages/employee-list/employee-list.component";
import { ROOT_PATH } from "../app-constants";
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    //redirectTo: `${ROOT_PATH}/employees`,
    pathMatch: 'full',
  },
/*   { 
    path: 'atos',
    children: [
      {
        path: 'employees',
        component: EmployeeListComponent
      },
      
    ]
  }, */
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: 'update-employee/:employeeId',component: UpdateEmployeeComponent},
 // { path: 'confirm-logout', component: ConfirmLogoutComponent },

  {
    path: '**',
    redirectTo: `/${ROOT_PATH}/not-found`
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeesRoutes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
