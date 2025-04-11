import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadingController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { isUndefined } from "util";
import { AlertController } from "@ionic/angular";
import * as XLSX from "xlsx";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // API path
  // baseUrl = 'http://fwsi-dev-01.bitsol.cloud:4051/api/';
  // baseUrl='http://fwsi-dev-01.bitsol.cloud:4061/';
  //  baseUrl = 'https://srs-mobile-api.bitsol.cloud/api/';
  // baseUrl='http://fwsi-dev-01.bitsol.cloud:4068/api/';
  //Local url
  // baseUrl = 'http://localhost:56173/api/';
  // Test Api url
  // baseUrl = 'https://igl-test-api.bitsol.cloud/api/';
  //for UAT
  // baseUrl = "https://igl-uat-api.bitsol.cloud/api/";
  // For IGL Test
  //baseUrl = "http://223.30.125.241:9011/api/";
  baseUrl = "https://igldpr.igl.co.in/api/";
  // IGL Demo Application
  // baseUrl ="https://IGL-UAT-API.firmwisegroup.net/api/";
  // baseUrl ="https://srs-qc-api.bitsol.cloud/api/";9/sept/2024
 // baseUrl = "http://fwsi-dev-01.bitsol.cloud:4067/api/";
  // imgBaseUrl: string = 'http://localhost:56151/Attachments/';
  // imgBaseUrl: string = 'http://localhost:5615/Attachments/';
  //imgBaseUrl: string ='https://srs-mobile-api.bitsol.cloud/'
  // UploadImgbaseUrl = 'http://localhost:56150/Images'
  // imgBaseUrl: string ='https://srs-mobile-api.bitsol.cloud/'
  // apiImageAttachment = 'https://srs-mobile-api.bitsol.cloud';
  // imgBaseUrl: string ='http://fwsi-dev-01.bitsol.cloud:4068/'
  // apiImageAttachment = 'http://fwsi-dev-01.bitsol.cloud:4068';
  //for Local
  //  imgBaseUrl: string ='http://localhost:56173/';
  //  apiImageAttachment = 'http://localhost:56173';
  // Test public url
  // imgBaseUrl: string ='https://igl-test-api.bitsol.cloud/'; //06 10 2020
  // apiImageAttachment = 'https://igl-test-api.bitsol.cloud';
  //for UAT
  // imgBaseUrl: string = "https://igl-uat-api.bitsol.cloud/"; //06 july 2020
  // apiImageAttachment = "https://igl-uat-api.bitsol.cloud";
  // For IGL Test
  // imgBaseUrl: string = "http://223.30.125.241:9011/";
  // apiImageAttachment = "http://223.30.125.241:9011";

  imgBaseUrl: string = "https://igldpr.igl.co.in/api/";
  apiImageAttachment = "https://igldpr.igl.co.in/api";
  // IGL Demo Application
  // imgBaseUrl: string = "https://IGL-UAT-API.firmwisegroup.net/api/";
  // apiImageAttachment = "https://IGL-UAT-API.firmwisegroup.net/api";

  isLoading = false;
  loading;
  userData;
  LockDate: any;
  notificationDetail: any;
  errorMessage = "Internet connection is not available";
  headers: any;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  httpOptionsR = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      enctype: "multipart/form-data",
    }),
  };
  IsCompanyValid = new EventEmitter<boolean>();
  StationDetails = new EventEmitter<{}>();
  ShiftDetails = new EventEmitter<{}>();
  IsShiftIdPending = new EventEmitter<Number>();
  IsTimeOver = new EventEmitter<boolean>();
  lockUnlock = new EventEmitter<boolean>();
  MasterCompDisplay = new EventEmitter<boolean>();
  HeaderDisplay = new EventEmitter<boolean>();
  SubmittedBySOFlag = new EventEmitter<boolean>();

  globalValues: any = [];
  imgShow: string = "";
  rootPermission: string = "";
  MenuStation: any = [];
  userId: string;
  mailSendOTP: any;
  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.userId = localStorage.getItem("UID");
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async loadingPresent(message: string = null, duration: number = null) {
    // const loading = await this.loadingController.create({ message, duration });
    // return await loading.present();
    this.loadingDismiss();
    this.isLoading = true;
    return await this.loadingController
      .create({
        // duration: 5000,
      })
      .then((a) => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }

  async loadingDismiss() {
    // setTimeout(() => {
    //     return this.loadingController.dismiss();
    // }, 1000);
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  }

  post(url, data): Observable<any> {
    console.log(data);
    return this.http
    
      .post<any>(this.baseUrl + "DSA/" + url, data, this.httpOptions)
      .pipe(tap((data) => console.log("posted")));
  }

  CheckDispencerLockUnlockStatus(obj ){
    return this.http.post(this.baseUrl + "DSA/" + "CheckDispencerLockUnlockStatus",obj);
  }


  postwithservice(url, data): Observable<any> {
    return this.http
  
     .post<any>(this.baseUrl + "ApiService/" + url, data, this.httpOptions)
      .pipe(tap((data) => console.log("posted")));
  }

  
  SaveJumpReading(frmData: FormData) {
    //return this.objHttp.post(this.apiUrl + 'DSA/'+ 'DispenserJumpMaster', obj);
    var api = this.baseUrl + "DSA/" + "DispenserJumpMaster";
    return this.http.post(api, frmData);
  }
  // Insert Station Meter Skid
  insertStationSkidApi(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "InsertMeterSkid";
    return this.http.post(api, frmData);
  }
  // Get Station Meter Skid
  getStationMeterSkidApi(obj: {}) {
    var api = this.baseUrl + "ApiService/" + "GetStationMeterSkid";
    return this.http.post(api, obj, this.httpOptions);
  }
  HoldResetReading(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "HoldResetReading";
    return this.http.post(api, frmData);
  }

  GlovalValues() {
    this.globalValues = {
      imgBaseUrl: this.imgBaseUrl,
      imgShow: this.imgShow,
    };
    this.rootPermission = JSON.parse(
      localStorage.getItem("globalDetail")
    ).prm_id;
    this.loadingDismiss();
    console.log(window.location);
    var objQS = ""; //$location.search();
    var path = window.location.hash;
    path = path.substring(1);
    console.log(path);

    if (isUndefined(sessionStorage.getItem("StationMenus"))) {
      this.MenuStation = JSON.parse(sessionStorage.getItem("StationMenus"));
    }
    return this.globalValues;
  }

  InsertPackageInfo(obj: {}) {
    var api = this.baseUrl + "ApiService/" + "InsertPackage";
    return this.http.post(api, obj);
  }
  FormpostwithService(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "HoldResetReading";
    return this.http.post(api, frmData);
  }
  InsertStationLCV(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "InsertLcv";
    return this.http.post(api, frmData);
  }
  InsertGenSetDetails(obj: {}) {
    var api = this.baseUrl + "ApiService/" + "InsertGenSet";
    return this.http.post(api, obj);
  }
  FetchDSASubmittedData(obj: {}) {
    var header = new Headers();
    return this.http.post(
      this.baseUrl + "DSA/" + "FetchDSASubmittedData",
      obj,
      this.httpOptions
    );
  }
  DispenserSummarySubmitted(frmData: {}) {
    return this.http.post(
      this.baseUrl + "DSA/" + "DispenserSummarySubmitted",
      frmData
    );
  }
  udpateAttachment(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "udpateAttachment";
    return this.http.post(api, frmData);
  }
  uploadAttachment(frmData: FormData) {
    return this.http.post(this.baseUrl + "DSA/" + "uploadAttachment", frmData);
    // ,this.httpOptionsR
  }
  PackageHoldResetReading(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "HoldResetReading";
    return this.http.post(api, frmData);
  }
  StationAttachment(frmData: FormData) {
    var api = this.baseUrl + "DSA/" + "StationAttachment";
    return this.http.post(api, frmData);
  }
  InsertIssueLog(frmData: FormData) {
    var api = this.baseUrl + "ApiService/" + "InsertIssueLog";
    return this.http.post(api, frmData);
  }
  // uploadImage(frmData: FormData) {
  //   var api = this.UploadImgbaseUrl;
  //   return this.http.post(api, frmData);
  // }
  OtherPaymentCollection(frmData: FormData) {
    var api = this.baseUrl + "DSA/" + "DispenserOtherPaymentCollection";
    return this.http.post(api, frmData);
  }
  async alertMessage(header, message) {
    let choice;
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Cancel",
          // role: 'cancel',
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            alert.dismiss(true);
            return false;
          },
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Okay");
            alert.dismiss(false);
            return false;
            // this.FinalFileApprove();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data.data;
    });
    return choice;
  }

  async confirm(message) {
    let choice;
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: "Cancel",
          // role: 'cancel',
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            alert.dismiss(true);
            return false;
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.RequestPassword();
            console.log("Confirm Okay");
            alert.dismiss(false);
            return false;
            // this.FinalFileApprove();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data.data;
    });
    return choice;
  }

  RequestPassword() {
    this.post("PasswordNotification", {
      NotificationId: 0,
      UserID: this.userId,
      Flag: "Request",
    }).subscribe(
      (res: any) => {
        console.log(res);
        const data = JSON.parse(res);
        console.log(data);
        this.presentToast(data[0].Meaasge);
        if (data[0].Meaasge == "Reset password request send successfully.") {
          this.mailSendOTP = data[0].OTP;
          this.presentToast(data[0].Meaasge);
        }
      },
      (error) => {
        this.presentToast("Something went wrong.");
      }
    );
  }

  async Commonconfirm(message) {
    let choice;
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: "Cancel",
          // role: 'cancel',
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            alert.dismiss(true);
            return false;
          },
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Okay");
            alert.dismiss(false);
            return false;
            // this.FinalFileApprove();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data.data;
    });
    return choice;
  }

  async exportToExcel(data, filename) {
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + ".xlsx");
    }
  }
}
