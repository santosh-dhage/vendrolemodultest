import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
//import { useNavigate } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import { CButton, CRow, CCol, CCard, CCardBody } from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import AuthContext from 'src/context/AuthContext'
// import { format, setDate } from 'date-fns'
// import useAxios from 'src/utils/newuseAxios'
//const api=UseAxios();
import CIcon from '@coreui/icons-react'
import {cilArrowBottom} from '@coreui/icons'
import { CSVDownload, CSVLink } from 'react-csv'
import { Col } from 'react-bootstrap'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './App.css';
// import DatePicker from 'react-datepicker'
import { CDateRangePicker } from '@coreui/react-pro'
import 'react-datepicker/dist/react-datepicker.css'
// import CTableDataCell from '@coreui/react/src/components/table/CTableDataCell'
function Topic() {
  let api = useAxios()

  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  const { selectedColor } = useColor();
  useEffect(() => {
    getTopic()
  }, [])

  let sample = [
    {
      Machine_Id: 'machinefirst',
      refil_stock: '5',
      after_refill: '95',
      befor_refill: '100',
      refill_count: '1',
      refill_date: '10-05-2024',
    },
    {
      Machine_Id: 'machineSecont',
      refil_stock: '6',
      after_refill: '94',
      befor_refill: '100',
      refill_count: '2',
      refill_date: '12-6-2024',
    },
    {
      Machine_Id: 'machineThird',
      refil_stock: '55',
      after_refill: '45',
      befor_refill: '100',
      refill_count: '3',
      refill_date: '12-04-2024',
    },
    {
      Machine_Id: 'machineLAST',
      refil_stock: '50',
      after_refill: '50',
      befor_refill: '100',
      refill_count: '5',
      refill_date: '02-04-2024',
    },
  ]

  let getTopic = async () => {
    //here the api is not correct please insert the correct API
    let response = await api.get('adminapp/api/get_generate_report_for_customer_record')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      // for (let i = 0; i < response.data.result.length; i++) {
      for (let i = 0; i < sample.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          machine_id: sample[i].Machine_Id,
          payment_date: sample[i].refill_date,
          coin_count: sample[i].befor_refill +'/'+(sample[i].befor_refill*5),
          qr_pay_count: sample[i].refill_count+'/'+(sample[i].refill_count*5),
          total_amount: (sample[i].befor_refill+sample[i].refill_count)+'/'+((sample[i].befor_refill+sample[i].refill_count)*5),
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
      _style: { minWidth: '75px' },
    },
    {
      label: 'Machine ID',
      key: 'machine_id',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    // {
    //   label: 'Payment Date',
    //   key: 'payment_date',
    //   sorter: false,
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '130px' },
    // },
    {
      label: 'Coin Payment Count / Amount',
      key: 'coin_count',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
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
      label: 'Total payemnts / Amount',
      key: 'total_amount',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    // {
    //   label: 'Refill Date',
    //   key: 'refill_date',
    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '130px' },
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
        'Payment Date',
        'Coin Payment Count / Amount',
        'QR Payment Count / Amount',
        'Total payemnts / Amount',
        'Total Tmount',
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
    let response = await api.post('adminapp/api/read_machine_user_mapping_report_excel/', {
      from: startDate,
      to: endDate,
    })

    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          customer_name: a.name,
          customer_Id: a.email,
          mobile_no: a.customer_moblie_no,
          machine_assigned_date: formatDate(a.assigned_customer_date),
          machine_quantity: '1000',
        }
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        data.push(options)
      }
      setNotes([])
      setNotes(data)
    } else if (response.data.success === 0) {
      // console.log('inside else part')
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
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
  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="mb-0" style={{ color: '#2C384A' }}>
              Machine Refill Report
            </h3>
          </div>{' '}
          <div>
          <div>
            <CButton
              onClick={() => exportPDF()}
              type="button"
              className="btn btn-default btn-sm "
              style={{ backgroundColor: '#2A409A', color: 'white' }}
            >
              Export pdf{' '}<CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" /> 
            </CButton>
            {' '}
            {/* <CSVLink
              data={notes}
              // headers={headers}
              filename="Vending_Machine_Report"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: '#2596be', border: 'none' }}
            >
              Export Excel
            </CSVLink> */}
            <CButton
                  type="button"
                  className="btn btn-default btn-sm "
                  style={{ backgroundColor: selectedColor, color: 'white' }}>
                  <CSVLink data={notes} filename='Vending_Machine_Report' style={{textDecoration:"none",color:"white"}}>Export Excel</CSVLink>
                  <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" /> 
            </CButton>
            
          </div>
          </div>
        </div>
        <div className="input-group mt-2 mb-2">
          <div className="row">
            <div className="col-lg-5">
              <CDateRangePicker ranges={customRanges} />
            </div>
          </div>
          {/* <CDateRangePicker ranges={customRanges} /> */}
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
          &nbsp; */}
          {/* <div className="input-group-addon"> to </div> &nbsp; */}
          {/* <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
          &nbsp; &nbsp; &nbsp;{' '} */}
          <div>
          <CDateRangePicker ranges={customRanges} />
          </div>
          <div>
            {' '}
            <CButton 
                      type="button"
                      className="btn btn-default btn-sm "
                      style={{ backgroundColor: '#2A409A', color: 'white' }}
                       onClick={exportReport_FromTOdate}>submit</CButton>
          </div>
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
                    // onRowClick={}
                    scopedColumns={{
                      sr_no: (item, index) => <td>{index + 1}</td>,
                      created_at: (item) => <td>{formatDate(item.created_at)}</td>,
                    }}
                    //sorterValue={{ coloumns: 'created_at', state: 'asc' }}
                    itemsPerPageOptions={[10, 20, 50, 100]}
                    tableFilter
                    // selectable
                    tableProps={{
                      color: 'success-color-secondary',
                      hover: true,
                      border: '1.5px solid #074',
                      responsive: true,
                    }}
                    tableBodyProps={{
                      className: 'align-middle',
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
