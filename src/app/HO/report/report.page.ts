import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private router:Router,private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuReport');
    this.menu.open('menuReport');
  }
  reportDSARedirect()
  {
    this.router.navigate(['dsa-report-mgt']);
  }
  reportDPRRedirect()
  {
    this.router.navigate(['dpr-report-mgt']);
  }

}
