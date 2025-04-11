import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-add-update-payment-mgt',
  templateUrl: './add-update-payment-mgt.page.html',
  styleUrls: ['./add-update-payment-mgt.page.scss'],
})
export class AddUpdatePaymentMgtPage implements OnInit {

  userid: any;
  pageFlag: any;
  addForm: any;
  status: any = false;
  errorFound: boolean;
  PaymentModeId = '0';
  paymentObj: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.paymentObj = this.activatedroute.snapshot.paramMap.get("paymentObj");
    this.paymentObj = JSON.parse(this.paymentObj);
    if (this.pageFlag == "updateds") {
      if (this.paymentObj.status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
      this.addForm = formBuilder.group({
        PaymentMode: [this.paymentObj.PaymentMode, Validators.required],
        PaymentModeCode: [this.paymentObj.PaymentModeCode, Validators.required],
        PaymentModeType: [this.paymentObj.PaymentModeType, Validators.required],

        // Status: this.status,
        // status
        // PaymentModeId
      });
      this.PaymentModeId = this.paymentObj.PaymentModeId;
    } else {
      this.addForm = formBuilder.group({
        PaymentMode: ['', Validators.required],
        PaymentModeCode: ['', Validators.required],
        PaymentModeType: ['', Validators.required],
      })
    }
  }
  ngAfterContentInit() {
    this.addForm;
  }

  ngOnInit() {
  }

  Insertpayement() {
    console.log(this.addForm);
    var self = this;
    self.errorFound = true;
    if (self.validationDisp()) {
      const obj = {
        PaymentModeId: (this.pageFlag == 'updateds') ? this.PaymentModeId : '0',
        PaymentMode: self.addForm.value.PaymentMode,
        PaymentModeCode: self.addForm.value.PaymentModeCode,
        PaymentModeType: self.addForm.value.PaymentModeType,
        status: (this.status == true) ? '0' : '1',
      }
      self.commonServices.loadingPresent();
      self.commonServices.post("InsertUpdatePaymentMode", obj).subscribe((res: any) => {
        const disRes = JSON.parse(res);
        if (disRes.Table[0].Msg == "PaymentMode inserted successfully.") {
          self.commonServices.presentToast(disRes.Table[0].Msg);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/payment-management']);
          }, 1000)
        }

        else if (disRes.Table[0].Msg == "PaymentMode updated successfully.") {
          self.commonServices.presentToast(disRes.Table[0].Msg);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/payment-management']);
          }, 1000)
        }
        else if(disRes.Table[0].Msg == "PaymentMode already exists.")
        {
          self.commonServices.presentToast(disRes.Table[0].Msg);
        }
        else {
          self.commonServices.presentToast(disRes.Table[0].Msg);
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }


  validationDisp() {
    if (this.addForm.value.PaymentMode == '') {
      this.commonServices.presentToast('Please enter the Payment Mode.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.PaymentModeCode == '') {
      this.commonServices.presentToast('Please enter the PaymentMode Code.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.PaymentModeType == '') {
      this.commonServices.presentToast('Please enter the PaymentMode Type.');
      this.errorFound = false;
      return this.errorFound;
    }
    return this.errorFound;
  }
}
