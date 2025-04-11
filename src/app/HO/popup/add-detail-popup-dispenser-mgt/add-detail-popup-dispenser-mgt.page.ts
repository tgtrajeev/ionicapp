import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-dispenser-mgt',
  templateUrl: './add-detail-popup-dispenser-mgt.page.html',
  styleUrls: ['./add-detail-popup-dispenser-mgt.page.scss'],
})
export class AddDetailPopupDispenserMgtPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
