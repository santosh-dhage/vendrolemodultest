

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
                     <h1 style={{color:'#2B3083'}}>TEARMS & CONDITIONS</h1>
                     </CCol>
                    </CRow>
                  {/* <CCardText> */}

                  <CRow className=''  >

<span className=' terms-content mt-2'   >
    This website is operated by InDeft Technology Solutions Pvt. Ltd. throughout the site, the terms “we,” “us,” and “our” refer to InDeft Technology Solutions Pvt. Ltd. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service,” “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including users who are browsers, vendors, customers, merchants, and contributors of content. Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered as an offer, acceptance is expressly limited to these Terms of Service. Any new features or tools added to the current site shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
    All Terms & Conditions outlined here pertain to site visitors.


<ul type='dot'>
    <li>

        ONLINE WEBSITE TERMS & CONDITIONS</li>
    <span className=' terms-content' >
        By agreeing to these Terms of Services, you represent that you are at least the age of majority in your state or province of residence or that you are the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use this site. You may not use our products or services for any illegal or unauthorized purpose, nor may you, in the use of the Service, violate any laws in your jurisdiction, including but not limited to copyright laws. You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.

    </span><br /><br />
    <li>
        GENERAL CONDITIONS</li>
    <span className=' terms-content' >
        We reserve the rights to refuse services to anyone for any reason at any time. You understand that your content (not including credit card information) may be transferred unencrypted and involve

        <ul type="a">
            <li>
                transmissions over various networks and
            </li>
            <li>
                changes to confirm and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services, use of the Services, or access to the Services or any contact on the website through which the services is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
            </li>
         
        </ul>
    </span><br /><br />
    <li>ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION</li>
    <span className=' terms-content' >
    We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliablity of the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
    </span><br /><br />

    <li>MODIFICATIONS TO THE SERVICE AND PRICES</li>
    <span className=' terms-content mb-2' >
    Prices for our products are subject to change without notice. We reserve the rights to modify or discontinue the Services (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Services.
    </span><br />

    <li>PRODUCTS OR SERVICES (if applicable)</li>
    <span className=' terms-content mb-2' >
    We reserve the rights but are not obligated to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We may exercise this rights on a case-by-case basis. We reserve the rights to limit the quantities of any products or services that we offer. All descriptions of products/services or product/service pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the rights to discontinue any product or services at any time. Any offer for any product or services made on this site is void where prohibited. We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations or that any errors in the Services will be corrected.

    </span><br />
    <li> ACCURACY OF BILLING AND ACCOUNT INFORMATION</li>
    <span className=' terms-content mb-2' >
    We reserve the rights to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the rights to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.


    </span><br />
    <li>OPTIONAL TOOLS</li>
    <span className=' terms-content mb-2' >
    We may provide you with the access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations, or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion, and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Services.

    </span><br />
    <li>THIRD-PARTY LINKS</li>
    <span className=' terms-content mb-2' >
    Certain content, products, and services available via our Service may include materials from third parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy, and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third parties. We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
        </span><br />
    <li>USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS</li>
    <span className=' terms-content mb-2' >
    If, at our request, you send certain specific submissions (for example, contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, “comments”), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate, and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation
    <ul type="1">
        <li>to maintain any comments in confidence;</li>
        <li>to pay compensation for any comments; or</li>
        <li>to respond to any comments. We may, but have no obligation to, monitor, edit, or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene, or otherwise objectionable or violate any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality, or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive, or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
</li>
    
        </ul>   
                                                 </span><br />
    <li>PERSONAL INFORMATION</li>
    <span className=' terms-content mb-2' >
    Your submission of personal information through the store is governed by our Privacy Policy.

</span><br />
    <li>ERRORS, INACCURACIES, AND OMISSIONS</li>
    <span className=' terms-content mb-2' >
    Occasionally, there may be information on our site or in the Services that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times, and availability. InDeft Technology Solutions Pvt. Ltd. reserves the right to correct any errors, inaccuracies, or omissions and to change or update information or cancel orders if any information on the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order). InDeft Technology Solutions Pvt. Ltd. undertakes no obligation to update, amend, or clarify information in the Services or on any related website, including, without limitation, pricing information, except as required by Indian law. No specified update or refresh date applied in the Services or on any related website should be taken to indicate that all information in the Services or on any related website has been modified or updated.

    </span><br />
    <li>PROHIBITED USES</li>
    <span className=' terms-content mb-2' >
    In addition to other prohibitions as set forth in the Terms of Services, you are prohibited from using the site or its content:

          <CRow>
            <span className=' terms-content' >  (a) for any unlawful purpose;</span>
            <br />
            <span className=' terms-content' >(b) to solicit others to perform or participate in any unlawful acts;   </span>
            <br />
            <span className=' terms-content' > (c) to violate any Indian laws, rules, or regulations; </span>
            <br />
            <span className=' terms-content' >(d) to infringe upon or violate InDeft Technology Solutions Pvt. Ltd. intellectual property rights or the intellectual property rights of others; 
              </span>
            <br />
            <span className=' terms-content' > (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; 
             </span>
            <br />
            <span className=' terms-content' >(f) to submit false or misleading information;   </span>
            <br />
            <span className=' terms-content' > (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services or of any related website, other websites, or the Internet;
             </span>
            <br />
            <span className=' terms-content' > (h) to collect or track the personal information of others;  </span>
            <br />
            <span className=' terms-content' > (i) to spam, phish, pharm, pretext, spider, crawl, or scrape;  </span>
            <br />
            <span className=' terms-content' > (j) for any obscene or immoral purpose; or  </span>
            <br />
            <span className=' terms-content' > (k) to interfere with or circumvent the security features of the Services or any related website, other websites, or the Internet. InDeft Technology Solutions Pvt. Ltd. reserves the right to terminate your use of the Services or any related website for violating any of the prohibited uses.
</span>
            <br />
        </CRow>
    </span><br />
    <li>DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</li>
    <span className=' terms-content mb-2' >
   InDeft Technology Solutions Pvt. Ltd. does not guarantee, represent, or warrant that your use of our Services will be uninterrupted, timely, secure, or error-free. InDeft Technology Solutions Pvt. Ltd. does not warrant that the results that may be obtained from the use of the Services will be accurate or reliable. You agree that from time to time, InDeft Technology Solutions Pvt. Ltd. may remove the Services for indefinite periods or cancel the services at any time, without notice to you. You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and services delivered to you through the Service are (except as expressly stated by InDeft Technology Solutions Pvt. Ltd.) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties, or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. In no case shall InDeft Technology Solutions Pvt. Ltd., our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based on contract, tort (including negligence), strict liability, or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the services, even if advised of their possibility.


</span><br />
    <li>INDEMNIFICATION</li>
    <span className=' terms-content mb-2' >
    You agree to indemnify, defend, and hold harmless InDeft Technology Solutions Pvt. Ltd. and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Services or the documents they incorporate by reference, or your violation of any Indian law or the rights of a third-party.

</span><br />
    <li>SEVERABILITY</li>
    <span className=' terms-content mb-2' >
    In the event that any provision of these Terms of Services is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by Indian law, and the unenforceable portion shall be deemed to be severed from these Terms of Services. Such determination shall not affect the validity and enforceability of any other remaining provisions.

</span><br />
    <li>TERMINATION</li>
    <span className=' terms-content mb-2' >
    The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Services are effective unless and until terminated by either you or InDeft Technology Solutions Pvt. Ltd. You may terminate these Terms of Services at any time by notifying us that you no longer wish to use our Services or when you cease using our site. If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Services, we also may terminate this agreement at any time without notice, and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).

</span><br />
    <li>ENTIRE AGREEMENT</li>
    <span className=' terms-content mb-2' >
    The failure of InDeft Technology Solutions Pvt. Ltd. to exercise or enforce any right or provision of these Terms of Services shall not constitute a waiver of such right or provision. These Terms of Services and any policies or operating rules posted by InDeft Technology Solutions Pvt. Ltd. on this site or in respect to the Servics constitute the entire agreement and understanding between you and InDeft Technology Solutions Pvt. Ltd. and govern your use of the Service, superseding any prior or contemporaneous agreements, communications, and proposals, whether oral or written, between you and InDeft Technology Solutions Pvt. Ltd. (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation of these Terms of Services shall not be construed against the drafting party.

</span><br />
  


    <li> GOVERNING LAW</li>
    <span className=' terms-content'  >
    These Terms of Services and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of Maharashtra and India.
</span><br />


    <li>CHANGES TO TERMS OF SERVICE</li>
    <span className=' terms-content' >
    These Terms of Services and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of Maharashtra and India.
      </span><br />
      </ul>
      </span><br /><br />

</CRow>
                 
    <Footer/> 

    </>
  );
};

export default Card;
