import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { saveAs } from 'file-saver';

// import { File } from '@ionic-native/file/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-jump-reading-system',
  templateUrl: './jump-reading-system.page.html',
  styleUrls: ['./jump-reading-system.page.scss'],
})
export class JumpReadingSystemPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  JumpReadingData: any = [];
  Dashdate = '';
  selectedStation: string = '';
  CDate: string;
  Status: string;
  Id: string;

  reverse: boolean = true;
  DepartmentCode: string = localStorage.getItem('DepartmentCode');
  LoginStationId: string = localStorage.getItem('stationId');
  UserId: string = localStorage.getItem('UID');
  errorFound: boolean;
  Action: string = '';
  Remark: string = '';
  TotalJump: number = 0.00;
  StationId: string = '';
  flag: string = '';
  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  JumpDate: string;
  ApprovedDate: string;
  secondMaxDate: any = new Date().toISOString();

  CurrentDate: string = '';
  DateFrom: string;
  DateTo: string;
  DateFromMy: any = new Date().toISOString().split('T')[0];
  showRemark: boolean = false;
  showmaincontent: boolean = true;
  ApprovedByIntrument: number = 0
  ApprovedByONM: number = 0

  constructor(private menu: MenuController, private router: Router, private activatedroute: ActivatedRoute,
    public commonServices: ApiService, private platform: Platform, private fileOpener: FileOpener, private datepipe: DatePipe,
    private document: DocumentViewer, private file: File,
    private transfer: FileTransfer, public alertController: AlertController) { }

  ngOnInit() {

    const dt = new Date();
    this.CurrentDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    this.DateFrom = new Date().toLocaleDateString();
    this.DateTo = new Date().toLocaleDateString();
    // this.Dashdate = '07-Aug-2020'; //new Date().toLocaleDateString();

    // this.CDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.CDate= '07-Aug-2020';

    //IoS Comment
    // this.DateFrom = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.DateTo = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    this.DateFrom = this.datepipe.transform(dt, 'yyyy/MM/dd');
    this.DateTo = this.datepipe.transform(dt, 'yyyy/MM/dd');
    setTimeout(() => {
      this.getJumpReadingData();
    });
  }

  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    //IoS Comment
    // self.DateFrom = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateFrom = this.datepipe.transform(dt, 'yyyy/MM/dd');
    if ((new Date(self.DateTo)) < (new Date(self.DateFrom))) {
      console.log("Time");
      this.DateTo = this.DateFrom.split('T')[0];
      // this.DateFromMy = this.DateFrom.split('T')[0];
    }
    this.getJumpReadingData();
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);
    //IOS Comment
    //self.DateTo = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateTo = this.datepipe.transform(dt, 'yyyy/MM/dd');

    this.getJumpReadingData();
  }

  openFirst() {
    if (this.DepartmentCode == 'SO') {
      this.menu.enable(true, 'menuStn');
      this.menu.open('menuStn');
    }
    else {
      this.menu.enable(true, 'menuCO');
      this.menu.open('menuCO');
    }
  }

  searchCollapse() {
    if (this.searchFlag == 0) {
      this.searchShow = true;
      this.searchFlag = 1;
    }
    else {
      this.searchShow = false;
      this.searchFlag = 0;
    }
  }
  hideSearchBar() {
    this.searchShow = false;
    this.searchFlag = 0;
  }

  // get Date

  //  getSelectedDate(datePicker) {
  //   console.log("datePicker", datePicker);

  //   const dt = new Date(datePicker);
  //   let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

  //   this.CDate = latest_date;
  //   //datePicker.open();

  // }
  getJumpReadingData() {
    this.commonServices.loadingPresent();
    this.commonServices.post("CommonGetData", {
      Flag: 'JumpReadingSystemDataByRole', ReportFlag: this.DepartmentCode,
      // ActivityLog_date: this.DateFrom,
      // CDashdate: this.DateTo,
      ActivityLog_date: this.datepipe.transform(this.DateFrom, 'dd/MMM/yyyy'),
      CDashdate: this.datepipe.transform(this.DateTo, 'dd/MMM/yyyy'),
      Id: this.UserId
    }).subscribe(
      (res: any) => {
        this.commonServices.loadingDismiss();
        if (JSON.parse(res).Table.length > 0) {
          this.JumpReadingData = JSON.parse(res).Table
          console.log(this.JumpReadingData, "JumpReadingSystemDataByRole");
        } else {
          this.JumpReadingData = [];
          this.commonServices.presentToast("No Data Found.");
        }
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }
  OnDateChnage(val) {
    // const dt = new Date(val);
    // this.CDate= dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    this.getJumpReadingData();
  }

  GetRowdata(itm) {
    this.Id = itm.ID,
      this.StationId = itm.StationId,
      this.Remark = this.Remark,
      this.TotalJump = this.TotalJump,
      // this.JumpDate = itm.JumpDate
      this.ApprovedDate = itm.ApprovedDate
  }
  InsertRemarkByInstrumental() {
    var Json = {
      Id: this.Id,
      SelectedDate: this.ApprovedDate,
      StationId: this.StationId,
      DepartmentCode: this.DepartmentCode,
      Remark: this.Remark,
      Jump: this.TotalJump,
      LoginId: this.UserId
    };
    this.commonServices.loadingPresent();
    this.commonServices.post("InsertRemarkByInstrumental", Json).subscribe(
      (res: any) => {
        const data = JSON.parse(res);
        console.log(data.Table[0].Mesage, "Success");
        this.commonServices.presentToast(data.Table[0].Mesage);
        this.commonServices.loadingDismiss();
        // $('.modal').modal('hide');
        this.getJumpReadingData();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }
  UpdateJumpReadingStatusByRole(status, itm) {
    this.Action = status;
    this.ApprovedByIntrument = itm.IsApprovedByInstrumental;
    this.ApprovedByONM = itm.IsApprovedByONM;
    var Json = {
      Id: itm.ID,
      SelectedDate: itm.ApprovedDate,
      StationId: itm.StationId,
      DepartmentCode: this.DepartmentCode,
      status: (status == 'A') ? 1 : 2,
      Remark: this.Remark,
      Jump: this.TotalJump,
      LoginId: this.UserId,
      ApprovedByIntrument: itm.IsApprovedByInstrumental,
      ApprovedByONM: itm.IsApprovedByONM
    };

    this.errorFound = true;
    if (this.ValidateJRS()) {
      this.commonServices.loadingPresent();
      this.commonServices.post("UpdateJumpReadingStatusByRole", Json).subscribe(
        (res: any) => {
          const data = JSON.parse(res);
          console.log(data.Table[0].Mesage, "Success");

          this.commonServices.loadingDismiss();
          if (this.DepartmentCode == 'SO' && status == 'A') {
            this.confirmCertificate(itm.ApprovedDate);
          }
          if (this.DepartmentCode == 'HO' && status == 'A') {
            this.confirmCertificate(itm.ApprovedDate);
          }
          this.commonServices.presentToast(data.Table[0].Mesage);
          this.getJumpReadingData();
        },
        (error) => {
          this.commonServices.presentToast("Something went wrong.");
          this.commonServices.loadingDismiss();
        }
      )
    }
  }

  async confirmCertificate(ApprovedDate: string) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do You want download Jump Certificate.?"',
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
            this.GenerateJumpCertificate(ApprovedDate);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  GenerateJumpCertificate(ApprovedDate: string) {
    this.commonServices.loadingPresent();
    this.commonServices.post("JumpReadingCertificate", { Flag: 'getJumPReadingById', CDashdate: ApprovedDate, Id: this.Id, Status: this.StationId }).subscribe(
      (res: any) => {
        const data = JSON.parse(res);
        if (data) {
          let PdfUrl: string = "";
          PdfUrl = this.commonServices.baseUrl.substring(0, this.commonServices.baseUrl.length - 4) + JSON.parse(res);
          console.log(PdfUrl);
          // let FileSaver = require('file-saver');
          // FileSaver.saveAs(PdfUrl);
          // const pdfUrl = 'https://example.com/sample.pdf';  // URL of the PDF
          saveAs(PdfUrl, 'downloaded_file.pdf');  
          let path = null;

          if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
          } else {
            path = this.file.dataDirectory;
          }

          const transfer = this.transfer.create();
          transfer.download(PdfUrl, path + data).then(entry => {
            let url = entry.toURL();
            if (this.platform.is('ios')) {
              this.document.viewDocument(url, 'application/pdf', {});
            } else {
              this.fileOpener.open(url, 'application/pdf');
            }
          });
        }
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )

  }
  goToJumpReamrk(value, itm) {
    this.GetRowdata(itm);
    // this.router.navigate(['/jump-reading-system-remark']);
    if (value == true) {
      this.showRemark = true;
      this.showmaincontent = false;
    }
    else {
      this.showmaincontent;
      this.showRemark
    }

  }


  ValidateJRS() {
    if (this.DepartmentCode == 'CO') {
      if (this.ApprovedByIntrument == 0 && (this.Action == 'A' || this.Action == 'R')) {
        this.commonServices.presentToast('ONM cant approve/reject jump record before Instrumental.');
        this.errorFound = false;
      }
      if (this.ApprovedByIntrument == 2 && this.Action == 'A') {
        this.commonServices.presentToast('Record cant approved, As jump record rejected by Instrumental.');
        this.errorFound = false;
      }
    }
    else if (this.DepartmentCode == 'MO') {
      if (this.ApprovedByONM == 0 && (this.Action == 'A' || this.Action == 'R')) {
        this.commonServices.presentToast('Marketing officer cant approve/reject jump record before ONM.');
        this.errorFound = false;
      }
      if (this.ApprovedByIntrument == 2 && status == 'A') {
        this.commonServices.presentToast('Record cant approve, As jump record rejected by ONM.');
        this.errorFound = false;
      }
    }
    return this.errorFound;

  }
}
