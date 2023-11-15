import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from "./shared/pages/faq/faq.component";
import { NotFoundComponent } from "./shared/pages/not-found/not-found.component";
import { ROOT_PATH } from "./app-constants";
import { CreateEmployeeComponent } from './employees/components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employees/components/update-employee/update-employee.component';
import { EmployeeListComponent } from './employees/pages/employee-list/employee-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    //redirectTo: 'employees',
    pathMatch: 'full' 
  },
  {path: 'create-employee', component: CreateEmployeeComponent},


  {
    path: ROOT_PATH,
    children: [
      
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      

      {
        path: 'employees',
        // canActivateChild: [OffersAppAccessGuard, CcCandidateUserGuard],
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
        /*data: {
          autoLogin: true,
        },*/
      }
      
    ]
  },
  /* {
    path: '**',
    redirectTo: `/${ROOT_PATH}/not-found`
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
