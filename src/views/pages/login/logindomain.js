import React, { useContext, useEffect, useState, } from 'react'
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
  CImage, CInputGroupText
} from '@coreui/react'
import Footer from 'src/layout/footer'
import { useNavigate } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import useAxios from 'src/utils/newuseAxios'
import Signupimg from 'src/assets/images/SignUP.png'
import Header from 'src/layout/header'

function CreateProject() {
  const history = useNavigate()
  const { user, roledata } = useContext(AuthContext)
  let api = useAxios()
  let [notes, setNotes] = useState()
  let [notes1, setNotes1] = useState()
  let [site1, setsite1] = useState()
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)


  // useEffect(() => {
  //   get_reason()
  // }, [])

  let get_reason = async () => {
    let response = await api.get('/saas/api/is-valid-domain/')
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        data.push(a.site)
      }
      setNotes1(data)
      // console.log(notes1);
    } else if (response.data.success === 0) {
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //   alert(a)
      // }
    }
  }

  const saveTopic = async (e) => {
    const form = e.currentTarget;   //currentTarget
    e.preventDefault();
    if (form.checkValidity() === true) {
        const uploadData = new FormData(e.target);
        let response = await api.post('/saas/api/is-valid-domain/', uploadData);
        const sitename = uploadData.get('site'); // Assuming 'site' is the name of the input field containing the site name
        // console.log(response);
        if (response.data.success === 1) {
            // alert('Domain is valid');
            setValidated(false);
            get_reason();
            redirectToLogin(sitename);
        } else if (response.data.success === 0) {
            alert('Domain is invalid');
        }
    } else {
        setValidated(true);
    }
};

const redirectToLogin = (sitename) => {
    const newDomain = window.location.hostname; // Current domain
    const newPath = '/#/login'; // Path to the login page
    // window.location.href = `https://${sitename}.${newDomain}${newPath}`;
    window.location.href = `http://${sitename}.${newDomain}:3000${newPath}`
};

// useEffect(() => {
//     saveTopic();
// }, []);

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
              onSubmit={saveTopic}
            >
              <CRow className="justify-content-center mx-4">
                <h5 className="justify-content-center mx-4">Enter Register Domain Name</h5>

                <CRow className="mb-3">
                  <CCol sm={12} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Domain Name<span className="text-danger">*</span>
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type="text"
                        id="site"
                        name="site"
                        pattern="^\S.*$"
                        required
                        maxLength={50}
                        minLength={3}
                      />
                      <CInputGroupText>
                        <h6>.ivendmsoft.com</h6>
                      </CInputGroupText>
                      <CFormFeedback invalid>Please enter your domain name</CFormFeedback>
                    </CInputGroup>
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
