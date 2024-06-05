import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/AuthContext';
import axios from 'axios';
import {
  CButton,
  CFormInput,
  CForm,CCard,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CFormLabel,
  CImage,
  CFormSelect,
  CFormTextarea,
  CFormFeedback,
} from '@coreui/react-pro';
import { cilPencil, cilPlus } from '@coreui/icons';
import Header from 'src/layout/header';
import Footer from 'src/layout/footer';
import Signupimg from 'src/assets/images/SignUP.png'
import useAxios from 'src/utils/newuseAxios'
const Complaint = () => {
  const history = useNavigate();
  const { user, authTokens } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [id, setid] = useState(false);
  let api = useAxios()
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getTopic();
  }, []);

  let getTopic = async () => {
    let response = await api.get('saas/saasapp/complaint/')
    console.log(response)
    if (response.data.success === 1) {
      let data = []
      for (let i = 0; i < response.data.result.length; i++) {
        let a = response.data.result[i]
        console.log(a)
        let options = {
          name: a.name,
          email: a.email,
          mobileno:a.mobileno,
          description: a.description,
          date: a.date,
                    };
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.push(options)
      }
      setNotes(data)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }


  const getrefresh = () => {
    window.location.reload();
  };

  const disableButton = () => {
    setIsDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    saveTopic(e);
    if (e.currentTarget.checkValidity()) {
      disableButton();
    }
  };

  const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
          const uploadData = new FormData(e.target);
          let response = await api.post('/saas/saasapp/complaint/', uploadData);
         
        if (response.data.success === 1) {
          alert('Complaint Submitted .');
          setValidated(false);
          setVisible1(false);
          getTopic();
          getrefresh();
        } else if (response.data.success === 0) {
          for (let i = 0; i < Object.values(response.data.result).length; i++) {
            let a = Object.values(response.data.result)[i];
            alert(a);
          }
        }
      }
   else {
      setValidated(true);
    }
  };
  
  return (
    <>
     <Header />

<CRow className='mx-5 mt-5 mb-5'>
  <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
    <CImage src={Signupimg} style={{ maxWidth: '100%', height: 'auto' }} />
  </CCol>
  <CCol xs={12} md={6}>
    <CCard className="h-auto" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
      <CForm
        className="needs-validation mt-4"
        noValidate
          validated={validated}
          onSubmit={handleSubmit}
        //   validated={validated}
        >
      
        <CRow className="justify-content-center mx-4">
          <b className='justify-content-center mx-4'>Complaint</b>

          <CRow sm={12} className="">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Name<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  required
                  pattern="[A-Za-z\s]+"
                //   defaultValue={userdata?.name}
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your name</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Email<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="email"
                  pattern="^(?!\s)[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                //   defaultValue={userdata?.email}
                  name="email"
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your email</CFormFeedback>
              </CCol>
            </CRow>
            <CRow sm={12} className="mb-1">
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Mobile No.<span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="tel"
                  id="mobileno"
                  name="mobileno"
                  required
                  maxLength={15}
                  minLength={8}
                  pattern="^(?!\s)[0-9\s]+$"
                  onKeyPress={(e) => {
                      const keyCode = e.which || e.keyCode
                      const key = String.fromCharCode(keyCode)
                      const regex = /^[0-9\s]*$/
                      if (!regex.test(key)) {
                          e.preventDefault()
                      }
                  }}
                                />
                <CFormFeedback invalid>Please enter your mobile no</CFormFeedback>
              </CCol>
              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Complaint<span className="text-danger">*</span>
                </CFormLabel>
                <CFormTextarea
                  type="text"
                  id="description"
                //   defaultValue={userdata?.address1}
                  name="description"
                  rows={1}
                  required
                  maxLength={50}
                />
                <CFormFeedback invalid>Please enter your complaint</CFormFeedback>
              </CCol>
            </CRow>
        </CRow>
     
        <div className="d-flex justify-content-center  mb-4">
  <CButton type="submit" style={{ backgroundColor: '#2596be', color: 'white' }} className='mx-5'>
    &nbsp;Submit
  </CButton>
</div>
      </CForm>
    </CCard>
  </CCol>
</CRow>


<Footer />


    </>
  );
};

export default Complaint;
