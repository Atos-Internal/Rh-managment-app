import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from "./shared/pages/faq/faq.component";
import { NotFoundComponent } from "./shared/pages/not-found/not-found.component";
import { ROOT_PATH } from "./app-constants";

const appRoutes: Routes = [
  {
    path: ROOT_PATH,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'faq',
        component: FaqComponent
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
  {
    path: '**',
    redirectTo: `/${ROOT_PATH}/not-found`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
