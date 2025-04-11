import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-package',
  templateUrl: './package.page.html',
  styleUrls: ['./package.page.scss'],
})
export class PackagePage implements OnInit {
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  varSfs: boolean = false;
  myFlag: number = 0;
  varDfs: boolean = false;
  flagDfs: number = 0;
  varEfs: boolean = false;
  flagEfs: number = 0;
  VentFlowMeterReading: string = "0.00";
  flagVentFlow: number = 0;
  IsVentFlow: boolean = false;
  showhideflag1: boolean = false;
  showhideflag2: boolean = false;
  showhideflag3: boolean = false;
  showhideflag4: boolean = false;
  hidepackage: boolean = true;
  /////////////////////Package Vars////////////////
  IsPackagehide: boolean = false;
  stationName: string = "";

  TablesPkgs: any[];
  PackageDetailJson: any = [];
  resetMeterJSON: any[];
  globalDetail: any = JSON.parse(localStorage.getItem('globalDetail'));
  summary: any = {
    prm_id: (this.globalDetail[0].prm_id == null || this.globalDetail[0].prm_id === undefined) ? 0 : this.globalDetail[0].prm_id
  };

  filesSFM: File;
  filesDFM: File;
  filesEFM: File;
  filesVFM: File;

  JumpfilesSFM: File;
  JumpfilesDFM: File;
  JumpfilesEFM: File;
  JumpfilesVFM: File;

  ActionTypeSFM: string = "J";
  ActionTypeDFM: string = "J";
  ActionTypeEFM: string = "J";
  ActionTypeVFM: string = "J";

  flag: string = "";
  arrPath: string = "";
  SelectedPkgId = { PkgId: "0" };
  mdlResetPopup: boolean = false;
  LoginId: string = localStorage.getItem('LoginId');
  StationCode: string = localStorage.getItem('LoginId');
  MeterSkidCode: string = "";
  resetTypeJsonSelected: string = "J";

  PKisCRSentToHo: number = 0;
  PKisStationSubmitted: number = 0;
  glovalJson: any = JSON.parse(sessionStorage.getItem('globalDetail'));
  PackageId: string = "0";
  PackageCode: string = "";
  SuctionPressure: string = "";
  PrimeMover: string = "";

  Remark: string = "";
  mdlSelectedRemark: string = "";
  mdlRemarkTextShow: boolean = true;
  mdlRemark: string = "";

  JumpReadingEFMCount: string = "";
  JumpCertificateEFM: string = "";
  JumpReadingEFM: string = "";
  mdlShowCertificates: boolean = false;

  mdlResetPopupDFM: boolean = false;
  JumpReadingDFM: string = "";
  JumpReadingDFMCount: string = "";
  JumpCertificateDFM: string = "";
  DischargeFlowMeterReading: string = "";
  DischargeFlowMeterReadingPrv: string = "";

  EngineFlowMeterReading: string = "";
  EngineFlowMeterReadingPrv: string = "";

  JumpReadingSFMCount: string = "";
  JumpCertificateSFM: string = "";
  JumpReadingSFM: string = "";

  SuctionFlowMeterReading: string = "";
  SuctionFlowMeterReadingPrv: string = "";
  SelectedRegion: string = '';

  resetTypeJsonSelectedSFM: any = '0';
  resetTypeJsonSelectedDFM: any = '0';
  resetTypeJsonSelectedEFM: any = '0';

  resetTypeJsonSFM = [{ Text: 'Jump' }, { Text: 'Reset' }, { Text: 'Change' }];
  resetTypeJsonDFM = [{ Text: 'Jump' }, { Text: 'Reset' }, { Text: 'Change' }];
  resetTypeJsonEFM = [{ Text: 'Jump' }, { Text: 'Reset' }, { Text: 'Change' }];

  jsonRemarks = [
    { text: 'Breakdown due to Leakage', value: 'Breakdown due to Leakage' },
    { text: 'Mechanical breakdown', value: 'Mechanical breakdown' },
    { text: 'Instrumentation breakdown', value: 'Instrumentation breakdown' },
    { text: 'Powercut', value: 'Powercut' },
    { text: 'Voltage problem', value: 'Voltage problem' },
    { text: 'Maintenance Shutdown', value: 'Maintenance Shutdown'},
    { text: 'OK', value: 'OK'},
    { text: 'Other', value: 'Other' }
  ];
  RunHrs: any = [];
  RunMin: any = [];
  //Filling Running Hours
  selectedRhHr: string = '';
  selectedRhMin: string = '';
  //Filling ScheduleShutdown Hours 
  selectedSHr: string = '';
  selectedSMin: string = '';
  //Filling UnScheduleShutdown Hours 
  selectedUsHr: string = '';
  selectedUsMin: string = '';
  //Filling BreadDown Hours 
  selectedBdHr: string = '';
  selectedBdMin: string = '';

  ShowEngineMeter: boolean = false;

  mdlImgShowDFM: boolean = false;
  mdlImgShowSFM: boolean = false;
  mdlImgShowEFM: boolean = false;

  mdlResetPopupSFM: boolean = false;

  imgPathDFM: string = "";
  imgPathSFM: string = "";
  imgPathEFM: string = "";

  mdlReadingOnSwitchSFM: string = '0.000';
  mdlShowResetImageSFM: boolean = false;
  mdlShowResetReadingSFM: boolean = false;
  ResetMeterReadingOfTodaySFM: string = '';
  meterResetIdSFM: string = "";

  imgSFM: string = '';
  imgPathResetSFM: string = '';
  mdlResetJumpReadingSFM: string = '0.000';

  mdlShowResetImageDFM: boolean = false;
  meterResetIdDFM: string = '';
  ResetMeterReadingOfTodayDFM: string = '';
  mdlResetJumpReadingDFM: string = '0.000';

  imgDFM: string = '';
  imgPathResetDFM: string = '';
  mdlShowResetReadingDFM: boolean = false;
  mdlReadingOnSwitchDFM: string = "";

  mdlReadingOnSwitchVFM: string = "";
  mdlReadingOnSwitchEFM: string = "";
  meterResetIdEFM: string = "";
  ResetMeterReadingOfTodayEFM: string = '';
  mdlResetJumpReadingEFM: string = '0.000';
  mdlResetJumpReadingVFM: string = '0.000';
  imgEFM: string = '';
  imgPathResetEFM: string = '';
  mdlShowResetImageEFM: boolean = false;
  mdlShowResetReadingEFM: boolean = false;
  mdlResetPopupEFM: boolean = false;
  mdlResetPopupVFM: boolean = false;
  JumpVisibleSFS: boolean = true;
  JumpVisibleDFS: boolean = true;
  JumpVisibleEFS: boolean = true;

  resetTypeOptionSFM: string = "";
  DPREntryDateTime: any;
  uploadedfile: any;
  OldMeterReading: any;
  MSpopupfilevisible: boolean;
  jsonValidation: {
    ActionType: string; oldMeterReading: string;
    oldJumpReading: string; fileObject: any;
  };
  secondMaxDate: any = new Date().toISOString();
  MotorFrequency: any;
  //stationName:string="";
  getTimeStats() {
    var minutes = [
      { min: '00' }, { min: '01' }, { min: '02' }, { min: '03' }, { min: '04' }, { min: '05' }, { min: '06' }, { min: '07' }, { min: '08' }, { min: '09' }, { min: '10' }, { min: '11' }, { min: '12' },
      { min: '13' }, { min: '14' }, { min: '15' }, { min: '16' }, { min: '17' }, { min: '18' }, { min: '19' }, { min: '20' }, { min: '21' }, { min: '22' }, { min: '23' }, { min: '24' },
      { min: '25' }, { min: '26' }, { min: '27' }, { min: '28' }, { min: '29' }, { min: '30' }, { min: '31' }, { min: '32' }, { min: '33' }, { min: '34' }, { min: '35' }, { min: '36' },
      { min: '37' }, { min: '38' }, { min: '39' }, { min: '40' }, { min: '41' }, { min: '42' }, { min: '43' }, { min: '44' }, { min: '45' }, { min: '46' }, { min: '47' }, { min: '48' },
      { min: '49' }, { min: '50' }, { min: '51' }, { min: '52' }, { min: '53' }, { min: '54' }, { min: '55' }, { min: '56' }, { min: '57' }, { min: '58' }, { min: '59' }
    ];
    var hours = [
      { hrs: '00' }, { hrs: '01' }, { hrs: '02' }, { hrs: '03' }, { hrs: '04' }, { hrs: '05' }, { hrs: '06' }, { hrs: '07' },
      { hrs: '08' }, { hrs: '09' }, { hrs: '10' }, { hrs: '11' }, { hrs: '12' }, { hrs: '13' }, { hrs: '14' }, { hrs: '15' },
      { hrs: '16' }, { hrs: '17' }, { hrs: '18' }, { hrs: '19' }, { hrs: '20' }, { hrs: '21' }, { hrs: '22' }, { hrs: '23' }, { hrs: '24' }
    ];

    var timeStats = {
      minutes: minutes,
      hours: hours
    };
    return timeStats;
  }

  SHrs: any = [];
  SMin: any = [];
  UsHrs: any = [];
  UsMin: any = [];
  BdHrs: any = [];
  BdMin: any = [];
  glovalList: any = [];
  IscheckboxSFS: boolean = false;
  IscheckboxDFS: boolean = false;
  IscheckboxEFS: boolean = false;

  PackageOldReading: string = "";
  NewMeterReading: string = "";
  MeterJumpRemark: string = "";
  MSJumpListHistory: any = [];
  JumpHistoryId: string = '';
  MSJReading: string = "";
  SFMJumpListHistory: any = [];
  DFMJumpListHistory: any = [];
  EFMJumpListHistory: any = [];
  VFMJumpListHistory: any = [];
  SuctionFlowReadingAverage: string = '';
  DischargeFlowReadingAverage: string = '';
  EngineFlowReadingAverage: string = '';
  GSFlagJumpType = 'J';
  MSFlagJumpType = 'J'

  VentFlowMeterReadingPrv: string = "";
  errorS = false;; errorE = false;; errorD = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.geteDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);

      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.geteDate.selcteddate = latest_date;
      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      this.geteDate.selcteddate = this.DPREntryDateTime;
    }
  }

  ngOnInit() {
    this.PackageCallOninit();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  showFields_sfs() {
    if (this.myFlag == 0) {
      this.varSfs = true;
      this.myFlag = 1;
    }
    else {
      this.varSfs = false;
      this.myFlag = 0;
    }
  }
  showFields_dfs() {
    if (this.flagDfs == 0) {
      this.varDfs = true;
      this.flagDfs = 1;
    }
    else {
      this.varDfs = false;
      this.flagDfs = 0;
    }
  }

  showFields_efs() {
    if (this.flagEfs == 0) {
      this.varEfs = true;
      this.flagEfs = 1;
    }
    else {
      this.varEfs = false;
      this.flagEfs = 0;
    }
  }

  showFields_ventFlow() {
    if (this.flagVentFlow == 0) {
      this.IsVentFlow = true;
      this.flagVentFlow = 1;
    }
    else {
      this.IsVentFlow = false;
      this.flagVentFlow = 0;
    }
    // this.IsVentFlow = !this.IsVentFlow;
  }

  showhidechangereset(flag) {
    if (flag == '1') {
      {
        this.hidepackage = false;
        this.showhideflag1 = true;
        this.getSFMJumpHistory('GET');
      }
    }
    else if (flag == '2') {
      {
        this.hidepackage = false;
        this.showhideflag2 = true;
        this.getDFMJumpHistory('GET');
      }
    }
    else if (flag == '3') {
      this.hidepackage = false;
      this.showhideflag3 = true;
      this.getEFMJumpHistory('GET');
    }
    else if (flag == '4') {
      this.hidepackage = false;
      this.showhideflag4 = true;
      this.getVFMJumpHistory('GET');
    } else {
      this.hidepackage = true;
      this.showhideflag1 = false;
      this.showhideflag2 = false;
      this.showhideflag3 = false;
      this.showhideflag4 = false;
    }
  }

  packageOpen() {
    this.showhideflag1 = false;
    this.showhideflag2 = false;
    this.showhideflag3 = false;
    this.showhideflag4 = false;
    this.hidepackage = true;
  }

  changReset1Redirect() {
    this.router.navigate(['change-reset1-package']);
  }

  changReset2Redirect() {
    this.router.navigate(['change-reset2-package']);
  }

  changReset3Redirect() {
    this.router.navigate(['change-reset3-package']);
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

    // this.geteDate.selcteddate = latest_date;
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.DPREntryDateTime;
  }
  

  /////////////////////////////////////////////////////////////  Package code --Start--////////////////////////////////////////////////

  // GetPackageDetail(PackageId) {
  //   this.PackageId = PackageId;
  //   const obj = {
  //     StationCode: this.StationCode,
  //     LoginId: this.LoginId,
  //     PackageId: (this.PackageId == '') ? '-999' : this.PackageId,
  //     DPREntryDate: this.geteDate.selcteddate
  //   };
  //   this.commonServices.loadingPresent();
  //   this.commonServices.postwithservice("GetStationPackages", obj).subscribe(
  //     (resp: any) => {
  //       const data = JSON.parse(resp);
  //       if (data[0].length > 0) {

  //         this.IsPackagehide = false;
  //         this.TablesPkgs = data[0];
  //         this.PackageDetailJson = data[1];

  //         this.PackageCode = this.PackageDetailJson[0].PackageCode;
  //         this.SelectedPkgId = { PkgId: this.PackageDetailJson[0].PackageId };
  //         this.PackageId = this.PackageDetailJson[0].PackageId;
  //         this.PKisCRSentToHo = isNullOrUndefined(this.PackageDetailJson[0].isCRSentToHo) ? 0 : this.PackageDetailJson[0].isCRSentToHo;
  //         this.PKisStationSubmitted = isNullOrUndefined(this.PackageDetailJson[0].isStationSubmitted) ? 0 : this.PackageDetailJson[0].isStationSubmitted;

  //         if (!isUndefined(this.PackageDetailJson)) {
  //           if (data[0].length > 0)
  //             this.SelectedPkgId = { PkgId: this.PackageDetailJson[0].PackageId };
  //           if (this.PackageDetailJson[0].PrimeMover == 'E')
  //             this.ShowEngineMeter = true;
  //           else
  //             this.ShowEngineMeter = false;

  //           var pathSFM = this.PackageDetailJson[0].JumpCertificateSFM;
  //           if (pathSFM != '' && isUndefined(pathSFM) == false) {
  //             this.mdlImgShowSFM = true;
  //             this.imgPathSFM = this.glovalList.imgBaseUrl + pathSFM; //$rootScope.globalValues.imgBaseUrl + pathSFM;
  //           }
  //           var pathDFM = this.PackageDetailJson[0].JumpCertificateDFM;
  //           if (pathDFM != '' && isUndefined(pathDFM) == false) {
  //             this.mdlImgShowDFM = true;
  //             this.imgPathDFM = this.glovalList.imgBaseUrl + pathDFM; //$rootScope.globalValues.imgBaseUrl + pathDFM;
  //           }
  //           var patheEFM = this.PackageDetailJson[0].JumpCertificateEFM;
  //           if (patheEFM != '' && isUndefined(patheEFM) == false) {
  //             this.mdlImgShowEFM = true;
  //             this.imgPathEFM = this.glovalList.imgBaseUrl + patheEFM; //$rootScope.globalValues.imgBaseUrl + pathDFM;
  //           }

  //           this.SuctionFlowMeterReading = isNullOrUndefined(this.PackageDetailJson[0].SuctionFlowMeterReading) ? "0" : this.PackageDetailJson[0].SuctionFlowMeterReading;
  //           this.SuctionFlowMeterReadingPrv = this.PackageDetailJson[0].SuctionFlowMeterReadingPrv;

  //           console.log(this.SuctionFlowMeterReading, "SuctionFlowMeterReading");
  //           console.log(this.SuctionFlowMeterReadingPrv, "SuctionFlowMeterReadingPrv");
  //           console.log(this.PackageDetailJson[0].SuctionFlowMeterReading, "GAA");

  //           this.DischargeFlowMeterReading = this.PackageDetailJson[0].DischargeFlowMeterReading;
  //           this.DischargeFlowMeterReadingPrv = this.PackageDetailJson[0].DischargeFlowMeterReadingPrv;

  //           this.EngineFlowMeterReading = this.PackageDetailJson[0].EngineFlowMeterReading;
  //           this.EngineFlowMeterReadingPrv = this.PackageDetailJson[0].EngineFlowMeterReadingPrv;

  //           this.JumpReadingSFM = this.PackageDetailJson[0].JumpReadingSFM;
  //           if (parseFloat(this.JumpReadingSFM) > 0.000) {
  //             //this.filevisible = false;
  //             $("#IscheckboxSFS").prop("checked", true);
  //             this.JumpVisibleSFS = false;
  //           }
  //           else {
  //             //this.filevisible= true;
  //             $("#IscheckboxSFS").prop("checked", false);
  //             this.JumpVisibleSFS = true;
  //           }
  //           this.JumpReadingSFMCount = this.PackageDetailJson[0].JumpReadingSFMCount;
  //           this.JumpCertificateSFM = this.PackageDetailJson[0].JumpCertificateSFM;

  //           this.JumpReadingDFM = this.PackageDetailJson[0].JumpReadingDFM;
  //           if (parseFloat(this.JumpReadingDFM) > 0.000) {
  //             //this.filevisible = false;
  //             $("#IscheckboxDFS").prop("checked", true);
  //             this.JumpVisibleDFS = false;
  //           }
  //           else {
  //             //this.filevisible= true;
  //             $("#IscheckboxDFM").prop("checked", false);
  //             this.JumpVisibleDFS = true;
  //           }
  //           this.JumpReadingDFMCount = this.PackageDetailJson[0].JumpReadingDFMCount;
  //           this.JumpCertificateDFM = this.PackageDetailJson[0].JumpCertificateDFM;

  //           this.JumpReadingEFM = this.PackageDetailJson[0].JumpReadingEFM;
  //           if (parseFloat(this.JumpReadingEFM) > 0.000) {
  //             //this.filevisible = false;
  //             $("#IscheckboxEFS").prop("checked", true);
  //             this.JumpVisibleEFS = false;
  //           }
  //           else {
  //             //this.filevisible= true;
  //             $("#IscheckboxEFS").prop("checked", false);
  //             this.JumpVisibleEFS = true;
  //           }
  //           this.JumpReadingEFMCount = this.PackageDetailJson[0].JumpReadingEFMCount;
  //           this.JumpCertificateEFM = this.PackageDetailJson[0].JumpCertificateEFM;

  //           this.PrimeMover = this.PackageDetailJson[0].PrimeMover;
  //           this.SuctionPressure = this.PackageDetailJson[0].SuctionPressure;

  //           this.selectedRhHr = this.PackageDetailJson[0].RunninInHours;
  //           this.selectedRhMin = this.PackageDetailJson[0].RunningInMinutes

  //           var runInHrs = this.PackageDetailJson[0].RunninInHours, runInMins = this.PackageDetailJson[0].RunningInMinutes;
  //           //this.selectedRhHr = //$filter('filter')($scope.RunHrs, { hrs: runInHrs })[0];
  //           //this.selectedRhMin = //$filter('filter')($scope.RunMin, { min: runInMins })[0];
  //           this.selectedRhHr = this.PackageDetailJson[0].RunninInHours; //this.RunHrs.filter(val => {val = runInHrs});
  //           this.selectedRhMin = this.PackageDetailJson[0].RunningInMinutes; //this.RunHrs.filter(val => {val == runInHrs});

  //           this.selectedUsHr = this.PackageDetailJson[0].UnscheduledShutdownInHours;
  //           this.selectedUsMin = this.PackageDetailJson[0].UnscheduledShutdownInMinutes;

  //           this.selectedSHr = this.PackageDetailJson[0].ScheduleShutdownInHours;
  //           this.selectedSMin = this.PackageDetailJson[0].ScheduleShutdownInMinutes;

  //           this.selectedBdHr = this.PackageDetailJson[0].BreakdownInHours
  //           this.selectedBdMin = this.PackageDetailJson[0].BreakdownInMinutes

  //           this.Remark = this.PackageDetailJson[0].Remark;
  //           var pkgRemark = this.PackageDetailJson[0].Remark;

  //           if (this.Remark == "Breakdown due to Leakage" || this.Remark == "Instrumentation breakdown" || this.Remark == "Mechanical breakdown" || this.Remark == "Instrumentation breakdown" || this.Remark == "Powercut" || this.Remark == "Voltage problem") {
  //             this.mdlSelectedRemark = this.Remark;
  //             this.mdlRemarkTextShow = true;
  //           }
  //           else if (this.Remark != "") {
  //             this.mdlSelectedRemark = "Other";
  //             this.mdlRemarkTextShow = false;
  //             this.mdlRemark = this.PackageDetailJson[0].Remark;
  //           }
  //           else {
  //             this.mdlSelectedRemark = "";
  //             this.mdlRemark = "";
  //           }

  //           //  var remarkVal = pkgRemark; //$filter('filter')(this.jsonRemarks, { value: pkgRemark })[0];
  //           //  if(isUndefined(remarkVal) || remarkVal == "") {
  //           //      this.mdlSelectedRemark = this.Remark;//$filter('filter')($scope.jsonRemarks, { value: 'Other' })[0];
  //           //      this.mdlRemarkTextShow = true;
  //           //      this.mdlRemark = pkgRemark;
  //           //  }
  //           //  else {
  //           //      this.mdlSelectedRemark = this.Remark;//$filter('filter')($scope.jsonRemarks, { value: pkgRemark })[0];
  //           //      this.mdlRemarkTextShow = true;
  //           //  }
  //           this.resetMeterJSON = data[2];
  //           var resetMeterJSON = data[2];
  //           this.mdlShowResetImageSFM = false;
  //           this.mdlShowResetImageEFM = false;
  //           this.mdlShowResetImageDFM = false;
  //           this.mdlShowResetReadingSFM = false;

  //           if (!isUndefined(resetMeterJSON) && resetMeterJSON.length > 0) {
  //             var resetSFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'SFM' })[0];
  //             if (resetSFM.MeterType == 'SFM') {
  //               if (!isUndefined(resetSFM))
  //                 if (resetSFM.ReadingOnSwitch == -999)
  //                   this.mdlShowResetReadingSFM = false;
  //                 else {
  //                   this.mdlShowResetReadingSFM = true;
  //                   this.mdlReadingOnSwitchSFM = resetSFM.ReadingOnSwitch;
  //                   this.ResetMeterReadingOfTodaySFM = resetSFM.ResetMeterReadingOfToday;
  //                   this.meterResetIdSFM = resetSFM.MeterResetId;
  //                   this.mdlResetJumpReadingSFM = resetSFM.JumpReading;
  //                   this.ActionTypeSFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
  //                   if (resetSFM.JumpCertificateReset != '-999' && resetSFM.JumpCertificateReset != '') {
  //                     this.imgSFM = resetSFM.JumpCertificateReset;
  //                     this.imgPathResetSFM = this.glovalList.imgBaseUrl + resetSFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetSFM.JumpCertificateReset;
  //                     this.mdlShowResetImageSFM = true;
  //                   }
  //                 }
  //             }
  //             var resetDFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'DFM' })[0];
  //             if (resetDFM.MeterType == 'DFM') {
  //               if (!isUndefined(resetDFM))
  //                 if (resetDFM.ReadingOnSwitch == -999)
  //                   this.mdlShowResetReadingDFM = false;
  //                 else {
  //                   this.mdlShowResetReadingDFM = true;
  //                   this.mdlReadingOnSwitchDFM = resetDFM.ReadingOnSwitch;
  //                   this.meterResetIdDFM = resetDFM.MeterResetId;
  //                   this.ResetMeterReadingOfTodayDFM = resetDFM.ResetMeterReadingOfToday;
  //                   this.mdlResetJumpReadingDFM = resetDFM.JumpReading;
  //                   this.ActionTypeDFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
  //                   if (resetDFM.JumpCertificateReset != '-999' && resetDFM.JumpCertificateReset != '') {
  //                     this.imgDFM = resetDFM.JumpCertificateReset;
  //                     this.imgPathResetDFM = this.glovalList.imgBaseUrl + resetDFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetDFM.JumpCertificateReset;
  //                     this.mdlShowResetImageDFM = true;
  //                   }
  //                 }
  //             }
  //             var resetEFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'EFM' })[0];
  //             if (resetEFM.MeterType == 'EFM') {
  //               if (!isUndefined(resetEFM))
  //                 if (resetEFM.ReadingOnSwitch == -999)
  //                   this.mdlShowResetReadingEFM = false;
  //                 else {
  //                   this.mdlShowResetReadingEFM = true;
  //                   this.mdlReadingOnSwitchEFM = resetEFM.ReadingOnSwitch;
  //                   this.meterResetIdEFM = resetEFM.MeterResetId;
  //                   this.ResetMeterReadingOfTodayEFM = resetEFM.ResetMeterReadingOfToday;
  //                   this.mdlResetJumpReadingEFM = resetEFM.JumpReading;
  //                   this.ActionTypeEFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
  //                   if (resetEFM.JumpCertificateReset != '-999' && resetEFM.JumpCertificateReset != '') {
  //                     this.imgEFM = resetEFM.JumpCertificateReset;
  //                     this.imgPathResetEFM = this.glovalList.imgBaseUrl + resetEFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetEFM.JumpCertificateReset;
  //                     this.mdlShowResetImageEFM = true;
  //                   }
  //                 }
  //             }

  //           }
  //         }
  //         this.commonServices.loadingDismiss()
  //       }
  //       else {
  //         this.commonServices.loadingDismiss()
  //         this.commonServices.presentToast('There is no package available.')
  //         this.IsPackagehide = true;
  //         this.PKisCRSentToHo = 0;
  //         this.PKisStationSubmitted = 0;
  //         console.log(this.PKisCRSentToHo, "Deepak");
  //         console.log(this.PKisStationSubmitted, "Deepak2");
  //         return false;
  //       }
  //       // this.commonServices.loadingDismiss();
  //     },
  //     (error) => {
  //       this.commonServices.presentToast("Something went wrong.");
  //       this.commonServices.loadingDismiss();
  //     }
  //   );
  // }

  GetPackageDetail(PackageId) {
    this.PackageId = PackageId;
    const obj = {
      StationCode: this.StationCode,
      LoginId: this.LoginId,
      PackageId: (this.PackageId == '') ? '-999' : this.PackageId,
      DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
    };

    this.commonServices.postwithservice("GetStationPackages", obj).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data);
        if (data.length > 0) {
          this.IsPackagehide = false;
          this.TablesPkgs = data[0];
          this.PackageDetailJson = data[1];

          this.PackageCode = this.PackageDetailJson[0].PackageCode;
          this.SelectedPkgId = { PkgId: this.PackageDetailJson[0].PackageId };
          this.PackageId = this.PackageDetailJson[0].PackageId;
          this.PKisCRSentToHo = isNullOrUndefined(this.PackageDetailJson[0].isCRSentToHo) ?
            0 : this.PackageDetailJson[0].isCRSentToHo;
          this.PKisStationSubmitted = isNullOrUndefined(this.PackageDetailJson[0].isStationSubmitted) ?
            0 : this.PackageDetailJson[0].isStationSubmitted;
          // this.getSFMJumpHistory('GET');
          // this.getDFMJumpHistory('GET');
          // this.getEFMJumpHistory('GET');

          if (!isUndefined(this.PackageDetailJson)) {
            if (data[0].length > 0)
              this.SelectedPkgId = { PkgId: this.PackageDetailJson[0].PackageId };
            if (this.PackageDetailJson[0].PrimeMover != 'M')
              this.ShowEngineMeter = true;
            else
              this.ShowEngineMeter = false;

            this.imgPathSFM = this.PackageDetailJson[0].JumpCertificateSFM;
            if (this.imgPathSFM != '' && !isNullOrUndefined(this.imgPathSFM)) {
              this.mdlImgShowSFM = true;
            }
            this.imgPathDFM = this.PackageDetailJson[0].JumpCertificateDFM;
            if (this.imgPathDFM != '' && !isNullOrUndefined(this.imgPathDFM)) {
              this.mdlImgShowDFM = true;
            }
            this.imgPathEFM = this.PackageDetailJson[0].JumpCertificateEFM;
            if (this.imgPathEFM != '' && !isNullOrUndefined(this.imgPathEFM)) {
              this.mdlImgShowEFM = true;
            }

            this.SuctionFlowMeterReading = isNullOrUndefined(this.PackageDetailJson[0].SuctionFlowMeterReading) ? "0" : this.PackageDetailJson[0].SuctionFlowMeterReading;
            this.SuctionFlowMeterReadingPrv = this.PackageDetailJson[0].SuctionFlowMeterReadingPrv;

            console.log(this.SuctionFlowMeterReading, "SuctionFlowMeterReading");
            console.log(this.SuctionFlowMeterReadingPrv, "SuctionFlowMeterReadingPrv");
            console.log(this.PackageDetailJson[0].SuctionFlowMeterReading, "GAA");

            this.MotorFrequency=this.PackageDetailJson[0].MotorFrequency;
            this.DischargeFlowMeterReading = this.PackageDetailJson[0].DischargeFlowMeterReading;
            this.DischargeFlowMeterReadingPrv = this.PackageDetailJson[0].DischargeFlowMeterReadingPrv;

            this.EngineFlowMeterReading = this.PackageDetailJson[0].EngineFlowMeterReading;
            this.EngineFlowMeterReadingPrv = this.PackageDetailJson[0].EngineFlowMeterReadingPrv;

            this.JumpReadingSFM = this.PackageDetailJson[0].JumpReadingSFM;
            if (parseFloat(this.JumpReadingSFM) > 0.000) {
              //this.filevisible = false;
              $("#IscheckboxSFS").prop("checked", true);
              this.JumpVisibleSFS = false;
            }
            else {
              //this.filevisible= true;
              $("#IscheckboxSFS").prop("checked", false);
              this.JumpVisibleSFS = true;
            }
            this.JumpReadingSFMCount = this.PackageDetailJson[0].JumpReadingSFMCount;
            this.JumpCertificateSFM = this.PackageDetailJson[0].JumpCertificateSFM;

            this.JumpReadingDFM = this.PackageDetailJson[0].JumpReadingDFM;
            if (parseFloat(this.JumpReadingDFM) > 0.000) {
              //this.filevisible = false;
              $("#IscheckboxDFS").prop("checked", true);
              this.JumpVisibleDFS = false;
            }
            else {
              //this.filevisible= true;
              $("#IscheckboxDFM").prop("checked", false);
              this.JumpVisibleDFS = true;
            }
            this.JumpReadingDFMCount = this.PackageDetailJson[0].JumpReadingDFMCount;
            this.JumpCertificateDFM = this.PackageDetailJson[0].JumpCertificateDFM;

            this.JumpReadingEFM = this.PackageDetailJson[0].JumpReadingEFM;
            if (parseFloat(this.JumpReadingEFM) > 0.000) {
              //this.filevisible = false;
              $("#IscheckboxEFS").prop("checked", true);
              this.JumpVisibleEFS = false;
            }
            else {
              //this.filevisible= true;
              $("#IscheckboxEFS").prop("checked", false);
              this.JumpVisibleEFS = true;
            }
            this.JumpReadingEFMCount = this.PackageDetailJson[0].JumpReadingEFMCount;
            this.JumpCertificateEFM = this.PackageDetailJson[0].JumpCertificateEFM;

            var VentFlow = this.PackageDetailJson[0].IsVentFlow;
            if (parseFloat(VentFlow) > 0.000) {
              // $("#IscheckboxVFM").prop("checked", true);
              this.IsVentFlow = true;
            }
            else {
              // $("#IscheckboxVFM").prop("checked", false);
              this.IsVentFlow = false;
            }
            this.VentFlowMeterReading =
              (this.PackageDetailJson[0].VentFlowMeterReading == ""
                || isNullOrUndefined(this.PackageDetailJson[0].VentFlowMeterReading)) ?
                "0.00" : this.PackageDetailJson[0].VentFlowMeterReading;
            //this.PackageDetailJson[0].VentFlowMeterReading;
            this.VentFlowMeterReadingPrv = this.PackageDetailJson[0].VentFlowMeterReadingPrv;
            this.PrimeMover = this.PackageDetailJson[0].PrimeMover;
            this.SuctionPressure = this.PackageDetailJson[0].SuctionPressure;

            this.selectedRhHr = this.PackageDetailJson[0].RunninInHours;
            this.selectedRhMin = this.PackageDetailJson[0].RunningInMinutes

            var runInHrs = this.PackageDetailJson[0].RunninInHours, runInMins = this.PackageDetailJson[0].RunningInMinutes;
            //this.selectedRhHr = //$filter('filter')($scope.RunHrs, { hrs: runInHrs })[0];
            //this.selectedRhMin = //$filter('filter')($scope.RunMin, { min: runInMins })[0];
            this.selectedRhHr = this.PackageDetailJson[0].RunninInHours; //this.RunHrs.filter(val => {val = runInHrs});
            this.selectedRhMin = this.PackageDetailJson[0].RunningInMinutes; //this.RunHrs.filter(val => {val == runInHrs});

            this.selectedUsHr = this.PackageDetailJson[0].UnscheduledShutdownInHours;
            this.selectedUsMin = this.PackageDetailJson[0].UnscheduledShutdownInMinutes;

            this.selectedSHr = this.PackageDetailJson[0].ScheduleShutdownInHours;
            this.selectedSMin = this.PackageDetailJson[0].ScheduleShutdownInMinutes;

            this.selectedBdHr = this.PackageDetailJson[0].BreakdownInHours
            this.selectedBdMin = this.PackageDetailJson[0].BreakdownInMinutes

            this.Remark = this.PackageDetailJson[0].Remark;
            var pkgRemark = this.PackageDetailJson[0].Remark;

            if (this.Remark == "Breakdown due to Leakage"
              || this.Remark == "Instrumentation breakdown" ||
              this.Remark == "Mechanical breakdown" || this.Remark == "Instrumentation breakdown"
              || this.Remark == "Powercut" || this.Remark == "Voltage problem") {
              this.mdlSelectedRemark = this.Remark;
              this.mdlRemarkTextShow = true;
            }
            else if (this.Remark != "") {
              this.mdlSelectedRemark = "Other";
              this.mdlRemarkTextShow = false;
              this.mdlRemark = this.PackageDetailJson[0].Remark;
            }
            else {
              this.mdlSelectedRemark = "";
              this.mdlRemark = "";
            }

            //  var remarkVal = pkgRemark; //$filter('filter')(this.jsonRemarks, { value: pkgRemark })[0];
            //  if(isUndefined(remarkVal) || remarkVal == "") {
            //      this.mdlSelectedRemark = this.Remark;//$filter('filter')($scope.jsonRemarks, { value: 'Other' })[0];
            //      this.mdlRemarkTextShow = true;
            //      this.mdlRemark = pkgRemark;
            //  }
            //  else {
            //      this.mdlSelectedRemark = this.Remark;//$filter('filter')($scope.jsonRemarks, { value: pkgRemark })[0];
            //      this.mdlRemarkTextShow = true;
            //  }
            this.resetMeterJSON = data[2];
            var resetMeterJSON = data[2];
            this.mdlShowResetImageSFM = false;
            this.mdlShowResetImageEFM = false;
            this.mdlShowResetImageDFM = false;
            this.mdlShowResetReadingSFM = false;

            if (!isUndefined(resetMeterJSON) && resetMeterJSON.length > 0) {
              var resetSFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'SFM' })[0];
              if (resetSFM.MeterType == 'SFM') {
                if (!isUndefined(resetSFM))
                  if (resetSFM.ReadingOnSwitch == -999) {
                    this.mdlShowResetReadingSFM = false;
                  }
                  else {
                    this.mdlShowResetReadingSFM = true;
                    this.mdlReadingOnSwitchSFM = resetSFM.ReadingOnSwitch;
                    this.ResetMeterReadingOfTodaySFM = resetSFM.ResetMeterReadingOfToday;
                    this.meterResetIdSFM = resetSFM.MeterResetId;
                    this.mdlResetJumpReadingSFM = resetSFM.JumpReading;
                    this.ActionTypeSFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
                    if (resetSFM.JumpCertificateReset != '-999' && resetSFM.JumpCertificateReset != '') {
                      this.imgSFM = resetSFM.JumpCertificateReset;
                      this.imgPathResetSFM = this.glovalList.imgBaseUrl + resetSFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetSFM.JumpCertificateReset;
                      this.mdlShowResetImageSFM = true;
                    }
                  }
                // this.getSFMJumpHistory('GET');
                // this.getDFMJumpHistory('GET');
                // this.getEFMJumpHistory('GET');
              }
              var resetDFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'DFM' })[0];
              if (resetDFM.MeterType == 'DFM') {
                if (!isUndefined(resetDFM))
                  if (resetDFM.ReadingOnSwitch == -999)
                    this.mdlShowResetReadingDFM = false;
                  else {
                    this.mdlShowResetReadingDFM = true;
                    this.mdlReadingOnSwitchDFM = resetDFM.ReadingOnSwitch;
                    this.meterResetIdDFM = resetDFM.MeterResetId;
                    this.ResetMeterReadingOfTodayDFM = resetDFM.ResetMeterReadingOfToday;
                    this.mdlResetJumpReadingDFM = resetDFM.JumpReading;
                    this.ActionTypeDFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
                    if (resetDFM.JumpCertificateReset != '-999' && resetDFM.JumpCertificateReset != '') {
                      this.imgDFM = resetDFM.JumpCertificateReset;
                      this.imgPathResetDFM = this.glovalList.imgBaseUrl + resetDFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetDFM.JumpCertificateReset;
                      this.mdlShowResetImageDFM = true;
                    }
                  }
              }
              var resetEFM = this.resetMeterJSON[0];//$filter('filter')(resetMeterJSON, { MeterType: 'EFM' })[0];
              if (resetEFM.MeterType == 'EFM') {
                if (!isUndefined(resetEFM))
                  if (resetEFM.ReadingOnSwitch == -999)
                    this.mdlShowResetReadingEFM = false;
                  else {
                    this.mdlShowResetReadingEFM = true;
                    this.mdlReadingOnSwitchEFM = resetEFM.ReadingOnSwitch;
                    this.meterResetIdEFM = resetEFM.MeterResetId;
                    this.ResetMeterReadingOfTodayEFM = resetEFM.ResetMeterReadingOfToday;
                    this.mdlResetJumpReadingEFM = resetEFM.JumpReading;
                    this.ActionTypeEFM = (resetSFM.FlagReadingType == 'R') ? 'Reset' : 'Change';
                    if (resetEFM.JumpCertificateReset != '-999' && resetEFM.JumpCertificateReset != '') {
                      this.imgEFM = resetEFM.JumpCertificateReset;
                      this.imgPathResetEFM = this.glovalList.imgBaseUrl + resetEFM.JumpCertificateReset;//$rootScope.globalValues.imgBaseUrl + resetEFM.JumpCertificateReset;
                      this.mdlShowResetImageEFM = true;
                    }
                  }
              }
            }
          }
        }
        else {
        
          this.commonServices.loadingDismiss();
          this.commonServices.presentToast('There is no package available.')
          this.IsPackagehide = true;
          this.PKisCRSentToHo = 0;
          this.PKisStationSubmitted = 0;
          console.log(this.PKisCRSentToHo, "test");
          console.log(this.PKisStationSubmitted, "test2");
          return false;
        }
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  PackageCallOninit() {
    this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].UserName;
    this.glovalList = this.commonServices.GlovalValues();
    var timeStats = this.getTimeStats();
    this.RunHrs = timeStats.hours;
    this.RunMin = timeStats.minutes;
    this.selectedRhHr = this.RunHrs[0];
    this.selectedRhMin = this.RunMin[0];

    this.SHrs = timeStats.hours;
    this.SMin = timeStats.minutes;
    this.selectedSHr = this.SHrs[0];
    this.selectedSMin = this.SMin[0];

    this.UsHrs = timeStats.hours;
    this.UsMin = timeStats.minutes;
    this.selectedUsHr = this.UsHrs[0];
    this.selectedUsMin = this.UsMin[0];

    this.BdHrs = timeStats.hours;
    this.BdMin = timeStats.minutes;
    this.selectedBdHr = this.BdHrs[0];
    this.selectedBdMin = this.BdMin[0];
    this.GetPackageDetail('-999');
  }

  upload(str: any) {
    this.uploadedfile = str.target.files[0];
    console.log(this.uploadedfile);
  }

  uploadJumpReadingImgSFM(str: any) {
    this.JumpfilesSFM = str.target.files[0];
    console.log(this.JumpfilesSFM);
  }

  uploadJumpReadingImgDFM(str: any) {
    this.JumpfilesDFM = str.target.files[0];
  }

  uploadJumpReadingImgEFM(str: any) {
    this.JumpfilesEFM = str.target.files[0];
  }

  // uploadJumpReadingImgSFMPopUp(str: any) {
  //   this.filesSFM = str.target.files[0];
  // }

  uploadJumpReadingImgSFMPopUp(file: FileList, event: any) {
    this.filesSFM = file.item(0);
    // this.filesSFM = event.target.files[0];
  }

  uploadJumpReadingImgDFMPopUp(file: FileList, event: any) {
    this.filesDFM = event.target.files[0];
  }

  uploadJumpReadingImgEFMPopUp(file: FileList, event: any) {
    this.filesEFM = event.target.files[0];
  }

  uploadJumpReadingImgVFMPopUp(file: FileList, event: any) {
    this.filesVFM = file.item(0);
  }

  InsertPackageInfo() {
    const hrsJson = {
      RunHrs: this.selectedRhHr,
      RunMins: this.selectedRhMin,
      SHrs: this.selectedSHr,
      SMins: this.selectedSMin,
      UsHrs: this.selectedUsHr,
      UsMins: this.selectedUsMin,
      BdHrs: this.selectedBdHr,
      BdMin: this.selectedBdMin
    };

    var pkgRemark = ((this.mdlSelectedRemark == 'Other') ? this.mdlRemark : this.mdlSelectedRemark);
    var remarkJson ={
      otherSelected: this.mdlSelectedRemark,
      pkgRemark: pkgRemark
    };
    var getAllFData = this.getPackageFD(this.PackageDetailJson, this.globalDetail,
      this.SelectedPkgId.PkgId,
      hrsJson, remarkJson);
    console.log(getAllFData, "getAllFData");
    getAllFData.PromptErrorS = '';
    getAllFData.PromptErrorD = '';
    getAllFData.PromptErrorE = '';
    if (getAllFData.Error != '') {
      this.commonServices.presentToast(getAllFData.Error)
      return false;
    }
    if (getAllFData.PromptErrorS != "") {
      this.errorS = true;
      this.commonServices.alertMessage("Confirm",
        getAllFData.PromptErrorS).then((res: any) => {
          console.log(res);

          if (res) {
            // this.errorS = false;
            return false;
          } else {
            this.errorS = false;
            // getAllFData.PromptErrorS == "";
            var jumpReading = this.PackageDetailJson[0].JumpReadingSFM;
            if (jumpReading == '' && parseFloat(jumpReading) == 0) {
              this.commonServices.presentToast('Please enter the jump reading for Suction Flow Meter.');
              return false;
            }
            this.geterrorCode(getAllFData);
          }
        });
      // if (confirm(getAllFData.PromptErrorS) == false) {
      //   console.log(confirm(getAllFData.PromptErrorS));
      //   return false;
      // }
      // else {
      //   var jumpReading = this.PackageDetailJson[0].JumpReadingSFM;
      //   if (jumpReading == '' && parseFloat(jumpReading) == 0) {
      //     this.commonServices.presentToast('Please enter the jump reading for Suction Flow Meter.');
      //     return false;
      //   }
      // }
    }
    if (getAllFData.PromptErrorD != "") {
      this.errorD = true;
      this.commonServices.alertMessage("Confirm",
        getAllFData.PromptErrorD).then((res: any) => {
          console.log(res);

          if (res) {
            // this.errorD = false;
            return false;
          } else {
            this.errorD = false;
            var jumpReading = this.PackageDetailJson[0].JumpReadingDFM;
            if (jumpReading == '' && parseFloat(jumpReading) == 0) {
              this.commonServices.presentToast('Please enter the jump reading for Discharge Flow Meter.');
              return false;
            }
            this.geterrorCode(getAllFData);
          }
        });
      // if (confirm(getAllFData.PromptErrorD) == false) {
      //   return false;
      // }
      // else {
      //   var jumpReading = this.PackageDetailJson[0].JumpReadingDFM;
      //   if (jumpReading == '' && parseFloat(jumpReading) == 0) {
      //     this.commonServices.presentToast('Please enter the jump reading for Discharge Flow Meter.');
      //     return false;
      //   }
      // }
    }
    if (getAllFData.PromptErrorE != "") {
      this.errorE = true;
      this.commonServices.alertMessage("Confirm",
        getAllFData.PromptErrorE).then((res: any) => {
          console.log(res);

          if (res) {
            // this.errorE = false;
            return false;
          } else {
            this.errorE = false;

            var jumpReading = this.PackageDetailJson[0].JumpReadingEFM;
            if (jumpReading == '' && parseFloat(jumpReading) == 0) {
              this.commonServices.presentToast('Please enter the jump reading for Engine Flow Meter.');
              return false;
            }
            this.geterrorCode(getAllFData);
          }
        });
      // if (confirm(getAllFData.PromptErrorE) == false) {
      //   return false;
      // }
      // else {
      //   var jumpReading = this.PackageDetailJson[0].JumpReadingEFM;
      //   if (jumpReading == '' && parseFloat(jumpReading) == 0) {
      //     this.commonServices.presentToast('Please enter the jump reading for Engine Flow Meter.');
      //     return false;
      //   }
      // }
    }
    // if(getAllFData.PromptErrorS == '' && getAllFData.PromptErrorE =='' && getAllFData.PromptErrorD == '') {
    // setTimeout(function () {

    if (this.errorD == false && this.errorE == false && this.errorS == false) {
      this.commonServices.loadingPresent();
      var BoundJson = this.PackageDetailJson;
      this.commonServices.InsertPackageInfo(getAllFData.frmData).subscribe(
        (resp: any) => {
          const data = resp;
          //this.commonServices.loadingDismiss();
          this.JumpfilesSFM = $('#JumpCertificateSFM');
          this.JumpfilesDFM = $('#JumpCertificateDFM');
          this.JumpfilesEFM = $('#JumpCertificateEFM');

          var JumpfileInputSFM = this.filesSFM;
          var JumpfileInputDFM = this.filesDFM;
          var JumpfileInputEFM = this.filesEFM;

          $('#JumpCertificateSFM').val(null);
          $('#JumpCertificateDFM').val(null);
          $('#JumpCertificateEFM').val(null);

          this.commonServices.presentToast(data.Status);  //success, file uploaded
          //   this.commonServices.alertMessage("Confirm",
          //   data.Status).then((res: any) => {
          //   console.log(res);

          //   if (res) {
          //     return false;
          //   } else {
          //    return false;
          //   }
          // });
          if (data.Status.indexOf('successfully') > -1) {
            var MyJson = {
              StationCode: this.StationCode,
              LoginID: this.LoginId,
              PackageId: ((isUndefined(this.SelectedPkgId.PkgId) == true || this.SelectedPkgId.PkgId == '') ? '-999' : this.SelectedPkgId.PkgId)
            };
            this.GetPackageDetail(MyJson);
          }
          this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      );
    }
    // }, 1000
    // )
  }

  geterrorCode(getAllFData) {
    if (this.errorD == false && this.errorE == false && this.errorS == false) {
      this.commonServices.loadingPresent();
      var BoundJson = this.PackageDetailJson;
      this.commonServices.InsertPackageInfo(getAllFData.frmData).subscribe(
        (resp: any) => {
          const data = resp;
          //this.commonServices.loadingDismiss();
          this.JumpfilesSFM = $('#JumpCertificateSFM');
          this.JumpfilesDFM = $('#JumpCertificateDFM');
          this.JumpfilesEFM = $('#JumpCertificateEFM');

          var JumpfileInputSFM = this.filesSFM;
          var JumpfileInputDFM = this.filesDFM;
          var JumpfileInputEFM = this.filesEFM;

          $('#JumpCertificateSFM').val(null);
          $('#JumpCertificateDFM').val(null);
          $('#JumpCertificateEFM').val(null);

          this.commonServices.presentToast(data.Status);  //success, file uploaded
          //   this.commonServices.alertMessage("Confirm",
          //   data.Status).then((res: any) => {
          //   console.log(res);

          //   if (res) {
          //     return false;
          //   } else {
          //    return false;
          //   }
          // });
          if (data.Status.indexOf('successfully') > -1) {
            var MyJson = {
              StationCode: this.StationCode,
              LoginID: this.LoginId,
              PackageId: ((isUndefined(this.SelectedPkgId.PkgId) == true || this.SelectedPkgId.PkgId == '') ? '-999' : this.SelectedPkgId.PkgId)
            };
            this.GetPackageDetail(MyJson);
          }
          this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      );
    }
  }

  getPackageFD(pkgDetJson, GlobalDetail, SelectedPkgId, hrsJson, remarkJson) {

    var MyJson = {
      LoginId: this.LoginId,
      MeterSkidCode: this.MeterSkidCode,

      RunningHours: hrsJson.RunHrs + ":" + hrsJson.RunMins,
      ScheduleShutdownHours: hrsJson.SHrs + ":" + hrsJson.SMins,
      UnscheduledShutdownHours: hrsJson.UsHrs + ":" + hrsJson.UsMins,
      BreakdownHours: hrsJson.BdHrs + ":" + hrsJson.BdMin,

      SuctionFlowMeterReading: pkgDetJson[0].SuctionFlowMeterReading,
      JumpReadingSFM: ((pkgDetJson[0].JumpReadingSFM == '') ? '0' : pkgDetJson[0].JumpReadingSFM),
      JumpReadingSFMCount: pkgDetJson[0].JumpReadingSFMCount,
      JumpCertificateSFM: pkgDetJson[0].JumpCertificateSFM,

      DischargeFlowMeterReading: pkgDetJson[0].DischargeFlowMeterReading,
      JumpReadingDFM: ((pkgDetJson[0].JumpReadingDFM == '') ? '0' : pkgDetJson[0].JumpReadingDFM),
      JumpReadingDFMCount: pkgDetJson[0].JumpReadingDFMCount,
      JumpCertificateDFM: pkgDetJson[0].JumpCertificateDFM,

      EngineFlowMeterReading: ((pkgDetJson[0].EngineFlowMeterReading == '') ? '0' : pkgDetJson[0].EngineFlowMeterReading),
      JumpReadingEFM: ((pkgDetJson[0].JumpReadingEFM == '') ? '0' : pkgDetJson[0].JumpReadingEFM),
      JumpReadingEFMCount: pkgDetJson[0].JumpReadingEFMCount,
      JumpCertificateEFM: pkgDetJson[0].JumpCertificateEFM,

      SuctionPressure: pkgDetJson[0].SuctionPressure,
      MotorFrequency: pkgDetJson[0].MotorFrequency,
      Remark: remarkJson.pkgRemark,
      StationCode: this.StationCode,//GlobalDetail.LoginId,
      FilePath: localStorage.getItem('LoginId') + "/Package/",
      PackageId: SelectedPkgId,
      DPREntryDate: this.geteDate.selcteddate,
      // VentFlowMeterReading: pkgDetJson[0].VentFlowMeterReading
      VentFlowMeterReading: (pkgDetJson[0].VentFlowMeterReading == "" || isNullOrUndefined(pkgDetJson[0].VentFlowMeterReading)) ? "0.00" : pkgDetJson[0].VentFlowMeterReading
    };
    //  this.JumpfilesSFM = $('#JumpCertificateSFM');
    //  this.JumpfilesDFM = $('#JumpCertificateDFM');
    //  this.JumpfilesEFM = $('#JumpCertificateEFM');

    var fileInputSFM = this.JumpfilesSFM
    var fileInputEFM = this.JumpfilesEFM
    var fileInputDFM = this.JumpfilesDFM

    if (pkgDetJson[0].JumpReadingSFM == '' || pkgDetJson[0].JumpReadingSFM == 0)
      $('#JumpCertificateSFM').val(null);//angular.element(fileInputSFM).val(null);

    if (pkgDetJson[0].JumpReadingDFM == '' || pkgDetJson[0].JumpReadingDFM == 0)
      $('#JumpCertificateDFM').val(null);//angular.element(fileInputDFM).val(null);

    if (pkgDetJson[0].JumpReadingEFM == '' || pkgDetJson[0].JumpReadingEFM == 0)
      $('#JumpCertificateEFM').val(null);//angular.element(fileInputEFM).val(null);

    //do nothing if there's no files
    //if (fileInput.files.length === 0) return;
    var formData = new FormData();
    if (this.JumpfilesSFM != undefined) {
      formData.append("JumpCertificateSFM", this.JumpfilesSFM[0]);
    }
    // if (this.JumpfilesSFM.size > 0) {
    //     for (var i in this.JumpfilesSFM) {
    //         formData.append("JumpCertificateSFM", this.JumpfilesSFM[i]);
    //     }   
    // }  
    //formData.append("JumpCertificateSFM", fileInputSFM.files[0]);
    if (this.JumpfilesDFM != undefined) {
      formData.append("JumpCertificateDFM", this.JumpfilesDFM[0]);
    }

    // if (fileInputEFM.files.length > 0) {
    //     for (var i in fileInputEFM.files) {
    //         formData.append("JumpCertificateEFM", fileInputEFM.files[i]);
    //     }
    // }
    //formData.append("JumpCertificateEFM", fileInputEFM.files[0]);

    if (this.JumpfilesEFM != undefined) {
      formData.append("JumpCertificateEFM", this.JumpfilesEFM[0]);
    }
    // if (fileInputDFM.files.length > 0) {
    //     for (var i in fileInputDFM.files) {
    //         formData.append("JumpCertificateDFM", fileInputDFM.files[i]);
    //     }
    // }
    //formData.append("JumpCertificateDFM", fileInputDFM.files[0]);
    this.commonServices.postwithservice("PackagesAverage", { LoginId: localStorage.getItem('LoginId'),
     DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy') }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp).Table[0]
        this.SuctionFlowReadingAverage = data.FinalSuctionFlow;
        this.DischargeFlowReadingAverage = data.FinalDischargeFlow;
        this.EngineFlowReadingAverage = data.FinalEngineFlow;
        console.log(this.SuctionFlowReadingAverage, ",", this.DischargeFlowReadingAverage, ",", this.EngineFlowReadingAverage);
      },
      (error) => {
        console.log(error);
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
    formData.append("packageDetail", JSON.stringify(MyJson));

    //Validate Form
    var ErrorMsg = '', PromptErrorS = '', PromptErrorE = '', PromptErrorD = '', self = this;
    ErrorMsg = this.getError(pkgDetJson, fileInputEFM == null ? fileInputEFM : fileInputEFM[0], fileInputDFM == null ? fileInputEFM : fileInputDFM[0], fileInputSFM == null ? fileInputSFM : fileInputSFM[0], hrsJson, remarkJson);
    if (parseFloat(pkgDetJson[0].SuctionFlowMeterReading) <= parseFloat(pkgDetJson[0].SuctionFlowMeterReadingPrv))
      PromptErrorS = 'Suspected Suction Flow Meter Reading, Do you want to continue?';
    if (parseFloat(pkgDetJson[0].DischargeFlowMeterReading) <= parseFloat(pkgDetJson[0].DischargeFlowMeterReadingPrv))
      PromptErrorD = 'Suspected Discharge Flow Meter Reading, Do you want to continue?';
    if (pkgDetJson[0].PrimeMover == 'M' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) <= parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
      PromptErrorE = 'Suspected Engine Flow Meter Reading, Do you want to continue?';

    console.log(pkgDetJson[0].SuctionFlowMeterReading, ",", this.SuctionFlowReadingAverage);
    if (pkgDetJson[0].SuctionFlowMeterReading > this.SuctionFlowReadingAverage && Number(this.SuctionFlowReadingAverage) != 0)
      PromptErrorS = 'Wrong Entry for Suction Flow Meter Reading, Do you want to continue?';
    else if (parseFloat(pkgDetJson[0].SuctionFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].SuctionFlowMeterReadingPrv))
      PromptErrorS = 'Suspected Suction Flow Meter Reading, Do you want to continue?';
    if (pkgDetJson[0].DischargeFlowMeterReading > this.DischargeFlowReadingAverage && Number(this.DischargeFlowReadingAverage) != 0)
      PromptErrorD = 'Wrong Entry for Discharge Flow Meter Reading, Do you want to continue?';
    else if (parseFloat(pkgDetJson[0].DischargeFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].DischargeFlowMeterReadingPrv))
      PromptErrorD = 'Suspected Discharge Flow Meter Reading, Do you want to continue?';
    if (pkgDetJson[0].PrimeMover == 'M' && pkgDetJson[0].EngineFlowMeterReading > this.EngineFlowReadingAverage && Number(this.EngineFlowReadingAverage) != 0)
      PromptErrorE = 'Wrong Entry for Engine Flow Meter Reading, Do you want to continue?';
    else if (pkgDetJson[0].PrimeMover == 'M' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
      PromptErrorE = 'Suspected Engine Flow Meter Reading, Do you want to continue?';

    if (pkgDetJson[0].PrimeMover != 'M' && pkgDetJson[0].EngineFlowMeterReading > this.EngineFlowReadingAverage && Number(this.EngineFlowReadingAverage) != 0)
        PromptErrorE = 'Wrong Entry for Engine Flow Meter Reading, Do you want to continue?';
    else if (pkgDetJson[0].PrimeMover != 'M' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) >= 2*parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
        PromptErrorE = 'Suspected Engine Flow Meter Reading, Do you want to continue?';
    if (pkgDetJson[0].PrimeMover == 'M' && pkgDetJson[0].EngineFlowMeterReading > this.EngineFlowReadingAverage && Number(this.EngineFlowReadingAverage) != 0)
        PromptErrorE = 'Wrong Entry for Motor Flow Meter Reading, Do you want to continue?';
    else if (pkgDetJson[0].PrimeMover == 'M' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) >= 2*parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
        PromptErrorE = 'Suspected Motor Flow Meter Reading, Do you want to continue?';
    // if (parseFloat(pkgDetJson[0].SuctionFlowMeterReading) <= parseFloat(pkgDetJson[0].SuctionFlowMeterReadingPrv))
    //   PromptErrorS = 'Suspected Suction Flow Meter Reading, Do you want to continue?';
    // if (parseFloat(pkgDetJson[0].DischargeFlowMeterReading) <= parseFloat(pkgDetJson[0].DischargeFlowMeterReadingPrv))
    //   PromptErrorD = 'Suspected Discharge Flow Meter Reading, Do you want to continue?';
    // if (pkgDetJson[0].PrimeMover == 'E' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) <= parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
    //   PromptErrorE = 'Suspected Engine Flow Meter Reading, Do you want to continue?';
    //   console.log(pkgDetJson[0].SuctionFlowMeterReading,",", this.SuctionFlowReadingAverage);
    //   if (pkgDetJson[0].SuctionFlowMeterReading > this.SuctionFlowReadingAverage)
    //       PromptErrorS = 'Wrong Entry for Suction Flow Meter Reading, Do you want to continue?';
    // if (parseFloat(pkgDetJson[0].SuctionFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].SuctionFlowMeterReadingPrv))
    //   PromptErrorS = 'Suspected Suction Flow Meter Reading, Do you want to continue?';
    // if (parseFloat(pkgDetJson[0].DischargeFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].DischargeFlowMeterReadingPrv))
    //   PromptErrorD = 'Suspected Discharge Flow Meter Reading, Do you want to continue?';
    // if (pkgDetJson[0].PrimeMover == 'E' && parseFloat(pkgDetJson[0].EngineFlowMeterReading) >= 2 * parseFloat(pkgDetJson[0].EngineFlowMeterReadingPrv))
    //   PromptErrorE = 'Suspected Engine Flow Meter Reading, Do you want to continue?';

    return {
      Error: ErrorMsg,
      PromptErrorS: PromptErrorS,
      PromptErrorD: PromptErrorD,
      PromptErrorE: PromptErrorE,
      frmData: formData
    };
  }

  getError(pkgDetJson, fileInputEFM, fileInputDFM, fileInputSFM, hrsJson, remarkJson) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var foundError = '';
    var SFMRead = pkgDetJson[0].SuctionFlowMeterReading;
    var DFMRead = pkgDetJson[0].DischargeFlowMeterReading;
    var EFMRead = pkgDetJson[0].EngineFlowMeterReading;
    var MotorFrequency = pkgDetJson[0].MotorFrequency;

    if (SFMRead == "" || isUndefined(SFMRead)) {
      foundError = 'Suction Flow Meter Reading is required.';
      return foundError;
    }
    // if ((pkgDetJson[0].JumpReadingSFM == '' || 
    // pkgDetJson[0].JumpReadingSFM == undefined ||
    //  parseFloat(pkgDetJson[0].JumpReadingSFM) == parseFloat("0"))
    //   && parseFloat(SFMRead) == parseFloat("0")) {
    //   foundError = 'Invalid Suction Flow Meter Reading';
    //   return foundError;
    // }
    if (SFMRead != "") {
      if (regexNumeric.test(SFMRead) == false) {
        foundError = 'Only numeric value allowed for reading.';
        return foundError;
      }
      if (parseFloat(SFMRead) < 0) {
        foundError = 'Suction Flow Meter Reading must be Positive.';
        return foundError;
      }
    }
    // New Comment//
    // var JumpSFMCnt = pkgDetJson[0].JumpReadingSFMCount;
    // if (pkgDetJson[0].JumpReadingSFM != '') {
    //   //if (parseFloat(pkgDetJson[0].JumpReadingSFM) > 0 && fileInputSFM.files.length == 0 && pkgDetJson[0].JumpCertificateSFM == '') {
    //   //    foundError = 'Please attach the Jump certificate for SFM Reading.';
    //   //    return foundError;
    //   //}

    //   if (!isUndefined(fileInputSFM)) {
    //     if (fileInputSFM.size > 0) {         //fileInputSFM.files.length
    //       var validExtension = 'jpeg,jpg,png,gif';
    //       //for (var i = 0; i < fileInputSFM.size; i++) {
    //       var fileExtension = fileInputSFM.name.split('.')[1]; //fileInputSFM[i].name.split('.')[1];
    //       if (validExtension.indexOf(fileExtension) < 0 && !isUndefined(fileExtension)) {
    //         foundError = 'Attachment allowed (SFM) only for [' + validExtension + '].';
    //         return foundError;
    //       }
    //       // }
    //     }
    //   }
    //   if (regexNumeric.test(pkgDetJson[0].JumpReadingSFM) == false) {
    //     foundError = 'Only numeric value allowed for reading.';
    //     return foundError;
    //   }

    // }
    // if (JumpSFMCnt != '' && parseFloat(JumpSFMCnt) != 0 && isUndefined(JumpSFMCnt) == false) {
    //   if (regexNumeric.test(JumpSFMCnt) == false) {
    //     foundError = 'Only numeric value allowed for SFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (JumpSFMCnt.indexOf('.') > -1) {
    //     foundError = 'Decimal value not allowed for SFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (parseFloat(JumpSFMCnt) < 0) {
    //     foundError = 'SFM Jump Reading count must be Positive.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingSFM == "" || isUndefined(pkgDetJson[0].JumpReadingSFM)) {
    //     foundError = 'Please enter the SFM Jump reading.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingSFM == "" || parseFloat(pkgDetJson[0].JumpReadingSFM) == 0) {
    //     foundError = 'Plese enter the Jump Reading';
    //     return foundError;
    //   }
    // }
    // else {
    //   if (pkgDetJson[0].JumpReadingSFM != '' && parseFloat(pkgDetJson[0].JumpReadingSFM) != 0) {
    //     foundError = 'Plese enter the SFM Jump Reading count.';
    //     return foundError;
    //   }
    // }

    if (pkgDetJson[0].PrimeMover != 'M' && EFMRead == "") {
      foundError = 'Engine Flow Meter Reading is required.';
      return foundError
    }
    if (pkgDetJson[0].PrimeMover == 'M' && EFMRead == "") {
      foundError = 'Motor Flow Meter Reading is required.';
      return foundError;
  }
    if (pkgDetJson[0].PrimeMover != 'M' && (pkgDetJson[0].JumpReadingEFM == '' || pkgDetJson[0].JumpReadingEFM == undefined || parseFloat(pkgDetJson[0].JumpReadingEFM) == parseFloat("0")) && parseFloat(EFMRead) == parseFloat("0")) {
      foundError = 'Invalid Engine Flow Meter Reading';
      return foundError;
    }
    if (pkgDetJson[0].PrimeMover == 'M' && (pkgDetJson[0].JumpReadingEFM == '' || pkgDetJson[0].JumpReadingEFM == undefined || parseFloat(pkgDetJson[0].JumpReadingEFM) == parseFloat("0")) && parseFloat(EFMRead) == parseFloat("0")) {
      foundError = 'Invalid Motor Flow Meter Reading';
      return foundError;
    }
    if ((pkgDetJson[0].PrimeMover != 'M' || pkgDetJson[0].PrimeMover == 'M') && EFMRead != "")
      if (regexNumeric.test(EFMRead) == false) {
        foundError = 'Only numeric value allowed for reading.';
        return foundError;
      }
    //New Commmnet//
    // var JumpEFMCnt = pkgDetJson[0].JumpReadingEFMCount;
    // if (pkgDetJson[0].JumpReadingEFM != '') {
    //   //if (parseFloat(pkgDetJson[0].JumpReadingEFM) > 0 && fileInputEFM.files.length == 0 && pkgDetJson[0].JumpCertificateEFM == '') {
    //   //    foundError = 'Please attach the Jump certificate for EFM Reading.';
    //   //    return foundError;
    //   //}
    //   if (!isUndefined(fileInputEFM)) {
    //     if (fileInputEFM.size > 0) { //fileInputEFM.files.length
    //       var validExtension = 'jpeg,jpg,png,gif';
    //       //for (var i = 0; i < fileInputEFM.files.length; i++) {
    //       var fileExtension = fileInputEFM.name.split('.')[1];//fileInputEFM.files[i].name.split('.')[1];
    //       if (validExtension.indexOf(fileExtension) < 0 && !isUndefined(fileExtension)) {
    //         foundError = 'Attachment (EFM) allowed only for [' + validExtension + '].';
    //         return foundError;
    //       }
    //       ///}
    //     }
    //   }
    //   if (regexNumeric.test(pkgDetJson[0].JumpReadingEFM) == false) {
    //     foundError = 'Only numeric value allowed for reading.';
    //     return foundError;
    //   }

    // }
    // if (JumpEFMCnt != '' && parseFloat(JumpEFMCnt) != 0 && isUndefined(JumpEFMCnt) == false) {
    //   if (regexNumeric.test(JumpEFMCnt) == false) {
    //     foundError = 'Only numeric value allowed for EFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (JumpEFMCnt.indexOf('.') > -1) {
    //     foundError = 'Decimal value not allowed for EFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (parseFloat(JumpEFMCnt) < 0) {
    //     foundError = 'EFM Jump reading count must be Positive.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingEFM == '' || isUndefined(pkgDetJson[0].JumpReadingEFM)) {
    //     foundError = 'Please enter the EFM Jump reading.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingEFM == '' || parseFloat(pkgDetJson[0].JumpReadingEFM) == 0) {
    //     foundError = 'Plese enter the Jump Reading';
    //     return foundError;
    //   }
    // }
    // else {
    //   if (pkgDetJson[0].JumpReadingEFM != '' && parseFloat(pkgDetJson[0].JumpReadingEFM) != 0) {
    //     foundError = 'Plese enter the EFM Jump Reading count.';
    //     return foundError;
    //   }

    // }
    //New//
    if (this.IsVentFlow == true) {
      if (pkgDetJson[0].VentFlowMeterReading == '' && parseFloat(pkgDetJson[0].VentFlowMeterReading) == 0
        || isNullOrUndefined(pkgDetJson[0].VentFlowMeterReading)) {
        foundError = 'Please enter the Vent Flow Meter Reading.';
        return foundError;
      }
    }

    if (DFMRead == "" || isUndefined(DFMRead)) {
      foundError = 'Discharge Flow Meter Reading is required.';
      return foundError;
    }
    if ((pkgDetJson[0].JumpReadingDFM == '' || pkgDetJson[0].JumpReadingDFM == undefined
      || parseFloat(pkgDetJson[0].JumpReadingDFM) == parseFloat("0")) && parseFloat(DFMRead) == parseFloat("0")) {
      foundError = 'Invalid Discharge Flow Meter Reading';
      return foundError;
    }
    if (DFMRead != "") {
      if (regexNumeric.test(DFMRead) == false) {
        foundError = 'Only numeric value allowed for DFM reading.';
        return foundError;
      }
      if (parseFloat(DFMRead) < 0) {
        foundError = 'Discharge Flow Meter Reading must be Positive.';
        return foundError;
      }
    }
    if ((this.MotorFrequency == "" || isUndefined(MotorFrequency)) && (this.PackageDetailJson[0].PrimeMover == 'M')) {
      foundError = 'Motor Frequencty is required.';
      return foundError;
    } 
    
    if ((MotorFrequency != "") && (this.PackageDetailJson[0].PrimeMover == 'M')) {
      if (regexNumeric.test(MotorFrequency) == false) {
          foundError = 'Only numeric value allowed for Frequency.';
          return foundError;
      }
      if ((parseFloat(MotorFrequency) < 0) && (this.PackageDetailJson[0].PrimeMover == 'M')) {
          foundError = 'Motor Frequencty must be Positive.';
          return foundError;
      }
  }
    //New Commmnet//
    // var JumpDFMCnt = pkgDetJson[0].JumpReadingDFMCount;
    // if (pkgDetJson[0].JumpReadingDFM != '') {
    //   //if (parseFloat(pkgDetJson[0].JumpReadingDFM) > 0 && fileInputDFM.files.length == 0 && pkgDetJson[0].JumpCertificateDFM == '') {
    //   //    foundError = 'Please attach the Jump certificate for DFM Reading.';
    //   //    return foundError;
    //   //}
    //   if (!isUndefined(fileInputDFM)) {
    //     if (fileInputDFM.size > 0) { //fileInputDFM.files.length
    //       var validExtension = 'jpeg,jpg,png,gif';
    //       //for (var i = 0; i < fileInputDFM.files.length; i++) {
    //       var fileExtension = fileInputDFM.name.split('.')[1];//fileInputDFM.files[i].name.split('.')[1];
    //       if (validExtension.indexOf(fileExtension) < 0 && !isUndefined(fileExtension)) {
    //         foundError = 'Attachment (DFM) allowed only for [' + validExtension + '].';
    //         return foundError;
    //       }
    //       //}
    //     }
    //   }
    //   if (regexNumeric.test(pkgDetJson[0].JumpReadingDFM) == false) {
    //     foundError = 'Only numeric value allowed for DFM reading.';
    //     return foundError;
    //   }
    // }
    // if (JumpDFMCnt != '' && parseFloat(JumpDFMCnt) != 0 && isUndefined(JumpDFMCnt) == false) {
    //   if (regexNumeric.test(JumpDFMCnt) == false) {
    //     foundError = 'Only numeric value allowed for DFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (JumpDFMCnt.indexOf('.') > -1) {
    //     foundError = 'Decimal value not allowed for DFM Jump reading count.';
    //     return foundError;
    //   }
    //   if (parseFloat(JumpDFMCnt) < 0) {
    //     foundError = 'DFM Jump reading count must be Positive.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingDFM == '' || isUndefined(pkgDetJson[0].JumpReadingDFM)) {
    //     foundError = 'Please enter the DFM Jump reading.';
    //     return foundError;
    //   }
    //   if (pkgDetJson[0].JumpReadingDFM == '' || parseFloat(pkgDetJson[0].JumpReadingDFM) == 0) {
    //     foundError = 'Plese enter the Jump Reading';
    //     return foundError;
    //   }
    // }
    // else {
    //   if (pkgDetJson[0].JumpReadingDFM != '' && parseFloat(pkgDetJson[0].JumpReadingDFM) != 0) {
    //     foundError = 'Plese enter the DFM Jump Reading count.';
    //     return foundError;
    //   }

    // }
    var TotalOtherHrs = parseInt(hrsJson.BdHrs) + parseInt(hrsJson.SHrs) + parseInt(hrsJson.UsHrs);
    var TotalOtherMins = parseInt(hrsJson.BdMin) + parseInt(hrsJson.SMins) + parseInt(hrsJson.UsMins);
    var accurateOtherMinsQuotient = Math.floor(TotalOtherMins / 60); //this will be Hours from total minutes other than Running Hours
    TotalOtherHrs = TotalOtherHrs + accurateOtherMinsQuotient;       //this will be minutes other than Running Minutes

    //if (hrsJson.RunHrs.hrs + ":" + hrsJson.BdMin.min == '00:00' && TotalOtherHrs < 24) {
    //    foundError = 'Running hours are required.';
    //    return foundError;
    //}
    var TotalHrs = parseInt(hrsJson.RunHrs) + parseInt(hrsJson.BdHrs) + parseInt(hrsJson.SHrs) + parseInt(hrsJson.UsHrs);
    var TotalMins = parseInt(hrsJson.RunMins) + parseInt(hrsJson.BdMin) + parseInt(hrsJson.SMins) + parseInt(hrsJson.UsMins);

    var accurateMinsQuotient = Math.floor(TotalMins / 60);  //this will be Hours from total minutes
    var remaiingMins = Math.floor(TotalMins % 60);          //this will be minutes
    TotalHrs = TotalHrs + accurateMinsQuotient;

    if ((TotalHrs == 24 && remaiingMins > 0) || (TotalHrs > 24)) {
      foundError = 'Total Hours must be less/equal than 24.';
      return foundError;
    }
    if (pkgDetJson[0].SuctionPressure == '' || isUndefined(pkgDetJson[0].SuctionPressure)) {
      foundError = 'Suction pressure is required.';
      return foundError;
    }

    if (pkgDetJson[0].SuctionPressure != "") {
      if (regexNumeric.test(pkgDetJson[0].SuctionPressure) == false) {
        foundError = 'Only numeric value allowed for SuctionPressure.';
        return foundError;
      }
      if (parseFloat(pkgDetJson[0].SuctionPressure) < 0) {
        foundError = 'Suction Pressure must be Positive.';
        return foundError;
      }
    }

    if (remarkJson.otherSelected == 'Other' && (isUndefined(remarkJson.pkgRemark) || remarkJson.pkgRemark == '')) {
      foundError = 'Please enter the other remarks.';
      return foundError;
    }
    return foundError;
  }

  showHideRemark() {
    if (this.mdlSelectedRemark == 'Other')
      this.mdlRemarkTextShow = false;
    else
      this.mdlRemarkTextShow = true;
  }

  resetchange(value, flag) {
    this.resetTypeJsonSelected = value;
    console.log(this.resetTypeJsonSelected);
  }
  //  //Pop-Up file Attach//
  // HoldResetReading(flag) {
  //   var FlagReadingType = '', fileInput, file;
  //   var PrvReading, JumpReading, MeterResetId, ReadingOnSwitch;
  //   if (flag == 'SFM') {
  //     console.log(this.filesSFM);
  //     //fileInput = (this.filesSFM[0];//document.getElementById('jcMeterResetSFM');
  //     file = (isUndefined(this.filesSFM)) ? null : this.filesSFM[0];//fileInput.files[0];
  //     this.resetTypeOptionSFM;
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeSFM,
  //       oldMeterReading: this.mdlReadingOnSwitchSFM,
  //       oldJumpReading: this.mdlResetJumpReadingSFM,
  //       fileObject: file
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeSFM == "Reset") ? 'R' : 'C';//this.resetTypeJsonSelectedSFM[0].Value;
  //     PrvReading = this.PackageDetailJson[0].SuctionFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingSFM;
  //     MeterResetId = this.meterResetIdSFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchSFM;
  //   }
  //   else if (flag == 'DFM') {
  //     //fileInput = this.filesDFM;//document.getElementById('jcMeterResetDFM');
  //     file = (isUndefined(this.filesDFM)) ? null : this.filesDFM[0];//fileInput.files[0];
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeDFM,
  //       oldMeterReading: this.mdlReadingOnSwitchDFM,
  //       oldJumpReading: this.mdlResetJumpReadingDFM,
  //       fileObject: fileInput
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeDFM == "Reset") ? 'R' : 'C';//this.resetTypeJsonSelectedDFM.Value;
  //     PrvReading = this.PackageDetailJson[0].DischargeFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingDFM;
  //     MeterResetId = this.meterResetIdDFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchDFM;
  //   }
  //   else if (flag == 'EFM') {
  //     //fileInput = this.filesEFM[0];//document.getElementById('jcMeterResetEFM');
  //     file = (isUndefined(this.filesEFM)) ? null : this.filesDFM;//fileInput.files[0];
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeEFM,
  //       oldMeterReading: this.mdlReadingOnSwitchEFM,
  //       oldJumpReading: this.mdlResetJumpReadingEFM,
  //       fileObject: file
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeEFM == "Reset") ? 'R' : 'C';//this.resetTypeJsonSelectedEFM.Value;
  //     PrvReading = this.PackageDetailJson[0].EngineFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingEFM;
  //     MeterResetId = this.meterResetIdEFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchEFM;
  //   }
  //   var globalDetail = JSON.parse(sessionStorage.getItem('globalDetail'));
  //   var sendJosn = {
  //     StationCode: this.StationCode,
  //     MeterOf: 'PKG',
  //     MeterOfId: this.PackageDetailJson[0].PackageId,
  //     MeterType: flag,
  //     FlagRead: 0,
  //     FlagReadingType: FlagReadingType,
  //     Id: MeterResetId,
  //     LoginId: this.LoginId,
  //     PrvReading: PrvReading,
  //     JumpReading: ((JumpReading == '') ? '0' : JumpReading),
  //     ReadingOnSwitch: ReadingOnSwitch,
  //     FilePath: localStorage.getItem('LoginId') + "/Package/"
  //   };

  //   var formData = new FormData();
  //   if (file != undefined || file != null) {
  //     formData.append("file", file);
  //   }
  //   // for (var i in fileInput.files)
  //   //     formData.append("file", fileInput.files[i]);

  //   formData.append("jsonDetail", JSON.stringify(sendJosn));
  //   // this.commonServices.loadingPresent();

  //   this.commonServices.FormpostwithService(formData).subscribe(
  //     (resp: any) => {
  //       // this.commonServices.loadingDismiss();
  //       const data = resp;

  //       if (flag == 'SFM') {
  //         this.mdlResetPopupSFM = false;
  //         this.mdlShowResetReadingSFM = true;
  //       }
  //       else if (flag == 'EFM') {
  //         this.mdlResetPopupEFM = false;
  //         this.mdlShowResetReadingEFM = true;
  //       }
  //       else if (flag == 'DFM') {
  //         this.mdlResetPopupDFM = false;
  //         this.mdlShowResetReadingDFM = true;
  //       }

  //       var MyJson = {
  //         StationCode: this.StationCode,
  //         LoginID: this.LoginId,
  //         PackageId: ((isUndefined(this.SelectedPkgId.PkgId) == true || this.SelectedPkgId.PkgId == '') ? '-999' : this.SelectedPkgId.PkgId)
  //       };
  //       this.commonServices.presentToast("Record saved Successfully.");
  //       this.GetPackageDetail(MyJson);
  //     },
  //     (error) => {
  //       this.commonServices.presentToast("Something went wrong.");
  //       // this.commonServices.loadingDismiss();
  //       //bummer
  //     }
  //   )
  // }
  // HoldResetReading(flag) {
  //   var FlagReadingType = '', fileInput, file;
  //   var PrvReading, JumpReading, MeterResetId, ReadingOnSwitch;
  //   if (flag == 'SFM') {
  //     console.log(this.filesSFM);
  //     //fileInput = (this.filesSFM[0];//document.getElementById('jcMeterResetSFM');
  //     file = (isUndefined(this.filesSFM)) ? null : this.filesSFM[0];//fileInput.files[0];
  //     this.resetTypeOptionSFM;
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeSFM,
  //       oldMeterReading: this.mdlReadingOnSwitchSFM,
  //       oldJumpReading: this.mdlResetJumpReadingSFM,
  //       fileObject: file
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeSFM == "Reset") ? 'R' : (this.ActionTypeSFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedSFM[0].Value;

  //     PrvReading = this.PackageDetailJson[0].SuctionFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingSFM;
  //     MeterResetId = this.meterResetIdSFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchSFM;
  //     this.PackageOldReading = this.OldMeterReading;
  //   }
  //   else if (flag == 'DFM') {
  //     //fileInput = this.filesDFM;//document.getElementById('jcMeterResetDFM');
  //     file = (isUndefined(this.filesDFM)) ? null : this.filesDFM[0];//fileInput.files[0];
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeDFM,
  //       oldMeterReading: this.mdlReadingOnSwitchDFM,
  //       oldJumpReading: this.mdlResetJumpReadingDFM,
  //       fileObject: fileInput
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeDFM == "Reset") ? 'R' : (this.ActionTypeDFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedDFM.Value;
  //     PrvReading = this.PackageDetailJson[0].DischargeFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingDFM;
  //     MeterResetId = this.meterResetIdDFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchDFM;
  //     this.PackageOldReading = this.mdlReadingOnSwitchDFM;
  //   }
  //   else if (flag == 'EFM') {
  //     //fileInput = this.filesEFM[0];//document.getElementById('jcMeterResetEFM');
  //     file = (isUndefined(this.filesEFM)) ? null : this.filesEFM[0];//fileInput.files[0];
  //     var jsonValidation = {
  //       ActionType: this.ActionTypeEFM,
  //       oldMeterReading: this.mdlReadingOnSwitchEFM,
  //       oldJumpReading: this.mdlResetJumpReadingEFM,
  //       fileObject: file
  //     };
  //     var retJson = this.validationMeterReset(jsonValidation);
  //     if (retJson.errorMsg != '') {
  //       this.commonServices.presentToast(retJson.errorMsg);
  //       return false;
  //     };
  //     FlagReadingType = (this.ActionTypeEFM == "Reset") ? 'R' : (this.ActionTypeEFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedSFM[0].Value;
  //     PrvReading = this.PackageDetailJson[0].EngineFlowMeterReadingPrv;
  //     JumpReading = this.mdlResetJumpReadingEFM;
  //     MeterResetId = this.meterResetIdEFM;
  //     ReadingOnSwitch = this.mdlReadingOnSwitchEFM;
  //     this.PackageOldReading = this.mdlReadingOnSwitchEFM;
  //   }

  //   var globalDetail = JSON.parse(sessionStorage.getItem('globalDetail'));
  //   var sendJosn = {
  //     StationCode: this.StationCode,
  //     MeterOf: 'PKG',
  //     MeterOfId: this.PackageDetailJson[0].PackageId,
  //     MeterType: flag,
  //     FlagRead: 0,
  //     FlagReadingType: FlagReadingType,
  //     Id: MeterResetId,
  //     LoginId: this.LoginId,
  //     PrvReading: this.PackageOldReading,
  //     JumpReading: ((JumpReading == '') ? '0' : JumpReading),
  //     ReadingOnSwitch: ReadingOnSwitch,
  //     FilePath: localStorage.getItem('LoginId') + "/Package/",
  //     MeterJumpRemark: this.MeterJumpRemark,
  //     JumpHistoryId: this.JumpHistoryId,
  //     MeterAfterJump: this.NewMeterReading,
  //     MeterBeforeJump: this.PackageOldReading
  //   };

  //   var formData = new FormData();
  //   if (file != undefined || file != null) {
  //     formData.append("file", file);
  //   }
  //   // for (var i in fileInput.files)
  //   //     formData.append("file", fileInput.files[i]);

  //   formData.append("jsonDetail", JSON.stringify(sendJosn));
  //   this.commonServices.loadingDismiss();

  //   this.commonServices.PackageHoldResetReading(formData).subscribe(
  //     (resp: any) => {
  //       this.commonServices.loadingDismiss();
  //       const data = resp;

  //       if (flag == 'SFM') {
  //         this.mdlResetPopupSFM = false;
  //         this.mdlShowResetReadingSFM = true;
  //       }
  //       else if (flag == 'EFM') {
  //         this.mdlResetPopupEFM = false;
  //         this.mdlShowResetReadingEFM = true;
  //       }
  //       else if (flag == 'DFM') {
  //         this.mdlResetPopupDFM = false;
  //         this.mdlShowResetReadingDFM = true;
  //       }

  //       var MyJson = {
  //         StationCode: this.StationCode,
  //         LoginID: this.LoginId,
  //         PackageId: ((isUndefined(this.SelectedPkgId.PkgId) == true || this.SelectedPkgId.PkgId == '') ? '-999' : this.SelectedPkgId.PkgId)
  //       };
  //       this.commonServices.presentToast("Record saved Successfully.");
  //       this.GetPackageDetail(MyJson);
  //     },
  //     (error) => {
  //       this.commonServices.presentToast("Something went wrong.");
  //       this.commonServices.loadingDismiss();
  //       //bummer
  //     }
  //   )
  //   this.getSFMJumpHistory('GET');
  //   this.getDFMJumpHistory('GET');
  //   this.getEFMJumpHistory('GET');
  // }
  // validationMeterReset(jsonValidation) {
  //   var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
  //   var jsonErrorMsg = { errorMsg: '' };

  //   if (isUndefined(jsonValidation.ActionType) || jsonValidation.ActionType == "--Select--" || jsonValidation.ActionType == "") {
  //     jsonErrorMsg = { errorMsg: 'Please select Action Type.' };
  //     return jsonErrorMsg;
  //   }
  //   if (isUndefined(jsonValidation.oldMeterReading) || jsonValidation.oldMeterReading == '') {
  //     jsonErrorMsg = { errorMsg: 'Please enter the Old Meter Reading.' };
  //     return jsonErrorMsg;
  //   }
  //   if (regexNumeric.test(jsonValidation.oldMeterReading) == false) {
  //     jsonErrorMsg = { errorMsg: 'Only numeric value allowed for reading.' };
  //     return jsonErrorMsg;
  //   }
  //   if (parseFloat(jsonValidation.oldMeterReading) < 0) {
  //     jsonErrorMsg = { errorMsg: 'Old Meter Reading must be Positive.' };
  //     return jsonErrorMsg;
  //   }
  //   if ((parseInt(jsonValidation.oldJumpReading) == 0 || jsonValidation.oldJumpReading == '') && !isUndefined(jsonValidation.fileObject) && (jsonValidation.fileObject != null) && (jsonValidation.fileObject.files.length > 0 || jsonValidation.formarJRImage == true)) {
  //     jsonErrorMsg = { errorMsg: 'Please enter the Jump Reading.' };
  //     return jsonErrorMsg;
  //   }
  //   if (regexNumeric.test(jsonValidation.oldJumpReading) == false) {
  //     jsonErrorMsg = { errorMsg: 'Only numeric value allowed for Jump reading.' };
  //     return jsonErrorMsg;
  //   }
  //   //if (!angular.isUndefined(jsonValidation.fileObject) && (jsonValidation.fileObject != null) && jsonValidation.fileObject.files.length > 0 && ((regexNumeric.test(jsonValidation.oldJumpReading) == false) || (parseFloat(jsonValidation.oldJumpReading) < 0))) {
  //   //    jsonErrorMsg = { errorMsg: 'Jump Reading must be Positive.' };
  //   //    return jsonErrorMsg;
  //   //}
  //   return jsonErrorMsg;
  // }
  clearPkgEFM() {
    this.ActionTypeEFM = "J";
    this.mdlReadingOnSwitchEFM = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
  }

  clearPkgSFM() {
    this.ActionTypeSFM = "J";
    this.OldMeterReading = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
  }

  clearPkgDFM() {
    this.ActionTypeDFM = "J";
    this.mdlReadingOnSwitchDFM = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
  }

  clearPkgVFM() {
    this.ActionTypeVFM = "J";
    this.mdlReadingOnSwitchVFM = "";
    this.NewMeterReading = "";
    this.MeterJumpRemark = "";
  }

  HoldResetReading(flag) {
    var FlagReadingType = '', fileInput, file;
    var PrvReading, JumpReading, MeterResetId, ReadingOnSwitch;
    if (flag == 'SFM') {
      console.log(this.filesSFM);
      //fileInput = (this.filesSFM[0];//document.getElementById('jcMeterResetSFM');
      file = (this.filesSFM == undefined) ? null : this.filesSFM;
      // file = (isUndefined(this.filesSFM)) ? null : this.filesSFM[0];//fileInput.files[0];
      this.resetTypeOptionSFM;
      var jsonValidation = {
        ActionType: this.ActionTypeSFM,
        oldMeterReading: this.OldMeterReading,
        oldJumpReading: this.mdlResetJumpReadingSFM,
        fileObject: file
      };
      var retJson = this.validationMeterReset(jsonValidation);
      if (retJson.errorMsg != '') {
        this.commonServices.presentToast(retJson.errorMsg);
        return false;
      };
      FlagReadingType = this.resetTypeJsonSelected;//(this.ActionTypeSFM == "Reset") ? 'R' : (this.ActionTypeSFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedSFM[0].Value;
      PrvReading = this.PackageDetailJson[0].SuctionFlowMeterReadingPrv;
      JumpReading = this.mdlResetJumpReadingSFM;
      MeterResetId = this.meterResetIdSFM;
      ReadingOnSwitch = this.mdlReadingOnSwitchSFM;
      this.PackageOldReading = this.OldMeterReading;
    }
    else if (flag == 'DFM') {
      //fileInput = this.filesDFM;//document.getElementById('jcMeterResetDFM');
      // file = (isUndefined(this.filesDFM)) ? null : this.filesDFM[0];//fileInput.files[0];
      file = (this.filesDFM == undefined) ? null : this.filesDFM;
      this.jsonValidation = {
        ActionType: this.ActionTypeDFM,
        oldMeterReading: this.mdlReadingOnSwitchDFM,
        oldJumpReading: this.mdlResetJumpReadingDFM,
        fileObject: file
      };
      var retJson = this.validationMeterReset(this.jsonValidation);
      if (retJson.errorMsg != '') {
        alert(retJson.errorMsg);
        return false;
      };
      FlagReadingType = this.resetTypeJsonSelected;//(this.ActionTypeDFM == "Reset") ? 'R' : (this.ActionTypeDFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedDFM.Value;
      PrvReading = this.PackageDetailJson[0].DischargeFlowMeterReadingPrv;
      JumpReading = this.mdlResetJumpReadingDFM;
      MeterResetId = this.meterResetIdDFM;
      ReadingOnSwitch = this.mdlReadingOnSwitchDFM;
      this.PackageOldReading = this.mdlReadingOnSwitchDFM;
    }
    else if (flag == 'EFM') {
      //fileInput = this.filesEFM[0];//document.getElementById('jcMeterResetEFM');
      // file = (isUndefined(this.filesEFM)) ? null : this.filesEFM[0];//fileInput.files[0];
      file = (this.filesEFM == undefined) ? null : this.filesEFM;
      this.jsonValidation = {
        ActionType: this.ActionTypeEFM,
        oldMeterReading: this.mdlReadingOnSwitchEFM,
        oldJumpReading: this.mdlResetJumpReadingEFM,
        fileObject: file
      };
      var retJson = this.validationMeterReset(this.jsonValidation);
      if (retJson.errorMsg != '') {
        this.commonServices.presentToast(retJson.errorMsg);
        return false;
      };
      FlagReadingType = this.resetTypeJsonSelected;//(this.ActionTypeEFM == "Reset") ? 'R' : (this.ActionTypeEFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedSFM[0].Value;
      PrvReading = this.PackageDetailJson[0].EngineFlowMeterReadingPrv;
      JumpReading = this.mdlResetJumpReadingEFM;
      MeterResetId = this.meterResetIdEFM;
      ReadingOnSwitch = this.mdlReadingOnSwitchEFM;
      this.PackageOldReading = this.mdlReadingOnSwitchEFM;
    }
    else if (flag == 'VFM') {
      //fileInput = this.filesEFM[0];//document.getElementById('jcMeterResetEFM');
      // file = (isUndefined(this.filesVFM)) ? null : this.filesVFM[0];//fileInput.files[0];
      file = (this.filesVFM == undefined) ? null : this.filesVFM;
      this.jsonValidation = {
        ActionType: this.ActionTypeVFM,
        oldMeterReading: this.mdlReadingOnSwitchVFM,
        oldJumpReading: this.mdlReadingOnSwitchVFM,
        fileObject: file
      };
      var retJson = this.validationMeterReset(this.jsonValidation);
      if (retJson.errorMsg != '') {
        this.commonServices.presentToast(retJson.errorMsg);
        return false;
      };
      FlagReadingType = this.resetTypeJsonSelected;//(this.ActionTypeEFM == "Reset") ? 'R' : (this.ActionTypeEFM == "Change") ? 'C' : 'J';//this.resetTypeJsonSelectedSFM[0].Value;
      PrvReading = this.PackageDetailJson[0].VentFlowMeterReading;
      JumpReading = this.mdlReadingOnSwitchVFM;
      MeterResetId = this.meterResetIdEFM;
      ReadingOnSwitch = this.mdlReadingOnSwitchVFM;
      this.PackageOldReading = this.mdlReadingOnSwitchVFM;
    }

    var globalDetail = JSON.parse(sessionStorage.getItem('globalDetail'));
    var sendJosn = {
      StationCode: this.StationCode,
      MeterOf: 'PKG',
      MeterOfId: this.PackageDetailJson[0].PackageId,
      MeterType: flag,
      FlagRead: 0,
      FlagReadingType: FlagReadingType,
      Id: MeterResetId,
      LoginId: this.LoginId,
      PrvReading: this.PackageOldReading,
      JumpReading: ((JumpReading == '') ? '0' : JumpReading),
      ReadingOnSwitch: ReadingOnSwitch,
      FilePath: localStorage.getItem('LoginId') + "/Package/",
      MeterJumpRemark: this.MeterJumpRemark,
      JumpHistoryId: this.JumpHistoryId,
      MeterAfterJump: this.NewMeterReading,
      MeterBeforeJump: this.PackageOldReading,
      EntryDate: this.geteDate.selcteddate
    };
    this.JumpHistoryId = "";
    var formData = new FormData();
    if (file != undefined || file != null) {
      formData.append("file", file);
    }
    // for (var i in fileInput.files)
    //     formData.append("file", fileInput.files[i]);

    formData.append("jsonDetail", JSON.stringify(sendJosn));
    this.commonServices.loadingPresent();

    this.commonServices.PackageHoldResetReading(formData).subscribe(
      (resp: any) => {
        this.commonServices.loadingDismiss();
        const data = resp;

        if (flag == 'SFM') {
          this.getSFMJumpHistory('GET');
          this.clearPkgSFM();
          this.mdlResetPopupSFM = false;
          this.mdlShowResetReadingSFM = true;
        }
        else if (flag == 'EFM') {
          this.getEFMJumpHistory('GET');
          this.clearPkgEFM();
          this.mdlResetPopupEFM = false;
          this.mdlShowResetReadingEFM = true;
        }
        else if (flag == 'DFM') {
          this.getDFMJumpHistory('GET');
          this.clearPkgDFM();
          this.mdlResetPopupDFM = false;
          this.mdlShowResetReadingDFM = true;
        }
        else if (flag == 'VFM') {
          this.getVFMJumpHistory('GET');
          this.clearPkgVFM();
          this.mdlResetPopupVFM = false;
          // this.mdlShowResetReadingVFM = true;
        }

        var MyJson = {
          StationCode: this.StationCode,
          LoginID: this.LoginId,
          PackageId: ((isUndefined(this.SelectedPkgId.PkgId) == true || this.SelectedPkgId.PkgId == '') ? '-999' : this.SelectedPkgId.PkgId)
        };
        this.commonServices.presentToast("Record saved Successfully.");
        this.GetPackageDetail(MyJson);
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
        //bummer
      }
    )
  }

  validationMeterReset(jsonValidation) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var jsonErrorMsg = { errorMsg: '' };

    if (isUndefined(jsonValidation.ActionType) || jsonValidation.ActionType == "--Select--"
      || jsonValidation.ActionType == "") {
      jsonErrorMsg = { errorMsg: 'Please select Action Type.' };
      return jsonErrorMsg;
    }
    if (isUndefined(jsonValidation.oldMeterReading) || jsonValidation.oldMeterReading == '') {
      jsonErrorMsg = { errorMsg: 'Please enter the Old Meter Reading.' };
      return jsonErrorMsg;
    }
    if (regexNumeric.test(jsonValidation.oldMeterReading) == false) {
      jsonErrorMsg = { errorMsg: 'Only numeric value allowed for reading.' };
      return jsonErrorMsg;
    }
    if (parseFloat(jsonValidation.oldMeterReading) < 0) {
      jsonErrorMsg = { errorMsg: 'Old Meter Reading must be Positive.' };
      return jsonErrorMsg;
    }
    if ((parseInt(jsonValidation.oldJumpReading) == 0 || jsonValidation.oldJumpReading == '') &&
      !isUndefined(jsonValidation.fileObject) && (jsonValidation.fileObject != null) &&
      (jsonValidation.fileObject.files.length > 0 || jsonValidation.formarJRImage == true)) {
      jsonErrorMsg = { errorMsg: 'Please enter the Jump Reading.' };
      return jsonErrorMsg;
    }
    if (regexNumeric.test(jsonValidation.oldJumpReading) == false) {
      jsonErrorMsg = { errorMsg: 'Only numeric value allowed for Jump reading.' };
      return jsonErrorMsg;
    }
    //if (!angular.isUndefined(jsonValidation.fileObject) && (jsonValidation.fileObject != null) && jsonValidation.fileObject.files.length > 0 && ((regexNumeric.test(jsonValidation.oldJumpReading) == false) || (parseFloat(jsonValidation.oldJumpReading) < 0))) {
    //    jsonErrorMsg = { errorMsg: 'Jump Reading must be Positive.' };
    //    return jsonErrorMsg;
    //}
    return jsonErrorMsg;
  }

  getSFMJumpHistory(FlagType) {
    this.clearPkgSFM();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'PKG',
      Id: '',
      StationCode: '',
      MeterOfId: this.PackageDetailJson[0].PackageId,
      MeterType: 'SFM',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.SFMJumpListHistory = JSON.parse(resp).Table;
        console.log(this.SFMJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteSFMJumpHistory(Id: string, FlagReading: string, itm: any) {
    // if (confirm("Are you sure to delete this record..?")) {
    //   var Json = {
    //     Id: Id,
    //     FlagEntryFor: 'DELETE',
    //     FlagReadingType: FlagReading,
    //     MeterOf: 'PKG',
    //     MeterOfId: this.PackageDetailJson[0].PackageId,
    //     EntryDate: this.geteDate.selcteddate,
    //     MeterType: 'SFM'
    //   }
    //   this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
    //     (resp: any) => {
    //       const data = JSON.parse(resp);
    //       this.commonServices.presentToast("Record deleted successfully");
    //       //this.openPopup(this.popupFor);
    //       setTimeout(() => {
    //         this.getSFMJumpHistory('GET');
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
      "Are you sure to delete this record..?").then((res: any) => {
        console.log(res);
        if (!res) {
          var Json = {
            Id: Id,
            FlagEntryFor: 'DELETE',
            FlagReadingType: FlagReading,
            MeterOf: 'PKG',
            MeterOfId: this.PackageDetailJson[0].PackageId,
            EntryDate: this.geteDate.selcteddate,
            MeterType: 'SFM'
          }
          this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              this.commonServices.presentToast("Record deleted successfully");
              //this.openPopup(this.popupFor);
              setTimeout(() => {
                this.getSFMJumpHistory('GET');
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
    this.getSFMJumpHistory('GET');
  }

  UpdateSFMJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.OldMeterReading = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.ActionTypeSFM = "J" }
    else if (itm.Action == "Change") { this.ActionTypeSFM = "C" }
    else { this.ActionTypeSFM = "R" }
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

  getDFMJumpHistory(FlagType) {
    this.clearPkgDFM();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'PKG',
      Id: '',
      StationCode: '',
      MeterOfId: this.PackageDetailJson[0].PackageId,
      MeterType: 'DFM',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.DFMJumpListHistory = JSON.parse(resp).Table;
        console.log(this.DFMJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteDFMJumpHistory(Id: string, FlagReading: string, itm: any) {
    // if (confirm("Are you sure to delete this record..?")) {
    //   var Json = {
    //     Id: Id,
    //     FlagEntryFor: 'DELETE',
    //     FlagReadingType: FlagReading,
    //     MeterOf: 'PKG',
    //     MeterOfId: this.PackageDetailJson[0].PackageId,
    //     EntryDate: this.geteDate.selcteddate,
    //     MeterType: 'DFM'
    //   }
    //   this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
    //     (resp: any) => {
    //       const data = JSON.parse(resp);
    //       this.commonServices.presentToast("Record deleted successfully");
    //       //this.openPopup(this.popupFor);
    //       setTimeout(() => {
    //         this.getDFMJumpHistory('GET');
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
      "Are you sure to delete this record..?").then((res: any) => {
        console.log(res);
        if (!res) {
          var Json = {
            Id: Id,
            FlagEntryFor: 'DELETE',
            FlagReadingType: FlagReading,
            MeterOf: 'PKG',
            MeterOfId: this.PackageDetailJson[0].PackageId,
            EntryDate: this.geteDate.selcteddate,
            MeterType: 'DFM'
          }
          this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              this.commonServices.presentToast("Record deleted successfully");
              //this.openPopup(this.popupFor);
              setTimeout(() => {
                this.getDFMJumpHistory('GET');
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
    this.getDFMJumpHistory('GET');
  }

  UpdateDFMJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.mdlReadingOnSwitchDFM = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.ActionTypeDFM = "J" }
    else if (itm.Action == "Change") { this.ActionTypeDFM = "C" }
    else { this.ActionTypeDFM = "R" }
  }

  getEFMJumpHistory(FlagType) {
    this.clearPkgEFM();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'PKG',
      Id: '',
      StationCode: '',
      MeterOfId: this.PackageDetailJson[0].PackageId,
      MeterType: 'EFM',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.EFMJumpListHistory = JSON.parse(resp).Table;
        console.log(this.EFMJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteEFMJumpHistory(Id: string, FlagReading: string, itm: any) {
    this.commonServices.alertMessage("Delete",
      "Are you sure to delete this record..?").then((res: any) => {
        console.log(res);
        if (!res) {
          var Json = {
            Id: Id,
            FlagEntryFor: 'DELETE',
            FlagReadingType: FlagReading,
            MeterOf: 'PKG',
            MeterOfId: this.PackageDetailJson[0].PackageId,
            EntryDate: this.geteDate.selcteddate,
            MeterType: 'EFM'
          }
          this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              this.commonServices.presentToast("Record deleted successfully");
              setTimeout(() => {
                this.getEFMJumpHistory('GET');
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
    this.getEFMJumpHistory('GET');
  }

  UpdateEFMJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.mdlReadingOnSwitchEFM = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;

    if (itm.Action == "Jump") { this.ActionTypeEFM = "J" }
    else if (itm.Action == "Change") { this.ActionTypeEFM = "C" }
    else { this.ActionTypeEFM = "R" }
  }

  getVFMJumpHistory(FlagType) {
    this.clearPkgVFM();
    const obj = {
      FlagEntryFor: FlagType,
      MeterOf: 'PKG',
      Id: '',
      StationCode: '',
      MeterOfId: this.PackageDetailJson[0].PackageId,
      MeterType: 'VFM',
      EntryDate: this.geteDate.selcteddate,
      FlagReadingType: ""
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetJumpReadingList", obj).subscribe(
      (resp: any) => {
        this.VFMJumpListHistory = JSON.parse(resp).Table;
        console.log(this.EFMJumpListHistory);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  DeleteVFMJumpHistory(Id: string, FlagReading: string, itm: any) {
    this.commonServices.alertMessage("Delete",
      "Are you sure to delete this record..?").then((res: any) => {
        console.log(res);
        if (!res) {
          var Json = {
            Id: Id,
            FlagEntryFor: 'DELETE',
            FlagReadingType: FlagReading,
            MeterOf: 'PKG',
            MeterOfId: this.PackageDetailJson[0].PackageId,
            EntryDate: this.geteDate.selcteddate,
            MeterType: 'VFM'
          }
          this.commonServices.postwithservice("GetJumpReadingList", Json).subscribe(
            (resp: any) => {
              const data = JSON.parse(resp);
              this.commonServices.presentToast("Record deleted successfully");
              setTimeout(() => {
                this.getVFMJumpHistory('GET');
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
    this.getVFMJumpHistory('GET');
  }

  UpdateVFMJumpHistory(Id: string, itm: any) {
    this.JumpHistoryId = Id;
    this.mdlReadingOnSwitchVFM = itm.BeforeJumpReading;
    this.NewMeterReading = itm.AfterJumpReading;
    this.MeterJumpRemark = itm.Remark;
    if (itm.Action == "Jump") { this.ActionTypeVFM = "J" }
    else if (itm.Action == "Change") { this.ActionTypeVFM = "C" }
    else { this.ActionTypeVFM = "R" }
  }
  // //Package  code  --End-- //
}