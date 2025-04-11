import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dsa-sorting',
  templateUrl: './dsa-sorting.page.html',
  styleUrls: ['./dsa-sorting.page.scss'],
})
export class DsaSortingPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuDsaSorting');
    this.menu.open('menuDsaSorting');
  }

}
