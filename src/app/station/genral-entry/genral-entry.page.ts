import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-genral-entry',
  templateUrl: './genral-entry.page.html',
  styleUrls: ['./genral-entry.page.scss'],
})
export class GenralEntryPage implements OnInit {
  currentdate: string;
  currDate: string;
  showhideflag: boolean = false;
  hidelcv: boolean = true;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: string;
  ENERGY:any=[];
  generalEntryList: any[];
  globalJson: any[];
  GEisCRSentToHo: number = 0;
  GEisStationSubmitted: number = 0;
  NOB: string;
  NOL: string;
  GELoginId: string = localStorage.getItem('LoginId');
  GEStationCode: string = localStorage.getItem('LoginId');
  GEId: number;
  StationCode: string = localStorage.getItem('LoginId');
  LoginId: string;
  secondMaxDate: any = new Date().toISOString();
  currentTimeR: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.LoginId = localStorage.getItem('LoginId');
    this.currentdate = new Date().toISOString().split('T')[0];
    this.currentTimeR = new Date().toISOString().split('T')[1].split('.')[0];
    if (this.geteDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.geteDate.selcteddate = latest_date;
      // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
      // this.geteDate.selcteddate = this.DPREntryDateTime;
      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      this.geteDate.selcteddate = this.DPREntryDateTime;

      // this.DPREntryDateTime = this.currentdate + ' ' + this.currentTimeR;
      // this.geteDate.selcteddate = this.DPREntryDateTime;
      this.GetGeneralEntry();
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
    //IoS Comment
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

    // this.geteDate.selcteddate = latest_date;
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    // this.geteDate.selcteddate = this.DPREntryDateTime;
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.DPREntryDateTime;
    // this.InsertGeneralEntry();
    this.GetGeneralEntry();
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  ///////////////////////////////////////////////////Genral Entry code Start///////////////////////////////////////////////////////////////

  GetGeneralEntry() {
    // this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetGeneralEntry",
      {
        StationCode: this.StationCode, LoginId: this.LoginId,
        DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
        //DPREntryDate: this.geteDate.selcteddate
      }).subscribe(
        (resp: any) => {
          const data = JSON.parse(resp).Table;
          if (data.length > 0) {
            this.generalEntryList = JSON.parse(resp).Table;
            this.GEId = JSON.parse(resp).Table[0].GEID;
            this.NOB = JSON.parse(resp).Table[0].NOB;
            this.NOL = JSON.parse(resp).Table[0].NOL;
            this.ENERGY = JSON.parse(resp).Table[0].ENERGY;
          } else {
            this.generalEntryList = [];
            this.GEId = 0;
            this.NOB = '';
            this.NOL = '';
            this.ENERGY='';
          }
          this.GEisCRSentToHo = JSON.parse(resp).Table1[0].isCRSentToHo;
          this.GEisStationSubmitted = JSON.parse(resp).Table2[0].isStationSubmitted;
          // this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          // this.commonServices.loadingDismiss();
        }
      )
  }

  InsertGeneralEntry() {
    // this.commonServices.loadingPresent();
    // var getJson = this.GetValidation(this.globalJson, this.generalEntryList);
    var getJson = this.GetValidation();
    if (getJson.error != '') {
      this.commonServices.presentToast(getJson.error)
      return false;
    }
    if (getJson.skipSave == true) {
      return false;
    }
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("InsertGeneralEntry", getJson.retJson).subscribe(
      (resp: any) => {
        console.log(resp);
        this.commonServices.loadingDismiss();
        if (JSON.parse(resp)[0] != null)
          var retJson = JSON.parse(resp)[0];
        if (retJson.status == '1') {
          this.generalEntryList = retJson;
          this.commonServices.presentToast('Data Inserted Successfully.');
          this.NOB = '';
          this.NOL = '';
          this.ENERGY='';
        }
        else if (retJson.status == '2') {
          this.commonServices.presentToast('Couldn\'t insert the record.');
        }
        else if (retJson.status == '3') {
          this.commonServices.presentToast('Data updated Successfully.');
          this.NOB = '';
          this.NOL = '';
          this.ENERGY='';
        }
        else if (retJson.status == '4') {
          this.commonServices.presentToast('Data for today is already Submitted.');
        }
        else {
          this.commonServices.presentToast(retJson.Msg);
        }
        this.GetGeneralEntry();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  // GetValidation(globalJson, generalEntryList)
  GetValidation() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regIntegers = /^[1-9]\d*$/;

    var ErrorMsg = '', flagSS = false;
    // if (isUndefined(generalEntryList)) {
    //     return {
    //         error: ErrorMsg,
    //         retJson: retJson,
    //         skipSave: true
    //     };
    // }
    if (this.NOB != "" && isUndefined(this.NOB) == false) {
      if (regexNumeric.test(this.NOB) == false) {
        ErrorMsg = 'Only numeric value allowed for Buses.';
      }
      else {
        //if (geJson.NOB.indexOf('.') > -1) {
        //    ErrorMsg = 'Decimal is not allowed.';
        //}
        var re = new RegExp(/^[0-9]*$/gm);
        if (!re.test(this.NOB)) {
          ErrorMsg = 'Decimal is not allowed.';
        }
      }
    }
    else {
      ErrorMsg = 'Please enter  value.';
    }

    if (this.NOL != "" && isUndefined(this.NOL) == false) {
      if (regexNumeric.test(this.NOL) == false) {
        ErrorMsg = 'Only numeric value allowed for LCV.';
      }
      else {
        // if (this.NOL.indexOf('.') > -1) {
        //    ErrorMsg = 'Decimal is not allowed.';
        // }
        var re = new RegExp(/^[0-9]*$/gm);
        if (!re.test(this.NOL)) {
          ErrorMsg = 'Decimal is not allowed.';
        }
      }
    }

    else {
      ErrorMsg = 'Please enter value.';
    }

    if (this.ENERGY != "" && isNullOrUndefined(this.ENERGY) == false) {
      if (regexNumeric.test(this.ENERGY) == false) {
          ErrorMsg = 'Only numeric value allowed for Energy Meter Reading.';
      }
    }
    else {
      ErrorMsg = 'Please enter Energy Meter Reading!';   
    }

    var retJson = {
      GEID: this.GEId,//generalEntryList.GEID,
      LoginId: this.LoginId,
      StationCode: this.StationCode,
      NOB: this.NOB,
      NOL: this.NOL,
      DPREntryDate: this.DPREntryDateTime,
      ENERGY:this.ENERGY,
    };
    return {
      error: ErrorMsg,
      retJson: retJson,
      skipSave: false
    };
  }
  //////////////////////////////////////////////////////Genral Entry code End//////////////////////////////////////////////////////////////
}
