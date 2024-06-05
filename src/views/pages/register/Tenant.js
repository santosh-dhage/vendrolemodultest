import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  CContainer,
  CButton,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CForm,
  CCard,
  CFormFeedback,
  CFormCheck,
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
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)

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
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity()) {
      const formData = new FormData(form)
      const formDataObject = {}
      formData.forEach((value, key) => {
        formDataObject[key] = value
      })
      sessionStorage.setItem('secondfrom', JSON.stringify(formDataObject))
      console.log(formData)
      history('/Tenantadmin')
    }
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
              onSubmit={saveTopic}
            >
              <CRow className="justify-content-center mx-4">
                <h5 className="justify-content-center mx-4">Enter Domain Name</h5>

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
                    </CInputGroup>
                    <CFormFeedback invalid>Please enter your domain name</CFormFeedback>
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
              {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <CButton color="primary" className="me-md-2">Button</CButton>
  <CButton color="primary">Button</CButton>
</div> */}
            </CForm>
          </CCard>
        </CCol>
      </CRow>

      <Footer />
    </>
  )
}
export default CreateProject
