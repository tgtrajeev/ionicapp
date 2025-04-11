import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router,private menu: MenuController) { }

  ngOnInit() {
  }
  
  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO')
  }

  dashboardDSARedirect()
  {
    this.router.navigateByUrl('dashboard-dsa');
  };
  dashboardDPRRedirect()
  {
    this.router.navigateByUrl('dashboard-dpr');
  }

}
