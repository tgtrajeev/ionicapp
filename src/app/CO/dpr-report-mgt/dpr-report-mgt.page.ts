import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dpr-report-mgt',
  templateUrl: './dpr-report-mgt.page.html',
  styleUrls: ['./dpr-report-mgt.page.scss'],
})
export class DprReportMgtPage implements OnInit {
  dsaData = { selcteddate: "" }
  currentdate: any;
  currDate: any;
  selectedDate: any;
  todayTime: any;
  month: any;
  day: any;
  year: any;
  FulllYear: any;
  latest_date: string;
  RegionList: any[];
  StationList: any[];
  IsRegionSelected: boolean = false;
  selectedReport: string;
  dateFrom: string;
  dateTo: string;
  CurrentDate: string;
  selectedRegion: string = 'All';
  selectedStation: string;
  ReportFlag: string = localStorage.getItem('DepartmentCode');
  dateFromSec:any;
  errorFound: boolean = true;
  IsRegionDisable: boolean = false;
  IsStationDisable: boolean = false;
  IsDatesDisable: boolean = false;
  LoginID: string = 'Admin'; //this.objCook.get('UID');
  ControlRoomCode: any;
  dateRange: boolean = false;
  secondMaxDate: any = new Date().toISOString();
  JMRReportVisibility: boolean = false;
  DateFromMy: any = new Date().toISOString().split('T')[0];
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute,
    public datepipe: DatePipe, public commonServices: ApiService, private menu: MenuController) {

    this.ControlRoomCode = localStorage.getItem('Loginidd');
    if (this.ControlRoomCode.toLowerCase().indexOf('cng') > -1) {
      this.JMRReportVisibility = false;
    }
    else if (this.ControlRoomCode.toLowerCase().indexOf('cr') > -1) {
      this.JMRReportVisibility = true;
    }
    else if (this.ControlRoomCode.toLowerCase().indexOf('admin') > -1) {
      this.JMRReportVisibility = false;
    }
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.dsaData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate);
      const dt = new Date(this.currDate);
// IOS Comment
// this.latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
// this.dsaData.selcteddate = this.latest_date;
        //IOS Add
        this.dsaData.selcteddate = this.datepipe.transform(dt,'yyyy/MM/dd');
    
    }
    this.dateFrom = this.dsaData.selcteddate;
    this.dateTo = this.dsaData.selcteddate;
    this.GetRegionByDept();
    this.commonServices.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  OnDateChnagefrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    //IOS Comment
    // self.dateFrom = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.dateFrom = this.datepipe.transform(dt,'yyyy/MM/dd');
    self.checkdifference(self.dateFrom, self.dateTo);
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);
    //IOS Comment
    // self.dateTo = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.dateTo = this.datepipe.transform(dt,'yyyy/MM/dd');
    self.checkdifference(self.dateFrom, self.dateTo);
  }

  OnReportChnage(evt) {
    var self = this;
    self.selectedReport = evt.detail.value;
    if (self.selectedReport == "DPR") {
      self.IsRegionDisable = true;
      self.IsStationDisable = true;
      self.IsDatesDisable = true;
    }
    else if (self.selectedReport == "PENDING STATIONS") {
      self.IsRegionDisable = true;
      self.IsStationDisable = true;
      self.IsDatesDisable = false;
    }
    else if (self.selectedReport == "JMR REPORT") {
      self.IsRegionDisable = true;
      self.IsStationDisable = true;
      self.IsDatesDisable = false;
    }
    else if (self.selectedReport == "DPR SUBMISSION REPORT") {
      self.IsRegionDisable = true;
      self.IsStationDisable = true;
      self.IsDatesDisable = false;
    }
    else if (self.selectedReport == "CR SUBMISSION REPORT") {
      self.IsRegionDisable = true;
      self.IsStationDisable = true;
      self.IsDatesDisable=false;
    }
    else {
      self.IsRegionDisable = false;
      self.IsStationDisable = false;
      self.IsDatesDisable = false;
    }
  }

  onRegionSelect(val) {
    var self = this;
    self.selectedRegion = val;
    if (self.selectedRegion != "All") {
      self.IsStationDisable = false;
      self.commonServices.postwithservice("GetStationsByAdmin", { ControlRoomCode: self.ControlRoomCode, 
        Region: self.selectedRegion, Flag: self.ReportFlag }).subscribe(
        (resp: any) => {
          self.StationList = JSON.parse(resp).Table;
          //this.selectedStation=JSON.parse(resp).Table[0].StationId;
        },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
        }
      )
    }
    else {
      self.IsStationDisable = true;
    }
  }

  GetRegionByDept() {
    var self = this;
    // self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetDashBoardCO", { LoginId: self.ControlRoomCode }).subscribe(
      (response: any) => {
        const data = JSON.parse(response);
        console.log(data);
        const data2 = data;
        if (data2.Table1.length > 0) {
          self.RegionList = data2.Table1;
          console.log(this.RegionList, "RegionlistDpr");
        }
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.loadingDismiss();
        self.commonServices.presentToast('Something went wrong.');
      }
    );
  }

  onStationSelect(val) {
    var self = this;
    self.selectedStation = val;
  }

  GetExportDPRreports() {
    var self = this;
    if (this.ValidationReports()) {
      const obj = {
        LoginID: self.LoginID,
        ControlRoomCode: self.ControlRoomCode,
        flag: 'Export',
        // FromDate: self.dateFrom,
        // ToDate: self.dateTo,
        FromDate: this.datepipe.transform(self.dateFrom, 'dd/MMM/yyyy'),
        ToDate: this.datepipe.transform(self.dateTo, 'dd/MMM/yyyy'),
        Region: (self.selectedRegion === undefined) ? "" : self.selectedRegion,
        StationId: (self.selectedStation == 'All' || (self.selectedStation) === undefined) ? '0' : self.selectedStation,
        SelectedDate: self.CurrentDate
      }

      if (self.selectedReport == "DPR") {
        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("DprExcel", obj).subscribe(
          (resp: any) => {
            const data = JSON.parse(resp);
            if (JSON.parse(resp).FileName != '') {
              if (JSON.parse(resp).errMsg == 'success') {
                window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
            }
            else {
              self.commonServices.presentToast("No Data found.");
            }
            self.commonServices.loadingDismiss();
          },
          (error) => {
            self.commonServices.presentToast('Something went wrong.');
            self.commonServices.loadingDismiss();
          }
        )
      }
      else if (self.selectedReport == "PENDING STATIONS") {
        self.commonServices.loadingPresent();
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.postwithservice("ExportPendingStation", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg)
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "OPENING CLOSING") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportGetOpeningClosing", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "OPENING");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "REMARK HISTORY") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportRemarkHistory", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportRemarkHistory");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "REJECT STATION HISTORY") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportRejectStationHistory", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportRejectStationHistory");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "JUMP READING") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportJumpReport", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportJumpReport");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "JMR REPORT") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportJMRReport", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportJMRReport");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "DPR SUBMISSION REPORT") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportDPRSubmissionReport", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportDPRSubmissionReport");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
      else if (self.selectedReport == "CR SUBMISSION REPORT") {
        if (self.dateFrom != null && self.dateTo != null) {
          self.commonServices.loadingPresent();
          self.commonServices.postwithservice("ExportCRSubmissionReport", obj).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              console.log(data, "ExportCRSubmissionReport");
              if (data.FileName != '') {
                if (JSON.parse(resp).errMsg == 'success') {
                  window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                }
                else {
                  self.commonServices.presentToast(JSON.parse(resp).errMsg);
                }
              }
              else {
                self.commonServices.presentToast("No Data found.");
              }
              self.commonServices.loadingDismiss();
            },
            (error) => {
              self.commonServices.presentToast('Something went wrong.');
              self.commonServices.loadingDismiss();
            }
          )
        }
        else {
          self.commonServices.presentToast('Please Select Reporting Date.');
        }
      }
    }
  }

  ValidationReports() {
    var self = this;
    this.errorFound = true;
    var d1 = new Date(Date.parse(self.dateFrom));
    var d2 = new Date(Date.parse(self.dateTo));
    if ((d1 > d2)) {
      self.commonServices.presentToast('From Date cant be greater than To Date.');
      self.errorFound = false;
    }
    if (self.selectedReport == "" || isNullOrUndefined(self.selectedReport)) {
      self.commonServices.presentToast('Please select Report.');
      self.errorFound = false;
    }
    return self.errorFound;
  }

  checkdifference(dateFrom, dateTo) {
    var self = this;
    var date1 = new Date(dateFrom);
    var date2 = new Date(dateTo);
    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Time);
    console.log(Difference_In_Days);
    if (Difference_In_Days > 31) {
      self.dateRange = true;
      self.commonServices.presentToast('Please Select Date Range within one month');
    }
    else {
      self.dateRange = false;
    }
  }
}