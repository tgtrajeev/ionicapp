import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lcvvehicle',
  templateUrl: './lcvvehicle.page.html',
  styleUrls: ['./lcvvehicle.page.scss'],
})
export class LCVvehiclePage implements OnInit {
  CurrentDate: string = '';
  DateFrom: string;
  DateTo: string;
  DateFromMy: any = new Date().toISOString().split('T')[0];
  secondMaxDate: any = new Date().toISOString();
  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  userData: any = '';
  DepartmentCode: string = localStorage.getItem('DepartmentCode');
  UserId: string = localStorage.getItem('UID');
  isstationfrom:boolean=true;
  stCodeMy:"";
  listStation: any;
  SelectedStationCode: any;
  filterBoxFlag: number = 0;
  fiterBox: boolean = false;
  StationName:string="";
  LCVKG :any;
  Trips :any;
  Remark:string="";
  SelectedlcvId:string='';
  flag: string;
  LCVNO:String;
  filterItem: any;
  filteredListStation: any;
  Stationfrom: any;
  lcvlist: any;
  stationCode: any;
  errorFound: boolean;
  constructor(private router: Router,private menu: MenuController,
    private datepipe: DatePipe,public commonServices: ApiService,private alertCtrl: AlertController) {
      this.userData = JSON.parse(localStorage.getItem('userDataR'));
      this.Stationfrom =this.userData.StationName;
      this.stationCode = localStorage.getItem('stationCode');
      console.log(this.stationCode);
     }

  ngOnInit() {
    const dt = new Date();
    this.CurrentDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    this.DateFrom = new Date().toLocaleDateString();
    // this.DateTo = new Date().toLocaleDateString();
    this.DateFrom = this.datepipe.transform(dt, 'yyyy/MM/dd');
    // this.DateTo = this.datepipe.transform(dt, 'yyyy/MM/dd');
    this.getstationlist();
    this.getlcvlist();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  getstationlist() {
    this.commonServices.post('CommonGetData',{Flag:'Stationforlcvvehicle'}).subscribe(
      (resp: any) => 
      { 
        this.listStation=JSON.parse(resp).Table;
        this.filteredListStation = this.listStation;
        console.log(this.listStation, "listStation");        
      },
      (error) => {
        alert("Something went wrong.");
      }
    )
  }

  getlcvlist() {
    this.commonServices.postwithservice("getlcvlist",{flag:'get',Fromstation:this.stationCode,Entrydate:this.DateFrom}).subscribe(
      (resp: any) => { 
        this.lcvlist=JSON.parse(resp).Table;
        console.log(this.lcvlist, "lcvlist");
        const retData = JSON.parse(resp).Table[0];
      },
      (error) => {alert("Something went wrong.");
      }
    )
  }

  filterBoxShow(itm) {
    if(this.filterBoxFlag == 0) {
      this.fiterBox = !this.fiterBox;
      this.filterBoxFlag = 1;
    }   
    else {
      this.filterBoxFlag = 0;
      this.fiterBox = false;
      this.stCodeMy = itm.StationName;
      this.SelectedStationCode=itm.StationCode;
      console.log(this.stCodeMy);
    }
  }

  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    self.DateFrom = this.datepipe.transform(dt, 'yyyy/MM/dd');
    console.log(self.DateFrom);
    if ((new Date(self.DateTo)) < (new Date(self.DateFrom))) {
      console.log("Time");
      this.DateTo = this.DateFrom.split('T')[0];
    }
    this.getstationlist();
    this.getlcvlist();
  }

  
  filterStations() {
    console.log(this.filterItem);

    
    if (!this.filterItem || this.filterItem.trim() === '') {
      this.filteredListStation = this.listStation;
    } else {
      this.filteredListStation = this.listStation.filter(itm => 
        itm.StationName.toLowerCase().includes(this.filterItem.toLowerCase())
      );
    }
}

async Deletelcv(Id: string) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this record?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Delete canceled');
        }
      },
      {
        text: 'OK',
        handler: () => {
          // Proceed with the deletion if 'OK' is pressed
          const Json = {
            id: Id
          };
          this.commonServices.postwithservice("Deletelcv",Json).subscribe(
            async (resp: any) => {
              const data = JSON.parse(resp);
              const successAlert = await this.alertCtrl.create({
                header: 'Success',
                message: data.Table[0].msg,
                buttons: ['OK']
              });
              await successAlert.present();
              this.getlcvlist();
            },
            async (error) => {
              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Something went wrong.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          );
        }
      }
    ]
  });

  await alert.present();
}

InsertLCVVehicl(){  
  // alert(this.stCodeMy);
  // alert(this.SelectedStationCode);
  this.errorFound = true;
  if(this.flag  == '' || this.flag == undefined){
    this.flag = 'Insert'
  }
  if(this.Validationlcv()) {  
    const obj = {
      Id:(this.flag == 'Update') ? this.SelectedlcvId : '0',
      Tostation:this.SelectedStationCode,
      EntryDate:this.DateFrom,
      Fromstation:this.stationCode,
      LCVKG:this.LCVKG,
      Tripsoflcv:this.Trips,
      Remarks:this.Remark,
      LCVNO:this.LCVNO,
      flag:this.flag,
     };
     console.log(obj,'flag');
     this.commonServices.postwithservice("InsertLCVdata",obj).subscribe(
      (resp: any) => { 
        this.commonServices.presentToast(JSON.parse(resp)[0].msg);
        this.SelectedStationCode='';
             this.stCodeMy='';
             this.LCVKG='';
             this.flag='';
             this.Trips='';
             this.Remark='';
             this.LCVNO='';
        this.getlcvlist();
       
      },
      (error) => {this.commonServices.presentToast("Something went wrong.");
      }
    )
}
}

Validationlcv(){
  var re = new RegExp(/^[a-zA-Z ]*$/);
  var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
  var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
  if(this.SelectedStationCode == '' || this.SelectedStationCode==undefined){
    alert('To Station Name must be selected.');
    this.errorFound = false;
    }
  else if (this.LCVKG == '' || this.LCVKG==undefined) {
    alert('LCV KG must be entered.');
    this.errorFound = false;
  }
  else if(regexNumeric.test(this.LCVKG) == false){
    alert('only Number allowed in LCVKG.');
    this.errorFound = false; 
  }
  else if (this.Trips == '' || this.Trips==undefined) {
    alert('NO.of trips must be entered.');
    this.errorFound = false;
  }
  else if(regexNumeric.test(this.Trips) == false){
    alert('only Number allowed in Trips.');
    this.errorFound = false;
  }
  else if (this.LCVNO == '' || this.LCVNO==undefined) {
    alert('LCV NO must be entered.');
    this.errorFound = false;
  }
return this.errorFound;
}


Edit(itm)
{ console.log(itm);
  this.stCodeMy= '';
  this.SelectedlcvId = itm.id;
  this.Stationfrom= itm.Fromstation;
  this.stCodeMy= itm.Tostation;
  this.LCVKG=itm.LCVKG;
  this.Trips=itm.Trips;
  this.Remark=itm.Remarks;
  this.LCVNO=itm.LCVNO;
  this.SelectedStationCode = itm.FromStationCode
  this.flag = 'Update'
}
}
