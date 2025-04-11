
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-co',
  templateUrl: './dashboard-co.page.html',
  styleUrls: ['./dashboard-co.page.scss'],
})

export class DashboardCOPage implements OnInit {
  LoginId: any;
  datashnoardcoRes: any;
  dashboardData: any[] = [];
  stationCode: any;
  isShown: boolean = false; // hidden by default
  stationname: any;

  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) {
    this.LoginId = localStorage.getItem('Loginidd');
    this.getDashoardCo();
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  getDashoardCo() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetDashBoardCO", { LoginId: self.LoginId }).subscribe((res: any) => {
      const data = JSON.parse(res);
      this.commonServices.loadingDismiss();

      console.log(data);
      if (data != '') {
        const data2 = data;
        console.log(data2);
        this.commonServices.loadingDismiss();

        if (data2.Table.length > 0) {
          self.datashnoardcoRes = data2.Table;
          console.log(self.datashnoardcoRes);
          this.dashboardData = this.datashnoardcoRes;
        }
        else {
          self.commonServices.presentToast('No data available.');
          this.commonServices.loadingDismiss();
        }
      } else {
        self.commonServices.presentToast('No data available. Please try again.');
        this.commonServices.loadingDismiss();
      }
    },
      (error) => {
        this.commonServices.loadingDismiss();
        self.commonServices.presentToast('Something went wrong.');
      }
    );
  }

  showStationCode(stname) {
    var item = this.dashboardData.filter(item => item.StationName === stname);
    console.log("station code", item);
    this.stationCode = item[0].StationCode;
    this.stationname = item[0].StationName;
    this.isShown = !this.isShown;
  }
}