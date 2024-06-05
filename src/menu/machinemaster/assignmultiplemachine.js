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
  CImage, CFormSelect, CCardImage
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import baseURl from 'src/utils/baseurl'
import { cilPencil, cilCheck, cilTrash, cilArrowBottom } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import * as XLSX from 'xlsx/xlsx.mjs'
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
  const [isDisabled, setIsDisabled] = useState(false);
  const { selectedColor } = useColor();
  let [rqcodelist, setrqcodelist] = useState([])
  let[payment_type_mode,setpayment_type_mode]=useState([])
  const EXTENSIONS = ['xlsx', 'xls', 'csv']
  let baseurl = baseURl()
  const disableButton = () => {
    setIsDisabled(true)
  }
  const getExtension = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension)
  }
  useEffect(() => {
    // get_reason()
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
    // getTopic()
  }, [])

 
  const ImportExcel = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const bstr = event.target.result
      const workbook = XLSX.read(bstr, { type: 'binary' })

      const worksheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetname]

      const fileData = XLSX.utils.sheet_to_json(worksheet, { blankraws: '', header: 1 })
      // console.log(fileData)
      const rowdata=[]
      for (var i=1 ;i < fileData.length;i++){
        let a = fileData[i]
        let options1 = {
            // id: a.id,
            machine_id:a[1],
            rqcode_id: a[0],
            installation_location:a[2],
          //   rqcode: a.rqcode,
            // created_at: a[2],
            // qr_code_img: a.qr_code_img,
            product_type:a[3],
            amount:a[4],
            model_no:a[0],
            name:a[6],
            
            // payment_type :a.payment_type,
            // machinelease:a.machinelease,
            // machine_id: a.machine?.machine_id,
  
            // product:a.product_type,
          
            // modelnumber:a.model_no,
            status: a.is_active === true ? 'Active' : 'Inactive',
          };
        rowdata.push(options1)
        // console.log(options1)
        }
        setNotes1(rowdata)
    }
    if (file) {
      if (getExtension(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert('Invalid input file type. Please select Excel or CSV file')
      }
    } else {
    //   setData([])
    //   setColDefs([])
    }
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
    // {
    //   label: 'Image',
    //   key: 'qr_code_img',
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '120px' },
    //   sorter: false,
    // },
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
    return `${day} - ${month} - ${year} ${hours}:${minutes}`;
  };

  // Example usage:
  const formattedDateTime = formatDate(); // Without providing a date, it will use the current date and time
  // console.log(formattedDateTime);

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0" style={{ color: '#2C384A' }}>
            Machine Master Testing
          </h3>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
        <CFormInput
          type="file"
          className="btn btn-default btn-sm"
          style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white' }}
          onChange={ImportExcel}
        />
         </div>
          <CButton
            onClick={() => {
              setVisible1(!visible1)
            }}
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


        <CRow>
          <CCol xs={12}>
            <CSmartTable
              activePage={1}
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
                  </td>
                ),

                sr_no: (item, index) => <td>{index + 1}</td>,
              }}
              itemsPerPageOptions={[10, 20, 50, 100]}
              tableFilter
              tableProps={{
                color: 'success-color-secondary',
                hover: true,
                border: '1.5px solid #074',
                responsive: true,
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
             // tableFilterLabel={'Search : '}
              tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
            />
          </CCol>
        </CRow>

      </div>
   
    </>
  )
}
export default Topic

