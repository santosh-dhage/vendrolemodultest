import React, { useState, useEffect } from 'react'
import { CForm, CCol, CRow } from '@coreui/react-pro'
import useAxios from 'src/utils/useAxios'
import Logo from './adminsetting'
import { useNavigate } from 'react-router-dom'
import Indexfile from 'src/roles/superadmin/webmaster/staticindex'

const Faqs = () => {
  let [notes, setNotes] = useState([])
  let api = useAxios()
  const history = useNavigate()
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    getcreate_project()
  }, [])

  let getrefresh = () => {
    window.location.reload()
  }

  let getcreate_project = async () => {
    let response = await api.get('/machine/site_settings_api_for_logo/')
    if (response.data.success === 1) {
      setNotes(response.data.result)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  let base25 = '/'
  let uri25 = 'src/menu/adminsetting/logo'
  let encoded25 = window.btoa(uri25)

  const saveProject = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      let response = await api.post('/machine/tenant_upload_logo/', uploadData)
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('Content created')
        getcreate_project()
        history(base25 + encoded25)
        getrefresh()
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
    setValidated(true)
  }

  const updateProject = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      if (e.target.website_logo1.files[0]) {
        uploadData.append('logo', e.target.logo.files[0])
      }
      let response = await api.put(`/machine/tenant_upload_logo/${notes[0]?.id ? notes[0].id : ''}/`, uploadData)
      if (response.data.success === 1) {
        alert(response.data.message)
        getcreate_project()
        history(base25 + encoded25)
        getrefresh()
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
      <Indexfile />
         <CRow>
        <CCol xs={12}>
          <div className="mt-4">
            <CForm
              className="row g-3 needs-validation"
              style={{ margin: '10px' }}
              noValidate
              validated={validated}
              onSubmit={notes[0] ? updateProject : saveProject}
            >
              <Logo />
            </CForm>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Faqs



