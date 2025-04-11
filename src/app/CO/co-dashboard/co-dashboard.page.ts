import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-co-dashboard',
  templateUrl: './co-dashboard.page.html',
  styleUrls: ['./co-dashboard.page.scss'],
})
export class CoDashboardPage implements OnInit {

  constructor(private router:Router,private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  dashCORedirect()
  {
    this.router.navigate(['dashboard-co']);
  }
  reviewsCORedirect()
  {
    this.router.navigate(['reviews-co']);
  }
  dprReportRedirect()
  {
    this.router.navigate(['dpr-report-mgt']);
  }
  stnDetailRedirect()
  {
    this.router.navigateByUrl('station-detail');
  }
  jumpReadingRedirect()
  {
    this.router.navigate(['jump-reading-system']);
  }
}
