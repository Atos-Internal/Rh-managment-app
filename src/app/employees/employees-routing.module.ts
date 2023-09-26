import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from "./pages/employee-list/employee-list.component";
import { ROOT_PATH } from "../app-constants";

const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    /*children: [
      {
        path: 'employees',
        component: EmployeesListComponent
      },
    ]*/
  },
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
