import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-meter-skid',
  templateUrl: './meter-skid.page.html',
  styleUrls: ['./meter-skid.page.scss'],
})
export class MeterSkidPage implements OnInit {
  currentdate: string;
  currDate: string;
  meterDate = { selcteddate: "" }
  myVar: boolean = false;
  myFlag: number = 0;
  DPRDate: Date;
  DPREntryDateTime: string;
  IsMSkidhide: boolean = false;
  IsPackagehide: boolean = false;
  IsDisphide: boolean = false;
  IsLCVhide: boolean = false;
  IsGenSethide: boolean = false;
  //Meter Skid Vars//
  MSMeterSkidCode: string = '';
  MSFlowMeterTotaliserPrv: string = '';
  meterStationSkidData: any = [];
  loginId: string = localStorage.getItem('UID');
  meterTotaliser: string = '';
  jumpReading: string = '';
  jumpReadingFile: File = null;
  jumpReadingCount: string = '';
  MeterSkidDetailJson: any = [];
  GlobalDetail: any = [];
  uploadedfile: File;
  uploadedfilereset: File;
  MSfiles: File;
  filesreset: File;
  remark: string = "";
  OldMeterReading: string = "";
  JReading: string = "";
  resetTypeJsonSelected: string = "";
  MSisCRSentToHo: number = 0;
  MSisStationSubmitted: number = 0;
  MSfilevisible: boolean = false;
  popupfilevisible: boolean = true;
  JumpVisible: boolean = true;
  stationName: string = "";
  addForm: any;
  MeterSkidReadingAverage: string = '';

  secondMaxDate: any = new Date().toISOString();
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public commonServices: ApiService, 
    private menu: MenuController, 
    private dp: DatePipe
    ) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.meterDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
     
     //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.meterDate.selcteddate = latest_date;

      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      this.meterDate.selcteddate = this.DPREntryDateTime;
    }
    this.addForm = formBuilder.group({
      DPREntryDate: [this.meterDate.selcteddate, Validators.required],
      meterTotaliser: ['', Validators.required],
      jumpReading: ['', Validators.required],
      jumpReadingCount: ['', Validators.required],
      remark: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].StationName;
    console.log(this.stationName);
    console.log(localStorage.getItem('UID'));
    this.getStationMeterSkidData();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  change_resetRedirect() {
    this.router.navigate(['change-reset-meter-skid', { entryDate: this.meterDate.selcteddate }]);
  }

  showFields() {
    if (this.myFlag == 0) {
      this.myVar = true;
      this.myFlag = 1;
    }
    else {
      this.myVar = false;
      this.myFlag = 0;
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
    //IOS Comment
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.meterDate.selcteddate = latest_date;
    // this.DPREntryDateTime = this.dp.transform(this.meterDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.meterDate.selcteddate = this.DPREntryDateTime;
    this.getStationMeterSkidData();
  }

  getStationMeterSkidData() {
    try {
      // this.commonServices.loadingPresent();
      
      this.commonServices.postwithservice("GetStationMeterSkid", {
        StationCode: localStorage.getItem('stationCode'),
        LoginId: localStorage.getItem('stationCode'), 
        DPREntryDate: this.dp.transform(this.meterDate.selcteddate, 'dd/MMM/yyyy')
        //IOS Comment
        //DPREntryDate: this.meterDate.selcteddate
      }).subscribe(
        (response: any) => {
          // this.commonServices.loadingDismiss();

          const data = JSON.parse(response);
          console.log(data);
          
          if (data.length > 0) {
            console.log('true');
            this.IsMSkidhide = false;
            this.meterStationSkidData = data[1][0];
            console.log(this.meterStationSkidData);
            console.log(this.meterStationSkidData, "GK meterStationSkidData");
            this.MSMeterSkidCode = this.meterStationSkidData.MeterSkidCode
            this.MSFlowMeterTotaliserPrv = this.meterStationSkidData.FlowMeterTotaliserPrv
            console.log(this.MSMeterSkidCode, "GK MSMeterSkidCode");
            console.log(this.MSFlowMeterTotaliserPrv, "GK MSFlowMeterTotaliserPrv");
            this.meterTotaliser = this.meterStationSkidData.FlowMeterTotaliser;
            this.jumpReading = this.meterStationSkidData.JumpReadingFMT;
            this.jumpReadingCount = this.meterStationSkidData.JumpReadingFMTCount;
            // this.remark = this.meterStationSkidData.Remark;
            // isNullOrUndefined(this.PackageDetailJson[0].isCRSentToHo) ? 0 : this.PackageDetailJson[0].isCRSentToHo;
           // this.MSisStationSubmitted = isNullOrUndefined(parseInt(this.meterStationSkidData.isStationSubmitted)) ? 0 : this.meterStationSkidData.isStationSubmitted;
            console.log(this.MSisCRSentToHo, "MSisCRSentToHo");
            this.remark = isNullOrUndefined(this.meterStationSkidData.Remark) ? '' : this.meterStationSkidData.Remark;
            this.MSisCRSentToHo = isNullOrUndefined(this.meterStationSkidData.isCRSentToHo) ? 0 : this.meterStationSkidData.isCRSentToHo;
            this.MSisStationSubmitted = isNullOrUndefined(this.meterStationSkidData.isStationSubmitted) ? 0 : this.meterStationSkidData.isStationSubmitted;
            console.log(this.MSisCRSentToHo, "MSisCRSentToHo");
            console.log(this.MSisStationSubmitted, "MSisStationSubmitted");

            // this.JumpCertificateFMT = this.meterStationSkidData.JumpCertificateFMT;
            // if(this.JumpCertificateFMT != '')
            //    this.MSkidShowJumpImage=true;
            // else
            //    this.MSkidShowJumpImage=false;

            // if(parseFloat(this.jumpReading) > 0.000) {
            //     this.MSfilevisible = false;
            //     $("#Ischeckbox").prop("checked", true);
            //     this.JumpVisible=false;
            // }else  {
            //     this.MSfilevisible= true;
            //     $("#Ischeckbox").prop("checked", false);
            //     this.JumpVisible =true;
            // }
          }
          else {
            this.commonServices.presentToast('No Meter Skid data available. Please try another station.');
            console.log('data[0].length<0');
            this.IsMSkidhide = true;
            this.MSisCRSentToHo = 0;
            this.MSisStationSubmitted = 0;
            console.log(this.MSisCRSentToHo, "MSisCRSentToHo");
            console.log(this.MSisStationSubmitted, "MSisStationSubmitted");
          }
          // this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          // this.commonServices.loadingDismiss();
        }
      );
    }
    catch (err) {
      console.log(err);
    }
  }

  upload(str: any) {
    // const formData = new FormData();

    this.uploadedfile = str.target.files[0];

    // formData.append('file', this.uploadedfile);
    console.log(this.uploadedfile);
    // this.commonServices.post("http://localhost/test/test.php",formData)
    // .subscribe((data:any)=>{
    //   console.log(data);
    // })
    // console.log(str);
  }



  insertStationSkid() {
    var MyJson = {
      LoginId: localStorage.getItem('LoginId'),
      MeterSkidCode: this.MSMeterSkidCode,///this.meterStationSkidData.MeterSkidCode,
      FlowMeterTotaliser: this.addForm.value.meterTotaliser,
      JumpReadingFMT: 0,//((this.addForm.value.jumpReading == '') ? '0' : this.addForm.value.jumpReading),
      JumpReadingFMTCount: 0,// this.addForm.value.jumpReadingCount,
      Jumpcertificate: ((this.uploadedfile == undefined) ? '' : this.uploadedfile.name),
      Remark: this.addForm.value.remark,
      StationCode: localStorage.getItem('LoginId'),
      FilePath: localStorage.getItem('LoginId') + "/MeterSkid/",
      MeterSkidId: this.meterStationSkidData.MeterSkidId,
      DPREntryDate: this.meterDate.selcteddate
    };
    this.commonServices.postwithservice("MeterSkidAvrage", {
      LoginId: localStorage.getItem('LoginId'),
      DPREntryDate: this.dp.transform(this.meterDate.selcteddate, 'dd/MMM/yyyy')
      // DPREntryDate: this.meterDate.selcteddate
    }).subscribe(
      // DPREntryDate:this.dp.transform(this.meterDate.selcteddate,'dd-MMM-yyyy'
      (resp: any) => {
        const data = JSON.parse(resp).Table[0]
        this.MeterSkidReadingAverage = data.FinalAmount;
        console.log(this.MeterSkidReadingAverage);
        console.log(this.meterTotaliser);
        this.commonServices.presentToast("Meter Skid Average");
      },
      (error) => {
        console.log(error);
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
    //  IOS Comment
    // this.MSfiles = $('#MSfileInput');
    // console.log(this.MSfiles);
    var frmData = new FormData();
    // var fileInput = this.MSfiles[0];

    frmData.append("meterSkidDetail", JSON.stringify(MyJson));
    this.commonServices.presentToast("Frmdate" + frmData);
    if (this.uploadedfile != undefined) {
      frmData.append('file', this.uploadedfile, this.uploadedfile.name);
    }
    // var ErrorMsg = this.checkStationSkidvalidations(MyJson, fileInput);
    var ErrorMsg = this.checkStationSkidvalidations(MyJson);
    console.log("Message" + ErrorMsg);
    if (ErrorMsg == '' || ErrorMsg == undefined) {
      if (Number(this.meterTotaliser) <= Number(this.MSFlowMeterTotaliserPrv)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Meter Skid Reading, Do you want to continue?").then((res: any) => {
            console.log(res);
            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.insertStationSkidApi(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status)
                  if (data != '') {
                    this.getStationMeterSkidData();
                  }
                  this.commonServices.loadingDismiss();
                },
                (error) => {
                  this.commonServices.presentToast('Something went wrong.');
                  this.commonServices.loadingDismiss();
                }
              )
            }
          });
      }
      else if (this.meterTotaliser > this.MeterSkidReadingAverage) {
        this.commonServices.alertMessage("Confirm",
          "Wrong Entry for Meter Skid Reading, Do you want to continue?").then((res: any) => {
            console.log(res);
            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.insertStationSkidApi(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status);
                  if (data != '') {
                    this.getStationMeterSkidData();
                  }
                  this.commonServices.loadingDismiss();
                },
                (error) => {
                  this.commonServices.presentToast('Something went wrong.');
                  this.commonServices.loadingDismiss();
                }
              )
            }
          });
      }

      else if (Number(this.meterTotaliser) >= 2 * Number(this.MSFlowMeterTotaliserPrv)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Meter Skid Reading, Do you want to continue?").then((res: any) => {
            console.log(res);

            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.insertStationSkidApi(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status);
                  if (data != '') {
                    this.getStationMeterSkidData();
                  }
                  this.commonServices.loadingDismiss();
                },
                (error) => {
                  this.commonServices.presentToast('Something went wrong.');
                  this.commonServices.loadingDismiss();
                }
              )
            }
          });
      }
      else {
        this.commonServices.loadingPresent();
        this.commonServices.insertStationSkidApi(frmData).subscribe(
          (resp: any) => {
            const data = resp;
            console.log(data);
            this.commonServices.presentToast(data.Status);
            if (data != '') {
              this.getStationMeterSkidData();
            }
            this.commonServices.loadingDismiss();
          },
          (error) => {
            this.commonServices.presentToast('Something went wrong.');
            this.commonServices.loadingDismiss();
          }
        )
      }
    }
    else {
      this.commonServices.presentToast(ErrorMsg);
    }
  }
  // checkStationSkidvalidations(MeterSkidDetailJson, fileInput) {
  checkStationSkidvalidations(MeterSkidDetailJson) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var foundError = '';

    var foundError = '';
    if (MeterSkidDetailJson.FlowMeterTotaliser == '') {
      foundError = 'Flow Meter Totaliser is required.';
      return foundError;
    }
    if ((MeterSkidDetailJson.JumpReadingFMT == '' || MeterSkidDetailJson.JumpReadingFMT == undefined || parseFloat(MeterSkidDetailJson.JumpReadingFMT) == parseFloat("0")) && parseFloat(MeterSkidDetailJson.FlowMeterTotaliser) == parseFloat("0")) {
      foundError = 'Invalid Meter Skid Reading';
      return foundError;
    }
    if (MeterSkidDetailJson.FlowMeterTotaliser != "") {
      if (regexNumeric.test(MeterSkidDetailJson.FlowMeterTotaliser) == false) {
        foundError = 'Only numeric value allowed for reading.';
        return foundError;
      }
      if (regexDecimalThree.test(MeterSkidDetailJson.FlowMeterTotaliser) == false) {
        foundError = 'Three decimal with Max 10 Precision values allowed';
        return foundError;
      }
      if (parseFloat(MeterSkidDetailJson.FlowMeterTotaliser) < 0) {
        foundError = 'Flow Meter Totaliser must be Positive.';
        return foundError;
      }
    }

    // New Comment //
    // if (MeterSkidDetailJson.JumpReadingFMT != '') {
    //   if (parseFloat(MeterSkidDetailJson.JumpReadingFMT) > 0 && fileInput.files.length == 0 && MeterSkidDetailJson.JumpCeritificateLCV == '') { foundError = 'Please attach the Jump certificate.'; return foundError; }

    //   if (fileInput.files.length > 0) {
    //     var validExtension = 'jpeg,jpg,png,gif,pdf';
    //     for (var i = 0; i < fileInput.files.length; i++) {
    //       var fileExtension = fileInput.files[i].name.split('.')[1];
    //       if (validExtension.indexOf(fileExtension) < 0) {
    //         foundError = 'Attachment allowed only for [' + validExtension + '].'; return foundError;
    //       }
    //     }
    //   }
    //   if (regexNumeric.test(MeterSkidDetailJson.JumpReadingFMT) == false) {
    //     foundError = 'Only numeric value allowed for Jump reading.'; return foundError;
    //   }
    //   if (regexDecimalThree.test(MeterSkidDetailJson.JumpReadingFMT) == false) {
    //     foundError = 'Three decimal with Max 10 Precision values allowed'; return foundError;
    //   }

    // }
    // var JumpReadingFMTCnt = MeterSkidDetailJson.JumpReadingFMTCount;
    // if (JumpReadingFMTCnt != '' && parseFloat(JumpReadingFMTCnt) != 0 && (JumpReadingFMTCnt === undefined) == false) {
    //   if (regexNumeric.test(JumpReadingFMTCnt) == false) {
    //     foundError = 'Only numeric value allowed for Jump reading count.';
    //     return foundError;
    //   }
    //   if (JumpReadingFMTCnt.indexOf('.') > -1) {
    //     foundError = 'Decimal value not allowed for Jump reading count.';
    //     return foundError;
    //   }
    //   if (parseFloat(JumpReadingFMTCnt) < 0) {
    //     foundError = 'FMT Jump Reading count must be Positive.';
    //     return foundError;
    //   }
    //   if (MeterSkidDetailJson.JumpReadingFMT == '' || (MeterSkidDetailJson.JumpReadingFMT == undefined)) {
    //     foundError = 'Please enter the Jump reading.';
    //     return foundError;
    //   }
    //   if (MeterSkidDetailJson.JumpReadingFMT == '' || parseFloat(MeterSkidDetailJson.JumpReadingFMT) == 0) {
    //     foundError = 'Plese enter the Jump Reading';
    //     return foundError;
    //   }
    // }
    // else {
    // if (MeterSkidDetailJson.JumpReadingFMT != '' && parseFloat(MeterSkidDetailJson.JumpReadingFMT) != 0) {
    //     foundError = 'Plese enter the MS Jump Reading count.';
    //     return foundError;
    // }

    // }
    return foundError;
  }
}
