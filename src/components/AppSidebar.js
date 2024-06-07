import React, { useContext, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cilAccountLogout, cilTransfer } from '@coreui/icons'
import { CSidebar, CSidebarBrand, CSidebarNav, CHeaderNav, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
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

  var urlurl=window.location.origin
  let urlArry=urlurl.split('.');
  let path="/media/"+urlArry[0].split('//')[1]+"/anonymous.jpg"
  let path1="/public/default_logo.png"

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

  let custommodul=[];

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
    setModules_no(['Dashboard','Onboarding','Report','Master','Machine Mapping','History','Feedback','setting','Tickets'])
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
              return <AppSidebarNav items={_nav3} />
            } else if (authTokens.user.role == '4') {
              return <AppSidebarNav items={_nav4} />
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
