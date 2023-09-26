import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Wallet as WalletExtension } from "../../../shared/models/wallet";
import { Subscription, take } from "rxjs";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  public  wallet: WalletExtension | undefined;
  private subscription: Subscription | undefined;
  form: FormGroup | undefined;
  submitted: boolean = false;

  documentCategories: any[] = [
    { categoryId: 1, name: 'Document Admin Divers' }
  ];

  documentTypes: any[] = [
    { typesId: 1, name: 'Attestation de Travail', value: 'ATTESTATION_TRAVAIL' },
    { typesId: 2, name: 'Attestation de Salaire', value: 'ATTESTATION_SALAIRE' },
    { typesId: 3, name: 'Certificat de Travail', value: 'CERTIF_TRAVAIL' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedNode: Node,
    private readonly fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initForm() {
    this.form = this.fb.group({
      documentType: [''],
      email: [''],
      walletAddressList: this.fb.array([])
    });

    const walletAddressList = this.getWallets();

  }

  getWallets() {
    return this.form?.get('walletAddressList') as FormArray;
  }

  clearControlValue(controlName: string) {
    this.form?.get(controlName)!.setValue('');
  }

  clearWalletValue(index: number) {
    this.getWallets().controls[index].get('walletAddress')!.setValue('');
  }

  onSubmit() {

  }

  txSubmit(fromAddress: string, toAddress: string, amount: number, data: any) {
    this.toastr.info('Preparing Transaction...', 'Pending');
    /*this.accountService.getWalletApi(this.wallet?.provider!)
      .then(async (walletApi: any) => {
        try {
          const metaDatum = prepareMetaData(data);
          const txBody = await buildTx(walletApi, fromAddress, toAddress, amount, metaDatum);
          try {
            const signedTx = await signTx(walletApi, txBody, metaDatum);
            try {
              this.submittedTxHash = await submitTx(walletApi, signedTx);
              console.log(this.submittedTxHash);
              this.paymentStatus = "success";
              this.toastr.success('Payment Successful', 'Success');
              this.sendRental(this.submittedTxHash);
            } catch (e) {
              this.submitted = false;
              this.paymentStatus = 'fail';
              this.toastr.error('Error while submitting Tx', 'Transaction Submit Error');
            }
          } catch (e) {
            this.submitted = false;
            this.paymentStatus = 'fail';
            this.toastr.error('Error while signing Tx', 'Transaction Sign Error');
          }
        } catch (e) {
          this.submitted = false;
          this.paymentStatus = 'fail';
          this.toastr.error('Error while building Tx', 'Transaction build Error');
        }
      })
      .catch((err: any) => {
        this.submitted = false;
        this.toastr.error('Your wallet must be connected as DApp account', 'Error');
      });*/
  }

  sendRental(submittedTxHash: any) {
    /*const cleanedWallets = removeDuplicatesAndEmpty(this.form?.value['walletAddressList']);
    let rentalForm: Rental = new Rental(
      this.wallet?.address!,
      submittedTxHash,
      this.form?.value.discordId,
      this.form?.value.email,
      this.selectedNode.nodeId,
      cleanedWallets
    );

    this.nodesService.SendRental(rentalForm)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.orderStatus = "success";
          this.toastr.success('Your order has been saved', 'Success');
        },
        error: () => {
          this.orderStatus = "fail";
          this.toastr.error('Error while saving your order', 'Fail')
        },
        complete: () => this.submitted = false
      });*/
  }
}
