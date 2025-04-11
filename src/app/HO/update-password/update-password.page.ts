import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {
  errorFound: boolean;
  SelectedNotificationId: string='';
  UserPanel:boolean=false;
  NotificationDetails:{}[];
  NotificationDetailsMO:{}[];
  NotificationDetailsSOP:{}[];
  StationOTP:string='';
  StationPassword:string='';
  StationCPassword:string='';
  StationName='';
  @Input() notificationid :string;
  constructor(public modalController: ModalController,private navParams: NavParams, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    console.log(JSON.stringify(navParams.get('notificationid')));
    this.SelectedNotificationId = navParams.get('notificationid');
   }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  UpdatePassword(){
    var self= this;
    this.errorFound = true;
    if(self.ValidateData()){
      self.commonServices.post("UpdatePassword",{NotificationId:self.SelectedNotificationId,OTP:self.StationOTP,Password:self.StationCPassword}).subscribe(
        (res: any)=>{
          const data = JSON.parse(res);
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            this.SelectedNotificationId='';
            this.StationOTP='';
            this.StationPassword='';
            this.StationCPassword='';
          }
          self.commonServices.presentToast(data.Table[0].Meaasge);
        },
        (error)=>{ self.commonServices.presentToast('Something went wrong.');}
    );
    }     
  }
  ValidateData(){
    var self= this;
    if(self.StationOTP == ''){
      self.commonServices.presentToast('OTP must be entered.');
      self.errorFound = false;
    }
    else if (self.StationPassword == '' ){
      self.commonServices.presentToast('password must be entered.');
      self.errorFound = false;
    }
    else if (self.StationCPassword == ''){
      self.commonServices.presentToast('Confirm password must be entered.');
      self.errorFound = false;
    }
    else if (self.StationPassword != self.StationCPassword){
      self.commonServices.presentToast('Password did not matched.');
      self.errorFound = false;
    }
    return self.errorFound;
  }
}
