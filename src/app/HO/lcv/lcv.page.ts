import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-lcv',
  templateUrl: './lcv.page.html',
  styleUrls: ['./lcv.page.scss'],
})
export class LcvPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  LcvList: any;
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
    this.getLcvList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
  }

  segmentChanged(value) {
    console.log(value);
    if (value.detail.value == 'swthActive') {
      this.DSStatus = '0';
    }
    else if (value.detail.value == 'swthAll') {
      this.DSStatus = '';
    }
    else if (value.detail.value == 'swthInActive') {
      this.DSStatus = '1';
    }
    this.getLcvList();
  }
  getLcvList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetLcvMaster", { Status: self.DSStatus }).subscribe((res: any) => {
      var lcvRes = JSON.parse(res);
      if (lcvRes != "" && lcvRes != undefined && lcvRes != null) {
        self.LcvList = lcvRes.Table;
        console.log(self.LcvList);
      }
      else {
        self.commonServices.presentToast("Something went wrong.");
      }
      self.commonServices.loadingDismiss();
    },
    (error) => {
      self.commonServices.presentToast("Something went wrong.");
      self.commonServices.loadingDismiss();
    })
  }

  goToaddLcv() {
    this.router.navigate(['add-update-lcv', { pageFlag: "addlcv" }]);
  }

  goToUpdateLcv(item) {
    this.router.navigate(['add-update-lcv', { lcvlist: JSON.stringify(item), pageFlag: "updatelcv" }]);
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

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getLcvList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.LcvList.filter((item) => {
        return (item.LcvName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }

  exportFile(){
    this.commonServices.post("getAllDetails_CSV", {status:this.DSStatus,PageFlag:'LCV'}).subscribe(
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
