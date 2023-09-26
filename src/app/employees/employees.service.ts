import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EMPLOYEE_SERVICES_PATH } from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  exportEmployee(employeeId: String, employeeDTO: any): Observable<any> {
    const url = `${EMPLOYEE_SERVICES_PATH}/employees/${employeeId}/export`;
    return this.http.post<any>(url, employeeDTO);
  }

  getEmployeesList(): Observable<any> {
    const url = `${EMPLOYEE_SERVICES_PATH}/employees/list`;
    return this.http.get<any>(url);
  }
}
