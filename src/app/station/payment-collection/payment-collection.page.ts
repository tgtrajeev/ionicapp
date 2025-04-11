import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { MenuController } from "@ionic/angular";
import { isNullOrUndefined, isUndefined } from "util";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-payment-collection",
  templateUrl: "./payment-collection.page.html",
  styleUrls: ["./payment-collection.page.scss"],
})
export class PaymentCollectionPage implements OnInit {
  ArmADetailSec: boolean = false;
  flagAramA: number = 0;
  ArmBDetailSec: boolean = false;
  flagAramB: number = 0;
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" };
  DPREntryDateTime: string;

  detailsStation: { StationId: string; SummeryDate: string; UserId: string };
  StationShift = { ShiftId: "-1", SubShiftId: "-1", ActiveTab: "Payment" };
  dispCounterIndex: number = 0;
  DispencerCount: number = 0;
  totalDispenser: number = 0;
  cmbShiftData: {}[];
  cmbSubShiftData: {}[];

  selectedShiftId = "-1";
  selectedSubShiftId = "-1";
  listDispensers: { DispenserName; DispenserId; StationId }[];
  selectedDispId = 0;
  cnt = 0;
  showNext: boolean = true;
  showPrevious: boolean = true;
  ValidationFlag: number;

  AddPaymentMode: {
    PaymentModeId;
    PaymentMode;
    PaymentQuantityA;
    PaymentAmountA;
    PaymentQuantityB;
    PaymentAmountB;
  }[];
  CreditPartySale = "0.00";
  CreditCardSale = "0.00";
  PrepaidCardSale = "0.00";
  PaytmSale = "0.00";
  PrepaidCardLoading = "0.00";
  PrepaidCardActivations = "0.00";
  OtherSale = "0.00";
  CashSale = "0.00";
  LubeSale = "0.00";
  TotalReadingsA = "0.00";
  TotalReadingsB = "0.00";
  TotalSalesA = "0.00";
  TotalSalesB = "0.00";
  CurrentRate = "0.00";
  NormalRate = "0.00";
  DiscountedRate = "0.00";
  TotalCurrentSalesA = "0.00";
  TotalCurrentReadingsA = "0.00";
  TotalCurrentSalesB = "0.00";
  TotalCurrentReadingsB = "0.00";
  TotalCashSalesA = "0.00";
  TotalCashSalesB = "0.00";
  oldvalue: string;
  SubShiftId;
  PeriousA = "0.00";
  PeriousB = "0.00";
  selectedPaymentModeId: string;
  selectedPaymentAmount: string;
  IsCmbDisable: boolean = false;
  listDSM: any = [];
  SelectedDSMIdArmA: string = "";
  SelectedDSMIdArmB: string = "";
  StationId = Number(localStorage.getItem("StationId"));
  Armsflag: string = "";
  ValidateDSM: boolean = true;
  DSMId: string = "";
  selectedStation: number = 0;
  SubmittedBySOPFlag: boolean = false;
  enterOtpfields: boolean = false;
  enteredotp: string = "";
  validotp: string = "";
  popupDate: string = "";
  successMessage: boolean = false;
  IsShiftIdComplete: number;
  SaveEnable: boolean = true;
  IsTimeOverlocal: boolean = false;
  SummeryDate: any;
  UserId: any;
  onselectedStation: string;
  subscription: any;
  subscriptionShiftPending: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public commonServices: ApiService,
    private menu: MenuController,
    private dp: DatePipe
  ) {
    this.getDSM();

    this.SummeryDate = localStorage.getItem("SummeryDate");
    this.UserId = localStorage.getItem("UserId");
    this.onselectedStation = localStorage.getItem("StationId");
    this.toggleSideBar();

    this.StationShift = this.StationShift;
    this.selectedDispId = 0;
    this.selectedShiftId = this.StationShift.ShiftId;
    this.selectedSubShiftId = this.StationShift.SubShiftId;
    this.dispCounterIndex = 0;

    this.subscription = this.commonServices.StationDetails.subscribe(
      (test: { StationId: string; SummeryDate: string; UserId: string }) => {
        this.detailsStation = test;
      }
    );

    this.commonServices.IsShiftIdPending.subscribe((value) => {
      this.IsShiftIdComplete = value;
    });
    this.commonServices.IsTimeOver.subscribe((value) => {
      this.IsTimeOverlocal = value;
    });
  
    setTimeout(() => {
      setTimeout(() => {
        this.GetDataByShift();
      });
      this.FetchDSASubmittedData();
    }, 2000);
  }

  ionViewDidLeave() {
    //  setTimeout(() => {
    //     this.commonServices.StationDetails.unsubscribe();
    //   }, 10000);
  }
 
  ngOnInit() {
    this.selectedStation = Number(localStorage.getItem("StationId"));
    this.dispCounterIndex = 0;
    this.showNext = true;
    this.showPrevious = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openFirst() {
    this.menu.enable(true, "menuStn");
    this.menu.open("menuStn");
  }

  armACollapse() {
    if (this.flagAramA == 0) {
      this.ArmADetailSec = true;
      this.flagAramA = 1;
    } else {
      this.ArmADetailSec = false;
      this.flagAramA = 0;
    }
  }

  armBCollapse() {
    if (this.flagAramB == 0) {
      this.ArmBDetailSec = true;
      this.flagAramB = 1;
    } else {
      this.ArmBDetailSec = false;
      this.flagAramB = 0;
    }
  }

  toggleSideBar() {
    this.commonServices
      .post("CommonGetData", {
        Id: this.onselectedStation,
        Status: this.SummeryDate,
        Flag: "validatePopup",
      })
      .subscribe(
        (resp: any) => {
          const data = JSON.parse(resp);
          console.log(data);
          if (data.Table[0].Msg == "Allow") {
            this.commonServices.StationDetails.emit({
              StationId: this.onselectedStation,
              SummeryDate: this.SummeryDate,
              UserId: this.UserId,
            });
          } else {
            this.commonServices.presentToast(data.Table[0].Msg);
          }
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
        }
      );
  }

  onDSMSelectArmA(val) {
    this.SelectedDSMIdArmA = val;
    this.Armsflag = "ArmA";
    if (Number(this.SelectedDSMIdArmA) > 0) {
      this.DSMId = this.SelectedDSMIdArmA;
      this.checkDSMByDay();
    }
  }

  onDSMSelectArmB(val) {
    this.SelectedDSMIdArmB = val;
    this.Armsflag = "ArmB";
    if (Number(this.SelectedDSMIdArmB) > 0) {
      this.DSMId = this.SelectedDSMIdArmB;
      this.checkDSMByDay();
    }
  }

  checkDSMByDay() {
    var obj = {
      Flag: this.Armsflag,
      DSMId: this.DSMId,
      ShiftId: this.selectedShiftId,
      EntryDate: this.detailsStation.SummeryDate,
    };
    this.commonServices.post("checkDSMByDay", obj).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp).Table;
        if (data[0].Mesage != "") {
          this.commonServices.presentToast(data[0].Mesage);
          this.ValidateDSM = false;
        } else this.ValidateDSM = true;
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
      }
    );
  }

  getDSM() {
    this.commonServices
      .post("CommonGetData", {
        Flag: "DSMByStation",
        Id: this.StationId,
        Status: 0,
      })
      .subscribe(
        (resp: any) => {
          this.listDSM = JSON.parse(resp).Table;
          console.log(this.listDSM, "listDSM");
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
        }
      );
  }

  getData() {
    this.cnt = this.cnt + 1;
    //this.commonServices.loadingPresent();
    this.commonServices
      .post("CommonGetData", {
        Flag: "StationDispenserData",
        Id: this.detailsStation.StationId,
      })
      .subscribe(
        (resp: any) => {
          this.DispencerCount = JSON.parse(resp).Table.length;
          //  this.commonServices.loadingDismiss();
          if (this.DispencerCount > 0 && JSON.parse(resp).Table1.length > 0) {
            this.DispencerCount = this.DispencerCount - 1;
            this.selectedDispId = JSON.parse(resp).Table[0].DispenserId;
            this.listDispensers = JSON.parse(resp).Table;
            this.totalDispenser = JSON.parse(resp).Table.length;
            this.cmbShiftData = JSON.parse(resp).Table1;

            console.log(this.cmbSubShiftData);
            this.selectedShiftId = this.StationShift.ShiftId;
            setTimeout(() => {
              this.GetDataByShift();
            });
          }
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          //  this.commonServices.loadingDismiss();
        }
      );
  }

  onSelectShift(shiftId: string) {
    this.selectedShiftId = shiftId;
    if (this.selectedShiftId == "-1") {
      this.CurrentRate = "0.00";
    } else if (this.selectedShiftId == "4") {
      this.CurrentRate = this.DiscountedRate;
      this.GetDataByShift();
    } else {
      this.CurrentRate = this.NormalRate;
      setTimeout(() => {
        this.GetDataByShift();
      });
    }
  }

  onSelectDispenser(event) {
    var dispenserId = event.detail.value;
    this.dispCounterIndex = this.listDispensers.findIndex(
      (item) => item.DispenserId === Number(dispenserId)
    );
    this.selectedDispId = Number(dispenserId);
    setTimeout(() => {
      this.GetDataByShift();
    });
  }

  GetDataByShift() {
    this.commonServices.loadingDismiss();
    this.commonServices.loadingPresent();
    this.commonServices
      .post("GetPaymentByShift", {
        EntryDate: this.detailsStation.SummeryDate,
        ShiftId: this.selectedShiftId,
        DispenserId: this.selectedDispId,
        StationId: this.detailsStation.StationId,
      })
      .subscribe(
        (resp: any) => {
          if (this.selectedDispId == 0)
            this.selectedDispId = JSON.parse(resp).Table3[0].DispenserId;
          this.DispencerCount = JSON.parse(resp).Table3.length;
          this.listDispensers = JSON.parse(resp).Table3;
          this.totalDispenser = JSON.parse(resp).Table3.length;
          this.cmbShiftData = JSON.parse(resp).Table1;
          this.cmbSubShiftData = JSON.parse(resp).Table2;
          this.DispencerCount = this.DispencerCount - 1;

          this.AddPaymentMode = JSON.parse(resp).Table;
          this.TotalSalesA = parseFloat(JSON.parse(resp).Table2[0].TotalSalesA)
            .toFixed(2)
            .toString();
          this.TotalSalesB = parseFloat(JSON.parse(resp).Table2[0].TotalSalesB)
            .toFixed(2)
            .toString();
          this.TotalReadingsA = parseFloat(
            JSON.parse(resp).Table2[0].TotalReadingsA
          )
            .toFixed(2)
            .toString();
          this.TotalReadingsB = parseFloat(
            JSON.parse(resp).Table2[0].TotalReadingsB
          )
            .toFixed(2)
            .toString();
          this.DiscountedRate = parseFloat(
            JSON.parse(resp).Table2[0].DisountedRate
          )
            .toFixed(2)
            .toString();
          this.NormalRate = parseFloat(JSON.parse(resp).Table2[0].CurrentRate)
            .toFixed(2)
            .toString();

          this.selectedShiftId = JSON.parse(resp).Table2[0].ShiftId;
          this.ValidationFlag = JSON.parse(resp).Table2[0].ValidationFlag;
          this.SelectedDSMIdArmA = JSON.parse(resp).Table2[0].DSMIdArmA;
          this.SelectedDSMIdArmB = JSON.parse(resp).Table2[0].DSMIdArmB;

          if (this.selectedShiftId == "-1") this.CurrentRate = "0.00";
          else if (this.selectedShiftId == "4")
            this.CurrentRate = this.DiscountedRate;
          else this.CurrentRate = this.NormalRate;

          this.TotalCashSalesA = this.TotalSalesA;
          this.TotalCashSalesB = this.TotalSalesB;
          this.sumup();
          this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      );
  }

  savePayment() {
    console.log(parseFloat(this.TotalSalesA) + parseFloat("10"));
    if (this.SelectedDSMIdArmA == "" || this.SelectedDSMIdArmA == "-1") {
      this.commonServices.presentToast('Please select Arm "A" DSM.');
      return false;
    }
    if (this.SelectedDSMIdArmB == "" || this.SelectedDSMIdArmB == "-1") {
      this.commonServices.presentToast('Please select Arm "B" DSM.');
      return false;
    }
    if (
      isNullOrUndefined(this.SelectedDSMIdArmA) ||
      isNullOrUndefined(this.SelectedDSMIdArmB)
    ) {
      this.commonServices.presentToast("Both Arm,s DSM must be selected.");
      return false;
    }
    // if (this.SelectedDSMIdArmA == this.SelectedDSMIdArmB) {
    //   this.commonServices.presentToast('Both Arm,s DSM must be different.');
    //   return false;
    // }
    // if (this.ValidateDSM == false) {
    //   this.commonServices.presentToast('One of DSM is already exist for this shift!');
    //   return false;
    // }
    // if (this.selectedShiftId == '' || this.selectedShiftId == '-1') {
    //   this.commonServices.presentToast('Please select shift.');
    //   return false;
    // }
    // if (this.ValidationFlag == 1) {
    //   if (parseFloat(this.TotalCurrentSalesA) >= parseFloat(this.TotalSalesA) && parseFloat(this.TotalCurrentSalesB) >= parseFloat(this.TotalSalesB)) {
    //     if (parseFloat(this.TotalCurrentSalesA) <= (parseFloat(this.TotalSalesA) + parseFloat("10")) && parseFloat(this.TotalCurrentSalesB) <= (parseFloat(this.TotalSalesB) + parseFloat("10"))) {
    //       this.saveData(Flag);
    //     }
    //     else {
    //       this.commonServices.presentToast("Your total sale amount is not matched with current details");
    //     }
    //     //this.saveData(Flag);
    //   }
    //   else {
    //     this.commonServices.presentToast("Your total sale amount is not matched with current details");
    //   }
    // }
    // else {
    //   this.saveData(Flag);
    // }
    console.log(this.SelectedDSMIdArmA, ",", this.SelectedDSMIdArmB);
    if (
      this.SelectedDSMIdArmA == this.SelectedDSMIdArmB &&
      (this.SelectedDSMIdArmA != "NA" || this.SelectedDSMIdArmB != "NA")
    ) {
      this.commonServices.presentToast("Both Arm,s DSM must be different.");
      return false;
    }
    if (
      this.ValidateDSM == false &&
      (this.SelectedDSMIdArmA != "NA" || this.SelectedDSMIdArmB != "NA")
    ) {
      this.commonServices.presentToast(
        "One of DSM is already exist for this shift!"
      );
      return false;
    }
    if (this.selectedShiftId == "" || this.selectedShiftId == "-1") {
      this.commonServices.presentToast("Please select shift.");
      return false;
    }
    if (this.ValidationFlag == 1) {
      if (
        parseFloat(this.TotalCurrentSalesA) >= parseFloat(this.TotalSalesA) &&
        parseFloat(this.TotalCurrentSalesB) >= parseFloat(this.TotalSalesB)
      ) {
        if (
          parseFloat(this.TotalCurrentSalesA) <=
            parseFloat(this.TotalSalesA) + parseFloat("10") &&
          parseFloat(this.TotalCurrentSalesB) <=
            parseFloat(this.TotalSalesB) + parseFloat("10")
        ) {
          this.saveData();
        } else {
          this.commonServices.presentToast(
            "Your total sale amount is not matched with current details"
          );
        }
      } else {
        this.commonServices.presentToast(
          "Your total sale amount is not matched with current details"
        );
      }
    } else {
      this.saveData();
    }
  }

  saveData() {
    for (var i = 0; i < this.AddPaymentMode.length; i++) {
      if (parseFloat(this.AddPaymentMode[i].PaymentAmountA) < 0) {
        this.SaveEnable = false;
        this.commonServices.presentToast("All payment amount must be positive");
        break;
      } else if (parseFloat(this.AddPaymentMode[i].PaymentAmountB) < 0) {
        this.SaveEnable = false;
        this.commonServices.presentToast("All payment amount must be positive");
        break;
      }
    }
    if (this.SaveEnable) {
      this.commonServices.loadingDismiss();
      this.commonServices.loadingPresent();
      this.commonServices
        .post("DispenserPaymentCollection", {
          UserId: this.detailsStation.UserId,
          EntryDate: this.detailsStation.SummeryDate,
          DispenserId: this.selectedDispId,
          StationId: this.detailsStation.StationId,
          ShiftId: this.selectedShiftId,
          DispanserPayment: this.AddPaymentMode,
          DSMIdArmA: this.SelectedDSMIdArmA,
          DSMIdArmB: this.SelectedDSMIdArmB,
        })
        .subscribe(
          (resp: any) => {
            const data = JSON.parse(resp);
            if (data.Table[0].Meaasge.indexOf("transfer") > -1) {
              this.commonServices.presentToast(data.Table[0].Meaasge);
              // this.objRoute.navigate(['']);
            }
            // else if(data.Table[0].Meaasge.indexOf('successfully') > -1)
            // {
            //   if(Flag!='M')
            //   {
            //     if(this.DispencerCount>this.dispCounterIndex){
            //       this.dispCounterIndex++;
            //       const dispIdToGo = this.listDispensers[this.dispCounterIndex].DispenserId;
            //       this.onSelectDispenser(dispIdToGo);
            //       this.showPrevious = true;
            //     }
            //     else{
            //       this.commonServices.ShiftDetails.emit({
            //         ShiftId:this.selectedShiftId,
            //         SubShiftId: this.selectedSubShiftId,
            //         ActiveTab:"Other"
            //       });
            //         $('.nav-tabs > .active').next('li').find('a').trigger('click');
            //     }
            //   }
            // }
            else {
              this.commonServices.presentToast(data.Table[0].Meaasge);
            }
            this.commonServices.loadingDismiss();
          },
          (error) => {
            this.commonServices.presentToast("Something went wrong.");
            this.commonServices.loadingDismiss();
          }
        );
    } else {
      this.commonServices.presentToast(
        "All payment value quantity be positive"
      );
    }
  }

  onPayemntEntry(event, PaymentModeId, Valuefor) {
    if (event.value != "") {
      var rx = /^\d+(?:\.\d{1,3})?$/;
      if (rx.test(event.value)) {
        this.oldvalue = event.value;
      } else {
        event.value = this.oldvalue;
      }
    } else {
      if (Valuefor == "A") {
        for (var i = 0; i < this.AddPaymentMode.length; i++) {
          if (PaymentModeId == this.AddPaymentMode[i].PaymentModeId) {
            this.AddPaymentMode[i].PaymentAmountA = 0;
          }
        }
      }
      if (Valuefor == "B") {
        for (var i = 0; i < this.AddPaymentMode.length; i++) {
          if (PaymentModeId == this.AddPaymentMode[i].PaymentModeId) {
            this.AddPaymentMode[i].PaymentAmountB = 0;
          }
        }
      }
    }
    this.selectedPaymentModeId = PaymentModeId;
    this.selectedPaymentAmount = event.value == "" ? "0" : event.value;
    if (this.selectedPaymentAmount != "") {
      if (parseFloat(this.selectedPaymentAmount) >= 0) {
        const Value = this.AddPaymentMode.find(
          (pm) => pm.PaymentModeId === this.selectedPaymentModeId
        );
        if (Valuefor == "A") {
          Value.PaymentAmountA = this.selectedPaymentAmount;
          Value.PaymentQuantityA = (
            parseFloat(this.selectedPaymentAmount) /
            parseFloat(this.CurrentRate)
          )
            .toFixed(2)
            .toString();
          this.SaveEnable = true;
        } else if (Valuefor == "B") {
          Value.PaymentAmountB = this.selectedPaymentAmount;
          Value.PaymentQuantityB = (
            parseFloat(this.selectedPaymentAmount) /
            parseFloat(this.CurrentRate)
          )
            .toFixed(2)
            .toString();
          this.SaveEnable = true;
        }
        this.sumup();
      } else {
        this.commonServices.presentToast("Amount must be positive");
        event.focus();
        this.SaveEnable = false;
      }
    } else {
      this.sumup();
      this.commonServices.presentToast("Amount must be entered");
      event.focus();
      this.SaveEnable = false;
    }
  }

  sumup() {
    this.TotalCurrentSalesB = "0";
    this.TotalCurrentSalesA = "0";
    this.TotalCurrentReadingsA = "0";
    this.TotalCurrentReadingsB = "0";
    for (var i = 0; i < this.AddPaymentMode.length; i++) {
      this.TotalCurrentSalesB = (
        parseFloat(this.TotalCurrentSalesB) +
        parseFloat(this.AddPaymentMode[i].PaymentAmountB)
      )
        .toFixed(2)
        .toString();
      this.TotalCurrentSalesA = (
        parseFloat(this.TotalCurrentSalesA) +
        parseFloat(this.AddPaymentMode[i].PaymentAmountA)
      )
        .toFixed(2)
        .toString();
      this.TotalCurrentReadingsA = (
        parseFloat(this.TotalCurrentReadingsA) +
        parseFloat(this.AddPaymentMode[i].PaymentQuantityA)
      )
        .toFixed(2)
        .toString();
      this.TotalCurrentReadingsB = (
        parseFloat(this.TotalCurrentReadingsB) +
        parseFloat(this.AddPaymentMode[i].PaymentQuantityB)
      )
        .toFixed(2)
        .toString();

      this.TotalCashSalesA = (
        parseFloat(this.TotalSalesA) - parseFloat(this.TotalCurrentSalesA)
      )
        .toFixed(2)
        .toString();
      this.TotalCashSalesB = (
        parseFloat(this.TotalSalesB) - parseFloat(this.TotalCurrentSalesB)
      )
        .toFixed(2)
        .toString();
    }
  }

  checkout() {
    this.oldvalue = "";
  }

  FetchDSASubmittedData() {
    var StationCode = JSON.parse(localStorage.getItem("globalDetail"))[0]
      .StationCode;
    this.commonServices
      .post("FetchDSASubmittedData", {
        StationId: this.selectedStation,
        CDate: this.detailsStation.SummeryDate,
        StationCode: StationCode,
      })
      .subscribe(
        (resp: any) => {
          var arr: any = [];
          const data1 = JSON.parse(resp);
          console.log(data1);
          if (data1 != "") {
            arr = data1.Table;
            console.log(arr);
            this.popupDate = this.dp.transform(
              this.detailsStation.SummeryDate,
              "dd-MMM-yyyy"
            );
            this.commonServices.LockDate = this.popupDate;

            if (this.IsTimeOverlocal == true) {
              // this.SubmittedBySOPFlag = true;
              // this.commonServices.lockUnlock.emit(false);
              return;
            }
            if (arr.length == 0) {
              this.SubmittedBySOPFlag = false;
              this.commonServices.lockUnlock.emit(false);
              // this.commonServices.lockUnlockDispenserEntry.next(false);
            } else if (arr[0].IsSubmittedBySOP == 1) {
              // this.SubmittedBySOPFlag = true;
              // this.commonServices.lockUnlock.emit(false);
            } else {
              this.SubmittedBySOPFlag = false;
              this.commonServices.lockUnlock.emit(false);
              // this.commonServices.lockUnlockDispenserEntry.next(false);
            }
          }
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
        }
      );
  }

  requestOTP() {
    console.log("Hello");
    this.enterOtpfields = true;
    var StationCode = JSON.parse(sessionStorage.getItem("globalDetail"))[0]
      .StationCode;
    this.commonServices
      .post("AuthenticationMail", {
        CDate: this.detailsStation.SummeryDate,
        StationCode: StationCode,
        IsStationSubmitted: 0,
      })
      .subscribe(
        (resp: any) => {
          var arr: any = [];
          const data1 = JSON.parse(resp);
          console.log(data1);
          if (data1 != "") {
            arr = data1.Table;
            console.log(arr);
            this.successMessage = true;
            this.validotp = arr[0].OTP;
          }
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
        }
      );
  }

  confirmOtp() {
    console.log(this.enteredotp);
    if (this.enteredotp == this.validotp) {
      var obj = {
        CDate: this.detailsStation.SummeryDate,
        StationCode: JSON.parse(sessionStorage.getItem("globalDetail"))[0]
          .StationCode,
        IsStationSubmitted: 0,
        LockUnlockStatus: 1,
        // ShiftId : this.LockUnlockShiftId,
        LockUnlockDate: this.detailsStation.SummeryDate,
      };
      var StationCode = JSON.parse(sessionStorage.getItem("globalDetail"))[0]
        .StationCode;
      this.commonServices.post("updateDSAFlag", obj).subscribe(
        (resp: any) => {
          var arr: any = [];
          const data1 = JSON.parse(resp);
          console.log(data1);
          this.SubmittedBySOPFlag = false;
          this.commonServices.lockUnlock.emit(false);
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
        }
      );
    } else {
      this.commonServices.presentToast("Please enter Valid OTP");
    }
  }

  requestPopup() {
    this.enteredotp = "";
    this.successMessage = false;
    this.enterOtpfields = false;
  }
}
