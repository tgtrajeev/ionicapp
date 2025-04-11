import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rate-management',
  templateUrl: './rate-management.page.html',
  styleUrls: ['./rate-management.page.scss'],
})
export class RateManagementPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  isItemAvailable = false;
  items: any;
  Ratelist: any;
  StatusIsfalse: boolean = false;

  date: Date;

  searchText: string = '';
  MinDate: string = '';
  SelectedRateId: string = '';
  RateId: string = '';
  RateRegionId: string = '';
  UserId: string = '';
  NormalRate: string = '0.00';
  DisountedRate: string = '0.00';
  EffectiveDate: string;
  Cdate = '';
  dataRegionMaster: {}[];
  errorFound: boolean;
  actionFlag: string;
  RateTime: string = '';

  DS: boolean = true;
  ActiveStatus: string = '';
  PreTableIsfalse: boolean = true;
  PrevBtnText: string = 'Show Previous';
  Status = true;

  tableHeight: boolean = true;

  title: string;
  key: string = 'Name';
  reverse: boolean = true;
  filter: string = '';
  exportList: any = [];
  uId: string = "";
  sortingColumn: string = "";
  CDate: string;
  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  editmode: boolean = true;
  minDateRate: any = new Date().toISOString();
  maxDaterate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toISOString();
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) { }
  ngOnInit() {
    this.UserId = localStorage.getItem('UID');
    this.getRateList();
  }

  getRateList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'RateList', Id: '0' }).subscribe((res: any) => {
      var RateRes = JSON.parse(res);
      if (RateRes != "" && RateRes != undefined && RateRes != null) {
        self.Ratelist = RateRes.Table;
        console.table(self.Ratelist);
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
    this.menu.open('menuCO');
  }

  // goToadd() {
  //   this.router.navigate(['add-update-rate-mgt', { pageFlag: "addpage" }]);
  // }

  // goToUpdate(item) {
  //   this.router.navigate(['add-update-rate-mgt', { RateId: JSON.stringify(item), pageFlag: "updatepage" }]);
  // }
  onTimeSelect(eve) {
    this.RateTime = eve.target.value;
  }
  OnDateChnage(val) {
    this.EffectiveDate = new Date(val.target.value).toLocaleDateString()
  }
  saveRate(rateId, regionId, effectiveDate, normalRate, discountRate, displayRate) {
    var self = this;
    this.errorFound = true;
    if (this.ValidationRate()) {

      // const obj = {
      //   RateId: rateId,
      //   RegionId: regionId,
      //   NormalRate: this.NormalRate != '0.00' ? this.NormalRate : normalRate,
      //   DisountedRate: this.DisountedRate != '0.00' ? this.DisountedRate : discountRate,
      //   EffectiveDate: effectiveDate,
      //   UserId: this.UserId,
      //   EffectiveTime: this.RateTime != '' ? this.RateTime : displayRate
      // };
      const obj = {
        RateId: rateId,
        RegionId: regionId,
        NormalRate: this.NormalRate,
        DisountedRate: this.DisountedRate,
        EffectiveDate: effectiveDate,
        UserId: this.UserId,
        EffectiveTime: this.RateTime != '' ? this.RateTime : displayRate
      };
      this.commonServices.loadingPresent();
      self.commonServices.post("RateMaster", obj).subscribe((resp: any) => {
        const data = JSON.parse(resp);
        this.getRateList();
        if (data.Table[0].Meaasge.indexOf('successfully') > -1) {

          this.date = new Date(this.Cdate);
        }
        self.commonServices.presentToast(data.Table[0].Meaasge);
        this.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      )
    }
  }

  ValidationRate() {
    var self = this;
    const decimal = /^[-+]?[0-9]+\.[0-9]+$/;
    if (this.NormalRate != '' || Number(this.NormalRate) == 0) {
      if (!isNaN(parseFloat(this.NormalRate))) {
        if (parseFloat(this.NormalRate) <= 0) {
          self.commonServices.presentToast('Rate must be greater then zero');
          this.errorFound = false;
        }
      }
      else {
        self.commonServices.presentToast('Please enter valid Normal Rate.');
        this.errorFound = false;
      }
    }
    if (this.DisountedRate != '' || Number(this.DisountedRate) == 0) {
      if (!isNaN(parseFloat(this.DisountedRate))) {
        if (parseFloat(this.DisountedRate) <= 0) {
          self.commonServices.presentToast('Disounted Rate must be greater then zero');
          this.errorFound = false;
        }
      }
      else {
        self.commonServices.presentToast('Please enter valid Discounted Rate.');
        this.errorFound = false;
      }
    }
    if (this.DisountedRate != '' && this.NormalRate != '') {
      if (parseFloat(this.NormalRate) < parseFloat(this.DisountedRate)) {
        self.commonServices.presentToast('Normal Rate must be greater/equal than discounted rate');
        this.errorFound = false;
      }
    }
    if (this.RateTime == '' || this.RateTime == null) {
      self.commonServices.presentToast('Effective Time must be Selected.');
      this.errorFound = false;
    }
    return this.errorFound;
  }

  editmodefun(itm) {
    console.log(itm);
    this.Ratelist.forEach(element => {
      if (element.RegionName == itm.RegionName) {
        element.IsDisable = false;
      }
      else {
        element.IsDisable = true;
      }
    });
    this.NormalRate = itm.NormalRate;
    this.DisountedRate = itm.DisountedRate;
    this.RateTime = itm.DisplayTime;
    console.log(this.Ratelist, "Ratelist");
    //this.editmode = false;
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
  showPrevRedirect() {
    this.router.navigate(['/show-previous-rate-mgt']);
  }
}
