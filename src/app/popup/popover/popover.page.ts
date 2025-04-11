import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
declare var $: any;

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {

    $("#abc").click(function () {
      $(".header").hide();
    });

    $("#rr").click(function () {
      $("#abc").trigger("click");
    });
  }
  showSearchBar() {
    $("#searchbar").show();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

}
