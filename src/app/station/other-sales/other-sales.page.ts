import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NavController, AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import { MenuController } from "@ionic/angular";
import { isNullOrUndefined, isUndefined } from "util";
import { DatePipe } from "@angular/common";
import { IssueLogModalPage } from "src/app/HO/redirected_pages/issue-log-modal/issue-log-modal.page";
declare var $: any;

@Component({
  selector: "app-other-sales",
  templateUrl: "./other-sales.page.html",
  styleUrls: ["./other-sales.page.scss"],
})
export class OtherSalesPage implements OnInit {
  // @ViewChild('userPhoto') userPhoto: ElementRef;
  // @ViewChild('inputFile', { static: true }) InputFileVar;
  // @ViewChild('myInput')
  // myInputVariable: ElementRef;
  @ViewChild('myInput', { static: true }) InputFileVar;
  imageTextName:any ='';
  detailsStation: { StationId: string; SummeryDate: string; UserId: string };
  StationShift = { ShiftId: "-1", SubShiftId: "-1", ActiveTab: "Other" };
  SaveEnable: boolean = true;
  selectedShiftId: string = "-1";
  selectedSubShiftId: string = "";
  selectedDispenserId: string;
  selectedStationId: string;
  selectedPaymentModeId: string;
  selectedPaymentMode: string;
  selectedPaymentAmount: string;
  UserIdCook: string = "";
  listDispensers: {}[];
  cmbShiftData: {}[];
  AddPaymentMode: { PaymentModeId; PaymentMode; PaymentAmount }[];
  CreditPartySale = "0.00";
  CreditCardSale = "0.00";
  PrepaidCardSale = "0.00";
  PaytmSale = "0.00";
  PrepaidCardLoading = "0.00";
  PrepaidCardActivations = "0.00";
  OtherSale = "0.00";
  CashSale = "0.00";
  LubeSale = "0.00";
  TotalReadings = "0.0000";
  TotalSales = "0.00";
  CurrentRate = "0.00";
  showNext: boolean = true;
  showPrevious: boolean = true;
  oldvalue: string = "";
  submittedflag: boolean = false;
  selectedStation: number;
  SummeryDate: string;
  UserId: string;
  onselectedStation: string;
  customAlertOptions: any = {
    // header: "Cluster",
    subHeader: "Select your cluster",
    // message: "Cluster",
    translucent: true,
  };
  NoOfClusterBus: string = "";
  SaleQty: string = "";
  CompanyClusterList = [];
  selectedItems = [];
  dropdownSettings = {};
  uploadedfilereset: File;
  ModalName: string = "";
  DocumentImagePath: string = "";
  DocResetPopup: boolean = false;

  // uploadedfilereset: File;
  Issuelogfiles: File;
  subscription: any;
  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public commonServices: ApiService,
    private menu: MenuController,
    private dp: DatePipe,
    public modalController: ModalController
  ) {
    this.commonServices.MasterCompDisplay.emit(true);

    this.SummeryDate = localStorage.getItem("SummeryDate");
    this.UserId = localStorage.getItem("UserId");
    this.onselectedStation = localStorage.getItem("StationId");
    this.toggleSideBar();

    this.StationShift = this.StationShift;
    this.selectedShiftId = this.StationShift.ShiftId;
    this.selectedSubShiftId = this.StationShift.SubShiftId;
    setTimeout(() => {
      this.GetDataByShift();
    }, 1000);

    this.subscription =    this.commonServices.StationDetails.subscribe(
      (test: { StationId: string; SummeryDate: string; UserId: string }) => {
        this.detailsStation = test;
        console.log("detailsStation", this.detailsStation);
      }
    );
    this.commonServices.lockUnlock.subscribe((value) => {
      this.submittedflag = value;
    });
    this.GetCompanyClusterList();
  }
  ngOnInit() {
    this.selectedStation = Number(localStorage.getItem("StationId"));
    // this.InputFileVar.value = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  openFirst() {
    this.menu.enable(true, "menuStn");
    this.menu.open("menuStn");
  }

  toggleSideBar() {
    // this.commonServices.loadingPresent();
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
            this, this.commonServices.presentToast(data.Table[0].Msg);
          }
          // this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          // this.commonServices.loadingDismiss();
        }
      );
  }

  onSelectShift(shiftId: string) {
    this.selectedShiftId = shiftId;
    setTimeout(() => {
      this.GetDataByShift();
    }, 5000);
  }

  GetDataByShift() {
    // this.commonServices.loadingPresent();
    this.commonServices
      .post("GetOtherPaymentByShift", {
        StationId: this.detailsStation.StationId,
        EntryDate: this.detailsStation.SummeryDate,
        ShiftId: this.selectedShiftId,
        UserId: this.detailsStation.UserId,
      })
      .subscribe(
        (resp: any) => {
          // this.commonServices.loadingDismiss();
          this.AddPaymentMode = JSON.parse(resp).Table;
          this.cmbShiftData = JSON.parse(resp).Table1;
          this.selectedShiftId = JSON.parse(resp).Table2[0].ShiftId;
          console.log("test1", JSON.parse(resp).Table3.length);
          if (JSON.parse(resp).Table3.length != 0) {
            this.NoOfClusterBus = JSON.parse(resp).Table3[0].NoOfClusterBus;
            this.SaleQty = JSON.parse(resp).Table3[0].SaleQty;
            this.DocumentImagePath =
              this.commonServices.apiImageAttachment + "/Attachments/" +
              JSON.parse(resp).Table3[0].ImagePath;
              this.InputFileVar.value = JSON.parse(resp).Table3[0].ImagePath;
              // this.InputFileVar.el.title = JSON.parse(resp).Table3[0].ImagePath;
            this.imageTextName = JSON.parse(resp).Table3[0].ImagePath;
          } else {
            this.NoOfClusterBus = "";
            this.SaleQty = "";
            this.DocumentImagePath =
              this.commonServices.apiImageAttachment + "/Attachments/";
              this.InputFileVar.value = '';
              // this.InputFileVar.el.title = '';
              this.imageTextName = '';
          }
          this.selectedItems = JSON.parse(resp).Table4;
          console.log("Table 4"+JSON.parse(resp).Table4);
          // this.selectedItems = [
          //   {
          //     id: 2,
          //     name: "ANTONY ROAD TRANSPORT SOLUTIONS",
          //     Status: "Active",
          //     Create_Date: "2021-01-21T13:54:15.79",
          //     Modify_Date: "2021-02-19T09:51:19.25",
          //     SAPCode: "1462",
          //   },
          
          //   {
          //     id: 6,
          //     name: "District Supply Officer(GBN)",
          //     Status: "Active",
          //     Create_Date: "2021-01-21T13:54:15.79",
          //     Modify_Date: "2021-01-21T13:54:15.79",
          //     SAPCode: "3237",
          //   },
          // ];
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          // this.commonServices.loadingDismiss();
        }
      );
  }

  checkout() {
    this.oldvalue = "";
  }

  onPayemntEntry(event, PaymentModeId) {
    if (event.value != "") {
      var rx = /^\d+(?:\.\d{1,3})?$/;
      if (rx.test(event.value)) {
        this.oldvalue = event.value;
      } else {
        event.value = this.oldvalue;
      }
    }
    this.selectedPaymentModeId = PaymentModeId;
    this.selectedPaymentAmount = event.value == "" ? "0" : event.value;
    if (this.selectedPaymentAmount != "") {
      if (parseFloat(this.selectedPaymentAmount) >= 0) {
        const Value = this.AddPaymentMode.find(
          (pm) => pm.PaymentModeId === this.selectedPaymentModeId
        );
        Value.PaymentAmount = this.selectedPaymentAmount;
        this.SaveEnable = true;
      } else {
        this.commonServices.presentToast("Amount must be positive");
        event.focus();
        this.SaveEnable = false;
      }
    } else {
      this.commonServices.presentToast("Amount must be entred");
      event.focus();
      this.SaveEnable = false;
    }
  }

  savePayment() {
    var ErrorMsg = this.changeresetValidation();
    if (this.selectedShiftId == "" || this.selectedShiftId == "-1") {
      this.commonServices.presentToast("Please select shift.");
    }     
    else if(ErrorMsg != '' && ErrorMsg != undefined) {
      this.commonServices.presentToast(ErrorMsg);
    }else {
      if (this.SaveEnable) {
        for (var i = 0; i < this.AddPaymentMode.length; i++) {
          if (parseFloat(this.AddPaymentMode[i].PaymentAmount) < 0) {
            this.SaveEnable = false;
            this.commonServices.presentToast(
              "All payment amount must be positive"
            );
            break;
          }
        }
      } else {
        this.commonServices.presentToast("All payment value must be positive");
      }

 var MyJson = {
  StationId: this.detailsStation.StationId,
  EntryDate: this.detailsStation.SummeryDate,
  UserId: this.detailsStation.UserId,
  ShiftId: this.selectedShiftId,
  DispanserPayment: this.AddPaymentMode,
  ClusterCompanyList:this.selectedItems,
  FilePath: localStorage.getItem('LoginId') + "/VoucherImage/",
  NoOfClusterBus:this.NoOfClusterBus,
  SaleQty:this.SaleQty == "" ? "0" : this.SaleQty
    };
    // Attachment: ((this.uploadedfilereset == undefined) ? '' : this.uploadedfilereset.name)
      this.Issuelogfiles = $('#VoucherImageInput');
      var frmData = new FormData();
      var fileInput = this.Issuelogfiles[0];
      frmData.append("jsonDetail", JSON.stringify(MyJson));
      if (this.uploadedfilereset != undefined) {
        console.log(this.uploadedfilereset);
        frmData.append('OtherSaleFile', this.uploadedfilereset, this.uploadedfilereset.name);
      }




      if (this.SaveEnable) {
        // this.commonServices
        // .post("DispenserOtherPaymentCollection", {
        //   StationId: this.detailsStation.StationId,
        //   EntryDate: this.detailsStation.SummeryDate,
        //   UserId: this.detailsStation.UserId,
        //   ShiftId: this.selectedShiftId,
        //   DispanserPayment: this.AddPaymentMode,
        // })
        this.commonServices.loadingPresent();
        this.commonServices.OtherPaymentCollection(frmData)
          .subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              if (data.Table[0].Meaasge.indexOf("transfer") > -1) {
                this.commonServices.presentToast(data.Table[0].Meaasge);
              } else {
                this.commonServices.presentToast(data.Table[0].Meaasge);
                this.GetDataByShift();
              }
              this.commonServices.loadingDismiss();
            },
            (error) => {
              this.commonServices.presentToast("Something went wrong.");
              this.commonServices.loadingDismiss();
            }
          );
      }
    }
  }

  GetCompanyClusterList() {
    const obj = {
      flag: "GetAll",
    };
    console.log(obj);
    this.commonServices.post("GetCompanyClusterList", obj).subscribe(
      (resp: any) => {
        this.CompanyClusterList = JSON.parse(resp).Table;
        console.log("CompanyClusterList", this.CompanyClusterList);
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
      }
    );
  }

  ONClusterChange(evt) {
    var self = this;
    // self.selectedReport = evt.detail.value;
    console.log(evt.detail.value);
    console.log(this.selectedItems);
    self.selectedItems = evt.detail.value;
    console.log(this.selectedItems);
  }

  // compareWith(o1, o2) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

  fileupload(str: any) {
    console.log("issue", str);
    this.uploadedfilereset = str.target.files[0];
    console.log(this.uploadedfilereset);
    // this.imageTextName =  str.target.files[0].name;
  }

  ViewVoucherImage(){
    this.ModalName = "#myModalImage";
}

 changeresetValidation() {
  var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
  var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
  var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
  var imgShow = 'assets/images/attachment.gif';
  var errorMsg = '' ;
  if(this.NoOfClusterBus != '' && this.SaleQty != '')
  {
  if(this.DocumentImagePath == this.commonServices.apiImageAttachment+"/Attachments/" && (this.uploadedfilereset == undefined || this.uploadedfilereset == null))
  {
        errorMsg = 'Please select voucher image'
        return errorMsg;
  }
}
  return errorMsg;
}

async presentModal() {
  const modal = await this.modalController.create({
    component: IssueLogModalPage,
    cssClass: 'my-custom-class1',
    componentProps: {
      previewVar: true,
      heading: 'View Attachement',
      viewattachment: this.DocumentImagePath
    }
  });
  return await modal.present();
}
}