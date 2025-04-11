import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dsa-summary-preview-modal',
  templateUrl: './dsa-summary-preview-modal.page.html',
  styleUrls: ['./dsa-summary-preview-modal.page.scss'],
})
export class DsaSummaryPreviewModalPage implements OnInit {
  imgURL: any;
  constructor(public modalController: ModalController) {
    this.imgURL = localStorage.getItem('imgURL');
    console.log("imagepath", this.imgURL)
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
