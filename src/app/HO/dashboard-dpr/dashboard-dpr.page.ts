import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-dashboard-dpr',
  templateUrl: './dashboard-dpr.page.html',
  styleUrls: ['./dashboard-dpr.page.scss'],
})
export class DashboardDprPage implements OnInit {
  dprRes: any;
  dprData = { selcteddate: "" }
  currentdate: any;
  currDate: any;
  selectedDate: any;
  todayTime: any;
  month: any;
  day: any;
  year: any;
  FulllYear: any;
  userid: any;
  per: any;
  secondMaxDate: any = new Date().toISOString();

  constructor(private router: Router, public commonServices: ApiService, public datepipe: DatePipe, private menu: MenuController) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.dprData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);

      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.dprData.selcteddate = latest_date;
      //IOS Add
      this.dprData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    }
    else {
      this.selectedDate = new Date(this.dprData.selcteddate).setDate(new Date(this.dprData.selcteddate).getDate());
      this.todayTime = new Date(this.currDate);
      this.month = this.todayTime.getMonth() + 1;
      this.day = this.todayTime.getDate();
      this.year = this.todayTime.getFullYear();
      this.FulllYear = this.year + "-" + this.month + "-" + this.day;

    }
    this.userid = localStorage.getItem("UID");
    this.getDsaData();
  }


  homeRedirect() {
    this.router.navigate(['admin-home']);
  }

  ngOnInit() {
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
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

    // this.dprData.selcteddate = latest_date;
    //IOS Add
    this.dprData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    //datePicker.open();
    this.getDsaData();
  }


  getDsaData() {
    var self = this;
    // self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetDashBoardHO", {
      // Cdate: self.dprData.selcteddate 
      Cdate: this.datepipe.transform(this.dprData.selcteddate, 'dd/MMM/yyyy')
    }).
      subscribe((res: any) => {
        var getdsaRes = JSON.parse(res)
        var dsrdashboard = getdsaRes.Table;
        if (dsrdashboard.length > 0) {
          self.dprRes = dsrdashboard;
          console.log(self.dprRes);
        }
        else {
          self.commonServices.presentToast("No data available.");
        }
        // self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
          // self.commonServices.loadingDismiss();
        }
      );
  }
}
