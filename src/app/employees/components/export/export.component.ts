import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription, take } from "rxjs";
import { DocumentCategory } from '../../models/documentCategory';
import { DocumentCategoryService } from '../../services/document-category.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentType } from '../../models/documentType';
import { ExportRequestDTO } from '../../models/export-request-dto.model';
import { DocumentExportService } from '../../services/document-export.service';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  form: FormGroup | undefined;
  submitted: boolean = false;

  selectedCategoryId: number = 0;
  documentCategories: DocumentCategory[] = [];
  selectedDocumentType: string = "";
  documentTypes: DocumentType[] = [];
  employeeId: string ="";

  /*   documentCategories: any[] = [
      { categoryId: 1, name: 'Document Admin Divers' }
    ];
  
    documentTypes: any[] = [
      { typesId: 1, name: 'Attestation de Travail', value: 'ATTESTATION_TRAVAIL' },
      { typesId: 2, name: 'Attestation de Salaire', value: 'ATTESTATION_SALAIRE' },
      { typesId: 3, name: 'Certificat de Travail', value: 'CERTIF_TRAVAIL' }
    ]; */

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedNode: Node,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private documentCategoryService: DocumentCategoryService,
    private documentTypesService: DocumentTypeService,
    private documentExportService: DocumentExportService,
    private employeesService: EmployeesService
    
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getDocumentCategories();
    this.employeesService.employeeId$.subscribe((employeeId) => {
      this.employeeId = employeeId;
    });
    //this.getDocumentTypes();
    
}

  initForm() {
    this.form = this.fb.group({
      //documentType: [''],
    });

  }

  getDocumentCategories(): void {
    this.documentCategoryService.getDocumentCategories().subscribe((documentCategories) => {
      this.documentCategories = documentCategories;
      
    });
  }

  onCategorySelected(event: any) : void  {
     // event.value sert a récupérer l'ID de la catégorie sélectionnée
   this.selectedCategoryId = event.value;
    // Chargement des types de document en fonction de la catégorie sélectionnée
    this.documentCategoryService
      .getDocumentTypesByCategory(this.selectedCategoryId)
      .subscribe((types) => {
        this.documentTypes = types;
      });
  }

 /*  getDocumentTypes(): void {
    this.documentTypesService.getDocumentTypes().subscribe((documentTypes) => {
      this.documentTypes = documentTypes;
    });
  } */

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSelectedDocumentType(event: any): void {
    this.selectedDocumentType = event.value;
  }
  
  onSubmit(): void {
    const exportRequest: ExportRequestDTO = {
      documentType: this.selectedDocumentType
    };
  
    this.documentExportService.exportEmployee(this.employeeId, exportRequest)
      .subscribe(response => {
        if (response.body) {
          const blob = new Blob([response.body], { type: 'application/octet-stream' });
          const contentDisposition = response.headers.get('Content-Disposition');
          const fileName = contentDisposition?.split(';')[1].trim().split('=')[1];
  
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName || 'exported-file.docx';
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          // Gérez le cas où response.body est null
          console.error('Le corps de la réponse est null.');
        }
      });
  }
  
}
