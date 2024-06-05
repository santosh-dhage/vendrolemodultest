import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CFormInput,
  CButton,
  CCard,
  CForm,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react'
import useAxios from 'src/utils/useAxios'
import setting from './setting.css'
import { useColor } from 'src/menu/adminsetting/colorcontext'

const SmtpSetting = () => {
  let api = useAxios()
  let [notes, setNotes] = useState([])
  const [validated, setValidated] = useState(false)
  const { selectedColor } = useColor()

  useEffect(() => {
    getSMTPSetting()
  }, [])

  let getSMTPSetting = async () => {
    
    let response = await api.get('/api/customemail/')
    if (response.data.success === 1) {
      setNotes(response.data.result)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  const updateSetting = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      uploadData.append('use_tls', true)
      let response = await api.put(
        `/api/customemail/`,
        uploadData,
      )
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('SMTP Setting is updated')

        getSMTPSetting()
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
    setValidated(true)
  }

  const saveSetting = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      uploadData.append('email_use_tls', true)
      let response = await api.post('/api/customemail/', uploadData)
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('SMTP Setting is created')
        getSMTPSetting()
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
    setValidated(true)
  }

  return (
    <>
      <CRow sm={12} className="mb-4">
  <CCol className="d-grid gap-2 mt-2 d-md-flex justify-content-md-center">
    <CCard className="smtpcard region shadow bg-body rounded mt-4 mx-auto"> 
            <CForm
              onSubmit={notes[0] ? updateSetting : saveSetting}
              noValidate
              validated={validated}
            >
              <CCardHeader className="mb-4">
                <CRow>
                  <CCol className="d-grid  d-md-flex justify-content-md-center">
                    <h3>SMTP Setting</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody className="mx-4">
                <CRow className="mb-4">
                  <CCol sm={4}>Default From Email</CCol>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      id="default_from_email"
                      name="default_from_email"
                      defaultValue={notes[0]?.default_from_email}
                      required
                    ></CFormInput>
                  </CCol>
                </CRow>

                <CRow className="mb-4">
                  <CCol sm={4}>Email Host</CCol>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      id="email_host"
                      defaultValue={notes[0]?.email_host}
                      name="email_host"
                      required
                    ></CFormInput>
                  </CCol>
                </CRow>

                <CRow className="mb-4">
                  <CCol sm={4}>Email Host Username</CCol>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      id="email_host_user"
                      name="email_host_user"
                      defaultValue={notes[0]?.email_authentication_user_name}
                      required
                    ></CFormInput>
                  </CCol>
                </CRow>

                <CRow className="mb-4">
                  <CCol sm={4}>Email Host Password</CCol>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      id="email_host_password"
                      name="email_host_password"
                      defaultValue={notes[0]?.email_authentication_password}
                      required
                    ></CFormInput>
                  </CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol sm={4}>Email Port</CCol>
                  <CCol sm={8}>
                    <CFormInput
                    // type="number"
                      id="email_port"
                      name="email_port"
                      defaultValue={notes[0]?.email_port}
                      required
                    ></CFormInput>
                  </CCol>
                </CRow>

                {/* <CRow className="mt-2">
                  <strong>Note: You can edit this setting.</strong>
                </CRow> */}
              </CCardBody>
              <CCardFooter className="mt-4 bg-white">
                <CRow className="">
                  <CCol className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <CButton
                      className="mt-2 mx-auto"
                      type="submit"
                      style={{
                        backgroundColor: selectedColor
,
                        color: 'white',
                        border: 'none',
                       
                      }}
                    >
                      &nbsp;&nbsp; &nbsp;&nbsp;Save&nbsp;&nbsp; &nbsp;&nbsp;
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SmtpSetting
