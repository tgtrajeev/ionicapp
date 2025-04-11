import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-meter-skid-popup',
  templateUrl: './meter-skid-popup.page.html',
  styleUrls: ['./meter-skid-popup.page.scss'],
})
export class MeterSkidPopupPage implements OnInit {

  constructor(public modalController: ModalController,public navCtrl: NavController,public router:Router, private storage: Storage) { }
  

  ngOnInit() {
  }
  logout() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.storage.clear();
  //  localStorage.clear();
    this.router.navigateByUrl('/login',{ skipLocationChange: true });
    this.modalController.dismiss({
      'dismissed': true
    });
    this.storage.get('stationCode').then((val) => {
      console.log('Your stationCode is', val);
    });
    this.storage.get('employeeId').then((val) => {
      console.log('Your employeeId is', val);
    });
    this.storage.get('password').then((val) => {
      console.log('Your password is', val);
    });
    this.storage.get('globalDetail').then((val) => {
      console.log('Your globalDetail is', val);
    });
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
