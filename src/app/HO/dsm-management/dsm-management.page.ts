import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dsm-management',
  templateUrl: './dsm-management.page.html',
  styleUrls: ['./dsm-management.page.scss'],
})
export class DsmManagementPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  DsmResList: any;
  StatusIsfalse: boolean = false;
  DSStatus = '';
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) { }

  ngOnInit() {
    this.getDsmList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
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
  segmentChanged(value) {
    console.log(value);
    if (value.detail.value == 'Active') {
      this.DSStatus = '1';
    }
    else if (value.detail.value == 'All') {
      this.DSStatus = '';
    }
    else if (value.detail.value == 'InActive') {
      this.DSStatus = '2';
    }
    this.getDsmList();
  }

  getDsmList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'DSM', Id: 0, Status: self.DSStatus }).subscribe((res: any) => {
      var DsmRes = JSON.parse(res);
      self.DsmResList = DsmRes.Table;
      console.log(self.DsmResList);
      self.commonServices.loadingDismiss();
    },
    (error) => {
      self.commonServices.presentToast("Something went wrong.");
      self.commonServices.loadingDismiss();
    })

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getDsmList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.DsmResList.filter((item) => {
        return (item.DSMName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }
  goToaddDsm() {
    this.router.navigate(['add-apdate-dsm-mgt', { pageFlag: "adddm" }]);

  }

  goToupdateDsm(item) {
    this.router.navigate(['add-apdate-dsm-mgt', { dmlist: JSON.stringify(item), pageFlag: "updatedm" }]);
  }

}
