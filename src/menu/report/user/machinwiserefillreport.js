import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import { CButton, CRow, CCol, CCard, CCardBody } from '@coreui/react-pro'
import AuthContext from 'src/context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'

import 'react-datepicker/dist/react-datepicker.css'

import baseurl from 'src/utils/baseurl'
import apiKey1 from 'src/utils/apikey'
const baseURL = baseurl()
function Topic() {
  let { id, location } = useParams()
  let api = useAxios()
  const navigate = useNavigate()
  const apikey = apiKey1()
  const { selectedColor } = useColor()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))

  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    let response = await api.get(`user_stock_capacity_equal_count_per_day_by_id/${id}/`)
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          refill_count: a.count_capacity_equals_stock,
          refill_date: a.date,
          stock_before_date: a.stock_before_date,
          refill_quantity: a.refill_quantity,
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
    // {
    //   label: 'Machine ID',
    //   key: 'machine_id',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   // _style: { minWidth: '130px' },
    // },
    {
      label: 'Before Refill Stock',
      key: 'stock_before_date',
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
    // {
    //   label: 'After Refill Stock',
    //   key: 'befor_refill_stock',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold', align: 'middle' },
    //   // _style: { minWidth: '180px' },
    //   // _props: { color: 'warning', align: 'middle' },
    // },
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
    {
      label: 'Refill Date',
      key: 'refill_date',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      // _style: { minWidth: '130px' },
    },
    // {
    //   label: 'Location',
    //   key: 'location',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   // _style: { minWidth: '130px' },
    // },
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
    let response = await api.get(
      `/post_user_stock_capacity_equal_count/${id}/?from_date=${formatDate1(
        twodate.split('=')[0],
      )}&to_date=${formatDate1(twodate.split('=')[1])}`,
    )
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          refill_count: a.count_capacity_equals_stock,
          refill_date: a.date,
          refill_quantity: a.refill_quantity,
          stock_before_date: a.stock_before_date,
        }

        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        data.push(options)
      }
      setNotes([])
      setNotes(data)
    } else if (response.data.success === 0) {
      setNotes([])
      alert(response.data.message)
    }
  }


  function excel_url(){
    const url = `${baseURL}/machine/get_stock_by_machine_user_role_refill_excel_download/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;
   
    // return url;
    const headers = new Headers({
      'x-api-key': apikey,
      Authorization: `Bearer ${authTokens?.access}`,
    })
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
      a.download = 'Refill_Report'+formatDate1(new Date())+'.xlsx';
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
      '<h2 style="font-size: 16px; text-align: center; color:red">Machine Refill Report</h2>' +
      `<p style="font-size: 12px; text-align: center;">${startDate} to ${endDate}</p> ` +
      `</br>Machine ID : &nbsp;&nbsp;  ${id}</br>` +`Location &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;  ${location}</br>` +
      '<table border="1" style="margin-left: auto;margin-right: auto;border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; ">' +
      '<tr><th style="font-weight: bold;width:5%;text-align: center;">Sr.No.</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Before Refill Stock</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Refill Quantity</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Refill Count</th>' +
      '<th style="font-weight: bold;width:19%;text-align: center;">Refill Date</th>' +
      '</tr>'
  
    notes.map(
      (item, index) =>
        (tabledata += `<tr> 
          <td style="text-align: center;">${index + 1}</td>
          <td style="text-align: center;">${item.stock_before_date}</td>
          <td style="text-align: center;">${item.refill_quantity}</td>
          <td style="text-align: center;">${item.refill_count}</td>
          <td style="text-align: center;">${item.refill_date}</td>
         
      </tr>`),
    )
  
    tabledata = tabledata + '</table>'
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
      <div className="mt-2 mb-1 d-flex justify-content-start">
        <CButton
          style={{ backgroundColor: selectedColor }}
          onClick={() => navigate(-1)} // navigate back one page
        >
          Back
        </CButton>
      </div>
      <div>
        <h4 className="mb-4" style={{ color: '#2C384A' }}>
          Machine ID : {id}
        </h4>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="mb-4" style={{ color: '#2C384A' }}>
          Machine Location : {location}
        </h4>
      </div>
      <div className="mb-3">
        <div className="input-group mt-2 mb-2">
          <div>
            <select
              id="datetodate1"
              onChange={exportReport_FromTOdate}
              style={{ width: '150px', height: '25px' }}
            >
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
          
            <CButton
              onClick={excel_url}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: selectedColor, color: 'white' }}
            >
              Export Excel
             
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>
            {' '}
            <CButton
              onClick={pdfdownload}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: selectedColor, color: 'white' }}
            >
              Export pdf
             
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
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
                    clickableRows
                    columns={columns}
                    // columnSorter
                    items={notes}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    pagination
                    scopedColumns={{
                      sr_no: (item, index) => <td>{index + 1}</td>,
                      created_at: (item) => <td>{formatDate(item.created_at)}</td>,
                    }}
                    itemsPerPageOptions={[10, 20, 50, 100]}
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
