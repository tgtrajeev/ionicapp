import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dpr-dispenser-entry',
  templateUrl: './dpr-dispenser-entry.page.html',
  styleUrls: ['./dpr-dispenser-entry.page.scss'],
})
export class DprDispenserEntryPage implements OnInit {

  currentdate: string;
  currDate: string;
  DispenserDate = { selcteddate: "" }
  SelectedDate: string;
  secondMaxDate: any = new Date().toISOString();
  detailsStation: { StationId: string, SummeryDate: string, UserId: string }
  StationShift: { ShiftId: string, SubShiftId: string, ActiveTab: string }
  cnt = 0;
  armA: string = '';
  armAPrevReading: string = '';
  armB: string = '';
  armBPrevReading: string = '';
  UpdateArmA: string = '';
  UpdateArmB: string = '';
  remark: string = '';
  prevReadingA: string = '';
  prevReadingB: string = '';
  jumpReadingA: string = '';
  jumpReadingB: string = '';
  ArmASale = '0.00';
  ArmBSale = '0.00';
  TArmSale = '0.00';
  oldvalueA: string = '';
  oldvalueB: string = '';
  errorFlag: boolean = false;
  before: string = '';
  after: string = '';
  popupFlag: boolean = false;
  UpdateFlag: boolean = false;
  popupFor: string = "ArmA";
  StationId: string = '';
  JumpSide = '';
  CashCollection = 0.0;
  IsJumpSelected: boolean = false;
  uploadedfile: File;
  JumpType: string = '';
  FileName: string = '';
  IsFileSelected: boolean = false;
  allDispenserData: any = [];
  listJumpedReading: any = [];
  armSide: string = "armA";
  dispId: number = 0;
  jumppopup: boolean = true;

  isDispencerLocked: boolean =true;
  DispLockMsg: string ='';
  showNext: boolean = true;
  showPrevious: boolean = true;
  totalDispenser: number = 0;
  dispCounterIndex: number = 0;

  DispencerCount = 0;
  //listDispensers:{DispenserName,DispenserId,StationId}[];
  selectedDispId = 0;
  cmbShiftData: {}[];
  selectedShiftId = '-1'
  //cmbSubShiftData:{SubShiftId,SubShiftDetails}[];
  selectedSubShiftId = '-1'
  SubShiftCount = 0;
  SubShiftCurrentCount = 0;

  CurrentRate = '0.00';
  NormalRate = '0.00';
  DiscountedRate = '0.00';
  StationCode: string = localStorage.getItem('LoginId');
  DispanserJumpId: string = '';

  stationName: string = "";
  CompanyName: string = '';
  SummeryDate = '';
  selectedStation: any = 0;
  shiftsubshift: boolean = false;
  addupdateform: FormGroup;
  listDispensers: any;
  cmbSubShiftData: any;
  ArmAReadingAverage: string = '';
  ArmBReadingAverage: string = '';
  CompanyId: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.DispenserDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.DispenserDate.selcteddate = latest_date;
      //IOS Add
      this.DispenserDate.selcteddate = this.dp.transform(dt, 'yyyy/MM/dd');
      this.SummeryDate = this.dp.transform(dt, 'yyyy/MM/dd');
      console.log(this.DispenserDate.selcteddate);
    }
    this.addupdateform = formBuilder.group({
      EntryDate: [this.DispenserDate.selcteddate, Validators.required],
      selectedShiftId: ['' , Validators.required],
      selectedSubShiftId: ['', Validators.required],
      StationCode: ['', Validators.required],
      CurrentRate: ['', Validators.required],
      DispanserEntryData: ['', Validators.required]
    })

  }
  ngOnInit() {
    this.selectedStation = localStorage.getItem('StationId');
    this.checkEntryPending('initial'); 
    // this.getSelectedDate(this.SummeryDate);

  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }
  // jumpReadingPop() {
  //   this.router.navigate(['jump-reading-pop']);
  // }
  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  
  getSelectedDate(datePicker) {
    console.log("datePicker", datePicker);

    // const dt = new Date(datePicker);
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    const dt = new Date(datePicker);
    console.log(dt);
    // this.SummeryDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.SummeryDate = new Date(datePicker).toLocaleDateString();
    this.SummeryDate = this.dp.transform(dt, 'yyyy/MM/dd');
    console.log(this.SummeryDate);
    this.DispenserDate.selcteddate = this.SummeryDate;
    this.checkEntryPending('change');
    this.CheckDispenserLockUnlock();
  }

 


  abc() {
    var self = this;
    self.commonServices.postwithservice("DispenserAverage", {
      StationId: Number(localStorage.getItem('stationId')), ShiftId: self.selectedShiftId, 
      SubShiftId: self.selectedSubShiftId,
      EntryDate: self.dp.transform(self.SummeryDate, 'dd-MMM-yyyy')
    }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp).Table[0]
        self.ArmAReadingAverage = data.FinalArmA;
        self.ArmBReadingAverage = data.FinalArmB;
        console.log(self.ArmAReadingAverage, ",", self.ArmBReadingAverage);
      },
      (error) => {
        console.log(error);
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      }
    )
  }

  checkEntryPending(str) {
    console.log(str + "str")
    var self = this;
    self.GetStationCompany();
    // self.commonServices.loadingPresent();
   
    self.commonServices.post("CommonGetData", {
      Id: self.selectedStation,
      // Status: self.DispenserDate.selcteddate,
      Status: self.dp.transform(self.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
      Flag: 'validatePopup'
    }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        if (data.Table[0].Msg == 'Allow') {
          self.shiftsubshift = false;
          self.GetReadingbyShift();
          console.log('allow');
        }
        else {
          self.commonServices.presentToast(data.Table[0].Msg);
          self.shiftsubshift = true;
          // alert(data.Table[0].Msg);
          self.allDispenserData = [];
          self.selectedShiftId = '-1';
          self.selectedSubShiftId = '-1';
          self.CurrentRate = '0.00';

          if (str == 'initial') {
            // Date Work in Pending
            var riDateStation = data.Table[0].Msg.split("for ");
            console.log("riDateStation" + riDateStation);
            var mriDate = new Date(riDateStation[1]);
            //self.secondMaxDate = mriDate.toISOString();
            const dt = new Date(riDateStation[1]);
            // let latest_date = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
            // self.DispenserDate.selcteddate = latest_date;
            //IOS Add
            self.DispenserDate.selcteddate = self.dp.transform(dt, 'yyyy/MM/dd');
            console.log(self.DispenserDate.selcteddate);
            self.addupdateform.patchValue({
              EntryDate: self.DispenserDate.selcteddate,
            });
            // self.addupdateform.setValue({EntryDate: self.DispenserDate.selcteddate});
           self.getSelectedDate(self.DispenserDate.selcteddate);
            // this.DispenserDate.selcteddate = 
          }
          else {
            console.log(str);
          }

        }
        
        if (this.CompanyId == '1' || this.CompanyId == '2' || this.CompanyId == '4' ||
          this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' ||
           this.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') {
          this.selectedShiftId = '4';
          this.selectedSubShiftId = '6';
          this.shiftsubshift = true;
        }
        else {
          this.shiftsubshift = false;
        }
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.presentToast('Something went wrong.');
        // self.commonServices.loadingDismiss();
      }
    )
  }

  GetStationCompany() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'CompanyByStation', Id: self.selectedStation, Status: 1 }).subscribe(
      (resp: any) => {
        console.log(resp);
        self.CompanyName = JSON.parse(resp).Table[0].CompanyName;
        self.CompanyId = JSON.parse(resp).Table[0].CompanyId;
        console.log(self.CompanyName, 'Company');
        console.log(self.CompanyId, 'comapny id ');
        if (self.CompanyId == '2' || self.CompanyId == '4' || self.CompanyId == '1' ||
          self.CompanyId == '5' || self.CompanyId == '6' || self.CompanyId == '8' ||
          self.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') {
          self.selectedShiftId = '4';
          self.selectedSubShiftId = '6';
          self.shiftsubshift = true;
        }
       
        self.CheckCompany();
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      }
    )
  }
  
  CheckCompany() {
    if (this.CompanyName == 'OMC' || this.CompanyName == 'DTC' || this.CompanyName == 'DIMITS' || this.CompanyName == 'NMRC') {
      this.commonServices.IsCompanyValid.emit(true);
    }
    else {
      this.commonServices.IsCompanyValid.emit(false);
    }
  }

  GetReadingbyShift() {
    var self = this;
    if (this.CompanyId == '1' || this.CompanyId == '2' || this.CompanyId == '4' ||
    this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' || 
    this.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') {
    this.selectedShiftId = '1',
    this.selectedSubShiftId = '1';
    }
    const obj = {
      StationId: Number(localStorage.getItem('StationId')),//JSON.parse(sessionStorage.getItem("globalDetail"))[0].prm_id,
      // EntryDate: self.DispenserDate.selcteddate,
      EntryDate: self.dp.transform(self.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
      DispenserId: self.selectedDispId,
      ShiftId: this.selectedShiftId,
      SubShiftId:  this.selectedSubShiftId
    };
    // self.commonServices.loadingDismiss();
    // self.commonServices.loadingPresent();

    self.commonServices.post("GetReadingbyShift", obj).subscribe(
      (resp: any) => {
        self.commonServices.loadingDismiss();
        self.DispencerCount = JSON.parse(resp).Table4.length;
        if (self.DispencerCount != 0) {
          console.log(JSON.parse(resp));
          console.log(JSON.parse(resp).Table4);
          if (self.selectedDispId == 0)
          self.selectedDispId = JSON.parse(resp).Table4[0].DispenserId;
          console.log(self.selectedDispId);
          self.listDispensers = JSON.parse(resp).Table4;
          self.allDispenserData = JSON.parse(resp).Table;
          console.log(self.allDispenserData);
          self.totalDispenser = JSON.parse(resp).Table4.length;
          self.cmbShiftData = JSON.parse(resp).Table1;
          console.log("shift data", self.cmbShiftData);
          // self.cmbSubShiftData = JSON.parse(resp).Table2;
          // console.log("subshift data", self.cmbSubShiftData);
          // self.selectedShiftId = JSON.parse(resp).Table3[0].ShiftId;
          // self.selectedSubShiftId = JSON.parse(resp).Table3[0].SubShiftId;
          if (this.CompanyId != '1' && this.CompanyId != '2' && this.CompanyId != '4' &&
            this.CompanyId != '5' && this.CompanyId != '6' && this.CompanyId != '8' &&
            this.CompanyId != '9' && this.CompanyId != '10' && this.CompanyId != '11') {
            this.cmbSubShiftData = JSON.parse(resp).Table2;
          }
          else {
            this.cmbSubShiftData = JSON.parse(resp).Table5
          }
          if (this.CompanyId == '1' || this.CompanyId == '2' || this.CompanyId == '4' ||
          this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' ||
          this.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') {
          this.selectedShiftId = '4';
          this.selectedSubShiftId = '6';
          this.shiftsubshift = true;
          console.log(this.selectedSubShiftId, "Sub");
          }
          else {
          this.selectedShiftId = JSON.parse(resp).Table3[0].ShiftId;
          this.selectedSubShiftId = JSON.parse(resp).Table3[0].SubShiftId;
          }
          self.DiscountedRate = (parseFloat(JSON.parse(resp).Table3[0].DisountedRate).toFixed(2)).toString();
          self.NormalRate = (parseFloat(JSON.parse(resp).Table3[0].CurrentRate).toFixed(2)).toString();

          if (self.selectedShiftId == '-1')
            self.CurrentRate = '0.00';
          else if (self.selectedSubShiftId == '6')
            self.CurrentRate = self.DiscountedRate;
          else
            self.CurrentRate = self.NormalRate;
          self.SubShiftCount = JSON.parse(resp).Table2.length;
          var element = 0;
          if (self.selectedShiftId == '-1' || self.selectedSubShiftId == '-1')
          {self.jumppopup = true;}
          else
          {self.jumppopup = false;}
          self.ArmASale = (parseFloat(JSON.parse(resp).Table[0].TotA).toFixed(2)).toString()
          self.ArmBSale = (parseFloat(JSON.parse(resp).Table[0].TotB).toFixed(2)).toString()
          self.TArmSale = (parseFloat(JSON.parse(resp).Table[0].FinalTot).toFixed(2)).toString()
          if (this.CompanyId != '1' && this.CompanyId != '2' && this.CompanyId != '4' &&
            this.CompanyId != '5' && this.CompanyId != '6' && this.CompanyId != '8' &&
            this.CompanyId != '9' && this.CompanyId != '10' && this.CompanyId != '11') {
            for (let index = 0; index < this.cmbSubShiftData.length; index++) {
              if (this.cmbSubShiftData[index].SubShiftId == this.selectedSubShiftId)
                element = index;
            }
            this.SubShiftCurrentCount = (element + 1)
          }
          else {
            for (let index = 0; index < this.cmbSubShiftData.length; index++) {
              if (this.cmbSubShiftData[index].SubShiftId == this.selectedSubShiftId)
                element = index;
            }
            this.SubShiftCurrentCount = (element + 1)
          }
        }
          // self.commonServices.loadingDismiss();
        else {
          self.commonServices.presentToast('No Dispenser Available');
          // self.commonServices.loadingDismiss();
        }
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      }
    )
  }

  onSelectShift(shiftId: string) {
    this.selectedShiftId = shiftId;
    setTimeout(() => { this.GetReadingbyShift(); });
    this.CheckDispenserLockUnlock();
  }

  onSelectSubShift(SubShiftId: string) {
    this.selectedSubShiftId = SubShiftId;
    var element = 0;
    for (let index = 0; index < this.cmbSubShiftData.length; index++) {
      if (this.cmbSubShiftData[index].SubShiftId == SubShiftId)
        element = index;
    }
    this.SubShiftCurrentCount = (element + 1)
    setTimeout(() => { this.GetReadingbyShift(); });
    this.CheckDispenserLockUnlock();
  }

  numberOnly(event): boolean {
    console.log(event);
    var val = event.target.value;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (event.target.selectionDirection == "backward" && event.target.selectionStart == 0 && event.target.selectionEnd > 0 && (charCode == 45 || charCode == 46 || (charCode > 31 && (charCode > 47 && charCode < 58)))) {
      return true;
    }
    if (!(val)) {
      if (charCode == 45) {
        return true;
      }
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
    else {
      if (charCode == 45 || charCode == 46 || (charCode > 31 && (charCode > 47 && charCode < 58))) {
        var points = 0;
        var minus = -1;
        points = val.indexOf(".", points);
        minus = val.indexOf("-", minus);
        if (minus != -1 && event.target.selectionStart <= minus) {
          return false
        }

        if (points >= 0 && charCode == 46) {
          return false;
        }
        else if (minus >= 0 && charCode == 45 || event.target.selectionStart != 0 && charCode == 45) {
          return false;
        }
        else {
          return true;
        }

      }
      else {
        return false;
      }
    }
  }
  onChangeRishabh(itm) {
    var rx = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    console.log(rx.test(itm.ArmReadingA));
  }

  OnchangeA(itm) {
    if (itm.ArmReadingA < 0) {
      this.commonServices.presentToast('Reading must be positive');
      itm.ArmReadingA = 0;
      //this.armA='0';
    }
    if (itm.ArmReadingA != '') {
      // var rx = /^\d+(?:\.\d{1,3})?$/
      var rx = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
      // console.log(rx.test(itm.ArmReadingA));
      if (rx.test(itm.ArmReadingA)) {
        this.oldvalueA = itm.ArmReadingA;
      }
      else {
        itm.ArmReadingA = this.oldvalueA;
      }
    }
    else {
      itm.ArmReadingA = '';
    }
    const ArmASaleCal = ((parseFloat(itm.ArmReadingA) - parseFloat(itm.PreArmReadingA) -
      parseFloat(itm.JumpArmA)).toFixed(2)).toString();
    itm.TotA = Number(isNaN(parseFloat(ArmASaleCal)) ? '0.00' : ArmASaleCal);
    const TArmSaleCal = ((parseFloat(itm.TotA) + parseFloat(itm.TotB)).toFixed(2)).toString();
    itm.FinalTot = Number((isNaN(parseFloat(TArmSaleCal)) ? '0.00' : TArmSaleCal));
  }

  OnchangeB(itm) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    console.log(itm);
    if (itm.ArmReadingB < 0) {
      this.commonServices.presentToast('Reading must be positive')
      itm.ArmReadingB = 0;
      //this.armB='0';
    }
    if (itm.ArmReadingB != '') {
      var rx = /^\d+(?:\.\d{1,3})?$/
      if (rx.test(itm.ArmReadingB)) {
        this.oldvalueB = itm.ArmReadingB;
      }
      else {
        itm.ArmReadingB = this.oldvalueB;
      }
    }
    else {
      itm.ArmReadingB = '';
    }
    const ArmBSaleCal = ((parseFloat(itm.ArmReadingB) - parseFloat(itm.PreArmReadingB) - parseFloat(itm.JumpArmB)).toFixed(2)).toString();
    itm.TotB = Number(isNaN(parseFloat(ArmBSaleCal)) ? '0.00' : ArmBSaleCal);
    const TArmSaleCal = ((parseFloat(itm.TotB) + parseFloat(itm.TotA)).toFixed(2)).toString();
    itm.FinalTot = Number((isNaN(parseFloat(TArmSaleCal)) ? '0.00' : TArmSaleCal));
  }

  saveAll() {
    console.log(this.allDispenserData);
    if (this.checkSale()) {
      var arr: any = [];
      arr = this.allDispenserData.filter(element => element.ArmReadingA != 0)
      console.log(arr);
      if (this.selectedShiftId == "-1" || isNullOrUndefined(this.selectedShiftId)) {
        this.commonServices.presentToast('Please select Shift.');
      }
      else if (this.selectedSubShiftId == "-1" || isNullOrUndefined(this.selectedSubShiftId)) {
        this.commonServices.presentToast('Please select Sub Shift.');
      }
      else if (arr.length == 0) {
        this.commonServices.presentToast('Please Enter Arm Reading.');
      }
      else {
        // if(this.selectedSubShiftId == "-1") {
        //   this.commonServices.presentToast('Please select the Sub Shift.');
        // }
        //else{
        console.log(this.allDispenserData);
        var array: any = [];
        this.allDispenserData.forEach(element => {
          array.push({ DispenserId: element.DispenserId, ArmReadingA: element.ArmReadingA, ArmReadingB: element.ArmReadingB });
        });
        console.log(array);
        const obj = {
          UserId: localStorage.getItem('UID'),
          // EntryDate: this.DispenserDate.selcteddate,
          EntryDate: this.dp.transform(this.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
          StationId: Number(localStorage.getItem('StationId')), //JSON.parse(sessionStorage.getItem("globalDetail"))[0].prm_id,
          shiftId: this.selectedShiftId,
          SubShiftId: this.selectedSubShiftId,
          StationCode: this.StationCode,
          CurrentRate: this.CurrentRate,
          DispanserEntryData: array
        };


        console.log(obj);
        this.commonServices.loadingPresent();
        this.commonServices.post("DispenserEntryMaster", (obj)).subscribe(
          (resp: any) => {
            this.CheckDispenserLockUnlock();
            const data = JSON.parse(resp);
            this.commonServices.presentToast(data.Table[0].Meaasge);
            this.commonServices.loadingDismiss();
          },
          (error) => {
            this.commonServices.presentToast("Something went wrong.");
            this.commonServices.loadingDismiss();
          }
        )
        //}
      }
    }
  }
  
  // OnDateChnage(val) {
  //   const dt = new Date(val);
  //   //this.SummeryDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
  //   this.SummeryDate = new Date(val).toLocaleDateString();
  //   console.log(this.SummeryDate, "SummeryDate");
  //   this.checkEntryPending();
  //   this.FetchDSASubmittedData();
  //   console.log(this.SummeryDate, "Rishabh 2");

  //   if (this.localLockDate == this.SummeryDate || this.IsTimeOverlocal == true)
  //     this.submittedflag = true;
  //   else
  //     this.submittedflag = false;


  //     this.CheckDispencerLockUnlock();
  // }

  CheckDispenserLockUnlock(){
    const obj = {
      
      // EntryDate: this.dp.transform(this.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
      EntryDate: this.SummeryDate,
      StationId: Number(localStorage.getItem('StationId')), 
      StationCode: this.StationCode,
    }
    console.log('Dispenser Lock Unlock');
    console.log(obj);
    this.commonServices.post("CheckDispencerLockUnlockStatus",(obj)).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        
        console.log(data.Table[0],'CheckLock');
        console.log(data.Table[0].Status,'SSS');
        
        // if(this.selectedShiftId == "4" && this.selectedSubShiftId == "6" && data.Table[0].Status == "1")
        if(data.Table[0].Status == "1")
            {
              this.isDispencerLocked = false;
              this.DispLockMsg = data.Table[0].Message;
            }
            else
            {
             
              this.isDispencerLocked = true;
              this.DispLockMsg = "";
            }
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    );
  } 

  checkSale() {
    console.log(this.allDispenserData);
    var sumArmASale = 0.00;
    var sumArmBSale = 0.00;
    for (var i = 0; i < this.allDispenserData.length; i++) {
      sumArmASale = parseFloat(sumArmASale + this.allDispenserData[i].TotA);
    }
    console.log(sumArmASale);
    for (var i = 0; i < this.allDispenserData.length; i++) {
      sumArmBSale = parseFloat(sumArmBSale + this.allDispenserData[i].TotB);
    }
    console.log(sumArmBSale);
    if (sumArmASale < 0) {
      this.commonServices.presentToast('Please enter positive sale for Arm A');
      return false;
    }
    else if (sumArmBSale < 0) {
      this.commonServices.presentToast('Please enter positive sale for Arm B');
      return false;
    }
    else {
      return true;
    }
    //return sum;  
  }
  validation1(ArmReadingA, PreArmReadingA) {
    console.log(ArmReadingA);
    if (String(Number(ArmReadingA)) == 'NaN') {
      this.commonServices.presentToast('Please enter the numeric value for Arm A.');
      return false;
    }
    else if (parseFloat(ArmReadingA) == 0 && parseFloat(PreArmReadingA) > 0) {
      this.commonServices.presentToast('Zero is not allowed for Arm A.');
      return false;
    }
    else if (parseFloat(ArmReadingA) <= parseFloat(PreArmReadingA)) {
      const ret = confirm('There is a suspecious entry in Arm A. Do you want to continue?')
      //this.errorFlag = (ret == true)?false:true; 
      return false; //This will not stop doing the entry, it's only for confirmation
    }
    else if (ArmReadingA == '') {
      this.commonServices.presentToast('Please enter reading for Arm A.');
      return false;
    }
    else if (ArmReadingA != '') {
      this.commonServices.postwithservice("DispenserAverage", {
        StationId: Number(localStorage.getItem('stationId')), ShiftId: this.selectedShiftId, 
        SubShiftId: this.selectedSubShiftId,
        EntryDate: this.dp.transform(this.SummeryDate, 'dd-MMM-yyyy')
      }).subscribe(
        (resp: any) => {
          const data = JSON.parse(resp).Table[0]
          this.ArmAReadingAverage = data.FinalArmA;
          this.ArmBReadingAverage = data.FinalArmB;
          console.log(this.ArmAReadingAverage, ",", this.ArmBReadingAverage);
          if (ArmReadingA > this.ArmAReadingAverage) {
            //const ret = confirm('Wrong Entry for Arm A Reading, Do you want to continue?')
            // if(confirm('Wrong Entry for Arm A Reading, Do you want to continue?')){
            //   return true;
            // }
            const ret = this.commonServices.alertMessage("Confirm",
              "Wrong Entry for Arm A Reading, Do you want to continue?").then((res: any) => {
                console.log(res);
                if (!res) {
                  return true;
                }
                else {
                  ArmReadingA = 0;
                  return false;
                }
              });

          }
        },
        (error) => {
          console.log(error);
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      )
    }
  }
  
  validation2(ArmReadingB, PreArmReadingB) {
    if (String(Number(ArmReadingB)) == 'NaN') {
      this.commonServices.presentToast('Please enter the numeric value for Arm B.');
      return false;
    }
    else if (parseFloat(ArmReadingB) == 0 && parseFloat(PreArmReadingB) > 0) {
      this.commonServices.presentToast('Zero is not allowed for Arm B.');
      return false;
    }
    else if (parseFloat(ArmReadingB) <= parseFloat(PreArmReadingB)) {
      const ret = confirm('There is a suspecious entry in Arm B. Do you want to continue?')
      //this.errorFlag = (ret == true)?false:true; 
      return false; //This will not stop doing the entry, it's only for confirmation
    }
    else if (ArmReadingB == '') {
      this.commonServices.presentToast('Please enter reading for Arm B.');
      return false;
    }
    else if (ArmReadingB != '') {
      this.commonServices.postwithservice("DispenserAverage", {
        StationId: Number(localStorage.getItem('stationId')), ShiftId: this.selectedShiftId, SubShiftId: this.selectedSubShiftId,
        EntryDate: this.dp.transform(this.SummeryDate, 'dd-MMM-yyyy')
      }).subscribe(
        (resp: any) => {
          const data = JSON.parse(resp).Table[0]
          this.ArmAReadingAverage = data.FinalArmA;
          this.ArmBReadingAverage = data.FinalArmB;
          console.log(this.ArmAReadingAverage, ",", this.ArmBReadingAverage);
          if (ArmReadingB > this.ArmBReadingAverage) {
            this.commonServices.alertMessage("Confirm",
              "Wrong Entry for Arm B Reading, Do you want to continue?").then((res: any) => {
                console.log(res);

                if (!res) {
                  return false;
                }
              });

            // const ret = confirm('Wrong Entry for Arm B Reading, Do you want to continue?')
            // return false;
          }
        },
        (error) => {
          console.log(error);
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      )
    }
  }

  getvalues(itm) {
    this.armSide = "ArmA";
    this.before = "";
    this.after = "";
    this.remark = "";
    this.dispId = itm.DispenserId;
    this.armAPrevReading = itm.PreArmReadingA;
    this.armBPrevReading = itm.PreArmReadingB;
    this.getJumpReadingList(this.dispId);
    this.router.navigate(['jump-reading-pop', { ShiftId: this.addupdateform.value.selectedShiftId, EntryDate : this.dp.transform(this.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
      SubShiftId: this.addupdateform.value.selectedSubShiftId, dispId: this.dispId, armAPrevReading: this.armAPrevReading, armBPrevReading: itm.PreArmReadingB }]);
  }
  
  getJumpReadingList(itm) {
    console.log(itm);
    console.log(this.dispId);
    const obj = {
      // EntryDate: this.DispenserDate.selcteddate,//this.detailsStation.SummeryDate,
      EntryDate: this.dp.transform(this.DispenserDate.selcteddate, 'dd/MMM/yyyy'),
      ShiftId: (this.CompanyId == '1' || this.CompanyId == '2' || this.CompanyId == '4' ||
        this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' ||
        this.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') ? 1 : this.selectedShiftId,
      SubShiftId: (this.CompanyId == '1' || this.CompanyId == '2' || this.CompanyId == '4' ||
        this.CompanyId == '5' || this.CompanyId == '6' || this.CompanyId == '8' ||
        this.CompanyId == '9' || this.CompanyId == '10' || this.CompanyId == '11') ? 1 : this.selectedSubShiftId,
      //DispanserSide: this.popupFor,
      DispenserId: this.dispId
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.post("GetJumpReadingByShift", obj).subscribe(
      (resp: any) => {
        this.listJumpedReading = JSON.parse(resp).Table;
        console.log(this.listJumpedReading);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }
}