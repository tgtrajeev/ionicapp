import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-update-lcv',
  templateUrl: './add-update-lcv.page.html',
  styleUrls: ['./add-update-lcv.page.scss'],
})
export class AddUpdateLcvPage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  flag: string = '';
  title: string;
  obj: any;
  lcvlist: any;
  listStation: any[];
  LCVId: string = '';
  lcvRes: any;
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      StationCode: ['', Validators.required],
      LcvCode: ['', Validators.required],
      LcvName: ['', Validators.required],
      Description: ['', Validators.required],
      LoginId: this.userid,
      // status: this.status,
      stCodeMy: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    this.updatemLcv();
  }
  ngOnInit() {
    this.lcvlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('lcvlist'));
    this.gettationList();
  }

  updatemLcv() {
    var self = this;
    if (self.pageFlag == "updatelcv" && self.lcvlist != "" && self.lcvlist != undefined && self.lcvlist != null) {
      self.addupdateForm = self.formBuilder.group({
        StationCode: [self.lcvlist.StationCode, Validators.required],
        LcvCode: [self.lcvlist.LcvCode, Validators.required],
        LcvName: [self.lcvlist.LcvName, Validators.required],
        Description: [self.lcvlist.Description, Validators.required],
        LoginId: this.userid,
        // status: this.status,
        stCodeMy: [self.lcvlist.StationName, Validators.required]
      });
      if (self.lcvlist.status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
    }
    if (self.pageFlag == "addlcv" && self.lcvlist != null && self.lcvlist.StationCode != '') {
      self.addupdateForm.patchValue({
        StationCode: self.addupdateForm.value.StationCode,
        stCodeMy: self.addupdateForm.value.StationName
      });
    }
  }
 
  gettationList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetMeterSkidMaster", { Status: "" }).subscribe((res: any) => {
      var lcvRes = JSON.parse(res);
      self.listStation = lcvRes.Table1;
      console.log(self.listStation);
      self.items = self.listStation;
      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      })
  }

  insertUpdateLcv() {
    var self = this;
    var statusToggle;
    if (self.status == false) {
      // self.status = 2;
      statusToggle = 1;
    }
    else {
      // self.status = 1;
      statusToggle = 0;
    }
    self.errorFound = true;
    if (self.pageFlag == "updatelcv") {
      self.title = 'Update';
      self.flag = 'U';
      self.LCVId = self.lcvlist.LcvId;
      self.obj = {
        LcvId: (self.flag == 'U') ? self.LCVId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        LcvCode: self.addupdateForm.value.LcvCode,
        LcvName: self.addupdateForm.value.LcvName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
       // status: self.status
       status: statusToggle
      };
      if (self.ValidationLCV()) {
        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("updateLcvMaster", self.obj).subscribe((res: any) => {
          self.lcvRes = (JSON.parse(res));
          console.log(self.lcvRes);
          if (self.lcvRes.Status == "Data updated successfully.") {
            self.commonServices.presentToast(self.lcvRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/lcv1']);
            }, 2000)
          }
          else {
            self.commonServices.presentToast(self.lcvRes.Status);
          }
          self.commonServices.loadingDismiss();
        },
          (error) => {
            self.commonServices.presentToast(self.lcvRes.Status);
            self.commonServices.loadingDismiss();
          })
      }
    }
    else {
      self.title = 'Add';
      self.flag = 'I';
      self.obj = {
        LcvId: (self.flag == 'U') ? self.LCVId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        LcvCode: self.addupdateForm.value.LcvCode,
        LcvName: self.addupdateForm.value.LcvName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        status: statusToggle
      }

      if (self.ValidationLCV()) {
        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("insertLcvMaster", self.obj).subscribe((res: any) => {
          self.lcvRes = (JSON.parse(res));
          console.log(self.lcvRes);
          if (self.lcvRes.Status == "Data inserted successfully.") {
            self.commonServices.presentToast(self.lcvRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/lcv1']);
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
  };
  ValidationLCV() {
    if (this.addupdateForm.value.StationCode == '') {
      this.commonServices.presentToast('Station must be selected.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.LcvCode == '') {
      this.commonServices.presentToast('Please enter the Lcv Code.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.LcvName == '') {
      this.commonServices.presentToast('Please enter the Lcv Name.');
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

      if (this.lcvlist != null && this.pageFlag == 'updatelcv') {
        this.lcvlist.StationName = itm.StationName;
        this.lcvlist.StationCode = itm.StationCode;
      }
      else {
        this.addupdateForm.value.StationCode = itm.StationCode;
        this.addupdateForm.value.StationName = itm.StationName;
        this.lcvlist = 0;
      }
      this.updatemLcv();
      this.gettationList();
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

