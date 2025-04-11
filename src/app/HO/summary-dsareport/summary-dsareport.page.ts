import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { saveAs } from 'file-saver';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-summary-dsareport',
  templateUrl: './summary-dsareport.page.html',
  styleUrls: ['./summary-dsareport.page.scss'],
})
export class SummaryDSAReportPage implements OnInit {
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  items: any;
  StationList: any[];
  stCodeMy: "";
  stCodeMyDummy: "";
  selectedStationId = 0;
  StationCode: string = '';
  dateFrom: string;
  dateTo: string;
  dsaData = { selcteddate: "" }
  currentdate: any;
  currDate: any;
  secondMaxDate: any = new Date().toISOString();
  DateFromMy: any = new Date().toISOString().split('T')[0];
  stationName: string = "";
  DispenserTableRes: any = [];
  stationReportData: any = [];
  DispensarTable1: any = [];
  DispensarTable2: any = [];
  DispensarTable3: any = [];
  DispensarTable4: any = [];
  DispensarTable5: any = [];
  DispensarTable6: any = [];


  constructor(private formBuilder: FormBuilder, private menu: MenuController, private router: Router, public datepipe: DatePipe,
    private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.dsaData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate);
      const dt = new Date(this.currDate);
      this.dsaData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');

    }
    this.dateFrom = this.dsaData.selcteddate;
    this.dateTo = this.dsaData.selcteddate;
  }

  ngOnInit() {
    this.getStationList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  OnDateChnagefrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    //IOS Comment
    // self.dateFrom = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.dateFrom = this.datepipe.transform(dt, 'yyyy/MM/dd');
    // self.checkdifference(self.dateFrom, self.dateTo);
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);
    //IOS Comment
    // self.dateTo = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.dateTo = this.datepipe.transform(dt, 'yyyy/MM/dd');
    // self.checkdifference(self.dateFrom, self.dateTo);
  }

  getStationList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData",
      { Id: 0, CompanyId: 0, ReportFlag: 'HO', Flag: 'GetAllStationsForDSA', Status: '', UserId: 1 }).subscribe((res: any) => {
        var packageRes = JSON.parse(res).Table;
        if (packageRes != "" && packageRes != undefined && packageRes != null) {
          //   self.StationList = packageRes.Table1;
          //   self.items = self.StationList;
          //   console.log(self.StationList);
          this.StationList = JSON.parse(res).Table;
          self.items = self.StationList;
          this.stCodeMy = this.StationList[0].StationName;
          this.stCodeMyDummy = this.StationList[0].StationName;
          this.StationCode = this.StationList[0].StationCode;
          this.selectedStationId = this.StationList[0].StationId;
          // this.GetReadingbyShift(this.StationList[0].StationId);

          this.stationViewData();
        }
        else {
          self.commonServices.presentToast("Something went wrong.");
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })


  }

  filterBoxShow(itm) {
    if (this.filterBoxFlag == 0) {
      this.fiterBox = true;
      this.filterBoxFlag = 1;
    }
    else {
      this.fiterBox = false;
      this.filterBoxFlag = 0;
      // if (this.packlist != null && this.pageFlag == 'updatepage') {
      //   this.packlist.StationName = itm.StationName;
      //   this.packlist.StationCode = itm.StationCode;
      // }
      // else {
      //   this.addupdateForm.value.StationCode = itm.StationCode;
      //   this.addupdateForm.value.StationName = itm.StationName;
      //   this.packlist = 0;
      // }
      // this.updatepackage();
      this.stCodeMy = itm.StationName;
      this.selectedStationId = itm.StationId;
      // this.GetReadingbyShift(this.selectedStation);
      this.StationCode = itm.StationCode;
      console.log(this.stCodeMy);
    }
  }

  onSearchTerm(ev: any) {
    this.items = this.StationList;
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(term => {
        return term.StationName.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

  stationViewData() {
    const obj = {
      StationId: this.selectedStationId,//this.glovalJson[0].prm_id,
      EntryDateFrom: this.dateFrom,
      EntryDateTo: this.dateTo
    };
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("getSummaryHOForAdmin", obj).subscribe((res: any) => {
      this.stCodeMyDummy = this.stCodeMy;
      this.DispenserTableRes = JSON.parse(res);
      console.log("chh", this.DispenserTableRes);
      this.DispensarTable3 = JSON.parse(res).Table;
      //this.DispensarTable4 = JSON.parse(res).Table3;
      this.DispensarTable5 = JSON.parse(res).Table1;
      //this.DispensarTable6 = JSON.parse(res).Table5;
      // this.stationName = "";
      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })
  }
  
  ExportToPdf(){
    const obj = {
      StationId: this.selectedStationId,//this.glovalJson[0].prm_id,
      EntryDateFrom:this.dateFrom,
      EntryDateTo:this.dateTo,
      StationCode : this.StationCode
    };
    this.commonServices.post('DispenserSummaryPDF_ForAdmin', obj).subscribe(
      (resp: any) => {
        console.log(resp);
        const data = JSON.parse(resp);
        if(data != 'No Data Available') {

        
          console.log(data+ 'response');
          var PdfUrl:string="";
          PdfUrl = this.commonServices.baseUrl.substring(0,this.commonServices.baseUrl.length-4)+JSON.parse(resp);
          console.log(PdfUrl,'pdf');
          window.location.href = this.commonServices.baseUrl.substring(0,this.commonServices.baseUrl.length-4)+JSON.parse(resp);
          // const FileSaver = require('file-saver');
          // FileSaver.saveAs(PdfUrl);
        }
        else {
          alert(data);
        }
        this.commonServices.loadingDismiss();
      },
      (error) => {alert("Something went wrong.");}
    )
  }  
}
