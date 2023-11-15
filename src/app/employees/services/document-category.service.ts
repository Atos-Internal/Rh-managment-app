import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentCategory } from '../models/documentCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentCategoryService {

  private apiUrl = 'http://localhost:8082/api/v1/document-management-services/document/categories'; 

  constructor(private http: HttpClient) { }
 
  getDocumentCategories() : Observable<DocumentCategory[]> {
    return this.http.get<DocumentCategory[]>(`${this.apiUrl}/list`);
  }
  getDocumentTypesByCategory(categoryId: number){

    return this.http.get<any[]>(`${this.apiUrl}/${categoryId}/types/list`);
  }
}
