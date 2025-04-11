import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-add-apdate-package',
  templateUrl: './add-apdate-package.page.html',
  styleUrls: ['./add-apdate-package.page.scss'],
})
export class AddApdatePackagePage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  flag: string = '';
  title: string;
  PackageId: string = '';
  obj: any;
  packlist: any = '';
  listStation: any[];
  packRes: any;
  SelectedPrimeMover: string = '';
  PrimeMover = [
    { PMName: 'Engine', value: 'E' },
    { PMName: 'Motor', value: 'M' },
  ];

  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  StatusFlagVentFlow: string = '1';
  constructor(private formBuilder: FormBuilder, private router: Router,
    private activatedroute: ActivatedRoute, public commonServices: ApiService) {

    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      StationCode: ['', Validators.required],
      PackageCode: ['', Validators.required],
      PackageName: ['', Validators.required],
      PackageMake: ['', Validators.required],
      PackageCapacity: ['', Validators.required],
      PrimeMover: [this.PrimeMover, Validators.required],
      Description: ['', Validators.required],
      LoginId: this.userid,
      // status: this.status,
      stCodeMy: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    this.updatepackage();
  }

  ngOnInit() {
    // if(this.pageFlag == 'updatepage'){
    this.packlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('packlist'));
    // }

    this.getStationList();
  }

  statusChange(val) {
    this.StatusFlagVentFlow = val.detail.value;
  }
  updatepackage() {
    var self = this;
    if (self.pageFlag == "updatepage" && self.packlist != "" && self.packlist != undefined && self.packlist != null) {
      self.addupdateForm = self.formBuilder.group({
        StationCode: [self.packlist.StationCode, Validators.required],
        PackageCode: [self.packlist.PackageCode, Validators.required],
        PackageName: [self.packlist.PackageName, Validators.required],
        PackageMake: [self.packlist.PackageMake, Validators.required],
        PackageCapacity: [self.packlist.PackageCapacity, Validators.required],
        PrimeMover: [self.packlist.PrimeMover, Validators.required],
        Description: [self.packlist.Description, Validators.required],
        LoginId: self.userid,
        // status: self.status,
        stCodeMy: [self.packlist.StationName, Validators.required]
      });
      if (self.packlist.status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }

      if (self.packlist.IsVentFlow == 'Yes') {
        this.StatusFlagVentFlow = '1';
      } else {
        this.StatusFlagVentFlow = '0';
      }
    }
    if (self.pageFlag == "addpage" && self.packlist != null && self.packlist.StationCode != '') {
      self.addupdateForm.patchValue({
        StationCode: self.addupdateForm.value.StationCode,
        stCodeMy: self.addupdateForm.value.StationName
      });
    }
  }
 
  getStationList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetPackageMaster", { Status: "" }).subscribe((res: any) => {
      var packageRes = JSON.parse(res);
      if (packageRes != "" && packageRes != undefined && packageRes != null) {
        self.listStation = packageRes.Table1;
        self.items = self.listStation;
        console.log(self.listStation);
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

  insertUpdatepack() {
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
    if (self.pageFlag == "updatepage") {
      self.title = 'Update';
      self.flag = 'U';
      self.PackageId = self.packlist.PackageId;
      self.obj = {
        PackageId: (self.flag == 'U') ? self.PackageId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        PackageCode: self.addupdateForm.value.PackageCode,
        PackageName: self.addupdateForm.value.PackageName,
        PackageMake: self.addupdateForm.value.PackageMake,
        PackageCapacity: self.addupdateForm.value.PackageCapacity,
        PrimeMover: self.addupdateForm.value.PrimeMover,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        // status: self.status,
        status: statusToggle,
        IsVentFlow: this.StatusFlagVentFlow
      };
      if (self.ValidationCRoom()) {
        self.commonServices.loadingPresent();

        self.commonServices.postwithservice("updatePackageMaster", self.obj).subscribe((res: any) => {
          self.packRes = (JSON.parse(res));
          console.log(self.packRes);
          if (self.packRes.Status == "Data updated successfully.") {
            self.commonServices.presentToast(self.packRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/package1']);
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
    else {
      self.title = 'Add';
      self.flag = 'I';
      self.obj = {
        PackageId: (self.flag == 'U') ? self.PackageId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        PackageCode: self.addupdateForm.value.PackageCode,
        PackageName: self.addupdateForm.value.PackageName,
        PackageMake: self.addupdateForm.value.PackageMake,
        PackageCapacity: self.addupdateForm.value.PackageCapacity,
        PrimeMover: self.addupdateForm.value.PrimeMover,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        // status: self.status,
        status: statusToggle,
        IsVentFlow: this.StatusFlagVentFlow
      };
      if (self.ValidationCRoom()) {
        self.commonServices.loadingPresent();

        self.commonServices.postwithservice("insertPackageMaster", self.obj).subscribe((res: any) => {
          self.packRes = (JSON.parse(res));
          console.log(self.packRes);
          if (self.packRes.Status == "Data inserted successfully.") {
            self.commonServices.presentToast(self.packRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/package1']);
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
  ValidationCRoom() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regIntegers = /^[1-9]\d*$/;

    if (this.addupdateForm.value.StationCode == '' || this.addupdateForm.value.StationCode == '--Select Station--') {
      this.commonServices.presentToast('Station must be selected.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PackageCode == '') {
      this.commonServices.presentToast('Package code must be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PackageName == '') {
      this.commonServices.presentToast('Please enter Package Name.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PackageMake == '') {
      this.commonServices.presentToast('Please enter Package Maker.');
      this.errorFound = false;
    }
    else if (!re.test(this.addupdateForm.value.PackageMake)) {
      this.commonServices.presentToast('Invalid Package Maker.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PackageCapacity == '0' || this.addupdateForm.value.PackageCapacity == '') {
      this.commonServices.presentToast('Please enter the Package Capacity.');
      this.addupdateForm.value.errorFound = false;
    }
    else if (regIntegers.test(this.addupdateForm.value.PackageCapacity) == false) {
      this.commonServices.presentToast('only positive value allowed in Package Capacity.');
      this.errorFound = false;
    }
    else if (parseFloat(this.addupdateForm.value.PackageCapacity) < 0) {
      this.commonServices.presentToast('Package Capacity must be Positive.');
      this.errorFound = false;
    }
    else if (regexNumeric.test(this.addupdateForm.value.PackageCapacity) == false) {
      this.commonServices.presentToast('Only numeric value allowed for reading.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PrimeMover == '' || this.addupdateForm.value.PrimeMover == '--Select--') {
      this.commonServices.presentToast('Please select the Prime Mover.');
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
      if (this.packlist != null && this.pageFlag == 'updatepage') {
        this.packlist.StationName = itm.StationName;
        this.packlist.StationCode = itm.StationCode;
      }
      else {
        this.addupdateForm.value.StationCode = itm.StationCode;
        this.addupdateForm.value.StationName = itm.StationName;
        this.packlist = 0;
      }
      this.updatepackage();
      this.getStationList();
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
