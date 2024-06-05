import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CRow,
  CImage,
  CCol,
  CNavbar,
  CContainer,
  CNavbarToggler,
  CCollapse,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CCard,
} from '@coreui/react-pro'
import logo from 'src/assets/images/default_logo.png'
import logo1 from 'src/assets/images/Icon1 (1).png'
import logo2 from 'src/assets/images/Icon1 (2).png'
import logo3 from 'src/assets/images/Icon1 (3).png'
import logo4 from 'src/assets/images/Icon1 (4).png'
import logo5 from 'src/assets/images/green tick.png'
import img from 'src/assets/Blog/dashboard1.png'
import dashboard from 'src/assets/brand/dashboardimg.webp'
import Header from 'src/layout/header'
import Footer from 'src/layout/footer'
import './landing.css'
function Topic() {
  const [visible, setVisible] = useState(false)

  const handleStartNow = (PlanName) => {
    // Store the site name locally
    localStorage.setItem('selectedPlan', PlanName);
  };

  return (
    <>
      {/* <Header/> */}
      <div className="body flex-grow-1" style={{ overflowX: 'hidden' }}>
        <Header />

        <div style={{ backgroundColor: '#2B3083' }}>
          <CRow className="text-center">
            {/* <h5 style={{color:'white'}} className='mt-4 mb-2'> Product  of  InDeft  Solution Private Limited</h5> */}
            <marquee behavior="scroll" direction="left" style={{ color: 'white' }}>
              <h6 className="mt-4 mb-2">
                “Unleash the Potential of your vending machines for Digital Payments, A Product By
                InDeft Technology Solutions Pvt. Ltd.”
              </h6>
            </marquee>
          </CRow>
          <CRow className="Growyourmachinetab">
            <CCol
              md={6}
              className="mt-5 mb-5"
              style={{ animation: 'moveLeftToRight 1.5s forwards' }}
            >
              <CRow>
                <h1 className="Growyourtext">
                  Grow your
                  <br />
                  <span style={{ color: '#FAA21B' }}>
                    {' '}
                    vending machine
                    <br />
                    business
                  </span>
                  <br />
                  with cutting-edge software solutions.
                </h1>
                <h6 style={{ color: '#ffffff' }}>Optimize inventory. Increase profit</h6>
              </CRow>
              <CRow>
                <CCol className="mb-4 mt-4">
                  {/* <CButton color="primary IvendsoftforFree" size="lg" style={{ fontSize: '2.5rem', padding: '10px 20px',color:'#FFFFFF' }}>
                        <b style={{ fontSize: '18px' }}>Try for Free</b>
                    </CButton>
                    &nbsp; &nbsp; &nbsp; */}
                  <CButton
                    color="secondary seefeatures"
                    size="lg"
                    style={{ fontSize: '2.5rem', padding: '10px 20px' }}
                  >
                    <b style={{ fontSize: '18px' }}>See Features</b>
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
            <CCol md={6} className="mt-5 mb-5" style={{ overflow: 'hidden' }}>
              <img
                src={dashboard}
                className="img-fluid"
                alt="Vending Machine"
                style={{ borderRadius: '20px', width: '100%', height: '100%' }}
              />
            </CCol>
          </CRow>
        </div>

        <CRow className="mt-5 mb-5">
          <h3 className=" text-center" style={{ fontWeight: 'bold', color: 'black' }}>
            A better way to run and moniter your vending business
          </h3>
          <h5 className="text-center">
            Easily track inventory and purchases with affordable solution.
          </h5>
        </CRow>

        <CRow md={12} className="Growyourmachinetab mt-5 mb-5">
          <CRow>
            <CCol md="6">
              {/* First Card */}
              <div className=" ">
                <CRow>
                  <CCol md={2} className="mt-2">
                    <img src={logo1} height={50} alt="Logo" />
                  </CCol>
                  <CCol md={10} style={{ color: 'black' }} className="mt-2">
                    <h4>No need to download anything</h4>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={2}></CCol>
                  <CCol md={10} className="mb-5" style={{ textAlign: 'justify' }}>
                    <b>
                      iVendMSoft operates as a cloud-based software, ensuring uninterrupted service
                      with hourly server backups to prevent downtime or data loss. No downloads or
                      installations are required; simply register to initiate the use of our vending
                      machine software.
                    </b>
                  </CCol>
                </CRow>
              </div>
            </CCol>
            <CCol md="6">
              {/* second Card */}
              <div className=" ">
                <CRow>
                  <CCol md={2} className="mt-2">
                    <img src={logo2} height={50} alt="Logo" />
                  </CCol>
                  <CCol md={10} style={{ color: 'black' }} className="mt-2">
                    <h4>Take informed business decisions</h4>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={2}></CCol>
                  <CCol md={10} className="mb-5" style={{ textAlign: 'justify' }}>
                    <b>
                      Make well-informed business decisions by delving into the robust reporting
                      system offered by iVendMSoft. Assess the stability and overall health of your
                      vending machine business by analyzing crucial metrics such as sales tax,
                      commissions .{' '}
                    </b>
                  </CCol>
                </CRow>
              </div>
            </CCol>
          </CRow>
         
        </CRow>

        {/* <div className="px-5 mt-3 mb-3">
          <CRow>

            <CCol md={4} style={{ color: 'black' }} className="mt-2">
              <CCard style={{ boxShadow: '2px 2px 2px 2px #ccc', borderRadius: '20px' }} className='cardimage'>
                <CRow className='text-center' >
                  <h3 className='mt-3 mb-3'>Free </h3>
                  <span>User Limit -10</span><br /><br />
                  <span> Site Limit -one</span><br /><br />

                 
                </CRow>
                <CRow>

                <Link to="/register" onClick={() => handleStartNow('free')}>
                  <CButton color="primary IvendsoftforFree" size="lg" style={{ fontSize: '2.5rem', padding: '10px 20px', color: '#FFFFFF', width: '40%', margin: '30px 125px' }}>
                    <b style={{ fontSize: '18px' }}>Start Now</b>
                  </CButton>
                  </Link>
                </CRow>

              </CCard>
            </CCol>
            <CCol md={4} style={{ color: 'black' }} className="mt-2">
              <CCard style={{ boxShadow: '2px 2px 2px 2px #ccc', borderRadius: '20px' }} className='cardimage'>
                <CRow className='text-center' >
                  <h3 className='mt-3 mb-3'>Basic </h3>
                  <span>User Limit -10</span><br /><br />
                  <span> Site Limit -one</span><br /><br />
                  
                </CRow>
                <CRow>
                <Link to="/register" onClick={() => handleStartNow('basic')}>
                  <CButton color="primary IvendsoftforFree" size="lg" style={{ fontSize: '2.5rem', padding: '10px 20px', color: '#FFFFFF', width: '40%', margin: '30px 125px' }}>
                    <b style={{ fontSize: '18px' }}>Start Now</b>
                  </CButton>
                  </Link>
                </CRow>

              </CCard>
            </CCol>
            <CCol md={4} style={{ color: 'black' }} className="mt-2">
              <CCard style={{ boxShadow: '2px 2px 2px 2px #ccc', borderRadius: '20px' }} className='cardimage'>
                <CRow className='text-center' >
                  <h3 className='mt-3 mb-3'>Premium </h3>
                  <span>User Limit -10</span><br /><br />
                  <span> Site Limit -one</span><br /><br />
                
                </CRow>
                <CRow>
                <Link to="/register" onClick={() => handleStartNow('premium')}>
                  <CButton color="primary IvendsoftforFree" size="lg" style={{ fontSize: '2.5rem', padding: '10px 20px', color: '#FFFFFF', width: '40%', margin: '30px 125px' }}>
                    <b style={{ fontSize: '18px' }}>Start Now</b>
                  </CButton>
                  </Link>
                </CRow>

              </CCard>
            </CCol>
          </CRow>

        </div> */}
        <div style={{ backgroundColor: '#2B3083' }} className="mt-4 mb-4">
          <CRow className="Growyourmachinetab">
            <CCol className="" style={{ color: 'white', fontSize: '19px' }}>
              <div className="d-flex align-items-center borderleft">
                <div style={{ flex: '1', paddingRight: '20px', textAlign: 'justify' }}>
                  <b>
                    iVendMSoft stands out as one of the premier vending management software
                    solutions on the market. Its inventory management is seamlessly intuitive, while
                    its reporting capabilities are truly exceptional. With everything readily
                    accessible at your fingertips, including features like inventory management with
                    a convenient re-order function, location and machine management.
                  </b>

                  <h6 className="mt-5">Sachin Taori</h6>
                  <h6 className="" style={{ color: '#c3eaec' }}>
                    Co-Founder (MD), InDeft
                  </h6>
                </div>
                <div class="vl"></div>
                <div style={{ flex: '1', paddingLeft: '20px', textAlign: 'justify' }}>
                  <b>
                    iVendMSoft proves to be an excellent application suitable for vending operations
                    of diverse sizes. The software effortlessly adapts to the inclusion of
                    additional locations, equipment, and personnel, making it an ideal choice for
                    vending companies at different stages of growth over the years. The features
                    provided are user-friendly and not overwhelming, facilitating quick and easy
                    training for new personnel.
                  </b>
                  <h6 className="mt-5">Pravin Saini</h6>
                  <h6 className="" style={{ color: '#c3eaec' }}>
                    Head IoT Division, InDeft
                  </h6>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>
        {/* <CButton className='mb-5 mt-5 mx-5'>Try Ivendsoft Free</CButton> */}

        <CRow className="mt-5 mb-5">
          {/* <CRow md={12} className="Growyourmachinetab mt-2 mb-2 "> */}
          {/* <CRow className=""> */}
          <div className="justify-content-center ">
            <CRow className='text-center'>
              <h2

                style={{ fontSize: '40px', fontWeight: 'bold', color: 'black' }}
              >
                Vending Machine Software vs Spreadsheets
              </h2>
            </CRow>
            <CRow className='mt -2 text-center'>
              {/* <CCol md={11} style={{ color: 'black' }} className="mt-2"> */}
              <h2 style={{ color: 'black' }}>Time</h2>
              {/* </CCol> */}
            </CRow>
            <CRow className="px-4 text-center">
              <b className='Growyourmachinetab'>
                Opting for vending machine software saves significant time in data entry and
                analysis. Unlike relying on spreadsheets for sales, area details, and product
                inventory, the software streamlines these tasks. This frees up your time to
                focus on discovering new vending machine locations and researching innovative
                products.
              </b>
            </CRow>
          </div>
          {/* </CRow> */}
          {/* </CRow> */}
        </CRow>

        <Footer />
      </div>
    </>
  )
}
export default Topic
