import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-add-update-rate-mgt',
  templateUrl: './add-update-rate-mgt.page.html',
  styleUrls: ['./add-update-rate-mgt.page.scss'],
})
export class AddUpdateRateMgtPage implements OnInit {
  rateDate = { selcteddate: "" }
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  actionFlag: string = '';
  title: string;
  obj: any;
  dataRegionMaster: {}[];
  MinDate: string = '';
  Cdate = '';
  RateId: string = '';
  SelectedRateId: string = '';
  RateRes: any;
  currentdate: any;
  currDate: any;
  selectedDate: any;
  todayTime: any;
  month: any;
  day: any;
  year: any;
  FulllYear: any;
  datePicker = '';
  minDateRate: any = new Date().toISOString();
  maxDaterate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toISOString();
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.currentdate = new Date().toISOString().split('T')[0];
    if (this.rateDate.selcteddate == "") {
      this.currDate = this.currentdate;
      console.log(this.currDate)
      const dt = new Date(this.currDate);
      let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
      this.rateDate.selcteddate = latest_date;
    }


    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      RegionId: ['', Validators.required],
      NormalRate: ['', Validators.required],
      DisountedRate: ['', Validators.required],
      EffectiveDate: [this.rateDate.selcteddate, Validators.required],
      UserId: this.userid,
      EffectiveTime: ['', Validators.required]
    })
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  ngAfterContentInit() {
    this.getRateListById(this.RateId);
  }

  ngOnInit() {
    this.RateId = JSON.parse(this.activatedroute.snapshot.paramMap.get('RateId'));
    this.getRateListById(this.RateId);
    this.GetCdate();
  }
  getRateListById(RateId: string) {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData", { Flag: 'RateListById', Id: RateId })
      .subscribe((res: any) => {

        if (JSON.parse(res).Table.length > 0) {
          const retData = JSON.parse(res).Table[0];
          this.addupdateForm = self.formBuilder.group({
            RegionId: [retData.RegionId, Validators.required],
            NormalRate: [retData.NormalRate, Validators.required],
            DisountedRate: [retData.DisountedRate, Validators.required],
            EffectiveDate: [retData.EffectiveDate1, Validators.required],
            UserId: this.userid,
            EffectiveTime: [retData.EffectiveTime, Validators.required]
          })
        }
        this.dataRegionMaster = JSON.parse(res).Table1;
        this.MinDate = JSON.parse(res).Table2[0].FMinDate;
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        }
      )
  }

  GetCdate() {
    var self = this;
    self.commonServices.post("CommonGetData", { Flag: 'Cdate', Id: 0 }).subscribe((res: any) => {
      this.Cdate = JSON.parse(res).Table[0].Cdate;
    }
    )
  }

  getSelectedDate(datePicker) {
    console.log("datePicker", datePicker);
    if (datePicker != "") {
      const dt = new Date(datePicker);
      let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

      this.rateDate.selcteddate = latest_date;
      //datePicker.open();
      // this.insertUpdateData();
    }
    else {
      const dt = new Date(this.addupdateForm.value.EffectiveDate);
      let latest_date = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();

      this.rateDate.selcteddate = latest_date;
    }

  }

  insertUpdateData() {
    var self = this;
    self.getSelectedDate(self.datePicker)

    if (self.RateId == '') {
      self.title = 'Add Rate';
      self.actionFlag = 'Add';
      self.SelectedRateId = '0';
    }

    else {
      self.title = 'Update Station';
      self.actionFlag = 'Update';
      self.SelectedRateId = self.RateId;
    }
    self.obj = {
      RateId: (self.actionFlag == 'Update') ? self.SelectedRateId : '0',
      RegionId: self.addupdateForm.value.RegionId,
      NormalRate: self.addupdateForm.value.NormalRate,
      DisountedRate: self.addupdateForm.value.DisountedRate,
      EffectiveDate: self.rateDate.selcteddate,
      UserId: self.userid,
      EffectiveTime: self.addupdateForm.value.EffectiveTime
    }
    self.errorFound = true;
    if (self.ValidationRate()) {
      self.commonServices.loadingPresent();
      self.commonServices.post("RateMaster", self.obj).subscribe((res: any) => {
        self.RateRes = (JSON.parse(res));
        console.log(self.RateRes);
        if (self.RateRes.Table[0].Meaasge == "Rate inserted successfully.") {
          self.commonServices.presentToast(self.RateRes.Table[0].Meaasge);
          self.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/rate-management']);
          }, 2000)
        }

        else if (self.RateRes.Table[0].Meaasge == "Rate updated successfully.") {
          self.commonServices.presentToast(self.RateRes.Table[0].Meaasge);
          self.addupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/rate-management']);
          }, 2000)
        }
        else {
          self.commonServices.presentToast(self.RateRes.Table[0].Meaasge);

        }
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }

  ValidationRate() {
    if (this.addupdateForm.value.RegionId == '') {
      this.commonServices.presentToast('Region must be selected.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.NormalRate == '') {
      this.commonServices.presentToast('Normal Rate must be entered.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.DisountedRate == '') {
      this.commonServices.presentToast('Discounted Rate must be entered.');
      this.errorFound = false;
    }

    const decimal = /^[-+]?[0-9]+\.[0-9]+$/;
    if (this.addupdateForm.value.NormalRate != '') {
      if (!isNaN(parseFloat(this.addupdateForm.value.NormalRate))) {
        if (parseFloat(this.addupdateForm.value.NormalRate) <= 0) {
          this.commonServices.presentToast('Rate must be greater then zero');
          this.errorFound = false;
        }
      }
      else {
        this.commonServices.presentToast('Please enter valid Normal Rate.');
        this.errorFound = false;
      }
    }
    if (this.addupdateForm.value.DisountedRate != '') {
      if (!isNaN(parseFloat(this.addupdateForm.value.DisountedRate))) {
        if (parseFloat(this.addupdateForm.value.DisountedRate) <= 0) {
          this.commonServices.presentToast('Disounted Rate must be greater then zero');
          this.errorFound = false;
        }
      }
      else {
        this.commonServices.presentToast('Please enter valid Discounted Rate.');
        this.errorFound = false;
      }
    }
    if (this.addupdateForm.value.DisountedRate != '' && this.addupdateForm.value.NormalRate != '') {
      if (parseFloat(this.addupdateForm.value.NormalRate) < parseFloat(this.addupdateForm.value.DisountedRate)) {
        this.commonServices.presentToast('Normal Rate must be greater/equal than discounted rate');
        this.errorFound = false;
      }
    }
    if (this.addupdateForm.value.EffectiveTime == '') {
      this.commonServices.presentToast('Effective Time must be Selected.');
      this.errorFound = false;
    }
    return this.errorFound;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

}


