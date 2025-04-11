import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-dpr-sorting',
  templateUrl: './dpr-sorting.page.html',
  styleUrls: ['./dpr-sorting.page.scss'],
})
export class DprSortingPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'menuDprSorting');
    this.menu.open('menuDprSorting');
  }

}
