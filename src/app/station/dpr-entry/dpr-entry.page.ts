import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dpr-entry',
  templateUrl: './dpr-entry.page.html',
  styleUrls: ['./dpr-entry.page.scss'],
})
export class DprEntryPage implements OnInit {

  constructor(private router: Router,private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  meterSkidRedirect() 
  {
    this.router.navigateByUrl('meter-skid');
  }
  
  packageRedirect()
  {
    this.router.navigateByUrl('package');
  }
  dispenserRedirect()
  {
    this.router.navigateByUrl('dispenser');
  }
  lcvRedirect()
  {
    this.router.navigateByUrl('lcv');
  }
  gasGensetRedirect()
  {
    this.router.navigateByUrl('gas-genset');
  }
  genralEntryRedirect()
  {
    this.router.navigateByUrl('genral-entry');
  }
  dprSummaryRedirect()
  {
    this.router.navigateByUrl('dpr-summary');
  }
}
