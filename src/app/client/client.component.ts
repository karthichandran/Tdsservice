import { Component, OnDestroy, OnInit, ViewChildren, QueryList, ElementRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,ValidatorFn,AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import * as Xlsx from 'xlsx';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: fuseAnimations
})
export class ClientComponent implements OnInit, OnDestroy {
  customerform: FormGroup;
  // Vertical Stepper
  propertyForm: FormGroup;
  shareForm: FormGroup;

  clients: any[] = [];
  sellers: any[] = [];
  states: any[] = [{ 'id': 1, 'description': 'karnataka' }];
  rowData: any[] = [];
  sellerData: any[] = [];
  sellerColumnDef: any[] = [];

  isRadioButtonTouched: boolean = true;

  @ViewChildren(FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;


  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    // Reactive Form
    this.customerform = this._formBuilder.group({
      declarationDate: [''],
      name: ['', Validators.required],
      promises: ['', Validators.required],
      flat: ['', Validators.required],
      road: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      pan: ['',[ Validators.required, this.panValidator()]],
      email: ['',Validators.email],
      phone: [''],
      birthDate: ['', Validators.required],
      form16b: [''],
      trace: [''],
      traceLogin: [''],
      tracePwd: [''],
      share:['']
    });
    // Vertical Stepper form stepper
    this.propertyForm = this._formBuilder.group({
     
      promises: ['', Validators.required],
      flat: ['', Validators.required],
      road: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      units: ['', Validators.required],
      payment: ['', Validators.required],
      gstRate: ['', Validators.required],
      tdsRate: ['', Validators.required],
      totalCost: ['', Validators.required],
      bookingDate: ['', Validators.required],
      tdsCollected: ['', Validators.required]
    });

    this.shareForm = this._formBuilder.group({
      address: ['', Validators.required]
    });

    this.sellerColumnDef = [{ 'header': 'Name', 'field': 'name', 'type': 'label' },
    { 'header': 'Share %', 'field': 'share', 'type': 'textbox' }

    ];  
    //this.rowData = [
    //  {
    //    'id': '1',
    //    'name': 'Reyna',
    //    'empId': 435345345,
    //    'email': 'test@gmail.com',
    //    'phone': '23456456456',
    //    'roleId': 2,
    //    'role': 'MD',
    //    'dates': '01/03/2020 to till date',
    //    'status': 'Active'
    //  },
    //  {
    //    'id': '1',
    //    'name': 'koli',
    //    'empId': 435345345,
    //    'email': 'test@gmail.com',
    //    'phone': '23456456456',
    //    'roleId': 2,
    //    'role': 'MD',
    //    'dates': '01/03/2020 to till date',
    //    'status': 'Active'
    //  },
    //  {
    //    'id': '1',
    //    'name': 'sachin',
    //    'empId': 435345345,
    //    'email': 'test@gmail.com',
    //    'phone': '23456456456',
    //    'roleId': 2,
    //    'role': 'MD',
    //    'dates': '01/03/2020 to till date',
    //    'status': 'Active'
    //  },
    //  {
    //    'id': '1',
    //    'name': 'dhoni',
    //    'empId': 435345345,
    //    'email': 'test@gmail.com',
    //    'phone': '23456456456',
    //    'roleId': 2,
    //    'role': 'MD',
    //    'dates': '01/03/2020 to till date',
    //    'status': 'Active'
    //  },

    //];
  }

  clear() {
    this.customerform.reset();
  }

  save() {

    if (this.customerform.valid) {
      let model = this.customerform.value;
      let startDate = new Date(this.customerform.value);
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }

  selectedRows(eve) {
    eve.selected[0]['gender'] = 1;
    eve.selected[0]['birthDate'] = new Date();
    eve.selected[0]['startDate'] = new Date();
    eve.selected[0]['toDate'] = new Date();
    this.customerform.patchValue(eve.selected[0]);


    var ele = document.getElementsByClassName('mat-tab-label') as HTMLCollectionOf<HTMLElement>;
    ele[0].click();

  }

  download() {
    const ws: Xlsx.WorkSheet = Xlsx.utils.json_to_sheet(this.rowData);
    const wb: Xlsx.WorkBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    Xlsx.writeFile(wb, '.xls');
  }

  showClient(model: any) {
    this.customerform.patchValue(model);
  }
  addCoClient() {
   
   
    if (this.customerform.valid) {
     
      this.clients = [this.customerform.value, ...this.clients];

     // this.gridComp.toggleExpandRow(this.clients);
      this.customerform.reset();

    }
    else {
    
      Object.keys(this.customerform.controls).forEach(field => {
        const control = this.customerform.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      //this.form.markAsTouched({ onlySelf: true });
      // this.form.markAllAsTouched();
    }
  }

  finishVerticalStepper(): void {
    alert('You have finished the vertical stepper!');
  }

   panValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // if input field is empty return as valid else test
    const ret = (control.value !== '') ? new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$').test(control.value) : true;
    return !ret ? { 'invalidNumber': { value: control.value } } : null;
  };
}
}
