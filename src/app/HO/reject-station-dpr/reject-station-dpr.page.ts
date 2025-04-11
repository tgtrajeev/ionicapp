import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reject-station-dpr',
  templateUrl: './reject-station-dpr.page.html',
  styleUrls: ['./reject-station-dpr.page.scss'],
})
export class RejectStationDprPage implements OnInit {
  isShown: boolean = false;
  isItemAvailable = false;
  items: any;
  searchShow: boolean = false;
  searchFlag: number = 0;
  listStation: any[];
  SelectedCRm: string = '';
  // SelectedStationCode:string='';
  errorFound = true;
  addupdateForm: any;
  secondMaxDate: any = new Date().toISOString();
  rejectiondatE: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private datepipe: DatePipe,
    private activatedroute: ActivatedRoute, public commonServices: ApiService, 
    private menu: MenuController) {
    this.addupdateForm = formBuilder.group({
      SelectedCRoom: ['', Validators.required],
      SelectedStationCode: ['', Validators.required]
    })
  }

  ngOnInit() {
    const dt = new Date();
    this.rejectiondatE = new Date().toLocaleDateString();
    this.rejectiondatE = this.datepipe.transform(dt, 'yyyy/MM/dd');
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
  }

  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    self.rejectiondatE = this.datepipe.transform(dt, 'yyyy/MM/dd');
  }

  OnSelectCRoom(evt) {
    this.SelectedCRm = evt.detail.value;
    this.getRejectDetails();
  }

  getRejectDetails() {
    var self = this;
    // self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetStationsByAdmin", { ControlRoomCode: self.SelectedCRm, 
      Flag: 'FillStation', Rejectiondate : this.datepipe.transform(this.rejectiondatE, 'dd/MMM/yyyy') }).subscribe((res: any) => {
      var stationRes = JSON.parse(res);
      self.listStation = stationRes.Table;
      console.log(self.listStation);
      // self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        // self.commonServices.loadingDismiss();
      })
  }

  UpdateRejectStation() {
    var self = this;
    self.errorFound = true;
    if (self.ValidationRejection()) {
      self.commonServices.loadingPresent();
      self.commonServices.postwithservice("GetStationsByAdmin",
        {
          ControlRoomCode: self.addupdateForm.value.SelectedCRoom,
          Flag: self.addupdateForm.value.SelectedStationCode,
          Rejectiondate : this.datepipe.transform(this.rejectiondatE, 'dd/MMM/yyyy')
        }).subscribe((res: any) => {
          const data = JSON.parse(res);
          if (data.Table[0].Messages == "Station readings has been rejected.") {
            self.addupdateForm.reset();    
            self.getRejectDetails();

          }
          self.commonServices.presentToast(data.Table[0].Messages);
          self.commonServices.loadingDismiss();
        },
          (error) => {
            self.commonServices.presentToast("Something went wrong.");
            self.commonServices.loadingDismiss();
          })
    }
  }
  ValidationRejection() {
    if (this.addupdateForm.value.SelectedCRoom == '') {
      this.commonServices.presentToast('Please Select Control Room.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.SelectedStationCode == '') {
      this.commonServices.presentToast('Please Select Station for Rejection.');
      this.errorFound = false;
    }
    return this.errorFound;
  }
}