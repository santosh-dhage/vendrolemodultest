

import React, { useState, useEffect } from 'react';
import './disclaimer.css'; // Import CSS for card styles and animation
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CCardText,
  CCardTitle,
} from '@coreui/react'
import Footer from 'src/layout/footer'
import Header from 'src/layout/header'
const Card = () => {



  return (
    <>
   
    <Header/>
  
       
       <CRow className="justify-content-center text-center body flex-grow-1 px-3" style={{ overflowX: 'hidden' }}>
          <CCol>
                     <h1 style={{color:'#2B3083'}}>DISCLAIMER</h1>
                     </CCol>
                    </CRow>
                  {/* <CCardText> */}

                    <CRow className="mt-2 px-3">
                      <span >
                      InDeft Products, hereinafter referred to as “INDEFT,” welcomes you to our website. The following disclaimer outlines the terms and conditions governing your use of our site. By accessing and using this website, you agree to comply with the terms stated herein.
                       

                     <ul>
                         <li>ACCURACY OF INFORMATION:</li>
                         <span className=' terms-content mb-2' >
                         While we strive to provide accurate and up-to-date information, InDeft Technology Solutions Pvt. Ltd. makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.

                           </span><br />
                         <li>PRODUCT INFORMATION:</li>
                         <span className=' terms-content mb-2' >
                         Information about our products, including but not limited to descriptions, specifications, and pricing, is subject to change without notice. InDeft Technology Solutions Pvt. Ltd. reserves the right to modify or discontinue any product at any time without prior notice.
                          </span><br />
                         <li>EXTERNAL LINKS:</li>
                         <span className=' terms-content mb-2' >
                         Our website may contain links to external websites that are not maintained or controlled by InDeft Technology Solution Pvt. Ltd. We do not endorse the content of these external sites and are not responsible for their availability, accuracy, or any resulting consequences from your use of them.
                           </span><br />
                         <li>LIMITATION OF LIABILITY:</li>
                         <span className=' terms-content mb-2' >
InDeft Technology Solutions Pvt. Ltd. its affiliates, or any third parties mentioned on the website are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to or use of our website, products, or services.
  </span><br />
<li>NO PROFESSIONAL ADVICE:</li>
                         <span className=' terms-content mb-2' >
                         The information provided on this website is for general informational purposes only and does not constitute professional advice. You should not rely on the information on this website as an alternative to seeking professional advice.
                        </span><br />
                         <li>INDEMNIFICATION:</li>
                         <span className=' terms-content mb-2' >
                         By using this website, you agree to indemnify, defend, and hold harmless InDeft Technology Solutions Pvt. Ltd., its officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys’ fees, resulting from any violation of these terms.
   </span><br />
                        <li>MODIFICATIONS:
                        </li>
                        <span className=' terms-content mb-2' >
                       InDeft Technology Solutions Pvt. Ltd. reserves the right to revise, modify, or update these disclaimers at any time. Please check this page periodically for changes. Your continued use of the website following the posting of changes constitutes acceptance of those changes.

   </span><br />
                        <li>CONTACT INFORMATION:
                        </li>
                         <span className=' terms-content mb-2' >
                         If you have any questions or concerns regarding this disclaimer, please contact us at feedback@ivendmsoft.com By using our website, you acknowledge that you have read, understood, and agree to abide by the terms and conditions outlined in this disclaimer.
                          </span><br /><br /><br />
                        <span className=' terms-content mb-2' >
                        Thank you for visiting ivendmsoft.com
                        </span>
                      </ul>
                      </span>
                                               <br />
                    </CRow>
      
    <Footer/> 

    </>
  );
};

export default Card;
