import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-detatil-popup-control-office',
  templateUrl: './add-detatil-popup-control-office.page.html',
  styleUrls: ['./add-detatil-popup-control-office.page.scss'],
})
export class AddDetatilPopupControlOfficePage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
