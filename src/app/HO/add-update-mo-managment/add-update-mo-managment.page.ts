import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';                                                                                      
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-update-mo-managment',
  templateUrl: './add-update-mo-managment.page.html',
  styleUrls: ['./add-update-mo-managment.page.scss'],
})
export class AddUpdateMoManagmentPage implements OnInit {
  userid: any;
  pageFlag: any;
  addForm: any;
  status: any = false;
  updateItemList: any;
  updateForm: any;
  errorFound: boolean;
  title: string = '';
  actionFlag: string = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.updateItemList = JSON.parse(this.activatedroute.snapshot.paramMap.get("arrayItem"));
    console.log(this.updateItemList)
    this.addForm = formBuilder.group({
      name: ['', Validators.required],
      loginid: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      email: ['', Validators.required],
      email1: ['', Validators.required],
      email2: ['', Validators.required],
      email3: ['', Validators.required],
      contact1: ['', Validators.required],
      contact2: ['', Validators.required],
      contact3: ['', Validators.required],
      contact4: ['', Validators.required],
    })


  }

  
  ngAfterContentInit() {
    if (this.pageFlag == "updatemo") {
      if (this.updateItemList.StatusSort == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      };
      this.addForm = this.formBuilder.group({
        name: [this.updateItemList.Name, Validators.required],
        loginid: [this.updateItemList.LoginId, Validators.required],
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
        email: [this.updateItemList.EmailId, Validators.required],
        email1: ['', Validators.required],
        email2: ['', Validators.required],
        email3: ['', Validators.required],
        email4: ['', Validators.required],
        contact1: [this.updateItemList.ContactNo, Validators.required],
        contact2: ['', Validators.required],
        contact3: ['', Validators.required],
        contact4: ['', Validators.required],
      })
    }
  }
  ngOnInit() {
  }

  InsertMo() {
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

    self.title = 'Add Marketing Officer';
    self.actionFlag = 'Add';
    self.errorFound = true;
    if (self.validationMom()) {
      const obj = {
        MOId: self.userid,
        MOName: self.addForm.value.name,
        MOLoginId: self.addForm.value.loginid,
        MOPassword: self.addForm.value.password,
        MOEmailId: self.addForm.value.email,
        MOEmailId2: self.addForm.value.email1,
        MOEmailId3: self.addForm.value.email2,
        // email4:self.addForm.value.email4,
        MOContactNo: self.addForm.value.contact1,
        MOContactNo2: self.addForm.value.contact2,
        MOContactNo3: self.addForm.value.contact3,
        MOContactNo4: self.addForm.value.contact4,
        Status: statusToggle
      }
      self.commonServices.loadingPresent();
      self.commonServices.post("MOInsertUpdate", obj).subscribe((res: any) => {
        const moRes = JSON.parse(res);
        if (moRes.Table[0].Meaasge == "Marketing officer updated successfully.") {
          self.commonServices.presentToast(moRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/mo-management']);
          }, 2000)
        }
        else if (moRes.Table[0].Meaasge == "Email Id already exists.") {
          self.commonServices.presentToast(moRes.Table[0].Meaasge);
        }
        else {
          self.commonServices.presentToast(moRes.Table[0].Meaasge);
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }
  UpdateMo() {
    {
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

      this.title = 'Update Marketing Officer';
      this.actionFlag = 'Update';
      self.errorFound = true;

      const obj = {
        MOId: self.updateItemList.UserId,
        MOName: self.addForm.value.name,
        MOLoginId: self.addForm.value.loginid,
        MOPassword: self.addForm.value.password,
        MOEmailId: self.addForm.value.email,
        MOEmailId2: self.addForm.value.email1,
        MOEmailId3: self.addForm.value.email2,
        MOEmailId4: self.addForm.value.email3,
        // email4:self.addForm.value.email4,
        MOContactNo: self.addForm.value.contact1,
        MOContactNo2: self.addForm.value.contact2,
        MOContactNo3: self.addForm.value.contact3,
        MOContactNo4: self.addForm.value.contact4,
        Status: statusToggle
      }
      self.commonServices.loadingPresent();
      self.commonServices.post("MOInsertUpdate", obj).subscribe((res: any) => {
        const moRes = JSON.parse(res);
        if (moRes.Table[0].Meaasge == "Marketing officer updated successfully.") {
          self.commonServices.presentToast(moRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/mo-management']);
          }, 2000
          )
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }


  //for validation check

  validationMom() {
    if (this.addForm.value.name == '') {
      this.commonServices.presentToast('Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if (!re.test(this.addForm.value.name)) {
      this.commonServices.presentToast('Invalid Name.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.loginid == '') {
      this.commonServices.presentToast('Login Id must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.password == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Password must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.cpassword == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Confirm password must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.password != this.addForm.value.cpassword && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Password did not match.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.email == '') {
      this.commonServices.presentToast('Primary Email address must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.contact1 == '') {
      this.commonServices.presentToast('Primary Contact number must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }

    if (this.addForm.value.email != '' && this.addForm.value.email != null) {
      //const mailformat  = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = this.addForm.value.email.match(mailformat);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid Primary email address.');
        this.errorFound = false;
        return this.errorFound;
      }
    }

    if (this.addForm.value.email1 != '' && this.addForm.value.email1 != null) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = this.addForm.value.email1.match(mailformat);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid email 2 address.');
        this.errorFound = false;
        return this.errorFound;
      }
    }

    if (this.addForm.value.email2 != '' && this.addForm.value.email2 != null) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = this.addForm.value.email2.match(mailformat);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid email 3 address.');
        this.errorFound = false;
        return this.errorFound;
      }
    }

    if (this.addForm.value.email3 != '' && this.addForm.value.email3 != null) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = this.addForm.value.email3.match(mailformat);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid email 4 address.');
        this.errorFound = false;
        return this.errorFound;
      }
    }

    if (this.addForm.value.contact1 != '' && this.addForm.value.contact1 != null) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.contact1.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid Primary contact no.');
        this.errorFound = false;
        return this.errorFound;
      }
    }
    if (this.addForm.value.contact2 != '' && this.addForm.value.contact2 != null) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.contact2.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no 2.');
        this.errorFound = false;
        return this.errorFound;
      }
    }
    if (this.addForm.value.contact3 != '' && this.addForm.value.contact3 != null) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.contact3.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no 3.');
        this.errorFound = false;
        return this.errorFound;
      }
    }
    if (this.addForm.value.contact4 != '' && this.addForm.value.contact4 != null) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.contact4.match(phoneno);


      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no 4.');
        this.errorFound = false;
        return this.errorFound;
      }
    }
    // if (((this.addForm.value.email != '' && this.addForm.value.email != null) && (this.addForm.value.email1 == this.addForm.value.email1 || this.addForm.value.email2 == this.addForm.value.email1 || this.addForm.value.email == this.addForm.value.email3)) || ((this.addForm.value.email1 != '' && this.addForm.value.email1 != null) && (this.addForm.value.email1 == this.addForm.value.email2 || this.addForm.value.email1 == this.addForm.value.email13)) || ((this.addForm.value.email2 != '' && this.addForm.value.email2 != null) && (this.addForm.value.email2 == this.addForm.value.email3))) {
    //   this.commonServices.presentToast('Email must be unique');
    //   this.errorFound = false;
    //   return this.errorFound;
    // }
    if (((this.addForm.value.contact1 != '' && this.addForm.value.contact1 != null) && (this.addForm.value.contact1 == this.addForm.value.contact2 || this.addForm.value.contact1 == this.addForm.value.contact3 || this.addForm.value.contact1 == this.addForm.value.contact4)) || ((this.addForm.value.contact2 != '' && this.addForm.value.MOContactNo2 != null) && (this.addForm.value.contact2 == this.addForm.value.contact3 || this.addForm.value.contact2 == this.addForm.value.contact4)) || ((this.addForm.value.contact3 != '' && this.addForm.value.contact3 != null) && (this.addForm.value.contact3 == this.addForm.value.contact4))) {
      this.commonServices.presentToast('Contact no must be unique');
      this.errorFound = false;
      return this.errorFound;
    }
    return this.errorFound;
  }

}
