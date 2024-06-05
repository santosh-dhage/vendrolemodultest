import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  CContainer,
  CButton,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CForm, CCard,
  CFormFeedback,
  CFormCheck,
  CFormLabel,
  CInputGroup, CImage
} from '@coreui/react'
import { Link } from 'react-router-dom'
import Footer from 'src/layout/footer'
import { useNavigate, } from 'react-router-dom'
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
  let [notes3, setNotes3] = useState()
  let [otp1, setOtp1] = useState()
  let [otp2, setOtp2] = useState()
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [submitButton, setSubmitButton] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }

  useEffect(() => {
   // getTopic()
  }, [])
  let getrefresh = () => {
    window.location.reload()
  }
  let getTopic = async () => {
    let response = await api.get('')
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        if (a.is_active == '1') {
          data.push(a.domain_name)
        }
      }
      setNotes(data)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  useEffect(() => {
   // getcreate_project()
  }, [])

  let getcreate_project = async () => {
    let response = await api.get('')
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        data.push(a.official_email_id)
      }
      setNotes1(data)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }


  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`




  const saveTopic = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      sessionStorage.setItem('firstfrom', JSON.stringify(formDataObject));
      console.log(formData);
      history('/Tenant');
    }
  };
  return (
    <>

      <Header />

      <CRow className='mx-5 mt-5 mb-5'>
        <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
          <CImage src={Signupimg}  style={{ maxWidth: '100%', height: 'auto' }} />
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="h-100 text-center" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
            <CForm
              className="needs-validation mt-4"
              noValidate
              validated={validated}
              onSubmit={saveTopic}
            >
              <CRow className="justify-content-center mx-4 align-items-center">

                <CRow className="mb-2">
                  <CRow className="justify-content-center">
                    <h5 className="mx-4 mb-2 ">Enter Your Organization Details</h5>
                  </CRow>


                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Organization Name<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="organization_name"
                      name="organization_name"
                      // pattern="[A-Za-z\s]+"
                      pattern="^[^\d]+$"
                                  
                      onKeyPress={(e) => {
                        const keyCode = e.which || e.keyCode
                        const key = String.fromCharCode(keyCode)
                        const regex = /^[^\d]+$/
                        if (!regex.test(key)) {
                          e.preventDefault()
                        }
                      }}

                      required
                      maxLength={200}
                    />
                    <CFormFeedback invalid>Please enter your organization name</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      Industry Sector<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="industry_sector"
                      name="industry_sector"
                      pattern="[A-Za-z\s]+"
                      required
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your industry sector</CFormFeedback>
                  </CCol>

                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      Address 1<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="address1"
                      name="address"
                      // pattern="[A-Za-z\s]+"
                    
                      required
                      maxLength={200}
                    />
                    <CFormFeedback invalid>Please enter your address 1</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      Address 2
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="address2"
                      name="address2"
                      // pattern="[A-Za-z\s]+"
                     
                      // required
                      maxLength={200}
                    />
                    <CFormFeedback invalid>Please enter your address 2</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      Country<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="country"
                      name="country"
                      required
                      pattern="[A-Za-z\s]+"
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your country</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      State<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="state"
                      name="state"
                      required
                      pattern="[A-Za-z\s]+"
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your state</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">

                    <CFormLabel htmlFor="validationDefault01">
                      City<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="city"
                      name="city"
                     pattern="[A-Za-z\s]+"
                      required
                      maxLength={50}
                    />
                    <CFormFeedback invalid>Please enter your city</CFormFeedback>
                  </CCol>
                  <CCol sm={6} className="text-start">
                    <CFormLabel htmlFor="validationDefault01">
                      Pincode<span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      required
                      maxLength={6}
                      minLength={4}
                      pattern="^[0-9]+$"
                      onKeyPress={(e) => {
                        const keyCode = e.which || e.keyCode
                        const key = String.fromCharCode(keyCode)
                        const regex = /^[0-9]$/
                        if (!regex.test(key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                    <CFormFeedback invalid>Please enter your pincode</CFormFeedback>
                  </CCol>
                </CRow>
              </CRow>

              <CButton type="submit" style={{ backgroundColor: '#2596be', color: 'white' }} className="mx-5 mt-2 mb-2">
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
