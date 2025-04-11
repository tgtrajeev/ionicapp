import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-lcv',
  templateUrl: './add-detail-popup-lcv.page.html',
  styleUrls: ['./add-detail-popup-lcv.page.scss'],
})
export class AddDetailPopupLcvPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
