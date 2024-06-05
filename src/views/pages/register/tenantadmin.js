import React, { useEffect, useState } from 'react'
import {
  CButton,
  CRow,
  CCol,
  CFormInput,
  CForm,
  CCard,
  CFormFeedback,
  CFormLabel,
  CInputGroup,
  CImage,
  CInputGroupText
} from '@coreui/react'

//import signup from './signup.css'
import Footer from 'src/layout/footer'
import useAxios from 'src/utils/newuseAxios'
import Signupimg from 'src/assets/images/SignUP.png'
import Header from 'src/layout/header'

import e1 from 'src/assets/images/eye.png'
function CreateProject() {

  let api = useAxios()

  const [passwordShown, setPasswordShown] = useState(false)
  const [password, setPassword] = useState('')

  const [validated, setValidated] = useState(false)
  var currentDomain = window.location.hostname

  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
 
  const redirectToLogin = () => {
    const secondFormData = JSON.parse(sessionStorage.getItem('secondfrom'))
    const siteName = secondFormData.site
    const newDomain = window.location.hostname // Current domain
    const newPath = '/#/login' // Path to the login page
    // window.location.href = `https://${siteName}.${newDomain}${newPath}`
    window.location.href = `http://${siteName}.${newDomain}:3000${newPath}`
  }

  // Call the function to redirect

  const saveTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const firstFormData = JSON.parse(sessionStorage.getItem('firstfrom'))
      const secondFormData = JSON.parse(sessionStorage.getItem('secondfrom'))
      // const planFormData = JSON.parse(sessionStorage.getItem('selectedPlan'))
      const thirdFormData = new FormData(e.target)
      // Append data from first and second forms to third form data
      for (const [key, value] of Object.entries(firstFormData)) {
        thirdFormData.append(key, value)
      }
      for (const [key, value] of Object.entries(secondFormData)) {
        thirdFormData.append(key, value)
      }
      // for (const [key, value] of Object.entries(planFormData)) {
      //   thirdFormData.append(key, value)
      // }
      const siteName = secondFormData.site
      localStorage.setItem('siteName', siteName)
      console.log(siteName)
      console.log(thirdFormData+"thirdformdatasantosh")
      let response = await api.post('/saas/registration/', thirdFormData)
      if (response.data.success === 1) {
        alert('Tenant is created')
        // setVisible1(true)
        redirectToLogin()
      }
    } else {
      setValidated(true)
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Header />

      <CRow className="mx-5 mt-5 mb-5">
        <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
          <CImage src={Signupimg} style={{ maxWidth: '100%', height: 'auto' }} />
        </CCol>
        <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
          <CCard
            className="h-auto text-center"
            style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}
          >
            <CForm
              className="needs-validation mt-4"
              noValidate
              validated={validated}
              onSubmit={(e) => saveTopic(e)}
            >
              <CRow className="justify-content-center mx-4 align-items-center">
                <CRow className="mb-2">
                  <CRow className="justify-content-center">
                    <h5 className="mx-4 mb-2 ">Enter Your Admin Details</h5>
                  </CRow>

                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      First Name<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="first_name"
                      name="first_name"
                      pattern="^\S[A-Za-z\s]*$"
                      required
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your first name</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Last Name<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="last_name"
                      name="last_name"
                      pattern="^\S[A-Za-z\s]*$"
                      required
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your last name</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Email<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="email"
                      id="email"
                      pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                      name="email"
                      required
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your valid email id</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Mobile Number<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="contact_no"
                      name="contact_no"
                      required
                      maxLength={15}
                      minLength={6}
                      pattern="^(?!\s)[0-9\s]+$"
                      onKeyPress={(e) => {
                        const keyCode = e.which || e.keyCode
                        const key = String.fromCharCode(keyCode)
                        const regex = /^[0-9\s]*$/
                        if (!regex.test(key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                    <CFormFeedback invalid>Please enter your mobile number</CFormFeedback>
                  </CCol>

                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Password<span className="text-danger">*</span>
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type={passwordShown ? 'text' : 'password'}
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        maxLength={50}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      />
                      <CInputGroupText>
                        <CImage src={e1} height="15px" width="15px" onClick={togglePassword} />
                      </CInputGroupText>
                    </CInputGroup>
                    <CFormFeedback invalid>Please enter your password</CFormFeedback>
                  </CCol>


                </CRow>
              </CRow>

              <CButton
                type="submit"
                style={{ backgroundColor: '#2596be', color: 'white' }}
                className="mx-5 mt-2 mb-2"
              >
                &nbsp;Submit
              </CButton>
            </CForm>
          </CCard>
        </CCol>
      </CRow>

      <Footer />

    </>
  )
}
export default CreateProject
