import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-gas-genset',
  templateUrl: './gas-genset.page.html',
  styleUrls: ['./gas-genset.page.scss'],
})
export class GasGensetPage implements OnInit {

  varJump: boolean = false;
  flagJump: number = 0;
  currentdate: string;
  currDate: string;
  showhideflag: boolean = false;
  hidegenset: boolean = true;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: string;

  getGenSetData: any = [];
  getGenSetDetails: any = [];
  getGenSetFormData: any = [];
  GenSetId: string = "";
  PreviousReading: string = "";
  GSmeterTotaliser: string = "";
  GSjumpReading: string = "";
  GSjumpReadingCount: string = "";
  GSuploadedfile: File;
  GSuploadedfilereset: File;
  uploadedfilereset: File;
  GSfiles: File;
  GSfilesreset: File;
  GSRunHrs: string = '00';
  GSRunMins: string = '00';
  GSSAPEquipmentNumber: string = "";
  GSresetTypeJsonSelected: string = "";
  GSOldMeterReading: string = "";
  GSJReading: string = "";
  GSremark: string = "";
  GSisCRSentToHo: number = 0;
  GSisStationSubmitted: number = 0;
  HH: number;
  MM: number;
  Hours: any = [];
  Minutes: any = [];
  GSfilevisible: boolean = false;
  GSpopupfilevisible: boolean = true;
  GSJumpVisible: boolean = true;
  IsGenSethide: boolean = false;
  remark: string = "";
  GSIJumpListHistory: any;
  NewMeterReading: string = "";
  MeterJumpRemark: string = "";
  MSJumpListHistory: any = [];
  JumpHistoryId: string = '';
  JumpCertificateGenset: string = "";
  GensetShowJumpImage: boolean = false;
  currentTimeR: string;
  GasGensetReadingAverage: string = '';
  MSFlagJumpType = 'J';
  GSFlagJumpType = 'J';
  secondMaxDate: any = new Date().toISOString();

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
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
      // this.DPREntryDateTime = this.currentdate + ' ' + this.currentTimeR;
      // this.geteDate.selcteddate = this.DPREntryDateTime;

      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      this.geteDate.selcteddate = this.DPREntryDateTime;
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
  }

  showhidechangereset() {
    this.hidegenset = false;
    this.showhideflag = true;
  }

  ngOnInit() {
    this.GetStationGenSet('-999')
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  changResetRedirect() {
    this.router.navigate(['change-reset-ges-genset']);
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

  // GetStationGenSet(GenSetId) {
  //   try {
  //     this.GenSetId = GenSetId;
  //     this.commonServices.loadingPresent();
  //     this.commonServices.postwithservice("GetStationGenSet", { StationCode: localStorage.getItem('stationCode'), LoginId: localStorage.getItem('stationCode'), GenSetId: GenSetId, DPREntryDate: this.geteDate.selcteddate }).subscribe(
  //       (response: any) => {
  //         const data = JSON.parse(response);
  //         this.getGenSetData = data;
  //         console.log(this.getGenSetData);
  //         if (this.getGenSetData[0].length != 0 && this.getGenSetData[1].length != 0) {
  //           this.IsGenSethide = false;
  //           this.getGenSetDetails = data[0];
  //           console.log(this.getGenSetDetails, "Genset getGenSetDetails");
  //           this.getGenSetFormData = data[1];
  //           this.PreviousReading = this.getGenSetFormData[0].FlowMeterReadingPrv;
  //           this.GSSAPEquipmentNumber = this.getGenSetFormData[0].GasGenSetCode;
  //           this.GSmeterTotaliser = this.getGenSetFormData[0].FlowMeterReading;
  //           this.GSjumpReading = this.getGenSetFormData[0].JumpReadingFMR;
  //           this.GSjumpReadingCount = this.getGenSetFormData[0].JumpReadingFMRCount;
  //           this.GSremark = this.getGenSetFormData[0].Remark;
  //           this.GSRunHrs = this.getGenSetFormData[0].RunninInHours;
  //           this.GSRunMins = this.getGenSetFormData[0].RunningInMinutes;
  //           this.GSisCRSentToHo = this.getGenSetFormData[0].isCRSentToHo;
  //           this.GSisStationSubmitted = this.getGenSetFormData[0].isStationSubmitted;
  //           console.log(this.GSisCRSentToHo, "Genset GSisCRSentToHo");
  //           console.log(this.GSisStationSubmitted, "Genset GSisStationSubmitted");
  //         this.getGSIJumpHistory('GET');

  //           if (parseFloat(this.GSjumpReading) > 0.000) {
  //             this.GSfilevisible = false;
  //             //  $("#GSIscheckbox").prop("checked", true);
  //             this.GSJumpVisible = false;
  //           }
  //           else {
  //             this.GSfilevisible = true;
  //             //  $("#GSIscheckbox").prop("checked", false);
  //             this.GSJumpVisible = true;
  //           }

  //           this.Hours = [];
  //           this.Minutes = [];
  //           for (var i = 0; i <= 24; i++) {
  //             if (i <= 9) {
  //               var a = '0';
  //               this.Hours.push(a + i);
  //             } else if (i >= 10) {
  //               var a = '';
  //               this.Hours.push('' + i);
  //             }
  //           }
  //           for (var i = 0; i <= 59; i++) {
  //             if (i <= 9) {
  //               var a = '0';
  //               this.Minutes.push(a + i);
  //             } else if (i >= 10) {
  //               var a = '';
  //               this.Minutes.push('' + i);
  //             }
  //           }
  //           if (data[0].length > 0) {
  //             if (GenSetId == '-999') {
  //               this.GenSetId = this.getGenSetDetails[0].GenSetId;
  //             }
  //             this.commonServices.loadingDismiss();
  //           }
  //           else {
  //             console.log('No data available.');
  //             this.commonServices.loadingDismiss();
  //           }
  //         }
  //         else {
  //           this.commonServices.presentToast('No Gas Genset data available. Please try another station.')
  //           this.commonServices.loadingDismiss();
  //           this.IsGenSethide = true;
  //         }
  //       },
  //       (error) => {
  //         console.log('Something went wrong.');
  //         this.commonServices.loadingDismiss();
  //       }
  //     );
  //   }
  //   catch (err) {
  //     console.log(err);
  //     this.commonServices.loadingDismiss();
  //   }
  // }

  GetStationGenSet(GenSetId) {
    try {
      this.GenSetId = GenSetId;
      this.commonServices.loadingPresent();
      this.commonServices.postwithservice("GetStationGenSet", {
        StationCode: localStorage.getItem('stationCode'),
        LoginId: localStorage.getItem('stationCode'), GenSetId: GenSetId,
        DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
        // DPREntryDate:this.geteDate.selcteddate
      }).subscribe(
        (response: any) => {
          const data = JSON.parse(response);
          this.getGenSetData = data;
          console.log(this.getGenSetData);
          if (this.getGenSetData[0].length != 0 && this.getGenSetData[1].length != 0) {
            this.IsGenSethide = false;
            this.getGenSetDetails = data[0];
            console.log(this.getGenSetDetails, "Genset getGenSetDetails");
            this.getGenSetFormData = data[1];
            this.PreviousReading = this.getGenSetFormData[0].FlowMeterReadingPrv;
            this.GSSAPEquipmentNumber = this.getGenSetFormData[0].GasGenSetCode;
            this.GSmeterTotaliser = this.getGenSetFormData[0].FlowMeterReading;
            this.GSjumpReading = this.getGenSetFormData[0].JumpReadingFMR;
            this.GSjumpReadingCount = this.getGenSetFormData[0].JumpReadingFMRCount;
            this.JumpCertificateGenset = this.getGenSetFormData[0].JumpCeritificateFMR;
            if (this.JumpCertificateGenset != '')
              this.GensetShowJumpImage = true;
            else
              this.GensetShowJumpImage = false;

            this.GSremark = this.getGenSetFormData[0].Remark;
            this.GSRunHrs = this.getGenSetFormData[0].RunninInHours;
            this.GSRunMins = this.getGenSetFormData[0].RunningInMinutes;
            this.GSisCRSentToHo = this.getGenSetFormData[0].isCRSentToHo;
            this.GSisStationSubmitted = this.getGenSetFormData[0].isStationSubmitted;
            console.log(this.GSisCRSentToHo, "Genset GSisCRSentToHo");
            console.log(this.GSisStationSubmitted, "Genset GSisStationSubmitted");

            if (parseFloat(this.GSjumpReading) > 0.000) {
              this.GSfilevisible = false;
              $("#GSIscheckbox").prop("checked", true);
              this.GSJumpVisible = false;
            }
            else {
              this.GSfilevisible = true;
              $("#GSIscheckbox").prop("checked", false);
              this.GSJumpVisible = true;
            }

            this.Hours = [];
            this.Minutes = [];
            for (var i = 0; i <= 24; i++) {
              if (i <= 9) {
                var a = '0';
                this.Hours.push(a + i);
              } else if (i >= 10) {
                var a = '';
                this.Hours.push('' + i);
              }
            }
            for (var i = 0; i <= 59; i++) {
              if (i <= 9) {
                var a = '0';
                this.Minutes.push(a + i);
              } else if (i >= 10) {
                var a = '';
                this.Minutes.push('' + i);
              }
            }
            if (data[0].length > 0) {
              if (GenSetId == '-999') {
                this.GenSetId = this.getGenSetDetails[0].GenSetId;
                this.getGSIJumpHistory('GET');
              }
              this.commonServices.loadingDismiss();
            }
            else {
              console.log('No data available.');
              this.commonServices.loadingDismiss();
            }
          }
          else {
            this.commonServices.presentToast('No Gas Genset data available. Please try another station.')
            this.commonServices.loadingDismiss();
            this.IsGenSethide = true;
          }
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      );
    }
    catch (err) {
      this.commonServices.presentToast(err);
      this.commonServices.loadingDismiss();
    }
  }

  GensetuploadJumpReadingImg(str: any) {
    this.GSuploadedfile = str.target.files[0];
  }

  Gensetfileuploadreset(str: any) {
    this.GSuploadedfilereset = str.target.files[0]
  }

  selecthrsmnts(value, flag) {
    if (flag == 'HH') {
      this.GSRunHrs = value;
    } else {
      this.GSRunMins = value;
    }
    console.log('Selected : ' + this.GSRunHrs + ':' + this.GSRunMins);
  }

  GensetjumpreadingValue(value) {
    this.GSjumpReading = value;
    if (this.GSjumpReading != '') {
      this.GSfilevisible = false;
    } else {
      this.GSfilevisible = true;
    }
  }

  InsertGenSetDetails() {
    var MyJson = {
      LoginId: localStorage.getItem('LoginId'),
      GenSetId: this.GenSetId,
      RunningHours: this.GSRunHrs + ":" + this.GSRunMins,
      FlowMeterReading: this.GSmeterTotaliser,
      JumpReadingFMR: 0, // ((this.GSjumpReading == '') ? '0' : this.GSjumpReading),
      JumpReadingFMRCount: 0, // this.GSjumpReadingCount,
      JumpCeritificateFMR: ((this.GSuploadedfile == undefined) ? '' : this.GSuploadedfile.name),
      Remark: this.remark,
      StationCode: localStorage.getItem('LoginId'),
      FilePath: localStorage.getItem('LoginId') + "/genset/",
      DPREntryDate: this.DPREntryDateTime
    };

    this.commonServices.postwithservice("GasGensetAverage", {
      LoginId: localStorage.getItem('LoginId'),
      DPREntryDate: this.dp.transform(this.DPREntryDateTime, 'dd/MMM/yyyy')
      // DPREntryDate:this.dp.transform(this.DPREntryDateTime,'dd-MMM-yyyy')
    }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp).Table[0]
        this.GasGensetReadingAverage = data.FinalAmount;
        console.log(this.GasGensetReadingAverage);
        console.log(this.GSmeterTotaliser);
      },
      (error) => {
        console.log(error);
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
    //IOS Comment
    // this.GSfiles = $('#GSfileInput');
    // console.log(this.GSfiles);

    var frmData = new FormData();
    //IOS Comment
    // var fileInput = this.GSfiles[0];
    frmData.append("genSetDetail", JSON.stringify(MyJson));

    //IOS Comment
    // if (this.GSuploadedfile != undefined) {
    //   frmData.append('JumpCeritificateFMR', this.GSuploadedfile, this.GSuploadedfile.name);
    // }

    //IOS Comment
    // var ErrorMsg = this.checkGensetvalidations(MyJson, fileInput);
    var ErrorMsg = this.checkGensetvalidations(MyJson);
    console.log(ErrorMsg);
    if (ErrorMsg == '' || ErrorMsg == undefined) {

      if (Number(this.GSmeterTotaliser) <= Number(this.PreviousReading)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Flow Meter Reading, Do you want to continue?").then((res: any) => {
            console.log(res);
            // if (confirm("Suspected Flow Meter Reading, Do you want to continue?")) {
            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.InsertGenSetDetails(frmData).subscribe(
                (resp: any) => {
                  this.commonServices.loadingDismiss();
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status);
                  if (data != '') {
                    this.GetStationGenSet(this.GenSetId);
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

      else if (this.GSmeterTotaliser > this.GasGensetReadingAverage) {
        // if(confirm("Wrong Entry for Meter Skid Reading, Do you want to continue?")) {
        this.commonServices.alertMessage("Confirm",
          "Wrong Entry for Flow Meter Reading, Do you want to continue?").then((res: any) => {
            console.log(res);

            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.InsertGenSetDetails(frmData).subscribe(
                (resp: any) => {
                  this.commonServices.loadingDismiss();
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status);
                  if (data != '') {
                    this.GetStationGenSet(this.GenSetId);
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

      else if (Number(this.GSmeterTotaliser) >= 2 * Number(this.PreviousReading)) {
        this.commonServices.alertMessage("Confirm",
          "Suspected Flow Meter Reading, Do you want to continue?").then((res: any) => {
            console.log(res);
            // if (confirm("Suspected Flow Meter Reading, Do you want to continue?")) {
            if (!res) {
              this.commonServices.loadingPresent();
              this.commonServices.InsertGenSetDetails(frmData).subscribe(
                (resp: any) => {
                  this.commonServices.loadingDismiss();
                  const data = resp;
                  console.log(data);
                  this.commonServices.presentToast(data.Status);
                  if (data != '') {
                    this.GetStationGenSet(this.GenSetId);
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
      else {
        this.commonServices.loadingPresent();
        this.commonServices.InsertGenSetDetails(frmData).subscribe(
          (resp: any) => {
            this.commonServices.loadingDismiss();
            const data = resp;
            console.log(data);
            this.commonServices.presentToast(data.Status);
            if (data != '') {
              this.GetStationGenSet(this.GenSetId);
            }
          },
          (error) => {
            this.commonServices.presentToast('Something went wrong.');
            this.commonServices.loadingDismiss();
          }
        )
      }
    } else {
      this.commonServices.presentToast(ErrorMsg);
    }

  }
  //IOS Comment
  //checkGensetvalidations(genSetDetailJson, fileInput) {
  checkGensetvalidations(genSetDetailJson) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var foundError = '';
    var TotalHrs = parseInt(this.GSRunHrs);
    var TotalMins = parseInt(this.GSRunMins);
    console.log(TotalHrs, TotalMins);
    console.log(genSetDetailJson.FlowMeterReading);
    console.log(this.PreviousReading);
    console.log(genSetDetailJson.FlowMeterReading == undefined);

    if (parseFloat(genSetDetailJson.FlowMeterReading) > parseFloat(this.PreviousReading) && (genSetDetailJson.FlowMeterReading != undefined)) {
      if (this.GSRunHrs + ":" + this.GSRunMins == '00:00') {
        foundError = 'Running hours are required.';
        return foundError;
      }
    }

    if ((TotalHrs == 24 && TotalMins > 0)) {
      foundError = 'Total Hours must be less/equal than 24.';
      return foundError;
    }

    if (genSetDetailJson.FlowMeterReading == '') {
      foundError = 'Flow Meter Reading is required.';
      return foundError;
    }
    if ((genSetDetailJson.JumpReadingFMR == '' || genSetDetailJson.JumpReadingFMR == undefined || parseFloat(genSetDetailJson.JumpReadingFMR) == parseFloat("0")) && parseFloat(genSetDetailJson.FlowMeterReading) == parseFloat("0")) {
      foundError = 'Invalid Flow Meter Reading';
      return foundError;
    }
    if (genSetDetailJson.FlowMeterReading != "") {
      if (regexNumeric.test(genSetDetailJson.FlowMeterReading) == false) {
        foundError = 'Only numeric value allowed for reading.';
        return foundError;
      }
      if (regexDecimalThree.test(genSetDetailJson.FlowMeterReading) == false) {
        foundError = 'Three decimal with Max 10 Precision values allowed';
        return foundError;
      }
      if (parseFloat(genSetDetailJson.FlowMeterReading) < 0) {
        foundError = 'Flow Meter Reading must be Positive.';
        return foundError;
      }
    }
    //New Comment//
    // if (genSetDetailJson.JumpReadingFMR != '' && parseFloat(genSetDetailJson.JumpReadingFMR) > 0) {
    //   //  if (parseFloat(MeterSkidDetailJson.JumpReadingFMT) > 0 && fileInput.files.length == 0 && MeterSkidDetailJson.JumpCeritificateLCV == '')    
    //   //    { 
    //   //      foundError = 'Please attach the Jump certificate.'; 
    //   //      return foundError; 
    //   //    }
    //   // if (fileInput.files.length > 0) {
    //   //     var validExtension = 'jpeg,jpg,png,gif';
    //   //     for (var i = 0; i < fileInput.files.length; i++) {
    //   //         var fileExtension = fileInput.files[i].name.split('.')[1];
    //   //         if (validExtension.indexOf(fileExtension) < 0) {
    //   //             foundError = 'Attachment allowed only for [' + validExtension + '].'; return foundError;
    //   //         }
    //   //     }
    //   // }
    //   if (regexNumeric.test(genSetDetailJson.JumpReadingFMR) == false) {
    //     foundError = 'Only numeric value allowed for reading.'; return foundError;
    //   }
    //   if (regexDecimalThree.test(genSetDetailJson.JumpReadingFMR) == false) {
    //     foundError = 'Three decimal with Max 10 Precision values allowed'; return foundError;
    //   }

    // }
    // var JumpReadingFMTCnt = genSetDetailJson.JumpFMRCnt;
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
    //     foundError = 'Gas GenSet Reading count must be Positive.';
    //     return foundError;
    //   }
    //   if (genSetDetailJson.JumpReadingFMR == '' || (genSetDetailJson.JumpReadingFMR == undefined)) {
    //     foundError = 'Please enter the Jump reading.';
    //     return foundError;
    //   }
    // }
    // // else {
    // //   if (genSetDetailJson.JumpReadingFMR != '' && parseFloat(genSetDetailJson.JumpReadingFMR) != 0) {
    // //       foundError = 'Plese enter the Jump Reading count.';
    // //       return foundError;
    // //   }
    // // }   
    return foundError;
  }

  Gensetresetchange(value) {
    this.GSresetTypeJsonSelected = value;
    console.log(this.GSresetTypeJsonSelected);
  }

  getGSIJumpHistory(FlagType) {
    this.clearGenset();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'GSET',
      Id: '',
      StationCode: '',
      MeterOfId: this.GenSetId,
      MeterType: 'MR',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""

    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.GSIJumpListHistory = JSON.parse(resp).Table;
        console.log(this.GSIJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteGSIJumpHistory(Id: string, FlagReading: string, itm: any) {
    // if (confirm("Are you sure to delete this record..?")) {
    //   var Json = {
    //     Id: Id,
    //     FlagEntryFor: 'DELETE',
    //     FlagReadingType: FlagReading,
    //     MeterOf: 'GSET',
    //     MeterOfId: this.GenSetId,
    //     EntryDate: this.geteDate.selcteddate
    //   }
    //   this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
    //     (resp: any) => {
    //       const data = JSON.parse(resp);
    //       this.commonServices.presentToast("Record deleted successfully");
    //       setTimeout(() => {
    //         this.getGSIJumpHistory('GET');
    //       });
    //       this.commonServices.loadingDismiss();
    //     },
    //     (error) => {
    //       this.commonServices.presentToast("Something went wrong.");
    //       this.commonServices.loadingDismiss();
    //     }
    //   )
    // }
    this.commonServices.alertMessage("Delete",
    "Are you sure to delete this record..?").then((res:any) => {
      console.log(res);
      if (!res) {
        var Json = {
              Id: Id,
              FlagEntryFor: 'DELETE',
              FlagReadingType: FlagReading,
              MeterOf: 'GSET',
              MeterOfId: this.GenSetId,
              EntryDate: this.geteDate.selcteddate
            }
            this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                this.commonServices.presentToast("Record deleted successfully");
                setTimeout(() => {
                  this.getGSIJumpHistory('GET');
                });
                this.commonServices.loadingDismiss();
              },
              (error) => {
                this.commonServices.presentToast("Something went wrong.");
                this.commonServices.loadingDismiss();
              }
            )
      }
    });
    this.getGSIJumpHistory('GET');
  }

  UpdateGSIJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.GSOldMeterReading = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.GSFlagJumpType = "J" }
    else if (itm.Action == "Change") { this.GSFlagJumpType = "C" }
    else { this.GSFlagJumpType = "R" }
  }

  GensetJReadingvalue(value) {
    this.GSJReading = value;
    if (this.GSJReading != '') {
      this.GSpopupfilevisible = false;
    }
    else {
      this.GSpopupfilevisible = true;
    }
  }

  // Gensetchangeresetpopup() {
  //     console.log(this.getGenSetFormData);
  //     var MyJsonreset = {
  //         StationCode: localStorage.getItem('LoginId'),
  //         MeterOf: 'GSET',
  //         MeterOfId: this.GenSetId,
  //         MeterType: 'MR',
  //         FlagRead: 0,
  //         FlagReadingType: this.GSresetTypeJsonSelected,
  //         Id: this.getGenSetFormData[0].MeterResetId,
  //         LoginId: localStorage.getItem('LoginId'),
  //         PrvReading: this.GSOldMeterReading,
  //         JumpReading: ((this.GSJReading == '') ? '0' : this.GSJReading),
  //         ReadingOnSwitch: ((this.getGenSetFormData[0].ReadingOnSwitch == '') ? '0' : this.getGenSetFormData[0].ReadingOnSwitch),
  //         FilePath: localStorage.getItem('LoginId') + "/Genset/",
  //         MeterAfterJump : this.NewMeterReading,
  //         MeterJumpRemark : this.MeterJumpRemark,
  //         JumpHistoryId : this.JumpHistoryId,
  //         MeterBeforeJump: this.GSOldMeterReading
  //       };

  //       this.GSfilesreset = $('#GSfileInputreset');
  //       var frmData = new FormData();
  //       var fileInputreset = this.GSfilesreset[0];
  //       frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
  //       if(this.GSuploadedfilereset != undefined) {
  //           console.log(this.uploadedfilereset);
  //           frmData.append('JumpReadingFile', this.GSuploadedfilereset, this.GSuploadedfilereset.name);
  //         }
  //       var ErrorMsg = this.changeresetValidations(MyJsonreset);

  //       if(ErrorMsg == '' || ErrorMsg == undefined) {
  //           this.commonServices.HoldResetReading(frmData).subscribe(
  //               (resp: any) => {
  //               const data= (resp);
  //               if(data.Status=="Inserted") {
  //                 this.commonServices.presentToast('Record Saved Successfully.');
  //                 this.getGSIJumpHistory('GET');
  //               }
  //               else if(data.Status=="Updated") {
  //                 this.commonServices.presentToast('Record Updated Successfully.');
  //                 this.getGSIJumpHistory('GET');
  //               }
  //               else {
  //                 this.commonServices.presentToast(data.Status);
  //               }
  //               },
  //               (error) =>{
  //                 this.commonServices.presentToast('Something went wrong.');
  //                  this.commonServices.loadingDismiss();
  //              }
  //           )
  //       }else {
  //           this.commonServices.presentToast(ErrorMsg);
  //       }
  // }

  clearGenset() {
    this.GSFlagJumpType = "J";
    this.GSOldMeterReading = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
  }

  Gensetchangeresetpopup() {
    console.log(this.getGenSetFormData);
    var MyJsonreset = {
      StationCode: localStorage.getItem('LoginId'),
      MeterOf: 'GSET',
      MeterOfId: this.GenSetId,
      MeterType: 'MR',
      FlagRead: 0,
      FlagReadingType: this.GSresetTypeJsonSelected,
      Id: this.getGenSetFormData[0].MeterResetId,
      LoginId: localStorage.getItem('LoginId'),
      PrvReading: this.GSOldMeterReading,
      JumpReading: ((this.GSJReading == '') ? '0' : this.GSJReading),
      ReadingOnSwitch: ((this.getGenSetFormData[0].ReadingOnSwitch == '') ? '0' : this.getGenSetFormData[0].ReadingOnSwitch),
      FilePath: localStorage.getItem('LoginId') + "/Genset/",
      MeterAfterJump: this.NewMeterReading,
      MeterJumpRemark: this.MeterJumpRemark,
      JumpHistoryId: this.JumpHistoryId,
      MeterBeforeJump: this.GSOldMeterReading,
      EntryDate: this.geteDate.selcteddate
    };
    
    this.JumpHistoryId = "";
    this.GSfilesreset = $('#GSfileInputreset');
    var frmData = new FormData();
    var fileInputreset = this.GSfilesreset[0];
    frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
    if (this.GSuploadedfilereset != undefined) {
      console.log(this.uploadedfilereset);
      frmData.append('JumpReadingFile', this.GSuploadedfilereset, this.GSuploadedfilereset.name);
    }
    var ErrorMsg = this.changeresetValidations(MyJsonreset,fileInputreset);

    if (ErrorMsg == '' || ErrorMsg == undefined) {
      this.commonServices.HoldResetReading(frmData).subscribe(
        (resp: any) => {
          const data = (resp);
          if (data.Status == "Inserted") {
            this.getGSIJumpHistory('GET');
            this.clearGenset();
            this.commonServices.presentToast('Record Saved Successfully.');
          }
          else if (data.Status == "Updated") {
            this.getGSIJumpHistory('GET');
            this.clearGenset();
            this.commonServices.presentToast('Record Updated Successfully.');
          }
          else {
            this.commonServices.presentToast(data.Status);
          }
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      )
    } else {
      this.commonServices.presentToast(ErrorMsg);
    }
    this.getGSIJumpHistory('GET');
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
}