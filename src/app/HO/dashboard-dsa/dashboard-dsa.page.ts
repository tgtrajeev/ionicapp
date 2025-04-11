import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-dashboard-dsa',
  templateUrl: './dashboard-dsa.page.html',
  styleUrls: ['./dashboard-dsa.page.scss'],
})
export class DashboardDsaPage implements OnInit {
  dsaRes: any;
  dsaData = { selcteddate: "" }
  currentdate: any;
  currDate: any;
  selectedDate: any;
  todayTime: any;
  month: any;
  day: any;
  year: any;
  FulllYear: any;
  userid: any;
  secondMaxDate: any = new Date().toISOString();

  constructor(private router: Router, public commonServices: ApiService, public datepipe: DatePipe, private menu: MenuController
  ) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.dsaData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate);
      const dt = new Date(this.currDate);
      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.dsaData.selcteddate = latest_date;
      //IOS Add
      this.dsaData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    }
    else {
      this.selectedDate = new Date(this.dsaData.selcteddate).setDate(new Date(this.dsaData.selcteddate).getDate());
      this.todayTime = new Date(this.currDate);
      this.month = this.todayTime.getMonth() + 1;
      this.day = this.todayTime.getDate();
      this.year = this.todayTime.getFullYear();
      this.FulllYear = this.year + "-" + this.month + "-" + this.day;
    }
    this.userid = localStorage.getItem("UID");
    this.getDsaData();
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
    //let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

    // this.dsaData.selcteddate = latest_date;
    //IOS Add
    this.dsaData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    //datePicker.open();
    this.getDsaData();
  }


  getDsaData() {
    var self = this;
    // self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", {
      Flag: 'StationSubmittedStatusForMO', Id: self.userid,
      // CDashdate: self.dsaData.selcteddate
      CDashdate : this.datepipe.transform(this.dsaData.selcteddate,'dd/MMM/yyyy')
    }).subscribe((res: any) => {
      var getdsaRes = JSON.parse(res)
      var dsrdashboard = getdsaRes.Table;
      if (dsrdashboard.length > 0) {
        self.dsaRes = dsrdashboard;
        console.log(self.dsaRes);
      }
      else {
        self.commonServices.presentToast("No data available.");
      }
      // self.commonServices.loadingDismiss();
    },
      (error) => {
        console.log('Something went wrong.');
        // self.commonServices.loadingDismiss();
      }
    );
  }
}
