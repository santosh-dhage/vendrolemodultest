import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'

import { useNavigate } from 'react-router-dom'
import { CSmartTable, CFormFeedback } from '@coreui/react-pro'
// impoert {CSVLink}
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
  CFormSelect,
  CCardImage,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import baseURl from 'src/utils/baseurl'
import { cilPencil, cilCheck, cilTrash, cilArrowBottom } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import * as XLSX from 'xlsx'
import { CSVLink } from 'react-csv'
function Topic() {
  const history = useNavigate()
  let api = useAxios()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  let [notes3, setNotes3] = useState([])
  let [notes4, setNotes4] = useState([])
  let [notes5, setNotes5] = useState([])
  let [notes6, setNotes6] = useState([])
  let [userdata, setUserdata] = useState()
  const [id, setid] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [validated, setValidated] = useState(false)
  const [status, setstatus] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const { selectedColor } = useColor()
  let [rqcodelist, setrqcodelist] = useState([])
  let [payment_type_mode, setpayment_type_mode] = useState([])
let [file,setFile]=useState();
  let baseurl = baseURl()

  const disableButton = () => {
    setIsDisabled(true)
  }
  useEffect(() => {
    get_reason()
  }, [])

  let get_reason = async () => {
    let response = await api.get('/machine/api/get_machine_and_qrcode/')
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        data.push(a.machine_id)
      }
      setNotes1(data)
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

  // useEffect(() => {
  //   getTopic()
  // }, [])

  let getTopic = async () => {
    let response = await api.get('/machine/api/get_machine_and_qrcode/')
    let response2 = await api.get('/machine/api/get_unused_qrcode/')
    let response3 = await api.get('/machine/get_product_list/')
    let response4 = await api.get('/machine/modelcapacity/')
    if (response.data.success === 1 && response2.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        // console.log(a)
        let options = {
          id: a.id,
          machine_id: a.machine_id,
          // rqcode_id: a.rqcode?.id,
          rqcode: a.rqcode,
          created_at: a.created_at,
          qr_code_img: a.qr_code_img,
          product_type: a.product_type,
          amount: a.amount,
          model_no: a.model_no,
          name: a.name,
          installation_location: a.location,
          payment_type: a.payment_type,
          machinelease: a.machinelease,
          // machine_id: a.machine?.machine_id,

          // product:a.product_type,

          // modelnumber:a.model_no,
          status: a.is_active === true ? 'Active' : 'Inactive',
        }
        data.push(options)
      }
      let data2 = []
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i]
        if (a.is_active == 1) {
          let options = {
            label: a.qr_code_id,
            value: a.id,
          }

          data2.push(options)
        }
      }
      let data3 = []
      for (let i = 0; i < response3.data.result.length; i++) {
        let a = response3.data.result[i]
        // if (a.is_active == 1) {
        let options = {
          label: a.product_type,
          value: a.id,
          amount: a.amount,
          // model_no:a.model_no,
          // name:a.name,
        }

        data3.push(options)
        // }
      }
      let data4 = []
      for (let i = 0; i < response4.data.result.length; i++) {
        let a = response4.data.result[i]
        // if (a.is_active == 1) {
        let options = {
          // label: a.product_type,
          value: a.id,
          label: a.model_no,
          name: a.name,
        }

        data4.push(options)
        // }
      }
      setNotes(data)
      setNotes2(data2)
      setNotes3(data3)
      setNotes4(data4)
      // setNotes5(data3.name)
      // console.log(notes);
      // console.log(notes3)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }
  const handleChange = (e) => {
    
    const file = e.target.files[0];
    // if (file && !file(file)) {
    //     alert('Please select a xlsx file.');
    //     e.target.value = ''; // Clear the file input
    // }
    // setFile(file);
}
const bulkupload=async(e)=>{
  // const form = e.currentTarget
  e.preventDefault()
      const uploadData = new FormData(e.target)
      
      let response = await api.post('/machine/bulkuploadmachinemaster/bulk-upload/', uploadData)

      if (response.data.success === 1) {
        // console.log("inside the if part");
        alert('Machine id is created')
        // setValidated(false)
        // setVisible1(false)
        getTopic()
        window.location.reload()
      } else if (response.data.success !=1) {
        
        // for (let i = 0; i < Object.values(response.data.result).length; i++) {
        //   let a = Object.values(response.data.result)[i]
        //   alert(a)
        // }
        alert(response.data.message);
      }
    }
 
  const get_training_data = async (item) => {
    let qrname_name = []
    notes?.map((note) => {
      if (note.rqcode == item.rqcode) {
        qrname_name.push(item.rqcode)
      }
    })
    notes2?.map((note) => {
      if (note.label != item.rqcode) {
        qrname_name.push(note.label)
      }
    })

    let payment_type_mode = []
    notes3?.map((note) => {
      if (note.value == item.payment_type) {
        payment_type_mode.push(note)
      }
    })
    notes3?.map((note) => {
      if (note.value != item.payment_type) {
        payment_type_mode.push(note)
      }
    })

    setrqcodelist(qrname_name)
    setpayment_type_mode(payment_type_mode)
  }

  let getrefresh = () => {
    window.location.reload()
  }
  const saveTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      if (notes1?.includes(e.target.machine_id.value)) {
        alert(`This machine id is already exists`)
      } else {
        const uploadData = new FormData(e.target)
        uploadData.append('is_active', true)
        let response = await api.post('/machine/machine-masters/', uploadData)

        if (response.data.success === 1) {
          alert('Machine id is created')
          setValidated(false)
          setVisible1(false)
          getTopic()
          window.location.reload()
        } else if (response.data.success === 0) {
          for (let i = 0; i < Object.values(response.data.result).length; i++) {
            let a = Object.values(response.data.result)[i]
            alert(a)
          }
        }
      }
    } else {
      setValidated(true)
    }
  }

  const updateTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      let response = await api.patch(`/machine/machine-masters/${id}/`, uploadData)
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('Machine id is updated')
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
      label: 'Sr No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    {
      label: 'Machine ID',
      key: 'machine_id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
      sorter: false,
    },
    {
      label: 'QR Code ID',
      key: 'rqcode',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
      sorter: false,
    },
    {
      label: 'Image',
      key: 'qr_code_img',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Location',
      key: 'installation_location',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Product Type',
      key: 'product_type',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Amount',
      key: 'amount',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Model No',
      key: 'model_no',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Capacity',
      key: 'name',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Payment Mode',
      key: 'payment_type',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
      sorter: false,
    },
    {
      label: 'Machine Availability',
      key: 'machinelease',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
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
      key: 'Action',
      label: 'Action',
      // _style: { width: '9%' },
      filter: false,
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },

      _style: { minWidth: '100px' },
    },
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
  // console.log(formattedDateTime);

  const handleSubmit = (e) => {
    e.preventDefault()
    saveTopic(e)
    if (e.currentTarget.checkValidity()) {
      // disableButton();
    }
  }

  let getUserExcel = (item) => {
    const url = `${baseurl}` + '/' + item
    const request = new Request(url, {
      method: 'GET',
      // headers: headers,
    })

    fetch(request)
      .then((response) => {
        if (response.ok) {
          // Convert the response to a blob and create a temporary URL to trigger the download
          console.log(response)
          return response.blob()
        } else {
          console.error('Request failed:', response.statusText)
        }
      })
      .then((blob) => {
        // Create a temporary URL for the blob
        const downloadUrl = window.URL.createObjectURL(blob)

        // Create an anchor element to initiate the download
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = downloadUrl
        a.download = 'QR_code_Image_' + formatDate(new Date()) + '.png'
        document.body.appendChild(a)
        a.click()

        // Clean up
        window.URL.revokeObjectURL(downloadUrl)
      })
      .catch((error) => {
        console.error('Network error:', error)
      })
  }
  
  let csvdata = [
    {
      'machineid': 'machine id 1',
      'qrcodeid': 'qrcode id 1',
      'producttype':'product type 1',
      'modelno':'model no 1',
      'paymenttype':'paymenttype 1',
      'machinelease':'machinelease 1',
      'installationlocation':'installationlocation 1',
      'name':'name 1',
      'amount':'amount 1',
      'qrstorename':'qrstorename 1',
      'qrstoreid':'qrstoreid 1',
      'upilink':'upilink 1'
    },
    {
      'machineid': 'machine id 2',
      'qrcodeid': 'qrcode id 2',
      'producttype':'product type 2',
      'modelno':'model no 2',
      'paymenttype':'paymenttype 2',
      'machinelease':'machinelease 2',
      'installationlocation':'installationlocation 2',
      'name':'name 2',
      'amount':'amount 2',
      'qrstorename':'qrstorename 2',
      'qrstoreid':'qrstoreid 2',
      'upilink':'upilink 2'
    },
    {
      'machineid': 'machine id 3',
      'qrcodeid': 'qrcode id 3',
      'producttype':'product type 3',
      'modelno':'model no 3',
      'paymenttype':'paymenttype 3',
      'machinelease':'machinelease 3',
      'installationlocation':'installationlocation 3',
      'name':'name 3',
      'amount':'amount 3',
      'qrstorename':'qrstorename 3',
      'qrstoreid':'qrstoreid 3',
      'upilink':'upilink 3'
    },
    {
      'machineid': 'machine id 4',
      'qrcodeid': 'qrcode id 4',
      'producttype':'product type 4',
      'modelno':'model no 4',
      'paymenttype':'paymenttype 4',
      'machinelease':'machinelease 4',
      'installationlocation':'installationlocation 4',
      'name':'name 4',
      'amount':'amount 4',
      'qrstorename':'qrstorename 4',
      'qrstoreid':'qrstoreid 4',
      'upilink':'upilink 4'
    },
    {
      'machineid': 'machine id 5',
      'qrcodeid': 'qrcode id 5',
      'producttype':'product type 5',
      'modelno':'model no 5',
      'paymenttype':'paymenttype 5',
      'machinelease':'machinelease 5',
      'installationlocation':'installationlocation 5',
      'name':'name 5',
      'amount':'amount 5',
      'qrstorename':'qrstorename 5',
      'qrstoreid':'qrstoreid 5',
      'upilink':'upilink 5'
    },
   
  
  ]
  function downloadExcel() {
    const workbook = XLSX.utils.book_new();

    // Example data
    const headers = [["machineid", "qrcodeid", "producttype","modelno","paymenttype","machinelease","installationlocation","name","amount","qrstorename","qrstoreid","upilink"]];
    // for (let i = 0; i < notes.length; i++) {
    //   data=[...notes[i]]
    // }
    var data = [
      [
        'machine id 1',
        'qrcode id 1',
        'product type 1',
        'model no 1',
       'paymenttype 1',
        'machinelease 1',
        'installationlocation 1',
        'name 1',
       'amount 1',
        'qrstorename 1',
        'qrstoreid 1',
        'upilink 1'
    ],
    [
      'machine id 2',
      'qrcode id 2',
      'product type 2',
      'model no 2',
     'paymenttype 2',
      'machinelease 2',
      'installationlocation 2',
      'name 2',
     'amount 2',
      'qrstorename 2',
      'qrstoreid 2',
      'upilink 2'
  ],
  [
    'machine id 3',
    'qrcode id 3',
    'product type 3',
    'model no 3',
   'paymenttype 3',
    'machinelease 3',
    'installationlocation 3',
    'name 3',
   'amount 3',
    'qrstorename 3',
    'qrstoreid 3',
    'upilink 3'
],
[
  'machine id 4',
  'qrcode id 4',
  'product type 4',
  'model no 4',
 'paymenttype 4',
  'machinelease 4',
  'installationlocation 4',
  'name 4',
 'amount 4',
  'qrstorename 4',
  'qrstoreid 4',
  'upilink 4'
],
[
  'machine id 5',
  'qrcode id 5',
  'product type 5',
  'model no 5',
 'paymenttype 5',
  'machinelease 5',
  'installationlocation 5',
  'name 5',
 'amount 5',
  'qrstorename 5',
  'qrstoreid 5',
  'upilink 5'
],
    ]
  
    
    const worksheetData = [...headers, ...data];
    // Convert the data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Attempt to set frozen headers (fixed headers) - this is a somewhat advanced usage
    if (!worksheet['!views']) {
      worksheet['!views'] = [];
    }
    
    worksheet['!views'].push({
      state: 'frozen',
      xSplit: 0,
      ySplit: 1, 
    });
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  
    XLSX.writeFile(workbook, "sampledownload.xlsx");
  
}

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0" style={{ color: '#2C384A' }}>
            Machine Master
          </h3>{' '}
          <CButton
            onClick={() => {
              setVisible1(!visible1)
            }}
            className="mt-2"
            style={{ backgroundColor: selectedColor, color: 'white',border:'0px ' }}
          >
            Add New
          </CButton>
        </div>
        <div className="row mt-2">
                      
                        <CForm onSubmit={bulkupload}>
                        <CRow>
                        <CCol md={5}>
                          <CFormLabel htmlFor="file1" style={{ fontWeight: '600' }}>
                            Upload Bulk Data
                          </CFormLabel>
                          &nbsp;&nbsp;
                          {/* <CSVLink
                            data={csvdata}
                            filename="SampleData"
                            style={{
                              fontSize: 'small',
                              color: 'black',
                              fontWeight: '600',
                            }}
                          > */}
                          <Link onClick={downloadExcel}>
                            Download Sample</Link>
                          {/* </CSVLink> */}
                          <CFormInput
                            type="file"
                            // className="btn btn-default btn-sm"
                            id="file"
                            name="file"
                            // onChange={handleChnge}
                            required
                            accept=".xlsx"
                            size='sm'
                          />
                          <CFormFeedback invalid>please upload the file</CFormFeedback>
                        </CCol>

                        <CCol md={7} >
                        <CFormLabel htmlFor="button" style={{ fontWeight: '600' }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </CFormLabel>&nbsp;&nbsp;
                          <CButton  type='submit' style={{ backgroundColor: selectedColor, color: 'white',marginTop:'29px' }} >
                            Add
                          </CButton>
                        </CCol>
                        </CRow>
                        </CForm>

                     
                    </div>
        <CRow>
          <CCol xs={12}>
            <CSmartTable
              activePage={1}
              clickableRows
              columns={columns}
              // columnSorter
              items={notes}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{
                qr_code_img: (item) => (
                  <td>
                    <CCardImage
                      className="smarttablecardimg"
                      orientation="top"
                      src={baseurl + item.qr_code_img}
                    />
                  </td>
                ),
                Action: (item) => (
                  <td>
                    <Link to="#">
                      <CIcon
                        icon={cilPencil}
                        style={{ color: 'blue' }}
                        size="md"
                        title="Edit"
                        onClick={() => [
                          setUserdata(item),
                          setid(item.id),
                          setVisible2(!visible2),
                          get_training_data(item),
                        ]}
                      />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to={'/Machineview/' + `${item.id}`}>
                      <CImage src={e1} width={17} height={15} title="View Details" />
                    </Link>{' '}
                    &nbsp;&nbsp;&nbsp;
                    <Link to="#" onClick={() => getUserExcel(item.qr_code_img)}>
                      <CIcon
                        icon={cilArrowBottom}
                        style={{ color: 'blue' }}
                        size="md"
                        width="17"
                        title="Download"
                      />
                    </Link>
                  </td>
                ),

                sr_no: (item, index) => <td>{index + 1}</td>,
                created_at: (item) => <td>{formatDate(item.created_at)}</td>,
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
                // className: 'align-middle',
              }}
              tableBodyProps={{
                align: 'middle',
                // className: 'align-middle',
              }}
              // tableFilterLabel={'Search : '}
              tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
            />
          </CCol>
        </CRow>
      </div>
      <CModal
        size={'lg'}
        visible={visible1}
        onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Machine Master</CModalTitle>
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
                  Add Machine Id<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput type="text" id="machine_id" name="machine_id" required maxLength={50} />
                <CFormFeedback invalid>Please create machine id</CFormFeedback>
              </CCol>

              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">Qr Code Id</CFormLabel>
                <CFormSelect name="rqcode" options={notes2} />
                <CFormFeedback invalid>Please select Qr code Id</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Product
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="product"
                  options={notes3}
                  // required
                />
                <CFormFeedback invalid>Please select Product</CFormFeedback>
              </CCol>

              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Model Number
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="model_number"
                  options={notes4}
                  // required
                />
                <CFormFeedback invalid>Please select Model Number</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Payment mode
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect name="payment_type">
                  <option value="">Select Payment Mode</option>
                  <option value=" Only QRCode"> QRCode</option>
                  <option value="Only Coin"> Coin</option>
                  <option value="Both">Both</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select Payment mode</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Machine Availability
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect name="machinelease">
                  <option value="">Select Machine Availability</option>

                  <option value="Demo"> Demo</option>
                  <option value="Lease"> Lease</option>
                  <option value="Sold">Sold</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select Machine Availability</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Location<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="installation_location"
                  name="installation_location"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter location</CFormFeedback>
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
            <CButton
              type="submit"
              style={{ backgroundColor: selectedColor, color: 'white' }}
              disabled={isDisabled}
            >
              <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
              &nbsp; {isDisabled ? 'Submit' : 'Submit'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CModal
        size={'lg'}
        visible={visible2}
        onClose={() => [setVisible2(false), setValidated(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible2(false), setValidated(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Update Machine Master</CModalTitle>
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
                  Machine ID<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="machine_id"
                  name="machine_id"
                  required
                  // pattern="[A-Za-z\s]+"
                  defaultValue={userdata?.machine_id}
                  maxLength={50}
                  // disabled
                />
                <CFormFeedback invalid>Please enter machine id</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">QR Code Id</CFormLabel>
                {/* dynamic dropdown qrcode id */}
                <CFormSelect
                  name="rqcode"
                  // defaultValue={userdata?.rqcode}
                  defaultValue={userdata?.rqcode}
                  options={rqcodelist}
                />
                <CFormFeedback invalid>Please select QR code Id</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Product
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="product"
                  options={notes3}
                  defaultValue={userdata?.product}
                  // required
                />
                <CFormFeedback invalid>Please select Product</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Payment mode
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect name="payment_type" defaultValue={userdata?.payment_type}>
                  <option value="">Select Payment Mode</option>
                  <option value=" Only QRCode"> Only QRCode</option>
                  <option value="Only Coin"> Only Coin</option>
                  <option value="Both">Both</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select Payment mode</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Location<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="installation_location"
                  name="installation_location"
                  required
                  defaultValue={userdata?.installation_location}
                  // required
                  maxLength={50}
                  // pattern='/^[a-zA-Z]*$/'
                  //   onKeyPress={(e) => {
                  //     const keyCode = e.which || e.keyCode
                  //     const key = String.fromCharCode(keyCode)
                  //     const regex =/^[a-zA-Z]*$/
                  //     if (!regex.test(key)) {
                  //         e.preventDefault()
                  //     }
                  // }}
                />
                <CFormFeedback invalid>Please enter location</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Model Number
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="model_number"
                  options={notes4}
                  // required
                  defaultValue={userdata?.model_number}
                />
                <CFormFeedback invalid>Please select Model Number</CFormFeedback>
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
              <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}
export default Topic
