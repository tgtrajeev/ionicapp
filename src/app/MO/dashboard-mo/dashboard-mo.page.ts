import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-dashboard-mo',
  templateUrl: './dashboard-mo.page.html',
  styleUrls: ['./dashboard-mo.page.scss'],
})
export class DashboardMoPage implements OnInit {
  dsaData = { selcteddate: "" }
  currentdate: any;
  currDate: any;
  selectedDate: any;
  todayTime: any;
  month: any;
  day: any;
  year: any;
  FulllYear: any;
  userId: string;
  MOStaionData: any;
  UserType: any;
  latest_date: string;
  secondMaxDate: any = new Date().toISOString();
  constructor( private router: Router, public commonServices: ApiService, public datepipe: DatePipe, private menu: MenuController
  ) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.dsaData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate);
      const dt = new Date(this.currDate);
      // IOS Comment
      //this.latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.dsaData.selcteddate = this.latest_date;
      //IOS Add
      this.dsaData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');

    }
    this.userId = localStorage.getItem('UID');
    this.getDashboardMo();
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
    //  this.latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    this.dsaData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    //datePicker.open();
    this.getDashboardMo();
  }

  getDashboardMo() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", {
      Flag: 'StationSubmittedStatusForMO', Id: self.userId,
      CDashdate: this.datepipe.transform(this.dsaData.selcteddate, 'dd/MMM/yyyy')
      //CDashdate : self.latest_date
    }).subscribe(
      (res: any) => {
        self.MOStaionData = JSON.parse(res).Table;
        if(self.MOStaionData != ''){
          self.UserType = self.MOStaionData[0].UserType;
          console.log(self.UserType);
          console.log(self.MOStaionData);
        }
      else{
        self.commonServices.presentToast("No Data Available.");
      }
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      }
    )
  }
}
