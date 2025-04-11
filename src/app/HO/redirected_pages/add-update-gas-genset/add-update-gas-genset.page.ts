import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-update-gas-genset',
  templateUrl: './add-update-gas-genset.page.html',
  styleUrls: ['./add-update-gas-genset.page.scss'],
})

export class AddUpdateGasGensetPage implements OnInit {
  pageFlag: string;
  addupdateForm: any;
  status: any = false;
  errorFound: boolean;
  userid: string;
  flag: string = '';
  title: string;
  obj: any;
  GenSetId: string = '';
  listStation: any[];
  gsetlist: any;
  gsetRes: any;
  fiterBox:boolean = false;
  filterBoxFlag:number = 0;
  isItemAvailable: boolean;
  items: any;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService) {

    this.pageFlag = this.activatedroute.snapshot.paramMap.get("pageFlag");
    this.userid = localStorage.getItem("UID");
    this.addupdateForm = formBuilder.group({
      StationCode: ['', Validators.required],
      StationId: ['', Validators.required],
      GenSetCode: ['', Validators.required],
      GenSetName: ['', Validators.required],
      Description: ['', Validators.required],
      LoginId: this.userid,
      // status: this.status,
      stCodeMy:['', Validators.required]
    })
  }
 
  ngAfterContentInit() {
   
      this.updateGset();
    
  }
  ngOnInit() {
    this.gsetlist = JSON.parse(this.activatedroute.snapshot.paramMap.get('gsetlist'));
    this.getStationList();
   
  }


  updateGset() {
    var self = this;

    if (self.pageFlag == "updatepage" && self.gsetlist != "" && self.gsetlist != undefined && self.gsetlist != null) {
      self.addupdateForm = self.formBuilder.group({
        StationCode: [self.gsetlist.StationCode, Validators.required],
        StationId: [self.gsetlist.StationId, Validators.required],
        GenSetCode: [self.gsetlist.GenSetCode, Validators.required],
        GenSetName: [self.gsetlist.GasGenSetName, Validators.required],
        Description: [self.gsetlist.Description, Validators.required],
        LoginId: this.userid,
        // status: this.status,
        stCodeMy:[self.gsetlist.StationName, Validators.required]
      });
      if (self.gsetlist.status == 'Inactive') {
        this.status = false;
      } else {
        this.status = true;
      }

    }
    // else if(self.gsetlist==null)
    // {
    //  return true;
    // }
    else if(self.gsetlist=!null && self.addupdateForm.value.StationCode !='')
     {
      // self.addupdateForm = self.formBuilder.group({
      //   StationCode: [self.addupdateForm.value.StationCode, Validators.required],
      //   // StationId: [self.gsetlist.StationId, Validators.required],
      //   // GenSetCode: [self.gsetlist.GenSetCode, Validators.required],
      //   // GenSetName: [self.gsetlist.GasGenSetName, Validators.required],
      //   // Description: [self.gsetlist.Description, Validators.required],
      //   // LoginId: this.userid,
      //   // // status: this.status,
      //   stCodeMy:[self.addupdateForm.value.StationName, Validators.required]
      // });
      self.addupdateForm.patchValue({
        StationCode: self.addupdateForm.value.StationCode,
        stCodeMy: self.addupdateForm.value.StationName
      });
    }
  }

  getStationList() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetGensetMaster", { Status: "" }).subscribe((res: any) => {
      var gassetRes = JSON.parse(res);
      if (gassetRes != "" && gassetRes != undefined && gassetRes != null) {
        self.listStation = gassetRes.Table1;
        console.log(self.listStation);
        self.items=self.listStation;
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

  insertUpdateData() {
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
      self.GenSetId = self.gsetlist.GenSetId;
      self.obj = {
        GenSetId: (self.flag == 'U') ? self.GenSetId : '0',
        StationCode: self.addupdateForm.value.StationCode,
        //StationId: self.addupdateForm.value.StationId,
        GenSetCode: self.addupdateForm.value.GenSetCode,
        GenSetName: self.addupdateForm.value.GenSetName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        status: statusToggle,
      };
      if (self.ValidationGenSet()) {
        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("updateGensetMaster", self.obj).subscribe((res: any) => {
          self.gsetRes = (JSON.parse(res));
          console.log(self.gsetRes);
          if (self.gsetRes.Status == "Data updated successfully.") {
            self.commonServices.presentToast(self.gsetRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/gas-genset1']);
            }, 2000)
          }
          else {
            self.commonServices.presentToast(self.gsetRes.Status);
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
        GenSetId: (self.flag == 'U') ? self.GenSetId : '0',
        StationCode: self.addupdateForm.value.StationCode,
       // StationId: self.addupdateForm.value.StationId,
        GenSetCode: self.addupdateForm.value.GenSetCode,
        GenSetName: self.addupdateForm.value.GenSetName,
        Description: self.addupdateForm.value.Description,
        LoginId: self.userid,
        status: statusToggle
      };
      if (self.ValidationGenSet()) {

        self.commonServices.loadingPresent();
        self.commonServices.postwithservice("insertGensetMaster", self.obj).subscribe((res: any) => {
          self.gsetRes = (JSON.parse(res));
          console.log(self.gsetRes);
          if (self.gsetRes.Status == "Data inserted successfully.") {
            self.commonServices.presentToast(self.gsetRes.Status);
            self.addupdateForm.reset();
            setTimeout(function () {
              self.router.navigate(['/gas-genset1']);
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

  ValidationGenSet() {
    var Numreg = new RegExp(/^[0-9]*$/gm);
    var Streg = new RegExp(/^[a-zA-Z ]*$/);

    if (this.addupdateForm.value.StationCode == '') {
      this.commonServices.presentToast('Station must be selected.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.GenSetCode == '') {
      this.commonServices.presentToast('Please enter the GenSet Code.');
      this.errorFound = false;
    }
    else if (!Streg.test(this.addupdateForm.value.GenSetName)) {
      this.commonServices.presentToast('Invalid Genset Name.');
      this.errorFound = false;
    }
    else if (this.addupdateForm.value.GenSetName == '') {
      this.commonServices.presentToast('Please enter the GenSet Name.');
      this.errorFound = false;
    }
    return this.errorFound;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

  filterBoxShow(itm) {
    if(this.filterBoxFlag == 0) {
      this.fiterBox = true;
      this.filterBoxFlag = 1;
    }   
    else {
      this.fiterBox = false;
      this.filterBoxFlag = 0;
      if(this.gsetlist!= null && this.pageFlag == 'updatepage')
      {
        this.gsetlist.StationName = itm.StationName;
      this.gsetlist.StationCode=itm.StationCode;
      this.gsetlist.StationId=itm.StationId;
      console.log(this.addupdateForm.stCodeMy);
      }
      else{
        this.addupdateForm.value.StationCode=itm.StationCode;
        this.addupdateForm.value.StationName=itm.StationName;
      }
    
      this.updateGset();
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