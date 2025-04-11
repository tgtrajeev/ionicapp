import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-lcv',
  templateUrl: './lcv.page.html',
  styleUrls: ['./lcv.page.scss'],
})
export class LcvPage implements OnInit {
  @ViewChild('inputFile', { static: false }) InputFileVar;
  varJump: boolean = false;
  flagJump: number = 0;
  currentdate: string;
  currDate: string;
  showhideflag: boolean = false;
  hidelcv: boolean = true;
  geteDate = { selcteddate: "" }
  ionLcvData: any = [];
  stationLcvData: any = [];
  stationLcvData1: any = [];
  stationLcvData2: any = [];
  IsLCVhide: boolean = false;
  LCVMeterTotaliserPrv: string = "";
  SAPEquipmentNumber: string = "";
  LCVuploadedfile: File;
  LCVuploadedfilereset: File;
  LCVfiles: File;
  LCVfilesreset: File;
  lcvid: number = 0;
  lcvmeterTotaliser: string = "";
  LCVjumpreading: string = "";
  jumpreadingcount: string = "";
  LCVremark: string = "";
  LCVOldMeterReading: string = "";
  LCVJReading: string = "";
  LCVresetTypeJsonSelected: string = "";
  LCVisCRSentToHo: number = 0;
  LCVisStationSubmitted: number = 0;
  LCVfilevisible: boolean = true;
  LCVpopupfilevisible: boolean = true;
  LCVJumpVisible: boolean = true;
  DPREntryDateTime: string;
  resetTypeJsonSelected: any;
  uploadedfilereset: any;
  OldMeterReading: any;
  JReading: string;
  NewMeterReading: string = "";
  MeterJumpRemark: string = "";
  MSJumpListHistory: any = [];
  JumpHistoryId: string = '';
  MSJReading: string = "";
  MSpopupfilevisible: boolean = true;
  LCVJumpListHistory: any;
  JumpCertificateLCV: string = "";
  LCVShowJumpImage: boolean = false;
  currentTimeR: string;
  LcvReadingAverage: string = '';
  LCVFlagJumpType = 'J';
  MSFlagJumpType = 'J';
  secondMaxDate: any = new Date().toISOString();

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute,
    public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
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

      //  // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
      // // this.geteDate.selcteddate = this.DPREntryDateTimeF;
      // this.DPREntryDateTime = this.currentdate + ' ' + this.currentTimeR;
      // this.geteDate.selcteddate = this.DPREntryDateTime;
    }
  }

  ngOnInit() {
    this.GetStationLcv('-999');
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  changResetRedirect() {
    this.router.navigate(['change-reset-lcv']);
  }

  showFields_jump() {
    if (this.flagJump == 0) {
      this.varJump = true;
      this.flagJump = 1;
    }
    else {
      this.varJump = false;
      this.flagJump = 0;
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
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

    // this.geteDate.selcteddate = latest_date;
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.DPREntryDateTime;

    //IoS Comment
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    // this.geteDate.selcteddate = this.DPREntryDateTime;
  }

  showhidechangereset() {
    this.hidelcv = false;
    this.showhideflag = true;
  }

  // GetStationLcv(id) {
  //   this.LCVuploadedfile = null;
  //   this.lcvid = id;
  //   this.LCVMeterTotaliserPrv = "";
  //   this.SAPEquipmentNumber = "";
  //   var LoginId = localStorage.getItem('LoginId');
  //   this.commonServices.loadingPresent();
  //   this.commonServices.postwithservice("GetStationLcv", { LoginId: LoginId, StationCode: LoginId, LcvId: id, DPREntryDate: this.geteDate.selcteddate }).subscribe(
  //     (resp: any) => {
  //       console.log(JSON.parse(resp));
  //       const data = JSON.parse(resp);
  //       console.log(data);
  //       if (data[0].length != 0 && data[1].length != 0) {
  //         this.IsLCVhide = false;
  //         this.stationLcvData = JSON.parse(resp);
  //         this.stationLcvData1 = JSON.parse(resp)[1];
  //         this.stationLcvData2 = JSON.parse(resp)[0];
  //         this.lcvmeterTotaliser = this.stationLcvData1[0].LCVMeterTotaliser;
  //         this.LCVjumpreading = this.stationLcvData1[0].JumpReadingLCV;
  //         this.jumpreadingcount = this.stationLcvData1[0].JumpReadingLCVCount;
  //         this.LCVremark = this.stationLcvData1[0].Remark;
  //         this.LCVisCRSentToHo = isNullOrUndefined(this.stationLcvData1[0].isCRSentToHo) ? 0 : this.stationLcvData1[0].isCRSentToHo;
  //         this.LCVisStationSubmitted = isNullOrUndefined(this.stationLcvData1[0].isStationSubmitted) ? 0 : this.stationLcvData1[0].isStationSubmitted;
  //         console.log(this.LCVisCRSentToHo, "LCVisCRSentToHo");
  //         console.log(this.LCVisStationSubmitted, "LCVisStationSubmitted");
  //         this.getLCVJumpHistory('GET');

  //         if (parseFloat(this.LCVjumpreading) > 0.000) {
  //           this.LCVfilevisible = false;
  //           $("#Ischeckbox").prop("checked", true);
  //           this.LCVJumpVisible = false;
  //         } else {
  //           this.LCVfilevisible = true;
  //           $("#Ischeckbox").prop("checked", false);
  //           this.LCVJumpVisible = true;
  //         }

  //         console.log(this.stationLcvData);
  //         if (id == '-999') {
  //           this.lcvid = this.stationLcvData2[0].LcvId;
  //         }
  //         this.stationLcvData1.forEach(element => {
  //           this.LCVMeterTotaliserPrv = element.LCVMeterTotaliserPrv;
  //           this.SAPEquipmentNumber = element.LcvCode;
  //         });
  //         // this.commonServices.loadingDismiss();
  //       }
  //       else {
  //         this.commonServices.presentToast('No LCV data available. Please try another station.')
  //         // this.commonServices.loadingDismiss();
  //         this.IsLCVhide = true;
  //         this.LCVisCRSentToHo = 0;
  //         this.LCVisStationSubmitted = 0;
  //         console.log(this.LCVisCRSentToHo, "LCVisCRSentToHo");
  //         console.log(this.LCVisStationSubmitted, "LCVisStationSubmitted");
  //       }
  //       this.commonServices.loadingDismiss();
  //     },
  //     (error) => {
  //       this.commonServices.presentToast('Something went wrong.');
  //       this.commonServices.loadingDismiss();
  //     }
  //   )
  // }

  GetStationLcv(id) {
    this.LCVuploadedfile = null;
    this.lcvid = id;
    this.LCVMeterTotaliserPrv = "";
    this.SAPEquipmentNumber = "";
    var LoginId = localStorage.getItem('LoginId');
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetStationLcv", {
      LoginId: LoginId, StationCode: LoginId,
      LcvId: id, DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
    }).subscribe(
      (resp: any) => {
        console.log(JSON.parse(resp));
        const data = JSON.parse(resp);
        console.log(data);
        if (data[0].length != 0 && data[1].length != 0) {
          this.IsLCVhide = false;
          this.stationLcvData = JSON.parse(resp);
          this.stationLcvData1 = JSON.parse(resp)[1];
          this.stationLcvData2 = JSON.parse(resp)[0];
          this.lcvmeterTotaliser = this.stationLcvData1[0].LCVMeterTotaliser;
          this.LCVjumpreading = this.stationLcvData1[0].JumpReadingLCV;
          this.jumpreadingcount = this.stationLcvData1[0].JumpReadingLCVCount;
          this.JumpCertificateLCV = this.stationLcvData1[0].JumpCeritificateLCV;
          if (this.JumpCertificateLCV != '')
            this.LCVShowJumpImage = true;
          else
            this.LCVShowJumpImage = false;

          this.LCVremark = this.stationLcvData1[0].Remark;
          this.LCVisCRSentToHo = isNullOrUndefined(this.stationLcvData1[0].isCRSentToHo) ? 0 : this.stationLcvData1[0].isCRSentToHo;
          this.LCVisStationSubmitted = isNullOrUndefined(this.stationLcvData1[0].isStationSubmitted) ? 0 : this.stationLcvData1[0].isStationSubmitted;
          console.log(this.LCVisCRSentToHo, "LCVisCRSentToHo");
          console.log(this.LCVisStationSubmitted, "LCVisStationSubmitted");

          if (parseFloat(this.LCVjumpreading) > 0.000) {
            this.LCVfilevisible = false;
            $("#Ischeckbox").prop("checked", true);
            this.LCVJumpVisible = false;
          } else {
            this.LCVfilevisible = true;
            $("#Ischeckbox").prop("checked", false);
            this.LCVJumpVisible = true;
          }

          console.log(this.stationLcvData);
          if (id == '-999') {
            this.lcvid = this.stationLcvData2[0].LcvId;
            this.getLCVJumpHistory('GET');
          }
          this.stationLcvData1.forEach(element => {
            this.LCVMeterTotaliserPrv = element.LCVMeterTotaliserPrv;
            this.SAPEquipmentNumber = element.LcvCode;
          });
          this.commonServices.loadingDismiss();
        }
        else {
          this.commonServices.presentToast('No LCV data available. Please try another station.')
          this.commonServices.loadingDismiss();
          this.IsLCVhide = true;
          this.LCVisCRSentToHo = 0;
          this.LCVisStationSubmitted = 0;
          console.log(this.LCVisCRSentToHo, "LCVisCRSentToHo");
          console.log(this.LCVisStationSubmitted, "LCVisStationSubmitted");
        }
      },
      (error) => {
        this.commonServices.presentToast('Something went wrong.');
        this.commonServices.loadingDismiss();
      }
    )
  }

  fileupload(str: any) {
    this.LCVuploadedfile = str.target.files[0];
  }

  LCVfileuploadreset(str: any) {
    this.LCVuploadedfilereset = str.target.files[0];
  }

  fileuploadreset(str: any) {
    this.uploadedfilereset = str.target.files[0];;
  }

  LCVjumpreadingValue(value) {
    this.LCVjumpreading = value;
    if (this.LCVjumpreading != '') {
      this.LCVfilevisible = false;
    } else {
      this.LCVfilevisible = true;
    }
  }

  InsertStationLCV() {
    var MyJson = {
      LoginId: localStorage.getItem('Loginidd'),
      LcvId: this.lcvid,
      LCVMeterTotaliser: this.lcvmeterTotaliser,
      JumpReadingLCV: 0, //((this.LCVjumpreading == '') ? '0' : this.LCVjumpreading),
      JumpReadingLCVCount: 0, //this.jumpreadingcount,
      JumpCeritificateLCV: ((this.LCVuploadedfile == undefined) ? '' : this.LCVuploadedfile.name),
      Remark: this.LCVremark,
      StationCode: localStorage.getItem('LoginId'),
      FilePath: localStorage.getItem('LoginId') + "/lcv/",
      DPREntryDate: this.geteDate.selcteddate
    };
    //IOS Comment
    // this.commonServices.postwithservice("LCVAverage", { LoginId: localStorage.getItem('LoginId'), 
    // DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd-MMM-yyyy') }).subscribe(
    this.commonServices.postwithservice("LCVAverage", {
      LoginId: localStorage.getItem('LoginId'),
      DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
    }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp).Table[0]
        this.LcvReadingAverage = data.FinalAmount;
        console.log(this.LcvReadingAverage);
        console.log(this.lcvmeterTotaliser);
      },
      (error) => {
        console.log(error);
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
    // Ios Comment
    // this.LCVfiles = $('#LCVfileInput');
    var frmData = new FormData();
    // var fileInput = this.LCVfiles[0];

    frmData.append("lcvDetail", JSON.stringify(MyJson));
    // if (this.LCVuploadedfile != undefined) {
    //   frmData.append('JumpReadingFile', this.LCVuploadedfile, this.LCVuploadedfile.name);
    // }
    // var ErrorMsg = this.checkStationValidations(MyJson, fileInput);
    var ErrorMsg = this.checkStationValidations(MyJson);
    if (ErrorMsg == '' || ErrorMsg == undefined) {
      if (Number(this.lcvmeterTotaliser) <= Number(this.LCVMeterTotaliserPrv)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Meter Totaliser Reading, Do you want to continue?").then((res: any) => {
            console.log(res);

            if (!res) {
              // if (confirm("Suspected Meter Totaliser Reading, Do you want to continue?")) {
              this.commonServices.loadingPresent();
              this.commonServices.InsertStationLCV(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data);
                  if (data != '') {
                    this.GetStationLcv(this.lcvid);
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

      else if (this.lcvmeterTotaliser > this.LcvReadingAverage) {
        // if(confirm("Wrong Entry for Meter Skid Reading, Do you want to continue?")) {
        this.commonServices.alertMessage("Confirm",
          "Wrong Entry for Meter Totaliser Reading, Do you want to continue?").then((res: any) => {
            console.log(res);

            if (!res) {
              this.commonServices.InsertStationLCV(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data);
                  if (data != '') {
                    this.GetStationLcv(this.lcvid);
                  }
                },
                (error) => {
                  this.commonServices.presentToast('Something went wrong.');
                  this.commonServices.loadingDismiss();

                }
              )
            }
          });
      }

      else if (Number(this.lcvmeterTotaliser) >= 2 * Number(this.LCVMeterTotaliserPrv)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Meter Totaliser Reading, Do you want to continue?").then((res: any) => {
            console.log(res);

            if (!res) {
              // if (confirm("Suspected Meter Totaliser Reading, Do you want to continue?")) {
              this.commonServices.loadingPresent();
              this.commonServices.InsertStationLCV(frmData).subscribe(
                (resp: any) => {
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data);
                  if (data != '') {
                    this.GetStationLcv(this.lcvid);
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
        this.commonServices.InsertStationLCV(frmData).subscribe(
          (resp: any) => {
            const data = resp;
            console.log(data);
            this.commonServices.presentToast(data);
            if (data != '') {
              this.GetStationLcv(this.lcvid);
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
  // checkStationValidations(LcvDetailJson, fileInput) {
  checkStationValidations(LcvDetailJson,) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var foundError = '';

    var foundError = '';
    if (LcvDetailJson.LCVMeterTotaliser == '') {
      foundError = 'LCV Meter Totaliser is required.';
      return foundError;
    }
    if ((LcvDetailJson.JumpReadingLCV == '' || LcvDetailJson.JumpReadingLCV == undefined || parseFloat(LcvDetailJson.JumpReadingLCV) == parseFloat("0")) && parseFloat(LcvDetailJson.LCVMeterTotaliser) == parseFloat("0")) {
      foundError = 'Invalid Meter Totaliser Reading';
      return foundError;
    }
    if (LcvDetailJson.LCVMeterTotaliser != "") {
      if (regexNumeric.test(LcvDetailJson.LCVMeterTotaliser) == false) {
        foundError = 'Only numeric value allowed for reading.';
        return foundError;
      }
      if (regexDecimalThree.test(LcvDetailJson.LCVMeterTotaliser) == false) {
        foundError = 'Three decimal with Max 10 Precision values allowed';
        return foundError;
      }
      if (parseFloat(LcvDetailJson.LCVMeterTotaliser) < 0) {
        foundError = 'LCV Meter Totaliser must be Positive.';
        return foundError;
      }
    }

    //New Comment//
    // if (LcvDetailJson.JumpReadingLCV != '' && parseFloat(LcvDetailJson.JumpReadingLCV) > 0) {
    //   //need to check fileinput issue
    //   //    if (parseFloat(LcvDetailJson.JumpReadingLCV) > 0 && fileInput.files.length == 0 && LcvDetailJson.JumpCeritificateLCV == '')    
    //   //     { 
    //   //        foundError = 'Please attach the Jump certificate.'; 
    //   //        return foundError; 
    //   //     }
    //   // if (fileInput.files.length > 0) {
    //   //     var validExtension = 'jpeg,jpg,png,gif';
    //   //     for (var i = 0; i < fileInput.files.length; i++) {
    //   //         var fileExtension = fileInput.files[i].name.split('.')[1];
    //   //         if (validExtension.indexOf(fileExtension) < 0) {
    //   //             foundError = 'Attachment allowed only for [' + validExtension + '].'; return foundError;
    //   //         }
    //   //     }
    //   // }
    //   if (regexNumeric.test(LcvDetailJson.JumpReadingLCV) == false) {
    //     foundError = 'Only numeric value allowed for LCV Jump reading.'; return foundError;
    //   }
    //   if (regexDecimalThree.test(LcvDetailJson.JumpReadingLCV) == false) {
    //     foundError = 'Three decimal with Max 10 Precision values allowed'; return foundError;
    //   }

    // }
    // var JumpLcvCnt = LcvDetailJson.JumpReadingLCVCount;
    // if (JumpLcvCnt != '' && parseFloat(JumpLcvCnt) != 0 && (JumpLcvCnt === undefined) == false) {
    //   if (regexNumeric.test(JumpLcvCnt) == false) {
    //     foundError = 'Only numeric value allowed for Lcv Jump reading count.';
    //     return foundError;
    //   }
    //   if (JumpLcvCnt.indexOf('.') > -1) {
    //     foundError = 'Decimal value not allowed for Lcv Jump reading count.';
    //     return foundError;
    //   }
    //   if (parseFloat(JumpLcvCnt) < 0) {
    //     foundError = 'Lcv Jump reading count must be Positive.';
    //     return foundError;
    //   }
    //   // if (JumpLcvCnt == '' || (JumpLcvCnt === undefined)) {
    //   //     foundError = 'Please enter the LCV Jump reading.';
    //   //     return foundError;
    //   // }
    // }
    // // else {
    // //     if (LcvDetailJson.jumpreadingcount != '' && parseFloat(LcvDetailJson.jumpreadingcount) != 0) {
    // //         foundError = 'Jump reading Count is mandatory with Jump reading.'; return foundError;
    // //     }
    // // }
    return foundError;
  }

  LCVresetchange(value) {
    this.resetTypeJsonSelected = value;
  }

  JReadingvalue(value) {
    this.JReading = value;
  }

  getLCVJumpHistory(FlagType) {
    this.clearLCV();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'LCV',
      Id: '',
      StationCode: '',
      MeterOfId: this.lcvid,
      MeterType: 'LMT',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.LCVJumpListHistory = JSON.parse(resp).Table;
        console.log(this.LCVJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteLCVJumpHistory(Id: string, FlagReading: string, itm: any) {
    this.commonServices.alertMessage("Delete",
    "Are you sure to delete this record..?").then((res: any) => {
      console.log(res);

      if (!res) {
        var Json = {
              Id: Id,
              FlagEntryFor: 'DELETE',
              FlagReadingType: FlagReading,
              MeterOf: 'LCV',
              MeterOfId: this.lcvid,
              EntryDate: this.geteDate.selcteddate
            }
            this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                this.commonServices.presentToast("Record deleted succeefully");
                setTimeout(() => {
                  this.getLCVJumpHistory('GET');
                });
                this.commonServices.loadingDismiss();
              },
              (error) => {
                this.commonServices.presentToast("Something went wrong.");
                this.commonServices.loadingDismiss();
              })
      }

    });
    // if (confirm("Are you sure to delete this record..?")) {
    //   var Json = {
    //     Id: Id,
    //     FlagEntryFor: 'DELETE',
    //     FlagReadingType: FlagReading,
    //     MeterOf: 'LCV',
    //     MeterOfId: this.lcvid,
    //     EntryDate: this.geteDate.selcteddate
    //   }
    //   this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
    //     (resp: any) => {
    //       const data = JSON.parse(resp);
    //       this.commonServices.presentToast("Record deleted succeefully");
    //       //this.openPopup(this.popupFor);
    //       setTimeout(() => {
    //         this.getLCVJumpHistory('GET');
    //       });
    //       this.commonServices.loadingDismiss();
    //     },
    //     (error) => {
    //       this.commonServices.presentToast("Something went wrong.");
    //       this.commonServices.loadingDismiss();
    //     })
    // }
    this.getLCVJumpHistory('GET');
  }

  UpdateLCVJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.OldMeterReading = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.MSFlagJumpType = "J" }
    else if (itm.Action == "Change") { this.MSFlagJumpType = "C" }
    else { this.MSFlagJumpType = "R" }
  }

  LCVJReadingvalue(value) {
    this.JReading = value;
  }
  clearLCV() {
    this.LCVFlagJumpType = "J";
    this.OldMeterReading = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
    // this.InputFileVar.value = "";
  }

  // LCVchangeresetpopup() {
  //   var MyJsonreset = {
  //     StationCode: localStorage.getItem('Loginidd'),
  //     MeterOf: 'LCV',
  //     MeterOfId: this.lcvid,
  //     MeterType: 'LMT',
  //     FlagRead: 0,
  //     FlagReadingType: this.resetTypeJsonSelected,
  //     Id: this.stationLcvData1[0].MeterResetId,
  //     LoginId: localStorage.getItem('Loginidd'),
  //     PrvReading: this.OldMeterReading,
  //     JumpReading: ((this.JReading == '') ? '0' : this.JReading),
  //     ReadingOnSwitch: ((this.stationLcvData1[0].ReadingOnSwitch == '') ? '0' : this.stationLcvData1[0].ReadingOnSwitch),
  //     FilePath: localStorage.getItem('Loginidd') + "/lcv/",
  //     MeterAfterJump: this.NewMeterReading,
  //     MeterJumpRemark: this.MeterJumpRemark,
  //     JumpHistoryId: this.JumpHistoryId,
  //     MeterBeforeJump: this.OldMeterReading,
  //     DetailId : this.stationLcvData1[0].MeterSkidId,
  //     EntryDate:this.geteDate.selcteddate 
  //   };

  //   this.LCVfilesreset = $('#LCVfileInputreset');
  //   console.log(this.LCVfilesreset);

  //   var frmData = new FormData();
  //   var fileInputreset = this.LCVfilesreset[0];
  //   frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
  //   if (this.LCVuploadedfilereset != undefined) {
  //     console.log(this.LCVuploadedfilereset);
  //     frmData.append('JumpReadingFile', this.LCVuploadedfilereset, this.LCVuploadedfilereset.name);
  //   }

  //   var ErrorMsg = this.changeresetValidations(MyJsonreset);

  //   if (ErrorMsg == '' || ErrorMsg == undefined) {
  //     this.commonServices.HoldResetReading(frmData).subscribe(
  //       (resp: any) => {
  //         const data = (resp);
  //         if (data.Status == "Inserted") {
  //           this.commonServices.presentToast('Record Saved Successfully.');
  //           this.getLCVJumpHistory('GET');
  //           this.clearLCV();
  //         }
  //         else if (data.Status == "Updated") {
  //           this.commonServices.presentToast('Record Updated Successfully.');
  //           this.getLCVJumpHistory('GET');
  //           this.clearLCV();
  //         }
  //         else {
  //           this.commonServices.presentToast(data.Status);
  //         }
  //       },
  //       (error) => {
  //         this.commonServices.presentToast('Something went wrong.');

  //       }
  //     )
  //   }
  //   else {
  //     this.commonServices.presentToast(ErrorMsg);
  //   }
  //   this.getLCVJumpHistory('GET');
  // }

  LCVchangeresetpopup() {
    var MyJsonreset = {
      StationCode: localStorage.getItem('LoginId'),
      MeterOf: 'LCV',
      MeterOfId: this.lcvid,
      MeterType: 'LMT',
      FlagRead: 0,
      FlagReadingType: this.resetTypeJsonSelected,
      Id: this.stationLcvData1[0].MeterResetId,
      LoginId: localStorage.getItem('LoginId'),
      PrvReading: this.OldMeterReading,
      JumpReading: ((this.JReading == '') ? '0' : this.JReading),
      ReadingOnSwitch: ((this.stationLcvData1[0].ReadingOnSwitch == '') ? '0' : this.stationLcvData1[0].ReadingOnSwitch),
      FilePath: localStorage.getItem('LoginId') + "/lcv/",
      MeterAfterJump: this.NewMeterReading,
      MeterJumpRemark: this.MeterJumpRemark,
      JumpHistoryId: this.JumpHistoryId,
      MeterBeforeJump: this.OldMeterReading,
      EntryDate: this.geteDate.selcteddate
    };
    this.JumpHistoryId = "";
    this.LCVfilesreset = $('#LCVfileInputreset');
    console.log(this.LCVfilesreset);

    var frmData = new FormData();
    var fileInputreset = this.LCVfilesreset[0];
    frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
    if (this.LCVuploadedfilereset != undefined) {
      console.log(this.LCVuploadedfilereset);
      frmData.append('JumpReadingFile', this.LCVuploadedfilereset, this.LCVuploadedfilereset.name);
    }

    var ErrorMsg = this.changeresetValidations(MyJsonreset,fileInputreset);

    if (ErrorMsg == '' || ErrorMsg == undefined) {
      this.commonServices.HoldResetReading(frmData).subscribe(
        (resp: any) => {
          const data = (resp);
          if (data.Status == "Inserted") {
            this.getLCVJumpHistory('GET');
            this.clearLCV();
            this.commonServices.presentToast('Record Saved Successfully.');
          }
          else if (data.Status == "Updated") {
            this.getLCVJumpHistory('GET');
            this.clearLCV();
            this.commonServices.presentToast('Record Updated Successfully.');
          }
          else {
            this.commonServices.presentToast(data.Status);
          }
        },
        (error) => {
          alert('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      )
    }
    else {
      this.commonServices.presentToast(ErrorMsg);
    }
    this.getLCVJumpHistory('GET');
  }

  LCVchangeresetValidation(LcvDetailJsonreset,fileInput) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var errorMsg = '';
    if ((LcvDetailJsonreset.PrvReading === undefined) || LcvDetailJsonreset.PrvReading == '') {
      errorMsg = 'Please enter the Old Meter Reading.'
      return errorMsg;
    }
    if (regexNumeric.test(LcvDetailJsonreset.PrvReading) == false) {
      errorMsg = 'Only numeric value allowed for reading.';
      return errorMsg;
    }
    if (parseFloat(LcvDetailJsonreset.PrvReading) < 0) {
      errorMsg = 'Old Meter Reading must be Positive.';
      return errorMsg;
    }
    // if ((parseInt(LcvDetailJsonreset.JumpReading) == '0' || LcvDetailJsonreset.oldJumpReading == '') && !angular.isUndefined(LcvDetailJsonreset.fileObject) && (jsonValidation.fileObject != null) && (jsonValidation.fileObject.files.length > 0 || jsonValidation.formarJRImage == true)) {
    //     jsonErrorMsg = { errorMsg: 'Please enter the Jump Reading.' };
    //     return jsonErrorMsg;
    // }
    if (regexNumeric.test(LcvDetailJsonreset.JumpReading) == false) {
      errorMsg = 'Only numeric value allowed for Jump reading.';
      return errorMsg;
    }
    return errorMsg;
  }

  changeresetValidations(LcvDetailJsonreset,fileInput) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var errorMsg = '';

    if ((LcvDetailJsonreset.PrvReading === undefined) || LcvDetailJsonreset.PrvReading == '') {
      errorMsg = 'Please enter the Old Meter Reading.'
      return errorMsg;
    }
    if (regexNumeric.test(LcvDetailJsonreset.PrvReading) == false) {
      errorMsg = 'Only numeric value allowed for reading.';
      return errorMsg;
    }
    if (parseFloat(LcvDetailJsonreset.PrvReading) < 0) {
      errorMsg = 'Old Meter Reading must be Positive.';
      return errorMsg;
    }
    // if ((parseInt(LcvDetailJsonreset.JumpReading) == '0' || LcvDetailJsonreset.oldJumpReading == '') && !angular.isUndefined(LcvDetailJsonreset.fileObject) && (jsonValidation.fileObject != null) && (jsonValidation.fileObject.files.length > 0 || jsonValidation.formarJRImage == true)) {
    //     jsonErrorMsg = { errorMsg: 'Please enter the Jump Reading.' };
    //     return jsonErrorMsg;
    // }
    if (regexNumeric.test(LcvDetailJsonreset.JumpReading) == false) {
      errorMsg = 'Only numeric value allowed for Jump reading.';
      return errorMsg;
    }
    if (fileInput.firstChild.files.length > 0) {
      var validExtension = 'jpeg,jpg,png,gif';
      for (var i = 0; i < fileInput.firstChild.files.length; i++) {
        var fileExtension = fileInput.firstChild.files[i].name.split('.').pop().toLowerCase()[1];
        if (validExtension.indexOf(fileExtension) < 0) {
          errorMsg = 'Attachment allowed only for [' + validExtension + '].';
          return errorMsg;
        }
      }
    }
    return errorMsg;
  }

  // LCVchangeresetpopup() {
  //   var MyJsonreset = {
  //     StationCode: localStorage.getItem('LoginId'),
  //     MeterOf: 'LCV',
  //     MeterOfId: this.lcvid,
  //     MeterType: 'LMT',
  //     FlagRead: 0,
  //     FlagReadingType: this.resetTypeJsonSelected,
  //     Id: this.stationLcvData1[0].MeterResetId,
  //     LoginId: localStorage.getItem('LoginId'),
  //     PrvReading: this.OldMeterReading,
  //     JumpReading: ((this.JReading == '') ? '0' : this.JReading),
  //     ReadingOnSwitch: ((this.stationLcvData1[0].ReadingOnSwitch == '') ? '0' : this.stationLcvData1[0].ReadingOnSwitch),
  //     FilePath: localStorage.getItem('LoginId') + "/lcv/"
  //   };

  //   this.LCVfilesreset = $('#LCVfileInputreset');
  //   console.log(this.LCVfilesreset);

  //   var frmData = new FormData();
  //   var fileInputreset = this.LCVfilesreset[0];
  //   frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
  //   if (this.LCVuploadedfilereset != undefined) {
  //     console.log(this.LCVuploadedfilereset);
  //     frmData.append('JumpReadingFile', this.LCVuploadedfilereset, this.LCVuploadedfilereset.name);
  //   }

  //   var ErrorMsg = this.changeresetValidations(MyJsonreset);

  //   if (ErrorMsg == '' || ErrorMsg == undefined) {
  //     this.commonServices.HoldResetReading(frmData).subscribe(
  //       (resp: any) => {
  //         const data = resp;
  //         if (data.Status == "Updated" || data.Status == "Inserted") {
  //           this.commonServices.presentToast('Record Saved Successfully.');
  //         }
  //         else {
  //           this.commonServices.presentToast(data.Status);
  //         }
  //       },
  //       (error) => {
  //         this.commonServices.presentToast('Something went wrong.');
  //         this.commonServices.loadingDismiss;
  //       }
  //     )
  //   }
  //   else {
  //     this.commonServices.presentToast(ErrorMsg);
  //   }

  // }

  // changeresetValidations(LcvDetailJsonreset) {
  //   var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
  //   var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
  //   var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
  //   var imgShow = 'assets/images/attachment.gif';
  //   var errorMsg = '';

  //   if ((LcvDetailJsonreset.PrvReading === undefined) || LcvDetailJsonreset.PrvReading == '') {
  //     errorMsg = 'Please enter the Old Meter Reading.'
  //     return errorMsg;
  //   }
  //   if (regexNumeric.test(LcvDetailJsonreset.PrvReading) == false) {
  //     errorMsg = 'Only numeric value allowed for reading.';
  //     return errorMsg;
  //   }
  //   if (parseFloat(LcvDetailJsonreset.PrvReading) < 0) {
  //     errorMsg = 'Old Meter Reading must be Positive.';
  //     return errorMsg;
  //   }
  //   // if ((parseInt(LcvDetailJsonreset.JumpReading) == '0' || LcvDetailJsonreset.oldJumpReading == '') && !angular.isUndefined(LcvDetailJsonreset.fileObject) && (jsonValidation.fileObject != null) && (jsonValidation.fileObject.files.length > 0 || jsonValidation.formarJRImage == true)) {
  //   //     jsonErrorMsg = { errorMsg: 'Please enter the Jump Reading.' };
  //   //     return jsonErrorMsg;
  //   // }
  //   if (regexNumeric.test(LcvDetailJsonreset.JumpReading) == false) {
  //     errorMsg = 'Only numeric value allowed for Jump reading.';
  //     return errorMsg;
  //   }
  //   return errorMsg;
  // }
}