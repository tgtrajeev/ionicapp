import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dsa-entry-menu',
  templateUrl: './dsa-entry-menu.page.html',
  styleUrls: ['./dsa-entry-menu.page.scss'],
})
export class DsaEntryMenuPage implements OnInit {

  constructor(private router: Router,private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }
  dsaEntryRedirect()
  {
    this.router.navigateByUrl('dsa-entry');
  }
}
