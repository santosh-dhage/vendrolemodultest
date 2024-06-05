// import React, { useState, useEffect, useContext } from 'react'
// import useAxios from 'src/utils/useAxios'
// import { CSmartTable } from '@coreui/react-pro'
// import { Link } from 'react-router-dom'
// import { CButton, CRow, CCol, CCard, CCardBody ,CImage} from '@coreui/react-pro'

// import AuthContext from 'src/context/AuthContext'

// import { useColor } from 'src/menu/adminsetting/colorcontext';
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'

// import CIcon from '@coreui/icons-react'
// import {cilArrowBottom} from '@coreui/icons'
// import 'react-datepicker/dist/react-datepicker.css'
// import * as XLSX from 'xlsx';
// import baseurl from 'src/utils/baseurl'
// import apiKey1 from 'src/utils/apikey'
// import e1 from 'src/assets/images/eye.png'
// const baseURL = baseurl()
// function Topic() {
//   let api = useAxios()
//   const apikey = apiKey1()
//   const { selectedColor } = useColor();
//   const { user, authTokens } = useContext(AuthContext)
//   let [notes, setNotes] = useState([])
//   let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
//   let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))

//   useEffect(() => {
//     getTopic()
//   }, [])

//   let getTopic = async () => {
//     //here the api is not correct please insert the correct API
//     // let response = await api.get('adminapp/api/get_generate_report_for_customer_record')
//     let response = await api.get('get_stock_for_all_machine_refills/')
//     console.log(response)
//     if (response.data.success === 1) {
//       let data = []
//       for (let i = 0; i < response.data.result.length; i++) {
//       // for (let i = 0; i < sample.length; i++) {
//         let a = response.data.result[i]
//         console.log(a)
//         let options = {
//           machine_id: a.machine_id,
//           total_refill_quantity :100,
//          total_refill_count :12,
//           last_refill_date:'',
//         }
//         data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//         data.push(options)
//       }
//       setNotes([])
//       setNotes(data)
//     } else if (response.data.success === 0) {
//       for (let i = 0; i < Object.values(response.data.result).length; i++) {
//         let a = Object.values(response.data.result)[i]
//         alert(a)
//       }
//     }
//   }

//   let getrefresh = () => {
//     window.location.reload()
//   }

//   const columns = [
//     {
//       key: 'sr_no',
//       label: 'Sr. No.',
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },

//     },
//     {
//       label: 'Machine ID',
//       key: 'machine_id',
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },

//     },
//     {
//       label: 'Total Refill Quantity',
//       key: 'total_refill_quantity',
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },

//     },

//     {
//       label: 'Total Refill Count',
//       key: 'total_refill_count',
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },

//     },

//     {
//       label: 'Last Refill Date',
//       key: 'last_refill_date',
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },

//     },
//     {
//       key: 'Action',
//       label: 'Action',
//       // _style: { width: '9%' },
//       filter: false,
//       sorter: false,
//       _props: { color: 'secondary', className: 'fw-semibold' },
//       _style: { minWidth: '60px' },
//     },

//   ]
//   const formatDate = (dateString) => {
//     if (dateString == null) {
//       return '          '
//     }
//     const date = new Date(dateString)
//     const day = String(date.getDate()).padStart(2, '0')
//     const monthNames = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ]
//     const month = monthNames[date.getMonth()]
//     const year = date.getFullYear()
//     const hours = String(date.getHours()).padStart(2, '0')
//     const minutes = String(date.getMinutes()).padStart(2, '0')
//     return `${day} - ${month} - ${year} ${hours}:${minutes}`
//   }

//   const exportPDF = () => {
//     const unit = 'pt'
//     const size = 'A2' // Use A1, A2, A3 or A4
//     const orientation = 'portrait' // portrait or landscape

//     const marginLeft = 0
//     const doc = new jsPDF(orientation, unit, size)

//     doc.setFontSize(15)

//     const title = '          Report'
//     const headers = [
//       [
//         'Sr No',
//         'Machine ID',
//         'Before Refill Stock',
//         'After Refill Stock',
//         'Refill Stock',
//         'Refill Count',
//         'Refill Date',
//       ],
//     ]

//     const data = notes?.map((elt, index) => [
//       index + 1,
//       elt.machine_id,
//       elt.after_refill_stock,
//       elt.refill_stock,
//       elt.befor_refill_stock,
//       elt.refill_count,
//       elt.refill_date,
//     ])

//     let content = {
//       startY: 50,
//       head: headers,
//       body: data,
//     }

//     doc.text(title, marginLeft, 40)
//     doc.autoTable(content)
//     doc.save('Vending_Machin_Report.pdf')
//   }
//   const optionArr = {
//     today: formatDate1(new Date()) + '=' + formatDate1(new Date()),
//     yesterday:
//     formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))) +
//       '=' +
//       formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))),
//     week:
//     formatDate1(new Date(new Date().setDate(new Date().getDate() - 6))) +
//       '=' +
//       formatDate1( new Date(new Date())),
//     month:
//     formatDate1(new Date(new Date().setDate(new Date().getDate() - 29))) +
//       '=' +
//       formatDate1(new Date(new Date())),
//       quarterly: formatDate1(new Date(new Date().setDate(new Date().getDate() - 90))) +
//       '=' +
//       formatDate1(new Date(new Date())),
//       yearly:formatDate1(new Date(new Date().setDate(new Date().getDate() - 365))) +
//       '=' +
//       formatDate1(new Date(new Date())),
//   }
//   function formatDate1(date) {
//     if (date == null) {
//       return
//     }
//     var d = new Date(date),
//       month = '' + (d.getMonth() + 1),
//       day = '' + d.getDate(),
//       year = d.getFullYear()

//     if (month.length < 2) month = '0' + month
//     if (day.length < 2) day = '0' + day

//     return [year, month, day].join('-')
//   }
//   const exportReport_FromTOdate = async (e) => {
//     // let arr = { from: formatDate1(startDate), to: formatDate1(endDate) }
//     var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
//     const option = document.getElementById('datetodate1').options[index]

//     var twodate = option.value.toString()
//     setStartDate(twodate.split('=')[0])
//     setEndDate(twodate.split('=')[1])
//     let response = await api.post('post_stock_for_all_machine_refills_excel/', {
//       // from: startDate,
//       // to: endDate,
//       from_date: formatDate1(twodate.split('=')[0]),
//       to_date: formatDate1(twodate.split('=')[1]),
//     })

//     if (response.data.success === 1) {
//       let data = []
//       for (let i = 0; i < response.data.result.length; i++) {
//         let a = response.data.result[i]
//         console.log(a)
//         let options = {
//           machine_id: a.machine_id,
//           total_refill_quantity :100,
//          total_refill_count :12,
//           last_refill_date:'',
//         }

//         data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//         data.push(options)
//       }
//       setNotes([])
//       setNotes(data)
//     } else if (response.data.success === 0) {

//       setNotes([])
//       alert(response.data.message)
//     }
//   }

//   function downloadExcel() {
//     const workbook = XLSX.utils.book_new();

//     // Example data
//     const headers = [["Sr.No.", "Machine ID", "Before Refill Stock","After Refill Stock","Refill Count"]];
//     // for (let i = 0; i < notes.length; i++) {
//     //   data=[...notes[i]]
//     // }
//     var data = []

//     notes.map((item,index)=>data.push([index+1,item.machine_id,item.after_refill_stock,item.befor_refill_stock,item.refill_count]));
//     const worksheetData = [...headers, ...data];
//     // Convert the data to a worksheet
//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

//     // Attempt to set frozen headers (fixed headers) - this is a somewhat advanced usage
//     if (!worksheet['!views']) {
//       worksheet['!views'] = [];
//     }

//     worksheet['!views'].push({
//       state: 'frozen',
//       xSplit: 0,
//       ySplit: 1, // Freeze the first row
//      // topLeftCell: 'A2',
//      // activeCell: 'A1'
//     });

//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

//     // Generate an XLSX file and trigger the download
//     XLSX.writeFile(workbook, "VendingMAchineRefillReport.xlsx");

// }

// function excel_url(){
//   const url = `${baseURL}/machine/admin_download_excel_refill/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;

//   // return url;
//   const headers = new Headers({
//     'x-api-key': apikey,
//     Authorization: `Bearer ${authTokens?.access}`,
//   })

//   const request = new Request(url, {
//     method: 'GET',
//     headers: headers,
//   })

//   fetch(request)
//   .then(response => {
//     if (response.ok) {
//       // Convert the response to a blob and create a temporary URL to trigger the download
//       console.log(response)
//       return response.blob();
//     } else {
//       console.error('Request failed:', response.statusText);
//     }
//   })
//   .then(blob => {
//     // Create a temporary URL for the blob
//     const downloadUrl = window.URL.createObjectURL(blob);

//     // Create an anchor element to initiate the download
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = downloadUrl;
//     a.download = 'Refill_Report'+formatDate1(new Date())+'.xlsx';
//     document.body.appendChild(a);
//     a.click();

//     // Clean up
//     window.URL.revokeObjectURL(downloadUrl);
//   })
//   .catch(error => {
//     console.error('Network error:', error);
//   });
// }
//   return (
//     <>
//       <div className="mb-3">
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <div>
//             <h3 className="mb-0" style={{ color: '#2C384A' }}>
//               Machine Refill Report
//             </h3>
//           </div>{' '}
//           <div>
//           {/* <CButton
//               onClick={() => exportPDF()}
//               type="button"
//               className="btn btn-default btn-sm "
//               style={{ backgroundColor: '#2A409A', color: 'white' }}
//             >
//               Export pdf{' '}<CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
//             </CButton> */}
//             {' '}
//           {/* <CButton
//           onClick={downloadExcel}
//                   type="button"
//                   className="btn btn-default btn-sm "
//                   style={{ backgroundColor: '#2A409A', color: 'white' }}>Export Excel

//                   <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
//             </CButton>&nbsp; &nbsp; &nbsp; */}
//             {/* <CButton
//               onClick={() => exportPDF()}
//               className="mt-2"
//               style={{
//                 backgroundColor: '#2596be',
//                 color: 'white',
//                 border: 'none',
//                 fontWeight: '500',
//                 margin: '10px',
//               }}
//             >
//               Export pdf
//             </CButton>
//             <CSVLink
//               data={notes}
//               // headers={headers}
//               filename="Vending_Machine_Report"
//               className="btn btn-primary btn-sm"
//               style={{ backgroundColor: '#2596be', border: 'none' }}
//             >
//               Export Excel
//             </CSVLink> */}
//           </div>
//         </div>
//         <div className="input-group mt-2 mb-2">
// {/*
//           <DatePicker
//             showIcon
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             className="form-control"
//             //customInput={ExampleCustomInput}
//           />{' '}
//           &nbsp;

//            <DatePicker
//             showIcon
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             className="form-control"
//           /> */}
//                     <div>
//             <select id="datetodate1" onChange={exportReport_FromTOdate} style={{ width: '150px',height:'25px' }}>
//               {/* <option> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;From - To &nbsp; &nbsp;&nbsp;</option> */}
//               {/* <option disabled selected>please select the dates </option> */}
//               <option value={optionArr.today}>
//                 {' '}
//                 &nbsp;&nbsp;  &nbsp; &nbsp;&nbsp; Today &nbsp; &nbsp;&nbsp;{' '}
//               </option>
//               <option value={optionArr.yesterday}>
//                 {' '}
//                 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; Yesterday &nbsp; &nbsp;&nbsp;{' '}
//               </option>
//               <option value={optionArr.week}>
//                 {' '}
//                 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Weekly&nbsp; &nbsp;&nbsp;{' '}
//               </option>
//               <option value={optionArr.month}>
//                 {' '}
//                 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Monthly &nbsp; &nbsp;&nbsp;{' '}
//               </option>
//               <option value={optionArr.quarterly}>
//                 {' '}
//                 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Quarterly &nbsp; &nbsp;&nbsp;{' '}
//               </option>
//               <option value={optionArr.yearly}>
//                 {' '}
//                 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Yearly &nbsp; &nbsp;&nbsp;{' '}
//               </option>
//             </select>
//           </div>
//           &nbsp; &nbsp; &nbsp;{' '}
//           {/* <div>
//           <CDateRangePicker ranges={customRanges} />
//           </div> */}
//           <div>
//             {' '}
//             {/* <CButton
//                       type="button"
//                       className="btn btn-default btn-sm "
//                       style={{ backgroundColor: '#2A409A', color: 'white' }}
//             onClick={exportReport_FromTOdate}>submit</CButton> */}
//                       <CButton
//           // onClick={downloadExcel}
//           // href={excel_url()}
//           onClick={excel_url}
//                   type="button"
//                   className="btn btn-default btn-sm "
//                   style={{ backgroundColor:selectedColor, color: 'white' }}>Export Excel
//                  {/* <CSVLink data={notes} filename='Vending_Machine_Report' style={{textDecoration:"none",color:"white"}}>Export Excel</CSVLink> */}
//                   <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
//             </CButton>
//           </div>
//         </div>

//         <div>
//           <CRow xm={{ cols: 12 }}>
//             <CCol xs={12}>
//               <CCard className="mb-1 shadow bg-body rounded">
//                 <CCardBody>
//                   <CSmartTable
//                     activePage={1}
//                    // cleaner
//                     clickableRows
//                     columns={columns}
//                     columnSorter
//                     items={notes}
//                     itemsPerPageSelect
//                     itemsPerPage={10}
//                     pagination
//                     scopedColumns={{
//                       Action: (item) => (
//                         <td>
//                           <Link
//                             to={'/superadmin/machinwiserefillreport/' + `${item.machine_id}`+'/'+`${item.location}`}
//                           >
//                             <CImage src={e1} width={17} height={15} title="View Details" />
//                           </Link>
//                         </td>
//                       ),
//                       sr_no: (item, index) => <td>{index + 1}</td>,
//                       // created_at: (item) => <td>{formatDate(item.created_at)}</td>,
//                     }}
//                     //sorterValue={{ coloumns: 'created_at', state: 'asc' }}
//                     itemsPerPageOptions={[10, 20, 50, 100]}
//                    // tableFilter
//                     // selectable
//                     tableProps={{
//                       color: 'success-color-secondary',
//                       hover: true,
//                       border: '1.5px solid #074',
//                       responsive: true,
//                     }}
//                     tableHeadProps={{
//                       color: 'light',
//                       align:'middle',
//                       className: 'align-middle',
//                     }}
//                     tableBodyProps={{
//                       align:'middle',
//                       className: 'align-middle',
//                     }}
//                     // style={{overflow-x='auto'}}
//                     //  tableFilterLabel={'Search : '}
//                     //  tableFilterPlaceholder={'Enter String to Search'}
//                     itemsPerPageLabel={'Rows per page:'}
//                   />
//                 </CCardBody>
//               </CCard>
//             </CCol>
//           </CRow>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Topic
import React, { useState, useEffect, useContext } from 'react'

import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import { CButton, CRow, CCol, CCard, CCardBody, CImage } from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'
// import { format, setDate } from 'date-fns'
// import useAxios from 'src/utils/newuseAxios'
//const api=UseAxios();
import { useParams } from 'react-router-dom'
import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './App.css';
import DatePicker from 'react-datepicker'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'
import { CDateRangePicker } from '@coreui/react-pro'
import 'react-datepicker/dist/react-datepicker.css'
import * as XLSX from 'xlsx'
import baseurl from 'src/utils/baseurl'
import apiKey1 from 'src/utils/apikey'
import { Link } from 'react-router-dom'
import e1 from 'src/assets/images/eye.png'
const baseURL = baseurl()
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let { id, location } = useParams()
  let api = useAxios()
  const apikey = apiKey1()
  const { selectedColor } = useColor()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate())))

  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    // let response = await api.get('adminapp/api/get_generate_report_for_customer_record')
    let response = await api.get('get_stock_for_all_machine_refills/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        // for (let i = 0; i < sample.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          // machine_id: sample[i].Machine_Id,
          // after_refill_stock: sample[i].refil_stock ,
          // refill_stock: sample[i].after_refill,
          // befor_refill_stock: sample[i].befor_refill,
          // refill_count: sample[i].refill_count,
          // refill_date: sample[i].refill_date,
          machine_id: a.machine_id, //sample[i].Machine_Id,
          befor_refill_stock: a.stock_after_refill, // sample[i].refil_stock ,
          // refill_stock:a.stock_before_refill,// sample[i].after_refill,
          after_refill_stock: a.stock_before_refill, // sample[i].befor_refill,
          refill_count: a.stock_capacity_equal_count, //sample[i].refill_count,
          refill_quantity: a.refill_quantity,
          refill_date: a?.refill_date,
          location: a.location,
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        data.push(options)
      }
      setNotes([])
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
      // _style: { minWidth: '75px' },
    },
    {
      label: 'Machine ID',
      key: 'machine_id',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    {
      label: 'Before Refill Stock',
      key: 'after_refill_stock',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    // {
    //   label: 'Refill Stock',
    //   key: 'refill_stock',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '130px' },
    // },
    {
      label: 'Refill Quantity',
      key: 'refill_quantity',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    {
      label: 'After Refill Stock',
      key: 'befor_refill_stock',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold', align: 'middle' },
      // _style: { minWidth: '180px' },
      // _props: { color: 'warning', align: 'middle' },
    },
    {
      label: 'Refill Count',
      key: 'refill_count',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    // {
    //   label: 'Refill Date',
    //   key: 'refill_date',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '130px' },
    // },
    // {
    //   label: 'Refill Date',
    //   key: 'refill_date',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   // _style: { minWidth: '130px' },
    // },
    {
      label: 'Location',
      key: 'location',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
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
    if (dateString == null) {
      return '          '
    }
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

  const exportPDF = () => {
    const unit = 'pt'
    const size = 'A2' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape

    const marginLeft = 0
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = '          Report'
    const headers = [
      [
        'Sr No',
        'Machine ID',
        'Before Refill Stock',
        'After Refill Stock',
        'Refill Stock',
        'Refill Count',
        'Refill Date',
      ],
    ]

    const data = notes?.map((elt, index) => [
      index + 1,
      elt.machine_id,
      elt.after_refill_stock,
      elt.refill_stock,
      elt.befor_refill_stock,
      elt.refill_count,
      elt.refill_date,
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Vending_Machin_Report.pdf')
  }
  const optionArr = {
    today: formatDate1(new Date()) + '=' + formatDate1(new Date()),
    yesterday:
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))) +
      '=' +
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))),
    week:
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 6))) +
      '=' +
      formatDate1(new Date(new Date())),
    month:
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 29))) +
      '=' +
      formatDate1(new Date(new Date())),
    quarterly:
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 90))) +
      '=' +
      formatDate1(new Date(new Date())),
    yearly:
      formatDate1(new Date(new Date().setDate(new Date().getDate() - 365))) +
      '=' +
      formatDate1(new Date(new Date())),
  }
  function formatDate1(date) {
    if (date == null) {
      return
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
  const exportReport_FromTOdate = async (e) => {
    // let arr = { from: formatDate1(startDate), to: formatDate1(endDate) }
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]

    var twodate = option.value.toString()
    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
    let response = await api.post('post_stock_for_all_machine_refills_excel/', {
      // from: startDate,
      // to: endDate,
      from_date: formatDate1(twodate.split('=')[0]),
      to_date: formatDate1(twodate.split('=')[1]),
    })

    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          // machine_id: sample[i].Machine_Id,
          // after_refill_stock: sample[i].refil_stock ,
          // refill_stock: sample[i].after_refill,
          // befor_refill_stock: sample[i].befor_refill,
          // refill_count: sample[i].refill_count,
          // refill_date: sample[i].refill_date,
          machine_id: a?.machine_id, //sample[i].Machine_Id,
          after_refill_stock: a?.stock_before_refill, // sample[i].refil_stock ,
          // refill_stock:a.stock_before_refill,// sample[i].after_refill,
          befor_refill_stock: a?.stock_after_refill, // sample[i].befor_refill,
          refill_count: a?.stock_capacity_equal_count, //sample[i].refill_count,
          refill_quantity: a?.refill_quantity, //a?.refill_quantity,
          refill_date: a.refill_date,
          location: a.location,
        }

        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        data.push(options)
      }
      setNotes([])
      setNotes(data)
    } else if (response.data.success === 0) {
      // console.log('inside else part')
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //   alert(a)
      // }
      setNotes([])
      alert(response.data.message)
    }
  }
  const customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1)),
    ],
    'Last 7 Days': [new Date(new Date().setDate(new Date().getDate() - 6)), new Date(new Date())],
    'Last 30 Days': [new Date(new Date().setDate(new Date().getDate() - 29)), new Date(new Date())],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
  }

  function downloadExcel() {
    const workbook = XLSX.utils.book_new()

    // Example data
    const headers = [
      ['Sr.No.', 'Machine ID', 'Before Refill Stock', 'After Refill Stock', 'Refill Count'],
    ]
    // for (let i = 0; i < notes.length; i++) {
    //   data=[...notes[i]]
    // }
    var data = []

    notes.map((item, index) =>
      data.push([
        index + 1,
        item.machine_id,
        item.after_refill_stock,
        item.befor_refill_stock,
        item.refill_count,
      ]),
    )
    const worksheetData = [...headers, ...data]
    // Convert the data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // Attempt to set frozen headers (fixed headers) - this is a somewhat advanced usage
    if (!worksheet['!views']) {
      worksheet['!views'] = []
    }

    worksheet['!views'].push({
      state: 'frozen',
      xSplit: 0,
      ySplit: 1, // Freeze the first row
      // topLeftCell: 'A2',
      // activeCell: 'A1'
    })

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

    // Generate an XLSX file and trigger the download
    XLSX.writeFile(workbook, 'VendingMAchineRefillReport.xlsx')
  }

  function excel_url() {
    const url = `${baseURL}/machine/admin_download_excel_refill/?from_date=${formatDate1(
      startDate,
    )}&to_date=${formatDate1(endDate)}`

    // return url;
    const headers = new Headers({
      'x-api-key': apikey,
      Authorization: `Bearer ${authTokens?.access}`,
    })
    console.log(authTokens?.access, 'santosh')
    const request = new Request(url, {
      method: 'GET',
      headers: headers,
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
        a.download = 'Refill_Report' + formatDate1(new Date()) + '.xlsx'
        document.body.appendChild(a)
        a.click()

        // Clean up
        window.URL.revokeObjectURL(downloadUrl)
      })
      .catch((error) => {
        console.error('Network error:', error)
      })
  }
  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="mb-0" style={{ color: '#2C384A' }}>
              Machine Refill Report
            </h3>
          </div>{' '}
          {/* <div>
          <h3 className="mb-4" style={{ color: '#2C384A' }}>
            Details of  : {id}
          </h3>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h3 className="mb-4" style={{ color: '#2C384A' }}>
            Location : {location}
          </h3>
        </div> */}
          <div>
            {/* <CButton
              onClick={() => exportPDF()}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
            >
              Export pdf{' '}<CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" /> 
            </CButton> */}{' '}
            {/* <CButton
          onClick={downloadExcel}
                  type="button"
                  className="btn btn-default btn-sm "
                  style={{ backgroundColor: '#2A409A', color: 'white' }}>Export Excel
                
                  <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" /> 
            </CButton>&nbsp; &nbsp; &nbsp; */}
            {/* <CButton
              onClick={() => exportPDF()}
              className="mt-2"
              style={{
                backgroundColor: '#2596be',
                color: 'white',
                border: 'none',
                fontWeight: '500',
                margin: '10px',
              }}
            >
              Export pdf
            </CButton>
            <CSVLink
              data={notes}
              // headers={headers}
              filename="Vending_Machine_Report"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: '#2596be', border: 'none' }}
            >
              Export Excel
            </CSVLink> */}
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          {/*        
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
            //customInput={ExampleCustomInput}
          />{' '}
          &nbsp; 
          
           <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          /> */}
          {/* <div>
            <select id="datetodate1" onChange={exportReport_FromTOdate} style={{ width: '150px',height:'25px' }}>
              <option value={optionArr.today}>
                {' '}
                &nbsp;&nbsp;  &nbsp; &nbsp;&nbsp; Today &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.yesterday}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; Yesterday &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.week}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Weekly&nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.month}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Monthly &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.quarterly}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Quarterly &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.yearly}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Yearly &nbsp; &nbsp;&nbsp;{' '}
              </option>
            </select>
          </div> */}
          &nbsp; &nbsp; &nbsp;{' '}
          {/* <div>
          <CDateRangePicker ranges={customRanges} />
          </div> */}
          <div>
            {' '}
            {/* <CButton 
                      type="button"
                      className="btn btn-default btn-sm "
                      style={{ backgroundColor: '#2A409A', color: 'white' }}
            onClick={exportReport_FromTOdate}>submit</CButton> */}
            {/* <CButton
          // onClick={downloadExcel}
          // href={excel_url()}
          onClick={excel_url}
                  type="button"
                  className="btn btn-default btn-sm "
                  style={{ backgroundColor:selectedColor, color: 'white' }}>Export Excel
                 
                  <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" /> 
            </CButton> */}
          </div>
        </div>

        <div>
          <CRow xm={{ cols: 12 }}>
            <CCol xs={12}>
              {/* <CCard className="mb-1 shadow bg-body rounded">
                <CCardBody> */}
                  <CSmartTable
                    activePage={1}
                    // cleaner
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
                          <Link
                            to={
                              '/superadmin/machinwiserefillreport/' +
                              `${item.machine_id}` +
                              '/' +
                              `${item.location}`
                            }
                          >
                            <CImage src={e1} width={17} height={15} title="View Details" />
                          </Link>
                        </td>
                      ),
                      sr_no: (item, index) => <td>{index + 1}</td>,
                      created_at: (item) => <td>{formatDate(item.created_at)}</td>,
                    }}
                    //sorterValue={{ coloumns: 'created_at', state: 'asc' }}
                    itemsPerPageOptions={[10, 20, 50, 100]}
                    // tableFilter
                    // selectable
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
                    // style={{overflow-x='auto'}}
                    //  tableFilterLabel={'Search : '}
                    //  tableFilterPlaceholder={'Enter String to Search'}
                    itemsPerPageLabel={'Rows per page:'}
                  />
                {/* </CCardBody>
              </CCard> */}
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}
export default Topic
