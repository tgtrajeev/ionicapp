import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dsa-entry-detail',
  templateUrl: './dsa-entry-detail.page.html',
  styleUrls: ['./dsa-entry-detail.page.scss'],
})
export class DsaEntryDetailPage implements OnInit {
  SummeryDate: any;
  UserId: any;
  StationId: any;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private menu: MenuController) {
    this.UserId = activatedroute.snapshot.paramMap.get('UserId');
    this.StationId = activatedroute.snapshot.paramMap.get('StationId');
    this.SummeryDate = activatedroute.snapshot.paramMap.get('SummeryDate');
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  paymentRedirect() {
    this.router.navigate(['payment-collection']);
  }
  otrSalesRedirect() {
    this.router.navigate(['other-sales']);
  }
  bankDepositeRedirect() {
    this.router.navigate(['bank-deposite']);
  }
  dsaSummaryRedirect() {
    this.router.navigateByUrl('dsa-summary');
  }
}
