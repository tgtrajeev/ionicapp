import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-so-dashboard',
  templateUrl: './so-dashboard.page.html',
  styleUrls: ['./so-dashboard.page.scss'],
})
export class SoDashboardPage implements OnInit {
  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  DPREntryDateTime: any;
  constructor(private menu: MenuController,private router: Router,private dp: DatePipe) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.geteDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
      this.geteDate.selcteddate = latest_date;
      this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
      //this.geteDate.selcteddate=this.DPREntryDateTime;
      
      localStorage.setItem("SummeryDate", this.geteDate.selcteddate);  
   }
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

  gotoredirectEntryDsa(){
    this.router.navigate(['dsa-entry',{flag:'dsaEntry'}]);
  }

  gotoredirectDsaSummary(){
    this.router.navigate(['dsa-summary', {flag:'dsaStationSummary'}]);
  }
}