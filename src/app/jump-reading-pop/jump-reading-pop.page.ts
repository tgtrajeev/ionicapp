import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AlertController, MenuController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { ModalController, NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-jump-reading-pop',
  templateUrl: './jump-reading-pop.page.html',
  styleUrls: ['./jump-reading-pop.page.scss'],
})

// @ViewChild('myInput') myInputVariable: ElementRef;

export class JumpReadingPopPage implements OnInit {
  // ViewChild is used to access the input element. 
 // this InputFileVar is a reference to our input. 
  @ViewChild('inputFile', { static: false }) InputFileVar;
  // @ViewChild('myInput', { static: false }) InputFileVar : ElementRef;
  currentdate: string;
  currDate: string;
  DispenserDate = { selcteddate: "" }
  SelectedDate: string;
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
  armSide: string = "ArmA";
  dispId: number = 0;
  jumppopup: boolean = true;


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
  submittedflag: any;
  stationName: string = "";
  CompanyName: string = '';
  SummeryDate = '';
  selectedStation: any = 0;
  shiftsubshift: boolean = false;
  FlagJumpType = 'Jump';
  listDispensers: any;
  cmbSubShiftData: any;
  addupdateform: FormGroup;
  constructor(private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService,
     public modalController: ModalController, public navCtrl: NavController,nativeElement: ElementRef, public alertController: AlertController) {
    // this.currentdate = new Date().toISOString().split('T')[0];
    // if (this.DispenserDate.selcteddate == "") {
    //   this.currDate = this.currentdate;
    //   console.log(this.currDate)
    //   const dt = new Date(this.currDate);
    //   let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //   this.DispenserDate.selcteddate = latest_date;
    // }
  }

  ngOnInit() {
    this.selectedStation = localStorage.getItem('StationId');
    this.getvalues()
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  getSelectedDate(datePicker) {
    // console.log("datePicker", datePicker);

    // const dt = new Date(datePicker);
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

    // this.DispenserDate.selcteddate = latest_date;
  }

  ChangeJumpType(val) {
    this.JumpType = val;
    if (this.JumpType == 'Jump' || this.JumpType == 'Reset' || this.JumpType == 'GasTesting')
      this.IsJumpSelected = false;
    else
      this.IsJumpSelected = true;
  }

  onChangeImage(file: FileList, event: any) {
    this.uploadedfile = file.item(0);
    if (this.uploadedfile.size > 0)
      this.IsFileSelected = true;
    else
      this.IsFileSelected = false;
  }

  getvalues() {
    this.armSide = "ArmA";
    this.before = "";
    this.after = "";
    this.remark = "";
    this.dispId = JSON.parse(this.activatedroute.snapshot.paramMap.get('dispId'));
    this.armAPrevReading = JSON.parse(this.activatedroute.snapshot.paramMap.get('armAPrevReading'));
    this.armBPrevReading = JSON.parse(this.activatedroute.snapshot.paramMap.get('armBPrevReading'));
    this.DispenserDate.selcteddate = this.activatedroute.snapshot.paramMap.get('EntryDate');
    this.getJumpReadingList(this.dispId);
  }

  ArmSelection(value) {
    console.log(value);
    this.popupFor = value;
    //this.getJumpReadingList(this.dispId);
    this.FlagJumpType = 'Jump';
    this.before = '';
    this.after = '';
    this.remark = '';
    this.uploadedfile = null;
    this.InputFileVar.value = "";
   // console.log(this.InputFileVar.nativeElement.files);
    // this.InputFileVar.nativeElement.value = "";
    // this.InputFileVar.nativeElement.clearInput = true;

    //console.log(this.InputFileVar.nativeElement.files);
    // this.FileName = 'No file';
    // console.log(this.myInputVariable.nativeElement.files);
    // this.myInputVariable.nativeElement.value = "";
    // console.log(this.myInputVariable.nativeElement.files);
  }

  UpdateJumpReading(DispanserJumpId: string, itm: any) {
    this.DispanserJumpId = DispanserJumpId;
    this.before = itm.DispanserBeforeJump;
    this.after = itm.DispanserAfterJump;
    this.remark = itm.DispanserJumpRemark;
    this.FlagJumpType = itm.FlagJumpType;
    var ImagePath = itm.DispanserJumpCeritificate;
    this.armSide = itm.DispanserSide;
    this.FileName = ImagePath.substring(1, ImagePath.length);
    if (this.FileName.length > 0) {
      this.IsFileSelected = false;
      this.uploadedfile = null;
    }
    else
      this.IsFileSelected = true;
  }

  saveJumpReading() {
    console.log(JSON.parse(this.activatedroute.snapshot.paramMap.get('dispId')));
    this.errorFlag = false;
    if (this.validationPopup('JumpReading') == true)
      return false;

    var obj = {
      EntryDate: this.DispenserDate.selcteddate,//this.detailsStation.SummeryDate,
      DispanserJumpId: (this.DispanserJumpId == "") ? '0' : this.DispanserJumpId,
      DispenserId: JSON.parse(this.activatedroute.snapshot.paramMap.get('dispId')),
      StationId: Number(localStorage.getItem('StationId')),//this.detailsStation.StationId,
      ShiftId: this.activatedroute.snapshot.paramMap.get('ShiftId'),
      SubShiftId: this.activatedroute.snapshot.paramMap.get('SubShiftId'),
      DispanserBeforeJump: this.before,
      DispanserAfterJump: this.after,
      DispanserJumpRemark: this.remark,
      DispanserSide: this.popupFor,
      JumpTypeFlag: this.FlagJumpType,
      RequestFrom: localStorage.getItem('UID')
    };
    console.log(obj);

    // this.commonServices.loadingPresent();
    var frmData = new FormData();
    var fileInput = this.uploadedfile;
    frmData.append("DispJumpDetail", JSON.stringify(obj));
    if (this.uploadedfile != undefined) {
      frmData.append('DipsanserJumpfile', this.uploadedfile, this.uploadedfile.name);
    }

    this.commonServices.SaveJumpReading(frmData).subscribe(
      (resp: any) => {
        const data = resp;
        console.log(data);
        console.log(data, "JumpDataEntry");
        this.commonServices.presentToast(data);
        if (data.indexOf('Error:') == -1) //data.Table[0].Meaasge.indexOf('Error:') == -1
        {
          if (data.indexOf('Error') > -1)//data.Table[0].Meaasge.indexOf('Error') > -1
          {

            this.router.navigate(['']);
          }
          this.FlagJumpType = 'Jump';
          this.before = '';
          this.after = '';
          this.remark = '';
          this.uploadedfile = null;
          this.InputFileVar.value = "";
          // this.InputFileVar.nativeElement.value = "";
          // this.FileName = 'No file';
          this.getJumpReadingList(this.activatedroute.snapshot.paramMap.get('dispId'));
          // setTimeout(() => { this.GetReadingbyShift(); }, 1000);
        }
        this.uploadedfile = null;
        this.FileName = '';
        // this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        // this.commonServices.loadingDismiss();
      }
    )
  }

  getJumpReadingList(itm) {
    console.log(itm);
    //this.dispId = itm;
    //this.armAPrevReading = itm.PreArmReadingA;
    //this.armBPrevReading = itm.PreArmReadingB;
    console.log(JSON.parse(this.activatedroute.snapshot.paramMap.get('dispId')));
    const obj = {
      EntryDate: this.DispenserDate.selcteddate,//this.detailsStation.SummeryDate,
      ShiftId: this.activatedroute.snapshot.paramMap.get('ShiftId'),
      SubShiftId: this.activatedroute.snapshot.paramMap.get('SubShiftId'),
      //DispanserSide: this.popupFor,
      DispenserId: JSON.parse(this.activatedroute.snapshot.paramMap.get('dispId')),

    };
    console.log(obj);
    this.commonServices.loadingDismiss();
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

  GetReadingbyShift() {
    const obj = {
      StationId: Number(localStorage.getItem('StationId')),//JSON.parse(sessionStorage.getItem("globalDetail"))[0].prm_id,
      EntryDate: this.DispenserDate.selcteddate,
      DispenserId: this.selectedDispId,
      ShiftId: this.addupdateform.value.selectedShiftId,
      SubShiftId: this.addupdateform.value.selectedSubShiftId
    };
    // this.commonServices.loadingPresent();
    this.commonServices.post("GetReadingbyShift", obj).subscribe(
      (resp: any) => {
        // this.commonServices.loadingDismiss();
        this.DispencerCount = JSON.parse(resp).Table4.length;
        if (this.DispencerCount != 0) {
          console.log(JSON.parse(resp));
          console.log(JSON.parse(resp).Table4);
          if (this.selectedDispId == 0)
            this.selectedDispId = JSON.parse(resp).Table4[0].DispenserId;
          console.log(this.selectedDispId);
          this.listDispensers = JSON.parse(resp).Table4;
          this.allDispenserData = JSON.parse(resp).Table;
          console.log(this.allDispenserData);
          this.totalDispenser = JSON.parse(resp).Table4.length;
          this.cmbShiftData = JSON.parse(resp).Table1;
          console.log("shift data", this.cmbShiftData);

          this.cmbSubShiftData = JSON.parse(resp).Table2;
          console.log("subshift data", this.cmbSubShiftData);
          this.selectedShiftId = JSON.parse(resp).Table3[0].ShiftId;
          this.selectedSubShiftId = JSON.parse(resp).Table3[0].SubShiftId;
          this.DiscountedRate = (parseFloat(JSON.parse(resp).Table3[0].DisountedRate).toFixed(2)).toString();
          this.NormalRate = (parseFloat(JSON.parse(resp).Table3[0].CurrentRate).toFixed(2)).toString();

          if (this.selectedShiftId == '-1')
            this.CurrentRate = '0.00';
          else if (this.selectedSubShiftId == '6')
            this.CurrentRate = this.DiscountedRate;
          else
            this.CurrentRate = this.NormalRate;
          this.SubShiftCount = JSON.parse(resp).Table2.length;
          var element = 0;
          if (this.selectedShiftId == '-1' || this.selectedSubShiftId == '-1')
            this.jumppopup = true;
          else
            this.jumppopup = false;
          this.ArmASale = (parseFloat(JSON.parse(resp).Table[0].TotA).toFixed(2)).toString()
          this.ArmBSale = (parseFloat(JSON.parse(resp).Table[0].TotB).toFixed(2)).toString()
          this.TArmSale = (parseFloat(JSON.parse(resp).Table[0].FinalTot).toFixed(2)).toString()
          for (let index = 0; index < this.cmbSubShiftData.length; index++) {
            if (this.cmbSubShiftData[index].SubShiftId == this.selectedSubShiftId)
              element = index;
          }
          this.SubShiftCurrentCount = (element + 1)
          // this.commonServices.loadingDismiss();
        }
        else {
          this.commonServices.presentToast('No Dispenser Available');
          // this.commonServices.loadingDismiss();
        }
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        // this.commonServices.loadingDismiss();
      }
    )
  }

  validationPopup(flag: string) {
    console.log(this.before);
    if (this.before == '' && flag == 'JumpReading') {
      this.commonServices.presentToast('Please enter the value for before reading.');
      this.errorFlag = true;
    }
    else if (String(Number(this.before)) == 'NaN' && flag == 'JumpReading') {
      this.commonServices.presentToast('Please enter the numeric value for before reading.');
      this.errorFlag = true;
    }
    else if ((Number(this.before) < 0 || Number(this.before) < 0) && flag == 'JumpReading') {
      this.commonServices.presentToast('Jump Reading can not be negative.');
      this.errorFlag = true;
    }
    else if (this.after == '' && flag == 'JumpReading') {
      this.commonServices.presentToast('Please enter the value for after reading.');
      this.errorFlag = true;
    }
    else if (String(Number(this.after)) == 'NaN' && flag == 'JumpReading') {
      this.commonServices.presentToast('Please enter the numeric value for after reading.');
      this.errorFlag = true;
    }
    else if ((Number(this.after) < 0 || Number(this.after) < 0) && flag == 'JumpReading') {
      this.commonServices.presentToast('Jump Reading can not be negative.');
      this.errorFlag = true;
    }
    // else if (this.popupFor.toLowerCase() == 'arma' && Number(this.armAPrevReading) <= 0 && flag == 'JumpReading') {
    //   this.commonServices.presentToast('Before entry can not allowed if previous entry is zero.');
    //   this.errorFlag = true;
    // }
    // else if (this.popupFor.toLowerCase() == 'armb' && Number(this.armBPrevReading) <= 0 && flag == 'JumpReading') {
    //   this.commonServices.presentToast('Before entry can not allowed if previous entry is zero.');
    //   this.errorFlag = true;
    // }
    return this.errorFlag;
  }
  async DeleteJumpReading(DispanserJumpId:string, itm:any) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure want to delete this Issue ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.DeleteJumpReadingTour(DispanserJumpId,itm);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  DeleteJumpReadingTour(DispanserJumpId,itm){
    var self = this;
    var Json = {
      DispanserJumpId: DispanserJumpId,
      EntryDate:this.DispenserDate.selcteddate,
      StationId:Number(localStorage.getItem('StationId')),
      DispanserSide : this.popupFor
     }

     self.commonServices.loadingPresent();
     self.commonServices.post("DeleteJumpReading", Json)
       .subscribe(
         (resp: any) => {
          const data = JSON.parse(resp);
          self.commonServices.presentToast(data.Table[0].Meaasge);
          
          // setTimeout(() => {
            this.getJumpReadingList(this.dispId);
          // });
           self.commonServices.loadingDismiss();
         },
         (error) => {
           console.log(error);
           self.commonServices.presentToast("Something went wrong.");
           self.commonServices.loadingDismiss();
         }
       )
  }
}
