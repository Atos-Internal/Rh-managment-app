import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { EMPLOYEE_SERVICES_PATH } from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employeeIdSubject = new BehaviorSubject<string>(''); // Initialisez la valeur par défaut ici
  public employeeId$: Observable<string> = this.employeeIdSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  exportEmployee(employeeId: String, employeeDTO: any): Observable<any> {
    const url = `${EMPLOYEE_SERVICES_PATH}/${employeeId}/export`;
    return this.http.post(url, employeeDTO, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }


  exportEmployees2(documentType: string, employeeDTO: any): Observable<any> {
    //const endpoint = `/${documentType}/export`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // const body = {
    //   UUIDs: UUIDs
    // };
    const url = `${EMPLOYEE_SERVICES_PATH}/export/${documentType}`;
    return this.http.post(
      url,
      employeeDTO,
      { responseType: 'arraybuffer',
      observe: 'response' }
    );
  }
  
  exportEmployees(employeeDTO: any, DocumentType: string): Observable<any> {
    const url = `${EMPLOYEE_SERVICES_PATH}/export/${DocumentType}`;
    // const body = {
    //   UUIDs: UUIDs
    // };
    return this.http.post(url, employeeDTO, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }

  getEmployeesList(): Observable<any> {
    const url = `${EMPLOYEE_SERVICES_PATH}/list`;
    return this.http.get<any>(url);
  }


  // setEmployeeId(employeeId: string): void {
  //   this.employeeIdSubject.next(employeeId);
  // }

}
