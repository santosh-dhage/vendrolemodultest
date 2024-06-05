import React, {useEffect, useState } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate, useParams } from 'react-router-dom'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import {
    CContainer,
    CButton,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,

} from '@coreui/react'

const CreateProject = () => {
    let { id } = useParams()
    const api = useAxios()
    const [currentuser, setcurrentuser] = useState(false)
    const { selectedColor } = useColor();
    const navigate = useNavigate();
    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let response4 = await api.get(`/get_customer_master/${id}/`)
        if (
            response4.data.success === 1
        ) {
            setcurrentuser(response4.data.result)
        } else if (
            response4.data.success === 0
        ) {
            for (let i = 0; i < Object.values(response4.data.result).length; i++) {
                let a = Object.values(response4.data.result)[i]
                alert(a)
            }
        }
    }

    const formatDate = (dateString = new Date()) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} - ${month} - ${year} ${hours}:${minutes}`;
    }
    
    // Example usage:
    const formattedDateTime = formatDate(); // Without providing a date, it will use the current date and time
    // console.log(formattedDateTime);
    return (
        <>
            <CContainer className="mb-1">
                <div className="d-flex justify-content-start">
                    <CButton
                        style={{ backgroundColor:selectedColor, }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </CButton>
                </div>
                <CCard className="mt-4">
                    <CCardHeader>
                        <b> Details</b>{' '}
                    </CCardHeader>
                    <CCardBody className="mx-2">
                        <CRow sm={12} className="mb-2">
                            <CCol sm={2}><b>Name</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.name}</CCol>
                            <CCol sm={2}><b>Email</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.email}</CCol>
                        </CRow>
                        <CRow sm={12} className="mb-2">
                            <CCol sm={2}><b>Role</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.role}</CCol>
                            <CCol sm={2}><b>Mobile No</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.mobile_no}</CCol>

                        </CRow>
                        <CRow sm={12} className="mb-2">
                            <CCol sm={2}><b>Address 1</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.address1}</CCol>
                            <CCol sm={2}><b>Address 2</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.address2}</CCol>
                        </CRow><CRow sm={12} className="mb-2">
                            <CCol sm={2}><b>Country</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.country}</CCol>
                            <CCol sm={2}><b>State</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.state}</CCol>
                        </CRow>
                        <CRow sm={12} className="mb-2">
                            <CCol sm={2}><b>Created By</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.created_by}</CCol>
                            <CCol sm={2}><b>Created Date</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{formatDate(currentuser?.created_at)}</CCol>
                        </CRow>
                        <CRow sm={12} className="mb-2">
                            {/* <CCol sm={2}><b>Landmark</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.landmark}</CCol> */}
                            <CCol sm={2}><b>Pincode</b></CCol>
                            <CCol sm={1}>:</CCol>
                            <CCol sm={3}>{currentuser?.pincode}</CCol>
                        </CRow>              
                    </CCardBody>
                </CCard>
            </CContainer>

        </>
    )
}

export default CreateProject
