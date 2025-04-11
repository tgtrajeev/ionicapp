import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-mo-management',
  templateUrl: './mo-management.page.html',
  styleUrls: ['./mo-management.page.scss'],
})
export class MOManagementPage implements OnInit {
  isShown: boolean = false;
  isItemAvailable = false;
  items: any;
  MoList: any;
  searchShow: boolean = false;
  searchFlag: number = 0;
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
    this.getMoList();
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
  getMoList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'MOList', Id: '0', Status: self.DSStatus }).subscribe((res: any) => {
      var MoRes = JSON.parse(res);
      self.MoList = MoRes.Table;
      console.log(self.MoList);
      self.commonServices.loadingDismiss();
    },
    (error) => {
      self.commonServices.presentToast("Something went wrong.");
      self.commonServices.loadingDismiss();
    })
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
    this.getMoList();
  }



  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getMoList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.MoList.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }

  goToAddMo() {
    this.router.navigate(['/add-update-mo-managment', { pageFlag: "addmo" }]);
  }
  goToupdateMo(item) {
    this.router.navigate(['/add-update-mo-managment', { arrayItem: JSON.stringify(item), pageFlag: "updatemo" }])

  }

  exportFile(){
    this.commonServices.post("getAllDetails_CSV", { Flag: 'MOList', PageFlag:'Mom', Status: this.DSStatus}).subscribe(
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
