import { Injectable } from '@angular/core';
import { EMPLOYEE_SERVICES_PATH } from 'src/app/app-constants';
import { ExportRequestDTO } from '../models/export-request-dto.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentExportService {

  private apiUrl = EMPLOYEE_SERVICES_PATH;

  constructor(private http: HttpClient) {}

  exportEmployee(employeeId: string, exportRequest: ExportRequestDTO): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream'
    });

    return this.http.post(`${this.apiUrl}/${employeeId}/export`, exportRequest, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  /* generateDocx(employeeId: number, exportRequestDTO: ExportRequestDTO): void {
    const url = `${this.apiUrl}/${employeeId}/export`;
    
    // Effectuez une requête HTTP pour générer et télécharger le DOCX
    this.http.post(url, exportRequestDTO, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      
      // Créez un lien de téléchargement et cliquez dessus
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attestation.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }); */
  }
