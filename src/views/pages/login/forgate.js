
import React, { useContext, useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CFormFeedback,
    CInputGroupText
} from '@coreui/react'
import AuthContext from 'src/context/AuthContext'
import useAxios from 'src/utils/newuseAxios'
import { useNavigate, useParams } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons'
import OTPInput from 'otp-input-react'
import './logine.css'
import { Link } from 'react-router-dom'

const Login = () => {
    let api = useAxios()
    const history = useNavigate()
    let { loginUser } = useContext(AuthContext)
    const [validated, setValidated] = useState(false)
    const [notes1, setNotes1] = useState([])
    let [otp1, setOtp1] = useState()
    const [isDisabled, setIsDisabled] = useState(false);
    let [notes3, setNotes3] = useState()
    let [otp2, setOtp2] = useState()
    const [submitButton, setSubmitButton] = useState('');
    const [otpError, setOtpError] = useState(false); // State to manage OTP error

    // const savedata = async (e) => {
    //     const form = e.currentTarget;
    //     e.preventDefault();
    //     console.log(notes1);

    //     if (submitButton === 'submit1') {
    //         if (form.checkValidity() === true) {
    //             const uploadData = new FormData(e.target);
    //             const response = await api.post('forgot-password/', uploadData);
    //             if (response.status === 200) {
    //                 alert('OTP sent on your personal email id.');
    //                 setOtp1(response.data.OTP);
    //                 setIsDisabled(true);
    //                 setSubmitButton(null);
    //             } else {
    //                 console.error('Error:', response);
    //             }
    //         }
    //     } else if (submitButton === 'submit2') {
    //         if (otp1 === otp2) {
    //             const uploadData = new FormData(e.target);
    //             uploadData.append('otp', otp2)
    //             const response = await api.post('/verify-otp/', uploadData);
    //             if (response.status === 200) {
    //                 alert('OTP Match.');
    //                 setSubmitButton(null);
    //                 setOtp1(response.data.OTP);
    //                 setIsDisabled(true);
    //                 history(`/resetpassword/${response.data?.uid}/${response.data?.token}`)
    //             } else {
    //                 setOtpError(true); // Setting OTP error to true
    //                 console.error('Error:', response);
    //             }
    //         } else {
    //             setOtpError(true); // Setting OTP error to true
    //         }
    //     }
    //     setValidated(true);
    // };


    const savedata = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        // console.log(notes1);

        if (submitButton === 'submit1') {
            if (form.checkValidity() === true) {
                const uploadData = new FormData(e.target);
                uploadData.append('otp', otp2)
                const response = await api.post('/forgot-password/', uploadData);
                if (response.data.success === 1) {
                    alert('OTP sent on your email id.');
                    setOtp1(response.data.OTP);
                    setIsDisabled(true);
                    setSubmitButton(null);
                } else {
                    alert(response.data.message)
                }
            }
        } else if (submitButton === 'submit2') {

            if (form.checkValidity() === true) {
                // If the form is valid, proceed with submitting data
                const uploadData = new FormData(e.target);
                uploadData.append('otp', otp2);
                const response = await api.post('/verify-otp/', uploadData);
                if (response.data.success === 1) {
                    // If OTP matches, perform necessary actions
                    alert('OTP Match.');
                    setOtp1(response.data.OTP);
                    setIsDisabled(true);
                    history(`/resetpassword/${response.data?.uid}/${response.data?.token}`);
                } else {
                    // If OTP does not match, handle accordingly
                    alert('OTP do not Match.');
                    setOtp2('');
                }
            }

        }

        setValidated(true);
    };



    const resendOTP = async () => {
        let response = await api.post('/forgot-password/', {
            email: notes3.email,
        })
        if (response.data.success === 1) {
            alert('OTP Sent')
            setOtp1(response.data.OTP)
            setNotes3(response.data.result)
        }
    }

    const handleVerifyEmail = async () => {
        setIsDisabled(false)
    }

    return (
        <div className="bg-white min-vh-100 d-flex flex-row align-items-center">

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup style={{ boxShadow: '2px 2px 2px 2px #ccc' }}>
                            <CCard className="p-5">
                                <CCardBody>

                                    <CForm
                                        className="row g-3 needs-validation"
                                        validated={validated}
                                        noValidate
                                        onSubmit={savedata}
                                    >
                                        <h5 className="mt-1 mb-2" style={{ fontFamily: 'Calibri-Bold', fontSize: '20px', textAlign: 'center', color: '#2596be' }}>
                                            Forgot password
                                        </h5>
                                        <p className="mt-3 mb-4" style={{ fontFamily: 'Calibri-Bold', fontSize: '20px', textAlign: 'center' }}>
                                            Enter your registered email id.
                                        </p>

                                        <CInputGroup className="mb-4" style={{ height: '39px' }}>
                                            <CInputGroupText>
                                                <CIcon icon={cilEnvelopeOpen} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                autoComplete="username"
                                                type="email"
                                                name="email"
                                                required
                                                pattern="^[^\s@]+@[^\s@]+[a-zA-Z]+(\.[a-zA-Z]+)+$"
                                            />
                                            <CFormFeedback invalid>
                                                Please enter your registered email id
                                            </CFormFeedback>
                                        </CInputGroup>


                                        {submitButton !== null && (
                                            <div className="d-grid pt-1 mb-4" style={{ height: '39px' }}>
                                                <CButton
                                                    style={{ backgroundColor: '#2596be' }}
                                                    className="px-3"
                                                    type="submit"
                                                    onClick={() => setSubmitButton('submit1')}
                                                >
                                                    <b>Send OTP</b>
                                                </CButton>
                                            </div>
                                        )}

                                        {isDisabled == true ?
                                            <>
                                                <p className="mt-3 mb-4" style={{ fontFamily: 'Calibri-Bold', fontSize: '20px', textAlign: 'center' }}>
                                                    Enter the four-digit OTP sent to you on email.
                                                </p>
                                                <CRow className="">
                                                    <OTPInput
                                                        className="otpbox d-flex justify-content-center"
                                                        value={otp2}
                                                        onChange={setOtp2}
                                                        autoFocus
                                                        OTPLength={4}
                                                        otpType="number"
                                                        disabled={false}
                                                    />
                                                </CRow>

                                                {otpError && (
                                                    <p style={{ color: 'red', textAlign: 'center' }}>Incorrect OTP, please try again</p>
                                                )}

                                                <div className="d-grid pt-1 mb-4" style={{ height: '39px' }}>
                                                    <CButton
                                                        style={{ backgroundColor: '#2596be' }}
                                                        className="px-3"
                                                        type="submit"
                                                        disabled={!isDisabled}
                                                        onClick={resendOTP}
                                                    >
                                                        <b>Resend OTP </b>
                                                    </CButton>
                                                </div>
                                                <CRow>
                                                    <CCol md={5} className="justify-content-sm-center"></CCol>
                                                    <CCol md={4} className="otp1">

                                                        <CButton
                                                            type="submit"
                                                            onClick={() => {
                                                                setSubmitButton('submit2');

                                                            }}
                                                            style={{
                                                                backgroundColor: '#2596be',
                                                                color: 'white',
                                                                border: 'none',
                                                                height: '36px',
                                                            }}
                                                            disabled={!isDisabled}
                                                        >
                                                            Submit
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                            </> : <></>}

                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
