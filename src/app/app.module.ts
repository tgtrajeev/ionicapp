import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer' ;
// import { File } from '@ionic-native/file';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common'

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { IonicStorageModule } from '@ionic/storage';
import { LogoutPage } from './logout/logout.page';
import { MeterSkidPopupPage } from './meter-skid-popup/meter-skid-popup.page';
// import { JumpReadingPopPage } from './jump-reading-pop/jump-reading-pop.page';
import { PopoverPage } from './popup/popover/popover.page';
import { AddDetailPopupRegionMgtPage } from './HO/popup/add-detail-popup-region-mgt/add-detail-popup-region-mgt.page';
import { AddDetatilPopupControlOfficePage } from './HO/popup/add-detatil-popup-control-office/add-detatil-popup-control-office.page';
import { AddDetailPopupStationMgtPage } from './HO/popup/add-detail-popup-station-mgt/add-detail-popup-station-mgt.page';
import { AddDetailPopupDispenserMgtPage } from './HO/popup/add-detail-popup-dispenser-mgt/add-detail-popup-dispenser-mgt.page';
import { AddDetailPopupDsmMgtPage } from './HO/popup/add-detail-popup-dsm-mgt/add-detail-popup-dsm-mgt.page';
import { AddDetailPopupPackagePage } from './HO/popup/add-detail-popup-package/add-detail-popup-package.page';
import { AddDetailPopupLcvPage } from './HO/popup/add-detail-popup-lcv/add-detail-popup-lcv.page';
import { FilterSearchPipe } from './Filters/filter-search.pipe';
import { AttachDsaModalPage } from './station/redirected_pages/attach-dsa-modal/attach-dsa-modal.page';
import { AttachDprModalPage } from './station/redirected_pages/attach-dpr-modal/attach-dpr-modal.page';
import { DsaSummaryPreviewModalPage } from './station/redirected_pages/dsa-summary-preview-modal/dsa-summary-preview-modal.page';
import { RemarkPopupPage } from './CO/remark-popup/remark-popup.page';
import { Camera } from '@ionic-native/Camera/ngx';
// import { File ,FileEntry} from '@ionic-native/file/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { UpdatePasswordPage } from './HO/update-password/update-password.page';
import { StationAttachmentModalPage } from './station/redirected_pages/station-attachment-modal/station-attachment-modal.page';
import { IssueLogModalPage } from './HO/redirected_pages/issue-log-modal/issue-log-modal.page';
import { LogoutPageModule } from './logout/logout.module';
import { MeterSkidPopupPageModule } from './meter-skid-popup/meter-skid-popup.module';
import { PopoverPageModule } from './popup/popover/popover.module';
import { AddDetailPopupRegionMgtPageModule } from './HO/popup/add-detail-popup-region-mgt/add-detail-popup-region-mgt.module';
import { AddDetatilPopupControlOfficePageModule } from './HO/popup/add-detatil-popup-control-office/add-detatil-popup-control-office.module';
import { AddDetailPopupStationMgtPageModule } from './HO/popup/add-detail-popup-station-mgt/add-detail-popup-station-mgt.module';
import { AddDetailPopupDispenserMgtPageModule } from './HO/popup/add-detail-popup-dispenser-mgt/add-detail-popup-dispenser-mgt.module';
import { AddDetailPopupDsmMgtPageModule } from './HO/popup/add-detail-popup-dsm-mgt/add-detail-popup-dsm-mgt.module';
import { AddDetailPopupPackagePageModule } from './HO/popup/add-detail-popup-package/add-detail-popup-package.module';
import { AddDetailPopupLcvPageModule } from './HO/popup/add-detail-popup-lcv/add-detail-popup-lcv.module';
import { AttachDsaModalPageModule } from './station/redirected_pages/attach-dsa-modal/attach-dsa-modal.module';
import { AttachDprModalPageModule } from './station/redirected_pages/attach-dpr-modal/attach-dpr-modal.module';
import { DsaSummaryPreviewModalPageModule } from './station/redirected_pages/dsa-summary-preview-modal/dsa-summary-preview-modal.module';
import { RemarkPopupPageModule } from './CO/remark-popup/remark-popup.module';
import { UpdatePasswordPageModule } from './HO/update-password/update-password.module';
import { StationAttachmentModalPageModule } from './station/redirected_pages/station-attachment-modal/station-attachment-modal.module';
import { IssueLogModalPageModule } from './HO/redirected_pages/issue-log-modal/issue-log-modal.module';
import { JsonToCSVModule } from 'ionic-csv';
import { CSVService } from 'ionic-csv';

// import { RishabhPipe } from './rishabh.pipe';



@NgModule({
  declarations: [AppComponent,
    // LogoutPage,
    // MeterSkidPopupPage,
    // PopoverPage,
    // AddDetailPopupRegionMgtPage,
    // AddDetatilPopupControlOfficePage,
    // AddDetailPopupStationMgtPage,
    // AddDetailPopupDispenserMgtPage,
    // AddDetailPopupDsmMgtPage,
    // AddDetailPopupPackagePage,
    // AddDetailPopupLcvPage,
    FilterSearchPipe,
    // AttachDsaModalPage,
    // AttachDprModalPage,
    // DsaSummaryPreviewModalPage, RemarkPopupPage,
    // UpdatePasswordPage,
    // StationAttachmentModalPage,
    // IssueLogModalPage
  ],

  entryComponents: [
    // LogoutPage,
    // MeterSkidPopupPage,
    // PopoverPage,
    // AddDetailPopupRegionMgtPage,
    // AddDetatilPopupControlOfficePage,
    // AddDetailPopupStationMgtPage,
    // AddDetailPopupDispenserMgtPage,
    // AddDetailPopupDsmMgtPage,
    // AddDetailPopupPackagePage,
    // AddDetailPopupLcvPage,
    // AttachDsaModalPage,
    // AttachDsaModalPage,
    // AttachDprModalPage,
    // DsaSummaryPreviewModalPage, RemarkPopupPage,
    // UpdatePasswordPage,
    // StationAttachmentModalPage,
    // IssueLogModalPage
  ],
  imports: [
    BrowserModule,
    // JsonToCSVModule,
    IonicModule.forRoot({
      mode: 'md',
      // rippleEffect: false,
    }),
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LogoutPageModule,
    MeterSkidPopupPageModule,
    PopoverPageModule,
    AddDetailPopupRegionMgtPageModule,
    AddDetatilPopupControlOfficePageModule,
    AddDetailPopupStationMgtPageModule,
    AddDetailPopupDispenserMgtPageModule,
    AddDetailPopupDsmMgtPageModule,
    AddDetailPopupPackagePageModule,
    AddDetailPopupLcvPageModule,
    AttachDsaModalPageModule,
    AttachDsaModalPageModule,
    AttachDprModalPageModule,
    DsaSummaryPreviewModalPageModule, RemarkPopupPageModule,
    UpdatePasswordPageModule,
    StationAttachmentModalPageModule,
    IssueLogModalPageModule,
    // FilterSearchPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    DatePipe,
    Camera,
    File,
    // FileEntry,
    FileTransfer,
    FileTransferObject,  
    DocumentViewer,
    FileOpener,
    // CSVService,
    // FilterSearchPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
