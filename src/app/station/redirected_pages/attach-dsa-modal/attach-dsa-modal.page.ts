import { Component, OnInit,Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-attach-dsa-modal',
  templateUrl: './attach-dsa-modal.page.html',
  styleUrls: ['./attach-dsa-modal.page.scss'],
})
export class AttachDsaModalPage implements OnInit {

  uploadVar:boolean = false;
  previewVar:boolean = false;
  heading:string;
  @Input() viewattachment: string;
  imgURL:any;
  constructor(public modalController: ModalController,private navParams: NavParams,public commonServices: ApiService) { 
    console.log(JSON.stringify(navParams.get('viewattachment')));
    this.imgURL = this.commonServices.apiImageAttachment +navParams.get('viewattachment');

  }

  ngOnInit() {


  }
  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
