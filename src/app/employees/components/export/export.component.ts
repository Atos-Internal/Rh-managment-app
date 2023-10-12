import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { DocumentCategory } from '../../models/documentCategory';
import { DocumentCategoryService } from '../../services/document-category.service';
import { DocumentType } from '../../models/documentType';
import { EmployeesService } from '../../employees.service';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  form: FormGroup | undefined;
  submitted: boolean = false;
  selectedCategoryId: number =0;
  selectedDocumentType: string | null = null;

  documentCategories: DocumentCategory[] = [];

  documentTypes: DocumentType[] = [];

  /*   documentCategories: any[] = [
      { categoryId: 1, name: 'Document Admin Divers' }
    ];
  
    documentTypes: any[] = [
      { typesId: 1, name: 'Attestation de Travail', value: 'ATTESTATION_TRAVAIL' },
      { typesId: 2, name: 'Attestation de Salaire', value: 'ATTESTATION_SALAIRE' },
      { typesId: 3, name: 'Certificat de Travail', value: 'CERTIF_TRAVAIL' }
    ]; */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: string, firstName:string, lastName:string},
    private readonly fb: FormBuilder,
    private employeesService: EmployeesService,

    private documentCategoryService: DocumentCategoryService,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getDocumentCategories();
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

  onTypeSelected(event: any) : void  {
    // event.value sert a récupérer l'ID de la catégorie sélectionnée
  this.selectedDocumentType = event.value;
   // Chargement des types de document en fonction de la catégorie sélectionnée
  }

 /*  getDocumentTypes(): void {
    this.documentTypesService.getDocumentTypes().subscribe((documentTypes) => {
      this.documentTypes = documentTypes;
    });
  } */

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  onSubmit() {
    const exportRequestDTO = { documentType: this.selectedDocumentType };
    this.employeesService.exportEmployee(this.data.employeeId, exportRequestDTO).subscribe((response) => {
      // Traitez ici la réponse de l'API (fichier DOCX)
      // Par exemple, vous pouvez télécharger le fichier en utilisant Blob
      // const contentDisposition = response.headers.get('content-disposition');
      const fileName = `${this.selectedDocumentType}_${this.data.lastName}_${this.data.firstName}`;
      const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
