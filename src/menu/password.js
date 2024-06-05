import React, { useContext, useState } from 'react'
import {
  CCol,
  CRow,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CButton,
  CCard,
  CForm,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CContainer,
  CInputGroupText,
  CImage,
  CInputGroup,
} from '@coreui/react'
import AuthContext from 'src/context/AuthContext'
// import password from './password.css'
import useAxios from 'src/utils/useAxios'
import e1 from 'src/assets/brand/eyeimage.png'
import CIcon from '@coreui/icons-react'
import { cilLockLocked,} from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext';

const Password = () => {
  let api = useAxios()
  const [validated, setValidated] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [passwordShown1, setPasswordShown1] = useState(false)
  const [passwordShown2, setPasswordShown2] = useState(false)
  const [error1, setError1] = useState('')
  const [error, setError] = useState('')
  const [text, setText] = useState(0)
  const { selectedColor } = useColor();
  const changepassword = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      if (e.target.new_password.value === e.target.current_password.value) {
        setError('Your new password should be different from your existing password')
      } else if (e.target.new_password.value === e.target.password2.value) {
        let response = await api.post('change_password_logged_in/', uploadData)
        if (response.data.success === 1) {
          e.target.new_password.value = ''
          e.target.current_password.value = ''
          e.target.password2.value = ''
          // alert(response.data.message)
          alert('Your password is updated successfully.')
          setValidated(false)
        } else if (response.data.success === 0) {
          for (let i = 0; i < Object.values(response.data.result).length; i++) {
            let a = Object.values(response.data.result)[i]
            alert(a)
          }
          // alert(response.data.message)
          setError('You have entered incorrect existing password.')
          // setValidated(true)
        }
      } else {
        setError1('Your new and confirm password are not same ')
      }
    } else setValidated(true)
    // else{
    //   alert("Enter Password Detils")
    // }
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown)

  }
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1)
  }
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2)
  }

  const handleDes = (value) => {
    setText(value)
    setError1('')
  }
  const handleOLD = (value) => {
    setText(value)
    setError('')
  }
  return (
    <>
      <CContainer className="d-grid gap-2 d-md-flex justify-content-md-center">
        <CForm
          className="row mt-4 g-0 needs-validation"
          noValidate
          validated={validated}
          onSubmit={changepassword}
        >
          <CCard className="mt-4" style={{ width: '48rem' }}>
            <CCardHeader className="d-grid gap-2 d-md-flex justify-content-md-center fs-5 fw-bold">
              <h3> Change Password</h3>
            </CCardHeader>
            <CCardBody className="mx-4 mt-2 ml-2">
              <CRow className="mt-4 mb-4" md={12}>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">Existing Password</CFormLabel>
                </CCol>
                <CCol md={8} >
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                       type={passwordShown1 ? 'text' : 'password'}
                      id="current_password"
                      name="current_password"
                      defaultValue=""
                      placeholder="Existing Password"
                      onClick={handleOLD}
                      required
                      style={{ width: '300px',borderColor:'#D8DBE0' }}
                    />
                    <CInputGroupText>
                      <CImage src={e1} height="20px" width="15px" onClick={togglePassword1} />
                    </CInputGroupText>
                    <CFormFeedback invalid>Please enter existing password</CFormFeedback>
                  </CInputGroup>{' '}
                  {error && (
                    <p className="text-danger" color="red">
                      {error}
                    </p>
                  )}
                </CCol>
              </CRow>
              <CRow className="mb-4" md={12}>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">New Password </CFormLabel>
                </CCol>
                <CCol md={8}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      name="new_password"
                      id="new_password"
                      placeholder="New Password"
                      autoComplete="current-password"
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      style={{ width: '300px' ,borderColor:'#D8DBE0' }}
                    />
                    <CInputGroupText>
                      <CImage src={e1} height="20px" width="15px" onClick={togglePassword} />
                    </CInputGroupText>
                    <CFormFeedback invalid>
                      Password must contain: one lowercase character<br></br>one uppercase character
                      <br></br> one number<br></br> one special character<br></br> 8 character
                      minimum
                    </CFormFeedback>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow md={12} className="mb-4">
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">Confirm Password </CFormLabel>
                </CCol>
                <CCol md={8}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                       type={passwordShown2 ? 'text' : 'password'}
                       style={{ width: '300px',borderColor:'#D8DBE0' }}
                      id="password2"
                      name="password2"
                      defaultValue=""
                      required
                      placeholder="Confirm Password"
                      onClick={handleDes}
                    />
                    <CInputGroupText>
                      <CImage src={e1} height="20px" width="15px" onClick={togglePassword2} />
                    </CInputGroupText>
                    <CFormFeedback invalid>Please enter confirm password</CFormFeedback>
                  </CInputGroup>
                  {error1 && (
                    <p className="text-danger" color="red">
                      {error1}
                    </p>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter className="bg-white border border-0">
              <CRow md={12}>
                <CCol md={12} className="d-grid mb-2 gap-2 d-md-flex justify-content-md-center">
                  <CButton
                    type="submit"
                    size="md"
                    style={{ backgroundColor: selectedColor, color: 'white' }}
                  >
                    Reset Password
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CForm>
      </CContainer>
    </>
  )
}

export default Password
