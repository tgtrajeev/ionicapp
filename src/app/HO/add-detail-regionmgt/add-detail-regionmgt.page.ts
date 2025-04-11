import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-detail-regionmgt',
  templateUrl: './add-detail-regionmgt.page.html',
  styleUrls: ['./add-detail-regionmgt.page.scss'],
})
export class AddDetailRegionmgtPage implements OnInit {
  status: any = false;
  AddupdateForm: any;
  regionlist: any;
  errorFound: boolean;
  actionFlag: string = '';
  SelectedRegionId: string = '';
  userid: string;
  title: string = '';
  pageName: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {
    this.userid = localStorage.getItem("UID");
    this.AddupdateForm = formBuilder.group({
      regionname: ['', Validators.required]
    })
  }

  ngAfterContentInit() {
    if (this.pageName == "updatepage") {
      this.AddupdateForm = this.formBuilder.group({
        regionname: [this.regionlist.RegionName, Validators.required]
      })
    }
  }

  ngOnInit() {
    this.regionlist = JSON.parse(this.activatedroute.snapshot.paramMap.get("regionlist"));
    console.log(this.regionlist);
    this.pageName = this.activatedroute.snapshot.paramMap.get("pageName");
    
    if (this.pageName == "updatepage") {
      if (this.regionlist.Status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }
    }
  }

  InsertupdateRegion() {
    var self = this;
    var statusToggle = 2;
    if (self.status == false) {
      statusToggle = 2;
    }
    else {
      statusToggle = 1;
    }

    if (self.regionlist == null) {
      self.title = 'Add Region';
      self.actionFlag = 'Add';
      self.SelectedRegionId = '0';
    }
    else {
      self.title = 'Update Region';
      self.actionFlag = 'Update';
      self.SelectedRegionId = self.regionlist.RegionId;
    }

    self.errorFound = true;
    if (self.ValidationRegion()) {
      const obj = {
        RegionId: (self.actionFlag == 'Update') ? self.SelectedRegionId : '0',
        RegionName: self.AddupdateForm.value.regionname,
        Status: statusToggle,
        UserId: self.userid
      };
      self.commonServices.loadingPresent();

      self.commonServices.post("RegionInsertUpdate", obj).subscribe((res: any) => {
        var regionUpdate = JSON.parse(res);
        console.log(regionUpdate);
        if (regionUpdate.Table[0].Meaasge == "Region updated successfully.") {
          self.commonServices.presentToast(regionUpdate.Table[0].Meaasge);
          self.AddupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/region-mgt']);
          }, 2000)
        }
        else if (regionUpdate.Table[0].Meaasge == "Region inserted successfully.") {
          self.commonServices.presentToast(regionUpdate.Table[0].Meaasge);
          self.AddupdateForm.reset();
          setTimeout(function () {
            self.router.navigate(['/region-mgt']);
          }, 2000)
        }
        else {
          self.commonServices.presentToast(regionUpdate.Table[0].Meaasge);
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

  ValidationRegion() {
    if (this.AddupdateForm.value.regionname == "") {
      this.commonServices.presentToast('Region must be entered.');
      this.errorFound = false;
    }
    return this.errorFound;
  }
  //validation end

}
