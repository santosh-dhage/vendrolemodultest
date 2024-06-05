

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
  const disableButton = () => {
    setIsDisabled(true)
  }

 

  useEffect(() => {
    getTopic()
  }, [])


  let getTopic = async () => {
    let response = await api.get('/machine/get_product_model/')
    // console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        // console.log(a)
        let options = {
            id: a.id,
            // product_type : a.product_type,
            name:a.name,
            model_no:a.model_no,
          created_at: a.created_at,
          // amount:a.amount,
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
  const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {  
          const uploadData = new FormData(e.target);
          let response = await api.post('/machine/modelcapacity/', uploadData);
         
        if (response.data.success === 1) {
          alert('Model Number  is added .');
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
      }
    
   else {
      setValidated(true);
    }
  };

  const updateTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
    //   uploadData.append('password', 'Vendsoft@12')

      let response = await api.patch(`/machine/modelcapacity/${id}/`, uploadData)
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('Model No  details updated')
        setValidated(false)
        setVisible2(false)
        getTopic()
      } else if (response.data.success === 0) {
        for (let i = 0; i < Object.values(response.data.result).length; i++) {
          let a = Object.values(response.data.result)[i]
          alert(a)
        }
      }
    }
    setValidated(true)
  }



  const columns = [
    {
      key: 'sr_no',
      label: 'Sr. No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '75px' },
    },
    // {
    //   label: 'Product Type',
    //   key: 'product_type',
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '100px' },
    //   sorter: false,
    // },
    {
      label: 'Model No',
      key: 'model_no',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
      sorter: false,
    },
    {
        label: 'Capacity',
        key: 'name',
        _props: { color: 'secondary', className: 'fw-semibold' },
        _style: { minWidth: '80px' },
        sorter: false,
      },
    {
      label: 'Created Date',
      key: 'created_at',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },

   
    // {
    //   label: 'Status',
    //   key: 'is_active',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '60px' },
    // },
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
      <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
      <h3 className="mb-0" style={{ color: '#2C384A' }}> Model No</h3>
      <CButton
      onClick={() => { setVisible1(!visible1) }}
      className="mt-2"
      style={{ backgroundColor: selectedColor, color: 'white',border:'0px' }}
      // style={{
      //   backgroundColor: '#2596be',
      //   color: 'white',
      //   border: 'none',
      //   fontWeight: '500',
  
      // }}
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
               // className: 'align-middle',
              }}
              tableBodyProps={{
                align:'middle',
               // className: 'align-middle',
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
      
     
      <CModal size={'md'}
        visible={visible1}
        onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>  Add Model No </CModalTitle>
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
                  Model No
                  <span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="model_no"
                //   pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  name="model_no"
                  pattern='^[a-zA-Z0-9]+$'
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[a-zA-Z0-9]+$/
                    if (!regex.test(key)) {
                        e.preventDefault()
                    }
                }}
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter  Model No</CFormFeedback>
              </CCol>
            
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                   Capacity
                   <span className="text-danger">*</span>
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  required
                  pattern="^[0-9]+$"
                //   pattern="^(?!\s)[0-9\s]+$"
                onKeyPress={(e) => {
                  const keyCode = e.which || e.keyCode
                  const key = String.fromCharCode(keyCode)
                  const regex = /^[0-9]$/
                  if (!regex.test(key)) {
                      e.preventDefault()
                  }
              }}
                />
                <CFormFeedback invalid>Please enter your  Capacity</CFormFeedback>
              </CCol>
             
            </CRow>
            

          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC',border:'0px' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white',border:'0px' }}>
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      
      <CModal size={'md'}
        visible={visible2}
        onClose={() => [setVisible2(false), setValidated(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible2(false), setValidated(false)]}
          style={{ backgroundColor:selectedColor, color: 'white',border:'0px' }}
        >
          <CModalTitle>Edit Model No</CModalTitle>
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
                  Model No
                  <span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="model_no"
                //   pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                  name="model_no"
                  required
                  defaultValue={userdata?.model_no}
                  maxLength={50}
                  pattern='^[a-zA-Z0-9]+$'
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode
                    const key = String.fromCharCode(keyCode)
                    const regex = /^[a-zA-Z0-9]+$/
                    if (!regex.test(key)) {
                        e.preventDefault()
                    }
                }}
                />
                <CFormFeedback invalid>Please enter  Model No</CFormFeedback>
              </CCol>
            {/* </CRow>
            <CRow sm={12} className="mb-1"> */}
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                   Capacity
                   <span className="text-danger">*</span>
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={userdata?.name}
                //   pattern="^(?!\s)[0-9\s]+$"
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
                <CFormFeedback invalid>Please enter your  Capacity</CFormFeedback>
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
            <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white' }}>
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
