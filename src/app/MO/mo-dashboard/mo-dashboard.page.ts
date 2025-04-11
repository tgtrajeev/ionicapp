import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mo-dashboard',
  templateUrl: './mo-dashboard.page.html',
  styleUrls: ['./mo-dashboard.page.scss'],
})
export class MoDashboardPage implements OnInit {

  constructor(private router:Router,private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }
  dashboardDSARedirect()
  {
    // this.router.navigateByUrl('dashboard-dsa');
    this.router.navigateByUrl('dashboard-mo');
  };
  reportDSARedirect()
  {
    this.router.navigate(['dsa-report-mgt']);
    //this.router.navigateByUrl('report-dsa');
  }
  stnDetailRedirect()
  {
    this.router.navigateByUrl('mostation-detail');
  }
  dsmMgtRedirect()
  {
    this.router.navigateByUrl('modsm-management');
  };
  attachDsaRedirect() 
  {
    this.router.navigateByUrl('attachment-dsa');
  }
  jumpReadingRedirect()
  {
    this.router.navigate(['jump-reading-system']);
  }
}
