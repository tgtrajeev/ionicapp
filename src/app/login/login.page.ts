import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
// import { Storage } from '@ionic/storage';
// declare var $:any;
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  ishidden = true;

  // stationCode: string ='1001-CNG-1000-ST001';
  // password: string='Rahul123';
  // employeeId: string='123';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private router: Router,
    public commonServices: ApiService, public events: Events,public menuCtrl: MenuController) {

    this.loginForm = formBuilder.group({
      loginid: ['', Validators.required],
      employeecode: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  //   doLogin()
  //   {
  //   var self=this;
  //   if(self.loginForm.value.loginid=="") {
  //     self.commonServices.presentToast('Please Enter Login Id');
  //     return;
  //   }
  //  else if(self.loginForm.value.employeecode=="" && self.loginForm.value.loginid != "admin") {
  //     self.commonServices.presentToast('Please Enter Employee Code');
  //     return;
  //   }
  //   else if(self.loginForm.value.password=="") {
  //     self.commonServices.presentToast('Please Enter Password');
  //     return;
  //   }
  //   else{
  //     localStorage.setItem('LoginCode', self.loginForm.value.loginid);
  //   var loginReq ={Loginid:self.loginForm.value.loginid,EmployeeCode:self.loginForm.value.employeecode,Password:self.loginForm.value.password}
  //   self.commonServices.post("ValidateUser",loginReq).subscribe((res:any) =>{
  //     var loginRes=JSON.parse(res);
  //     console.log(loginRes);
  //     localStorage.setItem('DepartmentCode', loginRes[0].DepartmentCode);
  //     localStorage.setItem("UID",loginRes[0].UserId);
  //     localStorage.setItem('Loginidd', loginRes[0].LoginId);
  //     localStorage.setItem("StationId",loginRes[0].StationId);
  //     localStorage.setItem('globalDetail', JSON.stringify(loginRes[0]));
  //     localStorage.setItem('stationCode', loginRes[0].StationCode);
  //     localStorage.setItem("LoginId",loginRes[0].StationCode);

  //     localStorage.setItem("UID",loginRes[0].UserId);

  //     if(loginRes[0].DepartmentCode=="HO")
  //     {
  //       console.log(loginRes);
  //       self.router.navigate(['/admin-home']);
  //     }

  //     else if(loginRes[0].DepartmentCode=="MO")
  //     {
  //       self.router.navigate(['/mo-dashboard']);
  //     }
  doLogin() {
    var self = this;
    if (self.loginForm.value.loginid == "") {
      self.commonServices.presentToast('Please Enter Login Id');
      return;
    }
    else if (self.loginForm.value.employeecode == "" && self.loginForm.value.loginid != "admin") {
      self.commonServices.presentToast('Please Enter Employee Code');
      return;
    }
    else if (self.loginForm.value.password == "") {
      self.commonServices.presentToast('Please Enter Password');
      return;
    }
    else {
      localStorage.setItem('LoginCode', self.loginForm.value.loginid);
      var loginReq = {
         Loginid: self.loginForm.value.loginid, 
         EmployeeCode: self.loginForm.value.employeecode, 
         Password: self.loginForm.value.password 
        }
      self.commonServices.loadingPresent();
      self.commonServices.post("ValidateUser", loginReq).subscribe((res: any) => {
        var loginRes = JSON.parse(res);
        if(loginRes[0].Status == 1){
          self.commonServices.presentToast("Station is Inactive,To Login please connect with H.O..!!");
          self.commonServices.loadingDismiss();
          return;
        }
        console.log('loginrea');
        console.log(loginRes);
        localStorage.setItem('DepartmentCode', loginRes[0].DepartmentCode);
        localStorage.setItem("UID", loginRes[0].UserId);
        localStorage.setItem('Loginidd', loginRes[0].LoginId);
        localStorage.setItem("StationId", loginRes[0].StationId);
        localStorage.setItem('globalDetail', JSON.stringify(loginRes[0]));
        localStorage.setItem('stationCode', loginRes[0].StationCode);
        localStorage.setItem("LoginId", loginRes[0].StationCode);
        localStorage.setItem("UID", loginRes[0].UserId);
        // localStorage.setItem("userDataR",JSON.stringify(loginRes[0]));
        // console.log(loginRes);
        // this.events.publish('user:created', loginRes);

        this.sideMenuData(loginRes[0].UserId);

        if (loginRes[0].DepartmentCode == "HO") {
          console.log(loginRes);
          self.navCtrl.navigateRoot(['/admin-home']);
        }

        else if (loginRes[0].DepartmentCode == "MO") {
          self.navCtrl.navigateRoot('/mo-dashboard');
        }

        else if (loginRes[0].DepartmentCode == "CO") {
          self.navCtrl.navigateRoot(['/co-dashboard']);
        }

        else if (loginRes[0].DepartmentCode == "SO") {
          self.navCtrl.navigateRoot(['/home']);
        }
        
        else if (loginRes[0].DepartmentCode == "SOP") {
          self.navCtrl.navigateRoot(['/so-dashboard']);
        }

        else {
          self.commonServices.presentToast(loginRes[0].Meaasge);
        }
        self.GetStationDetail();
        self.commonServices.loadingDismiss();
      },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        })
    }
  }

  GetStationDetail() {
    var MyJson = { LoginId: this.loginForm.value.loginid };
    this.commonServices.postwithservice("GetStationDetail", MyJson).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        console.log(data.Table);
        console.log("datatable");
        localStorage.setItem('globalDetail', JSON.stringify(data.Table));
        localStorage.setItem('leftMenus', JSON.stringify(data.Table1));
        localStorage.setItem('StationMenus', JSON.stringify(data.Table2));
        localStorage.setItem('AllStation', JSON.stringify(data.Table3));
        //this.loaderLogin = false;
        //window.location.href = JSON.parse(response.data).Table1[0].goFor;             
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");

      }
    )
  }
  sideMenuData(userID) {
    var self = this;
    self.commonServices.post("getHeader", {
      UserID: userID
    }).subscribe((res: any) => {
      // var loginRes = JSON.parse(res);
      // console.log(loginRes);
      const data = JSON.parse(res.toString()).Table;
      console.log(data);
      if (data.length > 0) {
        localStorage.setItem("userDataR", JSON.stringify(data[0]));
        console.log(data );
        console.log('side menu data');
        this.events.publish('user:created', data);

      }
    },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
      })
  }

  //for validation check

  get loginid() {
    return this.loginForm.get('loginid');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get employeecode() {
    return this.loginForm.get('employeecode');
  }

  public errorMessages = {

    loginid: [
      { type: 'required', message: 'Login Id is required' }

    ],
    password: [
      { type: 'required', message: 'Password is required' },

    ],
    employeecode: [
      { type: 'required', message: 'Employee Code is required' },

    ],

  };

  //end validation

  // get value on keypress
  onKeyPressed(event) {
    // console.log(event.key) 
    console.log(event);
    // // console.log(event.keyCode) 
    console.log(event.detail.value);
    // if(event.key=="a")
    // {
    // this.ishidden=false;
    // }
    var logText = event.detail.value.toLowerCase();
    // if (logText == "a") {
    //   this.ishidden = false;
    // } else if (logText == "ad") {
    //   this.ishidden = false;
    // } else if (logText == "adm") {
    //   this.ishidden = false;
    // } else if (logText == "admi") {
    //   this.ishidden = false;
    // } else 
    if (logText == "admin") {
      this.ishidden = false;
    } else {
      this.ishidden = true;
    }
  }

  onKeyFocus(event) {
    console.log(event);
    console.log(event.detail.data);
    // if(event.detail.data =="a")
    // {
    // this.ishidden=false;
    // }
  }
  forgetPassword(){
    this.router.navigate(['forget-password']);
  }
}

