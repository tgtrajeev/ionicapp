import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { DsaSummaryPreviewModalPage } from '../redirected_pages/dsa-summary-preview-modal/dsa-summary-preview-modal.page';
@Component({
  selector: 'app-dsa-summary',
  templateUrl: './dsa-summary.page.html',
  styleUrls: ['./dsa-summary.page.scss'],
})
export class DsaSummaryPage implements OnInit {
  fileUploadForm: FormGroup;
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: string;

  stationReportData: any = [];
  DispensarTable1: any = [];
  DispensarTable2: any = [];
  DispensarTable3: any = [];
  DispensarTable4: any = [];
  DispensarTable5: any = [];
  DispensarTable6: any = [];
  enterOtpfields: boolean = false;

  DataSalesTable: any = [];
  DataTable3: any = [];
  LoginId: string = localStorage.getItem('LoginCode');
  StationCode: string = localStorage.getItem('stationCode');
  DepartmentCode: string = localStorage.getItem('DepartmentCode');
  glovalJson: any = JSON.parse(sessionStorage.getItem('globalDetail'));
  stationName: string = "";
  selectedStation = 0;
  SummeryDate: string;
  detailsStation: { StationId: string, SummeryDate: string, UserId: string };
  StationShift = { ShiftId: '-1', SubShiftId: '-1', ActiveTab: 'Summary' };
  FinalTotal: any = 0;
  submitFile: File = null;
  submitButton: boolean = true;
  submitButtonBySOP: boolean = true;
  FileName: string = "";
  imgDisplay: boolean = false;
  imgURL: string = "";
  Submitbtn: string = '';
  submittedflag: boolean = false;
  CdateTime: any = new Date();
  SubmittedBySOFlaglocal: boolean = false;
  enteredotp: string = "";
  validotp: string = "";
  popupDate: string = "";
  successMessage: boolean = false;
  selectedShiftId: string = '-1';
  selectedSubShiftId: string = '';

  attchPop: boolean = false;
  attchPopFlag: number = 0;
  UserId: string;
  onselectedStation: string;
  pageFlag: string;

  secondMaxDate: any = new Date().toISOString();
  subscription: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe, public modalController: ModalController) {

    this.pageFlag = this.activatedroute.snapshot.paramMap.get('flag');
    this.SummeryDate = localStorage.getItem('SummeryDate');
    this.UserId = localStorage.getItem('UserId')
    this.onselectedStation = localStorage.getItem('StationId');
    this.toggleSideBar();

    this.commonServices.HeaderDisplay.emit(true);
    this.StationShift = this.StationShift;
    this.selectedShiftId = this.StationShift.ShiftId;
    this.selectedSubShiftId = this.StationShift.SubShiftId;
    setTimeout(() => {
      this.GetReadingbyShift();
      this.CheckShiftSubmitData();
    });

    this.commonServices.SubmittedBySOFlag.subscribe(value => {
      this.SubmittedBySOFlaglocal = value;
      console.log(this.SubmittedBySOFlaglocal, "SubmittedBySOFlag");
    })
    this.subscription = this.commonServices.StationDetails.subscribe(
      (test: { StationId: string, SummeryDate: string, UserId: string }) => {
        this.detailsStation = test;
        console.log(this.detailsStation);
      }
    );
    console.log(this.detailsStation);

    if (this.DepartmentCode == 'SOP')
      this.Submitbtn = 'Final Submit'
    else
      this.Submitbtn = 'Submit'

    this.commonServices.lockUnlock.subscribe(value => {
      this.submittedflag = value;
      console.log(this.submittedflag, "submittedflag");
    })
  }

  ngOnInit() {
    this.selectedStation = Number(localStorage.getItem('StationId'));
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: DsaSummaryPreviewModalPage,
      cssClass: 'modal_container'
    });
    return await modal.present();
  }

  openFirst() {
    if (this.DepartmentCode == 'SOP') {
      this.menu.enable(true, 'menuCO');
      this.menu.open('menuCO');
    }
    else {
      this.menu.enable(true, 'menuStn');
      this.menu.open('menuStn');
    }
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  getSelectedDate(datePicker) {
    console.log("datePicker", datePicker);

    const dt = new Date(datePicker);
    let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
    this.SummeryDate = latest_date;
    this.detailsStation.SummeryDate = latest_date;
    this.GetReadingbyShift();
  }

  toggleSideBar() {
    this.commonServices.post("CommonGetData", { Id: this.onselectedStation, Status: this.SummeryDate, Flag: 'validatePopup' }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        if (data.Table[0].Msg == 'Allow') {
          this.commonServices.StationDetails.emit({
            StationId: this.onselectedStation,
            SummeryDate: this.SummeryDate,
            UserId: this.UserId
          });
          setTimeout(() => {
            this.GetReadingbyShift();
            this.CheckShiftSubmitData();
          }
          );
        }
        else {
          this.commonServices.presentToast(data.Table[0].Msg);
        }
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
      }
    )
  }

  GetReadingbyShift() {
    const obj = {
      StationId: Number(localStorage.getItem('StationId')),
      EntryDate: this.detailsStation.SummeryDate
    };
    this.commonServices.loadingDismiss();
    this.commonServices.loadingPresent();
    this.commonServices.post("getSummaryHO", obj).subscribe(
      (resp: any) => {
        console.log(JSON.parse(resp));
        this.DispensarTable3 = JSON.parse(resp).Table2;
        this.DispensarTable4 = JSON.parse(resp).Table3;
        this.DispensarTable5 = JSON.parse(resp).Table4;
        this.DispensarTable6 = JSON.parse(resp).Table5;
        this.stationName = isNullOrUndefined(this.DispensarTable3[0].StationName) ? '' : this.DispensarTable3[0].StationName;
        this.commonServices.loadingDismiss();
        this.FetchDSASubmittedData();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  checkPendingEntry() {
    var obj = {
      Id: Number(localStorage.getItem('StationId')),
      Status: this.detailsStation.SummeryDate,
      Flag: 'IsFinalEntry'
    }
    this.commonServices.loadingDismiss();
    this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", obj).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        if (data.Table[0].Msg == 'Allow') {
          this.DispenserSummarySubmitted();
        }
        else {
          this.commonServices.presentToast(data.Table[0].Msg);
        }
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        this.commonServices.loadingDismiss();
      }
    )
  }

  DispenserSummarySubmitted() {
    const obj = {
      StationId: Number(localStorage.getItem('StationId')), 
      StationCode: localStorage.getItem('stationCode'),
      CDate: this.detailsStation.SummeryDate,
      IsStationSubmitted: 1,
      Flag: this.DepartmentCode,
      IsSubmittedBySOP: this.DepartmentCode == 'SOP' ? 1 : 0,
      SOPId: this.DepartmentCode == 'SOP' ? localStorage.getItem('UID') : 0
    };

    var frmData = new FormData();
    frmData.append("SubmissionDetails", JSON.stringify(obj));
    console.log(this.submitFile);

    if (this.submitFile != undefined) {
      if (this.validation()) {

        return false;
      }
      frmData.append('file', this.submitFile, this.submitFile.name);
    }

    this.commonServices.DispenserSummarySubmitted(frmData).subscribe(
      (resp: any) => {
        console.log(JSON.parse(resp));
        const data = JSON.parse(resp).Table[0].Msg;
        this.FetchDSASubmittedData();
        this.commonServices.presentToast(data);
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
      }
    )
  }

  uploadImage(str: any) {
    this.submitFile = str.target.files[0];
  }

  FetchDSASubmittedData() {
    var objson = {
      StationId: Number(localStorage.getItem('StationId')),
      StationCode: localStorage.getItem('stationCode'),
      CDate: this.detailsStation.SummeryDate,//this.SummeryDate,
      Flag: this.DepartmentCode,
      SOPId: this.DepartmentCode == 'SOP' ? localStorage.getItem('UID') : 0
    };
    this.commonServices.FetchDSASubmittedData(objson).subscribe(
      (resp: any) => {
        var arr: any = [];
        const data1 = JSON.parse(resp);
        console.log(data1);
        if (data1.Table1.length > 0 || data1.Table2.length > 0) {
          if (JSON.parse(resp).Table1[0].FileName != '' || isNullOrUndefined(JSON.parse(resp).Table1[0].FileName) == false) {
            this.FileName = JSON.parse(resp).Table1[0].FileName;
            this.imgDisplay = true;
            this.imgURL = this.commonServices.baseUrl.substring(0, this.commonServices.baseUrl.length - 4) + "Images/" + this.FileName;
            //this.imgURL = 'http://localhost:56150/Images/offer-icon1.png';
            console.log(this.imgURL);
            localStorage.setItem("imgURL", this.imgURL);
          }
          else {
            this.FileName = '';
            this.imgDisplay = false;
          }
          if (JSON.parse(resp).Table[0].IsStationSubmitted == 1 || JSON.parse(resp).Table[0].IsSubmittedBySOP == 1)
            this.submitButton = false;
          else
            this.submitButton = true;
        }
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
      }
    )
  }

  validation() {
    var errorFlag: boolean = false;
    if (this.submitFile != undefined) {
      const fileName = (',' + this.submitFile.name.split('.')[1] + ',').toLowerCase();
      if (',png,jpeg,jpg,'.indexOf(fileName) == -1) {
        this.commonServices.presentToast('Please select the valid file (png, jpeg, jpg)');
        errorFlag = true;
      }
      else if (this.submitFile.size > 2097152) {
        this.commonServices.presentToast('Please select the file under size limit (2 MB)');
        errorFlag = true;
      }
    }
    return errorFlag;
  }

  CheckShiftSubmitData() {
    this.commonServices.post("CommonGetData", { Id: this.selectedStation, Flag: 'IsShiftEntryComplete', 
    Status: this.CdateTime, ReportFlag: this.DepartmentCode }).subscribe(
      (resp: any) => {
        this.commonServices.IsShiftIdPending = JSON.parse(resp).Table2[0].IsShiftIdPending;
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
      }
    )
  }
}