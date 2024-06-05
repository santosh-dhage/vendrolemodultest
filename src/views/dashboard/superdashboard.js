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
  const [activeButton, setActiveButton] = useState(null)
  let [totalpt, setTotalpt] = useState(0)

  useEffect(() => {
    getTopic()
  }, [])


  let getTopic = async () => {
    try {
      let response = await api.get('saas/get_tenant_all/')
      if (response.data.success === 1) {
        let data = response.data.result;
        
        // Count the total number of tenants
        setNotes(data.length);
  
      } else if (response.data.success === 0) {
        alert(response.data.result.message);
      }
    } catch (error) {
      console.error("Error fetching tenant data:", error);
    }
  }
  
  // console.log(notes12, "dfghj");
  // console.log(notes13, "dfghj");
  return (
    <>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-3 mt-3 text-center">
                Vending Intelligence Dashboard
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
          <CRow md={12}  className='px-5  mb-5'>
       {/* <CCol md={4}> */}
         
           <CCol md={4} className='mb-4'>
            <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc',height:'100%' }} className='px-4 pt-4'>
                <h5 className='text-center mt-5'>Tenent Details</h5>
                <div className="chart-container pt-3 pb-3 text-start px-4" style={{ maxWidth: '250px', width: '100%',height:'100%',color:'#2A409A' }}> {/* Adding a container for positioning */}
                <CRow className="fs-6 " >
                  <CCol sm={10}>Total Tenent  </CCol>
                  <CCol sm={2} >{notes}</CCol>
                  </CRow>
                  {/* <CRow className="fs-6 " style={{}}>
                  <CCol sm={10}>Active Tenent  </CCol>
                  <CCol sm={2} >{notes1}</CCol>
                  </CRow>
                  <CRow className="fs-6  pb-4 mb-5" style={{}}>
                  <CCol sm={10}>Inactive Tenent  </CCol>
                  <CCol sm={2} >{notes2}</CCol>
                  </CRow> */}
               
                </div>
                </CCard>
              </CCol>
              <CCol md={4} className='mb-4'>
            <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} >
                <h5 className='text-center'>Plan Wise User </h5>
                <div className="chart-container" style={{ maxWidth: '250px', width: '100%' }}> {/* Adding a container for positioning */}
                  <CChart
                    type="doughnut"
                    data={{
                      labels: ['Basic', 'Premium'],
                      datasets: [{
                        backgroundColor: ['#429126', '#5983de'],
                        // data: [notes11, notes12],
data:['65','35']
                        
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
      </CRow>
              </CCardBody>
      </CCard>
        
    </>
  )
}

export default Dashboard
