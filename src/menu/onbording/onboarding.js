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
  CFormSelect,CCardBody,CCard,CSpinner,
} from '@coreui/react-pro'

import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil,  } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext';
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
  const { selectedColor } = useColor();
  const { colorName } = useColor();
  const [loader, setLoader]=useState(false)

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
    // console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        // console.log(a)
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
          spoc_id:a.spoc_id,
          organization:a.organization,
          created_by: a.created_by,
          is_active: a.is_active === true ? 'Active' : 'Inactive',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.push(options)
      }
      // setLoading(true)
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
   const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
  
    if (form.checkValidity() === true) {
      // setLoading(true);
      
      if (notes1?.includes(e.target.email.value)) {
        alert(`This email already exists`);
      } else {
        if (notes2?.includes(e.target.mobile_no.value)) {
          alert(`This mobile number already exists`);
        } else {
          
  setLoader(true);
          const uploadData = new FormData(e.target);
  
          uploadData.append('password', 'Vendsoft@12');
          uploadData.append('email', e.target.email.value.toLowerCase());
          uploadData.append('is_active', true);
          uploadData.append('role', '4');
  
          try {
            let response = await api.post('/api/users/', uploadData);
  
            if (response.data.success === 1) {
              // Show the "User is created" message immediately
              setLoader(false);
              alert('User is created');
            
              // Perform other actions if needed
              setValidated(false);
              setVisible1(false);
              getTopic();
              getrefresh();
            } else if (response.data.success === 0) {
              for (let i = 0; i < Object.values(response.data.result).length; i++) {
                let a = Object.values(response.data.result)[i];
                alert(a);
              }
            }
          } catch (error) {
            console.error('Error:', error);
          } finally {
           
          }
        }
      }
      // setLoading(false);
    } else {
      setValidated(true);
    }
  };
  
  
  const updateTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
  
    if (form.checkValidity() === true) {
     
  
      const uploadData = new FormData(e.target);
      uploadData.append('password', 'Vendsoft@12');
  
      try {
        let response = await api.patch(`/api/users/${id}/`, uploadData);
  
        if (response.data.success === 1) {
          alert('User details updated');
          setValidated(false);
          setVisible2(false);
          getTopic();
          getrefresh();
        } else if (response.data.success === 0) {
          for (let i = 0; i < Object.values(response.data.result).length; i++) {
            let a = Object.values(response.data.result)[i];
            alert(a);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
       
      }
    }
    setValidated(true);
  };
  
 
  

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
      label: 'SPOC ID',
      key: 'spoc_id',
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
      label: 'Organization Name',
      key: 'organization',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
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
  const handleSubmit = (e) => {
    e.preventDefault()
    saveTopic(e)
    if (e.currentTarget.checkValidity()) {
      disableButton()
    }
   
  }
  let active_options=[
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ]

  let get_status =  (sta) => {
    // console.log(sta)
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
  <>
   
            <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
      <h3 className="mb-0" style={{ color: '#2C384A' }}>User Onboarding</h3>
      <CButton
      onClick={() => { setVisible1(!visible1) }}
      className="mt-2"
      // style={{
      //   backgroundColor: '#2596be',
      //   color: 'white',
      //   border: 'none',
      //   fontWeight: '500',
  
      // }}
      style={{ backgroundColor: selectedColor, color: 'white' }}
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
              tableHeadProps={{
                color: 'light',
                align:'middle',
                className: 'align-middle',
              }}
              tableBodyProps={{
                align:'middle',
                className: 'align-middle',
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
      <CModal size={'lg'}
        visible={visible1}
        onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Add New User</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalBody>
            <CRow sm={12} className="">
            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Organization Name<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    // pattern="[A-Za-z\s]+"
                                    required
                                    maxLength={200}
                                    pattern="^[^\d]+$"
                                  
                                    onKeyPress={(e) => {
                                      const keyCode = e.which || e.keyCode
                                      const key = String.fromCharCode(keyCode)
                                      const regex = /^[^\d]+$/
                                      if (!regex.test(key)) {
                                        e.preventDefault()
                                      }
                                    }}
                                />
                                <CFormFeedback invalid>Please enter your  organization name</CFormFeedback>
                            </CCol>
              <CCol sm={6} >
                <CFormLabel htmlFor="validationDefault01">
                  Name<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  pattern="[A-Za-z\s]+"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Email<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  name="email"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your email</CFormFeedback>
              </CCol>          
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Mobile No.<span className="text-danger">*</span>
                </CFormLabel>

                <CFormInput
                  type="tel"
                  id="mobile_no"
                  name="mobile_no"
                  required
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
                <CFormFeedback invalid>Please enter your mobile number</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Address 1<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput type="text" id="address1" name="address1" required maxLength={200} />
                <CFormFeedback invalid>Please enter your address1</CFormFeedback>
              </CCol>
          
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Address 2
                </CFormLabel>
                <CFormInput type="text" id="address2" name="address2"
                //  required
                  maxLength={200} />
                <CFormFeedback invalid>Please enter your address2</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Pincode<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="pincode"
                  name="pincode"
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
          
              <CCol sm={6}>
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
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  State<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="state"
                  name="state"
                  pattern="[A-Za-z\s]+"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your state</CFormFeedback>
              </CCol>
           
            <CCol sm={6}>
    <CFormLabel htmlFor="validationDefault01">
        SPOC ID<span className="text-danger">*</span>
    </CFormLabel>
    <CFormInput
        type="text"
        id="spoc_id"
        name="spoc_id"
        required
        // pattern="[A-Za-z\s]+"
        maxLength={50}
    />
    <CFormFeedback invalid>Please enter your spoc id</CFormFeedback>
</CCol>
</CRow>
          
          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
           
            <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white' }} >
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
              &nbsp;Submit
            
            </CButton>
            {loader? <CSpinner className="Spinner" style={{  color: selectedColor }}  />:''}
          </CModalFooter>
        </CForm>
      </CModal>
      
      <CModal size={'lg'}
        visible={visible2}
        onClose={() => [setVisible2(false), setValidated(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible2(false), setValidated(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Edit User Details</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
          validated={validated}
          onSubmit={updateTopic}
        >
          <CModalBody>
            <CRow sm={12} className="">
            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Organization Name<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    // pattern="[A-Za-z\s]+"
                                    required
                                    pattern="^[^\d]+$"
                                  
                                    onKeyPress={(e) => {
                                      const keyCode = e.which || e.keyCode
                                      const key = String.fromCharCode(keyCode)
                                      const regex = /^[^\d]+$/
                                      if (!regex.test(key)) {
                                        e.preventDefault()
                                      }
                                    }}
                                    defaultValue={userdata?.organization}
                                    maxLength={200}
                                />
                                <CFormFeedback invalid>Please enter your  organization name</CFormFeedback>
                            </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Name<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  required
                  pattern="[A-Za-z\s]+"
                  defaultValue={userdata?.name}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Email<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  defaultValue={userdata?.email}
                  name="email"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your email</CFormFeedback>
              </CCol>
          
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Mobile No.<span className="text-danger">*</span>
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="mobile_no"
                  name="mobile_no"
                  defaultValue={userdata?.mobile_no}
                  required
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
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Address 1<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="address1"
                  defaultValue={userdata?.address1}
                  name="address1"

                  required
                  maxLength={200}
                />
                <CFormFeedback invalid>Please enter your address1</CFormFeedback>
              </CCol>
        
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Address 2<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="address2"
                  name="address2"
                  defaultValue={userdata?.address2}
                  // required
                  maxLength={200}
                />
                <CFormFeedback invalid>Please enter your address2</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Pincode<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="pincode"
                  defaultValue={userdata?.pincode}
                  name="pincode"
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
            <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Country<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="country"
                  defaultValue={userdata?.country}
                  name="country"
                  required
                  pattern="[A-Za-z\s]+"
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your country</CFormFeedback>
              </CCol>
              </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  State<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  defaultValue={userdata?.state}
                  
                  id="state"
                  name="state"
                  pattern="[A-Za-z\s]+"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your state</CFormFeedback>
              </CCol>
             
          
            <CCol sm={6}>
    <CFormLabel htmlFor="validationDefault01">
        SPOC ID<span className="text-danger">*</span>
    </CFormLabel>
    <CFormInput
        type="text"
        id="spoc_id"
        name="spoc_id"
        required
        // pattern="[A-Za-z\s]+"
        maxLength={50}
        defaultValue={userdata?.spoc_id}    
    />
    <CFormFeedback invalid>Please enter your spoc id</CFormFeedback>
</CCol>
</CRow>
            <CRow sm={12} className="mb-1">
            <CCol sm={6}>
              <CFormLabel htmlFor="validationCustom01"> Status </CFormLabel>
              <CFormSelect
               id="is_active"
               name="is_active"
               defaultValue={userdata?.is_active}
               required
               options={status1}
              />
              <CFormFeedback invalid>Please select status</CFormFeedback>
            </CCol>
           </CRow>
          
          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => [setVisible2(false), setValidated(false)]}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white' }}>
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    

    </>
  )
}
export default Topic
