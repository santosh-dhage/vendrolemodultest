import { element } from 'prop-types'
import React from 'react'
const Header = React.lazy(() => import('./layout/header'))
const Footer = React.lazy(() => import('./layout/footer'))
// const Contact = React.lazy(() => import('./views/pages/contactus/contact'))
const Contactus = React.lazy(() => import('./menu/websitecms/contactus'))
const Complaintsdetails = React.lazy(() => import('./views/pages/complaints/complaintsdetails'))

//supersuperadmin
const superclientfeedback = React.lazy(() => import('./views/pages/feedback/clientfeedbackdetails'))
const supertoolfeedback = React.lazy(() => import('./views/pages/feedback/toolfeedbackdetails'))
const SuperDashboard = React.lazy(() => import('./views/dashboard/superdashboard'))
const ModuleRistrict = React.lazy(() => import('./menu/superadminsetting/ristrictmodule'))
const ProfileUpdate = React.lazy(() => import('./menu/profileupdate'))
const Resetpassword = React.lazy(() => import('./menu/password'))
const RestrictModule = React.lazy(() => import('./menu/superadminsetting/ristrictmodule'))

//admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Onboarding = React.lazy(() => import('./menu/onbording/onboarding'))
const Onboardingview = React.lazy(() => import('./menu/onbording/Onboardingview'))
const Onbordingcustview = React.lazy(() => import('./menu/onbording/Onbordingcustview'))
const Colorsetting = React.lazy(() => import('./components/colorsetting'))
const Adminsetting = React.lazy(() => import('./menu/adminsetting/adminsetting'))
const Colorcontext = React.lazy(() => import('./menu/adminsetting/colorcontext'))
const SmtpSetting =React.lazy(() => import('./menu/adminsetting/smtpsetting'))

//==========================================admin onboarding====================
const OnboardingOne=React.lazy(()=>import('./menu/onboarding_user/module_permissions'))
const AvailableRole=React.lazy(()=>import('./menu/onboarding_user/available_role'))
const AssignRole=React.lazy(()=>import('./menu/onboarding_user/assign_role'))
//==============================================================================

const Customer = React.lazy(() => import('./menu/onbording/customer'))
const Customeruser = React.lazy(() => import('./menu/onbording/customeruser'))
const Machinemaster = React.lazy(() => import('./menu/machinemaster/machinemaster'))
// const Machinemaster = React.lazy(() => import('./menu/machinemaster/assignmultiplemachine'))
const QRcode = React.lazy(() => import('./menu/machinemaster/qrcode'))
const Machineusermaping = React.lazy(() => import('./menu/machineusermaping/machineusermaping'))
const Machinusereview = React.lazy(() => import('./menu/machineusermaping/machineuserview'))
const Mappinguser = React.lazy(() => import('./menu/machineusermaping/mappinguser'))
const Machinehistory = React.lazy(() => import('./menu/machinehistroy/machinehistroy'))
const Viewdetails = React.lazy(() => import('./menu/machinehistroy/viewdetails'))
const Paymenthistory = React.lazy(() => import('./menu/paymenthistroy/paymenthistroy'))
const Paymentdetails = React.lazy(() => import('./menu/paymenthistroy/paymentdetails'))

const Modelno = React.lazy(() => import('./menu/machinemaster/modelno'))
// const Paymenttype=React.lazy(()=>import('./menu/machinemaster/paymenttypes'))
const Producttype = React.lazy(() => import('./menu/machinemaster/producttype'))
const Report = React.lazy(() => import('./menu/report/report'))
const Forgate = React.lazy(() => import('./views/pages/login/forgate'))
const Resetpssword = React.lazy(() => import('./views/pages/login/resetpassword'))
const Machineview = React.lazy(() => import('./menu/machinemaster/Machineview'))
const Machinecustview = React.lazy(() => import('./menu/machineusermaping/machinecustview'))
const Toolfeedback = React.lazy(() => import('./menu/Feedback/toolfeedback'))
const Clientfeedback = React.lazy(() => import('./menu/Feedback/clientfeedback'))

// customer
const Cdashboard = React.lazy(() => import('./menu/cust/custdashboard'))
const Cmachineusermapping = React.lazy(() => import('./menu/cust/custmachineusermapping'))
const Conboarding = React.lazy(() => import('./menu/cust/custonboarding'))
const Cmachine = React.lazy(() => import('./menu/cust/custmachine'))
const Cmachinehistory = React.lazy(() => import('./menu/cust/custmachinehistory'))
const Cpaymenthistory = React.lazy(() =>
  import('./menu/cust/custpaymenthistory/custpaymenthistory'),
)
const Cpaymentdetails = React.lazy(() =>
  import('./menu/cust/custpaymenthistory/custpaymentdetails'),
)
const CustToolfeedback = React.lazy(() => import('./menu/cust/custfeedback/custtool'))
const CustClientfeedback = React.lazy(() => import('./menu/cust/custfeedback/custclient'))

//==================================

//=================================
//user
const UserMachinhistory = React.lazy(() => import('./menu/user/usermachinehistory'))
const UserDashboard = React.lazy(() => import('./menu/user/userdashboard'))
const UserMachinemaster = React.lazy(() => import('./menu/user/usermachinemaster'))
const UserMachinehistory = React.lazy(() => import('./menu/user/userpaymenthistory'))
const UserToolfeedback = React.lazy(() => import('./menu/user/userFeedback/usertool'))
const UserClientfeedback = React.lazy(() => import('./menu/user/userFeedback/userclient'))
// new registered
const NewRegistered = React.lazy(() => import('./menu/newregistered/newregistered'))

//subscription plan
const basicplan = React.lazy(() => import('./menu/subscriptionplan/basicplan'))
const premiumplan = React.lazy(() => import('./menu/subscriptionplan/premiumplan'))

//superaddmin report
const CustomerReport = React.lazy(() => import('./menu/report/superadmin/customerreport'))
const CustomerReportDetail=React.lazy(() => import('./menu/report/superadmin/customerreportdetails'))
const UserReport = React.lazy(() => import('./menu/report/superadmin/userreport'))
const RefillReport = React.lazy(() => import('./menu/report/superadmin/refillreport'))
const Machinewiserefillreport=React.lazy(() => import('./menu/report/superadmin/machinwiserefillreport'))
const PaymentReport = React.lazy(() => import('./menu/report/superadmin/paymentreport'))
const MISReport = React.lazy(() => import('./menu/report/superadmin/mis'))
const UserMISReport = React.lazy(() => import('./menu/report/superadmin/usermis'))
const PaymentdetailsReport = React.lazy(() =>
  import('./menu/report/superadmin/paymentdetailreport'),
)

//customer report
const CUstomerUserMISReport = React.lazy(() => import('./menu/report/customer/custusermisreport'))
const CustomerPaymentReport = React.lazy(() => import('./menu/report/customer/paymentreport'))
const CustomerUserReport = React.lazy(() => import('./menu/report/customer/userreport'))
const CustomerrefillReport = React.lazy(() => import('./menu/report/customer/refillreport'))
const CustMachinewiserefillreport=React.lazy(() => import('./menu/report/customer/machinwiserefillreport'))

//Customer ticket
const customerticket=React.lazy(() => import('./menu/cust/ticket/createticketform'))
const custRaisedticket=React.lazy(()=>import('./menu/cust/ticket/raised_ticket'))

//user ticket

const userticket=React.lazy(()=>import('./menu/user/ticket/create_ticket'))

//admin ticket
const adminRaisedticket=React.lazy(()=>import('./menu/adminraised_ticket'))

//user report
const UserPaymentReport = React.lazy(() => import('./menu/report/user/paymentreport'))
const UserRefillReport = React.lazy(() => import('./menu/report/user/refill'))
const User_MISReport = React.lazy(() => import('./menu/report/user/mis'))
const UserMachinewiserefillreport=React.lazy(() => import('./menu/report/user/machinwiserefillreport'))
//custom upload 
const ModuleUpload = React.lazy(()=>import('./menu/customupload/module_table'))

const routes = [
  { path: '/header', name: 'Header', element: Header },
  { path: '/footer', name: 'Footer', element: Footer },

  //custom upload
  { path: '/ModuleUpload', name: 'ModuleUpload', element: ModuleUpload },

//onboarding module role for user
{ path: '/available_role', name: 'AvailableRole', element: AvailableRole },
{ path: '/assign_role', name: 'AssignRole', element: AssignRole },
// { path: '/ModuleUpload', name: 'ModuleUpload', element: ModuleUpload },
  //supersuperadmin
  { path: '/clientfeedbackdetails', name: 'superclientfeedback', element: superclientfeedback },
  { path: '/toolfeedbackdetails', name: 'supertoolfeedback', element: supertoolfeedback },
  { path: '/superdashboard', name: 'SuperDashboard', element: SuperDashboard },
  { path: '/ristrictmodules', name: 'ModuleRistrict', element: ModuleRistrict },
  { path: '/profileupdate', name: 'ProfileUpdate', element: ProfileUpdate },
  { path: '/resetpassword', name: 'Resetpassword', element: Resetpassword }, //resetpassword
  { path: '/restrictmodule', name: 'RestrictModule', element: RestrictModule },

  //admin
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/onboarding', name: 'Onboarding', element: Onboarding },
  { path: '/customer', name: 'Customer', element: Customer },
  { path: '/customeruser/:id', name: 'Customeruser', element: Customeruser },
  { path: '/machinemaster', name: 'Machinemaster', element: Machinemaster },
  { path: '/qrcode', name: 'QRcode', element: QRcode },
  { path: '/mappinguser', name: 'Mappinguser', element: Mappinguser },
  { path: '/Machinehistroy', name: 'Machinehistory', element: Machinehistory },
  { path: '/Machineusermaping', name: 'Machineusermaping', element: Machineusermaping },

  { path: '/modelno', name: 'Modelno', element: Modelno },
  { path: '/colorsetting', name: 'Colorsetting', element: Colorsetting },
  { path: '/adminsetting', name: 'Adminsetting', element: Adminsetting },
  { path: '/colorcontext', name: 'Colorcontext', element: Colorcontext },
  { path: '/smtpsetting', name: 'SmtpSetting', element: SmtpSetting },

  // { path: '/paymenttypes', name: 'Paymenttype', element: Paymenttype },
  { path: '/producttype', name: 'Producttype', element: Producttype },

  { path: '/viewdetails/:id', name: 'Viewdetails', element: Viewdetails },
  { path: '/paymenthistroy', name: 'Paymenthistory', element: Paymenthistory },
  { path: '/Paymentdetails/:id', name: 'Paymentdetails', element: Paymentdetails },

  { path: '/report', name: 'Report', element: Report },
  { path: '/forgate', name: 'Forgate', element: Forgate },
  { path: '/toolfeedback', name: 'Toolfeedback', element: Toolfeedback },
  { path: '/clientfeedback', name: 'Clientfeedback', element: Clientfeedback },

  // { path: '/resetpassword/:uid/:token', name: 'Resetpssword', element: Resetpssword },

  //customer
  { path: '/custdashboard', name: Cdashboard, element: Cdashboard },
  { path: '/custmachineusermapping', name: Cmachineusermapping, element: Cmachineusermapping },
  { path: '/custonboarding', name: Conboarding, element: Conboarding },
  { path: '/custmachine', name: Cmachine, element: Cmachine },
  { path: '/custpaymenthistory', name: Cpaymenthistory, element: Cpaymenthistory },
  { path: '/custpaymentdetails', name: Cpaymentdetails, element: Cpaymentdetails },
  { path: '/custmachinehistory', name: Cmachinehistory, element: Cmachinehistory },
  { path: '/custtool', name: 'CustToolfeedback', element: CustToolfeedback },
  { path: '/custclient', name: 'CustClientfeedback', element: CustClientfeedback },

  { path: '/onboarding1', name: 'OnboardingOne', element: OnboardingOne },

  //user
  { path: '/usermachinhistory', name: UserMachinhistory, element: UserMachinhistory },
  { path: '/userdashboard', name: UserDashboard, element: UserDashboard },
  { path: '/usermachinemaster', name: UserMachinemaster, element: UserMachinemaster },
  { path: '/userpaymenthistory', name: UserMachinehistory, element: UserMachinehistory },
  { path: '/usertool', name: 'UserToolfeedback', element: UserToolfeedback },
  { path: '/userclient', name: 'UserToolfeedback', element: UserClientfeedback },
  //viewdetails
  { path: '/Onboardingview/:id', name: 'Onboardingview', element: Onboardingview },
  { path: '/Onbordingcustview/:id', name: 'Onbordingcustview', element: Onbordingcustview },
  { path: '/Machineview/:id', name: 'Machineview', element: Machineview },
  { path: '/machineuserview/:id', name: 'Machinusereview', element: Machinusereview },
  { path: '/machinecustview/:id', name: 'Machinecustview', element: Machinecustview },

  //new registered

  { path: '/newRegistered', name: 'NewRegistered', element: NewRegistered },
  // { path: '/contact', name: 'Contact', element: Contact},
  { path: '/contactus', name: 'Contactus', element: Contactus },
  { path: '/complaintsdetails', name: 'Complaintsdetails', element: Complaintsdetails },

  //subscription plan
  { path: '/basicplan', name: 'basicplan', element: basicplan },
  { path: '/premiumplan', name: 'premiumplan', element: premiumplan },

  //superadmin report
  { path: '/superadmincustomerreport', name: 'CustomerReport', element: CustomerReport },
  { path: '/superadmin/customer/reportdetail/:name/:count/:id', name: 'CustomerReportDetail', element: CustomerReportDetail },
  { path: '/superadminuserreport', name: 'UserReport', element: UserReport },
  { path: '/superadmin/refillreport', name: 'RefillReport', element: RefillReport },
  { path: '/superadmin/paymentreport', name: 'PaymentReport', element: PaymentReport },
  { path: '/superadmin/customer/misreport', name: 'MISReport', element: MISReport },
  { path: '/superadmin/user/misreport', name: 'UserMISReport', element: UserMISReport },
  {
    path: '/superadmin/user/paymentdetail/report/:id/',
    name: 'PaymentdetailsReport',
    element: PaymentdetailsReport,
  },
  { path: '/superadmin/machinwiserefillreport/:id/:location', name: 'Machinewiserefillreport', element: Machinewiserefillreport },

  //Customer reports
  {
    path: '/customer/user/misreport',
    name: 'CUstomerUserMISReport',
    element: CUstomerUserMISReport,
  },
  {
    path: '/customer/user/paymentreport',
    name: 'CustomerPaymentReport',
    element: CustomerPaymentReport,
  },
  { path: '/customer/user/userreport', name: 'CustomerUserReport', element: CustomerUserReport },
  {
    path: '/customer/user/refillreport',
    name: 'CustomerrefillReport',
    element: CustomerrefillReport,
  },
  { path: '/superadmin/custmachinwiserefillreport/:id/:location', name: 'CustMachinewiserefillreport', element: CustMachinewiserefillreport },
  // customer ticket
  { path: '/createticketform', name: 'customerticket', element: customerticket },
  {path:'/raised_tickets',name:'custRaisedticket',element:custRaisedticket},

//user ticket
{ path: '/createticketfromuser', name: 'userticket', element: userticket },

//admin ticket
{ path: '/admin_raised_tickets', name: 'adminRaisedticket', element: adminRaisedticket },

  //user reports
  { path: '/user/paymentreport', name: 'UserPaymentReport', element: UserPaymentReport },
  { path: '/user/usermisreport', name: 'User_MISReport', element: User_MISReport },
  { path: '/user/refillreport', name: 'UserRefillReport', element: UserRefillReport },
  { path: '/user/usermachinwiserefillreport/:id/:location', name: 'UsertMachinewiserefillreport', element: UserMachinewiserefillreport },
  
]

export default routes
