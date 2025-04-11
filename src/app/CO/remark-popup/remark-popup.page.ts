import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-remark-popup',
  templateUrl: './remark-popup.page.html',
  styleUrls: ['./remark-popup.page.scss'],
})
export class RemarkPopupPage implements OnInit {
  LoginId: any;
  ControlRoomCode: any;
  DPREntryDate: any;
  remark: any = '';
  constructor(public modalController: ModalController, public navParams: NavParams, public commonServices: ApiService) {
    this.LoginId = navParams.get('LoginId');
    this.ControlRoomCode = navParams.get('ControlRoomCode');
    this.DPREntryDate = navParams.get('DPREntryDate');
  }

  ngOnInit() {
  }
  dismiss(typeDismiss) {
    this.modalController.dismiss({
      'dismissed': true,
      typeDismis: typeDismiss,
    });
  }
  remarkVal(event) {
    this.remark = event.detail.value;
    console.log(this.remark);
  }

  saveRemark() {
    if (this.remark == '') {
      this.commonServices.presentToast('Please add remark')
    } else {
      this.commonServices.loadingPresent();
      this.commonServices.postwithservice("SendToHO",
        {
          LoginId: this.LoginId,
          ControlRoomCode: this.ControlRoomCode,
          Remark: this.remark,
          DPREntryDate: this.DPREntryDate
        }).subscribe(
          (response: any) => {
            console.log(response, "SummaryData");

            console.log(response);
            const data = response;
            console.log(data);
            if (data.Status == '1') {
              this.commonServices.presentToast('Status forwarded to H.O.');
              this.commonServices.loadingDismiss();
              this.dismiss(1);
            }
            else {
              this.commonServices.presentToast('Status couldn\'t be sent to H.O.');
              this.commonServices.loadingDismiss();
            }
          },
          (error) => {
            this.commonServices.presentToast('Something went wrong.');
            this.commonServices.loadingDismiss();
          });
    }
  }
}
