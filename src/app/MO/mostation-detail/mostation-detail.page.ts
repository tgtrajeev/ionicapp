import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-mostation-detail',
  templateUrl: './mostation-detail.page.html',
  styleUrls: ['./mostation-detail.page.scss'],
})
export class MOStationDetailPage implements OnInit {

  searchShow: boolean = false;
  searchFlag: number = 0;
  userId: any;
  stattionData: any;
  Defaultevent: any = false;
  status: any;
  isItemAvailable = false;
  items: any;
  DeptCode: any;
  StationId: '0';
  exportList: any[];
  currentdate: string;
  currDate: string;
  constructor(private router: Router, public commonServices: ApiService, private menu: MenuController) {
    this.userId = localStorage.getItem('UID');
    this.DeptCode = localStorage.getItem('DepartmentCode');
    this.currentdate = new Date().toISOString().split('T')[0];
    this.currDate = this.currentdate;
    console.log(this.currDate);

    this.getMoStationData();
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'menuCO');
    this.menu.open('menuCO');
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
  stnStatusRedirect(StationId) {
    this.router.navigate(['mostation-status', { stationId: StationId }]);
  }

  updateStatus(i, StationId, event) {
    var self = this;
    this.commonServices.alertMessage("Confirm",
      "Do you want to change the status?").then((res: any) => {
        console.log(res);

        if (!res) {
          // if (confirm("Do you want to change the status?")) {
          if (event.detail.checked != self.Defaultevent) {
            self.status = '1';
          }
          else {
            self.status = '2';
          }

          self.commonServices.loadingPresent();
          self.commonServices.post("CommonGetData", { Flag: 'UpdateSOStatus', Id: StationId, Status: this.status }).subscribe(
            (res: any) => {
              const data = JSON.parse(res).Table;
              if (data[0].Column1 == 'successfully') {
                this.commonServices.presentToast("Status Updated successfully");
                this.commonServices.loadingDismiss();
              }
            },
            (error) => {
              this.commonServices.presentToast('Something went wrong.');
              this.commonServices.loadingDismiss();
            }
          )
        } else {
          console.log(this.stattionData[i].Status);
          this.stattionData[i].Status = this.stattionData[i].Status;
          this.getMoStationData();
        }
      });
  }

  getMoStationData() {
    var self = this;
    self.commonServices.loadingPresent();

    self.commonServices.post("CommonGetData", { Flag: 'SOListForMO', Id: self.userId }).subscribe((res: any) => {
      console.log(JSON.parse(res));
      const StationData = JSON.parse(res).Table[0];
      
      if (StationData != '') {
        self.stattionData = JSON.parse(res).Table;
        console.log(self.stattionData);
        self.commonServices.loadingDismiss();
      }
      else {
        self.commonServices.presentToast('No data found.');
        self.commonServices.loadingDismiss();
      }
    },
      (error) => {
        self.commonServices.presentToast('Something went wrong.');
        self.commonServices.loadingDismiss();
      }
    )
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.getControlOfficeList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.stattionData.filter((item) => {
        return (item.StationCode.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }

  }

  exportFile(){
    this.commonServices.post("getAllDetails_CSV", { Flag: "SOListForMO", Id: this.userId, PageFlag:'MOStations', Status: this.status }).subscribe(
      (resp: any) => {
        const data = JSON.parse(resp);
        // console.log(data);
        if (data.FileName != '') {
        //  alert('file name');
          if (JSON.parse(resp).errMsg == 'success') {
            // alert('inneer sucess');
            window.location.href = this.commonServices.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
            this.commonServices.loadingDismiss();
            
          }
          else {
            this.commonServices.presentToast(JSON.parse(resp).errMsg)
            this.commonServices.loadingDismiss();
          }
        }
        else {
          this.commonServices.presentToast('No Report Data Found');
          this.commonServices.loadingDismiss();

        }

  },
  (error) => {
    this.commonServices.presentToast('Something went wrong.');
    this.commonServices.loadingDismiss();

  })
 }
}