import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined, isUndefined } from 'util';
import { DatePipe } from '@angular/common';
declare var $: any;
import { ModalController } from '@ionic/angular';
import { StationAttachmentModalPage } from '../redirected_pages/station-attachment-modal/station-attachment-modal.page';

@Component({
  selector: 'app-station-attachment',
  templateUrl: './station-attachment.page.html',
  styleUrls: ['./station-attachment.page.scss'],
})
export class StationAttachmentPage implements OnInit {
  @ViewChild('inputFile', { static: false }) InputFileVar;
  StationAttachmentId: string = '0';
  StationAttachmentList: any = [];
  uploadedfilereset: File;
  AttachmentFile: File;
  DocumentName: string = "";
  StationId: string = localStorage.getItem('StationId');
  Reading: string = "";
  filevisible: boolean = true;
  DocumentImagePath: string = '';
  ListImagePath: string = '';
  Remark: string = "";
  ExpiryDate: string;
  secondMaxDate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toISOString();
  flag = 'CREATE';
  constructor(public modalController: ModalController, private router: Router, private activatedroute: ActivatedRoute,
    public commonServices: ApiService, private menu: MenuController, private dp: DatePipe,public alertController: AlertController ) {
  }

  ngOnInit() {
    this.GetStationAttachmentList();
    this.ExpiryDate = new Date().toLocaleDateString();
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  async presentModal(attachment) {
    const modal = await this.modalController.create({
      component: StationAttachmentModalPage,
      cssClass: 'my-custom-class1',
      componentProps: {
        previewVar: true,
        heading: 'View Attachement',
        viewattachment: attachment
      }
    });
    return await modal.present();
  }
  fileuploadreset(str: any) {
    this.uploadedfilereset = str.target.files[0];
  }

  OnDateChnage(val) {
    this.ExpiryDate = new Date(val).toLocaleDateString()
    console.log("ExpiryDate", this.ExpiryDate);
  }

  Readingvalue(value) {
    this.Reading = value;
    if (this.Reading != '') {
      this.filevisible = false;
    }
    else {
      this.filevisible = true;
    }
  }

  async DeleteStationAttachment(Id: string, itm: any) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure to delete this record..?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            var Json = {
              Id: Id
            }
            this.commonServices.post("DeleteStationAttachmentById", Json).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                this.commonServices.presentToast(data.Table[0].Status);
                this.GetStationAttachmentList();
                this.Clear();
                this.commonServices.loadingDismiss();
              },
              (error) => {
                this.commonServices.presentToast("Something went wrong.");
                this.commonServices.loadingDismiss();
              }
            )
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  ViewStationAttachment(Path: string, itm: any) {
    if (Path.split('.').pop() == "pdf") {

      window.open(this.commonServices.apiImageAttachment + "/Attachments/" + Path, '_blank');
    }
    else {
      console.log(this.commonServices.apiImageAttachment + "/Attachments/" + Path);
      this.DocumentImagePath = this.commonServices.apiImageAttachment + "/Attachments/" + Path;
      this.presentModal(this.DocumentImagePath);
    }
  }

  CheckExtn(Path: string, itm: any) {
    //console.log(Path.split('.').pop());
    if (Path.split('.').pop() == "pdf") {
      this.ListImagePath = this.commonServices.apiImageAttachment + "/Attachments/pdfIcon.png";
    }
    else {
      this.ListImagePath = this.commonServices.apiImageAttachment + "/Attachments/" + Path;
    }
  }

  GetStationAttachmentList() {
    const obj = {
      StationId: this.StationId
    };
    console.log(obj);
    this.commonServices.loadingPresent();
    this.commonServices.post("GetStationAttachmentList", obj).subscribe(
      (resp: any) => {
        this.StationAttachmentList = JSON.parse(resp).Table;
        console.log(this.StationAttachmentList);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }

  UpdateStationAttachment(Id: string, itm: any) {
    this.StationAttachmentId = Id;
    this.DocumentName = itm.DocumentName;
    this.Remark = itm.Remark;
    this.ExpiryDate = itm.ExpiryDate;
    this.flag = 'UPDATE';
    this.filevisible = false;
  }

  OnSubmit() {
    var MyJsonreset = {
      StationId: this.StationId,
      flag: this.flag,
      Id: (this.StationAttachmentId == "" || isNullOrUndefined(this.StationAttachmentId)) ? 0 : this.StationAttachmentId,
      DocumentName: this.DocumentName,
      Remark: this.Remark,
      FilePath: localStorage.getItem('LoginId') + "/StationAttachment/",
      ExpiryDate: this.ExpiryDate
    };

    this.AttachmentFile = $('#StationAttachmentInput');

    var frmData = new FormData();
    var fileInputreset = this.AttachmentFile[0];
    frmData.append("jsonDetail", JSON.stringify(MyJsonreset));
    if (this.uploadedfilereset != undefined) {
      console.log(this.uploadedfilereset);
      frmData.append('StationAttachmentFile', this.uploadedfilereset, this.uploadedfilereset.name);
    }

    var ErrorMsg = this.changeresetValidation(MyJsonreset);

    if (ErrorMsg == '' || ErrorMsg == undefined) {
      this.commonServices.StationAttachment(frmData).subscribe(
        (resp: any) => {
          const data = (resp);
          if (data.Status == "Inserted") {
            this.commonServices.presentToast('Record Saved Successfully.');
            this.Clear();
            this.GetStationAttachmentList();
          }
          else if (data.Status == "Updated") {
            this.commonServices.presentToast('Record Updated Successfully.');
            this.Clear();
            this.GetStationAttachmentList();
          }
          else {
            this.commonServices.presentToast(data.Status);
          }
        },
        (error) => {
          this.commonServices.presentToast('Something went wrong.');
          this.commonServices.loadingDismiss();
        }
      )
    }
    else {
      this.commonServices.presentToast(ErrorMsg);
    }
  }
  changeresetValidation(StationAttachment) {
    var regexNumeric = /^[+-]?[0-9]{1,1000}(?:\.[0-9]{1,1000})?$/;
    var regexDecimalThree = /^[+-]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var regexDecimalThreeNegative = /^[+]?[0-9]{1,10}(?:\.[0-9]{1,3})?$/;
    var imgShow = 'assets/images/attachment.gif';
    var errorMsg = '';
    if ((StationAttachment.DocumentName === undefined) || StationAttachment.DocumentName == '') {
      errorMsg = 'Please enter the Document Name.'
      return errorMsg;
    }
    else if (this.uploadedfilereset == undefined || this.uploadedfilereset == null) {
      errorMsg = 'Please select image/Pdf'
      return errorMsg;
    }
    return errorMsg;
  }

  Clear() {
    this.StationAttachmentId = '0';
    this.Reading = '';
    this.ExpiryDate = new Date().toLocaleDateString()
    this.DocumentName = '';
    this.Remark = ''
    this.InputFileVar.value = "";
    this.flag = 'CREATE'
  }
}
