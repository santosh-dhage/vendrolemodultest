// import React, { useState, useEffect ,useContext} from 'react'
// import './header.css'
// import Nav from 'react-bootstrap/Nav'
// import whitelogo from 'src/assets/images/logo1.png'
// import bluelogo from 'src/assets/images/logo.png'
// import logobgwhite from 'src/assets/images/MicrosoftTeams-image.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CRow, CImage,
    CCol, CNavbar, CContainer, CNavbarToggler, CCollapse, CNavbarBrand, CNavbarNav, CNavItem,
} from '@coreui/react-pro'
import {
    faHome,
    faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CIcon from '@coreui/icons-react'
import { cilHome } from '@coreui/icons'
import logo from 'src/assets/images/default_logo.png'
import 'src/views/pages/landingpage/landing.css'
// import baseurl from 'src/utils/baseurl'
const Header = () => {
    var urlurl=window.location.origin
    let urlArry=urlurl.split('.');

   

    console.log(window.location.origin+"check the url");

    const [visible, setVisible] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [checktenant, setChecktenant] = useState(false);
    useEffect(() => {
        checkdomain();
    }, []);

function checkdomain(){
    if(urlurl.includes("localhost"))
    {
        if(urlArry.length>=2)
        {
            setChecktenant(true);
        }
        else{
            setChecktenant(false);
        }
    }
    else 
    {
        if(urlArry.length>=3)
        {
            setChecktenant(true);
        }
        else{
            setChecktenant(false);
        }
    }

}
// console.log(window.location.origin+"   inside header page")
// if(window.location.origin.includes('.'))
// {
//     setChecktenant(true)
// }
    return (
        <>

            <CNavbar expand="lg" className="relative bg-white shadow" style={{ boxShadow: '0px 4px 4px rgba(165, 42, 42, 0.2)' }}>
                <CContainer fluid className="max-w-7xl mx-auto sm:px-6" id="navbaritem">
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse flex justify-between items-center md:justify-start md:space-x-8" visible={visible}>
                        <CNavbarBrand>
                            <img src={logo} alt="Logo" height={70} />
                        </CNavbarBrand>
                        <CNavbarNav className="ms-auto align-items-center" style={{ gap: '1rem' }}>
                            <CNavItem>
                                <Link to="/" className="nav-link px-2" style={{ textDecoration: 'none', color: '#2B3083', fontWeight: 'bold', fontSize: '18px' }}>
                                    <FontAwesomeIcon icon={faHome} size="medium" />
                                </Link>
                            </CNavItem>
                            <CNavItem>
                                {checktenant?(<Link to="/login" className="px-2" style={{ textDecoration: 'none', color: '#2B3083', fontWeight: 'bold', fontSize: '18px' }}>
                                    Login
                                </Link>):(
                                    <Link to="/logindomain" className="px-2" style={{ textDecoration: 'none', color: '#2B3083', fontWeight: 'bold', fontSize: '18px' }}>
                                    Login
                                </Link>
                                )}

                            </CNavItem>
                             {/* <CNavItem>
                                <Link to="/register">
                                    <CButton color="primary IvendsoftforFree" size="lg" style={{ fontSize: '2.5rem', padding: '10px 20px', color: '#FFFFFF' }}>
                                        <b style={{ fontSize: '18px' }}>Sign Up</b>
                                    </CButton>
                                </Link>
                            </CNavItem> */}
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>

        </>
    )
}
export default Header
