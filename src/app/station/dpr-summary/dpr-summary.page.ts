import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dpr-summary',
  templateUrl: './dpr-summary.page.html',
  styleUrls: ['./dpr-summary.page.scss'],
})
export class DprSummaryPage implements OnInit {
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: string;

  stationReportData: any = [];
  DataTable: any = [];
  DataTable1: any = [];
  DataTable2: any = [];
  DataTable3: any = [];
  StationCode: string = localStorage.getItem('stationCode');
  LoginId: string = localStorage.getItem('stationCode');
  glovalJson: any = JSON.parse(localStorage.getItem('globalDetail'));
  stationName: string = "";
  MeterSkitdiffAVG: number = 0.00;
  StationGasLoss: number = 0.00;
  GrossSale: number = 0.00;
  TotalList: any = [];
  SummeryDate: string;
  summary: any = {
    prm_id: (this.glovalJson[0].prm_id == null || this.glovalJson[0].prm_id === undefined) ? 0 : this.glovalJson[0].prm_id
  };
  secondMaxDate: any = new Date().toISOString();
  StationLossData: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private activatedroute: ActivatedRoute, public commonServices: ApiService,
    private dp: DatePipe, public actionSheetController: ActionSheetController, public alertController: AlertController, private menu: MenuController) {
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
      this.getStationReportData();
    }
  }

  ngOnInit() {
    this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].UserName;
    //this.getStationReportData();
    console.log(this.glovalJson[0], "PrimaryId");
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
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

    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.DPREntryDateTime;
    this.getStationReportData();
  }

  getStationReportData() {
    // try {
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetStationReport",
      {
        StationCode: this.StationCode, LoginId: this.LoginId,
        DPREntryDate: this.geteDate.selcteddate
      }).subscribe(
        (response: any) => {
          const data = JSON.parse(response);
          console.log(data, "SummaryData");
          if (data) {
            this.stationReportData = data;
            console.log(this.stationReportData);
            this.DataTable = this.stationReportData.Table;
            console.log(this.DataTable+'DataTable');
            this.MeterSkitdiffAVG = this.stationReportData.Table[0].MeterskitdiffAVG;
            //this.StationGasLoss = (this.MeterSkitdiffAVG) - parseFloat(this.stationReportData.Table[0].DispenserTotalSale);
            // this.StationGasLoss = (this.MeterSkitdiffAVG == null ? 0.00 : this.MeterSkitdiffAVG) - parseFloat(this.stationReportData.Table[0].DispenserTotalSale == null ? 0.00 : this.stationReportData.Table[0].DispenserTotalSale);
            console.log("MS : " + this.MeterSkitdiffAVG, "D Sale" + this.stationReportData.Table[0]);
            this.DataTable1 = this.stationReportData.Table1;
            this.DataTable2 = this.stationReportData.Table2;
            this.DataTable3 = this.stationReportData.Table3;
            this.StationGasLoss = this.stationReportData.Table4[0].Loss;
            console.log(this.StationLossData);
            this.StationGasLoss = parseFloat(this.StationGasLoss.toFixed(2));
            console.log(this.StationGasLoss, "StationLoss");
            console.log(this.stationReportData.Table, "DispenserTotalSale");
            console.log(this.stationReportData.Table.length, "length");
            console.log(this.stationReportData.Table, "Table");

          }
          else {
            this.commonServices.presentToast('No data available. Please try again.')
          }
          this.commonServices.loadingDismiss();
        },
        (error) => {
          console.log('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      );
    // }
    // catch (err) {
    //   console.log(err);
    // }
  }

  stationSummarySubmit() {
    // if (!confirm('You won\'t be able to make changes after submit, are you sure?')) 
    // { return false; }
    this.commonServices.alertMessage("Confirm",
      "You won\'t be able to make changes after submit, are you sure?").then((res: any) => {
        console.log(res);
        if (!res)
          try {
            const obj = {
              LoginId: this.glovalJson[0].LoginId,
              StationName: this.glovalJson[0].StationCode,
              StationCode: this.glovalJson[0].StationCode,
              DPREntryDate: this.geteDate.selcteddate
            };
            this.commonServices.loadingPresent();
            this.commonServices.postwithservice("FinalSubmit", obj).subscribe(
              (response: any) => {
                const data = JSON.parse(response);

                console.log(data);
                if (data.Status.indexOf('#999#') > -1) {
                  var missingFor = data.Status.split('#999#')[1];
                  this.commonServices.presentToast('Please fill the entry for ' + missingFor + '.');
                  this.commonServices.loadingDismiss();
                  return false;
                }
                if (data.Status == '3') {
                  this.commonServices.presentToast('Data is already submitted.');
                  this.commonServices.loadingDismiss();
                  return false;
                }
                if (data.Status == '4') {
                  this.commonServices.presentToast('You are not authorized to submit data.');
                  this.commonServices.loadingDismiss();
                  return false;
                }
                else {
                  this.commonServices.loadingDismiss();
                  this.commonServices.presentToast('Data is submitted.');
                }

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
      })
  }

  // async conApprove() {
  //   let choice
  //   const alert = await this.alertController.create({
  //     header: 'Confirm',
  //     message: 'You won\'t be able to make changes after submit, are you sure?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //          alert.dismiss(true);
  //           return false;
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //           alert.dismiss(false);
  //            return false;
  //           // this.FinalFileApprove();

  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  //   await alert.onDidDismiss().then((data) => {
  //     choice = data.data
  // })
  // return choice
  // }
}