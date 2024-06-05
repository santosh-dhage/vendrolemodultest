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
  CCardTitle,
  CCardText,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons'
import e1 from 'src/assets/images/eye.png'
// import backimage from 'src/assets/images/backimage.jpg'
import AuthContext from 'src/context/AuthContext'
import logo1 from 'src/assets/images/logo.png'
import loginimg from 'src/assets/Blog/loginimg.webp'
import Header from 'src/layout/header'
import Footer from 'src/layout/footer'
import Signupimg from 'src/assets/images/SignUP.png'
let base17 = '/'
let uri17 = 'registerform/'
let encoded17 = window.btoa(uri17)

const Domain = () => {
  let { loginUser } = useContext(AuthContext)
  // console.log("loginUser:", loginUser)
  const [passwordShown, setPasswordShown] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <>
      <Header />
      {/* <div> */}
      {/* <div className="min-vh-100 d-flex flex-row align-items-center" style={{ background: 'linear-gradient(180deg, rgba(42,64,154,1) 0%, rgba(83,200,243,1) 100%)' }}>

        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={4}>
              <CCardGroup style={{ boxShadow: '2px 2px 2px 2px #ccc' }}>
                <CCard className="p-2">
                  <CCardBody>
                    <CForm onSubmit={loginUser}>
                      <p class="mt-3 mb-4" style={{ fontFamily: 'Calibri-Bold', fontSize: '20px',textAlign:'center' }}>
                      Enter your Domain
                      </p>
                     

                     <CCol>
                      <CInputGroup className="mb-4" style={{ height: '39px' }}>
                     
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
                         <CFormFeedback invalid>Please enter your Domian</CFormFeedback>
                        
                      </CInputGroup>
                      </CCol>
                      <div class=" d-grid pt-1 mb-2" style={{ height: '39px' }}>
                      <CButton
                          style={{ backgroundColor: '#2596be' }}
                          className="px-3"
                          type="submit"
                        >
                          <b>back</b>
                        </CButton>
                        <CButton
                          style={{ backgroundColor: '#2596be' }}
                          className="px-3"
                          type="submit"
                        >
                          <b>Login</b>
                        </CButton>
                      </div>
                      
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div> */}

      <CRow className="mx-5 mt-5 mb-5">
        <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
          <CImage src={Signupimg} style={{ maxWidth: '100%', height: 'auto' }} />
        </CCol>
        <CCol xs={12} md={6} className="justify-content-center mt-5">
          <CCard
            className="h-75"
            style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}
          >
            <CForm
              className="needs-validation mt-4"
              noValidate
              // validated={validated}
              //onSubmit={saveTopic}
            >
              <CRow className=" align-center">
                <h3>Enter your Domain</h3>

                <CRow className="mb-3">
                  <CCol>
                    <CInputGroup className="mb-4" style={{ height: '39px' }}>
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
                      <CInputGroupText>
                        <h6>.ivendmsoft.com</h6>
                      </CInputGroupText>
                      <CFormFeedback invalid>Please enter your email</CFormFeedback>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CRow>
              <CRow>
                {' '}
                <CButton
                  type="submit"
                  style={{ backgroundColor: '#2596be', color: 'white' }}
                  className="mx-5"
                >
                  &nbsp;Submit
                </CButton>
                <CButton
                  type="submit"
                  style={{ backgroundColor: '#2596be', color: 'white' }}
                  className="mx-5"
                >
                  &nbsp;back
                </CButton>
              </CRow>
            </CForm>
          </CCard>
        </CCol>
      </CRow>

      <Footer />
    </>
  )
}

export default Domain
