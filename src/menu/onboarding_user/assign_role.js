import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'

import { cilTrash, cilCheck, cilPencil, } from '@coreui/icons'
import {
    CButton,
    CForm,

    CModal,
    CFormLabel,
    CFormFeedback,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCol,
    CTable,
    CFormInput, CRow, CCardBody, CCard, CSpinner,
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
    const [emailid, setEmail] = useState(false)
    const [role, setRole] = useState(false)
    const [role1, setRole1] = useState(false)
    const [pid, setid] = useState(false)
    const [roleid, setRoleid] = useState(false)
    let [isSubmitting, setisSubmitting] = useState(false)
    let data = []
    let data1 = []
    let data2 = []
    useEffect(() => {
        getcreate_project()
    }, [])

    let getcreate_project = async () => {
        // let response = await api.get('/api/customrole/')
        let response1 = await api.get('/api/users/')

        if (response1.data.success === 1) {
            let newdata = []
            for (var i = 0; i < response1.data.result.length; i++) {
                let a = response1.data.result[i]
                let options = {
                    id: a.id,
                    email: a?.email,
                }

                newdata.push(options)
            }
            setNotes1(newdata)
        }
        // notes1.map((note)=>console.log(note.email+"+"+note.id))
        // if (response1.status === 200 && response.status === 200) {
        //   setNotes(response.data)
        //   let newdata = []
        //   for (var i = 0; i < response1.data.length; i++) {
        //     let a = response1.data[i]
        //     if (a.is_superuser === false) {
        //       if (a.role !== "oem") {
        //         if (a.role !== 'contractor') {
        //           let options = {
        //             id: a.id,
        //             email: a?.email,
        //             password: a?.password,
        //             role: a?.permissions ? a.permissions.role_name : "- - -"

        //           }

        //           newdata.push(options)
        //         }

        //       }
        //     }
        //   }
        //   setNotes1(newdata)
        //   console.log(newdata)
        // } else {
        //   alert('something went wrong')
        // }
    }


    notes1.map((note) => {
        let options = {
            label: note.email,
            value: note.id
        }
        data.push(options)
// console.log(options)
    })
    console.log(data+"select options data")

    let email
    let password
    notes1.map((note) => {
        if (note.id === emp.value) {
            email = note.email
            password = note.password
        }
    })



    const saveProject = async (e) => {
        // e.preventDefault()
        // if (!role) {
        //   alert('Please select the role')
        // }
        // else if (!email) {
        //   alert('Please select the employee mail id')
        // }
        // else {
        //   let response1 = await api.put(`/api/user_infoViewSet/${emp.value}/`, {
        //     permissions: role,
        //     email: email,
        //     username : email ,
        //     password: "Renew@2024",
        //   })
        //   if (response1.status === 200) {
        //     setisSubmitting(false)
        //     alert('Data Submited')
        //     getcreate_project()
        //     history('/roles/appadmin/master/Role/assignrole')
        //   } else {
        //     alert('Something went wrong!')
        //   }
        // }
    }

    const updateProject = async (e) => {
        // e.preventDefault()
        // console.log(role)
        // let email1
        // let password1
        // notes1.map((note) => {
        //   if (note.id === roleid) {
        //     email1 = note.email
        //     password1 = note.password
        //   }
        // })
        // let response = await api.put(`/api/user_infoViewSet/${roleid}/`, {
        //   permissions: role1,
        //   email: email1,
        //   username : email1 ,
        //   password: "Renew@2024",
        // })
        // if (response.status === 200) {
        //   // setisSubmitting(false)
        //   getcreate_project()
        //   history('/roles/appadmin/master/Role/assignrole')
        //   setVisible1(false)
        //   alert('Data updated')
        // } else
        //   alert('Something went wrong!')

    }

    const deleteUser = async (pid) => {
        // let response = await api.delete(`/api/customrole/${pid}/`)
        // if (response.status === 204) {
        //   getcreate_project()
        //   history('/roles/appadmin/master/Role/assignrole')
        //   alert('Data Deleted')
        // } else {
        //   alert('Something went wrong!')
        // }
    }
    const columns = [
        {
            key: 'sr_no',
            label: 'Sr No',
            sorter: false,
            _props: { color: 'success', className: 'fw-semibold' },
        },

        {
            label: 'Email',
            key: 'email',
            _props: { color: 'success', className: 'fw-semibold' },
        },
        {
            label: 'Role',
            key: 'role',
            _props: { color: 'success', className: 'fw-semibold' },
        },
        {
            key: 'Action',
            label: 'Action',
            _style: { width: '8%' },
            filter: false,
            sorter: false,
            _props: { color: 'success', className: 'fw-semibold' },
        },

    ]
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <>

            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-1 shadow bg-body rounded">
                        <CCardBody>
                            <div className="row mb-1">
                                <CForm
                                    className="row g-3 needs-validation"
                                    style={{ margin: '10px' }}
                                    noValidate
                                    onSubmit={saveProject}
                                >
                                    <CCol md={5}>
                                        <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: '600' }}>
                                            Role Name
                                        </CFormLabel>
                                        <Select options={data} onChange={(opt) => setRole(opt.value)} />
                                        <CFormFeedback valid>Looks good!</CFormFeedback>
                                    </CCol>
                                    <CCol md={5}>
                                        <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: '600' }}>
                                            Employee Email ID
                                        </CFormLabel>
                                        <Select name="assign_emp" options={data} onChange={(opt) => setEmp(opt)} />

                                        <CFormFeedback valid>Looks good!</CFormFeedback>
                                    </CCol>
                                    <CCol md={2} style={{ padding: '32px' }}>
                                        <CButton
                                            type="submit" style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white' }}>
                                            <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
                                            &nbsp;Submit
                                        </CButton>
                                    </CCol>
                                </CForm>
                            </div>


                            <CSmartTable
                                activePage={1}
                                cleaner
                                clickableRows
                                columns={columns}
                                columnSorter
                                items={notes1}
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                scopedColumns={{
                                    Action: (item) => (
                                        <td>
                                            <Link to="#">
                                                <CIcon
                                                    icon={cilPencil}
                                                    style={{ color: 'rgb(0,98,49)' }}
                                                    size="sm"
                                                    title="Edit"
                                                    onClick={() => [
                                                        setVisible1(!visible1),
                                                        setid(item.id),
                                                        setEmail(item.email),
                                                        setRoleid(item.id),
                                                    ]}
                                                />
                                            </Link>
                                            &nbsp;&nbsp;
                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        'Are you sure, you want to delete this user?',
                                                    )
                                                    if (confirmBox === true) {
                                                        deleteUser(item.id)
                                                    }
                                                }}
                                            >
                                                <CIcon icon={cilTrash} style={{ color: 'red' }} title="Delete" />
                                            </Link>
                                        </td>
                                    ),
                                    // sr_no: (item) => <td>{item._id + 1}</td>,
                                    sr_no: (item, index) => <td>{index + 1}</td>,

                                    // role:(item) =>{
                                    //   if(item.role == null){
                                    //     return(<td>- - -</td>)
                                    //   }else{
                                    //     return(<td>{item.role}</td>)
                                    //   }
                                    // }
                                }}
                                itemsPerPageOptions={[10, 20, 50, 100]}
                                tableFilter
                                tableProps={{
                                    color: 'success-color-dark',
                                    hover: true,
                                    responsive: true,
                                    border: '1.5px solid #074',
                                }}
                                tableFilterLabel={'Search : '}
                                tableFilterPlaceholder={'Enter String to Search'}
                                itemsPerPageLabel={'Rows per page:'}
                            />
                            {/* 
              <CModal visible={visible1} onClose={() => setVisible1(false)}>
                <CModalHeader
                  onClose={() => setVisible1(false)}
                  style={{ backgroundColor: 'rgb(0, 98, 49)', color: 'white' }}
                >
                  <CModalTitle>Change Role</CModalTitle>
                </CModalHeader>
                <CForm
                  className="row g-3 needs-validation"
                  style={{ margin: '10px' }}
                  noValidate
                  onSubmit={updateProject}
                >
                  <CModalBody>
                    <div className='row'>
                      <CCol md={6}>
                        <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: '600' }}>
                          Employee Email ID
                        </CFormLabel>
                        <CFormInput name="assign_emp" value={emailid} readOnly />

                        <CFormFeedback valid>Looks good!</CFormFeedback>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: '600' }}>
                          Role Name
                        </CFormLabel>
                        <Select options={data} onChange={(opt) => setRole1(opt.value)} />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                      </CCol>
                    </div>
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
                    <CButton
                     type="submit" style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white' }}>
              <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
              &nbsp;Submit
            </CButton>
                  </CModalFooter>
                </CForm>
              </CModal> */}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default Projects
