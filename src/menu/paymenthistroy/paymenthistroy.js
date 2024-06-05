import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import { CSmartTable, CFormFeedback } from '@coreui/react-pro'
import {
    CButton,
    CFormInput,
    CForm,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CFormLabel,
    CImage,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import { cilPencil, cilCheck, cilTrash } from '@coreui/icons'
function Topic() {
    const history = useNavigate()
    let api = useAxios()
    const { user, authTokens } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    let [notes1, setNotes1] = useState([])
    let [userdata, setUserdata] = useState()
    const [id, setid] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [validated, setValidated] = useState(false)
    const [status, setstatus] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);
    const { selectedColor } = useColor();
    const disableButton = () => {
        setIsDisabled(true);
    };

    // useEffect(() => {
    //     get_reason()
    // }, [])

    // let get_reason = async () => {
    //     let response = await api.get()
    //     if (response.data.success === 1) {
    //         let data = []
    //         for (let i = 0; i < response.data.result.length; i++) {
    //             let a = response.data.result[i]
    //             data.push(a.machine_id)
    //         }
    //         setNotes1(data)
    //     } else if (response.data.success === 0) {
    //         for (let i = 0; i < Object.values(response.data.result).length; i++) {
    //             let a = Object.values(response.data.result)[i]
    //             alert(a)
    //         }
    //     }
    // }


    useEffect(() => {
        getTopic()
    }, [])

    let getTopic = async () => {
        let response = await api.get('/machine/machine-masters/')
        // console.log(response)
        if (response.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                // console.log(a)
                let options = {
                    id: a.id,
                    machine_id: a.machine_id,
                    created_at: a.created_at,
                    status: a.is_active === true ? 'Active' : 'Inactive',
                }
                data.push(options)
            }
            setNotes(data)
            // console.log(notes)
        } else if (response.data.success === 0) {
            for (let i = 0; i < Object.values(response.data.result).length; i++) {
                let a = Object.values(response.data.result)[i]
                alert(a)
            }
        }
    }


    let getrefresh = () => {
        window.location.reload()
    }
    const saveTopic = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === true) {
            if (notes1?.includes(e.target.machine_id.value)) {
                alert(`This machine_id already exists`);
            } else {
                const uploadData = new FormData(e.target)
                uploadData.append('status', true)
                let response = await api.post('api/mstatusbymachineid_for_payment/<str:M_Id>/', uploadData)
                if (response.data.success === 1) {
                    alert('machine_id is created');
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
        } else {
            setValidated(true);
        }
    };

    const updateTopic = async (e) => {
        const form = e.currentTarget
        e.preventDefault()
        if (form.checkValidity() === true) {
            const uploadData = new FormData(e.target)
            let response = await api.patch(`api/mstatusbymachineid_for_payment/<str:M_Id>/${id}/`, uploadData)
            if (response.data.success === 1) {
                // alert(response.data.message)
                alert('machine is updated')
                setValidated(false)
                setVisible2(false)
                getTopic()
            } else if (response.data.success === 0) {
                for (let i = 0; i < Object.values(response.data.result).length; i++) {
                    let a = Object.values(response.data.result)[i]
                    alert(a)
                }
            }
        }
        setValidated(true)
    }

    const deleteTopic = async (id) => {
        let response = await api.delete(`api/mstatusbymachineid_for_payment/${id}/`)
        if (response.data.success === 1) {
            // alert(response.data.message)
            alert('Country is deleted')
            getTopic()
        } else if (response.data.success === 0) {
            for (let i = 0; i < Object.values(response.data.result).length; i++) {
                let a = Object.values(response.data.result)[i]
                alert(a)
            }
        }
    }

    const columns = [
        {
            key: 'sr_no',
            label: 'Sr No.',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '60px' },
        },
        {
            label: 'Machine ID',
            key: 'machine_id',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Created Date & Time',
            key: 'created_at',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            key: 'Action',
            label: 'Action',
            // _style: { width: '9%' },
            filter: false,
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '60px' },
        },
    ]
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

    const handleSubmit = (e) => {
        e.preventDefault();
        saveTopic(e);
        if (e.currentTarget.checkValidity()) {
            // disableButton();
        }
    };
    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0" style={{ color: '#2C384A' }}>
                        Payment  History
                    </h3>

                </div>


                <CRow>
                    <CCol xs={12}>
                        <CSmartTable
                            activePage={1}
                            clickableRows
                            columns={columns}
                            columnSorter
                            items={notes}
                            itemsPerPageSelect
                            itemsPerPage={10}
                            pagination
                            scopedColumns={{
                                Action: (item) => (
                                    <td>
                                        <Link
                                            to="#"

                                            onClick={() => {
                                                const confirmBox = window.confirm(
                                                    'Are you sure, you want to delete this country?',
                                                )
                                                if (confirmBox === true) {
                                                    deleteTopic(item.id)
                                                }
                                            }}
                                        >
                                        </Link>{' '}

                                        <Link to={'/Paymentdetails/' + `${item.machine_id}`}>
                                            <CImage src={e1} width={17} height={15} title="View Details" />
                                        </Link>
                                    </td>
                                ),

                                sr_no: (item, index) => <td>{index + 1}</td>,
                                created_at: (item) => (
                                    <td>
                                        {formatDate(item.created_at)}
                                    </td>
                                ),

                            }}
                            itemsPerPageOptions={[10, 20, 50, 100]}
                            tableFilter
                            tableProps={{
                                color: 'success-color-secondary',
                                hover: true,
                                border: '1.5px solid #074',
                                responsive: true,
                               // bordered: true,
                               
                            }}
                            tableHeadProps={{
                                color: 'light',
                                align:'middle',
                                className: 'align-middle',
                              }}
                              tableBodyProps={{
                                align:'middle',
                                className: 'align-middle',
                              }}
                            tableFilterLabel={'Search : '}
                            tableFilterPlaceholder={'Enter String to Search'}
                            itemsPerPageLabel={'Rows per page:'}
                        />
                    </CCol>
                </CRow>
            </div>
            <CModal size={'lg'}
                visible={visible1}
                onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
                backdrop="static"
            >
                <CModalHeader
                    onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
                    style={{ backgroundColor: selectedColor, color: 'white' }}
                >
                    <CModalTitle>Machine Master</CModalTitle>
                </CModalHeader>
                <CForm
                    className="row g-3 needs-validation"
                    style={{ margin: '10px' }}
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}

                >
                    <CModalBody>
                        <CRow sm={12} className="">
                            <CCol sm={12}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Machine Id<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="machine_id"
                                    name="machine_id"
                                    // pattern="[A-Za-z\s]+"
                                    required
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter machine id</CFormFeedback>
                            </CCol>
                            {/* <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                created_at<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="date"
                                    id="created_at"
                                    name="created_at"
                                    required
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter your email</CFormFeedback>
                            </CCol> */}
                        </CRow>

                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            onClick={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
                            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
                        >
                            &nbsp;Close&nbsp;
                        </CButton>
                        <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white' }}
                            disabled={isDisabled}
                        >
                            <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
                            &nbsp; {isDisabled ? 'Submit' : 'Submit'}
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>

            <CModal size={'lg'}
                visible={visible2}
                onClose={() => [setVisible2(false), setValidated(false)]}
                backdrop="static"
            >
                <CModalHeader
                    onClose={() => [setVisible2(false), setValidated(false)]}
                    style={{ backgroundColor: selectedColor, color: 'white' }}
                >
                    <CModalTitle>Update Machine History</CModalTitle>
                </CModalHeader>
                <CForm
                    className="row g-3 needs-validation"
                    style={{ margin: '10px' }}
                    noValidate
                    validated={validated}
                    onSubmit={updateTopic}
                >
                    <CModalBody>
                        <CRow sm={12} className="">
                            <CCol sm={12}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Machine Id<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="machine_id"
                                    name="machine_id"
                                    required
                                    // pattern="[A-Za-z\s]+"
                                    defaultValue={userdata?.machine_id}
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter machine id</CFormFeedback>
                            </CCol>
                            {/* <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                created_at<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="date"
                                    id="created_at"
                                    defaultValue={userdata?.created_at}
                                    name="created_at"
                                    required
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter your email</CFormFeedback>
                            </CCol> */}
                        </CRow>

                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            onClick={() => [setVisible2(false), setValidated(false)]}
                            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
                        >
                            &nbsp;Close&nbsp;
                        </CButton>
                        <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white' }}>
                            <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
                            &nbsp;Submit
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}
export default Topic