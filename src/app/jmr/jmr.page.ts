import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-jmr',
  templateUrl: './jmr.page.html',
  styleUrls: ['./jmr.page.scss'],
})
export class JMRPage implements OnInit {

  isStationSubmitted:boolean=true;
  selectedSegment: string = 'jmrtotal'; 
  secondMaxDate: string;
  MonthFrom: string;
  minYear: string;
  selectedMonth: string = ''; 
  selectedFortnight: string = '';
  errorFound: boolean;
  selectedfortnight: string;
  dateTo: any;
  dateFrom: any;
  ControlRoomCode: any;
  selectedYear: string=  new Date().getFullYear().toString(); 
  ResponseList: any;
  TotalSale: any;
  DisWIse: any;
  columns: string[] = [];
  columnstotal: string[];
  columnsdiswise: string[];
  Msg: any;
  CompanyName: any;
  stationid: any;
  Buttondisp:boolean=false;
  constructor(private router: Router,private menu: MenuController,public commonservice: ApiService) {
    const today = new Date();
    this.secondMaxDate = today.getFullYear().toString();
    this.minYear = '2020'
    this.ControlRoomCode=localStorage.getItem('stationCode');
    this.stationid = localStorage.getItem('StationId');
    console.log(this.stationid);
    console.log(this.ControlRoomCode);
   }

  ngOnInit() {
    this.GetStationCompany()
  }

  openFirst() {
    this.menu.enable(true, 'menuStn');
    this.menu.open('menuStn');
  }

  GetStationCompany() {
    this.commonservice.post('CommonGetData',{Flag: 'CompanyByStation', Id: this.stationid, Status:1}).subscribe(
      (resp: any) => {
        this.CompanyName=JSON.parse(resp).Table[0].CompanyName;
        console.log(this.CompanyName, 'Company');
        this.CheckCompany();      
      },
      (error) => {alert("Something went wrong.");
      }
    )
  }

  CheckCompany(){
      if(this.CompanyName == 'IGL' || this.CompanyName == 'DODO' || this.CompanyName == 'DTC' || this.CompanyName == 'DIMTS') {
        this.Buttondisp = true;
      }
      else {
        this.Buttondisp = false;
     }     
     console.log(this.Buttondisp);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value; // Update the value when segment changes
    console.log('Selected Segment:', this.selectedSegment);
    
    if (this.selectedSegment === 'jmrtotal') {
      console.log('Handling jmrtotal');
      this.ResponseList = this.TotalSale;
      this.columns = this.columnstotal;
    } else if (this.selectedSegment === 'diswise') {
      this.ResponseList = this.DisWIse;
      this.columns = this.columnsdiswise;
    }
    else {
      this.columns = [];
      this.commonservice.presentToast('No Data found');
    }
  }


  onYearChange(event: any) {
    const selectedYear = new Date(event).getFullYear(); // Get the full year
    console.log('Selected Year:', selectedYear);
    this.selectedYear = selectedYear.toString();
    this.onReportShow();
    this.CheckStatusOfStation();
  }

  onMonthChange(event: any) {
    this.selectedMonth = event.target.value; 
    console.log('Selected Month:', this.selectedMonth);
    this.onReportShow();
    if(this.ValidationReports()){
      this.CheckStatusOfStation();
    }
    
  }

  // Handle fortnight change event
  onFortnightChange(event: any) {
    this.selectedfortnight = event.target.value; 
    console.log('Selected Fortnight:', this.selectedfortnight);
    this.onReportShow();
    this.CheckStatusOfStation();
  }

  ValidationReports() {
    this.errorFound = true;
     if (this.selectedMonth == "" || isNullOrUndefined(this.selectedMonth)) {
     this.commonservice.presentToast('Please select Month.!');
      this.errorFound = false;
    }
    else if (this.selectedfortnight == "" || isNullOrUndefined(this.selectedfortnight)) {
      this.commonservice.presentToast('Please select Fornight.!');
      this.errorFound = false;
    }
    
    return this.errorFound;
  }

  onReportShow() {
    // this.visible=!this.visible;
      const dt = new Date();
      if(this.selectedMonth =="Jan"){
        var month = 0;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
     else if(this.selectedMonth =="Feb"){
        var month = 1;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Mar"){
        var month = 2;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Apr"){
        var month = 3;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="May"){
        var month = 4;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="June"){
        var month = 5;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      if(this.selectedMonth =="July"){
        var month = 6;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="Aug"){
        var month = 7;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Sep"){
        var month = 8;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Oct"){
        var month = 9;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="Nov"){
        var month = 10;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if (this.selectedMonth == "Dec"){
        var month = 11;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
  
      {
        if(this.selectedfortnight == "Fortnight1"){
          this.dateFrom ="01-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo="15-"+this.selectedMonth + "-"+this.selectedYear;
          console.log(this.dateFrom);
          console.log(this.dateTo);
        }
        else{
          var date = new Date();
          this.dateFrom ="16-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo=d+"-"+this.selectedMonth + "-"+ this.selectedYear;
          console.log(this.dateTo,'shrutielse');
        }
      }
     
      if (this.ValidationReports()) {
        const obj = {
          ControlRoomCode: this.ControlRoomCode,
          flag: 'StationReport',
          FromDate: this.dateFrom,
          ToDate: this.dateTo,
        }
        console.log(obj);
        if (this.selectedMonth != null && this.selectedfortnight != null) {
          this.commonservice.postwithservice('ExportJMRReportStationsView',obj).subscribe(
            (resp: any) => {
  
              this.ResponseList = JSON.parse(resp).Table;
              console.log("response", this.ResponseList);
             
               
                this.ResponseList = JSON.parse(resp).Table;
                this.TotalSale = JSON.parse(resp).Table;
                this.TotalSale = JSON.parse(resp).Table;
                this.DisWIse = JSON.parse(resp).Table1;
                if (this.TotalSale.length != 0 || this.DisWIse.length != 0) {
                  this.columns = Object.keys(this.ResponseList[0]);
                  console.log(this.columns);
                  this.columnstotal = Object.keys(this.TotalSale[0]);
                  this.columnsdiswise = Object.keys(this.DisWIse[0]);
                } else {
                  this.columns = [];
                  this.commonservice.presentToast('No Data found');
                }
              
              if (this.ResponseList.length != 0) {
                this.columns = Object.keys(this.ResponseList[0]);
              } else {
                this.columns = [];
                this.commonservice.presentToast('No Data found');
              }
            },
            (error) => {
              this.commonservice.presentToast('Something went wrong.');
            }
          )
        }
        else {
          this.commonservice.presentToast('Please Select Reporting Date.');
        }
      }
    }

    CheckStatusOfStation()
    {
      const dt = new Date();
      if(this.selectedMonth =="Jan"){
        var month = 0;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
     else if(this.selectedMonth =="Feb"){
        var month = 1;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Mar"){
        var month = 2;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Apr"){
        var month = 3;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="May"){
        var month = 4;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="June"){
        var month = 5;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      if(this.selectedMonth =="July"){
        var month = 6;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="Aug"){
        var month = 7;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Sep"){
        var month = 8;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Oct"){
        var month = 9;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="Nov"){
        var month = 10;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if (this.selectedMonth == "Dec"){
        var month = 11;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
  
      {
        if(this.selectedfortnight == "Fortnight1"){
          this.dateFrom ="01-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo="15-"+this.selectedMonth + "-"+this.selectedYear;
        }
        else{
          var date = new Date();
          this.dateFrom ="16-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo=d+"-"+this.selectedMonth + "-"+ this.selectedYear;
         
        }
      }
      const obj = {
           ControlRoomCode:this.ControlRoomCode,
           flag:'SubmitByStation',
           FromDate: this.dateFrom,
           ToDate: this.dateTo,
      };
      console.log(obj);
      this.commonservice.postwithservice('CheckStatusOfStation',obj).subscribe(
        (response: any)=>{
          const data = JSON.parse(response);
          console.log(data);
          
          if (data.Table[0].Status == '1') {
                this.isStationSubmitted=false;
                this.Msg = data.Table[0].Message;
                console.log(this.Msg);
              return false;
          }
              else
              {
                this.isStationSubmitted = true;
                this.Msg = "";
              }
              // this.objDbServ.ShowLoaders.emit(false);
            },
            (error) => { this.commonservice.presentToast("Something went wrong.");  }
          )
    }
    OnSubmit(){
      const dt = new Date();
    if(this.selectedMonth =="Jan"){
      var month = 0;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
   else if(this.selectedMonth =="Feb"){
      var month = 1;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else if(this.selectedMonth =="Mar"){
      var month = 2;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else if(this.selectedMonth =="Apr"){
      var month = 3;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else  if(this.selectedMonth =="May"){
      var month = 4;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else   if(this.selectedMonth =="June"){
      var month = 5;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    if(this.selectedMonth =="July"){
      var month = 6;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else  if(this.selectedMonth =="Aug"){
      var month = 7;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else if(this.selectedMonth =="Sep"){
      var month = 8;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else if(this.selectedMonth =="Oct"){
      var month = 9;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else   if(this.selectedMonth =="Nov"){
      var month = 10;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }
    else if (this.selectedMonth == "Dec"){
      var month = 11;
      var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
    }

    {
      if(this.selectedfortnight == "Fortnight1"){
        this.dateFrom ="01-"+this.selectedMonth + "-"+ this.selectedYear;
        this.dateTo="15-"+this.selectedMonth + "-"+this.selectedYear;
      }
      else{
        var date = new Date();
        this.dateFrom ="16-"+this.selectedMonth + "-"+ this.selectedYear;
        this.dateTo=d+"-"+this.selectedMonth + "-"+ this.selectedYear;
       
      }
    }
    if (this.ValidationReports()) {
         const obj = {       
         ControlRoomCode:this.ControlRoomCode,
         flag:'SubmitByStation',
         FromDate: this.dateFrom,
         ToDate: this.dateTo,
         
      };
        this.commonservice.postwithservice('SubmitByStation',obj).subscribe(
        (response: any)=>{
          const data = JSON.parse(response);
          console.log(data);
          
          if (data.Status == '2') {
            this.isStationSubmitted=false;
              //alert('Data is already submitted.');
              return false;
          }
          if (data.Status == '1') {
            this.isStationSubmitted=false;
            this.commonservice.presentToast('Data is submitted.');
             this.CheckStatusOfStation();
            return false;
        }                     
        },
        (error)=>{
          console.log('something went wrong.');
        }  
      );
     
      }
    }

    GetExportJMRreports() {
      const dt = new Date();
      if(this.selectedMonth =="Jan"){
        var month = 0;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
     else if(this.selectedMonth =="Feb"){
        var month = 1;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Mar"){
        var month = 2;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Apr"){
        var month = 3;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="May"){
        var month = 4;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="June"){
        var month = 5;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      if(this.selectedMonth =="July"){
        var month = 6;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="Aug"){
        var month = 7;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Sep"){
        var month = 8;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Oct"){
        var month = 9;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="Nov"){
        var month = 10;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if (this.selectedMonth == "Dec"){
        var month = 11;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
  
      {
        if(this.selectedfortnight == "Fortnight1"){
          this.dateFrom ="01-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo="15-"+this.selectedMonth + "-"+this.selectedYear;
          console.log('shruti',this.dateFrom);
          console.log('shruti',this.dateTo);
        }
        else{
          var date = new Date();
          this.dateFrom ="16-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo=d+"-"+this.selectedMonth + "-"+ this.selectedYear;
          console.log(this.dateTo,'shrutielse');
        }
      }
      
      if (this.ValidationReports()) {
        const obj = {
          ControlRoomCode: this.ControlRoomCode,
          flag: 'Export',
          FromDate: this.dateFrom,
          ToDate: this.dateTo,
        }
        {
          if (this.selectedMonth != null && this.selectedfortnight != null ) {
            this.commonservice.postwithservice('ExportJMRReportstations',obj).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                console.log(data);
                if (data.FileName != '') {
                  if (JSON.parse(resp).errMsg == 'success') {
                    window.location.href = this.commonservice.apiImageAttachment + "/Attachments/Excel/" + JSON.parse(resp).FileName
                  }
                  else {
                    this.commonservice.presentToast(JSON.parse(resp).errMsg)
                  }
                }
                else {
                  this.commonservice.presentToast("No Data found.!");
                }
              },
              (error) => {
                this.commonservice.presentToast('Something went wrong.');
              }
            )
          }
          else {
            alert('Please Select Reporting Date.');
          }
        }
      }
    }

    GetPDF() {
      const dt = new Date();
      if(this.selectedMonth =="Jan"){
        var month = 0;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
     else if(this.selectedMonth =="Feb"){
        var month = 1;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Mar"){
        var month = 2;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Apr"){
        var month = 3;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="May"){
        var month = 4;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="June"){
        var month = 5;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      if(this.selectedMonth =="July"){
        var month = 6;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else  if(this.selectedMonth =="Aug"){
        var month = 7;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Sep"){
        var month = 8;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if(this.selectedMonth =="Oct"){
        var month = 9;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else   if(this.selectedMonth =="Nov"){
        var month = 10;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
      else if (this.selectedMonth == "Dec"){
        var month = 11;
        var d = new Date(dt.getFullYear(), month + 1, 0).getDate();
      }
  
      {
        if(this.selectedfortnight == "Fortnight1"){
          this.dateFrom ="01-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo="15-"+this.selectedMonth + "-"+this.selectedYear;
          console.log('shruti',this.dateFrom);
          console.log('shruti',this.dateTo);
        }
        else{
          var date = new Date();
          this.dateFrom ="16-"+this.selectedMonth + "-"+ this.selectedYear;
          this.dateTo=d+"-"+this.selectedMonth + "-"+ this.selectedYear;
          console.log(this.dateTo,'shrutielse');
        }
      }
      
      if (this.ValidationReports()) {
        const obj = {
          ControlRoomCode: this.ControlRoomCode,
          flag: 'Export',
          FromDate: this.dateFrom,
          ToDate: this.dateTo,
        }
        {
          if (this.selectedMonth != null && this.selectedfortnight != null ) {
            this.commonservice.postwithservice('GetPdFReport',obj).subscribe(
              (resp: any) => {
                const data = JSON.parse(resp);
                console.log(data);
                // if(data != 'No Data Available') {
                  console.log(data);
                  var PdfUrl:string="";
                  PdfUrl = this.commonservice.baseUrl.substring(0,this.commonservice.baseUrl.length-4)+JSON.parse(resp);
                  console.log(PdfUrl);
                  window.location.href =PdfUrl;
                  // const FileSaver = require('file-saver');
                  // FileSaver.saveAs(PdfUrl);
                // }
                // else {
                //   alert(data);
                // }
              },
              (error) => {
                alert('Something went wrong.');
              }
            )
          }
          else {
            alert('Please Select Reporting Date.');
          }
        }
      }
    }
}
