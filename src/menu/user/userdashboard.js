import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import AuthContext from 'src/context/AuthContext'
import { useLocation } from 'react-router-dom'
import 'src/views/dashboard/Dashboard.css'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow, CCardGroup, CCardTitle, CFormSelect, CFormFeedback,
} from '@coreui/react'
import { CChartLine, CChart } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilCheckCircle, cilMoney, cilShareAll, cilXCircle, cilCalendar,
} from '@coreui/icons'
import { cilHistory, cilReportSlash, cilSpeedometer, cilUserPlus,cilStorage,cilFile ,cibAddthis, cilGroup, cilLibrary,cilCreditCard} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import usericon from 'src/assets/Blog/User-removebg-preview.png'
import { CImage } from '@coreui/react-pro'
import shadows from '@mui/material/styles/shadows'
import 'src/views/dashboard/Dashboard.css'
const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const { user, authTokens, logoutUser } = useContext(AuthContext)
  const [userName, setUserName] = useState(authTokens?.user.organization)
  let api = useAxios()
  const location = useLocation()
  let [notes, setNotes] = useState()
  let [notes1, setNotes1] = useState(0)
  let [notes2, setNotes2] = useState(0)
  let [notes3, setNotes3] = useState(0)
  let [notes4, setNotes4] = useState(0)
  let [notes5, setNotes5] = useState(0)
  let [notes6, setNotes6] = useState(0)
  let [notes7, setNotes7] = useState(0)
  let [notes8, setNotes8] = useState()
  let [notes9, setNotes9] = useState()
  let [notes10, setNotes10] = useState()
  let [notes11, setNotes11] = useState()
  let [notes12, setNotes12] = useState()
  let [notes13, setNotes13] = useState(0)
  let [notes14, setNotes14] = useState(0)
  let [notes15, setNotes15] = useState(0)
  let [notes16, setNotes16] = useState(0)
  let [notes17, setNotes17] = useState(0)
  let [notes18, setNotes18] = useState(0)
  let [notes19, setNotes19] = useState(0)
  let [notes20, setNotes20] = useState(0)
  let [notes21, setNotes21] = useState(0)
  let [notes22, setNotes22] = useState(0)
  let [notes23, setNotes23] = useState(0)
  let [notes24, setNotes24] = useState(0)
  const [activeButton, setActiveButton] = useState(null)
  let [totalpt, setTotalpt] = useState(0)

  
  useEffect(() => {
    const getTopic = async () => {
      try {
        const userResponse = await api.get('api/users/' + authTokens.user.id + '/')
       
        setUserName(userResponse?.data?.result?.organization)
  
        const dashboardResponse = await api.get('machine/get_admin_user_dashboard/')
        const dashboardResponse2 = await api.get('machine/get_customer_user_dashboard_role_dashboard_qr_coin/')
        const dashboardResponse3 = await api.get('machine/users_and_customers_created_in_month/')
        const dashboardResponse4 = await api.get('machine/get_customer_user_dashboard_percentage_of_machines_with_qr/') 
  
        // console.log(dashboardResponse)
        if (dashboardResponse.data.success === 1 && dashboardResponse3.data.success === 1) {
          let data = []
          let data3 = []
          for (let i = 0; i < dashboardResponse.data.result.length; i++) {
            for (let j = 0; j < dashboardResponse3.data.result.length; j++) {
              let a = dashboardResponse.data.result[i]
              let b = dashboardResponse.data.result[j]
            }
          }
  
          //cards 
          setNotes(dashboardResponse.data.result.total_users)
          setNotes1(dashboardResponse.data.result.active_users)
          setNotes2(dashboardResponse.data.result.inactive_users)
          setNotes3(dashboardResponse.data.result.total_customers)
          setNotes4(dashboardResponse.data.result.active_customers)
          setNotes5(dashboardResponse.data.result.inactive_customers)
          setNotes6(dashboardResponse.data.result.total_machines)
          setNotes7(dashboardResponse.data.result.active_machines)
          setNotes8(dashboardResponse.data.result.inactive_machines)
  
          // mapping pie chart
          setNotes9(dashboardResponse2.data.result.coin_percentage)
          setNotes10(dashboardResponse2.data.result.qr_percentage)
  
          //coin & qrcode  pie charts
          setNotes11(dashboardResponse4.data.result.percentage_with_qr)
          setNotes12(dashboardResponse4.data.result.percentage_with_static_coin)
  
          // setNotes12(response3.data.result.users)
          const usersCounts = dashboardResponse3.data.user_month_counts
          const customersCounts = dashboardResponse3.data.customer_month_counts
  
          // setNotes12(response3.data.result.users)
          setNotes13(usersCounts['jan'])
          setNotes14(usersCounts['feb'])
          setNotes15(usersCounts['mar'])
          setNotes16(usersCounts['apr'])
          setNotes17(usersCounts['may'])
          setNotes18(usersCounts['jun'])
          setNotes19(customersCounts['jan'])
          setNotes20(customersCounts['feb'])
          setNotes21(customersCounts['mar'])
          setNotes22(customersCounts['apr'])
          setNotes23(customersCounts['may'])
          setNotes24(customersCounts['jun'])
        } else if (dashboardResponse.data.success === 0) {
          alert(dashboardResponse.data.result.message)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  
    getTopic()
  }, [authTokens])
  // console.log(notes12, "dfghj");
  // console.log(notes13, "dfghj");
  






  return (
    <>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-5 mt-3 text-center">
         {userName} Dashboard
              </h4>
            
            </CCol>
           
          </CRow>
         
      <CRow className='px-5 mb-5'>
  <CCol md={4} className='mb-4'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height: '100%' }} className='px-4 pt-4 h-100'>
      <h5 className='text-center'>Machine Details</h5>
      <div className="chart-container pt-3 pb-3 text-start px-1" style={{ maxWidth: '250px', width: '100%', color: '#2A409A' }}>
      <CRow className="fs-6 pb-3" >
                  <CCol sm={7}>Total Machine  </CCol>
                  <CCol sm={1}>:</CCol>
                  <CCol sm={3}>{notes6 ? notes6.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6 pb-3 " style={{}}>
                  <CCol sm={7}>Active Machine </CCol>
                  <CCol sm={1}>:</CCol>
                  <CCol sm={3}>{notes8 ? notes8.toString().padStart(2, '0'):'0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6 pb-3" style={{}}>
                  <CCol sm={7}>Inactive Machine</CCol>
                  <CCol sm={1}>:</CCol>
                  <CCol sm={3}>{notes7 ? notes7.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
      </div>
    </CCard>
  </CCol>
  <CCol md={4} className='mb-4'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height: '100%' }} className='px-4 pt-4 h-100'>
      <h5 className='text-center'>Machine Map to Qr Code</h5>
      <div className="chart-container" style={{ maxWidth: '250px', width: '100%' }}>
      <CChart
                    type="doughnut"
                    data={{
                      labels: ['QR Code', 'Coin'],
                      datasets: [{
                        backgroundColor: ['#429126', '#5983de'],
                        data: [notes11, notes12],
// data:['65','35']
                        
                      }],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          labels: {
                            color: getStyle('--cui-body-color'),
                          },
                        },
                      },
                    }}
                  />
      </div>
    </CCard>
  </CCol>
  <CCol md={4} className='mb-4'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height: '100%' }} className='px-4 pt-4 h-100'>
      <h5 className='text-center pb-5 pt-4'>Machine Payment Mode</h5>
      <div className="chart-container" style={{ maxWidth: '250px', width: '100%' }}>
      <CChart
  type="bar"
  data={{
    labels: [''],
    datasets: [
      {
        label: 'Coin', // Label for the first dataset
        backgroundColor: '#06c42c',
        data: [notes9],
      },
      {
        label: 'QR Code', // Label for the second dataset
        backgroundColor: '#fca503',
        data: [notes10],
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        }
      }
    },
    indexAxis: 'y', // Define the index axis as y for vertical bars
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  }}
  // style={{ width: '300px', height: '150px' }} // Set custom width and height
/>
      </div>
    </CCard>
  </CCol>
</CRow>

        </CCardBody>
      </CCard>
        
    </>
  )
}

export default Dashboard
