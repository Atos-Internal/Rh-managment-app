import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription, take } from "rxjs";
import { DocumentCategory } from '../../models/documentCategory';
import { DocumentCategoryService } from '../../services/document-category.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentType } from '../../models/documentType';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  form: FormGroup | undefined;
  submitted: boolean = false;

  selectedCategory: number = 2 ;
  documentCategories: DocumentCategory[] = [];
  selectedDocumentType: string = '';
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
    @Inject(MAT_DIALOG_DATA) public selectedNode: Node,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private documentCategoryService: DocumentCategoryService,
    private documentTypesService: DocumentTypeService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getDocumentCategories();
    //this.getDocumentTypes();
  }

  initForm() {
    this.form = this.fb.group({
      documentType: [''],
    });

  }

  getDocumentCategories(): void {
    this.documentCategoryService.getDocumentCategories().subscribe((documentCategories) => {
      this.documentCategories = documentCategories;
      
    });
  }

  onCategorySelected() {
    this.documentCategoryService
      .getDocumentTypesByCategory(this.selectedCategory)
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

  onSubmit() {
  }

}
