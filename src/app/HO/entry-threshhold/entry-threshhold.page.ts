import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-entry-threshhold',
  templateUrl: './entry-threshhold.page.html',
  styleUrls: ['./entry-threshhold.page.scss'],
})
export class EntryThreshholdPage implements OnInit {
  searchShow: boolean = false;
  searchFlag: number = 0;
  isShown: boolean = false;

  isItemAvailable = false;
  items: any;
  listEntryThreshold: any = [];
  StatusIsfalse: boolean = false;
  entryThresholdStatus = '';
  constructor(private router: Router, public commonServices: ApiService,
    private menu: MenuController, public alertController: AlertController) {
  }

  ngOnInit() {
    // this.getEntryThresholdList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
  }

  segmentChanged(value) {
    console.log(value);
    if (value.detail.value == 'Active') {
      this.entryThresholdStatus = '0';
    }
    else if (value.detail.value == 'All') {
      this.entryThresholdStatus = '';
    }
    else if (value.detail.value == 'InActive') {
      this.entryThresholdStatus = '1';
    }
    this.getEntryThresholdList();
  }
  
  ionViewWillEnter() {
    this.getEntryThresholdList();
  }

  getEntryThresholdList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("getEntryThreshold", { status: self.entryThresholdStatus })
      .subscribe((res: any) => {
        var paymentRes = JSON.parse(res);

        if (paymentRes.Table.length > 0) {
          self.listEntryThreshold = paymentRes.Table;
        }
        console.log(self.listEntryThreshold);
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
          self.commonServices.loadingDismiss();
        })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getEntryThresholdList();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.items = this.listEntryThreshold;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.listEntryThreshold.filter((item) => {
        return (item.MeterType.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }

  goToAddEntryThreshold() {
    this.router.navigate(['add-update-entry-threshhold', { pageFlag: "addds" }]);
  }

  goToUpdateEntryThreshold(item) {
    this.router.navigate(['add-update-entry-threshhold', { threshholdbj: JSON.stringify(item), pageFlag: "updateds" }]);
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
}