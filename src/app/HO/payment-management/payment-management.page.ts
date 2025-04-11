import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.page.html',
  styleUrls: ['./payment-management.page.scss'],
})
export class PaymentManagementPage implements OnInit {
  searchShow: boolean = false;
  searchFlag: number = 0;
  isShown: boolean = false;

  isItemAvailable = false;
  items: any;
  paymentListRe: any;
  StatusIsfalse: boolean = false;
  payStatus = '';
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController, public alertController: AlertController) {

  }

  ngOnInit() {
    // this.getPayementList();
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  segmentChanged(value) {
    console.log(value);
    if (value.detail.value == 'Active') {
      this.payStatus = '1';
    }
    else if (value.detail.value == 'All') {
      this.payStatus = '';
    }
    else if (value.detail.value == 'InActive') {
      this.payStatus = '0';
    }
    this.getPayementList();
  }
  ionViewWillEnter() {
    this.getPayementList();
  }
  getPayementList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("getPaymentMode", { status: self.payStatus })
      .subscribe((res: any) => {
        var paymentRes = JSON.parse(res);
        self.paymentListRe = paymentRes.Table;
        console.log(self.paymentListRe);
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast('Something went wrong.');
          self.commonServices.loadingDismiss();
        })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getPayementList();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.items = this.paymentListRe;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.paymentListRe.filter((item) => {
        return (item.PaymentMode.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }

  goToaddDispenser() {
    this.router.navigate(['add-update-payment-mgt', { pageFlag: "addds" }]);
  }

  goToupdatePayment(item) {
    this.router.navigate(['add-update-payment-mgt', { paymentObj: JSON.stringify(item), pageFlag: "updateds" }]);
  }

  async payDelete(PaymentModeId) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure want to delete this payment mode ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.paymentDelete(PaymentModeId);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  paymentDelete(PaymentModeId) {
    var self = this;
    
    self.commonServices.loadingPresent();
    self.commonServices.post("DeletePaymentMode", { PaymentModeId: PaymentModeId }).subscribe((res: any) => {
      const disRes = JSON.parse(res);
      if (disRes.Table[0].Msg == "PaymentMode deleted successfully.") {
        self.commonServices.presentToast(disRes.Table[0].Msg);
      }
      this.getPayementList();
      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })
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
    console.log(this.payStatus);
    this.commonServices.post("getAllDetails_CSV", { Status: this.payStatus, PageFlag:'PaymentManagement' }).subscribe(
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