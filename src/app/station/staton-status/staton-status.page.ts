import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staton-status',
  templateUrl: './staton-status.page.html',
  styleUrls: ['./staton-status.page.scss'],
})
export class StatonStatusPage implements OnInit {
  SelectedShiftId_To:string='';
  SubShiftId_To:string='';
  listData: any = [];
  exportList: any = [];
  ShiftList: any = [];
  SubShiftList: any = [];
  flag: string = '';
  DSMCode: string = '';
  DSMName: string = '';
  errorFound: boolean;
  selectedDSMnameId: string = '';
  errMsg: string = '';
  title: string;
  DSMPopup: boolean = false;
  StatusIsfalse: boolean = false;
  key: string = 'Name';
  reverse: boolean = true;
  filter: string = '';
  Id: string = "0";
  sortingColumn: string = "";
  DSMId: string = "";
  DS: boolean = true;
  Status: string = '';
  selectedStation: string = '';
  StationId: string;
  SelectedShiftId: string = '';
  SubShiftId: string = '';
  Remark: string = '';
  CurrentDate: string = '';
  DateFrom: string;
  DateTo: string;
  StatusFlag: string = 'InActive';
  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  secondMaxDate: any = new Date().toISOString();
  DateFromMy: any = new Date().toISOString().split('T')[0];
  SubShiftList_To: any;

  constructor(private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    const dt = new Date();
    this.CurrentDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    this.DateFrom = new Date().toLocaleDateString();
    this.DateTo = new Date().toLocaleDateString();
    this.StationId = localStorage.getItem('StationId');
  }

  ngOnInit() {
    this.getShift();
    // this.getData();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  getData() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'StationStatus', Id: self.Id, 
    Status: self.StationId }).subscribe(
      (res: any) => {
        self.listData = JSON.parse(res).Table
        console.log(self.listData, "StationStatus");
        self.Id = self.listData[0].Id;
        self.DateFrom = self.listData[0].FromDate;
        self.DateTo = self.listData[0].ToDate;
        self.StatusFlag = self.listData[0].Status;
        self.SelectedShiftId = self.listData[0].ShiftId;
        self.SubShiftId = self.listData[0].SubShiftId;
        self.Remark = self.listData[0].Remark;
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      }
    )
  }

  getShift() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'StationShift', Id: 0, Status: 1 }).subscribe(
      (res: any) => {
        self.ShiftList = JSON.parse(res).Table
        console.log(self.ShiftList, "ShiftList");
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      }
    )
  }

  getSubShift() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'SubShift', Id: self.SelectedShiftId, Status: 1 }).subscribe(
      (res: any) => {
        self.SubShiftList = JSON.parse(res).Table
        console.log(self.SubShiftList, "SubShiftList");
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      }
    )
  }

  getSubShift_To() {
    var self = this;
    self.commonServices.post("CommonGetData",{Flag: 'SubShift', Id: this.SelectedShiftId_To, Status:1}).subscribe(
      (resp: any) => {
        this.SubShiftList_To = JSON.parse(resp).Table
        console.log(this.SubShiftList_To, "SubShiftList");
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      }
    )
  }

  onShiftSelect(val) {
    var self = this;
    self.SelectedShiftId = val;
    self.getSubShift();
  }

  onShiftSelect_To(val){
    this.SelectedShiftId_To = val;
    this.getSubShift_To();  
  }

  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    //Ios Comment
    //self.DateFrom= dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateFrom = this.dp.transform(dt, 'yyyy/MM/dd');
    console.log(self.DateFrom);
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);

    //Ios Comment
    //self.DateTo= dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateTo = this.dp.transform(dt, 'yyyy/MM/dd');
    console.log(self.DateTo);
  }
  statusChange(val) {
    this.StatusFlag = val.detail.value;
  }
  
  insertRecord() {
    var self = this;
    self.errorFound = true;
    if (self.Validation()) {

      const obj = {
        Id: self.Id,
        // FromDate : self.DateFrom,
        // ToDate : self.DateTo,
        FromDate: this.dp.transform(self.DateFrom, 'dd/MMM/yyyy'),
        ToDate: this.dp.transform(self.DateTo, 'dd/MMM/yyyy'),
        ShiftId: self.SelectedShiftId,
        SubShiftId: self.SubShiftId,
        flag: self.StatusFlag,
        StationIDs: self.StationId,
        Remark: self.Remark,
        ShiftId_To:this.SelectedShiftId_To,
        SubShiftId_To:this.SubShiftId_To
      };

      self.commonServices.loadingPresent();
      self.commonServices.post("InsertStationStatus", obj).subscribe(
        (res: any) => {
          const data = JSON.parse(res);
          console.log(data.Table[0].Mesage, "Success");
          if (data.Table[0].Mesage == "Record Update successfully." || data.Table[0].Mesage == "Record Inserted successfully.") {

            self.getData();
            self.StatusFlag = 'InActive';
          }
          self.commonServices.presentToast(data.Table[0].Mesage);
          self.commonServices.loadingDismiss();
        },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
          self.commonServices.loadingDismiss();
        }
      )
    }

  }

  Validation() {
    var self = this;
    self.OnDateChnageFrom(self.DateFrom);
    // self.OnDateChnageFrom(self.DateFrom);
    self.OnDateChnageTo(self.DateTo);
    if (self.StatusFlag == '' || isNullOrUndefined(self.StatusFlag)) {
      self.commonServices.presentToast('Status must be selected.');
      self.errorFound = false;
    }
    // else if(this.DateFrom < this.CurrentDate){
    //   alert('Date must be curent or future.');
    //   this.errorFound = false;
    // }
    else if ((new Date(self.DateTo)) < (new Date(self.DateFrom))) {
      self.commonServices.presentToast('DateTo must be greater then DateFrom.');
      self.errorFound = false;
    }
    // else if(this.SubShiftId == ''){
    //   alert('Sub Shift must Slected.');
    //   this.errorFound = false;
    // }
    else if (self.Remark == '') {
      self.commonServices.presentToast('Remark must be entered.');
      self.errorFound = false;
    }
    return self.errorFound;
  }
}