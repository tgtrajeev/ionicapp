import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-moadd-update-dsmmngt',
  templateUrl: './moadd-update-dsmmngt.page.html',
  styleUrls: ['./moadd-update-dsmmngt.page.scss'],
})
export class MOAddUpdateDSMMngtPage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  flag: string = '';
  selectedDSMnameId: string = '';
  title: string;
  StationList: any[] = [];
  userid: string;
  dmRes: any;
  dmlist: any;
  obj: any;
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      DSMCode: ['', Validators.required],
      DSMName: ['', Validators.required],
      Status: this.status,
      StationId: ['', Validators.required],
      stCodeMy: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    this.updateDm();
  }

  ngOnInit() {
    this.dmlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('dmlist'));
    this.getStation();
  }

  myChange() {
    this.status = !this.status;
    console.log(this.status)
  }
  
  getStation() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'StationList', Id: 0, Status: 1 }).subscribe((res: any) => {
      self.StationList = JSON.parse(res).Table;
      self.items = JSON.parse(res).Table;
      console.log(self.StationList);
      self.commonServices.loadingDismiss();
    },
      (error) => {
        self.commonServices.loadingDismiss();
        self.commonServices.presentToast("Something went wrong.");
      })
  }

  updateDm() {
    var self = this;
    if (self.pageFlag == "updatedm" && self.dmlist != "" && self.dmlist != undefined && self.dmlist != null) {
      self.addupdateForm = self.formBuilder.group({
        DSMCode: [self.dmlist.DSMCode, Validators.required],
        DSMName: [self.dmlist.DSMName, Validators.required],
        Status: this.status,
        StationId: [self.dmlist.StationId, Validators.required],
        stCodeMy: [self.dmlist.StationName, Validators.required]
      })
    }

    if (self.pageFlag == "adddm" && self.dmlist != null && self.dmlist.StationCode != '') {
      self.addupdateForm.patchValue({
        StationId: self.addupdateForm.value.StationId,
        stCodeMy: this.addupdateForm.value.stCodeMy
      });
    }
  }

  insertUpdateDm() {
    var self = this;
    var statusToggle = 2;
    if (self.status == false) {
      statusToggle = 2;
    }
    else {
      statusToggle = 1;
    }
    self.errorFound = true;
    if (self.pageFlag == "updatedm") {
      self.title = 'Update';
      self.flag = 'U';
      self.selectedDSMnameId = self.dmlist.DSMId;
      self.obj = {
        DSMId: (self.flag == 'U') ? self.selectedDSMnameId : '0',
        DSMCode: self.addupdateForm.value.DSMCode,
        DSMName: self.addupdateForm.value.DSMName,
        UserId: self.userid,
        Status: statusToggle,
        StationId: self.addupdateForm.value.StationId,

      };
    }
    else {
      self.title = 'Add';
      self.flag = 'I';
      self.obj = {
        Id: (self.flag == 'U') ? self.selectedDSMnameId : '0',
        DSMCode: self.addupdateForm.value.DSMCode,
        DSMName: self.addupdateForm.value.DSMName,
        UserId: self.userid,
        Status: statusToggle,
        StationId: self.addupdateForm.value.StationId,
      };
    }
    if (self.ValidationDSM()) {
      self.commonServices.loadingPresent();

      self.commonServices.post("InsertUpdateDSM", self.obj).subscribe((res: any) => {
        self.dmRes = (JSON.parse(res)).Table;
        console.log(self.dmRes);
        if (self.dmRes[0].Mesage == "DSM inserted successfully.") {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
          this.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/modsm-management']);
          }, 2000)
        }
        else if (self.dmRes[0].Mesage == "DSM updated successfully.") {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
          this.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/modsm-management']);
          }, 2000)
        }
        else {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
          self.commonServices.loadingDismiss();
        })
    }
  }

  filterBoxShow(itm) {
    if (this.filterBoxFlag == 0) {
      this.fiterBox = true;
      this.filterBoxFlag = 1;
    }
    else {
      this.fiterBox = false;
      this.filterBoxFlag = 0;
      
      if (this.dmlist != null && this.pageFlag == 'updatedm') {
        this.dmlist.StationName = itm.StationName;
        this.dmlist.StationCode = itm.StationCode;
        this.dmlist.StationId = itm.StationId;
      }
      else {
        this.addupdateForm.value.StationId = itm.StationId;
        this.addupdateForm.value.stCodeMy = itm.StationName;
        this.dmlist = 0;
        console.log(this.addupdateForm.value.stCodeMy + "Ri Stat");
      }
      this.updateDm();
    }
  }

  onSearchTerm(ev: any) {
    this.items = this.StationList;
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(term => {
        return term.StationName.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

  ValidationDSM() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if (!re.test(this.addupdateForm.value.DSMName)) {
      this.commonServices.presentToast('Invalid DSM Name.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.DSMCode == '') {
      this.commonServices.presentToast('DSM code must be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.DSMName == '') {
      this.commonServices.presentToast('DSM name be entered.');
      this.errorFound = false;
    }
    return this.errorFound;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;
}
