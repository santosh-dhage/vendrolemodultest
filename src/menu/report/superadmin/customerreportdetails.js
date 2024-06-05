import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate, useParams } from 'react-router-dom'
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
  CImage,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheck, cilTrash, cilArrowBottom } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext'
import baseurl from 'src/utils/baseurl'
function Topic() {
  const baseURL = baseurl()
  const history = useNavigate()
  let api = useAxios()
  let { count, name ,id} = useParams()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [userdata, setUserdata] = useState()
  const { selectedColor } = useColor()
  // const [id, setid] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validated, setValidated] = useState(false)
  const [status, setstatus] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  let [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  let [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate())))

  useEffect(() => {
     getTopic()
  }, [])

  let getTopic = async () => {
    console.log(id+"print here id santosh")
    // let response = await api.get(`/api/mstatusbymachineid/${name}/`)
    let response = await api.get('machine/get_customer_machine_report_detail_by_id/'+`${name}`+'/')
    console.log(response)
    if (response.data.success === 1) {
        let data = []
       
        for (let i = 0; i < response.data.result.length; i++) {
          let a = response.data.result[i]
          console.log(a)
        //   for(let j=0;j<a.machines_assigned.length;j++)
        //   {          
            let options = {
                M_Id:a.machine_id,
                created_at:a.customer_assigned_date,
          }
                 data.push(options);
        //   }

        
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
  const navigate = useNavigate()

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
      key: 'M_Id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
      sorter: false,
    },
    {
      label: ' Machine Assigned Date',
      key: 'created_at',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
      sorter: false,
    },
  ]
  const formatDate = (dateString = new Date()) => {
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
  function excel_url(){
    const url = `${baseURL}/machine/get_customer_machine_report_detail_by_name/${name}/?from_date=${formatDate1(startDate)}&to_date=${formatDate1(endDate)}`;
   // console.log(url)
  //  const url2=`/generate_and_download_excel_report_for_user/${formatDate1(startDate)}/${formatDate1(endDate)}`;
  //   let response = await api.get(url2);
  //   console.log(response)
  //   if (response.data.success === 0)
    return url;
  }
  // Example usage:
  const formattedDateTime = formatDate() // Without providing a date, it will use the current date and time
  console.log(formattedDateTime)

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
    // let response = await api.post('post_mis_report_for_user_pdf/', {
    //   from_date: formatDate1(twodate.split('=')[0]),
    //   to_date:formatDate1(twodate.split('=')[1]) ,

    // })
    // // try {
    //   if (response.data.success === 1) {
    //     let data = []
    //     for (let i = 0; i < response.data.result.length; i++) {
    //       let a = response.data.result[i]
    //       console.log(a)
    //       let options = {
    //         user_id: a.user_id,
    //         name: a.name,
    //         mail: a.email,
    //         mobile: a.user_mobile_no,
    //         machine_id: a.machine_id,
    //         model_no: a.model_no,
    //         location: a.location,
    //         status: a.machine_status,
    //         count: a.current_inventory_count,
    //         product_type: a.product,
    //         recent_refill_date: a.date,
    //         quantity_refilled: '',
    //         recent_cash_collection_date: '',
    //         recent_amount_collected: a.amount,
    //       }
    //       data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    //       data.push(options)
    //     }
    //     setNotes([])
    //     setNotes(data)
    //   } else if (response.data.success === 0) {
    //     // console.log('inside else part')
    //     // for (let i = 0; i < Object.values(response.data.result).length; i++) {
    //     //   let a = Object.values(response.data.result)[i]
    //     //  // alert(a)
    //     // }
    //     setNotes([])
    //     alert(response.data.message)
    //   }
    // // } catch (error) {
    //   alert(error)
    // }
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
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h3 className="mb-4" style={{ color: '#2C384A' }}>
            Customer Name : {name}
          </h3>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h3 className="mb-4" style={{ color: '#2C384A' }}>
            Total Machines : {count}
          </h3>
        </div>

        {/* <div className="input-group mt-2 mb-2">
          <div>
          <select id="datetodate1" onChange={exportReport_FromTOdate} style={{ width: '150px', height: '25px' }}> */}
            {/* <option> &nbsp; &nbsp;&nbsp;From - To &nbsp; &nbsp;&nbsp;</option> */}
            {/* <option disabled selected>please select the dates </option> */}
            {/* <option value={optionArr.today}> &nbsp; &nbsp;&nbsp; Today &nbsp; &nbsp;&nbsp; </option>
            <option value={optionArr.yesterday} selected>
              {' '}
              &nbsp; &nbsp;&nbsp; Yesterday &nbsp; &nbsp;&nbsp;{' '}
            </option>
            <option value={optionArr.week}> &nbsp; &nbsp;&nbsp;Weekly &nbsp; &nbsp;&nbsp; </option>
            <option value={optionArr.month}>
              {' '}
              &nbsp; &nbsp;&nbsp;Monthly &nbsp; &nbsp;&nbsp;{' '}
            </option>
            <option value={optionArr.quarterly}>
              {' '}
              &nbsp;&nbsp;&nbsp;Quarterly &nbsp; &nbsp;&nbsp;{' '}
            </option>
            <option value={optionArr.yearly}> &nbsp;&nbsp;&nbsp;Yearly &nbsp; &nbsp;&nbsp; </option>
          </select>
          </div>
          &nbsp; &nbsp; &nbsp;{' '}
          <div>
          <CButton
            // onClick={downloadExcel}
            href={excel_url()}
            type="button"
            className="btn btn-default btn-sm "
            style={{ backgroundColor: selectedColor, color: 'white' }}
          >
            Export Excel */}
            {/* <CSVLink data={notes} filename='Vending_Machine_Report' style={{textDecoration:"none",color:"white"}}>Export Excel</CSVLink> */}
            {/* <CIcon icon={cilArrowBottom} style={{ color: 'White' }} size="sm" />
          </CButton>
        </div>
        </div> */}


        <CRow>
          <CCol xs={12}>
            <CSmartTable
              activePage={1}
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
              // itemsPerPageOptions={[10, 20, 50, 100]}
              // tableFilter
              // tableProps={{
              //     color: 'success-color-secondary',
              //     hover: true,
              //     border: '1.5px solid #074',
              //     responsive: true,
              // }}
              // tableFilterLabel={'Search : '}
              // tableFilterPlaceholder={'Enter String to Search'}
              // itemsPerPageLabel={'Rows per page:'}
              sorterValue={{ column: 'created_at', state: 'desc' }}
            />
          </CCol>
        </CRow>
      </div>
    </>
  )
}
export default Topic
