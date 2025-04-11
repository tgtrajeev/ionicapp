import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-region-mgt',
  templateUrl: './region-mgt.page.html',
  styleUrls: ['./region-mgt.page.scss'],
})
export class RegionMgtPage implements OnInit {
  isShown: boolean = false;
  regionList: any;
  isItemAvailable = false;
  items: any;
  emptyArray: any[] = [];
  searchShow: boolean = false;
  searchFlag: number = 0;
  DSStatus = '';

  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) {
  }

  ngOnInit() {
    this.getRegionList();
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


  getRegionList() {
    var self = this;
    var RegionListReq = { Flag: "Region", Id: "0", status: self.DSStatus }
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", RegionListReq).subscribe((res: any) => {
      var regionRes = JSON.parse(res);
      self.regionList = regionRes.Table;
      console.log(self.regionList);
      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })

  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getRegionList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.regionList.filter((item) => {
        return (item.RegionName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

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
    this.getRegionList();
  }

  goToRegionUpdate(item) {
    this.router.navigate(['/add-detail-regionmgt', { regionlist: JSON.stringify(item), pageName: "updatepage" }])
  }

  goToRegionAdd() {
    var regionid = "";
    this.router.navigate(['/add-detail-regionmgt', { pageName: "addpage" }])
  }
}