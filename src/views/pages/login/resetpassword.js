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
import useAxios from 'src/utils/newuseAxios'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilLockLocked,  } from '@coreui/icons'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Password = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext)
  let api = useAxios()
  let { uid, token } = useParams()
  const history = useNavigate()
  const [validated, setValidated] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [passwordShown2, setPasswordShown2] = useState(false)

  const currentPassword = "Vendsoft@12";

  const changepassword = async (e, currentPassword) => {
    const form = e.currentTarget;
    e.preventDefault();
  
    if (form.checkValidity() === true) {
      const newPassword = e.target.new_password.value;
      const confirmPassword = e.target.confirm_password.value;  
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password must match.');
        return; 
      }  
      if (newPassword === currentPassword) {
        alert('New password cannot be the same as the current password.');
        return; 
      }  
      const uploadData = new FormData(e.target);
      uploadData.append('uidb64', uid);
      uploadData.append('token', token);
      let response = await api.post('/reset-password/', uploadData);  
      if (response.data.success === 1) {
        e.target.new_password.value = '';
        e.target.confirm_password.value = ''; // Clear confirm password field 
        alert('Your password is updated successfully.');
        setValidated(false);
        history('/login');
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i];
          alert(a);
        }
      }
    } else {
      setValidated(true);
    }
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown)

  }
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2)
  }
  return (
    <>
     <CContainer className="d-grid gap-2 d-md-flex justify-content-md-center">
  <CForm
    className="row mt-4 g-0 needs-validation"
    noValidate
    validated={validated}
    onSubmit={(e) => changepassword(e, currentPassword)}
  >
    <CCard className="mt-4" style={{ width: '48rem' }}>
      <CCardHeader className="d-grid gap-2 d-md-flex justify-content-md-center fs-5 fw-bold">
        <h3> Change Password</h3>
      </CCardHeader>
      <CCardBody className="mx-4 mt-2 ml-2">
        <CRow className="mt-4 mb-4" md={12}></CRow>
        <CRow className="mb-4" md={12}>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">New Password</CFormLabel>
          </CCol>
          <CCol md={8}>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <input
                type={passwordShown ? 'text' : 'password'}
                name="new_password"
                id="password1"
                placeholder="New Password"
                autoComplete="new-password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                style={{ width: '300px', borderColor: '#D8DBE0' }}
              />
              <CInputGroupText>
                <CImage src={e1} height="20px" width="15px" onClick={togglePassword} />
              </CInputGroupText>
              <CFormFeedback invalid>
                Password must contain: one lowercase character
                <br></br>one uppercase character
                <br></br>one number
                <br></br>one special character
                <br></br>8 character minimum
              </CFormFeedback>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow className="mb-4" md={12}>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Confirm Password</CFormLabel>
          </CCol>
          <CCol md={8}>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <input
                type={passwordShown2 ? 'text' : 'password'}
                name="confirm_password"
                id="password2"
                placeholder="Confirm Password"
                autoComplete="new-password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                style={{ width: '300px', borderColor: '#D8DBE0' }}
              />
              <CInputGroupText>
                <CImage src={e1} height="20px" width="15px" onClick={togglePassword} />
              </CInputGroupText>
              <CFormFeedback invalid>Please confirm your password.</CFormFeedback>
            </CInputGroup>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter className="bg-white border border-0">
        <CRow md={12}>
          <CCol md={12} className="d-grid mb-2 gap-2 d-md-flex justify-content-md-center">
            <CButton
              type="submit"
              size="md"
              style={{ color: 'white', backgroundColor: '#b20000' }}
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
