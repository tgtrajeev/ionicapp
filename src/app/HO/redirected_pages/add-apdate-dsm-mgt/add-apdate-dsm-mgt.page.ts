import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-add-apdate-dsm-mgt',
  templateUrl: './add-apdate-dsm-mgt.page.html',
  styleUrls: ['./add-apdate-dsm-mgt.page.scss'],
})
export class AddApdateDsmMgtPage implements OnInit {
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
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      DSMCode: ['', Validators.required],
      DSMName: ['', Validators.required],
      Status: this.status,
      StationId: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    this.updateDm();
  }

  ngOnInit() {
    this.dmlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('dmlist'));
    this.getStation();
  }

  getStation() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'StationList', Id: 0, Status: 1 }).subscribe((res: any) => {
      self.StationList = JSON.parse(res).Table;
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
        StationId: [self.dmlist.StationId, Validators.required]
      });
      if (self.dmlist.Status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
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
        StationId: self.addupdateForm.value.StationId
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
        StationId: self.addupdateForm.value.StationId
      };
    }
    if (self.ValidationDSM()) {
      self.commonServices.loadingPresent();

      self.commonServices.post("InsertUpdateDSM", self.obj).subscribe((res: any) => {
        self.dmRes = (JSON.parse(res)).Table;
        console.log(self.dmRes);
        if (self.dmRes[0].Mesage == "DSM inserted successfully.") {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
          self.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/dsm-management']);
          }, 2000
          )
        }
        else if (self.dmRes[0].Mesage == "DSM updated successfully.") {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
          self.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/dsm-management']);
          }, 2000
          )
        }
        else if(self.dmRes[0].Mesage=="DSM already exists.")
        {
          self.commonServices.presentToast(self.dmRes[0].Mesage);
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
