import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { isNullOrUndefined } from 'util';
import { ModalController } from '@ionic/angular';
import { IssueLogModalPage } from '../redirected_pages/issue-log-modal/issue-log-modal.page';
declare var $: any;

@Component({
  selector: 'app-issue-log',
  templateUrl: './issue-log.page.html',
  styleUrls: ['./issue-log.page.scss'],
})
export class IssueLogPage implements OnInit {
  issuePopup: boolean = false;
  Issuesuploadedfile: File;
  Issuelogfiles: File;
  listIssueLog: any = [];
  imgURL: string = '';
  issueAttachement: string = '';
  heading = '';
  details = '';
  @ViewChild('inputFile', { static: false }) InputFileVar;
  constructor(public modalController: ModalController, private router: Router, private activatedroute: ActivatedRoute,
    public alertController: AlertController, public commonServices: ApiService) { }

  ngOnInit() {
    this.GetIssueLog();
  }

  // issueAttachRedirect(attachment)
  // {
  //   this.router.navigate(['issue-log-attachment',{Imgattachment: attachment}]);
  // }
  async presentModal(attachment) {
    const modal = await this.modalController.create({
      component: IssueLogModalPage,
      cssClass: 'my-custom-class1',
      componentProps: {
        previewVar: true,
        heading: 'View Attachement',
        viewattachment: attachment
      }
    });
    return await modal.present();
  }

  fileupload(str: any) {
    console.log("issue", str);
    this.Issuesuploadedfile = str.target.files[0];
  }

  InsertIssueLog(myForm) {
    console.log(myForm);
    // console.log("issue",thisheading,",",details,",",localStorage.getItem('LoginId'));
    var loginId = localStorage.getItem('Loginidd');
    this.heading = myForm.value.heading;
    this.details = myForm.value.details;
    var tempRequester = '';
    if (loginId.toLowerCase().indexOf('cng') > -1) {
      tempRequester = "Station";
    }
    else if (loginId.toLowerCase().indexOf('cr') > -1) {
      tempRequester = "ControlRoom";
    }
    else if (loginId.toLowerCase().indexOf('admin') > -1) {
      tempRequester = "Admin";
    }
    console.log("issue", tempRequester);
    var MyJson = {
      RequestFrom: tempRequester,
      RequesterID: loginId,
      IssueHeading: this.heading,
      IssueDetails: this.details,
      CurrentStatus: "Pending",
      Attachment: ((this.Issuesuploadedfile == undefined) ? '' : this.Issuesuploadedfile.name)
    };

    this.Issuelogfiles = $('#issuefiles');
    var frmData = new FormData();
    var fileInput = this.Issuelogfiles[0];
    frmData.append("IssuelogData", JSON.stringify(MyJson));
    if (this.Issuesuploadedfile != undefined) {
      frmData.append('IssuelogFiles', this.Issuesuploadedfile, this.Issuesuploadedfile.name);
    }

    // for (let i = 0; i < files.length; i++) {
    //   formData.append(files[i].name, files[i])
    // }

    var ErrorMsg = this.ValidationIssues(MyJson, fileInput);
    if (ErrorMsg == '' || ErrorMsg == undefined) {
      this.commonServices.InsertIssueLog(frmData).subscribe(
        (resp: any) => {
          const data = resp;
          console.log(data);
          this.commonServices.presentToast("Issue inserted successfully");
          this.heading = '';
          this.details = '';
          this.InputFileVar.value = '';
          this.GetIssueLog();
          // if(data != '') {
          //     this.GetStationLcv(this.lcvid);
          // }
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

  ValidationIssues(IssuesJson, fileInput) {
    var foundError = '';

    if (IssuesJson.IssueHeading == '') {
      foundError = 'Issue Heading is required.';
      return foundError;
    }
    if (IssuesJson.IssueDetails == '') {
      foundError = 'Issue Details is required.';
      return foundError;
    }
    //console.log(fileInput);
    // if (fileInput.files.length > 0) {
    //     var validExtension = 'jpeg,jpg,png,gif';
    //     for (var i = 0; i < fileInput.files.length; i++) {
    //         var fileExtension = fileInput.files[i].name.split('.')[1];
    //         if (validExtension.indexOf(fileExtension) < 0) {
    //             foundError = 'Attachment allowed only for [' + validExtension + '].'; return foundError;
    //         }
    //     }
    // }
    //return foundError;
    if (fileInput.firstChild.files.length > 0) {
      var validExtension = 'jpeg,jpg,png,gif';
      for (var i = 0; i < fileInput.firstChild.files.length; i++) {
        var fileExtension = fileInput.firstChild.files[i].name.split('.').pop().toLowerCase()[1];
        if (validExtension.indexOf(fileExtension) < 0) {
          foundError = 'Attachment allowed only for [' + validExtension + '].';
          return foundError;
        }
      }
    }
    return foundError;
  }

  GetIssueLog() {
    var loginId = localStorage.getItem('Loginidd');
    var tempRequester = '';
    if (loginId.toLowerCase().indexOf('cng') > -1) {
      tempRequester = "Station";
    }
    else if (loginId.toLowerCase().indexOf('cr') > -1) {
      tempRequester = "ControlRoom";
    }
    else if (loginId.toLowerCase().indexOf('admin') > -1) {
      tempRequester = "Admin";
    }
    this.commonServices.loadingPresent();
    this.commonServices.postwithservice("GetIssueLog", { RequestFrom: tempRequester, RequesterID: loginId }).subscribe(
      (resp: any) => {
        console.log(JSON.parse(resp));
        this.listIssueLog = JSON.parse(resp).Table;
        console.log("loglist", this.listIssueLog);
        this.commonServices.loadingDismiss();
      },
      (error) => {
        console.log(error);
        this.commonServices.presentToast("Something went wrong.");
        this.commonServices.loadingDismiss();
      }
    )
  }
  viewAttachment(RefNo) {
    console.log("img", this.listIssueLog, ",", RefNo);
    this.listIssueLog.forEach(element => {
      if (element.IssueReferenceNo == RefNo) {
        this.issueAttachement = element.Attachment;
      }
      this.imgURL = this.commonServices.baseUrl.substring(0, this.commonServices.baseUrl.length - 4) + "Images/";
      console.log(this.imgURL, "img");
      if (this.issueAttachement != "") {
        this.imgURL = this.imgURL + this.issueAttachement;
        console.log("img", this.imgURL);
      }
      else {
        this.imgURL = this.issueAttachement;
      }
    });
    this.presentModal(this.imgURL);
  }


  deleteIssueLog(refno) {
    var self = this;
    var loginId = localStorage.getItem('Loginidd');
    var tempRequester = '';
    if (loginId.toLowerCase().indexOf('cng') > -1) {
      tempRequester = "Station";
    }
    else if (loginId.toLowerCase().indexOf('cr') > -1) {
      tempRequester = "ControlRoom";
    }
    else if (loginId.toLowerCase().indexOf('admin') > -1) {
      tempRequester = "Admin";
    }
    self.commonServices.loadingPresent();
    self.commonServices.postwithservice("DeleteIssueLog", { RequestFrom: tempRequester, ReferenceNo: refno })
      .subscribe(
        (resp: any) => {
          const data = JSON.parse(resp);
          const data1 = data.Table1;
          const data2 = data.Table;
          console.log("Vishal", data1);
          console.log("Vishal", data2);
          self.commonServices.presentToast(data1[0].AlertMsg);
          self.listIssueLog = data2;
          console.log("Vishal", self.listIssueLog);
          self.commonServices.loadingDismiss();
        },
        (error) => {
          console.log(error);
          self.commonServices.presentToast("Something went wrong.");
          self.commonServices.loadingDismiss();
        }
      )
  }

  async deleteIssuePopup(refno) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure want to delete this Issue ? ',
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
            this.deleteIssueLog(refno);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
