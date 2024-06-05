import React, { useState, useEffect } from 'react'
import { CForm, CFormInput, CCol, CFormCheck, CRow, CImage, CFooter } from '@coreui/react'

import logo from 'src/assets/images/logo12.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './footer.css'
import facebook from 'src/assets/brand/facebook.png'
import instagram from 'src/assets/brand/instagram1.png'
import linkedin from 'src/assets/brand/Linkedin.png'
import twitter from 'src/assets/brand/Twitter1.png'
import youtube from 'src/assets/brand/Youtube.png'
import {
  faEnvelope,
  faMobileScreen,
  faArrowUp,
  faSquareUp,
  faLocationDot,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import 'src/views/pages/landingpage/landing.css'


const Footer = () => {
  // let year = new Date().getFullYear()
  

  return (
    <>


<div className='mt-2 footerbackground' >
                    <CRow className='Growyourmachinetab'>
                        <CCol className='mt-3 mb-3' style={{ color: 'white', fontSize: '20px' }}>

                            <CRow className='mt-2'><h3>QUICK LINKS</h3></CRow>
                            <CRow className='mt-2'> <Link to="/login" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Login</Link></CRow>
                            <CRow className='mt-2'> <Link to="/contact" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Contact Us</Link></CRow>
                            <CRow className='mt-2'> <Link to="/complaints" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Complaints</Link></CRow>
                            {/* <CRow className='mt-2'><Link to="#" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Feedback</Link></CRow> */}
                            <CRow className='mt-2'>  <Link to="#" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Document</Link></CRow>

                        </CCol>

                        <CCol className='mt-3 mb-3' style={{ color: 'white', fontSize: '20px' }}>

                            <CRow className='mt-2'><h3>CONTACT US</h3></CRow>
                            <CRow className='mt-2'>
                                <span style={{ fontSize: '14px' }}>contact@ivendmsoft.com<br /><br/>
                                {/* <strong>Toll-Free:</strong> 1800 572 4595<br /> */}
                                     <strong>Contact Sales: </strong> +91 9167838298<br /></span></CRow>
                            <CRow className='mt-2'><span style={{ fontSize: '14px' }}><strong>Corporate Office </strong><br />Office No. 302<br />
                                4th Floor, M ARCH Center<br />
                                Beside Audi Showroom<br />
                                Sus Road , Pune – 411021</span>
                            </CRow>
                         

                        </CCol>
                        <CCol className='mt-3 mb-3' style={{ color: 'white', fontSize: '20px' }}>

                            <CRow className='mt-2'><h3>SUPPORTS</h3></CRow>
                            <CRow className='mt-2'> <Link to="/privacy" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Privacy Policy </Link></CRow>
                            <CRow className='mt-2'> <Link to="/terms" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Terms & Condition</Link></CRow>
                            <CRow className='mt-2'> <Link to="/disclaimer" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Disclaimer</Link></CRow>
                            <CRow className='mt-2'><Link to="/refund" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }}>Payment & Refund</Link></CRow>

                        </CCol>
                    </CRow>

                </div>
                {/* <div style={{ backgroundColor: '#142159' }}>
                    <CRow  >
                        <CCol className='mt-2 mb-1 text-center' style={{ color: 'white' }}>
                            <span className="me-1" style={{ color: 'white' }}>Designed & Developed by</span>
                            <Link to="https://www.indeftts.com" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }} target="_blank" rel="noopener noreferrer">
                                InDeft Technology Solutions Pvt. Ltd.
                            </Link>
                        </CCol>

                        <CCol sm={6} className='px-40  mt-1 mb-1'>
                            <CImage style={{ height: '25px' }}
                                src={facebook}
                                className="px-3 text-center"
                                onClick={() => window.open('https://www.facebook.com/profile.php?id=61552519505027&mibextid=ZbWKwL')}
                            ></CImage>
                            <CImage style={{ height: '25px' }}
                                src={linkedin}
                                className="px-3 text-center"
                                onClick={() => window.open('https://www.linkedin.com/company/indeftts/')}
                            ></CImage>
                            <CImage style={{ height: '25px' }}
                                src={instagram}
                                className="px-3 text-center"
                                onClick={() => window.open('https://instagram.com/indeftts_pvtltd?igshid=MTJrMXd3eG5sMnNrbA==')}
                            ></CImage>

                            <CImage style={{ height: '25px' }}
                                src={youtube}
                                className="px-3 text-center"
                                onClick={() =>
                                    window.open('#')
                                }
                            ></CImage>
                        </CCol>

                    </CRow>

                </div> */}
                <div style={{ backgroundColor: '#142159', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
    <span style={{ color: 'white' }}>
        <span className="me-1" style={{ color: 'white' }}>Designed & Developed by</span>
        <Link to="https://www.indeftts.com" style={{ textDecoration: 'none', fontSize: '15px', color: 'white' }} target="_blank" rel="noopener noreferrer">
            InDeft Technology Solutions Pvt. Ltd.
        </Link>
    </span>

    <div style={{ display: 'flex', alignItems: 'center' }}>
        <CImage
            style={{ height: '25px', cursor: 'pointer' }}
            src={facebook}
            className="px-3 text-center"
            onClick={() => window.open('https://www.facebook.com/profile.php?id=61552519505027&mibextid=ZbWKwL')}
        ></CImage>
        <CImage
            style={{ height: '25px', cursor: 'pointer' }}
            src={linkedin}
            className="px-3 text-center"
            onClick={() => window.open('https://www.linkedin.com/company/indeftts/')}
        ></CImage>
        <CImage
            style={{ height: '25px', cursor: 'pointer' }}
            src={instagram}
            className="px-3 text-center"
            onClick={() => window.open('https://instagram.com/indeftts_pvtltd?igshid=MTJrMXd3eG5sMnNrbA==')}
        ></CImage>
        <CImage
            style={{ height: '25px', cursor: 'pointer' }}
            src={youtube}
            className="px-3 text-center"
            onClick={() => window.open('#')}
        ></CImage>
    </div>
</div>

    </>
  )
}
export default Footer
