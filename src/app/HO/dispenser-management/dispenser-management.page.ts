import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-dispenser-management',
  templateUrl: './dispenser-management.page.html',
  styleUrls: ['./dispenser-management.page.scss'],
})
export class DispenserManagementPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isShown: boolean = false;

  isItemAvailable = false;
  items: any;
  DispenserResList: any;
  StatusIsfalse: boolean = false;
  DSStatus = '';
  exportList: any[];
  currentdate: string;
  currDate: string;
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) {
    this.currentdate = new Date().toISOString().split('T')[0];
    this.currDate = this.currentdate;
    console.log(this.currDate);
  }

  ngOnInit() {
    this.getDispenserList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
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
    this.getDispenserList();
  }

  getDispenserList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'DispenserList', Status: self.DSStatus })
    .subscribe((res: any) => {
      var DispenserRes = JSON.parse(res);
      self.DispenserResList = DispenserRes.Table;
      console.log(self.DispenserResList);
      self.commonServices.loadingDismiss();
    },
    (error) => {
      self.commonServices.presentToast('Something went wrong.');
      self.commonServices.loadingDismiss();
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getDispenserList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.DispenserResList.filter((item) => {
        return (item.DispenserName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }

  goToaddDispenser() {
    this.router.navigate(['add-update-dispenser-mgt', { pageFlag: "addds" }]);
  }

  goToupdateDispenser(item) {
    this.router.navigate(['add-update-dispenser-mgt', { dispId: item, pageFlag: "updateds" }]);
  }

  viewHistory(id) {
    this.router.navigate(['view-history', { dispId: id }]);
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

  exportFile(){
    this.commonServices.post("getAllDetails_CSV", {Flag: "DispenserList", PageFlag:'DispenserMaster', Status:this.DSStatus, }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        // console.log(data);
        if (data.FileName != '') {
        //  alert('file name');
          if (JSON.parse(resp).errMsg == 'success') {
            // alert('inneer sucess');
            window.location.href = this.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
            this.commonServices.loadingDismiss();
            
          }
          else {
            this.commonServices.presentToast(JSON.parse(resp).errMsg)
            this.commonServices.loadingDismiss();
          }
        }
        else {
          this.commonServices.presentToast('No Report Data Found');
          this.commonServices.loadingDismiss();

        }

  },
  (error) => {
    this.commonServices.presentToast('Something went wrong.');
    this.commonServices.loadingDismiss();

  })
 }

}
