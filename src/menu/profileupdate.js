import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
// import { useNavigate } from 'react-router-dom'
import { CForm, CSmartTable } from '@coreui/react-pro'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
  CCardHeader,
  CFormInput,
  CFormFeedback,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'

import 'jspdf-autotable'
import { useColor } from 'src/menu/adminsetting/colorcontext';

function Topic() {
  let api = useAxios()
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [visible2, setVisible2] = useState(false)
  let [visible1, setVisible1] = useState(false)
  const { selectedColor } = useColor();
  const { user, authTokens } = useContext(AuthContext)
  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    console.log(authTokens.user.id+" check the authentication user id ")
    setNotes([]);
    if (authTokens.user.role == '2')  
    // if(false) 
    {
      let response = await api.get('api/users/' + authTokens.user.id + '/')
      let response1 = await api.get('saas/get_data/')
       console.log(response)
      if (response.data.success === 1) {
        setNotes1(response1.data.result[0])
        setNotes(response.data.result)
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
    else
    {
      let response = await api.get('api/users/' + authTokens.user.id + '/')
     
      if (response.data.success === 1) {
        setNotes(response.data.result)
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
  
  }

  const savetopic = async (e) => {

    console.log("inside savetopic ")
    e.preventDefault()
    const uploadData = new FormData(e.target)
    console.log(uploadData + 'santosh dhage')
    // if(e.profile_img==null)
    // {
    //   console.log("empty image inside if"+e.target.profile_img);
    //   e.profile_img=profile_img1;
    // }
    if (!e.target.profile_img.files[0]) {
      // uploadData.append('profile_img', e.target.profile_img.files[0])
      const newFormData = new FormData();
      for (const [key, value] of uploadData.entries()) {
        if (key!='profile_img') {
          newFormData.append(key, value); // Append only the fields not in the exclude list
        }
  

      let response=await api.patch('api/users/' + authTokens.user.id + '/', newFormData)
      setNotes(response.data.result)
    } 

  }else{
    let response = await api.patch('api/users/' + authTokens.user.id + '/', uploadData)
    if (response.data.success === 1) {
      setNotes(response.data.result)
      
      // getTopic()
      // setPhoto('public'+response.data.result.profile_img)
      // console.log('public' + response.data.result.name)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
    // console.log(authTokens.user.profile_img + authTokens.user.name + 'check authtoken santosh')

    // setVisible2(false)
    window.location.reload()
    //  loginUser();
    // sessionStorage.removeItem(e.tartget)
  }
}

  const savetopic1 = async (e) => {

    console.log("inside savetopic ")
    e.preventDefault()
    const uploadData = new FormData(e.target)
    // const uploadData1=new FormData(e.target)
    // console.log(uploadData + 'santosh dhage')

    let response1 = await api.patch('saas/update_data/', uploadData)
    if (e.target.profile_img.files[0]) {
      // uploadData.append('profile_img', e.target.profile_img.files[0])
      let response=await api.patch('api/users/' + authTokens.user.id + '/', uploadData)
      setNotes(response.data.result)
    } 
    // let response=await api.patch('api/users/' + authTokens.user.id + '/', uploadData)
    if (response1.data.success === 1) {
      setNotes1(response1.data.result)
      // setNotes(response.data.result)
      // getTopic()
      // setPhoto('public'+response.data.result.profile_img)
      // console.log('public' + response.data.result.name)
    } else if (response1.data.success === 0) {
      for (let i = 0; i < Object.values(response1.data.result).length; i++) {
        let a = Object.values(response1.data.result)[i]
        alert(a)
      }
    }
    // console.log(authTokens.user.profile_img + authTokens.user.name + 'check authtoken santosh')

    setVisible2(false)
    window.location.reload()
    //  loginUser();
    // sessionStorage.removeItem(e.tartget)
  }
  return (
    <>
      <CContainer className="mb-4">
        <h3>&nbsp; Profile</h3>
        {authTokens.user.role == '1' ? (
          ' '
        ) :  authTokens.user.role == '2' ? (
          <CCard className="mt-4">
            <CCardHeader>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Personal Details</p>
                  <CButton style={{ backgroundColor: selectedColor, color: 'white' }} variant="outline" onClick={() => setVisible2(true)}>
                    Edit
                  </CButton>
                </div>
              </div>
            </CCardHeader>

            <CCardBody className="mx-2">
              <CRow sm={12} className="mb-2">
                <CCol sm={2}>
                  <p>Organization :</p>
                </CCol>
                <CCol sm={4}>{notes1?.organization_name}</CCol>
                <CCol sm={2}>
                <p>Industry Sector :</p>
              </CCol>
              <CCol sm={4}>{notes1?.industry_sector}</CCol>
              </CRow>

              <CRow sm={12} className="mb-2">
                <CCol sm={2}>
                  <p>First Name:</p>
                </CCol>
                <CCol sm={4}>{notes1?.first_name}</CCol>
                <CCol sm={2}>
                  <p>Last Name :</p>
                </CCol>
                <CCol sm={4}>{notes1?.last_name}</CCol>
              </CRow>
              <CRow sm={12} className="mb-2">
                <CCol sm={2}>
                  <p>Mobile:</p>
                </CCol>
                <CCol sm={4}>{notes1?.contact_no}</CCol>
                <CCol sm={2}>
                  <p>Email:</p>
                </CCol>
                <CCol sm={2}>{notes1?.email_id}</CCol>
              </CRow>
              <CRow sm={12} className="mb-2">
                <CCol sm={2}>
                  <p>Address1:</p>
                </CCol>
                <CCol sm={4}>{notes1?.address1}</CCol>
                <CCol sm={2}>
                  <p>Address2:</p>
                </CCol>
                <CCol sm={4}>{notes1?.address2}</CCol>
              </CRow>
            </CCardBody>
          </CCard>
        ) : (
          <CCard className="mt-4">
            <CCardHeader>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Personal Details</p>
                  <CButton style={{ backgroundColor: selectedColor, color: 'white' }} variant="outline" onClick={() => setVisible1(true)}>
                    Edit
                  </CButton>
                </div>
              </div>
            </CCardHeader>

            <CCardBody className="mx-2">
              <CRow sm={12} className="mb-2">
                <CCol sm={2}>
                  <p>Name:</p>
                </CCol>
                <CCol sm={4}>{notes.name}</CCol>

              </CRow>
              <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                  <p>Mobile:</p>
                </CCol>
                <CCol sm={4}>{notes.mobile_no}</CCol>
                <CCol sm={2}>
                  <p>Email:</p>
                </CCol>
                <CCol sm={4}>{notes.email}</CCol>

              </CRow>
              <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                  <p>Address1:</p>
                </CCol>
                <CCol sm={4}>{notes.address1}</CCol>
                <CCol sm={2}>
                  <p>Address2:</p>
                </CCol>
                <CCol sm={4}>{notes.address2}</CCol>
              </CRow>
              <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                  <p>Pincode :</p>
                </CCol>
                <CCol sm={4}>{notes?.pincode}</CCol>
                <CCol sm={2}>
                  <p>State :</p>
                </CCol>
                <CCol sm={4}>{notes?.state}</CCol>
              </CRow>
              <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                  <p>Country :</p>
                </CCol>
                <CCol sm={4}>{notes?.country}</CCol>
              </CRow>
            </CCardBody>
          </CCard>
        )}
      </CContainer>

      <CModal size={'lg'} visible={visible2} onClose={() => setVisible2(false)} backdrop="static">
        <CModalHeader
          onClose={() => setVisible2(false)}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Edit Profile Details</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
            validated={false}
          onSubmit={savetopic1}
        >
          <CModalBody>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="organization">Organization </CFormLabel>
                <CFormInput
                  type="text"
                  id="organization"
                  name="organization_name"
                  // required
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.organization_name}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="industry_sector">Industry Sector </CFormLabel>
                <CFormInput
                  type="text"
                  id="industry_sector"
                  name="industry_sector"
                  // required
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.industry_sector}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>

            </CRow>

            <CRow sm={12} className="mb-1">
            <CCol sm={6}>
                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="first_name"
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.first_name}
                  name="first_name"
                  // required
                  maxLength={50}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[a-zA-Z]*$/
                    if (!regex.test(key)) {
                      e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your first name</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="last_name"
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.last_name}
                  name="last_name"
                  // required
                  maxLength={50}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[a-zA-Z]*$/
                    if (!regex.test(key)) {
                      e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your last name</CFormFeedback>
              </CCol>
            </CRow>


            <CRow sm={12} className="mb-1">

              <CCol sm={6}>
                <CFormLabel htmlFor="address1">Address 1</CFormLabel>
                <CFormInput
                  type="text"
                  id="address1"
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.address1}
                  name="address1"
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your address1</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="address2">Address 2</CFormLabel>
                <CFormInput
                  type="text"
                  id="address2"
                  name="address2"
                  // pattern="[A-Za-z\s]+"
                  pattern="[a-zA-Z]*"
                  defaultValue={notes1?.address2}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your address2</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-1">

              <CCol sm={6}>
                <CFormLabel htmlFor="contact_no">Mobile No.</CFormLabel>

                <CFormInput
                  type="text"
                  id="contact_no"
                  name="contact_no"
                  defaultValue={notes1?.contact_no}
                  // required
                  maxLength={15}
                  minLength={8}
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
                <CFormFeedback invalid>Please enter your mobile no</CFormFeedback>
              </CCol>

              <CCol sm={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email_id"
                  pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  defaultValue={notes1?.email_id}
                  name="email_id"
                  // required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your email</CFormFeedback>
              </CCol>

            </CRow>

            <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                <p> Current Profile Photo :</p>
              </CCol>
              <CCol sm={4}>
                <img src={notes?.profile_img} width={'150'} height={'100'} />
              </CCol>
           
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="profile_img">Profile Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="profile_img"
                  name="profile_img"
                  // defaultValue={notes?.profile_img}
                  // required={!authTokens?.user?.profile_photo}
                  maxLength={50}
                  size="sm"
                  accept=".png ,.jpg"
                  onChange={(event) => {
                    const file = event.target.files[0]
                    const maxSize = 2 * 1024 * 1024 // 5 KB in bytes

                    if (file && file.size > maxSize) {
                      event.target.value = null // Clear the input field
                      alert('Image size should be maximum 2MB.')
                    }
                  }}
                />
                <p> Image format must be .png or .jpg </p>
                <CFormFeedback invalid>Please Upload profile piture</CFormFeedback>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => setVisible2(false)}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white' }}>
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CModal size={'lg'} visible={visible1} onClose={() => setVisible1(false)} backdrop="static">
        <CModalHeader
          onClose={() => setVisible1(false)}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Edit Profile Details</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
          //  validated={false}
          onSubmit={savetopic}
        >
          <CModalBody>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="first_name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="first_name"
                  name="name"
                  // required
                  pattern="[A-Za-z\s]+"
                  defaultValue={notes?.name}
                  maxLength={50}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[a-zA-Z]*$/
                    if (!regex.test(key)) {
                      e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  defaultValue={notes?.email}
                  name="email"
                  // required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your email</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="mobile_no">Mobile No.</CFormLabel>

                <CFormInput
                  type="text"
                  id="mobile_no"
                  name="mobile_no"
                  defaultValue={notes?.mobile_no}
                  // required
                  maxLength={15}
                  minLength={8}
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
                <CFormFeedback invalid>Please enter your mobile no</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="address1">Address 1</CFormLabel>
                <CFormInput
                  type="text"
                  id="address1"
                  defaultValue={notes?.address1}
                  name="address1"
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your address1</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="address2">Address 2</CFormLabel>
                <CFormInput
                  type="text"
                  id="address2"
                  name="address2"
                  defaultValue={notes?.address2}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your address2</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="pincode">Pincode</CFormLabel>
                <CFormInput
                  type="text"
                  id="pincode"
                  defaultValue={notes?.pincode}
                  name="pincode"
                  maxLength={6}
                  minLength={4}
                  pattern="^[0-9]+$"
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[0-9]$/
                    if (!regex.test(key)) {
                      // e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your pincode</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormInput
                  type="text"
                  id="country"
                  defaultValue={notes?.country}
                  name="country"
                  pattern="[A-Za-z\s]+"
                  maxLength={50}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[A-Za-z\s]$/
                    if (!regex.test(key)) {
                      e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your country</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="state">State</CFormLabel>
                <CFormInput
                  type="text"
                  defaultValue={notes?.state}
                  id="state"
                  name="state"
                  pattern="[A-Za-z\s]+"
                  maxLength={50}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[A-Za-z\s]$/
                    if (!regex.test(key)) {
                      e.preventDefault()
                    }
                  }}
                />
                <CFormFeedback invalid>Please enter your state</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-2">
              <CCol sm={2}>
                <p> Current Profile Photo :</p>
              </CCol>
              <CCol sm={4}>
                <img id="image" src={notes?.profile_img} width={'150'} height={'100'} />
              </CCol>
              
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="profile_img">Profile Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="profile_img"
                  name="profile_img"
                  defaultValue={document.getElementById('image')?.src}
                  maxLength={50}
                  size="sm"
                  accept=".png , .jpg"
                  onChange={(event) => {
                    const file = event.target.files[0]
                    const maxSize = 2 * 1024 * 1024 // 5 KB in bytes

                    if (file && file.size > maxSize) {
                      event.target.value = null // Clear the input field
                      alert('Image size should be maximum 2MB.')
                    }
                  }}
                />
                <p> Image format must be .png or .jpg </p>
                <CFormFeedback invalid>Please Upload profile piture</CFormFeedback>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => setVisible1(false)}
              style={{ backgroundColor: selectedColor, color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" onClick={() => setVisible1(false)} style={{ backgroundColor: selectedColor, color: 'white' }}>
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}
export default Topic
