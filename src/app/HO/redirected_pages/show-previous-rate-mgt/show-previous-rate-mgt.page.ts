import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-show-previous-rate-mgt',
  templateUrl: './show-previous-rate-mgt.page.html',
  styleUrls: ['./show-previous-rate-mgt.page.scss'],
})
export class ShowPreviousRateMgtPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  Ratelist: any;
  StatusIsfalse: boolean = false;
  constructor(private router: Router, public commonServices: ApiService) { }
  ngOnInit() {
    this.getRateList();
  }

  homeRedirect()
  {
    this.router.navigate(['admin-home']);
  }

  getRateList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'RateList', Id: '0' }).subscribe((res: any) => {
      var RateRes = JSON.parse(res);
      if (RateRes != "" && RateRes != undefined && RateRes != null) {
        self.Ratelist = RateRes.Table1;
        console.log(self.Ratelist);
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

  showMessage() {
    this.commonServices.presentToast('You cannot modify this rate.');
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
    // this.getRateList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.Ratelist.filter((item) => {
        return (item.RegionName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }
}
