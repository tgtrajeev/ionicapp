import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-apdate-meter-skid',
  templateUrl: './add-apdate-meter-skid.page.html',
  styleUrls: ['./add-apdate-meter-skid.page.scss'],
})
export class AddApdateMeterSkidPage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  flag: string = '';
  MeterSkidId: string = '';
  title: string;
  MSkidId: string = '';
  mskidRes: any;
  obj: any;
  mskidlist: any;
  listStation: any;
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      StationCode: ['', Validators.required],
      MeterSkidCode: ['', Validators.required],
      MeterSkidName: ['', Validators.required],
      Description: ['', Validators.required],
      LoginId: this.userid,
      // status: this.status,
      stCodeMy: ['', Validators.required]
    })
  }
  ngAfterContentInit() {
    this.updatemskid();
  }
  ngOnInit() {
    this.mskidlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('mskidlist'));
    this.getMeterstationList();
  }

  updatemskid() {
    var self = this;
    if (self.pageFlag == "updatemkid" && self.mskidlist != "" && self.mskidlist != undefined && self.mskidlist != null) {
      self.addupdateForm = self.formBuilder.group({
        StationCode: [self.mskidlist.StationCode, Validators.required],
        MeterSkidCode: [self.mskidlist.MeterSkidCode, Validators.required],
        MeterSkidName: [self.mskidlist.MeterSkidName, Validators.required],
        Description: [self.mskidlist.Description, Validators.required],
        LoginId: self.userid,
        // status: self.status,
        stCodeMy: [self.mskidlist.StationName, Validators.required]
      });
      if (self.mskidlist.Status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
    }
    if (self.pageFlag == "addsmkid" && self.mskidlist != null && self.mskidlist.StationCode != '') {
      this.addupdateForm.patchValue({
        StationCode: self.addupdateForm.value.StationCode,
        stCodeMy: self.addupdateForm.value.StationName
      });
    }
  }

  getMeterstationList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetMeterSkidMaster", { Status: "" }).subscribe((res: any) => {
      var MeterSkidRes = JSON.parse(res);
      self.listStation = MeterSkidRes.Table1
      console.log(self.listStation);
      self.items = self.listStation;

      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })
  }

  insertUpdateMeterSkid() {
    var self = this;
    var statusToggle = 1;
    if (self.status == false) {
      // self.status = 2;
      statusToggle = 1;
    }
    else {
      // self.status = 1;
      statusToggle = 0;
    }
    self.errorFound = true;
    if (self.pageFlag == "updatemkid") {
      self.title = 'Update';
      self.flag = 'U';
      self.MSkidId = self.mskidlist.MeterSkidId;
      self.obj = {
        MeterSkidId: (self.flag == 'U') ? self.MSkidId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        MeterSkidCode: self.addupdateForm.value.MeterSkidCode,
        MeterSkidName: self.addupdateForm.value.MeterSkidName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        status: statusToggle
      };
      if (self.ValidationMeterSkid()) {

        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("updateMeterSkidMaster", self.obj).subscribe((res: any) => {
          self.mskidRes = (JSON.parse(res));
          console.log(self.mskidRes);
          if (self.mskidRes.Status == "Data updated successfully.") {
            self.commonServices.presentToast(self.mskidRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/meter-skid1']);
            }, 2000)
          }
          else {
            self.commonServices.presentToast(self.mskidRes.Status);
          }
          self.commonServices.loadingDismiss();
        },
          (error) => {
            self.commonServices.presentToast("Something went wrong.");
            self.commonServices.loadingDismiss();
          })
      }
    }
    else {
      self.title = 'Add';
      self.flag = 'I';
      self.obj = {
        MeterSkidId: (self.flag == 'U') ? self.MSkidId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        MeterSkidCode: self.addupdateForm.value.MeterSkidCode,
        MeterSkidName: self.addupdateForm.value.MeterSkidName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        status: statusToggle
      };
      if (self.ValidationMeterSkid()) {
        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("insertMeterSkidMaster", self.obj).subscribe((res: any) => {
          self.mskidRes = (JSON.parse(res));
          console.log(self.mskidRes);
          if (self.mskidRes.Status == "Data inserted successfully.") {
            self.commonServices.presentToast(self.mskidRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/meter-skid1']);
            }, 2000)
          }
          else {
            self.commonServices.presentToast("Something went wrong.");
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

  ValidationMeterSkid() {
    var re = new RegExp(/^[0-9]*$/gm);
    if (this.addupdateForm.value.StationCode == '') {
      this.commonServices.presentToast('Station must be selected.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.MeterSkidCode == '') {
      this.commonServices.presentToast('Meter Skid code must be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.MeterSkidName == '') {
      this.commonServices.presentToast('Meter Skid name must be entered.');
      this.errorFound = false;
    }
    else if (re.test(this.addupdateForm.value.MeterSkidName)) {
      this.commonServices.presentToast('Invalid Meter Skid name.');
      this.errorFound = false;
    }
    return this.errorFound;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

  filterBoxShow(itm) {
    if (this.filterBoxFlag == 0) {
      this.fiterBox = true;
      this.filterBoxFlag = 1;
    }
    else {
      this.fiterBox = false;
      this.filterBoxFlag = 0;

      if (this.mskidlist != null && this.pageFlag == 'updatemkid') {
        this.mskidlist.StationName = itm.StationName;
        this.mskidlist.StationCode = itm.StationCode;
      }
      else {
        this.addupdateForm.value.StationCode = itm.StationCode;
        this.addupdateForm.value.StationName = itm.StationName;
        this.mskidlist = 0;
      }
      this.updatemskid();
      this.getMeterstationList();
    }
  }

  onSearchTerm(ev: any) {
    this.items = this.listStation;
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(term => {
        return term.StationName.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
}