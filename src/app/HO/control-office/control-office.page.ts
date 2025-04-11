import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-control-office',
  templateUrl: './control-office.page.html',
  styleUrls: ['./control-office.page.scss'],
})
export class ControlOfficePage implements OnInit {
  isShown: boolean = false;
  controlofficeList: any;
  isItemAvailable = false;
  items: any;
  searchShow: boolean = false;
  searchFlag: number = 0;

  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) { }

  ngOnInit() {
    this.getControlOfficeList()
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


  getControlOfficeList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("getCRooms", {}).subscribe((res: any) => {
      var controlofficeRes = JSON.parse(res);
      self.controlofficeList = controlofficeRes.Table;
      console.log(self.controlofficeList);
      self.commonServices.loadingDismiss();
    },
    (error) => {
      self.commonServices.presentToast("Something went wrong.");
      self.commonServices.loadingDismiss();
    })

  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getControlOfficeList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.controlofficeList.filter((item) => {
        return (item.ControlRoomName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }

  goToControlOfficeUpdate(item) {
    this.router.navigate(['/add-update-controloffice', { itemList: JSON.stringify(item), pageFlag: "updatecontroloffice" }])
  }
  goToAddControlOffice() {
    this.router.navigate(['/add-update-controloffice', { pageFlag: "addcontroloffice" }])
  }
}
