import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dispenser-entry',
  templateUrl: './dispenser-entry.page.html',
  styleUrls: ['./dispenser-entry.page.scss'],
})
export class DispenserEntryPage implements OnInit {

  constructor(private router:Router,private menu: MenuController) { }

  ngOnInit() {
    
  }
  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }
  dispEntryDsaRedirect() 
  {
    this.router.navigateByUrl('dsa-dispenser-entry');
  }
  dispEntryDprRedirect() 
  {
    this.router.navigateByUrl('dpr-dispenser-entry');
  }

}
