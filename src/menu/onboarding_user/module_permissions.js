import React, { useState, useEffect } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'
import {
  CButton,
  CForm,
  CFormCheck,
  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CFormLabel,
  CFormFeedback,
  CCol,
  CTable,CRow,CCard,CCardBody,
  CFormInput,CSpinner,
} from '@coreui/react'


const CreateRole = () => {
  const history = useNavigate()
  let api = useAxios()
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
 const[validated,setvalidated]=useState(false)
 let [isSubmitting, setisSubmitting] = useState(false)
  const [userinfo, setUserInfo] = useState({
    numbers: [],
    response: [],
  })
  const [usermodule,setUsermodule]=useState([]);

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target
    const { numbers } = userinfo
   
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        numbers: [...numbers, value],
        response: [...numbers, value],
      })
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        numbers: numbers.filter((e) => e !== value),
        response: numbers.filter((e) => e !== value),
      })
    }
  }

let getcreate_project = async () => {
 
}
  const saveProject = async (e) => {
    const form = e.currentTarget
    .preventDefault()
    if (form.checkValidity() === true) {
      if (notes2?.some(note => note.role_name === e.target.role_name.value)) {
        alert('This Role already exists');
      } else {
      const uploadData = new FormData(e.target)
    let permission_data = []
    notes1.map((note) => {
      console.log(note.module_permission_no)
      if (userinfo.response.includes(note.module_permission_no)) {
        console.log(note.module_permission_no)
        permission_data.push(note.id)
      }
    })
//===============================================================================================
    let response = await api.post('/api/customrole/', {
      role_name: e.target.role_name.value,
      permision: permission_data,
    })
//================================================================================================
    if (response.status === 201) {
      setisSubmitting(false)
      alert('data submited')
      e.target.role_name.value = ''
      getcreate_project()
      history('/roles/appadmin/master/Role/assignrole')
    } else {
      alert('Something went wrong!')
    }
  }
}
  setvalidated(true)
}
console.log(notes2);
  const updateProject = async (e) => {
    e.preventDefault()
    let response = await api.put(`/api/customrole/`, {
      role_name: e.target.role_name.value,
      permision: userinfo.response,
    })

    if (response.status === 200) {
      e.target.role_name.value = ''
      getcreate_project()
      history('/roles/appadmin/master/Role/assignrole')
      alert('Data updated')
    } else {
      alert('Something went wrong!')
    }
  }

  const deleteUser = async (pid) => {
    let response = await api.delete(`/api/checkpoint/${pid}/`)
    if (response.status === 204) {
      getcreate_project()
      history('/roles/appadmin/master/Role/assignrole')
      alert('data deleted')
    } else {
      alert('Something went wrong!')
    }
  }
 function myfunc(e){
  const { value,checked } = e.target
  const { numbers } = userinfo
 
  // Case 1 : The user checks the box
  if (checked) {
    setUserInfo({
      numbers: [...numbers, value],
      response: [...numbers, value],
    })
  }

  // Case 2  : The user unchecks the box
  else {
    setUserInfo({
      numbers: numbers.filter((e) => e !== value),
      response: numbers.filter((e) => e !== value),
    })
  }
 }
  return (
    <>
    {/* <Indexfile /> */}

    <CRow>
        <CCol xs={12}>
          <CCard className="mb-1 shadow bg-body rounded">
            <CCardBody>
      <CForm
        className="row g-3 needs-validation"
        style={{ margin: '10px' }}
        // noValidate
        // validated={validated}
        // onSubmit={printt}
        // onSubmit={saveProject}
      >
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: '600' }}>
            Role Name
          </CFormLabel>
          <CFormInput type="text" id="validationCustom01" name="role_name" required />
          <CFormFeedback invalid>please Enter the  Role Name!</CFormFeedback>
        </CCol>
        <CTable class="table table-bordered">
          <CTableHead>
            <CTableRow style={{ backgroundColor: '#d5f1de', color: 'black' }}>
              <CTableHeaderCell scope="col">Sr. No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Modules Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Sub Modules Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">View</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Create</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Dashboard</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck 
                id="flexCheckDefault" 
                name="check1"
                onChange={handleChange} 
                value={"Dashboard"} 
                />
              </CTableDataCell>
  
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Onboarding</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck id="flexCheckDefault" 
                name="check2" 
                onChange={handleChange} 
                value={"Onboarding"} />
              </CTableDataCell>

            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">3</CTableHeaderCell>
              <CTableDataCell>Master</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Master"}
                />
              </CTableDataCell>
           
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">4</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>QR code</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"QR code"}
                />
              </CTableDataCell>

            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">5</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Product Type</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Product Type"}
                />
              </CTableDataCell>
           
           
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">6</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Model No</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Model No"}
                />
              </CTableDataCell>
           
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">7</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Machine Master</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Machine Master"}
                />
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">8</CTableHeaderCell>
              <CTableDataCell>Machine Mapping</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Machine Mapping"}
                />
              </CTableDataCell>
             
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">9</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>User</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"User"}
                />
              </CTableDataCell>
             
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">10</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Customer</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Customer"}
                />
              </CTableDataCell>
              
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">11</CTableHeaderCell>
              <CTableDataCell>History</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"History"}
                />
              </CTableDataCell>
              
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">12</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Machine History</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  // onChange={handleChange}
                  value={"Machine History"}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">13</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Payment History</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Payment History"}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">14</CTableHeaderCell>
              <CTableDataCell>Reports</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Reports"}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">15</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>User</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"User"}
                />
              </CTableDataCell>
              
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">16</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Customer</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Customer"}
                />
              </CTableDataCell>
             
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">17</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Payment</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Payment"}
                />
              </CTableDataCell>
              
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">18</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Refill</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"Refill"}
                />
              </CTableDataCell>
              
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">19</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>User MIS</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={"User MIS"}
                />
              </CTableDataCell>
              
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">20</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Customer MIS</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                
                  value={"Customer MIS"}
                />
              </CTableDataCell>
              
            </CTableRow>

          </CTableBody>
        </CTable>
        <CButton  type="submit"
              style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white', height: "40px", width: "100px" }}>
              {/* <span aria-hidden="true" style={{ fontSize: '18px' }}></span>  */}
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
            &nbsp;Submit
             
        </CButton >
      </CForm>
      </CCardBody>
      </CCard>
      </CCol>
      </CRow>
    </>
  )
}
export default CreateRole
