import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import { CSmartTable, CFormFeedback } from '@coreui/react-pro'
import {
  CButton,
  CFormInput,
  CForm,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CFormLabel,
  CImage,
  CFormSelect,CCardBody,CCard,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil,  } from '@coreui/icons'
function Topic() {
  const history = useNavigate()
  let api = useAxios()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  let [notes4, setNotes4] = useState([])
  let [userdata, setUserdata] = useState()
  const [id, setid] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validated, setValidated] = useState(false)
  const [status1, setstatus1] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)

  const disableButton = () => {
    setIsDisabled(true)
  }

  useEffect(() => {
    get_reason()
  }, [])

  let get_reason = async () => {
    let response = await api.get('api/users/')
    if (response.data.success === 1) {
      let data = []
      let data1 = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        data.push(a.email)
        data1.push(a.mobile_no)
      }
      setNotes1(data)
      setNotes2(data1)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  useEffect(() => {
    getTopic()
  }, [])



  let getTopic = async () => {
    let response = await api.get('api/get_user_list/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          id: a.id,
          name: a.name,
          email: a.email,
          mobile_no: a.mobile_no,
          address1: a.address1,
          address2: a.address2,
          pincode: a.pincode,
          country: a.country,
          landmark: a.landmark,
          state: a.state,
          created_at: a.created_at,
          role: a.role,
          created_by: a.created_by,
          is_active: a.is_active === true ? 'Active' : 'Inactive',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.push(options)
      }
      setNotes(data)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  let getrefresh = () => {
    window.location.reload()
  }



  const columns = [
    {
      key: 'sr_no',
      label: 'Sr. No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '75px' },
    },
    {
      label: 'Name',
      key: 'name',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
      sorter: false,
    },
    {
      label: 'Email',
      key: 'email',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
      sorter: false,
    },

    {
      label: 'Created Date',
      key: 'created_at',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },

    {
      label: 'Mobile No',
      key: 'mobile_no',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '80px' },
      sorter: false,
    },
    {
      label: 'Status',
      key: 'is_active',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    {
      key: 'Action',
      label: 'Action',
      // _style: { width: '9%' },
      filter: false,
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
  ]
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} - ${month} - ${year}  ${hours}:${minutes}`;

  }

  let active_options=[
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ]

  let get_status =  (sta) => {
    console.log(sta)
    let active =[]
    for (let i = 0; i < active_options.length; i++) {
      let a = active_options[i]
      if(sta == a.label){
        active.push(a)
      }
    }
    for (let i = 0; i < active_options.length; i++) {
      let a = active_options[i]
      if(sta != a.label){
        active.push(a)
      }
    }
    setstatus1(active)
  }
  return (
    <>
      <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
      <h3 className="mb-0" style={{ color: '#2C384A' }}>Premium Plan</h3>
      <CButton
      onClick={() => { setVisible1(!visible1) }}
      className="mt-2"
      style={{
        backgroundColor: '#2596be',
        color: 'white',
        border: 'none',
        fontWeight: '500',
  
      }}
      >
     Add New
     </CButton>
     </div>


         <CRow xm={{cols:12}}>
          <CCol xs={12}>
          <CCard className="mb-1 shadow bg-body rounded">
          <CCardBody>
            <CSmartTable
              activePage={1}
              clickableRows
              columns={columns}
              columnSorter
              items={notes}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{
                Action: (item) => (
                  <td>
                    <Link to="#">
                      <CIcon
                        icon={cilPencil}
                        style={{ color: 'blue' }}
                        size="md"
                        title="Edit"
                        onClick={() => [setUserdata(item),
                        setid(item.id),
                        get_status(item.is_active),
                        setVisible2(!visible2)]}
                      />
                    </Link>
                    &nbsp;&nbsp;&nbsp;

                    <Link to={'/Onboardingview/' + `${item.id}`}>

                      <CImage src={e1} width={17} height={15} title="View Details" />
                    </Link>
                  </td>
                ),

                sr_no: (item, index) => <td>{index + 1}</td>,
                created_at: (item) => (
                  <td>
                    {formatDate(item.created_at)}
                  </td>
                ),

              }}
              sorterValue={{ coloumns: 'created_at', state: 'asc' }}
              itemsPerPageOptions={[10, 20, 50, 100]}
              tableFilter
              tableProps={{
                color: 'success-color-secondary',
                hover: true,
                border: '1.5px solid #074',
                responsive:true,
              }}
              tableFilterLabel={'Search : '}
              tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
              
            />
             </CCardBody>
            </CCard>
          </CCol>
        </CRow>
   

        </div>
      
     
    
    

    </>
  )
}
export default Topic
