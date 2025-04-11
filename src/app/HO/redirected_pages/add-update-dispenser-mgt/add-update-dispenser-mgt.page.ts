import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-update-dispenser-mgt',
  templateUrl: './add-update-dispenser-mgt.page.html',
  styleUrls: ['./add-update-dispenser-mgt.page.scss'],
})
export class AddUpdateDispenserMgtPage implements OnInit {
  userid: any;
  pageFlag: any;
  addForm: any;
  status: any = false;
  actionFlag: string;
  SelectedStationId: any;
  Dslist: any;
  errorFound: boolean;
  disData = { selcteddate: "" }
  selectedDate: number;
  currDate: any;
  currentdate: any;
  todayTime: Date;
  month: number;
  day: number;
  year: number;
  FulllYear: string;
  updateForm: any;
  singleDslist: any;
  SelectedDispenserId: any;
  CurrentReadingA = 0;
  CurrentReadingB = 0;
  SelectedOrder = '';
  DispenserResList: any;
  title: string;
  DispId = '0';
  dataStationMaster: any[] = [];
  dataDispTypesA: any[] = [];
  FinalDispTypesB = [];
  dataDispTypesB: any[] = []
  jsonOrder = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
    { text: '6', value: '6' },
    { text: '7', value: '7' },
    { text: '8', value: '8' },
    { text: '9', value: '9' },
    { text: '10', value: '10' },
    { text: '11', value: '11' },
    { text: '12', value: '12' },
    { text: '13', value: '13' },
    { text: '14', value: '14' },
    { text: '15', value: '15' },
    { text: '16', value: '16' },
    { text: '17', value: '17' },
    { text: '18', value: '18' },
    { text: '19', value: '19' },
    { text: '20', value: '20' }
  ];
  fiterBox: boolean = false;
  filterBoxFlag: number = 0;
  isItemAvailable: boolean;
  items: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public datepipe: DatePipe,
    public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    // this.Dslist=JSON.parse(this.activatedroute.snapshot.paramMap.get("arrayItem"));
    // this.singleDslist=JSON.parse(this.activatedroute.snapshot.paramMap.get("singlearrayItem"));


    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.disData.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      //IOS Comment
      // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      // this.disData.selcteddate = latest_date;
      //IOS Add
      this.disData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    }
    else {
      this.selectedDate = new Date(this.disData.selcteddate).setDate(new Date(this.disData.selcteddate).getDate());
      this.todayTime = new Date(this.currDate);
      this.month = this.todayTime.getMonth() + 1;
      this.day = this.todayTime.getDate();
      this.year = this.todayTime.getFullYear();
      this.FulllYear = this.year + "-" + this.month + "-" + this.day;

    }

    this.addForm = formBuilder.group({
      DispenserName: ['', Validators.required],
      DispenserCodeA: ['', Validators.required],
      DispenserCodeB: ['', Validators.required],
      DispenserTypeIdA: ['', Validators.required],
      DispenserTypeIdB: ['', Validators.required],
      StationId: ['', Validators.required],
      EffectiveDate: [this.disData.selcteddate, Validators.required],
      // Status: this.status,
      CurrentReadingA: [this.CurrentReadingA, Validators.required],
      CurrentReadingB: [this.CurrentReadingB, Validators.required],
      // OrderBy: ['', Validators.required]

      stCodeMy: ['', Validators.required]
    })

  }
  ngAfterContentInit() {
    this.addForm;
  }

  ngOnInit() {
    this.DispId = JSON.parse(this.activatedroute.snapshot.paramMap.get("dispId"));
    this.getDispenserListBYId(this.DispId)
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  // get Date

  getSelectedDate(datePicker) {
    console.log("datePicker", datePicker);

    const dt = new Date(datePicker);
    //IOS Comment
    // let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.disData.selcteddate = latest_date;
    //IOS Add
    this.disData.selcteddate = this.datepipe.transform(dt, 'yyyy/MM/dd');
    this.Insertstation();
  }

  getDispenserListBYId(DispId) {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'DispenserById', Id: DispId })
      .subscribe((res: any) => {
        if (DispId == 0) {
          stCodeMy: [self.DispenserResList.StationCode]
          self.items = self.dataStationMaster;
        }
        else {
          var DispenserRes = JSON.parse(res);

          if (DispenserRes.Table.length > 0) {
            self.DispenserResList = DispenserRes.Table[0];
          }
          else {
            self.DispenserResList = DispenserRes.Table
          }

          console.log(self.DispenserResList);
          self.dataStationMaster = DispenserRes.Table1;
          self.items = self.dataStationMaster;
          self.dataDispTypesA = DispenserRes.Table2;
          self.dataDispTypesB = DispenserRes.Table2;
          self.FinalDispTypesB.push({ 'DispanserTypeId': 0, 'DispanserTypeCode': 'None' });
          self.dataDispTypesB.forEach((element, i) => {
            self.FinalDispTypesB.push({ 'DispanserTypeId': element.DispanserTypeId, 'DispanserTypeCode': element.DispanserTypeCode })
          })

        }
        // if (this.DispenserResList != "" && this.DispenserResList != undefined) {
        self.addForm = self.formBuilder.group({
          DispenserName: [self.DispenserResList.DispenserName, Validators.required],
          DispenserCodeA: [self.DispenserResList.DispenserCodeA, Validators.required],
          DispenserCodeB: [self.DispenserResList.DispenserCodeB, Validators.required],
          DispenserTypeIdA: [self.DispenserResList.DispenserTypeIdA, Validators.required],
          DispenserTypeIdB: [self.DispenserResList.DispenserTypeIdA, Validators.required],
          StationId: [self.DispenserResList.StationId, Validators.required],
          EffectiveDate: [self.DispenserResList.EffectiveDate, Validators.required],
          // Status: self.status,
          CurrentReadingA: [self.DispenserResList.CurrentReadingA, Validators.required],
          CurrentReadingB: [self.DispenserResList.CurrentReadingB, Validators.required],
          // OrderBy: [self.DispenserResList.OrderBy, Validators.required]


          stCodeMy: [self.DispenserResList.StationCode, Validators.required]
        });
        if (self.DispenserResList.StatusSort == 'Inactive') {
          this.status = false;
        } else {
          this.status = true;
          //}
        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })

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

    if (self.DispId != '0') {
      self.actionFlag = 'Update';
      self.SelectedDispenserId = self.DispId;
    }
    else {
      self.title = 'Add Dispenser';
      self.actionFlag = 'Add';
      self.SelectedDispenserId = '0';
    }
    if (self.validationDisp()) {
      const obj = {
        DispenserId: (this.actionFlag == 'Update') ? this.SelectedDispenserId : '0',
        DispenserName: self.addForm.value.DispenserName,
        DispenserCodeA: self.addForm.value.DispenserCodeA,
        DispenserCodeB: self.addForm.value.DispenserCodeB,
        DispenserTypeIdA: self.addForm.value.DispenserTypeIdA,
        DispenserTypeIdB: self.addForm.value.DispenserTypeIdB,
        StationId: self.addForm.value.StationId,
        EffectiveDate: self.addForm.value.EffectiveDate,
        Status: statusToggle,
        CurrentReadingA: self.CurrentReadingA,
        CurrentReadingB: self.addForm.value.CurrentReadingB,
        // OrderBy: self.addForm.value.OrderBy,
        OrderBy: 0,
      }
      self.commonServices.loadingPresent();
      self.commonServices.post("DispencerMaster", obj).subscribe((res: any) => {
        const disRes = JSON.parse(res);
        if (disRes.Table[0].Meaasge == "Dispenser mapped successfully.") {
          self.commonServices.presentToast(disRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/dispenser-management']);
          }, 2000
          )
        }
        else if (disRes.Table[0].Meaasge == "Dispenser updated successfully.") {
          self.commonServices.presentToast(disRes.Table[0].Meaasge);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/dispenser-management']);
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

  validationDisp() {
    var specials = /[*|\":<>[\]{}`\\()';@&$~!]/;
    var re = new RegExp(/^[a-zA-Z0-9_]*$/);

    if (this.addForm.value.DispenserName == '') {
      this.commonServices.presentToast('Dispenser name must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (specials.test(this.addForm.value.DispenserName)) {
      this.commonServices.presentToast('Invalid Dispenser Name.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (re.test(this.addForm.value.DispenserName)) {
      this.commonServices.presentToast('Invalid Dispenser Name.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.DispenserCodeA == '') {
      this.commonServices.presentToast('Please select Dispenser Type Code A.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.DispenserCodeA == '') {
      this.commonServices.presentToast('Dispenser Code A must be filled.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.DispenserCodeB == '') {
      this.commonServices.presentToast('Please select Dispenser Type Code B.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.StationId == '') {
      this.commonServices.presentToast('Please select station.');
      this.errorFound = false;
      return this.errorFound;
    }
    // if (this.addForm.value.OrderBy == '' || this.addForm.value.OrderBy == null || isUndefined(this.addForm.value.OrderBy) || this.addForm.value.OrderBy == '0') {
    //   this.commonServices.presentToast('Order must be selected.');
    //   this.errorFound = false;
    //   return this.errorFound;
    // }
    return this.errorFound;
  }
  filterBoxShow(itm) {
    var self = this;
    if (self.filterBoxFlag == 0) {
      self.fiterBox = true;
      self.filterBoxFlag = 1;
    }
    else {
      self.fiterBox = false;
      self.filterBoxFlag = 0;
      self.DispenserResList.StationCode = itm.StationCode;
      self.DispenserResList.StationId = itm.StationId;
      console.log(this.DispenserResList.StationCode);
      self.getDispenserListBYId(0);
    }
  }

  onSearchTerm(ev: any) {
    this.items = this.dataStationMaster;
    const val = ev.detail.value;
    if (val && val.trim() !== '') {
      this.items = this.items.filter(term => {
        return term.StationCode.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
}
