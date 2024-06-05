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
import '../report.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './App.css';
import DatePicker from 'react-datepicker'
import { CDateRangePicker } from '@coreui/react-pro'
import 'react-datepicker/dist/react-datepicker.css'
import baseurl from 'src/utils/baseurl'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import apiKey1 from 'src/utils/apikey'
const baseURL = baseurl()
//import User from 'src/menu/report/superadmin/key'
//import Key from 'src/menu/report/superadmin/user_id'
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let api = useAxios()
const apikey=apiKey1();
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate())))

  let [coinCount, setCoincount] = useState(0)
  let [coinAmount, setCoinamount] = useState(0)
  let [qrCount, setQrcount] = useState(0)
  let [qrAmount, setQramount] = useState(0)
  let [totaltransaction, setTotaltransaction] = useState(0)
  let [totalAmount, setTotalamout] = useState(0)
  const { selectedColor } = useColor();
  useEffect(() => {
    // getTopic()
    exportReport_FromTOdate();
  }, [])

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('get_mis_report_for_user/')
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
          user_id: a.user_id,
          name: a.name,
          mail: a.email,
          mobile: a.user_mobile_no,
          machine_id: a.machine_id,
          model_no: a.model_no,
          location: a.location,
          status: a.machine_status,
          count: a.current_inventory_count,
          product_type: a.type,
          refill_date: a?.refill_date,
          refill_quantity: a?.refill_quantity,
          recent_cash_collection_date: '',
          recent_amount_collected: '',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        data.push(options)
      }
      setNotes(data)
    } else if (response.data.success === 0) {
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //   alert(a)
      // }
      setNotes([])
      alert(response.data.message)
    }
  }

  let getrefresh = () => {
    window.location.reload()
  }

  const columns = [
    {
      group: 'TENDRYL',
      // groupId: 'tendrylGroupId',
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
          key: 'user_id',
          label: 'User ID',
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
      _props: { colSpan: 5, color: 'yellow' },
      children: [
        {
          key: 'product_type',
          label: 'Product Type',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'refill_date',
          lable: 'Recent Refill Date',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'refill_quantity',
          label: 'Quantity Refilled',
          // _props: { colSpan: 3, scope: 'colgroup' },
          // _style: { width: '50%' },
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'recent_cash_collection_date',
          label: 'Recent Cash Collection Date',
          _props: { scope: 'col' },
          sorter: false,
          _style: { minWidth: '100px' },
        },
        {
          key: 'recent_amount_collected',
          label: 'Recent Amount Collected',
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
    exportReport_FromTOdate()
    const unit = 'pt'
    const size = 'A2' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape

    const marginLeft = 0
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = '          User MIS Report'
    const headers = [
      [
        'Sr No',
        'User ID',
        'Name',
        'Mobile',
        'Email',
        'Machine ID',
        'Model No',
        'Location',
        'Current Status',
        'Current Inventory Count',
        'Product Type',
        'Recent Refill Date',
        'Quantity Refilled',
        'Recent Cash Collection Date',
        'Recent Amount Collected',
      ],
    ]

    const data = notes?.map((elt, index) => [
      index + 1,
      elt.user_id,
      elt.name,
      elt.mobile,
      elt.email,
      elt.machine_id,
      elt.model_no,
      elt.location,
      elt.status,
      elt.count,
      elt.product_type,
      elt.recent_refill_date,
      elt.quantity_refilled,
      elt.recent_cash_collection_date,
      elt.recent_amount_collected,
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('user_mis_Report.pdf')
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
    console.log(twodate + 'inside usermis export report')
    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
    // console.log(startDate+"santosh27march");
    // console.log(endDate);
    // console.log(start+"inside export_formtodate"+end)
    let response = await api.post('post_mis_report_for_user_pdf/', {
      from_date: formatDate1(twodate.split('=')[0]),
      to_date:formatDate1(twodate.split('=')[1]) ,

    })
    // try {
      if (response.data.success === 1) {
        let data = []
        for (let i = 0; i < response.data.result.length; i++) {
          let a = response.data.result[i]
          console.log(a)
          let options = {
            user_id: a.user_id,
            name: a.name,
            mail: a.email,
            mobile: a.user_mobile_no,
            machine_id: a.machine_id,
            model_no: a.model_no,
            location: a.location,
            status: a.machine_status,
            count: a.current_inventory_count,
            product_type: a.product,
            // recent_refill_date: a.refilled_date,
            // quantity_refilled: a.refilled_quantity,
            refill_date: a?.refill_date,
            refill_quantity: a?.refill_quantity,
            recent_cash_collection_date: '',
            recent_amount_collected: '',
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
        //  // alert(a)
        // }
        setNotes([])
        alert(response.data.message)
      }
    // } catch (error) {
    //   alert(error)
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
  // console.log(optionArr.today);
  // console.log(optionArr.yesterday);
  // console.log(optionArr.week);
  // console.log(optionArr.month);
  // console.log(optionArr.quarterly+"quarterly");
  // console.log(optionArr.yearly+"yearly");

  function handlesetdate(e) {
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]

    var twodate = option.value.toString()
    //console.log(twodate+"  to date chaeck1");
    // start="";
    // end="";
    //      start=twodate.split('=')[0];
    //      end=twodate.split('=')[1]
    // console.log(startDate+"check befor assigned"+endDate)
    setStartDate(twodate.split('=')[0])
    setEndDate(twodate.split('=')[1])
    // console.log(start+"yes");
    // console.log(end);
    // setStartDate(start)
    // setEndDate(end)

    // console.log(startDate+"using split")
    // console.log(endDate+"using split")
    // console.log(twodate.split('=')[0]+"santosh27march");
    // console.log(twodate.split('=')[1]);
  }
  function excel_url(){
    const url = `${baseURL}/generate_and_download_excel_report_for_user/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;
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
    a.download = 'UserMIS_Report'+formatDate1(new Date())+'.xlsx';
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
    tabledata ='<h2 style="font-size: 16px; text-align: center; color:red">User MIS Report</h2>'
    +`<p style="font-size: 12px; text-align: center;">${startDate} to ${endDate}</p> `
    // +`</br>Organization name :${'INDEFT Technology'}`
    + '<div class="justify-content: center"><table  border="1" style="margin-left: auto;margin-right: auto;width:100%;border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; ">'
    +'<tr><td colspan="5" style="font-size: 18px; text-align: center; font-weight: bold;background-color: green;">TENDRYL</td>'
   +' <td colspan="5" style="font-size: 18px; text-align: center; font-weight: bold;background-color: #f8356f;color:white;">MACHINE</td>'
   +'<td colspan="5" style="font-size: 18px; text-align: center; font-weight: bold;background-color: yellow;">PRODUCT</td>'
   +' </tr>'

    +'<tr><th style="font-weight: bold;width:2%; text-align: center;">Sr. No.</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">User ID</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">NAME</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Mobile</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Email</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Machin ID</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Model No</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Location</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Current status ON/OFF</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Current Inventory Count</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Product Type</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Refill Quantity</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Quantity Refilled</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Recent Cash Collection Date</th>'
    +'<th style="font-weight: bold;width:5%;text-align: center;">Recent Amount Collected</th>'

    +'</tr>'

    notes.map((item,index) =>
  
     tabledata +=`<tr> 
         <td style="text-align: center;">${index+1}</td>
         <td style="text-align: center;">${item.user_id}</td>
         <td style="text-align: center;">${item.name}</td>
         <td style="text-align: center;">${item.mobile}</td>
         <td style="text-align: center;">${item.mail}</td>
         <td style="text-align: center;">${item.machine_id}</td>
         <td style="text-align: center;">${item.model_no}</td>
         <td style="text-align: center;">${item.location}</td>
         <td style="text-align: center;">${item.status}</td>
         <td style="text-align: center;">${item.count}</td>
         <td style="text-align: center;">${item.product_type}</td>
         <td style="text-align: center;">${item.refill_quantity}</td>
         <td style="text-align: center;">${item.refill_date}</td>
       
         <td style="text-align: center;">${item.recent_cash_collection_date}</td>
         <td style="text-align: center;">${item.recent_amount_collected}</td>
     </tr>`)

    
    tabledata=tabledata+'</table></div>';
    tabledata = tabledata.replace(/<th/g, '<th align="left" ').replace(/<td/g, '<td align="left" ');
    var printWindow = window.open('', '', 'height=400,width=800');
    // printWindow.document.write('<html><head>');
    //printWindow.document.write('</head><body><h1 style="text-align:center;">FSR Report</h1>');
    printWindow.document.write(tabledata);

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
              User MIS Report
            </h3>
          </div>{' '}
          <div>

            {/* <a href={excel_url()} > */}
            {/* <CButton
            href={excel_url()}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white',height:'28px' }}
             // onClick={exportReport_FromTOdate}
            >
                Export Excel{' '}
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton> */}
            {/* </a> */}
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          {/* &nbsp; &nbsp; &nbsp;{' '} */}
          {/* <div> */}
          <select
            id="datetodate1"
            onChange={exportReport_FromTOdate}
            style={{ width: '150px', height: '25px' }}
          >
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
          {/* </div> */}
          &nbsp; &nbsp; &nbsp;{' '}
          <div>
            {' '}
            {/* <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
              onClick={handlesetdate}
            >
              submit
            </CButton> */}
            <CButton
              // href={excel_url()}
              onClick={excel_url}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor:selectedColor, color: 'white', height: '28px' }}
              // onClick={exportReport_FromTOdate}
            >
              Export Excel <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>{' '}
              <CButton
              // onClick={() => exportPDF()}
              onClick={pdfdownload}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor:selectedColor, color: 'white', height: '28px' }}
            >
              Export Pdf <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
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
                // columnSorter
                items={notes}
                itemsPerPageSelect
                itemsPerPage={10}
                pagination
                // footer={[
                //   '',
                //   '',
                //   'Total :',
                //   coinCount + '/' + coinAmount,
                //   qrCount + '/' + qrAmount,
                //   totaltransaction + '/' + totalAmount,
                // ]}
                scopedColumns={{
                  sr_no: (item, index) => <td>{index + 1}</td>,
                  created_at: (item) => <td>{formatDate(item.created_at)}</td>,
                }}
                itemsPerPageOptions={[10, 20, 50, 100]}
                //tableFilter
                tableProps={{
                  color: 'success-color-secondary',
                  hover: true,
                  // border: '1.5px solid #074',
                  bordered: true,
                  //  color: 'black',
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
