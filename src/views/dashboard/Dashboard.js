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
import './Dashboard.css'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import usericon from 'src/assets/Blog/User-removebg-preview.png'
import { CImage } from '@coreui/react-pro'
import shadows from '@mui/material/styles/shadows'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const { user, authTokens, logoutUser } = useContext(AuthContext)
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
  let [notes25, setNotes25] = useState(0)
  let [notes26, setNotes26] = useState()
  let [notes27, setNotes27] = useState()
  let [notes28, setNotes28] = useState(0)
  const [activeButton, setActiveButton] = useState(null)
  let [totalpt, setTotalpt] = useState(0)
  const [userName, setUserName] = useState()
  // const { organization, authTokens, logoutUser } = useContext(AuthContext)
  useEffect(() => {
    getTopic()
  }, [])
  let getTopic = async () => {
    try {
      let response = await api.get('machine/api/stats/');
      let response2 = await api.get('machine/api/machine_mapping_percentage/');
      let response3 = await api.get('machine/users_and_customers_created_in_month/');
      let response4 = await api.get('machine/api/percentage_of_machines_with_qr/');
      let response5 = await api.get('/get_qr_coin_view_for_dashboard/');
      let response6 = await api.get('saas/get_data/');
      if (response.data.success === 1 && response3.data.success === 1 && response5.data.success === 1) {
        // Your existing logic to set state variables
  
       
        setUserName(response6?.data?.result[0]?.organization_name);
        setNotes(response.data.result.total_users)
        setNotes1(response.data.result.active_users)
        setNotes2(response.data.result.inactive_users)
        setNotes3(response.data.result.total_customers)
        setNotes4(response.data.result.active_customers)
        setNotes5(response.data.result.inactive_customers)
        setNotes6(response.data.result.total_machines)
        setNotes7(response.data.result.active_machines)
        setNotes8(response.data.result.inactive_machines)
  
        // mapping pie chart
        setNotes9(response2.data.result.users_percentage)
        setNotes10(response2.data.result.customers_percentage)
        setNotes28(response2.data.result.unassigned_percentage)
        
        //coin & qrcode  bar charts
        setNotes11(response4.data.result.percentage_with_qr)
        setNotes12(response4.data.result.percentage_with_static_coin)
        setNotes25(response5.data.result.qr_percentage)
        setNotes26(response5.data.result.coin_percentage)
  
        // setNotes12(response3.data.result.users)
        const usersCounts = response3.data.user_month_counts
        const customersCounts = response3.data.customer_month_counts
  
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
      } else if (response.data.success === 0) {
        alert(response.data.result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // console.log(notes11, "dfghj");
  // console.log(notes12, "dfghj");
  // console.log(userName,'admin name ');
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-3 mt-3 text-center" style={{}}>
              {/* <CCol sm={12} className="usernamedetails text-center  mt-2"> */}
            
            {userName} Dashboard
              </h4>
              {/* <div className="small text-medium-emphasis">January - July 2021</div> */}
            </CCol>
            {/* <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol> */}
          </CRow>
         
      <CRow className='px-5 mb-2'>
  <CCol md={4} className='mb-2'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-4 pt-4 h-100'>
      <h5 className='text-center'>User Details</h5>
      <div className="chart-container pt-3 pb-3 text-start " style={{ maxWidth: '250px', width: '100%' }}>
      <CRow className="fs-6 " >
                  <CCol sm={7}>Total User  </CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4} >{notes}</CCol> */}
                  {/* <CCol sm={4}>{notes.toString().padStart(2, '0')}</CCol> */}
                  <CCol sm={3}>{notes ? notes.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6 " style={{}}>
                  <CCol sm={7}>Active User  </CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4} >{notes1}</CCol> */}
                  {/* <CCol sm={4}>{notes1.toString().padStart(2, '0')}</CCol> */}
                  <CCol sm={3}>{notes1 ? notes1.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6  pb-4" style={{}}>
                  <CCol sm={7}>Inactive User  </CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4}>{notes2 ? notes2.toString().padStart(2, '0') : ''}</CCol> */}
                  <CCol sm={3}>{notes2 ? notes2.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
              
                  </CRow>
      </div>
    </CCard>
  </CCol>
  <CCol md={4} className='mb-2'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-4 pt-4 h-100'>
      <h5 className='text-center'>Customer Details</h5>
      <div className="chart-container pt-3 pb-3 text-start" style={{ maxWidth: '250px', width: '100%' }}>
      <CRow className="fs-6 " >
                  <CCol sm={7}>Total Customer</CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4} >{notes3}</CCol> */}
                  {/* <CCol sm={4}>{notes3.toString().padStart(2, '0')}</CCol> */}
                  <CCol sm={3}>{notes3 ? notes3.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
              
                  </CRow>
                  <CRow className="fs-6 " style={{}}>
                  <CCol sm={7}>Active Customer</CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4} >{notes4}</CCol> */}
                  <CCol sm={3}>{notes4 ? notes4.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  {/* <CCol sm={4}>{notes4.toString().padStart(2, '0')}</CCol> */}
          
                  <CRow className="fs-6  pb-4" style={{}}>
                  <CCol sm={7}>Inactive Customer</CCol>
                  <CCol sm={1}>:</CCol>
                  {/* <CCol sm={4} >{notes5}</CCol> */}
                  {/* <CCol sm={4}>{notes5.toString().padStart(2, '0')}</CCol> */}
                  <CCol sm={3}>{notes5 ? notes5.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
      </div>
    </CCard>
  </CCol>
  <CCol md={4} className='mb-2'>
    <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-3 pt-4 h-100'>
      <h5 className='text-center'>Machine Details</h5>
      <div className="chart-container pt-3 pb-3 text-start" style={{ maxWidth: '250px', width: '100%' }}>
      <CRow className="fs-6 " >
                  <CCol sm={7}>Total Machine  </CCol>
                  <CCol sm={1}>:</CCol>
                  <CCol sm={3}>{notes6 ? notes6.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6 " style={{}}>
                  <CCol sm={7}>Active Machine </CCol>
                  <CCol sm={1}>:</CCol>
                  <CCol sm={3}>{notes7 ? notes7.toString().padStart(2, '0'):'0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
                  <CRow className="fs-6  pb-4" style={{}}>
                  <CCol sm={7}>Inactive Machine</CCol>
                  {/* <CCol>{notes8}</CCol> */}
                  {/* <CCol sm={4} >{notes8}</CCol>
                   */}
                   <CCol sm={1}>:</CCol>
 {/* <CCol sm={4}>{notes8.toString().padStart(2, '0')}</CCol> */}
 <CCol sm={3}>{notes8 ? notes8.toString().padStart(2, '0') : '0'.toString().padStart(2, '0')}</CCol>
                  </CRow>
      </div>
    </CCard>
  </CCol>
</CRow>
  
      
      <CRow md={12}  className='px-5  mb-2'>
       {/* <CCol md={4}> */}
         
           <CCol md={6} className='mb-4'>
            <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' , display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <h5 className='text-center'>Machine Map to QR Code </h5>
                <div className="chart-container" style={{ maxWidth: '285px', width: '100%' }}> {/* Adding a container for positioning */}
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
       {/* </CCol> */}
       <CCol md={6} className='mb-4'>
       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <div>
    <h5 className='text-center'>Machine Mapping </h5>
    <div className="chart-container" style={{ maxWidth: '285px', width: '100%' }}> 
      <CChart
        type="doughnut"
        data={{
          labels: ['User', 'Customer','None'],
          datasets: [{
            // backgroundColor: ['#429126', '#5983de'],
            backgroundColor: ['#429126', '#5983de','#fca503'],



            data: [notes9, notes10,notes28],
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
  </div>
</CCard>

              </CCol>
              {/* <CCol md={4} className='mb-4'>
       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc ' , justifyContent:'center', height:'100%' }} >
                <h5 className='text-center'> Stock Analysis </h5>
                <div className="chart-container mt-5" style={{ maxWidth: '250px', width: '100%'}}>
                <CChart
                  type="bar"
                  height={'242.667px'}
                  data={{
                    labels: ['100%', '75%', '50%', '25%', '0%'],
                    datasets: [
                      {
                        label: 'Stock Analysis',
                        backgroundColor: ['#06c42c', '#65c406', '#e8fc03', '#fca503', '#fc0f03'],
                        data: [40, 20, 12, 39, 10],
                      },
                    ],
                  }}
                  labels="months"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: getStyle('--cui-body-color'),
                        }
                      }
                    },
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
                />
                </div>
                </CCard>
              </CCol> */}

      </CRow>


      <CRow md={12}  className='px-5  mb-5'>
       {/* <CCol md={4}> */}
         
        
       <CCol md={6} className='mb-4'>
       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} >
                <h5 className='text-center'> Machine Payment Mode </h5>
                {/* <div className="chart-container" style={{ maxWidth: '250px', width: '100%' }}> Adding a container for positioning */}
                <CChart
  type="bar"
  data={{
    labels: [''],
    datasets: [
      {
        label:'Coin', // Label for the second dataset
        backgroundColor: '#06c42c',
        data:[notes26],
        // data:[notes27],
      },
      {
        label:'QR Code', // Label for the second dataset
        backgroundColor: '#fca503',
        data:[notes25],
        // data:[notes27],
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
                {/* </div> */}
                </CCard>
              </CCol>
              <CCol md={6} className='mb-4'>
       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc ' , justifyContent:'center', height:'100%' }}>
                <h5 className='text-center'> Monthly Added Customer & User</h5>
                {/* <div className="chart-container h-100 mt-5" style={{ maxWidth: '250px', width: '100%'  }}> Adding a container for positioning */}
                <CChart
                type="line"
                data={{
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [
                    {
                      label: "Added User",
                      backgroundColor: "rgba(220, 220, 220, 0.2)",
                      borderColor: "rgba(220, 220, 220, 1)",
                      pointBackgroundColor: "rgba(220, 220, 220, 1)",
                      pointBorderColor: "#fff",
                      // data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                      data:[notes13,notes14,notes15,notes16,notes17,notes18]
                    },
                    {
                      label: "Added Customer",
                      backgroundColor: "rgba(151, 187, 205, 0.2)",
                      borderColor: "rgba(151, 187, 205, 1)",
                      pointBackgroundColor: "rgba(151, 187, 205, 1)",
                      pointBorderColor: "#fff",
                      // data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                      // data:[notes14]
                      data:[notes19,notes20,notes21,notes22,notes23,notes24]
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
              />
                {/* </div> */}
                </CCard>
              </CCol>
      </CRow>
          {/* </div> */}
        </CCardBody>
      </CCard>
        
    </>
  )
}

export default Dashboard
