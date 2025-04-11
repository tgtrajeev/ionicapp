import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-station',
  templateUrl: './profile-station.page.html',
  styleUrls: ['./profile-station.page.scss'],
})
export class ProfileStationPage implements OnInit {
  Uid: any = '';
  SMList: any = '';
  constructor(public commonServices: ApiService) {
    this.Uid = localStorage.getItem('UID');
  }

  ngOnInit() {
    this.profile();
  }

  profile() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'SMProfile', Id: this.Uid }).subscribe((res: any) => {
      const data = JSON.parse(res.toString()).Table;
      console.log(data);
      if (data.length > 0) {
        this.SMList = JSON.parse(res.toString()).Table;
        console.log(this.SMList, 'SMList');
      } else {
        self.commonServices.presentToast("No Data found.");
      }
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      })
  }
}