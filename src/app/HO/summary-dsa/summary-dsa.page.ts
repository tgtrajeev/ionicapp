import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-summary-dsa',
  templateUrl: './summary-dsa.page.html',
  styleUrls: ['./summary-dsa.page.scss'],
})
export class SummaryDsaPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'menuDsaSmry');
    this.menu.open('menuDsaSmry');
  }

}
