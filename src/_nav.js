import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHistory,
  cilReportSlash,
  cilSpeedometer,
  cilUserPlus,
  cilStorage,
  cilFile,
  cilNotes,
  cilChart,
  cibAddthis,
  cilGroup,
  cilLibrary,
  cilCreditCard,
  cilPhone,cilSettings,cilCut,
  cilCheckCircle ,cilCommentSquare,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames'

//supersuperAdmin
const _nav1 = [
  {
    component: CNavItem,
    name:<span  className="div">Dashboard</span>,
    to: '/superdashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon"style={{ color: 'white'}}   />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name:<span  className="div">Feedback</span>,
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" style={{ color: 'white'}} />,
    items: [
      {
        component: CNavItem,
        name: (
          <span  className="div">
            Tool Feedback
          </span>
        ),
        to: '/toolfeedbackdetails',
      },
      {
        component: CNavItem,
        name: (
          <span className="div">
            Client Feedback
          </span>
        ),
        to: '/clientfeedbackdetails',
      },
      {
        component: CNavItem,
        name: (
          <span className="div">
            Complaints
          </span>
        ),
        to: '/complaintsdetails',
      },
    ],
  },
  {
    component: CNavItem,
    name:<span  className="div">Contact us</span>,
    to: '/contactus',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name:<span  className="div">Restrict Tenent Module</span>,
    to: '/restrictmodule',
    icon: <CIcon icon={cilCut} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name:<span  className="div">Ticket</span>,
    to: '/admin_raised_tickets',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
    },
  },
 ]

//SuperAdmin
const _nav2 = [
  {
    component: CNavItem,
    // component: CNavGroup,
    
    name:'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon"style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      //  text: 'santosh_dhage',
      // classNames:'santosh_dhage',
    },
  },

  {
    component: CNavGroup,
    name:'Onboarding',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon"style={{ color: 'white' }} />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to: '/onboarding',
      },
      {
        component: CNavItem,
        name:  'Customer',
        to: '/customer',
      },
    ],
  },
  {
    // component: CNavItem,
    component: CNavGroup,
    name:'Onboarding1',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon"style={{ color: 'white' }} />,
    // to: '/onboarding1',
    items: [
      {
        component: CNavItem,
        name: 'Available Role',
        to: '/available_role',
      },
      {
        component: CNavItem,
        name:  'Create Role',
        to: '/onboarding1',
      },
      {
        component: CNavItem,
        name: 'Create User',
        to: '/customer',
      },
      {
        component: CNavItem,
        name: 'Assign Role',
        to: '/assign_role',
      },
    ],
  },


  {
    component: CNavGroup,
    name:'Master',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon"style={{ color: 'white' }} />,
    items: [
      {
        component: CNavItem,
        name:  'QR Code',
        to: '/qrcode',
      },
      {
        component: CNavItem,
        name: 'Product Type',
        to: '/producttype',
      }, 
      {
        component: CNavItem,
        name: 'Model No',
        to: '/modelno',
      }, 
      {
        component: CNavItem,
        name:  'Machine Master',
        to: '/machinemaster',
      },
      
    ],
  },

  {
    component: CNavGroup,
    name:'Machine Mapping',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon"style={{ color: 'white' }} />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to: '/mappinguser',
      },
      {
        component: CNavItem,
        name: 'Customer',
        to: '/machineusermaping',
      },
    ],
  },

  {
    component: CNavGroup,
    name:'History',
    icon: <CIcon icon={cilStorage}customClassName="nav-icon"style={{ color:'white' }} />,
    items: [
      {
        component: CNavItem,
        name:'Machine History',
        to: '/Machinehistroy',
      },

      {
        component: CNavItem,
        name: 'Payment History',
        to: '/paymenthistroy',
      },
    ],
  },

  {
    component: CNavGroup,
    name:'Reports',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" style={{ color: 'white' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/superadmincustomerreport',
      },
      
      {
        component: CNavItem,
        name: 'User',
        to: '/superadminuserreport',
      },
      {
        component: CNavItem,
        name: 'Payment',
        to: '/superadmin/paymentreport',
      },
      {
        component: CNavItem,
        name: 'Refill',
        to: '/superadmin/refillreport',
      },
      {
        component: CNavItem,
        name: 'Customer MIS'
          ,
        to: '/superadmin/customer/misreport',
      },
      {
        component: CNavItem,
        name:'User MIS',
        to: '/superadmin/user/misreport',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Feedback',
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon"style={{color:'white'}}  />,
    items: [
      {
        component: CNavItem,
        name:'Tool Feedback',
        to: '/toolfeedback',
      },

      {
        component: CNavItem,
        name: 'Client Feedback',
        to: '/clientfeedback',
      },
    ],
  },
 
  {
    component: CNavGroup,
    name:'Settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon"style={{ color: 'white'}} />,
   
    items: [
      {
        component: CNavItem,
        name:'Color Setting',
        to: '/adminsetting',
      },

      {
        component: CNavItem,
        name: 'SMTP Setting',
        to: '/smtpsetting',
      },
    ],
  },
  {
    component: CNavItem,
    name:'Tickets',
    to: '/admin_raised_tickets',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
    },
  },
]

//Customer
const _nav3 = [
  {
    component: CNavItem,
    name:'Dashboard',
    to: '/custdashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" style={{ color: 'white'}}  />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Onboarding',
  //   to: '/onbording',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  {
    component: CNavItem,
    name:'Onboarding'
      ,
    to: '/custonboarding',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" style={{ color: 'white'}}  />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Machine master',
  //   to: '/customer/customermachinemaster',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     // text: 'NEW',
  //   },
  // },
  {
    component: CNavItem,
    name: 'Machine Master',
    to: '/custmachine',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavItem,
    name:'Machine Mapping',
    to: '/custmachineusermapping',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name:'History',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" style={{ color: 'white'}} />,
    items: [
      {
        component: CNavItem,
        name:'Machine History',
        to:'/custmachinehistory',
      },
      {
        component: CNavItem,
        name: 'Payment History',
        to:'/custpaymenthistory',
      },
    ],
  },
 
  // {
  //   component: CNavItem,
  //   name:<span  style={{ color: '#2A409A' }}className="div">Report</span>,
  //   to: '/customer/customerreport',
  //   icon: <CIcon icon={cilFile} customClassName="nav-icon" style={{ color: '#2A409A' }}/>,
  //   badge: {
  //     color: 'info',
  //     // text: 'NEW',
  //   },
  // },
  {
    component: CNavGroup,
    name:'Reports',
    icon: <CIcon icon={cilFile} customClassName="nav-icon"style={{ color: 'white'}}   />,
    items: [
      // {
      //   component: CNavItem,
      //   name: <span className="div"style={{ color: '#2A409A' }}>Customer</span>,
      //   to: '/superadmincustomerreport',
      // },
     {
        component: CNavItem,
        name:  'User',
        to: '/customer/user/userreport',
      },
      {
        component: CNavItem,
        name:'Payment',
        to: '/customer/user/paymentreport',
      },
      {
        component: CNavItem,
        name: 'Refill',
        to: '/customer/user/refillreport',
      },
      
    ],
  },
  {
    component: CNavGroup,
    name:'Feedback',
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" style={{ color: 'white'}} />,
    items: [
      {
        component: CNavItem,
        name: 'Tool Feedback',
        to: '/custtool',
      },

      {
        component: CNavItem,
        name: 'Client Feedback',
        to: '/custclient',
      },
    ],
  },
  {
    component: CNavItem,
    name:' Create Ticket',
    to: '/createticketform',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      
    },
  },
  // {
  //   component: CNavItem,
  //   name:'Raised Queries',
  //   to: '/raised_tickets',
  //   icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
]

//User
const _nav4 = [
  {
    component: CNavItem,
    name:'Dashboard',
    to: '/userdashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" style={{ color: 'white'}}  />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name:'Machine Master',
    to: '/usermachinemaster',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" style={{ color: 'white'}}  />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  
  {
    component: CNavGroup,
    name:'History',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" style={{ color: 'white'}} />,
    items: [
      {
        component: CNavItem,
        name:'Machine History',
        to:'/userMachinhistory',
      },
      {
        component: CNavItem,
        name:'Payment History',
        to:'/userpaymenthistory',
      },
    ],
  },
 
  // {
  //   component: CNavItem,
  //   name:<span  style={{ color: '#2A409A' }}className="div">Report</span>,
  //   to: '/user/userreport',
  //   icon: <CIcon icon={cilFile} customClassName="nav-icon"  style={{ color: '#2A409A' }}/>,
  //   badge: {
  //     color: 'info',
  //     // text: 'NEW',
  //   },

  // },
  {
    component: CNavGroup,
    name:'Reports',
    icon: <CIcon icon={cilFile} customClassName="nav-icon"style={{ color: 'white'}}  />,
    items: [
      {
        component: CNavItem,
        name:'Payment',
        to: '/user/paymentreport',
      },
      {
        component: CNavItem,
        name: 'Refill',
        to: '/user/refillreport',
      },
      // {
      //   component: CNavItem,
      //   name: (
      //     <span className="div" >
      //       MIS
      //     </span>
      //   ),
      //   to: '/user/usermisreport',
      // },
    ],
  },
  {
    component: CNavGroup,
    name:'Feedback',
    icon: <CIcon icon={cilCommentSquare}customClassName="nav-icon" style={{ color: 'white'}} />,
    items: [
      {
        component: CNavItem,
        name:'Tool Feedback',
        to: '/usertool',
      },

      {
        component: CNavItem,
        name:  'Client Feedback',
        to: '/userclient',
      },
    ],
  },
  {
    component: CNavItem,
    name:' Create Ticket',
    to: '/createticketfromuser',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
    badge: {
      color: 'info',
      
    },
  },
]

export default _nav1
export { _nav2 }
export { _nav3 }
export { _nav4 }
