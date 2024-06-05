import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import { CButton, CRow, CCol, CCard, CCardBody, CImage } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'
// import { format, setDate } from 'date-fns'
// import useAxios from 'src/utils/newuseAxios'
//const api=UseAxios();

import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'
import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import e1 from 'src/assets/images/eye.png'
//import './App.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as XLSX from 'xlsx'
import baseurl from 'src/utils/baseurl'
import apiKey1 from 'src/utils/apikey'
const baseURL = baseurl()
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let api = useAxios()
  const apikey = apiKey1()
  const { selectedColor } = useColor()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [total, setTotal] = useState(0)
  let [startDate, setStartDate] = useState(
    formatDate1(new Date(new Date().setDate(new Date().getDate() - 1))),
  )
  let [endDate, setEndDate] = useState(
    formatDate1(new Date(new Date().setDate(new Date().getDate()))),
  )

  useEffect(() => {
    // getTopic()
    exportReport_FromTOdate();
  }, [])

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('machine/api/get_generate_report_for_customer_record')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      let total = 0
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          id: a.id,
          customer_name: a.name,
          customer_Id: a.email,
          mobile_no: a.customer_mobile_no,
          machine_assigned_date: formatDate(a.assigned_customer_date),
          machine_quantity: a.assigned_count,
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        total = total + parseInt(options.machine_quantity) //total+1000;
        data.push(options)
      }
      setNotes([])
      setTotal(0)
      setTotal(total)
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
      _props: { color: 'secondary' , className: 'fw-semibold' },
      // _style: { minWidth: '75px'},
    },
    {
      label: 'Name',
      key: 'customer_name',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    {
      label: 'Email / ID',
      key: 'customer_Id',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },

    {
      label: 'Mobile Number',
      key: 'mobile_no',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold', align: 'middle' },
      // _style: { minWidth: '180px' },
      // _props: { color: 'warning', align: 'middle' },
    },

    // {
    //   label: 'Machine Assigned Date',
    //   key: 'machine_assigned_date',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '130px' },
    // },
    {
      label: 'Machine Quantity',
      key: 'machine_quantity',
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
      // _style: { minWidth: '60px' },
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
        'Customer Name',
        'Customer ID',
        'Mobile Number',
        'Machine Assigned Date',
        'Machin Quantity',
      ],
    ]

    const data = notes?.map((elt, index) => [
      index + 1,
      elt.customer_name,
      elt.customer_Id,
      elt.mobile_no,
      elt.machine_assigned_date,
      elt.machine_quantity,
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
    let response = await api.post('machine/api/read_machine_customer_mapping_report_excel/', {
      // from: startDate,
      // to: endDate,
      from: formatDate1(twodate.split('=')[0]),
      to: formatDate1(twodate.split('=')[1]),
    })

    if (response.data.success === 1) {
      let data = []
      let total = 0
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          customer_name: a.name,
          customer_Id: a.email,
          mobile_no: a.customer_mobile_no,
          machine_assigned_date: formatDate(a.assigned_customer_date),
          machine_quantity: a.assigned_count,
        }
        // data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        total = total + options.machine_quantity //total+1000;
        data.push(options)
      }
      setNotes([])
      setTotal(0)
      setTotal(total)
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

  function downloadExcel() {
    const workbook = XLSX.utils.book_new()
    const title = [['Customer Report']];
    const hhhh=[['kjndknmldkamlkmda']]
    // Example data

    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' }
    };

    const headers = [
      [
        'Sr.No.',
        'Customer Name',
        'Customer ID',
        'Mobile NO',
        'Machine Assigned Date',
        'Machin Quantity',
      ],
    ]
    // for (let i = 0; i < notes.length; i++) {
    //   data=[...notes[i]]
    // }
    var data = []

    notes.map((item, index) =>
      data.push([
        index + 1,
        item.customer_name,
        item.customer_Id,
        item.mobile_no,
        item.machine_assigned_date,
        item.machine_quantity,
      ]),
    )
    const worksheetData = [...title,'',...headers, ...data]
    // Convert the data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)


    const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
    worksheet[titleCell].s = {
      font: { bold: true},
      alignment: { horizontal: 'center' },
    };
  
    // Merge the title cell across the width of the headers
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: headers[0].length - 1 } },
    ];

    
    // =====================================================================
    for (let C = 0; C < headers[0].length; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: 3, c: C }) // Targeting the first row (headers)
      if (!worksheet[cellRef]) continue
      worksheet[cellRef].s = {
        font: {
          bold: true,
        },
      }
    }
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
    var filename = 'CustomerReport' + formatDate(new Date()) + '.xlsx'
    // Generate an XLSX file and trigger the download
    XLSX.writeFile(workbook, filename)
  }


  
  function excel_url() {
    const url = `${baseURL}/machine/admin_download_excel_customer/?from_date=${formatDate1(
      startDate,
    )}&to_date=${formatDate1(endDate)}`
    // console.log(url)
    //  const url2=`/generate_and_download_excel_report_for_user/${formatDate1(startDate)}/${formatDate1(endDate)}`;
    //   let response = await api.get(url2);
    //   console.log(response)
    //   if (response.data.success === 0)
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
        a.download = 'Customer_Report' + formatDate1(new Date()) + '.xlsx'
        document.body.appendChild(a)
        a.click()

        // Clean up
        window.URL.revokeObjectURL(downloadUrl)
      })
      .catch((error) => {
        console.error('Network error:', error)
      })
  }

  function pdfdownload() {
    
    var tabledata = ''
    tabledata =
      '<h2 style="font-size: 16px; text-align: center; color:red">Customer Machine Report</h2>' +
      `<p style="font-size: 12px; text-align: center;">${startDate} to ${endDate}</p> ` +
      // `</br>Organization name :${'INDEFT Technology'}</br>` +
      '<div class="justify-content: center"><table border="1" style="margin-left: auto;margin-right: auto;border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; border-color: black;">' +
      '<tr><th style="font-weight: bold;width:5%;text-align: center;">Sr.No.</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Customer Name</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Customer ID</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Mobile No</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Date</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Machin Quantity</th>' +
      '</tr>'

    notes.map(
      (item, index) =>
        (tabledata += `<tr> 
          <td style="text-align: center;">${index + 1}</td>
          <td style="text-align: center;">${item.customer_name}</td>
          <td style="text-align: center;">${item.customer_Id}</td>
          <td style="text-align: center;">${item.mobile_no}</td>
          <td style="text-align: center;">${item.machine_assigned_date}</td>
          <td style="text-align: center;">${item.machine_quantity}</td>
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
              <b>Customer Machine Report</b>
            </h3>
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          <div>
            <select
              id="datetodate1"
              onChange={exportReport_FromTOdate}
              style={{ width: '150px', height: '25px' }}
            >
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
             onClick={exportReport_FromTOdate}>submit</CButton> */}
            <CButton
              // href={excel_url()}
              onClick={excel_url}
              // onClick={downloadExcel}
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
            </CButton>
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
                    //  footer={['','','','','','Total : '+total]}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    pagination
                    scopedColumns={{
                      Action: (item) => (
                        <td>
                          <Link
                            to={
                              '/superadmin/customer/reportdetail/' +
                              `${item.customer_name}` +
                              '/' +
                              `${item.machine_quantity}` +
                              '/' +
                              `${item.id}`
                            }
                          >
                            <CImage src={e1} width={17} height={15} title="View State" />
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
                    tableFootProps={{
                      color: 'light',
                      align: 'middle',
                      className: 'align-middle',
                    }}
                    // style={{overflow-x='auto'}}
                    //  tableFilterLabel={'Search : '}
                    //  tableFilterPlaceholder={'Enter String to Search'}
                    itemsPerPageLabel={'Rows per page:'}
                  />

                  {/* <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email / ID</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Machine Assigned Date</th>
                        <th scope="col">Machine Quantity</th>
                                          
                    </tr>
                </thead>

                <tbody>
                  {notes.map((item,index) =>
                  
                    <tr>
                     
                        <td>{index+1}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.customer_Id}</td>
                        <td>{item.mobile_no}</td>
                        <td>{item.machine_assigned_date}</td>
                        <td>{item.machine_quantity}</td> 
                                          
                    </tr>)}
                    
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total{total}</td>
                    </tr>
                    
                </tbody>
            </table> */}
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
