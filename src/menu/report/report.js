import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CSmartTable,  } from '@coreui/react-pro'
import { CButton, CRow, CCol, CCard, CCardBody } from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'
// import { format, setDate } from 'date-fns'

import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'

import jsPDF from "jspdf";
import "jspdf-autotable";
//import './App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Topic() {
  let api = useAxios()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(new Date())
  let [endDate, setEndDate] = useState(new Date())
  // let startDate;//=new Date()
  // let endDate;
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const vars = {
    '--my-css-var': 10,
    '--my-another-css-var': 'red',
  }
  function handleSelect(ranges) {
    // ranges.selection.startDate, ranges.selection.endDate
    setState([ranges.selection])
  }
  useEffect(() => {
    getTopic()
    // fromtodate()
    // startDate=formatDate1(startDate)
    //endDate=formatDate1(endDate)
    // console.log(formatDate1(startDate), 'santosh====atta ', formatDate1(endDate))
  }, [])

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('/machine/api/get_generate_report_for_all_record/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          Machine_Id: a.machine_id,
          Customer_Id: a.email,
          Customer_Created_Date: formatDate(a.assigned_customer_date),
          User_Id: a.user_email,
          User_Created_Date: formatDate(a.assigned_user_date),
          Machine_Assigned_Date: formatDate(a.assigned_customer_date),
          Machine_Created_Date: "Machine-created-date-Dummy",
          Machine_QR_Assigned_Date: ' machine-qr assigned date',
          QR_coin: 'QR/coin',
          Transaction_Date: 'a.assigned_user_date',
          Capacity_Stock: '25/25',
          Merchant_Id: 'maerchantid1',
          Merchant_Name: 'merchant namedummy',
          Store_Id: 'stored id',
          Store_Name: 'storenamedummy',
          QR_Id: 'qrdummy',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

  //for get data from-To dates
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
  //for static data  show inbeetween dates
  let sample = [{
    sr_no: '1', Machine_Id: 'machine_id1', Customer_Id: 'customerID1', Customer_Created_Date: '01-04-2024',
    User_Id: 'userid1', User_Created_Date: '01-04-2024', Machine_Assigned_Date: '02-04-2024', Machine_Created_Date: '03-04-2024',
    Machine_QR_Assigned_Date: '04-04-2024', QR_coin: 'coin', Transaction_Date: '02-04-2024', Capacity_Stock: '25/5',
    Merchant_Id: 'merchantid', Merchant_Name: 'merchatname', Store_Id: 'storedid', Store_Name: 'storename', QR_Id: 'qrid'
  },
  {
    sr_no: '1', Machine_Id: 'machine_id2', Customer_Id: 'customerID1', Customer_Created_Date: '01-04-2024',
    User_Id: 'userid1', User_Created_Date: '02-04-2024', Machine_Assigned_Date: '02-04-2024', Machine_Created_Date: '03-04-2024',
    Machine_QR_Assigned_Date: '04-04-2024', QR_coin: 'coin', Transaction_Date: '02-04-2024', Capacity_Stock: '25/5',
    Merchant_Id: 'merchantid', Merchant_Name: 'merchatname', Store_Id: 'storedid', Store_Name: 'storename', QR_Id: 'qrid'
  },
  {
    sr_no: '1', Machine_Id: 'machine_id3', Customer_Id: 'customerID1', Customer_Created_Date: '01-04-2024',
    User_Id: 'userid1', User_Created_Date: '03-04-2024', Machine_Assigned_Date: '02-04-2024', Machine_Created_Date: '03-04-2024',
    Machine_QR_Assigned_Date: '04-04-2024', QR_coin: 'coin', Transaction_Date: '02-04-2024', Capacity_Stock: '25/5',
    Merchant_Id: 'merchantid', Merchant_Name: 'merchatname', Store_Id: 'storedid', Store_Name: 'storename', QR_Id: 'qrid'
  },
  {
    sr_no: '1', Machine_Id: 'machine_id4', Customer_Id: 'customerID1', Customer_Created_Date: '01-04-2024',
    User_Id: 'userid1', User_Created_Date: '04-04-2024', Machine_Assigned_Date: '02-04-2024', Machine_Created_Date: '03-04-2024',
    Machine_QR_Assigned_Date: '04-04-2024', QR_coin: 'coin', Transaction_Date: '02-04-2024', Capacity_Stock: '25/5',
    Merchant_Id: 'merchantid', Merchant_Name: 'merchatname', Store_Id: 'storedid', Store_Name: 'storename', QR_Id: 'qrid'
  }]

  let arrr = [];

  const handle = (e) => {
    const startDate = new Date("01-04-2024");
    const endDate = new Date("03-04-2024");

    for (let i = 0; i < sample.length; i++) {
      if (sample[i].User_Created_Date <= endDate && sample[i].User_Created_Date >= startDate) {
        arrr = sample[i];
      }
    }
  }

  const fromtodate = async () => {
    let response = await api.get('')
    console.log(response)
    if (response.data.success === 1) {
      let sortedArray = []
      let fromdate
      let todate
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]

        // console.log(a.assigned_user_date,"santosh dhage111111");
        if (
          a.assigned_user_date >= new Date('02-Mar-2024') &&
          a.assigned_user_date <= new Date('24-Feb-2024')
        ) {
          let options = {
            id: a.id,
            name: a.name,
            email: a.email,
            mobile_no: a.mobile_no,
            address1: a.address1,
            address2: a.address2,
            pincode: a.pincode,
            country: a.country,
            landmark: a.landmark,
            state: a.state,
            created_at: a.created_at,
            role: a.role,
            created_by: a.created_by,
            is_active: a.is_active === true ? 'Active' : 'Inactive',
          }
          sortedArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          sortedArray.push(options)
        }
      }
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
      key: 'Machine_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Customer ID',
      key: 'Customer_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },

    {
      label: 'Customer Created Date',
      key: 'Customer_Created_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '180px' },
    },

    {
      label: 'User ID',
      key: 'User_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'User Created Date',
      key: 'User_Created_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '180px' },
    },
    {
      label: 'Machine Assigned Date',
      key: 'Machine_Assigned_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '180px' },
    },
    {
      label: 'Machine Created Date',
      key: 'Machine_Created_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '180px' },
    },
    {
      label: 'Machine QR Assigned Date',
      key: 'Machine_QR_Assigned_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '190px' },
    },
    {
      label: 'QR/Coin',
      key: 'QR_coin',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Transaction Date',
      key: 'Transaction_Date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Capacity/Stock',
      key: 'Capacity_Stock',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Merchant ID',
      key: 'Merchant_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Merchant Name',
      key: 'Merchant_Name',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Store ID',
      key: 'Store_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'Store Name',
      key: 'Store_Name',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    {
      label: 'QR ID',
      key: 'QR_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
  ]
  const formatDate = (dateString) => {
    if (dateString == null) {
      return "          ";
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

  function formatDate1(date) {
    if (date == null) {
      return;
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
  const headers = [
                    {lable:"Machine Id",key:"Machine_Id"} ,
                    {lable:"Customer Id",key:"Customer_Id"} ,
                    {lable:"Customer Created Date",key:"Customer_Created_Date"} ,
                    {lable:"User d",key:"User_Id"} ,
                    {lable:"User Created Date",key:"User_Created_Date"} ,
                    {lable:"Machine Assigned Date",key:"Machine_Assigned_ Dated"} ,
                    {lable:"Machine Created Date",key:"Machine_Created_Date"} ,
                    {lable:"Machine QR Assigned Date",key:"Machine_QR_Assigned_Date"} ,
                    {lable:"QR coin",key:"QR_coin"} ,
                    {lable:"Transaction Date",key:"Transaction_Date"} ,
                    {lable:"Capacity Stock",key:"Capacity_Stock"} ,
                    {lable:"Merchant Id",key:"Merchant_Id"} ,
                    {lable:"Merchant Name",key:"Merchant_Name"} ,
                    {lable:"Store Id",key:"Store_Id"} ,
                    {lable:"Store Name",key:"Store_Name"} ,
                    {lable:"QR ID",key:"QR_ID"} 
                  ]

  const exportPDF = () => {
    const unit = 'pt'
    const size = 'A2' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape

    const marginLeft = 0
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = '          Report'
    const headers = [['Sr No', 'Machine Id', 'Customer Id', 'Customer Created Date', 'User Id', 'User Created Date', 'Machine Assigned Date', 'Machine Created Date', 'Machine QR Assigned Date', 'QR coin', 'Transaction Date', 'Capacity Stock', 'Merchant Id', 'Merchant Name', 'Store Id', 'Store Name', 'QR ID']]

    const data = notes?.map((elt, index) => [index + 1, elt.Machine_Id, elt.Customer_Id, elt.Customer_Created_Date, elt.User_Id, elt.User_Created_Date, elt.Machine_Assigned_Date, elt.Machine_Created_Date, elt.Machine_QR_Assigned_Date, elt.QR_coin, elt.Transaction_Date, elt.Capacity_Stock, elt.Merchant_Id, elt.Merchant_Name, elt.Store_Id, elt.Store_Name, elt.QR_Id])

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
    let response = await api.post('machine/api/read_machine_user_mapping_report_excel/', { from: startDate, to: endDate })

    //console.log("inside if part")
    //console.log(formatDate1(startDate) + " " + formatDate1(endDate))
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          Machine_Id: a.machine_id,
          Customer_Id: a.email,
          Customer_Created_Date: formatDate(a.assigned_customer_date),
          User_Id: a.user_email,
          User_Created_Date: formatDate(a.assigned_user_date),
          Machine_Assigned_Date: formatDate(a.assigned_customer_date),
          Machine_Created_Date: "Machine-created-date-Dummy",
          Machine_QR_Assigned_Date: ' machine-qr assigned date',
          QR_coin: 'QR/coin',
          Transaction_Date: 'a.assigned_user_date',
          Capacity_Stock: '25/25',
          Merchant_Id: 'maerchantid1',
          Merchant_Name: 'merchant namedummy',
          Store_Id: 'stored id',
          Store_Name: 'storenamedummy',
          QR_Id: 'qrdummy',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.push(options)
      }
      setNotes([])
      setNotes(data)
    } else if (response.data.success === 0) {
      console.log("inside else part")
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="mb-0" style={{ color: '#2C384A' }}>
              Machine Report
            </h3>
          </div>{' '}
        

          <div>
            <CButton
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
              headers={headers}
              filename="Vending_Machine_Report"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: "#2596be", border: 'none', }}
            >
              Export Excel
            </CSVLink>
          </div>

        </div>



        
            <div className="input-group mt-2 mb-2">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control"
              //customInput={ExampleCustomInput}
              />  &nbsp;
              <div className="input-group-addon"> to </div>  &nbsp;
              <DatePicker
                showIcon
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control"
              />
          &nbsp; &nbsp; &nbsp; <div> <CButton  onClick={exportReport_FromTOdate}>submit</CButton></div>

            </div>

        
        <div>
          <CRow xm={{ cols: 12 }}>
            <CCol xs={12}>
              <CCard className="mb-1 shadow bg-body rounded">
                <CCardBody>
                  <CSmartTable
                    activePage={1}
                    cleaner
                    clickableRows
                    columns={columns}
                    columnSorter
                    items={notes}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    pagination
                    scopedColumns={{
                      sr_no: (item, index) => <td>{index + 1}</td>,
                      created_at: (item) => <td>{formatDate(item.created_at)}</td>,
                    }}
                    //sorterValue={{ coloumns: 'created_at', state: 'asc' }}
                    itemsPerPageOptions={[10, 20, 50, 100]}
                    tableFilter
                    tableProps={{
                      color: 'success-color-secondary',
                      hover: true,
                      border: '1.5px solid #074',
                      responsive: true,
                    }}
                    // style={{overflow-x='auto'}}
                    //  tableFilterLabel={'Search : '}
                    //  tableFilterPlaceholder={'Enter String to Search'}
                    itemsPerPageLabel={'Rows per page:'}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}
export default Topic
