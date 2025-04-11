import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.page.html',
  styleUrls: ['./view-history.page.scss'],
})
export class ViewHistoryPage implements OnInit {
  listDispHistory: any;
  DispId: any;
  isItemAvailable: boolean;
  items: any;
  searchShow: boolean = false;
  searchFlag: number = 0;
  isShown: boolean = false;
  constructor( private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, private dp: DatePipe) {
    this.DispId=activatedroute.snapshot.paramMap.get('dispId');
    console.log(this.DispId);
    this. GetDispHistory();
  }

  ngOnInit() {
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
  GetDispHistory() {
    var self= this;
  self.commonServices.loadingDismiss();
    
  self.commonServices.post("CommonGetData",{Flag: 'DispenserHistory', Id: self.DispId, Status:0}).subscribe(
      (res: any) => {
        self.listDispHistory = JSON.parse(res).Table;
        if(self.listDispHistory.length > 0)
        {
          console.log(self.listDispHistory);
       self.commonServices.loadingDismiss();
        }
      },
      (error) =>{self.commonServices.presentToast('Something went wrong.');
      self.commonServices.loadingDismiss();
     }
    )

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getDispenserList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.listDispHistory.filter((item) => {
        return (item.DispenserName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }
}
