import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentCategory } from '../models/documentCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentCategoryService {

  private apiUrl = 'http://localhost:8080/api/v1/document-management-services/document/categories'; 

  constructor(private http: HttpClient) { }
 
  getDocumentCategories() : Observable<DocumentCategory[]> {
    return this.http.get<DocumentCategory[]>(`${this.apiUrl}/list`);
  }
}
