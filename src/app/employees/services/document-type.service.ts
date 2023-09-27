import { Injectable } from '@angular/core';
import { DocumentType } from '../models/documentType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  private apiUrl = 'http://localhost:8080/api/v1/document-management-services/document/types'; 

  constructor(private http: HttpClient) { }
 
  getDocumentTypes() : Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.apiUrl}/list`);
  }
}
