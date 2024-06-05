

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
                     <h1 style={{color:'#2B3083'}}>PAYMENT & REFUND POLICY</h1>
                     </CCol>
                    </CRow>
                  {/* <CCardText> */}

                  <CRow className="mt-2 px-3">
                      <span >InDeft Products, hereinafter referred to as “INDEFT,” offers multiple payment methods to facilitate convenient transactions for our valued customers. Our accepted payment methods include:
                        <CRow>
                          <span className=' terms-content' >A) Online Payments:<br />

                            Debit/Credit Cards<br />
                            Net Banking<br />
                            UPI (Unified Payments Interface)<br />
                            Wallets<br />
                          </span>
                          <br />
                          <span className=' terms-content' > B)Offline Payments:<br />
                            Bank Transfer<br /></span>

                          <br />
                        </CRow>
                    

                      <ul>
                        <li>PAYMENT SECURITY:</li>
                        <span className=' terms-content mb-2' >
                        InDeft Technology Solutions Pvt. Ltd. prioritises the security of your payment information. Our online payment transactions are processed through secure and encrypted channels to ensure the confidentiality and integrity of your data.

                        </span><br />
                        <li>ORDER CONFIRMATION:</li>
                        <span className=' terms-content mb-2' >
                        Upon successful completion of your order, you will receive an email confirmation containing the details of your purchase. Please retain this confirmation for your records.

                        </span><br />
                        <li>REFUND POLICY</li>
                        <span className=' terms-content mb-2' >
                        InDeft Products is committed to providing quality products and services. If you are not satisfied with your purchase or encounter any issues, please refer to our refund policy below:
                    
                        </span><br />

                        <span >
                          <CRow>
                            <span className=' terms-content' >1)
                              PRODUCT QUALITY CONCERN:<br />
                              If you receive a product with manufacturing defects or quality issues, please contact our customer support team within 7 days of receiving the product.

                            </span>
                            <br />
                            <span className=' terms-content' > 2)CANCELLATION AND REFUND:<br />
                            Cancellation requests for certain orders must be made within 24 hours of placing the order. Refunds will be processed within 7-10 business days through the original payment method.

   </span>

                            <br />
                            <span className=' terms-content' >3) NON-DELIVERY OF PRODUCTS:<br />
                            If you do not receive your ordered products within the stipulated delivery period, please contact us immediately for resolution.



                            </span>
                            <br />
                            <span className=' terms-content' > 4) REFUND ELIGIBILITY:<br />
                            Refunds will only be processed for eligible cases, including product quality concerns, cancellations within the specified timeframe, and non- delivery issues.

                            </span>
                            <br />
                          </CRow>
                        </span>
                        <br />
                        <li> Note: </li>
                        <span className=' terms-content mb-2' >
                        As per RBI guidelines and Indian laws, certain products and services may not be eligible for refunds. Please contact our customer support for clarification on specific cases.

                        </span><br />
                        <li>CONTACT INFORMATION:</li>
                        <span className=' terms-content mb-2' >
                        For any queries or concerns related to payments and refunds, please reach out to our customer support team at accounts@ivendmsoft.com InDeft Products reserves the right to modify or update this Payment and Refund Policy. Any changes will be communicated through our website.

                        </span><br /><br /><br />

                        <span className=' terms-content mb-2' >
                        Thank you for choosing InDeft Technology Solutions Pvt.Ltd. Products!
                        </span><br />
                      </ul>
                      </span>
                      <br />
                    </CRow>
                  
    <Footer/> 

    </>
  );
};

export default Card;
