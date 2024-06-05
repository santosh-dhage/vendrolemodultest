import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CDropdownMenu, CSmartTable } from '@coreui/react-pro'
import { useColor } from 'src/menu/adminsetting/colorcontext';
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
import { cilArrowBottom } from '@coreui/icons'
import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './App.css';
import DatePicker from 'react-datepicker'
import { CDateRangePicker } from '@coreui/react-pro'
import 'react-datepicker/dist/react-datepicker.css'
import * as XLSX from 'xlsx';
import baseurl from 'src/utils/baseurl'
import apiKey1 from 'src/utils/apikey'
const baseURL = baseurl()
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let api = useAxios()
const apikey=apiKey1()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))))
  let [endDate, setEndDate] = useState(formatDate1(new Date(new Date().setDate(new Date().getDate()))))

  let [coinCount, setCoincount] = useState(0)
  let [coinAmount, setCoinamount] = useState(0)
  let [qrCount, setQrcount] = useState(0)
  let [qrAmount, setQramount] = useState(0)
  let [totaltransaction, setTotaltransaction] = useState(0)
  let [totalAmount, setTotalamout] = useState(0)
  const { selectedColor } = useColor();
  useEffect(() => {
    getTopic()
  }, [])

  let addition = (a, b) => {
    return a + b
  }
  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('get_customer_user_payment_api_view/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      let CC = 0
      let CA = 0
      let QC = 0
      let QA = 0
      let TC = 0
      let TA = 0
      for (let i = 0; i < response.data.result.length; i++) {
        // for (let i = 0; i < sample.length; i++) {
        let a = response.data.result[i]
        console.log(a)

        let options = {
          machine_id: a.machine_id, // sample[i].Machine_Id,
          // payment_date: sample[i].refill_date,
          coin_count: parseInt(a.coin_mode_counts) + '/' + parseInt(a.coin_mode_counts) * 10, //sample[i].befor_refill + '/' + sample[i].befor_refill * 5,
          qr_pay_count: parseInt(a.qr_mode_counts) + '/' + parseInt(a.qr_mode_counts) * 10, // parseInt(sample[i].refill_count) + '/' + parseInt(sample[i].refill_count * 5),
          total_amount:
            parseInt(a.coin_mode_counts, 10) +
            parseInt(a.qr_mode_counts, 10) +
            '/' +
            (parseInt(a.coin_mode_counts, 10) + parseInt(a.qr_mode_counts, 10)) * 10,
          // machine_id: a?.M_Id,
          // payment_date: formatDate(a?.created_at),
          // payment_mode: a?.Mode,
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        CC = CC + parseInt(options.coin_count.split('/')[0])
        CA = CA + parseInt(options.coin_count.split('/')[1])
        QC = QC + parseInt(options.qr_pay_count.split('/')[0])
        QA = QA + parseInt(options.qr_pay_count.split('/')[1])
        TC = TC + parseInt(options.total_amount.split('/')[0])
        TA = TA + parseInt(options.total_amount.split('/')[1])
        data.push(options)
      }
      setNotes([])
      setCoincount(CC)
      setCoinamount(CA)
      setQrcount(QC)
      setQramount(QA)
      setTotaltransaction(TC)
      setTotalamout(TA)
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
      label: 'Machine ID',
      key: 'machine_id',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },

    {
      label: 'Coin Payment Count / Amount',
      key: 'coin_count',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold', align: 'middle' },
      _style: { minWidth: '180px' },
      // _props: { color: 'warning', align: 'middle' },
    },

    {
      label: 'QR Payment Count / Amount',
      key: 'qr_pay_count',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold', align: 'middle' },
      _style: { minWidth: '180px' },
      // _props: { color: 'warning', align: 'middle' },
    },

    {
      label: 'Total payments / Amount',
      key: 'total_amount',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
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
        'Coin Payment Count / Amount',
        'QR Payment Count / Amount',
        'Total payemnts / Amount',
        'Total Amount',
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
  const exportReport_FromTOdate = async (e) => {
    // let arr = { from: formatDate1(startDate), to: formatDate1(endDate) }
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]

    var twodate = option.value.toString()
    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
    let response = await api.post('/machine/post_customer_role_user_payment_report_excel/', {
      from: formatDate1(twodate.split('=')[0]),
      to: formatDate1(twodate.split('=')[1]),
    })

    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          machine_id: a?.machine_id, // sample[i].Machine_Id,
          // payment_date: sample[i].refill_date,
          coin_count: parseInt(a?.coin_mode_counts) + '/' + parseInt(a?.coin_mode_counts) * 10, //sample[i].befor_refill + '/' + sample[i].befor_refill * 5,
          qr_pay_count: parseInt(a.qr_mode_counts) + '/' + parseInt(a.qr_mode_counts) * 10, // parseInt(sample[i].refill_count) + '/' + parseInt(sample[i].refill_count * 5),
          total_amount:
            parseInt(a.coin_mode_counts, 10) +
            parseInt(a.qr_mode_counts, 10) +
            '/' +
            (parseInt(a.coin_mode_counts, 10) + parseInt(a.qr_mode_counts, 10)) * 10,
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
  const dateranges = () => {
    const optionArr = [
      formatDate(new Date()) + '=' + formatDate(new Date()),
      formatDate(new Date(new Date().setDate(new Date().getDate() - 1))) +
        '=' +
        formatDate(new Date(new Date().setDate(new Date().getDate() - 1))),
      formatDate(new Date(new Date().setDate(new Date().getDate() - 6))) +
        '=' +
        formatDate(new Date(new Date())),
      formatDate(new Date(new Date().setDate(new Date().getDate() - 29))) +
        '=' +
        formatDate(new Date(new Date())),
    ]
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

  function downloadExcel() {
    const workbook = XLSX.utils.book_new();

    // Example data
    const headers = [["Sr.No.", "Machine ID", "Coin Count","QR Count","Total"]];
    // for (let i = 0; i < notes.length; i++) {
    //   data=[...notes[i]]
    // }
    var data = []
  
    notes.map((item,index)=>data.push([index+1,item.machine_id,item.coin_count,item.qr_pay_count,item.total_amount]));
    const worksheetData = [...headers, ...data];
    // Convert the data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  // =====================================================================
  // worksheet.getRow(1).font={
  //   bold:true,
  // }
  for (let C = 0; C < headers[0].length; C++) {
    const cellRef = XLSX.utils.encode_cell({r: 0, c: C}); // Targeting the first row (headers)
    if (!worksheet[cellRef]) continue;
    worksheet[cellRef].s = {
      font: {
        bold: true,
      },
    };
  }
    // Attempt to set frozen headers (fixed headers) - this is a somewhat advanced usage
    if (!worksheet['!views']) {
      worksheet['!views'] = [];
    }
    
    worksheet['!views'].push({
      state: 'frozen',
      xSplit: 0,
      ySplit: 1, // Freeze the first row
     // topLeftCell: 'A2',
     // activeCell: 'A1'
    });
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  var filename="paymentReport"+formatDate(new Date())+".xlsx"
    // Generate an XLSX file and trigger the download
    XLSX.writeFile(workbook, filename);
  
  }
  function excel_url(){
    const url = `${baseURL}/machine/customer_role_payment_report_excel_download/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;
    //  return url;
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
      a.download = 'Payment_Report'+formatDate1(new Date())+'.xlsx';
      document.body.appendChild(a);
      a.click();
    
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch(error => {
      console.error('Network error:', error);
    });
    
  }

  function pdfdownload() {
    var tabledata = ''
    tabledata =
      '<h2 style="font-size: 16px; text-align: center; color:red">Machine Payment Report</h2>' +
      `<p style="font-size: 12px; text-align: center;">${startDate} to ${endDate}</p> ` +
      `</br>Organization name :${'INDEFT Technology'}</br>` +
      '<div class="justify-content: center"><table border="1" style="border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; border-color: #96D4D4;">' +
      '<tr><th style="font-weight: bold;width:5%;text-align: center;">Sr.No.</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Machine ID</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Coin Payment Count / Amount</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">QR Payment Count / Amount</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Total Payments / Amount</th>' +
      '</tr>'
  
    notes.map(
      (item, index) =>
        (tabledata += `<tr> 
          <td style="text-align: center;">${index + 1}</td>
          <td style="text-align: center;">${item.machine_id}</td>
          <td style="text-align: center;">${item.coin_count}</td>
          <td style="text-align: center;">${item.qr_pay_count}</td>
          <td style="text-align: center;">${item.total_amount}</td>
          
      </tr>`),
    )
  
    tabledata = tabledata + '</table></div>'
    tabledata = tabledata.replace(/<th/g, '<th align="left" ').replace(/<td/g, '<td align="left" ')
    var printWindow = window.open('', '', 'height=400,width=800')
    // printWindow.document.write('<html><head>');
    //printWindow.document.write('</head><body><h1 style="text-align:center;">FSR Report</h1>');
    printWindow.document.write(tabledata)
  
    //printWindow.document.write(footer);
    // printWindow.document.write('</body></html>');
    printWindow.document.close()
    setTimeout(function () {
      printWindow.print()
    }, 10)
  }
  
  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="mb-0" style={{ color: '#2C384A' }}>
              Machine Payment Report
            </h3>
          </div>{' '}
          <div>

            {/* <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
            >
              <CSVLink
                data={notes}
                filename="Vending_Machine_Report"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Export Excel
              </CSVLink>
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton> */}
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          {/* <DatePicker
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
          <div className="input-group-addon"> to </div> &nbsp;
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
          <div>
          <select id="datetodate1" onChange={exportReport_FromTOdate} style={{ width: '150px',height:'25px' }}>
              {/* <option> &nbsp; &nbsp;&nbsp;From - To &nbsp; &nbsp;&nbsp;</option> */}
              {/* <option disabled selected>please select the dates </option> */}
              <option value={optionArr.today}>
                {' '}
                &nbsp; &nbsp;&nbsp; Today &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.yesterday} selected>
                {' '}
                &nbsp; &nbsp;&nbsp; Yesterday &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.week}>
                {' '}
                &nbsp; &nbsp;&nbsp;Weekly &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.month}>
                {' '}
                &nbsp; &nbsp;&nbsp;Monthly &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.quarterly}>
                {' '}
                &nbsp;&nbsp;&nbsp;Quarterly &nbsp; &nbsp;&nbsp;{' '}
              </option>
              <option value={optionArr.yearly}>
                {' '}
                &nbsp;&nbsp;&nbsp;Yearly &nbsp; &nbsp;&nbsp;{' '}
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
              // onClick={downloadExcel}
              // href={excel_url()}
              onClick={excel_url}      
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: selectedColor, color: 'white' }}
            >
              Export Excel
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>{' '}
            <CButton
              // onClick={() => exportPDF()}
              onClick={pdfdownload}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: selectedColor, color: 'white' }}
            >
              Export pdf <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>{' '}
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
                    // footer={['','','Total :',coinCount+'/'+coinAmount ,qrCount+'/'+qrAmount,totaltransaction+'/'+totalAmount]}
                    // onRowClick={}
                    scopedColumns={{
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
                    // tableBodyProps={{
                    //   className: 'align-middle',
                    // }}
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
