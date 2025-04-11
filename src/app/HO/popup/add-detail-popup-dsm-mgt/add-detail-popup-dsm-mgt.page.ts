import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-dsm-mgt',
  templateUrl: './add-detail-popup-dsm-mgt.page.html',
  styleUrls: ['./add-detail-popup-dsm-mgt.page.scss'],
})
export class AddDetailPopupDsmMgtPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
