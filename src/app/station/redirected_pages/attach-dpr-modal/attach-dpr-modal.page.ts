import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-attach-dpr-modal',
  templateUrl: './attach-dpr-modal.page.html',
  styleUrls: ['./attach-dpr-modal.page.scss'],
})
export class AttachDprModalPage implements OnInit {

  uploadVar:boolean = false;
  previewVar:boolean = false;
  @Input() viewattachment :string;
  heading:string;
  imgURL: string;
  constructor(public modalController: ModalController,private navParams: NavParams,public commonServices: ApiService) {
    console.log(JSON.stringify(navParams.get('viewattachment')));
    this.imgURL = this.commonServices.apiImageAttachment + '/Attachments'+ navParams.get('viewattachment');
   }

  ngOnInit() {
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
