import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { RemarkPopupPage } from '../remark-popup/remark-popup.page';

@Component({
  selector: 'app-reviews-co',
  templateUrl: './reviews-co.page.html',
  styleUrls: ['./reviews-co.page.scss'],
})

export class ReviewsCOPage implements OnInit {
  arrReviewData: any = [];
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  secondMaxDate: any = new Date().toISOString();
  outerCheck: number = 0;
  DPREntryDateTime: string;
  stationCode: any;
  isShown: boolean = false; // hidden by default
  stationname: any;
  stationReportData: any = [];
  DataTable: any = [];
  DataTable1: any = [];
  DataTable2: any = [];
  DataTable3: any = [];
  StationCode: string = localStorage.getItem('stationCode');
  LoginId: string = localStorage.getItem('LoginCode');
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
  newArrayafterremove: any;
  constructor(private formBuilder: FormBuilder, private router: Router, public modalController: ModalController,
    private activatedroute: ActivatedRoute, public commonServices: ApiService,
    private dp: DatePipe, public actionSheetController: ActionSheetController,
    public alertController: AlertController, private menu: MenuController) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.geteDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      //IOS Comment
      // let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
      // this.geteDate.selcteddate = latest_date;
      //IOS Add
      this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
      this.geteDate.selcteddate = this.dp.transform(dt, 'yyyy/MM/dd');
      this.getReviewData();
    }
  }

  ngOnInit() {
    this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].UserName;
    //this.getStationReportData();
    console.log(this.glovalJson[0], "PrimaryId");
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
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
    // let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();

    // this.geteDate.selcteddate = latest_date;
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    //IOS Add
    this.DPREntryDateTime = this.dp.transform(dt, 'yyyy/MM/dd hh:mm:ss');
    this.geteDate.selcteddate = this.dp.transform(dt, 'yyyy/MM/dd');
    this.getReviewData();
  }

  getReviewData() {
    // try {
    console.log(this.LoginId);
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetStationsByCR",
      {
        LoginId: this.LoginId,
        // DPREntryDate: this.geteDate.selcteddate,
        DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
      }).subscribe(
        (response: any) => {
          // const data = JSON.parse(responseonse);
          console.log(response, "SummaryData");

          console.log(response);
          const data = response;
          // JSON.parse(response._body);
          if (data) {
            this.arrReviewData = response;
            console.log(this.arrReviewData);
            this.newArrayafterremove = this.arrReviewData.map(({ StationName, SubmitStatus, ...rest }) => rest)

            console.log(this.newArrayafterremove)
            // this.stationToSubmit = this.arrReviewData.filter(
            //   arrayobj => arrayobj.SubmitStatus == "1"); 

            if (this.arrReviewData[0].isSentToHo == 1)
              this.outerCheck = 1;
            else
              this.outerCheck = 0;
            // this.objDbServ.ShowLoaders.emit(false);
          }
          else {
            this.commonServices.presentToast('Data not found.');
          }
          this.commonServices.loadingDismiss();
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      );
    // }
    // catch (err) {
    //   console.log(err);
    // }
  }


  // For Final Approve
  makeFinalApprove() {
    console.log(this.glovalJson[0].LoginId);
    var temparray: any = [];
    temparray = this.arrReviewData.filter(
      arrayobj => arrayobj.selected == true);
    if (temparray.length == 0) {
      this.commonServices.presentToast('Station Entry is Pending.');
      return false;
    }

    // if (!confirm('Do you really want to Approve?'))
    //     return false;
    this.conApprove();

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: RemarkPopupPage,
      cssClass: 'modalCSSDiscount',
      componentProps: {
        LoginId: this.LoginId,
        ControlRoomCode: this.LoginId,
        //DPREntryDate: this.geteDate.selcteddate
        DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
      }
    });
    modal.onDidDismiss().then(data => {
      // console.log("Data AGE" + JSON.parse(data.toString()));
      if (data.data.typeDismis == 1) {
        this.getReviewData();
      } else {

      }
    })
    return await modal.present();
  }

  async conApprove() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you really want to Approve?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            // return false;
            this.FinalFileApprove();

          }
        }
      ]
    });

    await alert.present();
  }

  FinalFileApprove() {
    console.log(this.glovalJson[0].LoginId);
    var temparray: any = [];
    temparray = this.arrReviewData.filter(
      arrayobj => arrayobj.selected == true);

    var stJson = [];
    temparray.forEach(element => {
      stJson.push({
        LoginId: this.glovalJson[0].LoginId,
        StationCode: element.StationCode,
        // DPREntryDate: this.geteDate.selcteddate
        DPREntryDate: this.dp.transform(this.geteDate.selcteddate, 'dd/MMM/yyyy')
      });
    });
    this.commonServices.loadingPresent();

    this.commonServices.postwithservice("FinalSubmitCO",
      stJson).subscribe(
        (resp: any) => {
          const data = resp;
          console.log(data);
          if (data.Status == 'false') {
            this.commonServices.presentToast('Please save all the entries before final Approval.');
            this.commonServices.loadingDismiss();
            return false;
          }
          else {
            this.commonServices.loadingDismiss();
            this.commonServices.presentToast('Data is Approved.');
            this.getReviewData()
          }
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      );
  }
  showStationCode(stname) {
    var item = this.arrReviewData.filter(item => item.StationName === stname);
    console.log("station code", item);
    this.stationCode = item[0].StationCode;
    this.stationname = item[0].StationName;
    this.isShown = !this.isShown;
  }
  exportToExcel() {
    this.commonServices.exportToExcel(this.newArrayafterremove, 'ReviewData');
  }
}
