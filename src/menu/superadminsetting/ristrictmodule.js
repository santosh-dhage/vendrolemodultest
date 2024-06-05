
import React, { useState, useEffect } from 'react'
import useAxios from 'src/utils/useAxios'
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
  CFormCheck,
  CFormFeedback,
  CCol,
  CFormLabel,
  CImage,
  CFormSelect,
  CCardImage,
  CCard,
  CSmartTable,
} from '@coreui/react-pro'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheck, cilTrash } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import ivendlogo from 'src/assets/images/default_logo.png'
import { blue } from '@mui/material/colors'

function Topic() {
  const api = useAxios()
  const [logoUrl, setLogoUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')

  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  let [notes3, setNotes3] = useState([])
  let [notes4, setNotes4] = useState([])
  let [mymodules, setMymodules] = useState([])
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validated, setValidated] = useState(false)
  let [tenant_name,setTenant_name]=useState()
  let selectedmodule = []
  useEffect(() => {
    getTopic()
    // console.log(notes2 + 'inside ristrict module santosh')
  }, [])

  let getTopic = async () => {
    let response3 = await api.get('/saas/get_module_mapping_wise/')

    let response = await api.get('saas/get_tenant_all/')
    let response2 = await api.get('saas/get_module_all/')

    console.log(response)
    if (response.data.success === 1 && response2.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        let options = {
          value: a.id,
          label: a.schema_name,
          email: a.email,
        }
        data.push(options)
      }
      let data2 = [{ label: '', value: '' }]
      let modules = []
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i]

        let options = {
          label: a.module,
          value: a.id,
        }
        modules.push(a.module)
        data2.push(options)
      }
      let data3 = []
      for (let i = 0; i < response3.data.result.length; i++) {
        let a = response3.data.result[i]

        let options = {
          id: a.id,
          tenant: a.tenant,
          user_id: a.user_id,
          report_type: a.report_type,
        }

        data3.push(options)
      }
      setNotes(data)
      setNotes2(data2)
      // setNotes3(data3)
      // setMymodules(modules)
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
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      //  uploadData.append("schema_name" ,"ritik")//e.target.tenant.value)
      //  uploadData.append("email","ritik@gmail.com")
      //  console.log(e.target.tenant.value+"tenant name")
       uploadData.append("modules",selectedmodule)//JSON.stringify(selectedmodule))
       let response1 = await api.get('saas/get_tenant_all/')
      //  let response2 = await api.get('saas/saasapp/ModuleMapping/')
       for (let i = 0; i < response1.data.result.length; i++) {
        if(response1.data.result[i].id == e.target.tenant.value )
        {
          uploadData.append("schema_name" ,response1.data.result[i].schema_name)
          uploadData.append("email",response1.data.result[i].email)
          console.log(response1.data.result[i].schema_name+" tenant name "+ response1.data.result[i].email)

          console.log(selectedmodule+"module name")
          let response = await api.post('saas/post_create_module_mapping_tenant_wise/', uploadData)
          // let response = await api.patch('saas/update_module_mapping/'+response2.data.result.id+'/', uploadData)
          if (response.data.success === 1) {
            alert('Selected modules are submitted')
            setValidated(false)
            setVisible1(false)
            getTopic()
            getrefresh()
          } else if (response.data.success === 0) {
            alert(' Selected modules are not submitted ')
            for (let i = 0; i < Object.values(response.data.result).length; i++) {
              let a = Object.values(response.data.result)[i]
              alert(a)
            }
          }
        } else {
          setValidated(true)
        }
        }
      }
     
  }

  const columns = [
    {
      key: 'sr_no',
      label: 'Sr. No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    // {
    //   label: 'Tenant Name',
    //   key: 'tenant',
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '150px' },
    //   sorter: false,
    // },
    // {
    //   label: 'Email',
    //   key: 'user_id',
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '160px' },
    //   sorter: false,
    // },
    {
      label: 'Allowed Reports',
      key: 'report_type',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },

    // {
    //   key: 'Action',
    //   label: 'Action',
    //   // _style: { width: '9%' },
    //   filter: false,
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '60px' },
    // },
  ]
  const formatDate = (dateString = new Date()) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
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
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day} - ${month} - ${year} ${hours}:${minutes}`
  }

  // Example usage:
  const formattedDateTime = formatDate() // Without providing a date, it will use the current date and time
  console.log(formattedDateTime)

const selected_tenant=(e)=>{
  var s=e.target.value
setTenant_name(s);
// console.log(tenant_name+"ttttttttt");
}

  const chkbox=(e)=> {
    var s = e.target.value
    // console.log(s+"santosh")
    if (e.target.checked) {
      selectedmodule.push(s)
      console.log(s+" santosh inside the if"+selectedmodule.length)
    } else {
      var index = selectedmodule.indexOf(s)
      if (index > -1) {
        selectedmodule.splice(index, 1)
        console.log(s+"santosh inside the else " +selectedmodule.length+" "+selectedmodule.includes(s))
      }
    }
    selectedmodule.map((item ,index)=>console.log(item+" "+index))
  }

  let tenantpersions = async (e) => {

    // console.log(e.target.value+"check the tenant selected")
    let response3 = await api.get('saas/get_module_mapping_wise/')
    let response=await api.get("saas/get_tenant_all/")
  // let a=response3.data.result;
      let data3=[];
      for(let j=0;j<response.data.result.length;j++)
      {
        if(response.data.result[j].id==e.target.value)
        {
          for (let i = 0; i < response3.data.result.length; i++) {

            let a = response3.data.result[i]
    
            // if(e.target.value == a.id)
            if(response.data.result[j].schema_name==a.tenant)
            {    
               console.log(a.id +"=="+e.target.value+"inside if") 
              
                let options = {
                  report_type: a.report_type,
               }  
               data3.push(options)
            }
          }
        }
      }
      // console.log(data3+"santosh datat3")
      setNotes3(data3)
  }


  return (
    <div>
      <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className="px-5 pt-5  mx-4">
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
          validated={validated}
          onSubmit={saveTopic}
        >
          <h3>Select the tenant </h3>
          <CRow>
            <CCol md={3}>
              <CFormLabel htmlFor="validationDefault01">
                Select the Tenant <span className="text-danger">*</span>
              </CFormLabel>
              <CFormSelect name="tenant" options={notes}  required />
              <CFormFeedback invalid>Please select Tenant</CFormFeedback>
            </CCol>
            {/* <CCol md={3}>
              <CFormLabel htmlFor="validationDefault01">
                Select Modules <span className="text-danger">*</span>
              </CFormLabel>
              <CFormSelect
                name="module_type"
                options={notes2}
                // value={selectedTenant}
                // onChange={(e) => setSelectedTenant(e.target.value)}
                required
              />
              <CFormFeedback invalid>Please select module</CFormFeedback>
            </CCol> */}

            {/* <CCol md={3}>
              <CFormLabel htmlFor="validationDefault01">
                Tenant Email <span className="text-danger">*</span>
              </CFormLabel>
              <CFormSelect name="email" readOnly required />
              <CFormFeedback invalid>Please select Tenant to populate the email</CFormFeedback>
            </CCol> */}

            <CCol md={12}>
              <CFormLabel htmlFor="validationCustom01">
                Admin Report <span className="text-danger">*</span>
              </CFormLabel>
              <CCol
                md={12}
                className="d-grid d-md-flex "
                style={{ border: '1px solid #ccc', borderRadius: '5px' }}
              >
                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="User"
                    onChange={chkbox}
                    id="User"
                    //checked={selectedOption4 == 'Active'}
                    label="User"
                    value="User"
                    // required
                    //defaultChecked
                  />
                </CCol>
                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="module"
                    onChange={chkbox}
                    value="Customer"
                    id="Customer"
                    // checked={selectedOption4 == 'Inactive'}
                    label="Customer"
                    // required
                  />
                </CCol>

                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="module"
                    onChange={chkbox}
                    id="Refill"
                    // checked={selectedOption4 == 'Active'}
                    label="Refill"
                    value="Refill"
                    // required
                    //defaultChecked
                  />
                </CCol>
                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="module"
                    onChange={chkbox}
                    value="Payment"
                    id="Payment"
                    // checked={selectedOption4 == 'Inactive'}
                    label="Payment"
                    // required
                  />
                </CCol>

                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="module"
                    onChange={chkbox}
                    value="Customer MIS"
                    id="Customer MIS"
                    // checked={selectedOption4 == 'Inactive'}
                    label="Customer MIS"
                    // required
                  />
                </CCol>

                <CCol md={2}>
                  <CFormCheck
                    md={2}
                    inline
                    type="checkbox"
                    name="module"
                    onChange={chkbox}
                    value="User MIS"
                    id="User MIS"
                    //checked={selectedOption4 == 'Inactive'}
                    label="User MIS"
                    // required
                  />
                </CCol>
              </CCol>
            </CCol>
          </CRow>
          <CRow className="mt-5 mb-5">
            <CButton
              type="submit"
              style={{ backgroundColor: blue, color: 'white', width: '80px', justifyContent: '' }}
            >
              Submit
            </CButton>
            
          </CRow> 
          <hr
          style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '3px',
        }}
      />
        </CForm>
        {/* </CCard>

      <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className="px-5 pt-5  mx-4"> */}
      {/* =============================================================================================== */}



        <CRow>
        <CCol md={3}>
              <CFormLabel htmlFor="validationDefault01">
                Select the Tenant <span className="text-danger">*</span>
              </CFormLabel>
              <CFormSelect name="tenant" options={notes} onChange={tenantpersions}  required />  
              <CFormFeedback invalid>Please select Tenant</CFormFeedback>
            </CCol>

          <CCol xs={12}>
            <CSmartTable
              // activePage={1}
              clickableRows
              columns={columns}
              // columnSorter
              items={notes3}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{
                sr_no: (item, index) => <td>{index + 1}</td>,
              }}
              itemsPerPageOptions={[10, 20, 50, 100]}
              // tableFilter
              tableProps={{
                color: 'success-color-secondary',
                hover: true,
                border: '1.5px solid #074',
                responsive: true,
              }}
              tableHeadProps={{
                color: 'light',
                align: 'middle',
                className: 'align-middle',
              }}
              tableBodyProps={{
                align: 'middle',
                className: 'align-middle',
              }}
              tableFilterLabel={'Search : '}
              // tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
            />
          </CCol>
        </CRow>
      </CCard>
    </div>
  )
}

export default Topic
