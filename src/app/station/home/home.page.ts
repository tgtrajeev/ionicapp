import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, "menuStn");
    this.menu.open("menuStn");
  }
  entryDispenserRedirect() {
    this.router.navigateByUrl("dpr-dispenser-entry");
  }
  entryDSARedirect() {
    this.router.navigateByUrl("dsa-entry");
  }
  entryDPRRedirect() {
    this.router.navigateByUrl("dpr-entry");
  }
  attachmentRedirect() {
    this.router.navigateByUrl("attachment");
  }
  moRedirect() {
    this.router.navigateByUrl("mo-dashboard");
  }
  coRedirect() {
    this.router.navigateByUrl("co-dashboard");
  }
  StationStatusRedirect() {
    this.router.navigateByUrl("staton-status");
  }
  stnAttachmentRedirect() {
    this.router.navigateByUrl("station-attachment");
  }
  JMRRedirect(){
    this.router.navigateByUrl("JMRStations");
  }
  LcvVehicalsRedirect(){
    this.router.navigateByUrl("lcvvehicle");
  }
}
