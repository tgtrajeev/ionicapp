import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.page.html',
  styleUrls: ['./sorting.page.scss'],
})
export class SortingPage implements OnInit {

  constructor(private router:Router,private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuSorting');
    this.menu.open('menuSorting');
  }

  sortingDSARedirect()
  {
    this.router.navigate(['dsa-sorting']);
  }
  sortingDPRRedirect()
  {
    this.router.navigate(['dpr-sorting']);
  }

}
