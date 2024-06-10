import React, { useContext, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  cilPhone, cilSettings, cilCut,
  cilCheckCircle, cilCommentSquare, cilAccountLogout
} from '@coreui/icons'
import { CSidebar, CSidebarBrand, CSidebarNav, CHeaderNav, CRow, CCol } from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { CNavGroup, CNavItem } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import { Link, NavLink } from 'react-router-dom'
import { AppSidebarNav } from './AppSidebarNav'
import AuthContext from 'src/context/AuthContext'
import './AppSidebar.css'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
// import ColorSelector from './colorsetting'
import useAxios from 'src/utils/useAxios'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import 'src/index.css'
// sidebar nav config
import _nav1 from '../_nav'
import baseurl from 'src/utils/baseurl'
import { _nav2, _nav3, _nav4, _nav5, _nav6, _nav7, _nav8 } from '../_nav'
import defaultlogo from 'src/assets/images/default_logo.png'
const AppSidebar = ({ color }) => {

  let [notes, setNotes] = useState([])
  let [modules_no, setModules_no] = useState([])
  let [sub_modules_no, setSub_modules_no] = useState([])
  let [permission_no, setPermission_no] = useState([])

  var urlurl = window.location.origin
  let urlArry = urlurl.split('.');
  let path = "/media/" + urlArry[0].split('//')[1] + "/anonymous.jpg"
  let path1 = "/public/default_logo.png"

  const dispatch = useDispatch()
  const api = useAxios()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { user, authTokens, logoutUser } = useContext(AuthContext)
  const [logoUrl, setLogoUrl] = useState()

  const [faviconUrl, setFaviconUrl] = useState('')
  let [notes2, setNotes2] = useState([])
  const baseURL = baseurl()
  const { selectedColor } = useColor() // Access selectedColor from context

  let custommodul = [];

  useEffect(() => {
    getTopic()
  }, [logoUrl])

  const getTopic = async () => {
    try {
      const response = await api.get('/machine/site_settings_api_for_logo/')
      if (response.data.success === 1) {
        setLogoUrl(response.data.result.logo)

      } else if (response.data.success === 0) {
        // Handle failure
        console.error('Failed to fetch logo and favicon')
      }
    } catch (error) {
      console.error('Error fetching logo and favicon:', error)
    }
    if (authTokens.user.role != '1') {
      if (authTokens.user.role != '2') {
        const response1 = await api.get('machine/users/module/')
        if (response1.data.success == 1) {
          let a = response1.data.result
          let ddd = [];
          // for(let i=0;i<response1.data.result.roles.length;i++)
          //   {
          for (let j = 0; j < response1.data.result.roles[0].modules.length; j++) {
            // let options={module:response1.data.result.roles[0].modules[j].name}
            ddd.push(response1.data.result.roles[0].modules[j].name);
            // console.log(response1.data.result.roles[0].modules[j].name,"ssssannnnnmodule")
          }

          // }
          setModules_no(ddd);
        }
      }
    }

    // setModules_no(['Dashboard','Onboarding','Report','Master','Machine Mapping','History','Feedback','setting','Tickets'])
  }
  if (authTokens.user.role != '1') {
    if (authTokens.user.role != '2') {
      if (modules_no.includes("Dashboard")) {
        let dashboard = {
          component: CNavItem,
          name: 'Dashboard',
          to: '/custdashboard',
          icon: <CIcon icon={cilChart} customClassName="nav-icon" style={{ color: 'white' }} />,
          badge: {
            color: 'info',
            // text: 'NEW',
          },
        }
        custommodul.push(dashboard)
      }

      // if (modules_no.includes("Master") ||
      //   modules_no.includes("QR code") ||
      //   modules_no.includes("Product Type") ||
      //   modules_no.includes("Model No") ||
      //   modules_no.includes("Machine Master")) {
      //   let machine_master = {
      //     component: CNavItem,
      //     name: 'Machine Master',
      //     to: '/custmachine',
      //     icon: <CIcon icon={cilLibrary} customClassName="nav-icon" style={{ color: 'white' }} />,
      //     badge: {
      //       color: 'info',
      //       // text: 'NEW',
      //     },
      //   }
      //   custommodul.push(machine_master)
      // }
      if (modules_no.includes("Onboarding")) {
        let onboarding = {
          component: CNavItem,
          name: 'Onboarding'
          ,
          to: '/custonboarding',
          icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" style={{ color: 'white' }} />,
          badge: {
            color: 'info',
            // text: 'NEW',
          },
        }
        custommodul.push(onboarding)
      }
      if (modules_no.includes("Machine Master")) {
        let machin_master = {
          component: CNavItem,
          name: 'Machine Master',
          to: '/custmachine',
          icon: <CIcon icon={cilLibrary} customClassName="nav-icon" style={{ color: 'white' }} />,
          badge: {
            color: 'info',
            // text: 'NEW',
          },
        }
        custommodul.push(machin_master)
      }
      if (modules_no.includes("Machine Mapping")) {
        let machin_mapping = {
          component: CNavItem,
          name: 'Machine Mapping',
          to: '/custmachineusermapping',
          icon: <CIcon icon={cilGroup} customClassName="nav-icon" style={{ color: 'white' }} />,
          badge: {
            color: 'info',
            // text: 'NEW',
          },
        }
        custommodul.push(machin_mapping)
      }

      if (modules_no.includes("Machine History")) {
        let history = {
          component: CNavGroup,
          name: 'History',
          icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" style={{ color: 'white' }} />,
          items: [
            {
              component: CNavItem,
              name: 'Machine History',
              to: '/custmachinehistory',
            },
            {
              component: CNavItem,
              name: 'Payment History',
              to: '/custpaymenthistory',
            },
          ],
        }
        custommodul.push(history)
      }
      if (modules_no.includes("Reports")||
          modules_no.includes("User report")||
          modules_no.includes("Customer report")||
          modules_no.includes("Refill report")||
          modules_no.includes("User MIS")||
          modules_no.includes("Customer MIS")
        ) {
        let report =  {
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
        }
        custommodul.push(report)
      }
      if(modules_no.includes("Feedback"))
        {
          let feedback=  {
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
          }
          custommodul.push(feedback)
        }
        if(modules_no.includes("Ticket"))
          {
            let ticket=  {
              component: CNavItem,
              name:' Create Ticket',
              to: '/createticketform',
              icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'white'}} />,
              badge: {
                color: 'info',
                
              },
            }
            custommodul.push(ticket)
          }
    }

  }


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{ backgroundColor: selectedColor }}

    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{ backgroundColor: selectedColor }}>
        <CHeaderNav>
          <CRow sm={12}>
            <CCol sm={12} className="profile_photo_col text-center mb-1 ">
              {logoUrl && (
                <img
                  src={baseURL + logoUrl}
                  className="sidebar-brand-full"
                  height={50} // Adjust the height here
                  width={150} // Adjust the width here
                  style={{ marginRight: '10px', marginTop: '10px' }}
                  alt="Current Logo"
                />
              )}

            </CCol>
          </CRow>
        </CHeaderNav>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {/* <AppSidebarNav items={_nav1} /> */}
          {(() => {
            if (authTokens.user.role == '1') {
              return <AppSidebarNav items={_nav1} />
            } else if (authTokens.user.role == '2') {
              return <AppSidebarNav items={_nav2} />
            } else if (authTokens.user.role == '3') {
              return <AppSidebarNav items={custommodul} />
            } else if (authTokens.user.role == '4') {
              return <AppSidebarNav items={custommodul} />
            }
          })()}
        </SimpleBar>
      </CSidebarNav>

      <div style={{ padding: '10px 14px', backgroundColor: selectedColor }}>
        <NavLink
          to="/login"
          style={{ color: 'white', textDecoration: 'none' }}
          onClick={logoutUser}
        >
          <CIcon
            icon={cilAccountLogout}
            style={{ color: 'white', marginLeft: '8px', fontWeight: '600' }}
            size="lg"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="div" style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
            Logout
          </span>
        </NavLink>
      </div>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
