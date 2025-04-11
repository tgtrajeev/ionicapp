import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IssueLogModalPage } from '../../redirected_pages/issue-log-modal/issue-log-modal.page'; 

@Component({
  selector: 'app-issue-log-attachment',
  templateUrl: './issue-log-attachment.page.html',
  styleUrls: ['./issue-log-attachment.page.scss'],
})
export class IssueLogAttachmentPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: IssueLogModalPage,
      cssClass: 'my-custom-class1'
    });
    return await modal.present();
  }
}
