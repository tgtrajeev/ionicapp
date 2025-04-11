import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-station-status',
  templateUrl: './station-status.page.html',
  styleUrls: ['./station-status.page.scss'],
})
export class StationStatusPage implements OnInit {

  searchShow:boolean = false;
  searchFlag:number = 0; 
  title: string;
  SelectedStationId:string = '0';
  listDisp: any;
  stationId:any;
  isItemAvailable: boolean;
  items: any;
  constructor(private router: Router,private activateRoute:ActivatedRoute,public commonServices: ApiService, private menu: MenuController)  { 
    this.stationId=activateRoute.snapshot.paramMap.get('stationId');
    console.log(this.stationId)
    this.getSO();
  }

  ngOnInit() {
  }

  searchCollapse()
  {
    if(this.searchFlag == 0)
    {
      this.searchShow = true;
      this.searchFlag = 1;
    }
    else
    {
      this.searchShow = false;
      this.searchFlag = 0;
    }
  }

  hideSearchBar()
  {
    this.searchShow = false;
    this.searchFlag = 0;
  }

  getSO(){
    var self=this;
    self.commonServices.loadingPresent();
    self.commonServices.post("CommonGetData",{Flag: 'DispenserListBySO', Id: this.stationId}).subscribe(
      (res: any) => {
        self.listDisp= JSON.parse(res).Table;
        self.commonServices.loadingDismiss();
        if( self.listDisp== '')
        {
        self.commonServices.presentToast("Dispnser not found in this station.");
        self.commonServices.loadingDismiss();
        } 
      },
      (error) =>{
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
      this.items = this.listDisp.filter((item) => {
        return (item.DispenserName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.items);
    }
  }
}
