import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-add-update-entry-threshhold',
  templateUrl: './add-update-entry-threshhold.page.html',
  styleUrls: ['./add-update-entry-threshhold.page.scss'],
})
export class AddUpdateEntryThreshholdPage implements OnInit {
  userid: any;
  pageFlag: any;
  addForm: any;
  status: any = false;
  errorFound: boolean;
  ThresholdId = '0';
  threshholdbj: any;
  metervisible:boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.threshholdbj = this.activatedroute.snapshot.paramMap.get("threshholdbj");
    this.threshholdbj = JSON.parse(this.threshholdbj);
    if (this.pageFlag == "updateds") {
      if (this.threshholdbj.status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
      this.metervisible = true;
      this.addForm = formBuilder.group({
        MeterType: [this.threshholdbj.MeterType, Validators.required],
        ThresholdValue: [this.threshholdbj.ThresholdValue, Validators.required],
        DaysForAverage: [this.threshholdbj.DaysForAverage, Validators.required],
      });
      this.ThresholdId = this.threshholdbj.Id;
    } else {
      this.addForm = formBuilder.group({
        MeterType: ['', Validators.required],
        ThresholdValue: ['', Validators.required],
        DaysForAverage: ['', Validators.required],
      });
      this.metervisible = false;
    }
  }

  ngAfterContentInit() {
    this.addForm;
  }

  ngOnInit() {
  }

  InsertThreshold() {
    console.log(this.addForm);
    var self = this;

    self.errorFound = true;
    if (self.validationDisp()) {
      const obj = {
        Id: (this.pageFlag == 'updateds') ? this.ThresholdId : '0',
        MeterType: self.addForm.value.MeterType,
        ThresholdValue: self.addForm.value.ThresholdValue,
        DaysForAverage: self.addForm.value.DaysForAverage,
        status: (this.status == true) ? '0' : '1',

      }
      self.commonServices.loadingPresent();
      self.commonServices.post("InsertUpdateEntryThreshold", obj).subscribe((res: any) => {
        const disRes = JSON.parse(res);
        if (disRes.Table[0].Msg.indexOf('successfully') > -1) {
          self.commonServices.presentToast(disRes.Table[0].Msg);
          self.addForm.reset();
          setTimeout(function () {
            self.router.navigate(['/entry-threshhold']);
          }, 1000)
        }
        else {
          self.commonServices.presentToast(disRes.Table[0].Msg);
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
    if (this.addForm.value.MeterType == '') {
      this.commonServices.presentToast('Please enter the Meter Type.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.ThresholdValue == '') {
      this.commonServices.presentToast('Please enter the ThresholdValue.');
      this.errorFound = false;
      return this.errorFound;
    }
    else if (this.addForm.value.DaysForAverage == '') {
      this.commonServices.presentToast('Please enter the Average Days.');
      this.errorFound = false;
      return this.errorFound;
    }
    return this.errorFound;
  }
}