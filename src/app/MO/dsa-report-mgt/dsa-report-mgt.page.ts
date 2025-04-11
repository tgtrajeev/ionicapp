import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dsa-report-mgt',
  templateUrl: './dsa-report-mgt.page.html',
  styleUrls: ['./dsa-report-mgt.page.scss'],
})
export class DsaReportMgtPage implements OnInit {
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
  CompanyList: any[];
  IsRegionSelected: boolean = false;
  IsStationPending: boolean = false;
  IsStationDisable: boolean = false;
  selectedReport: string;
  selectRegion: string;
  selectedRegion = 0;
  selectedStation: string;
  IsDatedisable = false;
  IsStationDisabled = false;
  selectedFilter: string = "All";
  SheetType:string ='All';
  AmtDiff : string = '00.0';

  ReportFlag: string = localStorage.getItem('DepartmentCode');
  dateFrom: string;
  dateTo: string;
  dateRange: boolean = false;
  errorFound: boolean = true;
  selectCompany: string;
  UserId: string = localStorage.getItem('UID');
  dateFromSec:any;
  secondMaxDate: any = new Date().toISOString();;
  DateFromMy: any = new Date().toISOString().split('T')[0];
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute,
    public datepipe: DatePipe, 
    public commonServices: ApiService, private menu: MenuController) {
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
    this.RegionByDept();
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

  RegionByDept() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'StationSubmittedStatusForMO', Id: self.UserId }).subscribe(
      (res: any) => {
        self.RegionList = JSON.parse(res).Table1;
        console.log(this.RegionList);
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.presentToast('Something went wrong.');
        self.commonServices.loadingDismiss();
      }
    )
  }

  onReportSelect() {
    var self = this;
    if (self.ValidationReports()) {
      console.log(self.selectedReport, "selectedReport");
     self.commonServices.loadingPresent();
      const obj =
      {
        DateFrom: this.datepipe.transform(self.dateFrom, 'dd/MMM/yyyy'),
        DateTo: this.datepipe.transform(self.dateTo, 'dd/MMM/yyyy'),
        Flag: self.selectedReport,
       // Region: self.selectRegion,
        Region: (this.selectRegion=='') ? 'All' : this.selectRegion,
        CompanyId: (self.selectCompany == 'All') ? '0' : this.selectCompany,
        SelectedStationId: (self.selectedStation == 'All') ? '0' : this.selectedStation,
        UserId: self.UserId,
        ControlRoomCode: "All",
        DepartmentCode: this.ReportFlag,
        Filter:this.selectedFilter,
        SheetType : this.SheetType,
        ReportType: (this.selectedReport=="PAYMENT RECONCILIATION (2)") ? 3 : 0,
        AmtDiff : this.AmtDiff

      }
      // console.log(self.IsStationPending + 'is station panding');
      // console.log(self.selectedReport + 'is selection report');
      if (self.IsStationPending == true && self.selectedReport == "PENDING STATIONS") {
        self.commonServices.post("ExcelExportDSA", obj).subscribe(
          (resp: any) => {

            if (JSON.parse(resp).errMsg == 'success') {
              window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
              self.commonServices.loadingDismiss();
            }
            else {
              self.commonServices.presentToast(JSON.parse(resp).errMsg);
              self.commonServices.loadingDismiss();
            }

          },
          (error) => {
            self.commonServices.presentToast('Something went wrong.');
            self.commonServices.loadingDismiss();
          }
        )
      } else if (self.IsStationPending == true && self.selectedReport == "EXCEPTIONAL REPORT") {
        self.commonServices.post("ExcelExportDSA", obj).subscribe(
          (resp: any) => {

            if (JSON.parse(resp).errMsg == 'success') {
              window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
              self.commonServices.loadingDismiss();
            }
            else {
              self.commonServices.presentToast(JSON.parse(resp).errMsg);
              self.commonServices.loadingDismiss();
            }

          },
          (error) => {
            self.commonServices.presentToast('Something went wrong.');
            self.commonServices.loadingDismiss();
          }
        )
      } else if (this.IsStationPending == true && this.selectedReport == "DSA SUBMISSION REPORT") {
        self.commonServices.post("ExportDSASubmissionReport", obj).subscribe(
          (resp: any) => {
           
            console.log(resp);
            if (JSON.parse(resp).errMsg == 'success') {
              window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" +
                JSON.parse(resp).FileName
              self.commonServices.loadingDismiss();
            }
            else {
              self.commonServices.presentToast(JSON.parse(resp).errMsg);
              self.commonServices.loadingDismiss();
            }

          },
          (error) => {
            self.commonServices.presentToast('Something went wrong.');
            self.commonServices.loadingDismiss();
          }
        )
      }
      else if (this.IsStationPending == true && this.selectedReport == "STATION OPERATOR SUBMISSION REPORT") {
        self.commonServices.post("ExportSOPSubmissionReport", obj).subscribe(
          (resp: any) => {

            if (JSON.parse(resp).errMsg == 'success') {
              window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" +
                JSON.parse(resp).FileName
              self.commonServices.loadingDismiss();
            }
            else {
              self.commonServices.presentToast(JSON.parse(resp).errMsg);
              self.commonServices.loadingDismiss();
            }

          },
          (error) => {
            self.commonServices.presentToast('Something went wrong.');
            self.commonServices.loadingDismiss();
          }
        )
      }
      else {
        if (self.IsRegionSelected == false) {
          if (self.dateFrom != null && self.dateTo != null && self.selectedReport != null && self.selectedReport != "")//&& this.selectRegion != null
          {
           // self.commonServices.post("ExcelExportDSA", obj).subscribe( // before line after update
            self.commonServices.post("ExcelExportCashRecon", obj).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                // console.log(data);
                if (data.FileName != '') {
                //  alert('file name');
                  if (JSON.parse(resp).errMsg == 'success') {
                    // alert('inneer sucess');
                    window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                    self.commonServices.loadingDismiss();
                    
                  }
                  else {
                    self.commonServices.presentToast(JSON.parse(resp).errMsg)
                    self.commonServices.loadingDismiss();
                  }
                }
                else {
                  self.commonServices.presentToast('No Report Data Found');
                  self.commonServices.loadingDismiss();

                }
              },
              (error) => {
                self.commonServices.presentToast('Something went wrong.');
                self.commonServices.loadingDismiss();

              }
            )
          }
          else {
            self.commonServices.presentToast('Please select Report.');
            self.commonServices.loadingDismiss();

          }
        }
        else {
          if (self.dateFrom != null && self.dateTo != null && self.selectedReport != null) {
            self.commonServices.post("ExcelExportDSA", obj).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                if (data.FileName != '') {
                  if (JSON.parse(resp).errMsg == 'success') {
                    window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                    self.commonServices.loadingDismiss();

                  }
                  else {
                    self.commonServices.presentToast(JSON.parse(resp).errMsg)
                    self.commonServices.loadingDismiss();

                  }
                }
                else {
                  self.commonServices.presentToast('No Report Data Found.');
                  self.commonServices.loadingDismiss();

                }
              },
              (error) => {
                self.commonServices.presentToast('Something went wrong.');
                self.commonServices.loadingDismiss();

              }
            )
          }
          else {
            self.commonServices.presentToast('Please select Report.');
            self.commonServices.loadingDismiss();
          }
        }
      }
    }

  }
  
//   MailSentCashRecon() {
    
//     var temparray:any=[];
//     temparray = this.ResponseList.filter(obj => obj.selected == true);
//     console.log(temparray, "SelectedData");
         
//     if (temparray.length == 0) {
//       alert('Please Select altleast one Station.');
//       return false;
//     }
//     console.log(this.dateFrom, "Casgdate");
//     var stJson = [];
//     temparray.forEach(element => {
//       stJson.push({
//             StationName: element.StationName,
//             SapCode: element.SapCode,
//             StationCode: element.StationCode      
//         });
//     });

//     const obj = {
//       CashRecoEntryData :stJson,
//       SheetType : this.SheetType,
//       StartDate: this.dateFrom,
//       EndDate: this.dateTo
//     };

//       this.objDbServ.ShowLoaders.emit(true);   
//       this.objDbServ.MailSentCashRecon(obj).subscribe(
//         (resp: any) => {
//             const data= JSON.parse(resp.json()).Table;
//             if(data[0].Mesage=="1") {
//               alert('Mail sent Successfully.!');   
                     
//             }
//             else {
//               alert('Something went wrong.');
//               this.objDbServ.ShowLoaders.emit(false);
//             }
//             this.objDbServ.ShowLoaders.emit(false);
//         },
//         (error) =>{
//           alert('Something went wrong.');
//         this.objDbServ.ShowLoaders.emit(false);
//        }
//     )
//  }  

  onCompanySelect(val) {
    var self = this;
    self.selectCompany = val;
    if (self.selectCompany.length > 0)
      self.onRegionSelect(this.selectRegion, self.selectCompany);
  }

  onRegionSelect(val, CompanyId: string) {
    console.log(val);
    console.log(CompanyId);
    var self = this;
    self.selectRegion = val;
    if (self.selectRegion != "All") {
      self.IsStationDisable = false;
      self.commonServices.post("CommonGetData", {
        Id: this.selectRegion, CompanyId: CompanyId,
        ReportFlag: this.ReportFlag, Flag: 'StationByRegionId', Status: '', UserId: this.UserId
      }).subscribe(
        (resp: any) => {
          self.StationList = JSON.parse(resp).Table;
          console.log(self.StationList);
          if (self.selectCompany == '' || isNullOrUndefined(this.selectCompany)){
            self.GetCompany();
            console.log('inner');}
          else
            self.selectCompany = CompanyId;
            console.log(self.selectCompany);
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

  GetCompany() {
    var self = this;
    if (self.selectCompany != "All") {
      self.IsStationDisable = false;
      self.commonServices.post("CommonGetData", { Id: 0, Flag: 'CompanyByRegion', Status: '', 
      RegionId: this.selectRegion }).subscribe(
        (resp: any) => {
          self.CompanyList = JSON.parse(resp).Table;
          console.log(self.CompanyList);
        },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
        }
      )
    }
    else {
      self.selectCompany = '0';
    }
  }


  onStationSelect(val) {
    var self = this;
    self.selectedStation = val;
    console.log(val);
  }

  
  // filterBoxShow(itm) {
   
  //   this.selectedStation = itm.StationId;
  //   console.log(this.selectedStation);
  // }

  OnReportChnage(val) {
    var self = this;
    self.selectedReport = val.detail.value;
    if (self.selectedReport == "PENDING STATIONS") {
      // self.IsStationPending = true;
      // self.IsRegionSelected = true;
      // self.IsStationDisable = true;
      // self.selectRegion = 'All';
      // self.selectCompany = 'All';
      // self.selectedStation = 'All';
      this.IsDatedisable = true;
      this.IsStationDisabled = true;
    }
    else if (this.selectedReport == "EXCEPTIONAL REPORT") {
      // this.IsStationPending = true;
      // this.IsRegionSelected = true;
      // this.IsStationDisable = true;
      // this.selectRegion = 'All';
      // this.selectCompany='All';
      // this.selectedStation='All';
      this.IsDatedisable = true;
      this.IsStationDisabled = true;

    }
    else if (this.selectedReport == "DSA SUBMISSION REPORT" || this.selectedReport == "STATION OPERATOR SUBMISSION REPORT") {
      this.IsStationPending = true;
      this.IsRegionSelected = true;
      this.IsStationDisable = true;
      this.selectRegion = 'All';
      this.selectCompany = 'All';
      this.selectedStation = 'All';
      this.IsDatedisable = false;
      this.IsStationDisabled = false;
    }
    else {
      self.IsRegionSelected = false;
      self.selectRegion = '';
      self.IsStationDisable = false;
      this.IsDatedisable = false;
      this.IsStationDisabled = false;
    }
  }

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
    // self.dateTo = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.dateTo = this.datepipe.transform(dt,'yyyy/MM/dd');
    self.checkdifference(this.dateFrom, this.dateTo);
  }

  OnDateChnagefromSec(val) {
    var self = this;
    const dt = new Date(val);
    self.dateFromSec = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
  }

  onReportSelectSec() {
    var self = this;
    const obj = { dateFromSec: this.dateFromSec }

    if (self.dateFromSec != null) {
      self.commonServices.loadingPresent();
      self.commonServices.post("ExcelExportDSASec", obj).subscribe(
        (resp: any) => {
          if (JSON.parse(resp).errMsg == 'success') {
            window.location.href = self.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
          }
          else {
            self.commonServices.presentToast(JSON.parse(resp).errMsg);
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
      self.commonServices.loadingDismiss();
    }
  }

  ValidationReports() {
    var self = this;
    var d1 = new Date(Date.parse(this.dateFrom));
    var d2 = new Date(Date.parse(this.dateTo));
    if ((d1 > d2)) {
      self.commonServices.presentToast('From Date cant be greater than To Date.');
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