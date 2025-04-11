import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  stationId: any = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute,
    public commonServices: ApiService,public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  forgotPassword() {
    var self = this;
    if (self.stationId == '') {
      self.commonServices.presentToast("Please enter Station Id .");
    } else {
      self.commonServices.loadingPresent();
      self.commonServices.postwithservice("forgotPassword", { Id: this.stationId }).subscribe((res: any) => {
        const disRes = JSON.parse(res);
        if (disRes.Table[0].Message == "Invalid Station ID") {
          self.commonServices.presentToast(disRes.Table[0].Message);
        }

        else {
          self.commonServices.presentToast(disRes.Table[0].Message);
          setTimeout(function () {
            self.router.navigate(['/login']);
          }, 1000);
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }
}