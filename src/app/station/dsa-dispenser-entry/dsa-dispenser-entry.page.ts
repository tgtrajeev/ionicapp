import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JumpReadingPopPage } from '../../jump-reading-pop/jump-reading-pop.page';

@Component({
  selector: 'app-dsa-dispenser-entry',
  templateUrl: './dsa-dispenser-entry.page.html',
  styleUrls: ['./dsa-dispenser-entry.page.scss'],
})
export class DsaDispenserEntryPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async jumpReadingPop() {
    const modal = await this.modalCtrl.create({
      component: JumpReadingPopPage,
    });
    return await modal.present();
  }

}
