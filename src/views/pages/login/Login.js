import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons'
import e1 from 'src/assets/images/eye.png'
// import backimage from 'src/assets/images/backimage.jpg'
import AuthContext from 'src/context/AuthContext'
import logo1 from 'src/assets/images/logo.png'
import loginimg from 'src/assets/Blog/loginimg.webp'
// import ivendlogo from 'src/assets/images/logo_ivendsoft_logo_2__1_-removebg-preview (1).png'
// import loginbackground from 'src/assets/Blog/coin and QR code.png'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import useAxios from 'src/utils/newuseAxios'
import baseurl from 'src/utils/baseurl'
import loginbackground from 'src/assets/Blog/loginpageimg.webp'
import './logine.css'
let base17 = '/'
let uri17 = 'registerform/'
let encoded17 = window.btoa(uri17)

const Login = () => {
  let { loginUser } = useContext(AuthContext)
  const api = useAxios()
  // console.log("loginUser:", loginUser)
  const [passwordShown, setPasswordShown] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState()
  useEffect(() => {
    const storedEmail = localStorage.getItem('username')
    const storedPassword = localStorage.getItem('password')
    const storedCheckbox = localStorage.getItem('checkbox')

    if (storedCheckbox && storedCheckbox !== '') {
      setRememberMe(true)
      setEmail(storedEmail)
      setPassword(storedPassword)
    } else {
      setRememberMe(false)
      setEmail('')
      setPassword('')
    }
  }, [])

  // Save data to localStorage when checkbox or email changes
  useEffect(() => {
    if (rememberMe && email !== '' && password !== '') {
      localStorage.setItem('username', email)
      localStorage.setItem('password', password)
      localStorage.setItem('checkbox', 'checked')
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('checkbox')
    }
  }, [rememberMe, email, password])

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const [logoUrl, setLogoUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')
  let [notes2, setNotes2] = useState([])
  const baseURL = baseurl()
  const { selectedColor } = useColor() // Access selectedColor from context
  const [letters, setLetters] = useState([]);
  useEffect(() => {
    getTopic()
  }, [])

  const getTopic = async () => {
    try {
      const response = await api.get('/machine/site_settings_api_for_logo/')
      const response6 = await api.get('saas/get_organization_data_only/')
      
      if (response.data.success === 1  && response6?.data?.success === 1 ) {
        setLogoUrl(response.data.result.logo);
        setFaviconUrl(response.data.result.favicon);
        setUserName(response6?.data?.result.organization_name);
      } else if (response.data.success === 0) {
        // Handle failure
        console.error('Failed to fetch logo and favicon')
      }
    } catch (error) {
      console.error('Error fetching logo and favicon:', error)
    }
  }
  
  // console.log(userName,'organization name');
  return (
    <>

<CContainer fluid>
      <CRow className="vh-100">
      <CCol md={6} className="d-none d-md-block">
  {/* <div className="pink-background">
    <div className='px-1 pt-3' style={{ width: '95%', backgroundColor: selectedColor, borderRadius: '0% 50% 40% 20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden', animation: 'slideInBackground 1.5s forwards' }}>
      <img src={loginbackground} className='px-1 mt-4 mb-3' style={{ height: '200px', width: '350px' }} />
      <div style={{ color: 'white', textAlign: 'center', marginTop: '10px', paddingTop: '20px' }}>
        <p style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Powerful Software to</p>
        <p style={{ marginBottom: '0' }}>Streamline operations. Optimize inventory.<br/> Increase profit.</p>
      </div>
    </div>
  </div> */}
 <div style={{ backgroundColor:selectedColor, borderRadius: '0% 50% 40% 20%', padding: '20px', textAlign: 'center',height:'100%', animation: 'slideInBackground 1.5s forwards' }}>
  <img src={loginbackground} alt="Your Image" style={{ width: '60%', height: '60%', borderRadius: '50%' }} />
  <div className='pt-5' style={{color:'white'}}>
  <p style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Powerful Software to</p>
        <p style={{ marginBottom: '0',fontSize:'20px' }}>Streamline operations. Optimize inventory.<br/> Increase profit.</p>
     
  </div>
</div>
</CCol>



        <CCol md={6} className="d-flex align-items-center justify-content-center">
          <div>
            <CForm onSubmit={loginUser}>
              <CCardGroup>
                <CCardBody>
                  <div className="text-center mb-4">
                    {logoUrl && (
                      <img src={logoUrl} alt="Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
                    )}
                  </div>
                  <p className="mt-3 mb-2" style={{ fontFamily: 'Calibri-Bold', fontSize: '25px', textAlign: 'center', fontWeight:'bold', color: selectedColor }}>{userName}</p>
                  <p className="mt-3 mb-4" style={{ fontFamily: 'Calibri-Bold', fontSize: '20px', textAlign: 'center', color: selectedColor }}>Please login to your account</p>
                  <CInputGroup className="mb-4">
                    <CInputGroupText><CIcon icon={cilEnvelopeOpen} /></CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="username" type="email" name="email" value={email} pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$" required onChange={handleEmailChange} />
                    <CFormFeedback invalid>Please enter your email</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                    <CFormInput type={passwordShown ? 'text' : 'password'} name="password" placeholder="Password" autoComplete="current-password" value={password} required onChange={handlePasswordChange} />
                    <CInputGroupText onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      <img src={e1} alt="Toggle Password" className="img-fluid" style={{ maxWidth: '15px' }} />
                    </CInputGroupText>
                  </CInputGroup>
                  <div className="d-flex justify-content-between mb-4">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={handleRememberMe} />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <Link to="/forgate" className="text-small">Forgot password?</Link>
                  </div>
                  <div className="d-grid">
                    <CButton  type="submit" style={{backgroundColor:selectedColor}}>Login</CButton>
                  </div>
                </CCardBody>
              </CCardGroup>
            </CForm>
          </div>
        </CCol>
      </CRow>
    </CContainer>
      {/* <Header /> */}
      {/* <div> */}
      {/* <div>
 {faviconUrl && (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${faviconUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1, // Ensure the background image is behind other content
      // opacity: 0.5,
    }}></div>
  )} 
<CRow md={12}>
<CCol md={6} >
 




<div className="pink-background">
    <div className='px-2' style={{ width: '95%', height: '100%', backgroundColor: selectedColor, borderRadius: '0% 60% 50% 20%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '.7', overflowY: 'auto', animation: 'slideInBackground 1.5s forwards' }}>
  
      <CImage src={loginbackground} className='px-2 mt-2 mb-2'  style={{height:'350px' ,width:'400px'}}/> 
     
    </div>
    
    <div>
    <p style={{color:'white',fontSize:'40px', fontWeight:'lighter'}}>Powerful Software to</p>
<p>Streamline operations. Optimize inventory. Increase profit.</p>
    </div>
  </div>
</CCol>

  <CCol md={6} >

  <div className="login-form-container min-vh-100 d-flex flex-row align-items-center px-5" style={{ width:'60%', position: 'absolute', top: 0 ,opacity:'.9'}}>
    <CContainer>
      <CRow>
        <CCol md={7}>
          <CCardGroup className='px-5'>
          
              <CCardBody>
                <div className="d-flex justify-content-center">

                   
                      {logoUrl && (
          <img
            src={baseURL + logoUrl}
            className="sidebar-brand-full"
            height={60} // Adjust the height here
            width={150} // Adjust the width here
            style={{ marginRight: '10px',marginTop:'10px' }}
            alt="Current Logo"
          />
        )}
          </div>
                    <CForm onSubmit={loginUser}>
                      <p
                        class="mt-3 mb-4"
                        style={{
                          fontFamily: 'Calibri-Bold',
                          fontSize: '20px',
                          textAlign: 'center',
                          color: selectedColor,
                        }}
                      >
                        Please login to your account
                      </p>
                     
                      <CCol>
                        <CInputGroup className="mb-4" style={{ height: '39px' }}>
                          <CInputGroupText>
                            <CIcon icon={cilEnvelopeOpen} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            autoComplete="username"
                            type="email"
                            name="email"
                            value={email}
                            pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                            required
                            onChange={handleEmailChange}
                          />
                          <CFormFeedback invalid>Please enter your email</CFormFeedback>
                        </CInputGroup>
                      </CCol>
                      <CInputGroup className="mb-4" style={{ height: '39px' }}>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={passwordShown ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          required
                          onChange={handlePasswordChange}
                        />
                        <CInputGroupText>
                          <CImage src={e1} height="15px" width="15px" onClick={togglePassword} />
                        </CInputGroupText>
                      </CInputGroup>
                      <CRow className="d-flex mb-4 justify-content-between align-items-center">
                        <CCol xs="auto">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              checked={rememberMe}
                              onChange={handleRememberMe}
                            />
                            &nbsp;&nbsp;
                            <label
                              htmlFor="flexCheckDefault"
                              style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0' }}
                              checked={rememberMe}
                              onChange={handleRememberMe}
                            >
                              Remember me
                            </label>
                          </div>
                        </CCol>

                        <CCol xs="auto">
                          <p className="small fw-bold pt-1 mb-0">
                            <Link
                              to="/forgate"
                              className="px-0"
                              style={{ textDecoration: 'none', color: selectedColor }}
                            >
                              Forgot password?
                            </Link>
                          </p>
                        </CCol>
                      </CRow>

                      <CRow className="d-flex mb-1 justify-content-between align-items-center">
                        <CCol xs="auto">
                           </CCol>
                        <CCol xs="auto">
                          </CCol>
                      </CRow>

                      <div class=" d-grid pt-1 mb-2" style={{ height: '39px' }}>
                        <CButton
                          style={{ backgroundColor: selectedColor }}
                          className="px-3"
                          type="submit"
                        >
                          <b>Login</b>
                        </CButton>
                      </div>
                      
                      </CForm>
              </CCardBody>
          
          </CCardGroup>
        </CCol>
      </CRow>
      
    </CContainer>
  </div>
  </CCol>
  </CRow>
      </div>  */}

    
    </>



  )
}

export default Login
