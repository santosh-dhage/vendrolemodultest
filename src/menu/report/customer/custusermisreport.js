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
import { cilArrowBottom } from '@coreui/icons'
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
import apiKey from 'src/utils/apikey'
const baseURL=baseurl();
//import User from 'src/menu/report/superadmin/key'
//import Key from 'src/menu/report/superadmin/user_id'
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let api = useAxios()
const apikey=apiKey();
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
  var start="";
  var end="";
  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('get_mis_customer_user_report/')
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
            user_id:a.user_id,
            name:a.name,
            mail:a.email,
            mobile:a.user_mobile_no,
            machine_id:a.machine_id,
            model_no:a.model_no,
            location:a.location,
            status:'',
            count:'',
            product_type:'',
            recent_refill_date:a.date,
            quantity_refilled:'',
            recent_cash_collection_date:'',
            recent_amount_collected:a.amount,
  
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
     
        data.push(options)
      }
      setNotes(data)
     console.log(notes);

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
        group: 'TENDRYL',
        // groupId: 'tendrylGroupId',
        _props: { colSpan: 5 ,color:'green'},
        
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
            label:'Name',
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
            label:'Email',
            _props: { scope: 'col' },
            sorter: false,
            _style: { minWidth: '100px' },
          },
        ],
      },
      {
        group: 'MACHINE',
        _props: { colSpan: 5,color:'red' },
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
            label:'Model No',
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
        _props: { colSpan: 5, color:'yellow' },
        children: [
          {
            key: 'product_type',
            label: 'Product Type',
            _props: { scope: 'col' },
            sorter: false,
            _style: { minWidth: '100px' },
          },
          {
            key: 'recent_refill_date',
            lable:'Recent Refill Date',
            _props: { scope: 'col' },
            sorter: false,
            _style: { minWidth: '100px' },
          },
          {
            key: 'quantity_refilled',
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
   // exportReport_FromTOdate();
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
      elt.recent_amount_collected
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

    let response = await api.post('post_mis_report_for_user_pdf/', {
      from: formatDate1(startDate) ,
      to:formatDate1(endDate) ,

    })

    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          user_id:a.user_id,
          name:a.name,
          mail:a.email,
          mobile:a.user_mobile_no,
          machine_id:a.machine_id,
          model_no:a.model_no,
          location:a.location,
          status:'',
          count:'',
          product_type:'',
          recent_refill_date:a.date,
          quantity_refilled:'',
          recent_cash_collection_date:'',
          recent_amount_collected:a.amount,
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
      formatDate1( new Date(new Date())),
    month:
    formatDate1(new Date(new Date().setDate(new Date().getDate() - 29))) +
      '=' +
      formatDate1(new Date(new Date())),
      quarterly: formatDate1(new Date(new Date().setDate(new Date().getDate() - 90))) +
      '=' +
      formatDate1(new Date(new Date())),
      yearly:formatDate1(new Date(new Date().setDate(new Date().getDate() - 365))) +
      '=' +
      formatDate1(new Date(new Date())),
  }
  // console.log(optionArr.today);
  // console.log(optionArr.yesterday);
  // console.log(optionArr.week);
  // console.log(optionArr.month);
  // console.log(optionArr.quarterly+"quarterly");
  // console.log(optionArr.yearly+"yearly");

  function handlesetdate(e){
    var index = document.getElementById('datetodate1').selectedIndex //.options[selectedIndex].value
    const option = document.getElementById('datetodate1').options[index]

    var twodate = option.value.toString()

     setStartDate(twodate.split('=')[0]);
     setEndDate(twodate.split('=')[1]);

    //  const filteredData = notes.filter((item) => {
    //   const itemDate = new Date(item.recent_refill_date);
    //   return itemDate >= startDate && itemDate <= endDate;
    // });

   // setNotes(filteredData);
    // console.log(start+"yes");
    // console.log(end);
    // setStartDate(start)
    // setEndDate(end)


    // console.log(startDate+"using split")
    // console.log(endDate+"using split")
    // console.log(twodate.split('=')[0]+"santosh27march");
    // console.log(twodate.split('=')[1]);
  }
  let excel_url=async()=>{
    const url = `${baseURL}/get_customer_role_for_user_download_excel_report/${authTokens.user.id}/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;
    console.log(url)
    // const url = `${baseurl}/api/active_user_data/${authTokens?.user?.id}/`;
  const headers = new Headers({
    'x-api-key': apikey,
  });
   console.log(apikey)
  // Make the request using fetch
  const request = new Request(url, {
    method: 'GET',
    headers: headers,
  });

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
      // a.download = 'Active_Users '+formatDate1(new Date())+'.xlsx';
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch(error => {
      console.error('Network error:', error);
    });
    // let response = await fetch(baseURL + '/get_customer_role_for_user_download_excel_report/?from_date='+formatDate1(startDate)+'&to_date='+formatDate1(endDate), {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json','x-api-key' : apikey
    //   },
    // })
    // let data1 = await response.json()
    // if(data1.success==1){
    //   window.location.href = url;
    // }
    // else if(data1.success==0) {
    //   console.log('please select the correct date')
    // }
   
// // ======================================================
// try {
//   const response = await fetch(
//    url,
//   )
//   const data = await response.json()

//   return url // Assuming the endpoint returns { isAvailable: true/false }
// } catch (error) {
//   console.error('Error checking data availability:', error)
//   alert('Failed to check data availability.')
//   return ''
// }
  //  return url;
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
            {/* <CButton
              onClick={() => exportPDF()}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
            >
              Export Pdf <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>{' '} */}
            {/* <a href={excel_url()} > */}
            <CButton
           // href={excel_url()}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white',height:'28px' }}
              onClick={excel_url}
            >
                Export Excel
              <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
            </CButton>
            {/* </a> */}
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          &nbsp; &nbsp; &nbsp;{' '}
          <div>
            <select id="datetodate1" style={{ width: '150px',height:'25px' }}>
              <option disabled selected>please select the dates </option>
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
          </div>
          &nbsp; &nbsp; &nbsp;{' '}
          <div>
            {' '}
            <CButton
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
              onClick={handlesetdate}
            >
              submit
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
                   // cleaner
                    clickableRows
                    columns={columns}
                    columnSorter
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
                      align:'middle',
                      className: 'align-middle',
                    }}
                    tableBodyProps={{
                      align:'middle',
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
