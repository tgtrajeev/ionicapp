import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.page.html',
  styleUrls: ['./add-update-user.page.scss'],
})
export class AddUpdateUserPage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  flag: string = '';
  title: string;
  selectedUserId: string = '';
  obj: any;
  Itemlist: any;
  IsStationDisable: boolean = true;
  GetRes: any;
  listPermision: any = [];
  StationList: any = [];
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  constructor(private formBuilder: FormBuilder, private router: Router, 
    private activatedroute: ActivatedRoute, public commonServices: ApiService) {

    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      EmployeeCode: ['', Validators.required],
      LoginId: ['', Validators.required],
      EmailId: ['', Validators.required],
      Name: ['', Validators.required],
      Password: ['', Validators.required],
      ConfPassword: ['', Validators.required],
      UserId: [this.userid, Validators.required],
      PermissionId: ['', Validators.required],
      StationId: ['', Validators.required],
      // status:this.status,
      stCodeMy: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    this.updateItemList();
  }
  ngOnInit() {
    if (this.pageFlag == "updatepage") {
      this.Itemlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('itemList'));
    }
    this.getPermision();
  }

  updateItemList() {
    var self = this;
    if (self.pageFlag == "updatepage" && self.Itemlist != "" && self.Itemlist != undefined && self.Itemlist != null) {
      self.addupdateForm = self.formBuilder.group({
        EmployeeCode: [self.Itemlist.EmpCode, Validators.required],
        LoginId: [self.Itemlist.LoginId, Validators.required],
        EmailId: [self.Itemlist.EmailId, Validators.required],
        Name: [self.Itemlist.Name, Validators.required],
        Password: [self.Itemlist.UserPassword, Validators.required],
        ConfPassword: [self.Itemlist.UserPassword, Validators.required],
        UserId: [self.Itemlist.UserId, Validators.required],
        PermissionId: [self.Itemlist.DepartmentId, Validators.required],
        StationId: [self.Itemlist.StationId, Validators.required],
        // status:this.status,
        stCodeMy: [self.Itemlist.StationName, Validators.required]
      });
      if (self.Itemlist.Status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
    }

    if (self.pageFlag == "addpage" && self.Itemlist != null && self.Itemlist.StationCode != '') {
      self.addupdateForm.patchValue({
        StationCode: self.addupdateForm.value.StationCode,
        stCodeMy: self.addupdateForm.value.StationName
      });
    }
  }

  getPermision() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'PermisionType', Id: 0, Status: "" }).subscribe((res: any) => {

      self.listPermision = JSON.parse(res).Table
      self.StationList = JSON.parse(res).Table1
      console.log(self.listPermision);
      self.items = self.StationList;

      if (this.Itemlist != null && this.Itemlist != '') {
        let arr = self.StationList.filter(function (item) {
          if (item.StationId == self.Itemlist.StationId) {
            self.Itemlist.StationName = item.StationName;
            self.updateItemList();
          }
        });
        console.log(arr);
      }
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      })
  }

  onPermisionSelect(val) {
    this.addupdateForm.value.PermissionId = val.deatils.value;
    if (this.addupdateForm.value.PermissionId == '5')
      this.IsStationDisable = false;
    else {
      this.IsStationDisable = true;
      this.addupdateForm.value.PermissionId = '';
    }

  }

  insertUpdateData() {
    var self = this;
    var statusToggle = 2;
    if (self.status == false) {
      // self.status = 2;
      statusToggle = 2;
    }
    else {
      // self.status = 1;
      statusToggle = 1;
    }
    self.errorFound = true;
    if (self.pageFlag == "updatepage") {
      self.title = 'Update';
      self.flag = 'U';
      self.selectedUserId = self.Itemlist.UserId;
      if (self.Itemlist.DepartmentCode == 'SOP') {
        self.IsStationDisable = false;
      }
      else {
        self.IsStationDisable = true;
      }
      self.obj = {
        Id: (self.flag == 'U') ? self.selectedUserId : '0',
        EmployeeCode: self.addupdateForm.value.EmployeeCode,
        LoginId: self.addupdateForm.value.LoginId,
        EmailId: self.addupdateForm.value.EmailId,
        Name: self.addupdateForm.value.Name,
        Password: self.addupdateForm.value.Password,
        UserId: self.Itemlist.UserId,
        PermissionId: self.addupdateForm.value.PermissionId,
        StationId: self.addupdateForm.value.StationId,
        status: statusToggle
      };
      if (self.ValidationUsers()) {
        self.commonServices.loadingPresent();
        self.commonServices.post("insertUpdateUserMaster", self.obj).subscribe((res: any) => {
          self.GetRes = (JSON.parse(res));
          console.log(self.GetRes);
          if (self.GetRes.Table[0].Mesage == "User updated successfully.") {
            self.commonServices.presentToast(self.GetRes.Table[0].Mesage);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/user-management']);
            }, 2000)
          }
          else {
            self.commonServices.presentToast(self.GetRes.Table[0].Mesage);

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
        Id: (self.flag == 'U') ? self.selectedUserId : '0',
        EmployeeCode: self.addupdateForm.value.EmployeeCode,
        LoginId: self.addupdateForm.value.LoginId,
        EmailId: self.addupdateForm.value.EmailId,
        Name: self.addupdateForm.value.Name,
        Password: self.addupdateForm.value.Password,
        UserId: self.userid,
        PermissionId: self.addupdateForm.value.PermissionId,
        StationId: self.addupdateForm.value.StationId,
        status: statusToggle
      };
      if (self.ValidationUsers()) {

        self.commonServices.loadingPresent();
        self.commonServices.post("insertUpdateUserMaster", self.obj).subscribe((res: any) => {
          self.GetRes = (JSON.parse(res));
          console.log(self.GetRes);
          if (self.GetRes.Table[0].Mesage == "User Added Successfully.") {
            self.commonServices.presentToast(self.GetRes.Table[0].Mesage);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/user-management']);

            }, 2000)
          }
          else {
            self.commonServices.presentToast(self.GetRes.Table[0].Mesage);

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
  ValidationUsers() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if ((this.addupdateForm.value.LoginId == '' || isNullOrUndefined(this.addupdateForm.value.LoginId))) {
      this.commonServices.presentToast('Loginid must be entered..');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.EmployeeCode == '') {
      this.commonServices.presentToast('Emp code must be entered.');
      this.errorFound = false;
    }
    else if (!re.test(this.addupdateForm.value.Name)) {
      this.commonServices.presentToast('Invalid User Name.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.Name == '') {
      this.commonServices.presentToast('User name be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.Password == '') {
      this.commonServices.presentToast('Password name be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.ConfPassword == '') {
      this.commonServices.presentToast(' Password name be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.ConfPassword != this.addupdateForm.value.Password) {
      this.commonServices.presentToast('Password and Confirm Password must be same.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PermissionId == '' || isNullOrUndefined(this.addupdateForm.value.PermissionId)) {
      this.commonServices.presentToast('User Type must be seleted.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.PermissionId == '5') {
      if (Number(this.addupdateForm.value.PermissionId) <= 0) {
        this.commonServices.presentToast('Station must be selected.');
        this.errorFound = false;
      }
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
      
      if (this.Itemlist != null && this.pageFlag == 'updatepage') {
        this.Itemlist.StationName = itm.StationName;
        this.Itemlist.StationCode = itm.StationCode;
        this.Itemlist.StationId = itm.StationId;
      }
      else {
        this.addupdateForm.value.StationCode = itm.StationCode;
        this.addupdateForm.value.StationName = itm.StationName;
        this.Itemlist = 0;
      }
      this.updateItemList();
      this.getPermision();
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
}