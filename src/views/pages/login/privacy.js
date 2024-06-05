
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
 
       
       <CRow className="justify-content-center text-center body flex-grow-1 " style={{ overflowX: 'hidden' }}>
          <CCol>
                     <h1 style={{color:'#2B3083'}}>PRIVACY POLICY</h1>
                     </CCol>
                    </CRow>
                  {/* <CCardText> */}
                  <CRow className='mt-2 px-3'  >
                                            <span className='policy-content' >
                                                Cookie Collection Consent: The site uses technical cookies and, with the user’s consent, profiling cookies or other tracking tools to keep track of how you interact with it to offer you an improved and personalised user experience, according to the purposes better described in the privacy information. Closing the banner using the “Close” button entails the continuation of navigation with only technical cookies.”. Cookie policy InDeft Techonolgy Solutions Pvt. Ltd. hereinafter referred to as “INDEFT” values your privacy. This Privacy Policy outlines our approach to collecting and handling information from users of our website, ivendmsoft.com, and other websites owned and operated by InDeft Techonolgy Solutions Pvt. Ltd.


                                           

                                            <ul type='dot'>
                                                <li>
                                                    COLLECTION OF INFORMATION
                                                </li>
                                                <span className='policy-content' >
                                                    InDeft Techonolgy Solutions Pvt. Ltd. only requests personal information when it is genuinely necessary to provide a service to you. We collect this information through fair and lawful means, with your knowledge and consent. We will always inform you of the purpose for which we are collecting your data and how it will be used.

                                                </span><br /><br />
                                                <li>DATA RETENTION
                                                </li>
                                                <span className='policy-content' >
                                                    We retain collected information for only as long as necessary to provide you with the requested service. The data we store is protected using commercially acceptable methods to prevent loss, theft, unauthorized access, disclosure, copying, use, or modification.

                                                </span><br /><br />
                                                <li>SHARING OF INFORMATION
                                                </li>
                                                <span className='policy-content' >
                                                    We do not share personally identifying information publicly or with third parties, except when required by Indian law.


                                                </span><br /><br />
                                                <li>EXTERNAL LINKS
                                                </li>
                                                <span className='policy-content' >
                                                    Our website may include links to external sites not operated by InDeft Techonology solutions Pvt. Ltd. Please be aware that we have no control over the content and practices of these external sites. InDeft Techonolgy Solutions Pvt. Ltd. cannot accept responsibility or liability for their respective privacy policies.

                                                </span><br /><br />
                                                <li>USER CHOICE
                                                </li>
                                                <span className='policy-content' >
                                                    You have the freedom to decline our request for your personal information, with the understanding that we may be unable to provide some of the desired services.

                                                </span><br /><br />
                                                <li>ACCEPTANCE OF PRIVACY PRACTICES
                                                </li>
                                                <span className='policy-content' >
                                                    ACCEPTANCE OF PRIVACY PRACTICES
                                                    Your continued use of our website signifies your acceptance of our practices regarding privacy and personal information. If you have any questions about how we handle user data and personal information, please feel free to contact us.
                                                    COOKIE POLICY FOR ivendsoft.indeftts.net
                                                </span><br /><br />
                                                <span className='policy-content' >
                                                    This is the Cookie Policy for ivendmsoft.com , accessible from URL https://ivendmsoft.com
                                                </span><br /><br />
                                                <li>WHAT ARE COOKIES
                                                </li>
                                                <span className='policy-content' >
                                                    Like most professional websites, this site uses cookies, which are small files downloaded to your computer to enhance your user experience. This page describes the information cookies gather, how they are used, and why they are sometimes necessary. We will also explain how you can prevent these cookies from being stored, although doing so may impact certain features on the site.

                                                </span><br /><br />
                                                <li>HOW WE USE COOKIES
                                                </li>
                                                <span className='policy-content' >
                                                    We use cookies for various purposes, as detailed below. In most cases, there are no industry-standard options to disable cookies without impacting the functionality and features they add to the site. It is recommended to keep all cookies enabled unless you are certain you do not need them for a particular service.

                                                </span><br /><br />
                                                <li>DISABLING COOKIES
                                                </li>
                                                <span className='policy-content' >
                                                    You can prevent cookies from being set by adjusting your browser settings (consult your browser’s Help for instructions). However, please note that disabling cookies may affect the functionality of this site and others you visit. Disabling cookies often leads to the loss of certain site features and functionality, so it is advisable not to disable them.

                                                </span><br /><br />
                                                <li>COOKIES WE SET
                                                </li>
                                                <span className='policy-content' >
                                                    Account related cookies: These cookies are used for account management and general administration during the signup process. They are typically removed when you log out, but in some cases, they may persist to remember your site preferences when logged out.
                                                    Login related cookies: We use cookies when you are logged in to avoid repeated logins on each new page visit. These cookies are usually cleared when you log out to ensure access to restricted features only when logged in.
                                                    Email newsletters related cookies: For users who subscribe to our newsletter or email services, cookies may remember whether you are already registered and if certain notifications are valid for subscribed/unsubscribed users.
                                                    Orders processing related cookies: These cookies are crucial for e-commerce or payment facilities, ensuring that your order is remembered between pages to process it properly.

                                                    <ul type="square">
                                                        <li>Surveys related cookies:</li>
                                                        <span className='policy-content' >
                                                            Occasionally, we conduct user surveys and questionnaires to provide insights and improve user experience. These surveys may use cookies to remember participation or provide accurate results when switching pages.
                                                            Forms related cookies: When you submit data through forms, such as contact or comment forms, cookies may be set to remember your user details for future correspondence.

                                                        </span><br /><br />
                                                        <li>Site preferences cookies:</li>
                                                        <span className='policy-content' >
                                                            To offer a customized site experience based on user preferences, we use cookies to recall this information and deliver it when you interact with a page influenced by your preferences.
                                                        </span><br /><br />
                                                    </ul>
                                                </span><br /><br />
                                                <li>THIRD PARTY COOKIES
                                                </li>
                                                <span className='policy-content' >
                                                    In some instances, we use cookies from trusted third parties. Here are the details of third-party cookies you might encounter:

                                                    <ul type="square">
                                                        <li>Google Analytics:</li>
                                                        <span className='policy-content' >
                                                            We use Google Analytics, a trusted analytics solution, to understand how users interact with the site, the time spent, and pages visited to enhance user experience.

                                                        </span><br /><br />
                                                        <li>Third-Party Analytics: </li>
                                                        <span className='policy-content' >
                                                            These are employed to track and measure site usage, helping us produce engaging content and improve the site for users.

                                                        </span><br /><br />
                                                        <li>Optimizations and Testing:</li>
                                                        <span className='policy-content' >
                                                            During feature testing and site optimization, these cookies ensure a consistent user experience while helping us understand user preferences.
                                                        </span><br /><br />
                                                        <li>Business Predictions:</li>
                                                        <span className='policy-content' >
                                                            To monitor advertising and product costs, these cookies track data relevant to how many visitors make a purchase on the site.

                                                        </span><br /><br />
                                                        <li>Google AdSense:</li>
                                                        <span className='policy-content' >
                                                            To serve more relevant ads across the web and limit ad frequency, we use Google AdSense, which employs a DoubleClick cookie.

                                                        </span><br /><br />
                                                        <li>Behavioural Advertising:</li>
                                                        <span className='policy-content' >
                                                            To offer relevant ads based on user interests while protecting anonymity, we use cookies for behavioural advertising.

                                                        </span><br /><br />
                                                        <li>Social Media Cookies:</li>
                                                        <span className='policy-content' >
                                                            We incorporate social media buttons/plugins on the site, allowing you to connect with your social network. These may set cookies to enhance your profile on their platform or contribute to the data they hold, as outlined in their privacy policies.

                                                        </span><br /><br />

                                                    </ul>
                                                </span><br /><br />
                                                <li>USER RESPONSIBILITIES
                                                </li>
                                                <span className='policy-content' >
                                                    Users are responsible for making appropriate use of the content and information provided on the site. Users agree to:
                                                    <span className='policy-content' >
                                                    A)Refrain from engaging in illegal activities or actions contrary to good faith and      public order.

                                                    </span><br /><br />
                                                    <span className='policy-content' >
 B) Avoid spreading propaganda or content of a racist, xenophobic, or gambling nature, illegal pornography, terrorist claims, or any content against human rights.

                                                    </span><br /><br />

                                                    <span className='policy-content' >
 C) Not cause damage to the physical (hardware) and virtual (software) systems of InDeft Technology Solution Pvt. Ltd. its suppliers, or third parties, and not introduce or distribute computer viruses or any other software or hardware capable of causing damage to the aforementioned systems.

                                                    </span><br /><br />


                                                </span><br /><br />
                                                <li>COMPLIANCE WITH LAWS
                                                </li>
                                                <span className='policy-content' >
                                                Our cookie usage aligns with both global and Indian data protection laws, ensuring your privacy rights are respected. We are committed to transparency and responsible data handling practices.

                                                </span><br /><br />

                                                <li>UPDATES TO THIS STATEMENT
                                                </li>
                                                <span className='policy-content' >
                                                We may update this Cookie Collection Statement to reflect changes in our practices or for legal and regulatory reasons. We encourage you to revisit this statement regularly to stay informed about how we use cookies.
                                                
                                                </span><br /><br />

                                                <li>CONTACT US
                                                </li>
                                                <span className='policy-content' >
                                                For any questions or concerns about our use of cookies, please feel free to contact us on feedback@ivendmsoft.com
                                                </span><br /><br />

                                            </ul>
                                            </span><br /><br />
                                        </CRow>
                  
                 
    <Footer/> 

    </>
  );
};

export default Card;
