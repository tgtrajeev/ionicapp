import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dsa-entry',
    loadChildren: () => import('./station/dsa-entry/dsa-entry.module').then(m => m.DsaEntryPageModule)
  },
  {
    path: 'dpr-summary',
    loadChildren: () => import('./station/dpr-summary/dpr-summary.module').then(m => m.DprSummaryPageModule)
  },
  {
    path: 'dsa-summary',
    loadChildren: () => import('./station/dsa-summary/dsa-summary.module').then(m => m.DsaSummaryPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'meter-skid-popup',
    loadChildren: () => import('./meter-skid-popup/meter-skid-popup.module').then(m => m.MeterSkidPopupPageModule)
  },
  {
    path: 'jump-reading-pop',
    loadChildren: () => import('./jump-reading-pop/jump-reading-pop.module').then(m => m.JumpReadingPopPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./HO/admin-home/admin-home.module').then(m => m.AdminHomePageModule)
  },
  {
    path: 'dashboard-dsa',
    loadChildren: () => import('./HO/dashboard-dsa/dashboard-dsa.module').then(m => m.DashboardDsaPageModule)
  },
  {
    path: 'dashboard-dpr',
    loadChildren: () => import('./HO/dashboard-dpr/dashboard-dpr.module').then(m => m.DashboardDprPageModule)
  },
  {
    path: 'region-mgt',
    loadChildren: () => import('./HO/region-mgt/region-mgt.module').then(m => m.RegionMgtPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./HO/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'control-office',
    loadChildren: () => import('./HO/control-office/control-office.module').then(m => m.ControlOfficePageModule)
  },
  {
    path: 'mo-management',
    loadChildren: () => import('./HO/mo-management/mo-management.module').then(m => m.MOManagementPageModule)
  },
  {
    path: 'station-management',
    loadChildren: () => import('./HO/station-management/station-management.module').then(m => m.StationManagementPageModule)
  },
  {
    path: 'dispenser-management',
    loadChildren: () => import('./HO/dispenser-management/dispenser-management.module').then(m => m.DispenserManagementPageModule)
  },
  {
    path: 'dsm-management',
    loadChildren: () => import('./HO/dsm-management/dsm-management.module').then(m => m.DsmManagementPageModule)
  },
  {
    path: 'meter-skid1',
    loadChildren: () => import('./HO/meter-skid/meter-skid.module').then(m => m.MeterSkidPageModule)
  },
  {
    path: 'add-detail-popup-region-mgt',
    loadChildren: () => import('./HO/popup/add-detail-popup-region-mgt/add-detail-popup-region-mgt.module').then(m => m.AddDetailPopupRegionMgtPageModule)
  },
  {
    path: 'add-detatil-popup-control-office',
    loadChildren: () => import('./HO/popup/add-detatil-popup-control-office/add-detatil-popup-control-office.module').then(m => m.AddDetatilPopupControlOfficePageModule)
  },
  {
    path: 'add-detail-popup-station-mgt',
    loadChildren: () => import('./HO/popup/add-detail-popup-station-mgt/add-detail-popup-station-mgt.module').then(m => m.AddDetailPopupStationMgtPageModule)
  },
  {
    path: 'add-detail-popup-dispenser-mgt',
    loadChildren: () => import('./HO/popup/add-detail-popup-dispenser-mgt/add-detail-popup-dispenser-mgt.module').then(m => m.AddDetailPopupDispenserMgtPageModule)
  },
  {
    path: 'add-detail-popup-dsm-mgt',
    loadChildren: () => import('./HO/popup/add-detail-popup-dsm-mgt/add-detail-popup-dsm-mgt.module').then(m => m.AddDetailPopupDsmMgtPageModule)
  },
  {
    path: 'package1',
    loadChildren: () => import('./HO/package/package.module').then(m => m.PackagePageModule)
  },
  {
    path: 'lcv1',
    loadChildren: () => import('./HO/lcv/lcv.module').then(m => m.LcvPageModule)
  },
  {
    path: 'add-detail-popup-package',
    loadChildren: () => import('./HO/popup/add-detail-popup-package/add-detail-popup-package.module').then(m => m.AddDetailPopupPackagePageModule)
  },
  {
    path: 'add-detail-popup-lcv',
    loadChildren: () => import('./HO/popup/add-detail-popup-lcv/add-detail-popup-lcv.module').then(m => m.AddDetailPopupLcvPageModule)
  },
  {
    path: 'gas-genset1',
    loadChildren: () => import('./HO/gas-genset/gas-genset.module').then(m => m.GasGensetPageModule)
  },
  {
    path: 'rate-management',
    loadChildren: () => import('./HO/rate-management/rate-management.module').then(m => m.RateManagementPageModule)
  },
  {
    path: 'dsa-report-mgt',
    loadChildren: () => import('./MO/dsa-report-mgt/dsa-report-mgt.module').then(m => m.DsaReportMgtPageModule)
  },
  {
    path: 'dpr-report-mgt',
    loadChildren: () => import('./CO/dpr-report-mgt/dpr-report-mgt.module').then(m => m.DprReportMgtPageModule)
  },
  {
    path: 'dpr-sorting',
    loadChildren: () => import('./HO/dpr-sorting/dpr-sorting.module').then(m => m.DprSortingPageModule)
  },
  {
    path: 'summary-dsa',
    loadChildren: () => import('./HO/summary-dsa/summary-dsa.module').then(m => m.SummaryDsaPageModule)
  },
  {
    path: 'reject-station-dpr',
    loadChildren: () => import('./HO/reject-station-dpr/reject-station-dpr.module').then(m => m.RejectStationDprPageModule)
  },
  {
    path: 'add-detail-regionmgt',
    loadChildren: () => import('./HO/add-detail-regionmgt/add-detail-regionmgt.module').then(m => m.AddDetailRegionmgtPageModule)
  },
  {
    path: 'package',
    loadChildren: () => import('./station/package/package.module').then(m => m.PackagePageModule)
  },
  {
    path: 'meter-skid',
    loadChildren: () => import('./station/meter-skid/meter-skid.module').then(m => m.MeterSkidPageModule)
  },
  {
    path: 'lcv',
    loadChildren: () => import('./station/lcv/lcv.module').then(m => m.LcvPageModule)
  },
  {
    path: 'gas-genset',
    loadChildren: () => import('./station/gas-genset/gas-genset.module').then(m => m.GasGensetPageModule)
  },
  {
    path: 'genral-entry',
    loadChildren: () => import('./station/genral-entry/genral-entry.module').then(m => m.GenralEntryPageModule)
  },
  {
    path: 'dpr-entry',
    loadChildren: () => import('./station/dpr-entry/dpr-entry.module').then(m => m.DprEntryPageModule)
  },
  {
    path: 'dpr-dispenser-entry',
    loadChildren: () => import('./station/dpr-dispenser-entry/dpr-dispenser-entry.module').then(m => m.DprDispenserEntryPageModule)
  },
  {
    path: 'dsa-dispenser-entry',
    loadChildren: () => import('./station/dsa-dispenser-entry/dsa-dispenser-entry.module').then(m => m.DsaDispenserEntryPageModule)
  },
  {
    path: 'dispenser-entry',
    loadChildren: () => import('./station/dispenser-entry/dispenser-entry.module').then(m => m.DispenserEntryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./station/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'attachment',
    loadChildren: () => import('./station/attachment/attachment.module').then(m => m.AttachmentPageModule)
  },
  {
    path: 'attachment-dpr',
    loadChildren: () => import('./station/attachment-dpr/attachment-dpr.module').then(m => m.AttachmentDprPageModule)
  },
  {
    path: 'attachment-dsa',
    loadChildren: () => import('./station/attachment-dsa/attachment-dsa.module').then(m => m.AttachmentDsaPageModule)
  },
  {
    path: 'change-reset-meter-skid',
    loadChildren: () => import('./station/redirected_pages/change-reset-meter-skid/change-reset-meter-skid.module').then(m => m.ChangeResetMeterSkidPageModule)
  },
  {
    path: 'add-update-controloffice',
    loadChildren: () => import('./HO/add-update-controloffice/add-update-controloffice.module').then(m => m.AddUpdateControlofficePageModule)
  },
  {
    path: 'add-update-mo-managment',
    loadChildren: () => import('./HO/add-update-mo-managment/add-update-mo-managment.module').then(m => m.AddUpdateMoManagmentPageModule)
  },
  {
    path: 'change-reset-lcv',
    loadChildren: () => import('./station/redirected_pages/change-reset-lcv/change-reset-lcv.module').then(m => m.ChangeResetLcvPageModule)
  },
  {
    path: 'change-reset-ges-genset',
    loadChildren: () => import('./station/redirected_pages/change-reset-ges-genset/change-reset-ges-genset.module').then(m => m.ChangeResetGesGensetPageModule)
  },
  {
    path: 'add-update-dispenser-mgt',
    loadChildren: () => import('./HO/redirected_pages/add-update-dispenser-mgt/add-update-dispenser-mgt.module').then(m => m.AddUpdateDispenserMgtPageModule)
  },
  {
    path: 'add-apdate-dsm-mgt',
    loadChildren: () => import('./HO/redirected_pages/add-apdate-dsm-mgt/add-apdate-dsm-mgt.module').then(m => m.AddApdateDsmMgtPageModule)
  },
  {
    path: 'add-apdate-meter-skid',
    loadChildren: () => import('./HO/redirected_pages/add-apdate-meter-skid/add-apdate-meter-skid.module').then(m => m.AddApdateMeterSkidPageModule)
  },
  {
    path: 'add-apdate-package',
    loadChildren: () => import('./HO/redirected_pages/add-apdate-package/add-apdate-package.module').then(m => m.AddApdatePackagePageModule)
  },
  {
    path: 'add-update-lcv',
    loadChildren: () => import('./HO/redirected_pages/add-update-lcv/add-update-lcv.module').then(m => m.AddUpdateLcvPageModule)
  },
  {
    path: 'add-update-gas-genset',
    loadChildren: () => import('./HO/redirected_pages/add-update-gas-genset/add-update-gas-genset.module').then(m => m.AddUpdateGasGensetPageModule)
  },
  {
    path: 'add-update-rate-mgt',
    loadChildren: () => import('./HO/redirected_pages/add-update-rate-mgt/add-update-rate-mgt.module').then(m => m.AddUpdateRateMgtPageModule)
  },
  {
    path: 'show-previous-rate-mgt',
    loadChildren: () => import('./HO/redirected_pages/show-previous-rate-mgt/show-previous-rate-mgt.module').then(m => m.ShowPreviousRateMgtPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./HO/user-management/user-management.module').then(m => m.UserManagementPageModule)
  },
  {
    path: 'add-update-user',
    loadChildren: () => import('./HO/redirected_pages/add-update-user/add-update-user.module').then(m => m.AddUpdateUserPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./HO/report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'sorting',
    loadChildren: () => import('./HO/sorting/sorting.module').then(m => m.SortingPageModule)
  },
  {
    path: 'dsa-sorting',
    loadChildren: () => import('./HO/dsa-sorting/dsa-sorting.module').then(m => m.DsaSortingPageModule)
  },
  {
    path: 'add-update-station-management',
    loadChildren: () => import('./HO/add-update-station-management/add-update-station-management.module').then(m => m.AddUpdateStationManagementPageModule)
  },
  {
    path: 'dsa-entry-menu',
    loadChildren: () => import('./station/dsa-entry-menu/dsa-entry-menu.module').then(m => m.DsaEntryMenuPageModule)
  },
  {
    path: 'dsa-entry-detail',
    loadChildren: () => import('./station/redirected_pages/dsa-entry-detail/dsa-entry-detail.module').then(m => m.DsaEntryDetailPageModule)
  },
  {
    path: 'payment-collection',
    loadChildren: () => import('./station/payment-collection/payment-collection.module').then(m => m.PaymentCollectionPageModule)
  },
  {
    path: 'other-sales',
    loadChildren: () => import('./station/other-sales/other-sales.module').then(m => m.OtherSalesPageModule)
  },
  {
    path: 'bank-deposite',
    loadChildren: () => import('./station/bank-deposite/bank-deposite.module').then(m => m.BankDepositePageModule)
  },
  {
    path: 'attach-dsa-modal',
    loadChildren: () => import('./station/redirected_pages/attach-dsa-modal/attach-dsa-modal.module').then(m => m.AttachDsaModalPageModule)
  },
  {
    path: 'attach-dpr-modal',
    loadChildren: () => import('./station/redirected_pages/attach-dpr-modal/attach-dpr-modal.module').then(m => m.AttachDprModalPageModule)
  },
  {
    path: 'dsa-summary-preview-modal',
    loadChildren: () => import('./station/redirected_pages/dsa-summary-preview-modal/dsa-summary-preview-modal.module').then(m => m.DsaSummaryPreviewModalPageModule)
  },
  {
    path: 'co-dashboard',
    loadChildren: () => import('./CO/co-dashboard/co-dashboard.module').then(m => m.CoDashboardPageModule)
  },
  {
    path: 'dashboard-co',
    loadChildren: () => import('./CO/dashboard-co/dashboard-co.module').then(m => m.DashboardCOPageModule)
  },
  {
    path: 'reviews-co',
    loadChildren: () => import('./CO/reviews-co/reviews-co.module').then(m => m.ReviewsCOPageModule)
  },
  {
    path: 'station-detail',
    loadChildren: () => import('./CO/station-detail/station-detail.module').then(m => m.StationDetailPageModule)
  },
  {
    path: 'mo-dashboard',
    loadChildren: () => import('./MO/mo-dashboard/mo-dashboard.module').then(m => m.MoDashboardPageModule)
  },
  {
    path: 'remark-popup',
    loadChildren: () => import('./CO/remark-popup/remark-popup.module').then(m => m.RemarkPopupPageModule)
  },
  {
  path: 'station-status',
  loadChildren: () => import('./CO/station-status/station-status.module').then(m => m.StationStatusPageModule)
  },
  {
    path: 'dashboard-mo',
    loadChildren: () => import('./MO/dashboard-mo/dashboard-mo.module').then( m => m.DashboardMoPageModule)
  },
  {
    path: 'modsm-management',
    loadChildren: () => import('./MO/modsm-management/modsm-management.module').then( m => m.MODsmManagementPageModule)
  },
  {
    path: 'mostation-detail',
    loadChildren: () => import('./MO/mostation-detail/mostation-detail.module').then( m => m.MOStationDetailPageModule)
  },
  {
    path: 'mostation-status',
    loadChildren: () => import('./MO/mostation-status/mostation-status.module').then( m => m.MOStationStatusPageModule)
  },
  {
    path: 'moadd-update-dsmmngt',
    loadChildren: () => import('./MO/moadd-update-dsmmngt/moadd-update-dsmmngt.module').then( m => m.MOAddUpdateDSMMngtPageModule)
  },
  {
    path: 'profile-station',
    loadChildren: () => import('./station/profile-station/profile-station.module').then( m => m.ProfileStationPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./HO/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./HO/update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'so-dashboard',
    loadChildren: () => import('./SO/so-dashboard/so-dashboard.module').then( m => m.SoDashboardPageModule)
  },
  {
    path: 'staton-status',
    loadChildren: () => import('./station/staton-status/staton-status.module').then( m => m.StatonStatusPageModule)
  },
  {
    path: 'view-history',
    loadChildren: () => import('./HO/view-history/view-history.module').then( m => m.ViewHistoryPageModule)
  },
  {
    path: 'payment-management',
    loadChildren: () => import('./HO/payment-management/payment-management.module').then( m => m.PaymentManagementPageModule)
  },
  {
    path: 'add-update-payment-mgt',
    loadChildren: () => import('./HO/redirected_pages/add-update-payment-mgt/add-update-payment-mgt.module').then( m => m.AddUpdatePaymentMgtPageModule)
  },
  {
    path: 'jump-reading-system',
    loadChildren: () => import('./HO/jump-reading-system/jump-reading-system.module').then( m => m.JumpReadingSystemPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'issue-log',
    loadChildren: () => import('./HO/issue-log/issue-log.module').then( m => m.IssueLogPageModule)
  },
  {
    path: 'issue-log-attachment',
    loadChildren: () => import('./HO/redirected_pages/issue-log-attachment/issue-log-attachment.module').then( m => m.IssueLogAttachmentPageModule)
  },
  {
    path: 'station-attachment',
    loadChildren: () => import('./station/station-attachment/station-attachment.module').then( m => m.StationAttachmentPageModule)
  },
  {
    path: 'station-attachment-modal',
    loadChildren: () => import('./station/redirected_pages/station-attachment-modal/station-attachment-modal.module').then( m => m.StationAttachmentModalPageModule)
  },
  {
    path: 'issue-log-modal',
    loadChildren: () => import('./HO/redirected_pages/issue-log-modal/issue-log-modal.module').then( m => m.IssueLogModalPageModule)
  },
  {
    path: 'entry-threshhold',
    loadChildren: () => import('./HO/entry-threshhold/entry-threshhold.module').then( m => m.EntryThreshholdPageModule)
  },
  {
    path: 'add-update-entry-threshhold',
    loadChildren: () => import('./HO/redirected_pages/add-update-entry-threshhold/add-update-entry-threshhold.module').then( m => m.AddUpdateEntryThreshholdPageModule)
  },
  {
    path: 'summary-dsareport',
    loadChildren: () => import('./HO/summary-dsareport/summary-dsareport.module').then( m => m.SummaryDSAReportPageModule)
  },
  {
    path: 'JMRStations',
    loadChildren: () => import('./jmr/jmr.module').then( m => m.JMRPageModule)
  },  {
    path: 'lcvvehicle',
    loadChildren: () => import('./lcvvehicle/lcvvehicle.module').then( m => m.LCVvehiclePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
