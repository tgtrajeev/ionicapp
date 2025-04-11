import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-update-station-management',
  templateUrl: './add-update-station-management.page.html',
  styleUrls: ['./add-update-station-management.page.scss'],
})
export class AddUpdateStationManagementPage implements OnInit {
  userid: any;
  pageFlag: any;
  addForm: any;
  status: any = false;
  // actionFlag: string;
  // SelectedStationId: any;
  stationmlist: any;
  OpeBalance = '0.00';
  errorFound: boolean;
  SelectedYValueId: any;
  dataRegionMaster: any;
  dataCompanyMaster: any;
  dataStationTypeMaster: any;
  dataMoMaster: any;
  dataCRoomMaster: any;

  title: any;;
  actionFlag: any;;
  SelectedStationId: any;;
  updateForm: any;
  singlelist: any;
  stationid: "";
  constructor(private datepipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");

    this.addForm = formBuilder.group({
      StationId: ['', Validators.required],
      StationCode: ['', Validators.required],
      StationName: ['', Validators.required],
      StationAddress: ['', Validators.required],
      StationRegionId: ['', Validators.required],
      StationCompanyId: ['', Validators.required],
      StationTypeId: ['', Validators.required],
      MoId: ['', Validators.required],
      StationLoginId: ['', Validators.required],
      StationPassword: ['', Validators.required],
      StationConfPassword: ['', Validators.required],
      ControlRoomId: ['', Validators.required],
      StationEmailId: ['', Validators.required],
      StationContactNo: ['', Validators.required],
      Status: this.status,
      OpeBalance: parseFloat(this.OpeBalance),
      ShutdownRemark: ['', Validators.required],
      ShiftAManagerName: ['', Validators.required],
      ShiftAManagerContactNo: ['', Validators.required],
      ShiftBManagerName: ['', Validators.required],
      ShiftBManagerContactNo: ['', Validators.required],
      ShiftCManagerName: ['', Validators.required],
      ShiftCManagerContactNo: ['', Validators.required],
      ShiftDManagerName: ['', Validators.required],
      ShiftDManagerContactNo: ['', Validators.required],
    })
  }

  ngAfterContentInit() {
    this.addForm;
  }

  ngOnInit() {
    this.stationid = JSON.parse(this.activatedroute.snapshot.paramMap.get("stationid"));
    this.getStationMListById(this.stationid)
  }

  onSelectChange(selectedValue) {
    this.SelectedYValueId = selectedValue.detail.value;
    console.log(this.SelectedYValueId)
  }

  getStationMListById(StationId: string) {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'SoById', Id: StationId })
      .subscribe((res: any) => {
        var StaionmRes = JSON.parse(res);
        self.stationmlist = StaionmRes.Table[0];
        self.dataRegionMaster = StaionmRes.Table1;
        self.dataCompanyMaster = StaionmRes.Table2;
        self.dataStationTypeMaster = StaionmRes.Table3;
        self.dataMoMaster = StaionmRes.Table4;
        self.dataCRoomMaster = StaionmRes.Table5;
        console.log(self.stationmlist);
        if (this.stationmlist != "" && this.stationmlist != undefined) {
          this.addForm = this.formBuilder.group({
            StationId: [this.stationmlist.StationId, Validators.required],
            StationCode: [this.stationmlist.StationCode, Validators.required],
            StationName: [this.stationmlist.StationName, Validators.required],
            StationAddress: [this.stationmlist.StationAddress, Validators.required],
            StationRegionId: [this.stationmlist.StationRegionId, Validators.required],
            StationCompanyId: [this.stationmlist.StationCompanyId, Validators.required],
            StationTypeId: [this.stationmlist.StationTypeId, Validators.required],
            MoId: [this.stationmlist.MoId, Validators.required],
            StationLoginId: [this.stationmlist.LoginId, Validators.required],
            StationPassword: [this.stationmlist.StationId, Validators.required],
            StationConfPassword: [this.stationmlist.StationId, Validators.required],
            ControlRoomId: [this.stationmlist.ControlRoomId, Validators.required],
            StationEmailId: [this.stationmlist.EmailId, Validators.required],
            StationContactNo: [this.stationmlist.ContactNo, Validators.required],
            Status: this.stationmlist.Status,
            OpeBalance: parseFloat(this.stationmlist.OpeBalance),
            ShutdownRemark: [this.stationmlist.ShutdownRemark, Validators.required],
            ShiftAManagerName: [this.stationmlist.ShiftAManager, Validators.required],
            ShiftAManagerContactNo: [this.stationmlist.ShiftAManagerContact, Validators.required],
            ShiftBManagerName: [this.stationmlist.ShiftBManager, Validators.required],
            ShiftBManagerContactNo: [this.stationmlist.ShiftBManagerContact, Validators.required],
            ShiftCManagerName: [this.stationmlist.ShiftCManager, Validators.required],
            ShiftCManagerContactNo: [this.stationmlist.ShiftCManagerContact, Validators.required],
            ShiftDManagerName: [this.stationmlist.ShiftDManager, Validators.required],
            ShiftDManagerContactNo: [this.stationmlist.ShiftDManagerContact, Validators.required],

          });
          if (self.stationmlist.StatusSort == 'Inactive') {
            this.status = false;
          } else {
            this.status = true;
          }
        }
        console.log(this.updateForm);
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })

  }
  StationMList(StationMList: any) {
    throw new Error("Method not implemented.");
  }


  Insertstation() {
    console.log(this.addForm);
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
    if (self.stationid != "") {
      self.title = 'Update Station';
      self.actionFlag = 'Update';
      self.SelectedStationId = self.stationid;
    }
    else {
      self.title = 'Add Station';
      self.actionFlag = 'Add';
      self.SelectedStationId = '0';
    }

    if (self.validationSO()) {
      const obj = {

        StationId: (self.actionFlag == 'Update') ? self.SelectedStationId : '0',
        StationCode: self.addForm.value.StationCode,
        StationName: self.addForm.value.StationName,
        StationAddress: self.addForm.value.StationAddress,
        Status: statusToggle,
        StationPassword: self.addForm.value.StationPassword,
        StationRegionId: self.addForm.value.StationRegionId,
        StationCompanyId: self.addForm.value.StationCompanyId,
        StationTypeId: self.addForm.value.StationTypeId,
        MoId: self.addForm.value.MoId,
        ControlRoomId: self.addForm.value.ControlRoomId,
        StationLoginId: self.addForm.value.StationLoginId,
        StationEmailId: self.addForm.value.StationEmailId,
        StationContactNo: self.addForm.value.StationContactNo,
        ShiftAManagerName: self.addForm.value.ShiftAManagerName,
        ShiftAManagerContactNo: self.addForm.value.ShiftAManagerContactNo,
        ShiftBManagerName: self.addForm.value.ShiftBManagerName,
        ShiftBManagerContactNo: self.addForm.value.ShiftBManagerContactNo,
        ShiftCManagerName: self.addForm.value.ShiftCManagerName,
        ShiftCManagerContactNo: self.addForm.value.ShiftCManagerContactNo,
        ShiftDManagerName: self.addForm.value.ShiftDManagerName,
        ShiftDManagerContactNo: self.addForm.value.ShiftDManagerContactNo,
        OpeBalance: parseFloat(self.addForm.value.OpeBalance),
        ShutdownRemark: self.addForm.value.ShutdownRemark
      }
      self.commonServices.loadingPresent();
      self.commonServices.post("SOInsertUpdate", obj).subscribe((res: any) => {
        const StRes = JSON.parse(res);
        console.log(StRes);
        if (StRes.Table[0].Meaasge == "Station created successfully.") {
          self.commonServices.presentToast(StRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/station-management']);
          }, 2000)
        }
        else if (StRes.Table[0].Meaasge == "Station updated successfully.") {
          self.commonServices.presentToast(StRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/station-management']);
          }, 2000)
        }
        else {
          self.commonServices.presentToast(StRes.Table[0].Meaasge);
          if (StRes.Table[0].Meaasge == '') {
            self.commonServices.presentToast("Something went wrong.");
          }
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })

    }
  }


  validationSO() {
    var re = new RegExp(/^[0-9]*$/);
    var len = new RegExp(/^.{1,50}$/);
    var Ope = /^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$/g;

    if (this.addForm.value.StationCode == '') {
      this.commonServices.presentToast('Station code must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.StationCode.length < 3) {
      this.commonServices.presentToast('Station code must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.StationName == '') {
      this.commonServices.presentToast('Station name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.StationName.length < 3) {
      this.commonServices.presentToast('Station name must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (re.test(this.addForm.value.StationName)) {
      this.commonServices.presentToast('Invalid Station Name.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationAddress == '') {
      this.commonServices.presentToast('Station address must be filled.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationRegionId == '') {
      this.commonServices.presentToast('Region must be selected.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationCompanyId == '') {
      this.commonServices.presentToast('Company must be selected.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationTypeId == '') {
      this.commonServices.presentToast('Station type must be selected.');
      this.errorFound = false;
    }
    else if (this.addForm.value.MoId == '') {
      // this.commonServices.presentToast('Marketing officer must be selected.');
      this.commonServices.presentToast('DSO must be selected.');
      this.errorFound = false;
    }
    else if (this.addForm.value.ControlRoomId == '' || this.addForm.value.ControlRoomId == '--Select Control Room--') {
      this.commonServices.presentToast('Control Room must be selected.');
      this.errorFound = false;
    }
    else if (this.OpeBalance != "0.00") {
    if (!Ope.test(this.addForm.value.OpeBalance) && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Invalid Ope. Balance.');
      this.errorFound = false;
    }}
    else if (this.addForm.value.StationLoginId == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Login Id must be filled.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationPassword == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Station password must be filled.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationConfPassword == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Confirm password must be filled.');
      this.errorFound = false;
    }
    else if (this.addForm.value.StationPassword != this.addForm.value.StationConfPassword && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Password did not matched.');
      this.errorFound = false;
    }
    else if (this.addForm.value.ShiftAManagerContactNo == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift A Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftAManagerName) || this.addForm.value.ShiftAManagerName == "") {
      this.commonServices.presentToast('Shift A Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftAManagerContactNo == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift A Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftAManagerContactNo)) {
      this.commonServices.presentToast('Shift A Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    // else if(this.ShiftAManagerContactNo != ''){
    //   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //   const isValidated = this.ShiftAManagerContactNo.match(phoneno);
    //   if(isNullOrUndefined(isValidated))
    //   {
    //     this.commonServices.presentToast('You have entered an invalid contact no. of Shift D');
    //     return this.errorFound = false;
    //   }
    // }
    else if (this.addForm.value.ShiftBManagerName == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift B Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftBManagerName) || this.addForm.value.ShiftBManagerName == "") {
      this.commonServices.presentToast('Shift B Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftBManagerContactNo == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift B Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftBManagerContactNo)) {
      this.commonServices.presentToast('Shift B Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    // else if(this.ShiftBManagerContactNo != ''){
    //   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //   const isValidated = this.ShiftBManagerContactNo.match(phoneno);
    //   if(isValidated==null)
    //   {
    //     this.commonServices.presentToast('You have entered an invalid contact no. of Shift B');
    //     return this.errorFound = false;
    //   }
    // }
    else if (this.addForm.value.ShiftCManagerName == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift C Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftCManagerName) || this.addForm.value.ShiftCManagerName == "") {
      this.commonServices.presentToast('Shift C Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftCManagerContactNo == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift C Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftCManagerContactNo)) {
      this.commonServices.presentToast('Shift C Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    // else if(this.ShiftCManagerContactNo != ''){
    //   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //   const isValidated = this.ShiftCManagerContactNo.match(phoneno);
    //   if(isValidated==null)
    //   {
    //     this.commonServices.presentToast('You have entered an invalid contact no. of Shift C');
    //     return this.errorFound = false;
    //   } 
    // }

    else if (this.addForm.value.ShiftDManagerName == '' && this.addForm.value.actionFlag == 'Add') {
      this.commonServices.presentToast('Shift D Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftDManagerName) || this.addForm.value.ShiftDManagerName == "") {
      this.commonServices.presentToast('Shift D Manager Name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftDManagerContactNo == '') {
      this.commonServices.presentToast('Shift D Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (isNullOrUndefined(this.addForm.value.ShiftDManagerContactNo)) {
      this.commonServices.presentToast('Shift D Contact No must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    // else if(this.ShiftDManagerContactNo != ''){
    //   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //   const isValidated = this.ShiftDManagerContactNo.match(phoneno);
    //   if(isValidated==null)
    //   {
    //     this.commonServices.presentToast('You have entered an invalid contact no. of Shift D');
    //     return this.errorFound = false;
    //   }
    // }

    else if (this.addForm.value.ShiftAManagerName.length < 3) {
      this.commonServices.presentToast('Shift A Manager Name must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftBManagerName.length < 3) {
      this.commonServices.presentToast('Shift B Manager Name must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftCManagerName.length < 3) {
      this.commonServices.presentToast('Shift C Manager Name must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ShiftDManagerName.length < 3) {
      this.commonServices.presentToast('Shift D Manager Name must be min. 3 character.');
      this.errorFound = false;
      return this.errorFound;
    }
    // else if(this.StationEmailId == ''){
    //   this.commonServices.presentToast('Email Id must be filled.');
    //   this.errorFound = false;
    // }
    // else if(this.StationContactNo == ''){
    //   this.commonServices.presentToast('Contact number must be filled.');
    //   this.errorFound = false;
    // }
    if (this.addForm.value.StationEmailId != '') {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = this.addForm.value.StationEmailId.match(mailformat);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid email address.');
        this.errorFound = false;
      }
    }

    if (this.addForm.value.StationContactNo != '') {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.StationContactNo.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no.');
        this.errorFound = false;
      }
    }

    if (this.addForm.value.ShiftAManagerContactNo != '') {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.ShiftAManagerContactNo.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no. of Shift A');
        return this.errorFound = false;
      }
    }
    if (this.addForm.value.ShiftBManagerContactNo != '') {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.ShiftBManagerContactNo.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no. of Shift B');
        return this.errorFound = false;
      }
    }
    if (this.addForm.value.ShiftCManagerContactNo != '') {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.ShiftCManagerContactNo.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no. of Shift C');
        return this.errorFound = false;
      }
    }
    if (this.addForm.value.ShiftDManagerContactNo != '') {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const isValidated = this.addForm.value.ShiftDManagerContactNo.match(phoneno);
      if (isValidated == null) {
        this.commonServices.presentToast('You have entered an invalid contact no. of Shift D');
        return this.errorFound = false;
      }
    }
    if (this.addForm.value.Status == false) {
      if (this.addForm.value.ShutdownRemark == '') {
        this.commonServices.presentToast('You have entered Shutdown Remark.');
        this.errorFound = false;
      }
    }
    return this.errorFound;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;
}
