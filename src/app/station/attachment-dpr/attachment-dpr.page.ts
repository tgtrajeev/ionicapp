import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AttachDprModalPage } from '../redirected_pages/attach-dpr-modal/attach-dpr-modal.page';
import { DatePipe } from '@angular/common';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-attachment-dpr',
  templateUrl: './attachment-dpr.page.html',
  styleUrls: ['./attachment-dpr.page.scss'],
})
export class AttachmentDprPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  StationCode: string = localStorage.getItem('LoginId');
  AttachmentData: any[];
  attachData = { Imagename: '', Imagepath: '' }
  imageURI: any;
  FlagType: any;
  JumpReadingId: any;
  DPRJumpCeritificate: any;

  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  secondMaxDate: any = new Date().toISOString();
  outerCheck: number = 0;
  DPREntryDateTime: string;

  CurrentDate: string = '';
  DateFrom: string;
  DateTo: string;
  DateFromMy: any = new Date().toISOString().split('T')[0];

  DepartmentCode: string = '';
  constructor(public alertController: AlertController, private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController, public modalController: ModalController, private camera: Camera,
    public actionSheetController: ActionSheetController, private file: File, private transfer: FileTransfer,
    private dp: DatePipe, private platform: Platform, private fileOpener: FileOpener,
    private document: DocumentViewer) {

    this.currentdate = new Date().toISOString().split('T')[0];
    // if (this.geteDate.selcteddate == "") {
    //   this.currDate = this.currentdate;
    //   console.log(this.currDate)
    //   const dt = new Date(this.currDate);
    //   let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
    //   this.geteDate.selcteddate = latest_date;
    //   this.GetAttachmentForHO();
    // }

  }

  ngOnInit() {
    this.DepartmentCode = localStorage.getItem('DepartmentCode');
    const dt = new Date();
    this.CurrentDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Comment
    // this.DateFrom = new Date().toLocaleDateString();
    // this.DateTo = new Date().toLocaleDateString();

    // this.DateFrom = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.DateTo = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    this.DateFrom = this.dp.transform(dt, 'yyyy/MM/dd');
    this.DateTo = this.dp.transform(dt, 'yyyy/MM/dd');
    setTimeout(() => {
      this.GetAttachmentForHO();
    });
  }
  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];
    //IOS Comment
    // self.DateFrom = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateFrom = this.dp.transform(dt, 'yyyy/MM/dd');
    if ((new Date(self.DateTo)) < (new Date(self.DateFrom))) {
      console.log("Time");
      this.DateTo = this.DateFrom.split('T')[0];
      // this.DateFromMy = this.DateFrom.split('T')[0];
    }
    this.GetAttachmentForHO();
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);
    //IOS Comment
    // self.DateTo = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateTo = this.dp.transform(dt, 'yyyy/MM/dd');

    this.GetAttachmentForHO();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AttachDprModalPage,
      cssClass: 'modal_container',
      componentProps: {
        uploadVar: true,
        heading: 'Upload Attachement'
      }
    });
    return await modal.present();
  }

  async presentModal1(attachment) {
    const modal = await this.modalController.create({
      component: AttachDprModalPage,
      cssClass: 'modal_container',
      componentProps: {
        previewVar: true,
        heading: 'View Attachement',
        viewattachment: attachment
      }
    });
    return await modal.present();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  searchCollapse() {
    if (this.searchFlag == 0) {
      this.searchShow = true;
      this.searchFlag = 1;
    }
    else {
      this.searchShow = false;
      this.searchFlag = 0;
    }
  }
  hideSearchBar() {
    this.searchShow = false;
    this.searchFlag = 0;
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  getSelectedDate(datePicker) {
    console.log("datePicker", datePicker);

    const dt = new Date(datePicker);
    let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();

    // this.geteDate.selcteddate = latest_date;
    // this.DPREntryDateTime = this.dp.transform(this.geteDate.selcteddate, 'yyyy-MM-dd hh:mm:ss');
    this.GetAttachmentForHO();
  }

  GetAttachmentForHO() {
    var self = this;
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("GetAttachmentForHO",
      {
        StationCode: this.StationCode,
        FromDate: this.dp.transform(this.DateFrom, 'dd/MMM/yyyy'),
        ToDate: this.dp.transform(this.DateTo, 'dd/MMM/yyyy'),
        flag: (this.DepartmentCode == 'SO') ? 'JumpDispenserDataByStation' : 'JumpDispenserDataByCO',
      }).subscribe(
        (res: any) => {
          const data = JSON.parse(res).Table;
          console.log(data, "Table");
          self.commonServices.loadingDismiss();
          if (data.length > 0)
            self.AttachmentData = data;
          else {
            self.commonServices.presentToast("No Data Found.");
            self.AttachmentData = [];
          }
        },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        }
      )
  }

  async selectImage(item) {
    this.JumpReadingId = item.JumpID;
    this.FlagType = item.Flag;
    this.DPRJumpCeritificate = item.CertificatePath;

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'From Gallery',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'From Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      self.imageURI = imageData;
      self.saveAttachment(self.imageURI);
    }, (err) => {
      // Handle error
      console.log(err);
      self.commonServices.loadingDismiss();
    });
  }

  saveAttachment(imageURI) {
    var self = this;
    var MyJson = {
      Id: this.JumpReadingId,
      LoginId: this.StationCode,
      flag: this.FlagType
    };
    let fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1)
    // let fileextension=  fileName.lastIndexOf('.') + 1;
    let fileextension = fileName.split('.').pop();
    if (fileextension == "jpg") {
      self.attachData.Imagename = fileName;
      self.commonServices.loadingDismiss();
    }
    else {

      self.attachData.Imagename = fileName + '.jpg';
      self.commonServices.loadingDismiss();
    }
    const frmData = new FormData();
    frmData.append('Image', "", self.attachData.Imagename);
    frmData.append('Id', self.JumpReadingId);
    frmData.append("jsonDetail", JSON.stringify(MyJson));
    self.commonServices.loadingDismiss();
    self.commonServices.udpateAttachment(frmData).subscribe(
      (resp: any) => {
        self.commonServices.presentToast(resp);
        self.GetAttachmentForHO();
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.presentToast("Something went wrong.");
        self.commonServices.loadingDismiss();
      }
    )
  }

  GenerateJumpCertificate(item) {
    console.log(item + "Rish");
    console.log(item.JumpSystemId + "Rish");
    console.log(item.StationId + "Rish");
    var Id = item.JumpSystemId;
    var StationId = item.StationId;
    var self = this;

    self.commonServices.loadingPresent();
    //  self.commonServices.post("CommonGetData",{Flag: 'JumpDispenserData', Id: self.UserId}).subscribe(
    self.commonServices.post("JumpReadingCertificate",
      {
        Flag: 'JumpReadingCerficatateById',
        Id: Id,
        Status: StationId,
        CDashdate: item.EntryDate
      }).subscribe(

        (res: any) => {
          const data = JSON.parse(res);
          console.log(data, "JumpReadingCerficatateById");
          if (data) {
            var PdfUrl: string = "";
            PdfUrl = this.commonServices.baseUrl.substring(0, this.commonServices.baseUrl.length - 4) + JSON.parse(res);
            console.log(PdfUrl);
            // const FileSaver = require('file-saver');
            // FileSaver.saveAs(PdfUrl);

            let path = null;

            if (this.platform.is('ios')) {
              path = this.file.documentsDirectory;
            } else {
              path = this.file.dataDirectory;
            }

            const transfer = this.transfer.create();
            transfer.download(PdfUrl, path + data).then(entry => {
              let url = entry.toURL();
              if (this.platform.is('ios')) {
                this.document.viewDocument(url, 'application/pdf', {});
              } else {
                this.fileOpener.open(url, 'application/pdf');
              }
            });
          }
          self.commonServices.loadingDismiss();
        },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        }
      )
  }

  // sendToServer(imageURI) {
  //   var self=this;
  //   self.commonServices.loadingPresent();
  //   const fileTransfer: FileTransferObject = self.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'file',
  //     fileName: imageURI.substr(imageURI.lastIndexOf('/')+1),
  //     chunkedMode: false,
  //     mimeType: '"image/jpeg"'   
  //    }
  
  //   //self.editData.Imagename=imageURI.substr(imageURI.lastIndexOf('/')+1);
  //   fileTransfer.upload(imageURI,'https://coffeehive-app.bitsol.cloud/UploadProfile/UploadProfileImage',options)
  //     .then((data) => {
  //        self.commonServices.loadingPresent();
  //      let fileextension=  JSON.parse(data.response).substr(JSON.parse(data.response).lastIndexOf('.') + 1);
  //        if(fileextension == "jpg")
  //        {
  //         self.attachData.Imagename=JSON.parse(data.response);
  //         self.commonServices.loadingDismiss();
  //        }

  //        else{
  //         let filename= JSON.parse(data.response).replace('%', '');
  //         self.attachData.Imagename=filename + '.jpg';
  //         self.commonServices.loadingDismiss();
  //        }

  //       console.log(self.attachData.Imagename);
  //     // console.log(data.response+ " Uploaded Successfully");
  //    // self.commonservices.hideLoader();

  //   }, (err) => {
  //     console.log(err);
  //     self.commonServices.loadingDismiss();

  //   });
  // }
}