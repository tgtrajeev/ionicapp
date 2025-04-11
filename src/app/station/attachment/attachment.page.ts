import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.page.html',
  styleUrls: ['./attachment.page.scss'],
})
export class AttachmentPage implements OnInit {

  constructor(private router: Router, private menu: MenuController) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  attachDsaRedirect() {
    this.router.navigateByUrl('attachment-dsa');
  }

  attachDprRedirect() {
    this.router.navigateByUrl('attachment-dpr');
  }
  jumpReadingRedirect()
  {
    this.router.navigate(['jump-reading-system']);
  }
}
