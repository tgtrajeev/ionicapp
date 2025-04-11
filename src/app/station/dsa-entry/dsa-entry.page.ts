import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dsa-entry',
  templateUrl: './dsa-entry.page.html',
  styleUrls: ['./dsa-entry.page.scss'],
})
export class DsaEntryPage implements OnInit {
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: string;
  ArmADetailSec: boolean = false;
  flagAramA: number = 0;
  ArmBDetailSec: boolean = false;
  flagAramB: number = 0;
  IsStatusGet: boolean = false;
  RegionList: any[];
  StationList: any[];
  Summary: any[];
  dispenserList: any[];
  MoStationList: any[];
  lowerDetLeft: any[];
  lowerDetCenter: any[];
  DisNonDicSmmry: any[];
  RateDetails: any[];
  selectedRegion = 0;
  selectedStation = 0;
  SummeryDate = '';
  Cdate = '';
  CdateTime: any = new Date();
  MoUserId: string = '';
  LockUnlock: boolean;
  LockUnlockCaption: string = '';
  DepartmentCode: string = localStorage.getItem('DepartmentCode');
  sideBarIsOpened = false;
  MySummaryDate = '';
  ForRate = '';
  ForDiscountedRate = '';
  stationName: string = "";
  CompanyName: string = '';
  submittedFlag: boolean = false;
  enterOtpfields: boolean = false;
  enteredotp: string = "";
  validotp: string = "";
  popupDate: string = "";
  successMessage: boolean = false;
  RegionName: string = "";
  currentStationName: string = "";
  SapCode: string = "";
  IsDropdownDisable: boolean = true;
  hoursLeft: number = 1;
  minutesLeft: number = 59;
  secondsLeft: number = 60;
  interval: any;
  CurrentTime: any;
  IsTimerStart: boolean = false;
  SkipedSeconds: any;
  IsShiftComplete: boolean = false;
  IsShiftIdComplete: number;
  CompleteShiftId: number;
  pageFlag: string;
  secondMaxDate: any = new Date().toISOString();
  CompanyId: string = '';
  isButtonDisplay: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.MoUserId = localStorage.getItem('UID');
    localStorage.setItem("UserId", this.MoUserId);
    console.log(typeof (this.secondMaxDate));

    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.geteDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      //New Comment Date Issue 
      // let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
      // this.geteDate.selcteddate = latest_date;
      // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');

      //this.geteDate.selcteddate=this.DPREntryDateTime;
      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      // this.geteDate.selcteddate = this.DPREntryDateTime;
      // localStorage.setItem("SummeryDate", this.geteDate.selcteddate);
      localStorage.setItem("SummeryDate", this.dp.transform(this.DPREntryDateTime, 'dd-MMM-yyyy'));

    }
    this.GetBasicSummerData();
    // this.getSummaryHO();
    // this.riDateFetchStationEntry();

    this.pageFlag = this.activatedroute.snapshot.paramMap.get('flag');
    if (this.pageFlag == 'dsaStationSummary') {
      this.router.navigate(['dsa-summary', { flag: 'dsaStationSummary' }]);
    }

  }

  ngOnInit() {
    if (this.DepartmentCode == 'HO' || this.DepartmentCode == 'CO' || this.DepartmentCode == 'MO')
      this.IsDropdownDisable = false
    else
      this.IsDropdownDisable = true

    if (JSON.parse(localStorage.getItem("globalDetail"))[0] == undefined) {
      this.stationName = JSON.parse(localStorage.getItem("globalDetail")).Name;
    }
    else {
      this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].UserName;
    }
   
  }

  GetStationCompany() {
    this.commonServices.post('CommonGetData',{ Flag: 'CompanyByStation', Id: this.selectedStation, Status: 1 }).subscribe(
      (resp: any) => {
        this.CompanyName = JSON.parse(resp).Table[0].CompanyName;
        this.CompanyId = JSON.parse(resp).Table[0].CompanyId;
        console.log(this.CompanyName, 'Company');
        this.CheckCompany();
      },
      (error) => {
        alert("Something went wrong.");
      }
    )
  }

  CheckCompany() {
    if (this.CompanyId == '1' || 
      this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' || this.CompanyId == '9' ||
      this.CompanyId == '10' || this.CompanyId == '11') {
      this.isButtonDisplay = false;
    }
    else {
      this.isButtonDisplay = true;
    }
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
  armACollapse() {
    if (this.flagAramA == 0) {
      this.ArmADetailSec = true;
      this.flagAramA = 1;
    }
    else {
      this.ArmADetailSec = false;
      this.flagAramA = 0;
    }
  }
  armBCollapse() {
    if (this.flagAramB == 0) {
      this.ArmBDetailSec = true;
      this.flagAramB = 1;
    }
    else {
      this.ArmBDetailSec = false;
      this.flagAramB = 0;
    }
  }

  riDateFetchStationEntry() {

    // this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", {
      Id: this.selectedStation, Flag: 'validatePopup',
      Status: this.SummeryDate
    }).subscribe(
      (resp: any) => {
        // this.commonServices.loadingDismiss();
        const data = JSON.parse(resp);
        console.log(data);
        if (data.Table[0].Msg == 'Allow') {
          this.geteDate.selcteddate = this.DPREntryDateTime;
          if (this.dispenserList.length != 0) {
            //   this.sideBarIsOpened = ! this.sideBarIsOpened;
            //   if(this.sideBarIsOpened){
            //   this.objDbServ.StationDetails.emit({
            //     StationId:this.selectedStation,
            //     SummeryDate:this.MySummaryDate,
            //     UserId:this.MoUserId
            //   });
            //   this.objDbServ.ShiftDetails.emit({
            //     ShiftId:'-1',
            //     SubShiftId:'-1',
            //     ActiveTab:"Dispenser"
            //   });
            // }

            // this.router.navigate(['dsa-entry-detail']);
            this.commonServices.presentToast('Dispenser Available');
          }
          else {
            this.commonServices.presentToast('No Dispenser Available');
          }
          this.getSummaryHO();
        }
        else {
          this.commonServices.presentToast(data.Table[0].Msg);
          var riDateStation = data.Table[0].Msg.split("for ");
          console.log("riDateStation" + riDateStation);
          var mriDate = new Date(riDateStation[1]);
          //this.secondMaxDate = mriDate.toISOString();
          this.getSelectedDate(riDateStation[1]);

        }

      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        //  this.commonServices.loadingDismiss();
      }
    )
    // {StationId:this.selectedStation,
    //   SummeryDate:this.geteDate.selcteddate,
    // UserId:this.MoUserId}
    // this.router.navigate(['dsa-entry-detail']);
  }
  dsaEntryDetailRedirect() {
    const obj = {
      Id: this.selectedStation, Flag: 'validatePopup',
      Status: this.SummeryDate
    }
    // this.commonServices.presentToast(obj.Status + obj.Id);
    this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", {
      Id: this.selectedStation, Flag: 'validatePopup',
      Status: this.SummeryDate
    }).subscribe(
      (resp: any) => {
        this.commonServices.loadingDismiss();
        const data = JSON.parse(resp);
        // this.commonServices.presentToast(JSON.stringify(data.Table[0]));
        if (data.Table[0].Msg == "Allow") {
          this.geteDate.selcteddate = this.DPREntryDateTime;
          if (this.dispenserList.length != 0) {
            //   this.sideBarIsOpened = ! this.sideBarIsOpened;
            //   if(this.sideBarIsOpened){
            //   this.objDbServ.StationDetails.emit({
            //     StationId:this.selectedStation,
            //     SummeryDate:this.MySummaryDate,
            //     UserId:this.MoUserId
            //   });
            //   this.objDbServ.ShiftDetails.emit({
            //     ShiftId:'-1',
            //     SubShiftId:'-1',
            //     ActiveTab:"Dispenser"
            //   });
            // }
            this.router.navigate(['dsa-entry-detail']);
          }
          else {
            this.commonServices.presentToast('No Dispenser Available');
          }
        }
        else {
          // this.commonServices.presentToast(data.Table[0].Msg);
        }
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        this.commonServices.loadingDismiss();
      }
    )
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
    // let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();

    // this.geteDate.selcteddate = latest_date;
    //New Comment Date Issue 
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    //this.geteDate.selcteddate=this.DPREntryDateTime;
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.DPREntryDateTime;
    this.SummeryDate = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    //New Comment  Date Issue  
    // this.SummeryDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.SummeryDate = new Date(datePicker).toLocaleDateString();
    // this.GetBasicSummerData();
    // localStorage.setItem("SummeryDate", this.geteDate.selcteddate);
    localStorage.setItem("SummeryDate", this.dp.transform(this.geteDate.selcteddate, 'dd-MMM-yyyy'));

    this.getSummaryHO();

  }
  onStationSelect() {
    setTimeout(() => {
      this.getSummaryHO();
    });
  }
  FetchDSASubmittedData() {
    var StationCode = JSON.parse(localStorage.getItem("globalDetail"))[0].StationCode;
    this.commonServices.FetchDSASubmittedData({ StationId: this.selectedStation, 
      CDate: this.SummeryDate, StationCode: StationCode }).subscribe(
      (resp: any) => {
        var arr: any = [];
        const data1 = JSON.parse(resp);
        console.log(data1);
        if (data1 != '') {
          arr = data1.Table;
          console.log(arr);
          this.popupDate = this.dp.transform(this.SummeryDate, 'dd-MMM-yyyy');
        }
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
      }
    )
  }

  GetBasicSummerData() {
    this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", { Id: this.MoUserId, Flag: 'SummeryFlag' })
      .subscribe(
        (resp: any) => {
          this.Cdate = JSON.parse(resp).Table2[0].Cdate;
          console.log(this.Cdate, 'Cdate');
          this.DepartmentCode = JSON.parse(resp).Table2[0].DepartmentCode;
          this.SummeryDate = this.Cdate;
          this.RegionList = JSON.parse(resp).Table;
          this.RegionName = this.RegionList[0].RegionName;
          console.log(this.DepartmentCode, "DepartmentCode");
          this.selectedRegion = JSON.parse(resp).Table[0].RegionId;
          this.StationList = JSON.parse(resp).Table1;
          console.log(this.StationList, 'Sapcode');
          this.currentStationName = this.StationList[0].StationName;
          this.SapCode = this.StationList[0].SapCode;
          console.log(this.currentStationName);
          this.selectedStation = JSON.parse(resp).Table1[0].StationId;
          localStorage.setItem("StationId", JSON.stringify(this.selectedStation));
          //this.FetchDSASubmittedData();
          this.riDateFetchStationEntry();
          setTimeout(() => {
            this.getSummaryHO();
            this.GetStationCompany();
          });
          this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      )
  }

  onRegionSelect() {
    //this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", {
      Id: this.selectedRegion, Flag: 'StationByRegionId',
      Status: this.MoUserId, ReportFlag: this.DepartmentCode
    }).subscribe(
      (resp: any) => {
        this.StationList = JSON.parse(resp).Table;
        if (JSON.parse(resp).Table != undefined) {
          this.selectedStation = JSON.parse(resp).Table[0].StationId;
        }

        //   setTimeout(() => {
        this.getSummaryHO();
        //   });
        // this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        // this.commonServices.loadingDismiss();
      }
    )
  }

  getSummaryHO() {
    this.sideBarIsOpened = false;
    // this.commonServices.loadingPresent();
    this.commonServices.post("getSummaryHO", { StationId: this.selectedStation, 
      EntryDate: this.SummeryDate }).subscribe(
      (resp: any) => {
        this.commonServices.loadingDismiss();
        this.dispenserList = JSON.parse(resp).Table;
        this.Summary = JSON.parse(resp).Table1;
        //this.LockUnlock = ((JSON.parse(resp).Table2[0].LockFlag == 0)?true:false);
        this.FetchDSASubmittedData();
        // this.riDateFetchStationEntry();
        this.MySummaryDate = JSON.parse(resp).Table2[0].SummaryDate
        //Lower detail for Left side
        this.lowerDetLeft = JSON.parse(resp).Table3;
        //Lower detail for center side
        //this.RateDetails = JSON.parse(resp).Table2[0];
        this.ForRate = JSON.parse(resp).Table2[0].Rate;
        this.ForDiscountedRate = JSON.parse(resp).Table2[0].DisountedRate;
        this.DisNonDicSmmry = JSON.parse(resp).Table4;
        //  this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        // this.commonServices.loadingDismiss();
      }
    )
  }

  getReadingByDispName(DispName: string, SumRow: any[], DispSide: string) {
    for (let i = 0; i < Object.keys(SumRow).length; i++) {
      if (DispName == Object.keys(SumRow)[i].split('_##_')[0]) {
        if (DispSide == '_ArmA')
          return Object.values(SumRow)[i];
        else if (DispSide == '_ArmB')
          return Object.values(SumRow)[i + 1];
      }
    }
  }
}