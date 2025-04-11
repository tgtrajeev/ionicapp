import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { Events } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userData: any = '';
  public appPages = [
    {
      title: 'Home', url: '/home', icon: 'home'
    },
    {
      title: 'cr-review', url: '/cr-review', icon: 'checkbox-outline'
    },
    {
      title: 'login', url: '/login', icon: 'log-in'
    },
    {
      title: 'Entry DSA', url: '/login', icon: 'log-in'
    },
    {
      title: 'Meter Skid', url: '/meter-skid', icon: 'log-in'
    },
    {
      title: 'Package', url: '/package', icon: 'log-in'
    },
    {
      title: 'Dispenser', url: '/login', icon: 'log-in'
    },
    {
      title: 'LCV', url: '/login', icon: 'log-in'
    },
    {
      title: 'Gas Genset', url: '/login', icon: 'log-in'
    },
    {
      title: 'Genral Entry', url: '/login', icon: 'log-in'
    },
    {
      title: 'DPR Station Summary', url: '/login', icon: 'log-in'
    }

  ];
  IssueLoglength: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    public events: Events, public commonServices: ApiService,
    private file: File, private fileOpener: FileOpener,
    private transfer: FileTransfer, private document: DocumentViewer) {
    this.initializeApp();
    events.subscribe('user:created', (user) => {
      console.log('Welcome', user, 'at');
      console.log("EvENt");

      this.userData = user[0];
    });
    this.userData = JSON.parse(localStorage.getItem('userDataR'));
    console.log('userDataR', JSON.parse(localStorage.getItem('userDataR')));
    console.log('userDataR', this.userData);
    console.log('App component');
    this.IssueLoglength = localStorage.getItem('IssueLoglength');
  }
  ngOnInit() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.statusBar.backgroundColorByName('yellow');  //this will set background color of status bar
      this.statusBar.backgroundColorByHexString('#006c3b');
    });
  }


  async ConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Log Out!',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Log Out',
          handler: () => {
            this.logout();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.router.navigate(['/login']);
    this.menuCtrl.enable(false);
    localStorage.clear();
  }

  helpsection() {
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }
    console.log(this.commonServices.apiImageAttachment);
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("helpsection", {
    }).subscribe((res: any) => {
      console.log(res);
      const data = JSON.parse(res.toString());
      console.log(data);

      if (data != "File Not Found") {
        var filename = data.split('/');
        if (filename != '') {
          var apiUrl = this.commonServices.apiImageAttachment;
          if (data != '' || data != null) {
            // setTimeout(() => { window.open(apiUrl + '/' + data, '_blank'); }, 20);
            const transfer = this.transfer.create();
            transfer.download(apiUrl + '/' + data, path + 'IGLhelp.pdf').then(entry => {
              let url = entry.toURL();
              self.commonServices.loadingDismiss();
              if (this.platform.is('ios')) {
                this.document.viewDocument(url, 'application/pdf', {});
              } else {
                this.fileOpener.open(url, 'application/pdf');
              }
            });
          }
          else {
            console.log('Scorecard PDF Failed Case', data);
            console.log(filename);
            self.commonServices.loadingDismiss();
          }
        }
      }
      else {
        self.commonServices.presentToast(data);
        self.commonServices.loadingDismiss();
      }
    },
      () => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })
    this.menuCtrl.enable(false);
  }

  stationProfile() {
    this.menuCtrl.enable(false);
    this.router.navigate(['/profile-station']);
  }

  notificationRedirect() {
    this.menuCtrl.enable(false);
    this.router.navigate(['notification']);
  }

  issueLogRedirect() {
    this.menuCtrl.enable(false);
    this.router.navigate(['issue-log']);
  }
  
  resetPassword(flag) {
    this.menuCtrl.enable(false);
    this.router.navigate(['notification', { Flag: flag }]);
  }

  homeStation() {
    this.menuCtrl.enable(false);
    this.router.navigate(['/home']);
  }

  homeSection() {
    this.menuCtrl.enable(false);
    if (this.userData.DepartmentCode == 'HO') {
      this.router.navigate(['/admin-home']);
    } else if (this.userData.DepartmentCode == 'MO') {
      this.router.navigate(['/mo-dashboard']);
    } else if (this.userData.DepartmentCode == 'CO') {
      this.router.navigate(['/co-dashboard']);
    } else if (this.userData.DepartmentCode == 'SOP') {
      this.router.navigate(['/so-dashboard']);
    }
  }
}
