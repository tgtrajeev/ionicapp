import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-station-mgt',
  templateUrl: './add-detail-popup-station-mgt.page.html',
  styleUrls: ['./add-detail-popup-station-mgt.page.scss'],
})
export class AddDetailPopupStationMgtPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
