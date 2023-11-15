import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { DocumentCategory } from '../../models/documentCategory';
import { DocumentCategoryService } from '../../services/document-category.service';
import { DocumentType } from '../../models/documentType';
import { EmployeesService } from '../../employees.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  selectedDocumentType: string = '';
  selectedDocumentType2: string = '';


  documentCategories: DocumentCategory[] = [];
  selectedEmployeeIds: string[] = [];
  
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
    @Inject(MAT_DIALOG_DATA) public data: {fromExportByList:boolean, selectedEmployeeIds :string[], employeeId: string, firstName:string, lastName:string},

    private readonly fb: FormBuilder,
    private employeesService: EmployeesService,
    public bsModalRef: BsModalRef,
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

    console.log(this.data.selectedEmployeeIds);


    if (this.data.fromExportByList) {
     // const UUIDs: string[] = [this.data.selectedEmployeeIds];
   //  const doc = this.selectedDocumentType.toString;
   //console.log(UUIDs);
     const str =this.selectedDocumentType2 + this.selectedDocumentType;
     const exportRequestDTO2 = { documentType:str, UUIDs: this.data.selectedEmployeeIds };
     this.employeesService.exportEmployees(exportRequestDTO2, str).subscribe((response) => {
     // this.employeesService.exportEmployees2(str,UUIDs).subscribe((response) => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const fileName = `${this.selectedDocumentType}_${formattedDate}`;
        const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    } else {
      const exportRequestDTO = { documentType: this.selectedDocumentType };
      this.employeesService.exportEmployee(this.data.employeeId, exportRequestDTO).subscribe((response) => {
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
}