import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdatePasswordPage } from '../update-password/update-password.page';
import { Router,ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
 
  searchShow: boolean = false;
  searchFlag: number = 0;
  NotificationDetails:{}[];
  NotificationDetailsMO:{}[];
  NotificationDetailsSOP:{}[];
  NotificationDetailsMOJump:{}[];
  NotificationDetailsMOPending:{}[];
  NotificationDetailsCOJump:{}[];
  NotificationDetailsCOPending:{}[];
  showHeaderTitle: string = '';
  LoginDetails: any = [];
  Cdate: any;
  userId: string;
  DepartmentCode:any;
  mailSendOTP: any;
  flag:any;

  pendingEntry:boolean = true;
  jumpEntry:boolean = false;
  Reportflag:string='PendingEntry';
  constructor(private router: Router,private activatedRoute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController,public modalController: ModalController,private dp: DatePipe) {
    this.DepartmentCode=localStorage.getItem('DepartmentCode');
  this.flag=this.activatedRoute.snapshot.paramMap.get('Flag');
  
   }

  ngOnInit() {
    var now = new Date();
    this.Cdate = this.dp.transform(now.toDateString(), 'yyyy/MM/dd');
    this.userId = localStorage.getItem('UID');
    console.log("UID",this.userId);
   
  
  if(this.flag=='reset')
  {
    this.commonServices.confirm('Are You Sure, Want to Reset Your Password ?');
    this.NotiFicationData();
  }
    else{
      this.NotiFicationData();
    }
  }

  notifiChange(value)
  {
    if (value.detail.value == 'PendingEntry') {
      this.pendingEntry = true;
    this.jumpEntry = false;
    this.Reportflag=value.detail.value;
    this.NotiFicationData();
    }
    else if (value.detail.value == 'JumpEntry') {
      this.pendingEntry = false;
      this.jumpEntry = true;
      this.Reportflag=value.detail.value;
      this.NotiFicationData();
    }
  }

  pendEntry()
  {
    this.pendingEntry = true;
    this.jumpEntry = false;
  }
  jmpEntry()
  {
    this.pendingEntry = false;
    this.jumpEntry = true;
  }

  searchCollapse() {
    if (this.searchFlag == 0) {
      this.searchShow = true;
      this.searchFlag = 1;
    }
    else {
      this.searchShow = false;
      this.searchFlag = 0;
    }
  }
  hideSearchBar() {
    this.searchShow = false;
    this.searchFlag = 0;
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: UpdatePasswordPage,
      cssClass: 'my-custom-class1',
      componentProps: {
        previewVar: true,
        notificationid:id
      }
    });
    return await modal.present();
   
  }
  // getValueCO(flagCO:string){
  //   this.Reportflag=flagCO;
  //   this.NotiFicationData();
  //   //alert(this.Reportflag + "CO");
  // }

  // getValueMO(flagMO:string){
  //   this.Reportflag=flagMO;
  //   this.NotiFicationData();
  //   //alert(this.Reportflag + "MO");
  // } 
  NotiFicationData(){
    var self= this;
    if(self.DepartmentCode=="HO")
    {
    self.commonServices.post("CommonGetData",{Flag: 'NotificationData', Id: 0}).subscribe(
      (res: any) => {
        self.NotificationDetails = JSON.parse(res).Table;
      },
      (error) => {self.commonServices.presentToast("Something went wrong.")}
    )
  }
  else if(self.DepartmentCode=="CO"){
    self.commonServices.post("CommonGetData",{Flag: 'NotificationDetailsCO', ReportFlag:this.Reportflag, Id:this.userId,CDashdate:this.Cdate}).subscribe(
      (res: any) => {
        this.NotificationDetailsCOJump=[];
        this.NotificationDetailsCOPending=[];
        if(this.Reportflag=='JumpEntry')
           this.NotificationDetailsCOJump = JSON.parse(res).Table;
        else
           this.NotificationDetailsCOPending = JSON.parse(res).Table;
           
        console.log(this.NotificationDetailsCOPending, "+", "this.Reportflag");
      },
      (error) => {self.commonServices.presentToast("Something went wrong.")}
    )
  }

  else if(self.DepartmentCode=="MO"){
    self.commonServices.post("CommonGetData",{Flag: 'NotificationDetailsMO', ReportFlag:this.Reportflag, Id:this.userId,CDashdate:this.Cdate}).subscribe(
      (res: any) => {
        this.NotificationDetailsMOJump=[];
        this.NotificationDetailsMOPending=[];
        if(this.Reportflag=='JumpEntry')
           this.NotificationDetailsMOJump=JSON.parse(res).Table;
        else
           this.NotificationDetailsMOPending=JSON.parse(res).Table;

        console.log(this.NotificationDetailsMOJump);
      },
      (error) => {this.commonServices.presentToast("Something went wrong.")}
    )
  }
  else if (self.DepartmentCode=="SOP"){
    self.commonServices.post("CommonGetData",{Flag: 'NotificationSOP', Id:self.userId,CDashdate:self.Cdate}).subscribe(
      (res: any) => {
        self.NotificationDetailsSOP = JSON.parse(res).Table;
        console.log(self.NotificationDetailsMO);
        console.log("sop")
      },
      (error) => {self.commonServices.presentToast("Something went wrong.")}
    )
  }
  else{
    self.commonServices.presentToast("No Notification available.");
  }
  }
  
  // RequestPassword(){
  //   if(this.commonServices.confirm('Are You Sure, Want to Reset Your Password ?')) {
  //   this.commonServices.post("PasswordNotification",{NotificationId:0,UserID: this.userId,Flag:'Request'}).subscribe(
  //       (res: any)=>{
  //         console.log(res);
  //         const data = JSON.parse(res);
  //         this.commonServices.presentToast(data[0].Meaasge);
  //         console.log(data);
  //         if(data[0].Meaasge == 'Reset password request send successfully.') {
  //           this.mailSendOTP = data[0].OTP;
  //           this.commonServices.presentToast(data[0].Meaasge);
  //         }
         
  //       },
  //       (error)=>{this.commonServices.presentToast('Something went wrong.');}
  //   );
  // }
  // }

  // getNotificationdataMO(){
  //   var self= this;
  //   self.commonServices.post("CommonGetData",{Flag: 'NotificationDetailsMO', Id:self.userId,CDashdate:self.Cdate}).subscribe(
  //     (res: any) => {
  //       self.NotificationDetailsMO = JSON.parse(res).Table;
  //       console.log(self.NotificationDetailsMO);
  //     },
  //     (error) => {self.commonServices.presentToast("Something went wrong.")}
  //   )
  // }

  // getNotificationdataSOP(){
  //   var self= this;
  //   self.commonServices.post("CommonGetData",{Flag: 'NotificationSOP', Id:self.userId,CDashdate:self.Cdate}).subscribe(
  //     (res: any) => {
  //       self.NotificationDetailsSOP = JSON.parse(res).Table;
  //       console.log(self.NotificationDetailsMO);
  //       console.log("sop")
  //     },
  //     (error) => {self.commonServices.presentToast("Something went wrong.")}
  //   )
  // }

 
}
