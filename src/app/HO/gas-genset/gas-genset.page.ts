import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-gas-genset',
  templateUrl: './gas-genset.page.html',
  styleUrls: ['./gas-genset.page.scss'],
})
export class GasGensetPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  GasList: any;
  StatusIsfalse: boolean = false;
  DSStatus = '';
  exportList: any[];
  currentdate: string;
  currDate: string;
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) {
    this.currentdate = new Date().toISOString().split('T')[0];
    this.currDate = this.currentdate;
    console.log(this.currDate)
   }

  ngOnInit() {
    this.getGassetList();
  }

  segmentChanged(value) {
    console.log(value);
    if (value.detail.value == 'Active') {
      this.DSStatus = '0';
    }
    else if (value.detail.value == 'All') {
      this.DSStatus = '';
    }
    else if (value.detail.value == 'InActive') {
      this.DSStatus = '1';
    }
    this.getGassetList();
  }

  getGassetList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetGensetMaster", { Flag: 'AlluserDetsils', Status: self.DSStatus }).subscribe((res: any) => {
      var gassetRes = JSON.parse(res);
      if (gassetRes != "" && gassetRes != undefined && gassetRes != null) {
        self.GasList = gassetRes.Table;
        console.log(self.GasList);
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

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
  }

  goToaddGset() {
    this.router.navigate(['add-update-gas-genset', { pageFlag: "addpage" }]);
  }

  goToUpdateGset(item) {
    this.router.navigate(['add-update-gas-genset', { gsetlist: JSON.stringify(item), pageFlag: "updatepage" }]);
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
    // this.getGassetList();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.GasList.filter((item) => {
        return (item.GasGenSetName.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
      console.log(this.items);
    }
  }


  exportFile(){
    this.commonServices.post("getAllDetails_CSV", {status:this.DSStatus,PageFlag:'GasGenset'}).subscribe(
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
