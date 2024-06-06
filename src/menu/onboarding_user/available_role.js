import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
// import Select from 'react-select'

import { cilTrash, cilCheck, cilPencil } from '@coreui/icons'
import {

  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CModal,
  CFormCheck,
  CFormLabel,
  CFormFeedback,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,CRow,CCard,CCardBody,
  CTable,CSpinner,
} from '@coreui/react'
import AuthContext from 'src/context/AuthContext'


const Projects = () => {
  const history = useNavigate()
  const { user, roledata } = useContext(AuthContext)
  let api = useAxios()
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  const [visible1, setVisible1] = useState(false)
  const [emp, setEmp] = useState(false)
  const [role, setRole] = useState(false)
  let [isSubmitting, setisSubmitting] = useState(false)
  const [userinfo, setUserInfo] = useState({
    numbers: [],
    response: [],
  })
  let data = []
  let data1 = []
  let data2 = []
 
//   const handleChange = (e) => {
//     // Destructuring
//     const { value, checked } = e.target
//     const { numbers } = userinfo

//     // Case 1 : The user checks the box
//     if (checked) {
//       setUserInfo({
//         numbers: [...numbers, value],
//         response: [...numbers, value],
//       })
//     }

//     // Case 2  : The user unchecks the box
//     else {
//       setUserInfo({
//         numbers: numbers.filter((e) => e !== value),
//         response: numbers.filter((e) => e !== value),
//       })
//     }
//   }

  useEffect(() => {
    getcreate_project()
  }, [])

  let getcreate_project = async () => {
    // let response = await api.get('/api/customrole/')
    // if (response.status === 200) {
      
    //   setNotes(response.data)
    // } else {
    //   alert('something went wrong')
    // }
  }

  const updateProject = async (e) => {
    // e.preventDefault()
    // let response = await api.put(`/api/checkpoint/`, {
    //   role_name: e.target.role_name.value,
    // })
    // if (response.status === 200) {
    //   setisSubmitting(false)

    //   e.target.role_name.value = ''
    //   getcreate_project()
    //   history('/roles/appadmin/master/Role/avaliable')
    //   alert('Data updated')
    // } else {
    //   alert('Something went wrong!')
    // }
  }

  const deleteUser = async (pid) => {
    // let response = await api.delete(`/api/customrole/${pid}/`)
    // if (response.status === 204) {
    //   getcreate_project()
    //   history('/roles/appadmin/master/Role/avaliable')
    //   alert('data deleted')
    // } else {
    //   alert('Something went wrong!')
    // }
  }

  return (
    <>
    
    <CRow>
        <CCol xs={12}>
          <CCard className="mb-1 shadow bg-body rounded">
            <CCardBody>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"> Available Roles </CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
          <CTableRow style={{ backgroundColor: '#d5f1de', color: 'black' }}>
            <CTableHeaderCell scope="col">Sr. No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {notes.map((note,index) => (
            <CTableRow > 
              {/* key={note.id} */}
             <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
              <CTableDataCell>{note.role_name}</CTableDataCell>
              <CTableDataCell>
                {/* <Link to={`/roles/appadmin/master/Role/avaliable/${note.id}`}> */}
                  <CIcon
                    icon={cilPencil}
                    style={{ color: 'rgb(0,98,49)' }}
                    size="sm"
                    title="Edit"
                    // onClick={() => [
                    //   setVisible1(!visible1),
                    //   setRole(note.role_name),
                    //   setEmp(note.emp),
                    // ]}
                  />
                {/* </Link> */}
                &nbsp;&nbsp;
                {/* <Link
                  to="#"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      'Are you sure, you want to delete this Role?',
                    )
                    if (confirmBox === true) {
                      deleteUser(note.id)
                    }
                  }}
                >
                  <CIcon icon={cilTrash} style={{ color: 'red' }} title="Delete" />
                </Link> */}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* <CModal size="xl" scrollable visible={visible1} onClose={() => setVisible1(false)}>
        <CModalHeader
          onClose={() => setVisible1(false)}
          style={{ backgroundColor: 'rgb(0, 98, 49)', color: 'white' }}
        >
          <CModalTitle>Edit Role</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <>
          <CForm
        className="row g-3 needs-validation"
        style={{ margin: '10px' }}
        noValidate
        // onSubmit={saveProject}
      >
        <CTable class="table table-bordered">
          <CTableHead>
            <CTableRow style={{ backgroundColor: '#d5f1de', color: 'black' }}>
              <CTableHeaderCell scope="col">Sr. No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Modules Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Sub Modules Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">View</CTableHeaderCell>
              <CTableHeaderCell scope="col">Create</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Dashboard</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck id="flexCheckDefault" 
                name="check1"
                 onChange={handleChange} 
                value={1} 
               
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck disabled />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck disabled />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck disabled />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Checklist master</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck id="flexCheckDefault" name="check2" onChange={handleChange} value={2} />
              </CTableDataCell>

              <CTableDataCell>
                <CFormCheck id="flexCheckDefault" name="check3" onChange={handleChange} value={3} />
              </CTableDataCell>

              <CTableDataCell>
                <CFormCheck id="flexCheckDefault" onChange={handleChange} value={4} />
              </CTableDataCell>

              <CTableDataCell>
                <CFormCheck id="flexCheckChecked" name="check5" onChange={handleChange} value={5} />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">3</CTableHeaderCell>
              <CTableDataCell>Project</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={6}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={7}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={8}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={9}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">4</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Create Project</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={10}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={11}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={12}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={13}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">5</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Maintain Document</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={14}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={15}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={16}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={17}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">6</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Create Project team</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={18}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={19}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={20}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={21}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">7</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Assign Task</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={22}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={23}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={24}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={25}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">8</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>fillup Checklist</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={26}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={27}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={28}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={29}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">9</CTableHeaderCell>
              <CTableDataCell>Master</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={30}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={31}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={32}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={33}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">10</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>User</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={34}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={35}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={36}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={37}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">11</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>User role maintain</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={38}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={39}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={40}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={41}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">12</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Assign user role</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={42}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={43}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={44}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={45}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">13</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Contibuter Contractor</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={46}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={47}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={48}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={49}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">14</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Contributer vendor</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={50}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={51}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={52}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={53}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">15</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Contibuter OEM</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={54}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={55}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={56}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={57}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">16</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Gallery</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={58}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={59}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={60}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={61}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">17</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Deviation</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={62}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={63}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={64}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={65}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">18</CTableHeaderCell>
              <CTableDataCell>Report</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={66}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={67}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={68}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={69}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">19</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>NC report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={70}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={71}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={72}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={73}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">20</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Deviation Report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={74}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={75}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={76}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={77}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">21</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Project level Report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={78}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={79}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={80}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={81}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">22</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>State level report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={82}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={83}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={84}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={85}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">23</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>contry level Report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={86}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={87}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={88}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={89}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">24</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>process level report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={90}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={91}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={92}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={93}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">25</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>location level Report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={94}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={95}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={96}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={97}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">26</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>mileston level report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={98}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={99}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={100}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={101}
                />
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">27</CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>Check point level report</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check10"
                  onChange={handleChange}
                  value={102}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check11"
                  onChange={handleChange}
                  value={103}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckDefault"
                  name="check12"
                  onChange={handleChange}
                  value={104}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  id="flexCheckChecked"
                  name="check13"
                  onChange={handleChange}
                  value={105}
                />
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <CButton onClick={() => setisSubmitting(true)} type="submit"
              style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white', height: "40px", width: "100px" }}>
              <span aria-hidden="true" style={{ fontSize: '18px' }}></span> 
              <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
            &nbsp;Submit
               {isSubmitting && (
                <CSpinner size="sm"
                style={{paddingLeft:"5px"}}/>
                )}
            </CButton >
      </CForm>
          </>
        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => setVisible1(false)}
            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
          >
            <span aria-hidden="true" style={{ fontSize: '12px' }}>
              &times;
            </span>
            &nbsp;Close&nbsp;
          </CButton>
        </CModalFooter>
      </CModal> */}
      </CCardBody>
      </CCard>
      </CCol>
      </CRow>
    </>
  )
}
export default Projects
