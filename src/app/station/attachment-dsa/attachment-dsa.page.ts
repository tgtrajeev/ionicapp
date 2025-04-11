import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { AttachDsaModalPage } from '../redirected_pages/attach-dsa-modal/attach-dsa-modal.page';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File, IWriteOptions, FileEntry } from '@ionic-native/file/ngx';
// import { File } from '@ionic-native/file/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
declare var $: any;
@Component({
  selector: 'app-attachment-dsa',
  templateUrl: './attachment-dsa.page.html',
  styleUrls: ['./attachment-dsa.page.scss'],
})
export class AttachmentDsaPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  //Collection
  listDispAttachments: any = [];
  fileCollection: {
    DispanserJumpId: string,
    file: string
  }[];

  //Others
  UserId: string = '';
  StationId: string = '';
  DepartmentCode: string = '';
  fileToUpload: File = null;
  isDataFound: boolean = false;
  popupFlag: boolean = false;
  key: string = 'Name';
  reverse: boolean = true;
  imgURL: any = '';
  JumpReadingId: string = '';
  searchText: string = '';
  errorFlag: boolean = false;
  attachedImageUrl: string = '';
  imgDisplay: boolean = true;
  sortingColumn: string = "";
  path: any = window.location;
  DispanserJumpCeritificate: string = '';
  pathDB: any;
  stationName: string = "";
  filter: string;
  IsImageUpload: boolean = false;
  attachData = { Imagename: '', Imagepath: '' }
  isItemAvailable: boolean;
  items: any;
  imageURI: any;
  FlagType: any;
  StationCode: string = localStorage.getItem('LoginId');

  currentdate: string;
  currDate: string;
  geteDate = { selcteddate: "" }
  secondMaxDate: any = new Date().toISOString();

  CurrentDate: string = '';
  DateFrom: any = new Date().toISOString();
  // DateTo: string;
  DateTo: any = new Date().toISOString();
  DateFromMy: any = new Date().toISOString().split('T')[0];
  outerCheck: number = 0;
  DPREntryDateTime: string;

  constructor(public alertController: AlertController, private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, public commonServices: ApiService, private menu: MenuController
    , private dp: DatePipe, public modalController: ModalController, private camera: Camera,
    private platform: Platform, private fileOpener: FileOpener,
    private document: DocumentViewer,
    public actionSheetController: ActionSheetController, private file: File, private transfer: FileTransfer) {


    this.currentdate = new Date().toISOString().split('T')[0];
    // if (this.geteDate.selcteddate == "") {
    //   this.currDate = this.currentdate;
    //   console.log(this.currDate)
    //   const dt = new Date(this.currDate);
    //   let latest_date = dt.getDate() + "-" + this.monthNames[dt.getMonth()] + "-" + dt.getFullYear();
    //   this.geteDate.selcteddate = latest_date;
    //   this.getData();
    // }

  }
  ngOnInit() {
    this.stationName = JSON.parse(localStorage.getItem("globalDetail"))[0].UserName;
    this.UserId = localStorage.getItem('UID');
    this.StationId = localStorage.getItem('StationId');
    this.DepartmentCode = localStorage.getItem('DepartmentCode');

    const dt = new Date();
    this.CurrentDate = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IoS Comment
    // this.DateFrom = new Date().toLocaleDateString();
    // this.DateTo = new Date().toLocaleDateString();

    // this.DateFrom = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    // this.DateTo = dt.getDate() + "/" + this.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    this.DateFrom = this.dp.transform(dt, 'yyyy/MM/dd');
    this.DateTo = this.dp.transform(dt, 'yyyy/MM/dd');
    setTimeout(() => {
      this.getData();
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AttachDsaModalPage,
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
      component: AttachDsaModalPage,
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
    if (this.DepartmentCode == 'SO') {
      this.menu.enable(true, 'menuStn');
      this.menu.open('menuStn');
    }
    else {
      this.menu.enable(true, 'menuCO');
      this.menu.open('menuCO');
    }
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

  OnDateChnageFrom(val) {
    var self = this;
    const dt = new Date(val);
    this.DateFromMy = val.split('T')[0];

    //IoS Comment
    // self.DateFrom = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateFrom = this.dp.transform(dt, 'yyyy/MM/dd');
    if ((new Date(self.DateTo)) < (new Date(self.DateFrom))) {
      console.log("Time");
      this.DateTo = this.DateFrom.split('T')[0];
      // this.DateFromMy = this.DateFrom.split('T')[0];
    }
    this.getData();
  }

  OnDateChnageTo(val) {
    var self = this;
    const dt = new Date(val);

    //IOS Comment
    //self.DateTo = dt.getDate() + "/" + self.monthNames[dt.getMonth()] + "/" + dt.getFullYear();
    //IOS Add
    self.DateTo = this.dp.transform(dt, 'yyyy/MM/dd');
    this.getData();
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
    this.getData();
  }
  getData() {
    this.commonServices.loadingPresent();
    var self = this;
    self.commonServices.post("CommonGetData",{
        Flag: (this.DepartmentCode == 'SO') ? 'JumpDispenserDataByStation' : 'JumpDispenserDataByMO',
        Id: (this.DepartmentCode == 'SO') ? this.StationId : this.UserId,
        ActivityLog_date: this.dp.transform(this.DateFrom, 'dd/MMM/yyyy'),
        CDashdate: this.dp.transform(this.DateTo, 'dd/MMM/yyyy'),
      }).subscribe((res: any) => {
          if (JSON.parse(res).Table.length > 0) {
            self.listDispAttachments = JSON.parse(res).Table;
            console.log(self.listDispAttachments, "listDispAttachments");
          } else {
            self.listDispAttachments = [];
            self.commonServices.presentToast("No Data Found.");
          }
          self.commonServices.loadingDismiss();
        },
        (error) => {
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        }
      )
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.listDispAttachments.filter((item) => {
        return (item.DispenserName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }

  async selectImage(item) {
    var self = this;
    this.JumpReadingId = item.DispanserJumpId;
    const actionSheet = await self.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'From Gallery',
        handler: () => {
          self.pickImage(self.camera.PictureSourceType.PHOTOLIBRARY);

        }
      },
      {
        text: 'From Camera',
        handler: () => {
          self.pickImage(self.camera.PictureSourceType.CAMERA);
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
    self.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;

      // self.commonServices.presentToast("Rishabh Image 1"+self.imageURI);

      //Rishabh Comment Original
      // self.imageURI = imageData;
      // self.saveAttachment(self.imageURI)

      //Rishabh Work 
      // this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      // .then(entry => {
      //     ( < FileEntry > entry).file(file => this.readFile(file))
      // })
      // .catch(err => {
      //     this.presentToast('Error while reading file.');
      // });
      this.file.resolveLocalFilesystemUrl(imageData.filePath).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          self.commonServices.presentToast("Ri");
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
      self.commonServices.presentToast(err);
      self.commonServices.loadingDismiss();
    });
  }

  readFile(file: any) {
    var self = this;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('JumpReadingId', this.JumpReadingId);
      formData.append('Image', imgBlob, file.name);
      self.commonServices.uploadAttachment(formData).subscribe(dataRes => {
        self.commonServices.presentToast("Rishabh Image 4" + "Success");
        console.log(dataRes);
        self.getData();
      },
        (error) => {
          self.commonServices.presentToast("Rishabh Image 5" + "Something went wrong.");
          self.commonServices.loadingDismiss();
        });
    };
    reader.readAsArrayBuffer(file);
  }
  saveAttachment(imageURI) {
    var self = this;
    let fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

    // self.commonServices.presentToast("Rishabh Image 2.1"+fileName);
    self.commonServices.loadingPresent();
    // let fileextension=  fileName.lastIndexOf('.') + 1;
    let fileextension = fileName.split('.').pop();
    if (fileextension == "jpg") {
      self.attachData.Imagename = fileName;
      // self.commonServices.presentToast("Rishabh Image 2"+self.attachData.Imagename);
      self.commonServices.loadingDismiss();
    }
    else {
      self.attachData.Imagename = fileName + '.jpg';
      // self.commonServices.presentToast("Rishabh Image 3"+self.attachData.Imagename);
      self.commonServices.loadingDismiss();
    }
    const frmData = new FormData();
    // frmData.append('Image', '', self.attachData.Imagename);
    if (self.attachData.Imagename != undefined) {
      console.log(self.attachData.Imagename);
      frmData.append('Image', self.attachData.Imagename);
    }
    frmData.append('JumpReadingId', self.JumpReadingId);
    self.commonServices.presentToast("Rishabh frmData" + frmData);
    self.commonServices.loadingPresent();
    self.commonServices.uploadAttachment(frmData).subscribe(
      (resp: any) => {
        self.commonServices.presentToast("Rishabh Image 4" + resp);
        self.getData();
        self.commonServices.loadingDismiss();
      },
      (error) => {
        self.commonServices.presentToast("Rishabh Image 5" + "Something went wrong.");
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



  // validation(){
  //   if($('#fileInput').val()!='')
  //   {
  //     const fileName = (',' + this.fileToUpload.name.split('.')[1] + ',').toLowerCase();
  //     if(this.fileToUpload == null){
  //       this.commonServices.presentToast('Please select the attachment');
  //       this.errorFlag = true;
  //     }
  //     else if(',png,jpeg,jpg,'.indexOf(fileName) == -1){
  //       this.commonServices.presentToast('Please select the valid file (png, jpeg, jpg)');
  //       this.errorFlag = true;
  //     }
  //     else if(this.fileToUpload.size > 2097152){
  //       this.commonServices.presentToast('Please select the file under size limit (2 MB)');
  //       this.errorFlag = true;
  //     }
  // }
  // else {
  //   this.commonServices.presentToast('Please select the attachment');
  //     this.errorFlag = true;
  //   }
  //   return this.errorFlag;
  // }

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