import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  isShown: boolean = false ;
  constructor(private router: Router,private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
  }

  showhidemastermenu()
  {
    this.isShown = ! this.isShown;

  }
  dashboradRedirect() {
    this.router.navigateByUrl('dashboard');
  };
  regionMgtRedirect() {
    this.router.navigateByUrl('region-mgt');
  };
  controlOfficeRedirect() {
    this.router.navigateByUrl('control-office');
  };
  moMgtRedirect()
  {
    this.router.navigateByUrl('mo-management');
  };
  stationMgtRedirect()
  {
    this.router.navigateByUrl('station-management');
  };
  dispenserMgtRedirect()
  {
    this.router.navigateByUrl('dispenser-management');
  };
  dsmMgtRedirect()
  {
    this.router.navigateByUrl('dsm-management');
  };
  meterSkidRedirect()
  {
    this.router.navigateByUrl('meter-skid1');
  }
  packageRedirect()
  {
    this.router.navigateByUrl('package1');
  }
  lcvRedirect()
  {
    this.router.navigateByUrl('lcv1');
  }
  gasGensetRedirect()
  {
    this.router.navigateByUrl('gas-genset1');
  }
  rateMgtRedirect()
  {
    this.router.navigateByUrl('rate-management');
  }
  userMgtRedirect()
  {
    this.router.navigateByUrl('user-management');
  }
  reportRedirect()
  {
    this.router.navigateByUrl('report');
  }
  paymentManagement(){
    this.router.navigateByUrl('payment-management');
  }
  summaryDsaRedirect()
  {
    this.router.navigateByUrl('summary-dsa');
  }
  summaryDSAReport()
  {
    this.router.navigateByUrl('summary-dsareport');
  }
  dprRejectStnRedirect()
  {
    this.router.navigateByUrl('reject-station-dpr');
  }
  jumpReadingRedirect()
  {
    this.router.navigate(['jump-reading-system']);
  }
  entryThreshold(){
    this.router.navigate(['entry-threshhold']);
  }
}
