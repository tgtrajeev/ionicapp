import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-bank-deposite',
  templateUrl: './bank-deposite.page.html',
  styleUrls: ['./bank-deposite.page.scss'],
})
export class BankDepositePage implements OnInit {
  onselectedStation: string;

  Cdate = '';
  detailsStation: { StationId: string, SummeryDate: string, UserId: string }
  StationShift = { ShiftId: '-1', SubShiftId: '-1', ActiveTab: 'Bank' }
  AddDenominationsType: { DenominationsId, DenominationsName, DenominationsCount, DenominationsAmount }[];
  CashPayment: { RowNo, PaymentModeId, PaymentMode, PaymentAmount }[];
  OpeningCashBalance = '0.00';
  TotalSale = '0.00';
  CashDeposit = '0.00';
  ClosingCashBalance = '0.00';
  CurrentCash = '0.00';
  DepositDate = '';
  oldvalue: string = '';
  RemarkIsfalse: boolean = false;
  remark: string;
  searchValue: string = '';
  IsBankSubmitted: boolean = false;
  SlipNo: string = '';
  CompanyName: string = '';
  selectedStation: number = 0;
  submittedflag: boolean = false;
  SubmitBy: string = '';
  SummeryDate: string;
  UserId: string;
  SubmissionDate: string;
  currentdate: any;
  secondMaxDate: any = new Date().toISOString();
  subscription: any;
  constructor(public alertController: AlertController, private formBuilder: FormBuilder, public datepipe: DatePipe, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {


    this.SummeryDate = localStorage.getItem('SummeryDate');
    this.UserId = localStorage.getItem('UserId')
    this.onselectedStation = localStorage.getItem('StationId');
    this.toggleSideBar();

    this.StationShift = this.StationShift;
    setTimeout(() => { this.GetDenominationsType(); }, 1000);


    this.commonServices.lockUnlock.subscribe(value => {
      this.submittedflag = value;
    })
  }

  ngOnInit() {
    this.selectedStation = Number(localStorage.getItem('StationId'));
    this.subscription =  this.commonServices.StationDetails.subscribe(
      (test: { StationId: string, SummeryDate: string, UserId: string }) => {
        this.detailsStation = test;
        console.log("detailsStation", this.detailsStation)
      }
    );

    this.currentdate = new Date().toISOString().split('T')[0];
    console.log(this.currentdate);
    const dt = new Date(this.currentdate);
    this.SubmissionDate = this.datepipe.transform(dt, 'yyyy/MM/dd');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  toggleSideBar() {
    //this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", {
      Id: this.onselectedStation,
      Status: this.SummeryDate, Flag: 'validatePopup'
    }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        if (data.Table[0].Msg == 'Allow') {
          this.commonServices.StationDetails.emit({
            StationId: this.onselectedStation,
            SummeryDate: this.SummeryDate,
            UserId: this.UserId
          });
        }
        else {
          this, this.commonServices.presentToast(data.Table[0].Msg);
        }
        // this.commonServices.loadingDismiss();
      },
      (error) => {
        this, this.commonServices.presentToast('Something went wrong.');
        //this.commonServices.loadingDismiss();
      }
    )
  }

  OnDateChnagefrom(val) {
    var self = this;
    const dt = new Date(val);

    self.SubmissionDate = this.datepipe.transform(dt, 'yyyy/MM/dd');


  }

  GetDenominationsType() {
    this.commonServices.loadingDismiss();
    this.commonServices.loadingPresent();
    this.commonServices.post("GetDenominationsData", { StationId: this.detailsStation.StationId, DepositDate: this.detailsStation.SummeryDate }).subscribe(
      (resp: any) => {
        this.commonServices.loadingDismiss();
        this.AddDenominationsType = JSON.parse(resp).Table;
        this.CashPayment = JSON.parse(resp).Table1;
        this.OpeningCashBalance = parseFloat(JSON.parse(resp).Table2[0].OpeningCashBalance.toFixed(2)).toString();
        this.CurrentCash = parseFloat(JSON.parse(resp).Table2[0].CurrentCash.toFixed(2)).toString();
        this.ClosingCashBalance = parseFloat(JSON.parse(resp).Table2[0].ClosingCashBalance.toFixed(2)).toString();
        this.CalculateClosingBalanace();
        var Ischek = JSON.parse(resp).Table2[0].IsSubmited;
        if (Ischek == 1)
          $("#IsSubmitcheck").prop("checked", true);
        else
          $("#IsSubmitcheck").prop("checked", false);

        this.SlipNo = JSON.parse(resp).Table2[0].SlipNo;
        this.SubmitBy = JSON.parse(resp).Table2[0].SubmittedBy;
        this.remark = JSON.parse(resp).Table2[0].Remark;
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  check(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  Onchange(val, DenominationsName) {
    if (val.value == '') {
      const Value = this.AddDenominationsType.find(pm => pm.DenominationsName === DenominationsName);
      if (DenominationsName == 'Other Notes') {
        Value.DenominationsAmount = 0;
        Value.DenominationsCount = (parseFloat(val.value)).toString();
      }
      else if (DenominationsName == 'Coins') {
        Value.DenominationsAmount = 0;
        Value.DenominationsCount = (parseFloat(val.value)).toString();
      }
      else {
        Value.DenominationsCount = val.value;
        Value.DenominationsAmount = (0 * parseFloat(DenominationsName)).toString();
      }
    }
    else {
      const Value = this.AddDenominationsType.find(pm => pm.DenominationsName === DenominationsName);
      if (DenominationsName == 'Other Notes') {
        Value.DenominationsAmount = (parseFloat(val.value)).toString();
        Value.DenominationsCount = (parseFloat(val.value)).toString();
      }
      else if (DenominationsName == 'Coins') {
        Value.DenominationsAmount = (parseFloat(val.value)).toString();
        Value.DenominationsCount = (parseFloat(val.value)).toString();
      }
      else {
        Value.DenominationsCount = val.value;
        Value.DenominationsAmount = (parseFloat(val.value) * parseFloat(DenominationsName)).toString();
      }
    }
    this.CalculateClosingBalanace();
  }

  CalculateClosingBalanace() {
    this.CashDeposit = '0.00';
    for (var i = 0; i < this.AddDenominationsType.length; i++) {
      this.CashDeposit = (parseFloat(this.CashDeposit) + parseFloat(this.AddDenominationsType[i].DenominationsAmount)).toFixed(2).toString();
    }
    const Value = this.CashPayment.find(pm => pm.PaymentMode === 'Closing Cash Balance');
    this.ClosingCashBalance = ((parseFloat(this.OpeningCashBalance) + parseFloat(this.CurrentCash) - parseFloat(this.CashDeposit)).toFixed(2)).toString();
    Value.PaymentAmount = this.ClosingCashBalance;
  }

  saveBankDeposit() {
    if (this.detailsStation.SummeryDate != '') {
      if (parseFloat(this.CashDeposit) <= (parseFloat(this.CurrentCash) +
        parseFloat(this.OpeningCashBalance))) {
        if (this.IsBankSubmitted == true) {
          if (this.SlipNo == '') {
            this.commonServices.presentToast('Slip/reference no. must be fill.');
            return false;
          }
          if (this.SubmitBy == '') {
            this.commonServices.presentToast('SubmitBy must be fill.');
            return false;
          }
        }
        // if (this.IsBankSubmitted==false) {
        //     if(isNullOrUndefined(this.remark) || this.remark=='') {
        //        alert('Remark must be fill.');
        //        return false;
        //     }            
        // }
        var v = (this.IsBankSubmitted == true) ? 1 : 2;
        this.commonServices.loadingDismiss();
        this.commonServices.loadingPresent();

        this.commonServices.post("BankDepositPaymentCollection", { StationId: this.detailsStation.StationId, UserId: this.detailsStation.UserId, Remark: this.remark, DepositDate: this.detailsStation.SummeryDate, DispanserPayment: this.AddDenominationsType, SlipNo: this.SlipNo, IsSubmited: v, SubmitBy: this.SubmitBy,EntryDate:this.SubmissionDate }).subscribe
          (
            (resp: any) => {

              const data = JSON.parse(resp);
              this.commonServices.presentToast(data.Table[0].Meaasge);
              this.commonServices.loadingDismiss();


              // $('.nav-tabs >').first('li').find('a').trigger('click');
              // this.objDbServ.DispencerPopup.emit(false);
            },
            (error) => {
              this.commonServices.presentToast("Something went wrong.");
              this.commonServices.loadingDismiss();
            }
          )
      }

      else {
        if (this.remark != '' && this.remark != undefined) {
          // this.commonServices.loadingPresent();
          this.commonServices.post("BankDepositPaymentCollection", { StationId: this.detailsStation.StationId, UserId: this.detailsStation.UserId, Remark: this.remark, DepositDate: this.detailsStation.SummeryDate, DispanserPayment: this.AddDenominationsType }).subscribe
            (
              (resp: any) => {
                const data = JSON.parse(resp);
                this.commonServices.presentToast(data.Table[0].Meaasge);
                // this.commonServices.loadingDismiss();
                // $('.nav-tabs >').first('li').find('a').trigger('click');
                // this.objDbServ.DispencerPopup.emit(false);
                // this.searchInput.nativeElement.value = '';
                this.remark = '';
                this.RemarkIsfalse = false;

              },
              (error) => {
                this.commonServices.presentToast("Something went wrong.");
                // this.commonServices.loadingDismiss();
              }
            )

        }
        else {
          this.commonServices.presentToast("Remark Can't be blank.");
        }
      }
    }

    else {
      this.commonServices.presentToast("Deposit date must be.");
    }
  }

  saveBankDepositOnOkClick(val) {
    if (val == "yes") {
      this.RemarkIsfalse = true;
      this.saveBankDeposit();
    }
    else {
      this.RemarkIsfalse = false;
    }
  }

  OnCheckboxChange(evt) {
    if (evt.target.checked == true) {
      this.SlipNo = '';
      this.SubmitBy = '';
      this.IsBankSubmitted = true;
    }
    else if (evt.target.checked == false) {
      this.SlipNo = '';
      this.SubmitBy = '';
      this.IsBankSubmitted = false;
    }
  }

  unlockpayment() {
    this.commonServices.presentToast("Please unlock this from payment collection tab");
  }
  async presentAlerttoConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bank Deposit Confirmation !',
      message: 'Your bank deposit is greater than (Cash collection + Ope. Cash Balance).',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.saveBankDepositOnOkClick('no');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.saveBankDepositOnOkClick('yes');
          }
        }
      ]
    });
    await alert.present();
  }
}