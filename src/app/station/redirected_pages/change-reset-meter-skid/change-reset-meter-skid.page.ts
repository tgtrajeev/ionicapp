import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-change-reset-meter-skid',
  templateUrl: './change-reset-meter-skid.page.html',
  styleUrls: ['./change-reset-meter-skid.page.scss'],
})
export class ChangeResetMeterSkidPage implements OnInit {
  @ViewChild('inputFile', { static: false }) InputFileVar;
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

  MSisCRSentToHo: number = 0;
  MSisStationSubmitted: number = 0;
  MSfilevisible: boolean = false;
  popupfilevisible: boolean = true;
  JumpVisible: boolean = true;
  stationName: string = "";
  addForm: any;
  NewMeterReading: string = "";
  MeterJumpRemark: string = "";
  MSJumpListHistory: any = [];
  JumpHistoryId: string = '';
  MSJReading: string = "";
  MSpopupfilevisible: boolean = true;
  DPREntryDate: any;
  MSFlagJumpType = 'J';
  resetTypeJsonSelected: string = "J";

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.addForm = formBuilder.group({
      OldMeterReading: ['', Validators.required],
      JReading: ['', Validators.required],
      jumpReadingCount: ['', Validators.required],
      remark: ['', Validators.required],
    })
    this.DPREntryDate = this.activatedroute.snapshot.paramMap.get("entryDate");
    this.getStationMeterSkidData();
  }

  ngOnInit() {
    console.log("Change Meter Skid");
  }

  fileuploadreset(file: FileList, event: any) {
    this.uploadedfilereset = file.item(0);
  }

  getStationMeterSkidData() {
    try {
      this.commonServices.loadingPresent();
      this.commonServices.postwithservice("GetStationMeterSkid",
        {
          StationCode: localStorage.getItem('stationCode'), LoginId: localStorage.getItem('stationCode'),
          DPREntryDate: this.meterDate.selcteddate
        }).subscribe(
          (response: any) => {
            // this.commonServices.loadingDismiss();

            const data = JSON.parse(response);
            console.log(data[0]);
            if (data[0].length > 0) {
              this.IsMSkidhide = false;
              this.meterStationSkidData = data[0][0];
              console.log(this.meterStationSkidData, "GK meterStationSkidData");
              this.MSMeterSkidCode = this.meterStationSkidData.MeterSkidCode
              this.MSFlowMeterTotaliserPrv = this.meterStationSkidData.FlowMeterTotaliserPrv
              console.log(this.MSMeterSkidCode, "GK MSMeterSkidCode");
              console.log(this.MSFlowMeterTotaliserPrv, "GK MSFlowMeterTotaliserPrv");
              this.meterTotaliser = this.meterStationSkidData.FlowMeterTotaliser;
              this.jumpReading = this.meterStationSkidData.JumpReadingFMT;
              this.jumpReadingCount = this.meterStationSkidData.JumpReadingFMTCount;
              this.remark = this.meterStationSkidData.Remark;
              this.MSisCRSentToHo = isNullOrUndefined(parseInt(this.meterStationSkidData.isCRSentToHo)) ? 0 : this.meterStationSkidData.isCRSentToHo;
              this.MSisStationSubmitted = isNullOrUndefined(parseInt(this.meterStationSkidData.isStationSubmitted)) ? 0 : this.meterStationSkidData.isStationSubmitted;
              console.log(this.MSisCRSentToHo, "MSisCRSentToHo");
              console.log(this.MSisStationSubmitted, "MSisStationSubmitted");
              this.getMSJumpHistory('GET');
            }
            else {
              this.commonServices.presentToast('No Meter Skid data available. Please try another station.')

              this.IsMSkidhide = true;
              this.MSisCRSentToHo = 0;
              this.MSisStationSubmitted = 0;
              console.log(this.MSisCRSentToHo, "MSisCRSentToHo");
              console.log(this.MSisStationSubmitted, "MSisStationSubmitted");
            }
            this.commonServices.loadingDismiss();
          },
          (error) => {
            console.log('Something went wrong.');
            this.commonServices.loadingDismiss();
          }
        );
    }
    catch (err) {
      console.log(err);
    }
  }
  resetchange(value, flag) {
    this.resetTypeJsonSelected = value;
    console.log(this.resetTypeJsonSelected);
  }
  upload(str: any) {
    this.uploadedfile = str.target.files[0];
    console.log(this.uploadedfile);
  }

  // MSchangeresetpopup() {
  //   var MyJsonreset = {
  //     StationCode: localStorage.getItem('LoginId'),
  //     MeterOf: 'MS',
  //     MeterOfId: this.meterStationSkidData.MeterSkidId,
  //     MeterType: 'FMT',
  //     FlagRead: 0,
  //     FlagReadingType: this.resetTypeJsonSelected,
  //     Id: this.meterStationSkidData.MeterResetId,
  //     LoginId: localStorage.getItem('Loginidd'),
  //     PrvReading: this.OldMeterReading,
  //     JumpReading: this.OldMeterReading,
  //     ReadingOnSwitch: ((this.meterStationSkidData.ReadingOnSwitch == '') ? '0' : this.meterStationSkidData.ReadingOnSwitch),
  //     FilePath: localStorage.getItem('LoginId') + "/MeterSkid/",
  //     MeterAfterJump : this.NewMeterReading,
  //     MeterJumpRemark : this.MeterJumpRemark,
  //     JumpHistoryId : this.JumpHistoryId
  //   };
  //   this.filesreset = $('#MSfileInputreset');

  //   var frmData = new FormData();
  //   var fileInputreset = this.filesreset[0];
  //   frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
  //   if (this.uploadedfilereset != undefined) {
  //     console.log(this.uploadedfilereset);
  //     frmData.append('JumpReadingFile', this.uploadedfilereset, this.uploadedfilereset.name);
  //   }

  //   var ErrorMsg = this.changeresetValidation(MyJsonreset);

  //   if (ErrorMsg == '' || ErrorMsg == undefined) {
  //     this.commonServices.loadingPresent();
  //     this.commonServices.HoldResetReading(frmData).subscribe(
  //       (resp: any) => {
  //         const data = resp;
  //         if ( data.Status == "Inserted") {
  //           this.commonServices.presentToast('Record Saved Successfully.');
  //           this.getMSJumpHistory('GET');
  //         }
  //         else if (data.Status == "Updated") {
  //           this.commonServices.presentToast('Record Updated Successfully.');
  //           this.getMSJumpHistory('GET');
  //         }
  //         else {
  //           this.commonServices.presentToast(data.Status);
  //         }
  //         this.commonServices.loadingDismiss();
  //       },
  //       (error) => {
  //         this.commonServices.presentToast('Something went wrong.');
  //         this.commonServices.loadingDismiss();
  //       }
  //     )
  //   }
  //   else {
  //     this.commonServices.presentToast(ErrorMsg);
  //   }
  // }
  // MSchangeresetpopup() {
  //   var MyJsonreset = {
  //     StationCode: localStorage.getItem('LoginId'),
  //     MeterOf: 'MS',
  //     MeterOfId: this.meterStationSkidData.MeterSkidId, 
  //     MeterType: 'FMT',
  //     FlagRead: 0,
  //     FlagReadingType: this.resetTypeJsonSelected,
  //     Id: this.meterStationSkidData.MeterResetId,
  //     LoginId: localStorage.getItem('LoginId'),
  //     PrvReading: this.OldMeterReading,
  //     MeterBeforeJump: this.OldMeterReading,
  //     JumpReading: ((this.JReading == '') ? '0' : this.JReading),
  //     ReadingOnSwitch: ((this.meterStationSkidData.ReadingOnSwitch == '') ? '0' : this.meterStationSkidData.ReadingOnSwitch),
  //     FilePath: localStorage.getItem('LoginId') + "/MeterSkid/",
  //     MeterAfterJump : this.NewMeterReading,
  //     MeterJumpRemark : this.MeterJumpRemark,
  //     JumpHistoryId : this.JumpHistoryId,
  //     DetailId : this.meterStationSkidData.MeterSkidId,
  //     EntryDate:this.DPREntryDate
  //  };


  // this.filesreset = $('#MSfileInputreset');

  // var frmData = new FormData();
  // var fileInputreset = this.filesreset[0];
  // frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
  // if(this.uploadedfilereset != undefined) {
  //     console.log(this.uploadedfilereset);
  //     frmData.append('JumpReadingFile', this.uploadedfilereset, this.uploadedfilereset.name);
  //    }

  // var ErrorMsg = this.changeresetValidation(MyJsonreset);

  // if(ErrorMsg == '' || ErrorMsg == undefined) {
  //     this.commonServices.HoldResetReading(frmData).subscribe(
  //         (resp: any) => {
  //             const data= (resp);
  //             if(data.Status=="Inserted") {
  //               this.commonServices.presentToast('Record Saved Successfully.');
  //               this.getMSJumpHistory('GET');
  //               this.clearMS();
  //             }
  //             else if(data.Status=="Updated") {
  //               this.commonServices.presentToast('Record Updated Successfully.');
  //               this.getMSJumpHistory('GET');
  //               this.clearMS();
  //             }
  //             else {
  //               this.commonServices.presentToast(data.Status);
  //             }
  //         },
  //         (error) =>{this.commonServices.presentToast('Something went wrong.');

  //     }
  //     )
  //  }
  //  else {
  //     (ErrorMsg);
  //   }   


  // }
  MSchangeresetpopup() {
    var MyJsonreset = {
      StationCode: localStorage.getItem('Loginidd'),
      MeterOf: 'MS',
      MeterOfId: this.meterStationSkidData.MeterSkidId,
      MeterType: 'FMT',
      FlagRead: 0,
      FlagReadingType: this.resetTypeJsonSelected,
      Id: this.meterStationSkidData.MeterResetId,
      LoginId: localStorage.getItem('Loginidd'),
      PrvReading: this.OldMeterReading,
      MeterBeforeJump: this.OldMeterReading,
      JumpReading: ((this.JReading == '') ? '0' : this.JReading),
      ReadingOnSwitch: ((this.meterStationSkidData.ReadingOnSwitch == '') ? '0' : this.meterStationSkidData.ReadingOnSwitch),
      FilePath: localStorage.getItem('Loginidd') + "/MeterSkid/",
      MeterAfterJump: this.NewMeterReading,
      MeterJumpRemark: this.MeterJumpRemark,
      JumpHistoryId: this.JumpHistoryId,
      DetailId: this.meterStationSkidData.MeterSkidId,
      EntryDate: this.DPREntryDate
    };
    this.JumpHistoryId = "";
    this.filesreset = $('#MSfileInputreset');

    var frmData = new FormData();
    var fileInputreset = this.filesreset[0];
    frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
    if (this.uploadedfilereset != undefined) {
      console.log(this.uploadedfilereset);
      frmData.append('JumpReadingFile', this.uploadedfilereset, this.uploadedfilereset.name);
    }

    var ErrorMsg = this.changeresetValidation(MyJsonreset,fileInputreset);

    if (ErrorMsg == '' || ErrorMsg == undefined) {
      this.commonServices.loadingPresent();
      this.commonServices.HoldResetReading(frmData).subscribe(
        (resp: any) => {
          this.commonServices.loadingDismiss();
          const data = (resp);
          if (data.Status == "Inserted") {
            this.commonServices.presentToast('Record Saved Successfully.');
            this.getMSJumpHistory('GET');
            this.clearMS();
          }
          else if (data.Status == "Updated") {
            this.commonServices.presentToast('Record Updated Successfully.');
            this.getMSJumpHistory('GET');
            this.clearMS();
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
    }
    else {
      this.commonServices.presentToast(ErrorMsg);
    }
  }
  
  getMSJumpHistory(FlagType) {
    this.clearMS();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'MS',
      Id: '',
      StationCode: '',
      MeterOfId: this.meterStationSkidData.MeterSkidId,
      MeterType: 'FMT',
      EntryDate: this.DPREntryDate,
      FlagReadingType: ""
    };
    console.log(obj);

    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.MSJumpListHistory = JSON.parse(resp).Table;
        console.log(this.MSJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteMSJumpHistory(Id, FlagReading, itm) {
    this.commonServices.alertMessage("Delete",
      "Are you sure to delete this record..?").then((res: any) => {
        console.log(res);

        if (!res) {
          var Json = {
            Id: Id,
            FlagEntryFor: 'DELETE',
            FlagReadingType: FlagReading,
            MeterOf: 'MS',
            MeterOfId: this.meterStationSkidData.MeterSkidId,
            EntryDate: this.DPREntryDate
          }
          this.commonServices.loadingPresent();
          this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              this.getMSJumpHistory('GET');
              this.commonServices.presentToast("Record Deleted Successfully");
              //this.openPopup(this.popupFor);
              // setTimeout(() => {
              //   this.getMSJumpHistory('GET');
              // });
              this.clearMS();
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
    //     MeterOf: 'MS',
    //     MeterOfId: this.meterStationSkidData.MeterSkidId,
    //     EntryDate: this.DPREntryDate
    //   }
    //   this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
    //     (resp: any) => {
    //       const data = JSON.parse(resp);
    //       this.getMSJumpHistory('GET');
    //       this.commonServices.presentToast("Record Deleted Successfully");
    //       //this.openPopup(this.popupFor);
    //       // setTimeout(() => {
    //       //   this.getMSJumpHistory('GET');
    //       // });

    //       this.commonServices.loadingDismiss();
    //     },
    //     (error) => {
    //       this.commonServices.presentToast("Something went wrong.");
    //       this.commonServices.loadingDismiss();
    //     })
    // }

  }


  UpdateMSJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.OldMeterReading = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.MSFlagJumpType = "J" }
    else if (itm.Action == "Change") { this.MSFlagJumpType = "C" }
    else { this.MSFlagJumpType = "R" }
  }

  MSJReadingvalue(value) {
    this.MSJReading = value;
    if (this.MSJReading != '') {
      this.MSpopupfilevisible = false;
    }
    else {
      this.MSpopupfilevisible = true;
    }
  }

  clearMS() {
    this.MSFlagJumpType = "J";
    this.OldMeterReading = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
    this.InputFileVar.value = "";
  }

  changeresetValidation(LcvDetailJsonreset,fileInput) {
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