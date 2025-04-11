import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-region-mgt',
  templateUrl: './add-detail-popup-region-mgt.page.html',
  styleUrls: ['./add-detail-popup-region-mgt.page.scss'],
})
export class AddDetailPopupRegionMgtPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
