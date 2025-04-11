import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  getListRes: any;
  StatusIsfalse: boolean = false;
  DSStatus = '';
  filter: any ='';
  exportList: any[];
  currentdate: string;
  currDate: string;
  csvData: BlobPart;
  saveData: any[];

  constructor(private router: Router,public commonServices: ApiService, private menu: MenuController, ) {
    this.currentdate = new Date().toISOString().split('T')[0];
    this.currDate = this.currentdate;
    console.log(this.currDate);
  }

  ngOnInit() {
    const dt = new Date();
    this.getList();
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
    this.getList();
  }

  getList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'AlluserDetsils', Id: 0, Status: self.DSStatus }).subscribe((res: any) => {
      var listRes = JSON.parse(res);
      console.log(listRes);
      if (listRes != "" && listRes != undefined && listRes != null) {
        self.getListRes = listRes.Table;
        
        console.log(self.getListRes);
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

  goToadd() {
    this.router.navigate(['add-update-user', { itemList: '', pageFlag: "addpage" }]);
  }

  goToUpdate(item) {
    console.log(item);
    if(item.Name == 'Administrator'){
      this.commonServices.presentToast("Administrator login details cant be update/change.");
    }
    else{
      this.router.navigate(['add-update-user', { itemList: JSON.stringify(item), pageFlag: "updatepage" }]);
    }
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
    // this.getList();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.getListRes.filter((item) => {
        return (item.LoginId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }
  

  exportFile(){
    this.commonServices.post("getAllDetails_CSV", {Flag: "AlluserDetsils", Id: '0', Status:this.DSStatus, PageFlag:'UsersManagement'}).subscribe(
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
