import React, { useState, useEffect, useContext, Children } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CDropdownMenu, CSmartTable } from '@coreui/react-pro'
import { Link } from 'react-router-dom'

//import { CButton, CRow, CCol, CCard, CCardBody, } from '@coreui/react-pro'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'
// import { format, setDate } from 'date-fns'
// import useAxios from 'src/utils/newuseAxios'
//const api=UseAxios();
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilArrowBottom } from '@coreui/icons'
import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './App.css';
import '../report.css'
import DatePicker from 'react-datepicker'
import { CDateRangePicker } from '@coreui/react-pro'
import 'react-datepicker/dist/react-datepicker.css'
import baseurl from 'src/utils/baseurl'
import apiKey1 from 'src/utils/apikey'
// import html2pdf from 'html2pdf.js'
//import User from 'src/menu/report/superadmin/key'
//import Key from 'src/menu/report/superadmin/user_id'
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
const baseURL = baseurl()
function Topic() {
  let api = useAxios()
const apikey=apiKey1();
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))))
  let [endDate, setEndDate] = useState(formatDate1(new Date(new Date().setDate(new Date().getDate()))))
  const { selectedColor } = useColor();
  let [coinCount, setCoincount] = useState(0)
  let [coinAmount, setCoinamount] = useState(0)
  let [qrCount, setQrcount] = useState(0)
  let [qrAmount, setQramount] = useState(0)
  let [totaltransaction, setTotaltransaction] = useState(0)
  let [totalAmount, setTotalamout] = useState(0)
  let [dateselect, setDateselect] = useState(false)

  useEffect(() => {
    // getTopic()
    exportReport_FromTOdate();
  }, [])

  let getTopic = async () => {
    let response = await api.get('get_mis_report_for_customer/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []

      for (let i = 0; i < response.data.result.length; i++) {
        // for (let i = 0; i < 10; i++) {
        let a = response.data.result[i]
        console.log(a)

        let options = {
          // report_date:a.report_date,
          //report_time:a.report_time,
          spoc_id: a.spoc_id,
          name: a.name,
          mail: a.email,
          mobile: a.user_mobile_no,
          machine_id: a.machine_id,
          model_no: a.model_no,
          location: a.location,
          status: a.machine_status,
          count: a.current_inventory_count,
          product: a.product,
          date: a.date,
          time: a.time,
          type: a.type,
          amount: a.amount,
          success: a.success,
          refund_status: a.refund_status,
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

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
      group: 'CUSTOMER',
      _props: { colSpan: 5, color: 'green' },
      children: [
        {
          key: 'sr_no',
          label: 'Sr. No.',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '40px' },
        },
        {
          key: 'spoc_id',
          label: 'SPOC ID',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'name',
          label: 'Name',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'mobile',
          label: 'Mobile',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
          // _props: { colSpan: 3, scope: 'colgroup' },
          // _style: { width: '50%' },
        },
        {
          key: 'mail',
          label: 'Email',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
      ],
    },
    {
      group: 'MACHINE',
      _props: { colSpan: 5, color: 'red' },
      children: [
        {
          key: 'machine_id',
          label: 'Machine Id',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'model_no',
          label: 'Model No',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'location',
          label: 'Location',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
          // _props: { colSpan: 3, scope: 'colgroup' },
          // _style: { width: '50%' },
        },
        {
          key: 'status',
          label: 'Current status ON/OFF',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
          //  _props: { colSpan: 3, scope: 'colgroup' },
          //_style: { width: '50%' },
        },
        {
          key: 'count',
          label: 'Current Inventory Count',
          _props: { scope: 'col' },
          sorter: false,
          // _props: { colSpan: 3, scope: 'colgroup' },
          // _style: { width: '50%' },
          _style: { minWidth: '100px' },
        },
      ],
    },
    {
      group: 'PRODUCT',
      _props: { colSpan: 7, color: 'yellow' },
      children: [
        {
          key: 'product',
          label: 'Product',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'date',
          lable: 'Date',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'time',
          label: 'Time',
          // _props: { colSpan: 3, scope: 'colgroup' },
          // _style: { width: '50%' },
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'type',
          label: 'Type',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'amount',
          label: 'Amount',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'success',
          label: 'Success (Y/N)',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'refund_status',
          label: 'Refund Status',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
      ],
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

    const title = '          Customer MIS Report'
    const headers = [
      [
        'Sr No',
        'SPOC ID',
        'Name',
        'Mobile',
        'Email',
        'Machine Id',
        'Model No',
        'Location',
        'Current Status',
        'Current Inventory Count',
        'Product',
        'Date',
        'Time',
        'Type',
        'Amount',
        'Success (Y/S)',
        'Refund Status',
      ],
    ]

    const data = notes?.map((elt, index) => [
      index + 1,
      elt.spoc_id,
      elt.name,
      elt.mail,
      elt.mobile,
      elt.machine_id,
      elt.model_no,
      elt.location,
      elt.status,
      elt.count,
      elt.product,
      elt.date,
      elt.time,
      elt.type,
      elt.amount,
      elt.success,
      elt.refund_status,
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Customer_MIS_Report.pdf')
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
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]

    var twodate = option.value.toString()

    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
    // console.log(start+"//"+end);
    // console.log(startDate + '////' + endDate + 'inside export from  date')

    let response = await api.post('/post_mis_report_for_customer_pdf/', {
      from_date: formatDate1(twodate.split('=')[0]),
      to_date: formatDate1(twodate.split('=')[1]),
      // from_date:startDate,
      // to_date:endDate
    })
    // console.log(response.data.success+"this is the successssssssssssss")
    // try{
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          // report_date:a.report_date,
          //report_time:a.report_time,
          spoc_id: a?.spoc_id,
          name: a?.name,
          mail: a?.email,
          mobile: a?.user_mobile_no,
          machine_id: a?.machine_id,
          model_no: a?.model_no,
          location: a?.location,
          status: a.machine_status,
          count: a.current_inventory_count,
          product: a?.product,
          date: a?.date,
          time: a?.time,
          type: a?.type,
          amount: a?.amount,
          success: a?.success,
          refund_status: a?.refund_status,
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        data.push(options)
      }
      setNotes([])
      setNotes(data)
    } else if (response.data.success === 0) {
      // console.log('inside else part')
      setNotes([])
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //  // alert(a)
      // }

      alert(response.data.message)
      // alert()
    }
    // }catch(error)
    // {
    //   alert(error);
    // }
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

  function handlesetdate(e) {
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]
    var twodate = option.value.toString()
    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
  }
  function excel_url() {
    const url = `${baseURL}/generate_and_download_excel_report_for_customer/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`
    // window.location.href = url
    // return url
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
    .then(response => {
      if (response.ok) {
        // Convert the response to a blob and create a temporary URL to trigger the download
        console.log(response)
        return response.blob();
      } else {
        console.error('Request failed:', response.statusText);
      }
    })
    .then(blob => {
      // Create a temporary URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);
  
      // Create an anchor element to initiate the download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = 'CustomerMIS_Report'+formatDate1(new Date())+'.xlsx';
      document.body.appendChild(a);
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch(error => {
      console.error('Network error:', error);
    });
  
  }

 function pdfdownload(){
     var tabledata='';
     tabledata ='<h2 style="font-size: 16px; text-align: center; color:red">Customer MIS Report</h2>'
     +`<p style="font-size: 12px; text-align: center;">${startDate} to ${endDate}</p> `
    //  +`</br>Organization name :${'INDEFT Technology'}`
     + '<div class="justify-content: center"><table  border="1" style="margin-left: auto;margin-right: auto;width:100%;border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; border-color: #96D4D4;">'
     +'<tr><td colspan="5" style="font-size: 18px; text-align: center; font-weight: bold;background-color: green;">CUSTOMER</td>'
    +' <td colspan="5" style="font-size: 18px; text-align: center; font-weight: bold;background-color: #f8356f;color:white;">MACHINE</td>'
    +'<td colspan="7" style="font-size: 18px; text-align: center; font-weight: bold;background-color: yellow;">PRODUCT</td>'
    +' </tr>'

     +'<tr><th style="font-weight: bold;width:2%; text-align: center;">Sr. No.</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">SPOC ID</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">NAME</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Mobile</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Email</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Machin ID</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Model No</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Location</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Current status ON/OFF</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Current Inventory Count</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Product</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Date</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Time</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Type</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Amount</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Success (Y/N)</th>'
     +'<th style="font-weight: bold;width:5%;text-align: center;">Refund Status</th>'
     +'</tr>'

     notes.map((item,index) =>
   
      tabledata +=`<tr> 
          <td style="text-align: center;">${index+1}</td>
          <td style="text-align: center;">${item.spoc_id}</td>
          <td style="text-align: center;">${item.name}</td>
          <td style="text-align: center;">${item.mobile}</td>
          <td style="text-align: center;">${item.mail}</td>
          <td style="text-align: center;">${item.machine_id}</td>
          <td style="text-align: center;">${item.model_no}</td>
          <td style="text-align: center;">${item.location}</td>
          <td style="text-align: center;">${item.status}</td>
          <td style="text-align: center;">${item.count}</td>
          <td style="text-align: center;">${item.product}</td>
          <td style="text-align: center;">${item.date}</td>
          <td style="text-align: center;">${item.time}</td>
          <td style="text-align: center;">${item.type}</td>
          <td style="text-align: center;">${item.amount}</td>
          <td style="text-align: center;">${item.success}</td>
          <td style="text-align: center;">${item.refund_status}</td>
      </tr>`)
     tabledata=tabledata+'</table></div>';
     tabledata = tabledata.replace(/<th/g, '<th align="left" ').replace(/<td/g, '<td align="left" ');
     var printWindow = window.open('', '', 'height=400,width=800');
     // printWindow.document.write('<html><head>');
     //printWindow.document.write('</head><body><h1 style="text-align:center;">FSR Report</h1>');
     printWindow.document.write(tabledata);
     var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
     //printWindow.document.write(footer);
     // printWindow.document.write('</body></html>');
     printWindow.document.close();
    
     setTimeout(function () {
         printWindow.print();

     }, 10);
 
 
 
 }
 

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="mb-0" style={{ color: '#2C384A' }}>
              Customer MIS Report
            </h3>
          </div>{' '}
          <div>
{' '}

            {/* // <a href={excel_url()} > */}
            {/* <CButton
              //onClick={excel_url()}
              href={excel_url()}
              type="button"
              className="btn btn-default btn-sm"
              style={{ backgroundColor: '#2A409A', color: 'white', height: '28px' }}
            >
              Export Excel
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton> */}

            {/* // </a> */}
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          {/* &nbsp; &nbsp; &nbsp;{' '} */}
          <div>
            <select
              id="datetodate1"
              onChange={exportReport_FromTOdate}
              style={{ width: '150px', height: '25px' }}
            >
              {/* <option disabled selected> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;From - To &nbsp; &nbsp;&nbsp;</option> */}
              {/* <option disabled selected>
                please select the dates{' '}
              </option> */}

              <option value={optionArr.today}>
                {' '}
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; Today &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.yesterday} selected>
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
          </div>
          &nbsp; &nbsp; &nbsp;{' '}
          <div>
            {' '}
            {/* <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
              onClick={exportReport_FromTOdate}
            >
              submit
            </CButton> */}
            <CButton
              //onClick={excel_url()}
              // href={excel_url()}
              onClick={excel_url}
              type="button"
              className="btn btn-default btn-sm"
              style={{ backgroundColor:selectedColor, color: 'white', height: '28px' }}
            >
              Export Excel
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>
            {' '}
            <CButton
              // onClick={() => exportPDF()}
              onClick={pdfdownload}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor:selectedColor, color: 'white', height: '28px' }}
            >
              Export  Pdf 
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>
            {/* {' '}
            <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
             // onClick={user_id}
            >
              User ID
            </CButton>
            {' '}
            <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
             // onClick={key}
            >
              KEY
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
                //  cleaner
                clickableRows
                columns={columns}
                // columnSorter
                items={notes}
                itemsPerPageSelect
                itemsPerPage={10}
                pagination
                scopedColumns={{
                  sr_no: (item, index) => <td>{index + 1}</td>,
                  // date: (item) => <td>{formatDate(item.date)}</td>,
                }}
                itemsPerPageOptions={[10, 20, 50, 100]}
                tableProps={{
                  color: 'success-color-secondary',
                  hover: true,
                  bordered: true,
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
