import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detail-popup-package',
  templateUrl: './add-detail-popup-package.page.html',
  styleUrls: ['./add-detail-popup-package.page.scss'],
})
export class AddDetailPopupPackagePage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
