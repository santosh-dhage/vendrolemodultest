import React, { useContext, useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CCol,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import {
  cilBell,
  cilEnvelopeOpen,
  cilHome,
  cilList,
  cilMenu,
  cilPeople,
  cilUser,
} from '@coreui/icons'
import AuthContext from 'src/context/AuthContext'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from 'src/assets/images/logo.png'
 import profile_img1 from 'src/assets/images/avatars/2.jpg'// 'public/media/amazon/images/cambg_1.jpg' //
import './app.css'
// import prfileupdate from 'src/menu/profileupdate'
import useAxios from 'src/utils/useAxios'
const AppHeader = () => {
  let api = useAxios()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { user, authTokens, logoutUser } = useContext(AuthContext)
  let [profile_photo,setProfile_photo]=useState()
  const [userName, setUserName] = useState()
  // console.log(user)
  // console.log(authTokens)
  const { selectedColor } = useColor() // Access selectedColor from context
  // ======================================================
  var urlurl=window.location.origin
  let urlArry=urlurl.split('.');
  let path="/media/"+urlArry[0].split('//')[1]+"/anonymous.jpg"
  
// console.log(path);
  //   useEffect(() => {
  //   getTopic()
  // }, [])
  // const refreshUserData = () => {
  //   getTopic(); // Fetch updated user data
  // };
  // let getrefresh = () => {
  //   window.location.reload()
  // }
  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('api/users/' + authTokens.user.id + '/')

    // console.log(response)
    setProfile_photo(response?.data?.result?.profile_img)
    
    if (authTokens.user.role == '2')  
    // if(false) 
    {
      let response = await api.get('saas/get_data/')
      
        // setProfile_photo(response?.data?.result?.profile_img)
        setUserName(response?.data?.result[0]?.first_name)
        
    }
    else
    {

    setUserName(response?.data?.result?.name)
   
  }
  }
  useEffect(() => {
    getTopic()
  }, [profile_photo,userName])
  // useEffect(() => {
  //   const getTopic = async () => {
  //     try {
  //       const response = await api.get('api/users/' + authTokens.user.id + '/')
  //       setProfile_photo(response?.data?.result?.profile_img)
  //       setUserName(response?.data?.result?.name)
  //     } catch (error) {
  //       console.error('Error fetching user data:', error)
  //     }
  //   }
  //   setProfile_photo(authTokens?.user.profile_img)
  //   setUserName(authTokens?.user.name)
  //   getTopic()
  // }, [authTokens])

  // useEffect(() => {
  //   // Listen for changes in authTokens and update the user's name accordingly
  //   setUserName(authTokens?.user.name)
  // }, [authTokens])

  // =========================================================
  return (
    <CHeader position="sticky" className="mb-4" style={{ backgroundColor: 'white' }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" style={{ color: selectedColor }} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" style={{ color: '#2A409A' }} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex  ms-auto me-3">
          <CNavItem>
            {/* <CCol sm={12} className="usernamedetails text-center  mt-2">
              <span style={{ fontSize: '16px', color:selectedColor }}>
                {' '}
                <b>{authTokens?.user.name}</b>
              </span>
            </CCol> */}
             <CCol sm={12} className="usernamedetails text-center mt-2">
              <span style={{ fontSize: '16px',color:selectedColor }}>
                <b>{userName}</b>
              </span>
              </CCol>
            {/* <CCol sm={12} className="userdesi mb-2">
              <span className="mb-4">{authTokens?.user.cioklub_user_ref}</span>
            </CCol> */}
          </CNavItem>

          <CNavItem>
            <CNavLink>
              {/* <CIcon icon={cilUser} style={{ color: selectedColor }} size="lg" /> */}
              {/* <div>{profile_photo }</div> */}
              <div class="dropdownpp">
                {(
                  profile_photo == null || 
                  profile_photo === undefined ||
                  profile_photo==path ||
                  profile_photo=="/media/public/anonymous.jpg" ||
                  profile_photo.length <= 0
                  )?(
                  <CAvatar src={profile_img1} status="success" size="sm" />
                  ):(
                  <CAvatar src={profile_photo} status="success" size="sm" />
                  )}
               {/* <CAvatar src={profile_photo} status="success" size="sm" /> */}
                
                {/* <CAvatar color="secondary" status="danger">CUI</CAvatar> */}
                <div class="dropdown-contentpp">
                  <a href={'/#/profileupdate'}>Go To Profile</a>
                  <a href="/#/resetpassword">Change Password</a>
                </div>
              </div>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
            {'    '}  {/* <CIcon icon={cilBell} size="lg" style={{ color: selectedColor }} /> */}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        {/* <img
          src={logo}
          className="sidebar-brand-full"
          height={50}
          style={{ marginRight: '10px' }}
        /> */}
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid> */}
      {/* <AppBreadcrumb /> */}
      {/* <img
          src={logo}
          className="sidebar-brand-full"
          height={50}
          style={{ marginRight: '10px' }}
        /> */}
      {/* </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
