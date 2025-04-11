import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-update-controloffice',
  templateUrl: './add-update-controloffice.page.html',
  styleUrls: ['./add-update-controloffice.page.scss'],
})
export class AddUpdateControlofficePage implements OnInit {
  updateForm: any;
  addForm: any;
  CRcode: string = '';
  CRname: string = '';
  flag: string = '';
  selectedCRoomId: string = '';
  userid: any;
  pageFlag: any;
  errorFound: boolean;
  title: string = '';
  itemList: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {

    this.addForm = formBuilder.group({
      controlroomcode: ['', Validators.required],
      controlroomname: ['', Validators.required]

    })
    this.updateForm = formBuilder.group({
      controlroomcode: ['', Validators.required],
      controlroomname: ['', Validators.required]

    })
  }

  ngAfterContentInit() {

    if (this.pageFlag == "updatecontroloffice") {
      this.updateForm = this.formBuilder.group({
        controlroomcode: [this.itemList.ControlRoomCode, Validators.required],
        controlroomname: [this.itemList.ControlRoomName, Validators.required]
      })
    }
  }

  ngOnInit() {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag")
    this.itemList = JSON.parse(this.activatedroute.snapshot.paramMap.get("itemList"))

  }

  InsertControlRoom() {
    var self = this;
    this.title = 'Add';
    this.flag = 'I';
    self.errorFound = true;
    if (self.ValidationCAddRoom()) {
      const obj = {
        Id: (self.flag == 'U') ? self.selectedCRoomId : '0',
        CRCode: self.addForm.value.controlroomcode,
        CRname: self.addForm.value.controlroomname,
        LoginId: self.userid
      };
      self.commonServices.loadingPresent();
      self.commonServices.postwithservice("insertCRoom", obj).subscribe((res: any) => {
        const data = JSON.parse(res);
        console.log(data);
        if (data.Status == "Data inserted successfully.") {
          self.commonServices.presentToast("Data is Inserted successfully");
          self.addForm.reset();
          self.router.navigate(['/control-office']);
        }
        else {
          self.commonServices.presentToast(data.Status);

        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }

  UpdateControlRoom() {
    var self = this;
    self.title = 'Update';
    self.flag = 'U';
    self.selectedCRoomId = self.itemList.Id;
    self.errorFound = true;
    if (self.ValidationCUpdateRoom()) {
      const obj = {
        Id: (self.flag == 'U') ? self.selectedCRoomId : '0',
        CRCode: self.updateForm.value.controlroomcode,
        CRname: self.updateForm.value.controlroomname,
        LoginId: self.userid
      };
      self.commonServices.loadingPresent();
      self.commonServices.postwithservice("updateCRoom", obj).subscribe((res: any) => {
        const data = JSON.parse(res);
        if (data.Status == "Data updated successfully.") {
          self.commonServices.presentToast("Data is updated successfully");
          self.addForm.reset();
          self.router.navigate(['/control-office']);
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
  ValidationCAddRoom() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if (!re.test(this.addForm.value.controlroomname)) {
      this.commonServices.presentToast('Invalid Control Office Name.');
      this.errorFound = false;
    }
    else if (this.addForm.value.controlroomcode == '') {
      this.commonServices.presentToast('control code must be entered.');
      this.errorFound = false;
    }
    else if (this.addForm.value.controlroomname == '') {
      this.commonServices.presentToast('control name be entered.');
      this.errorFound = false;
    }
    return this.errorFound;
  }



  ValidationCUpdateRoom() {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if (!re.test(this.updateForm.value.controlroomname)) {
      this.commonServices.presentToast('Invalid Control Office Name.');
      this.errorFound = false;
    }
    else if (this.updateForm.value.controlroomcode == '') {
      this.commonServices.presentToast('control code must be entered.');
      this.errorFound = false;
    }
    else if (this.updateForm.value.controlroomname == '') {
      this.commonServices.presentToast('control name be entered.');
      this.errorFound = false;
    }
    return this.errorFound;
  }


}
