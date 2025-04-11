import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-issue-log-modal',
  templateUrl: './issue-log-modal.page.html',
  styleUrls: ['./issue-log-modal.page.scss'],
})
export class IssueLogModalPage implements OnInit {
  uploadVar:boolean = false;
  previewVar:boolean = false;
  @Input() viewattachment :string;
  heading:string;
  imgURL: string;
  constructor(public modalController: ModalController,private navParams: NavParams,public commonServices: ApiService) {
    console.log(JSON.stringify(navParams.get('viewattachment')));
    this.imgURL = navParams.get('viewattachment');
   }

  ngOnInit() {
  }
  dismiss()
  {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
