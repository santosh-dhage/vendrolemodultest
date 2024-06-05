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
    CImage, CFormSelect, CCardImage
} from '@coreui/react-pro'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import baseURl from 'src/utils/baseurl'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheck, cilArrowBottom } from '@coreui/icons'
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
    const [visible3, setVisible3] = useState(false)
    const [validated, setValidated] = useState(false)
    const [status1, setstatus1] = useState([])
    const { selectedColor } = useColor();
    const [isDisabled, setIsDisabled] = useState(false);
    let baseurl = baseURl()
    const disableButton = () => {
        setIsDisabled(true);
    };
    const validateFile = (file) => {
        const allowedExtensions = ['png', 'jpg'];
        const extension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(extension);
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && !validateFile(file)) {
            alert('Please select a PNG or JPG file.');
            e.target.value = ''; // Clear the file input
        }
    }
    useEffect(() => {
        get_reason()
    }, [])

    let get_reason = async () => {
        let response = await api.get('/machine/qrcode/')
        if (response.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                data.push(a.qr_code_id)
            }
            setNotes1(data)
        } else if (response.data.success === 0) {
            for (let i = 0; i < Object.values(response.data.result).length; i++) {
                let a = Object.values(response.data.result)[i]
                alert(a)
            }
        }
    }

    useEffect(() => {
        getTopic()
    }, [])

    let getTopic = async () => {
        let response = await api.get('/machine/qrcode/')
        // console.log(response)
        if (response.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                // console.log(a)
                let options = {
                    id: a.id,
                    qr: a.qr,
                    qr_code_id: a.qr_code_id,
                    created_at: a.created_at,
                    created_by: a.created_by,
                    qr_store_name: a.qr_store_name,
                    qr_store_id:a.qr_store_id,
                    qr_code_img: a.qr,
                    is_active: a.is_active === true ? 'Active' : 'Inactive',
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
            if (notes1?.includes(e.target.qr_code_id.value)) {
                alert(`This QR code id  already exists`);
            } else {
                const uploadData = new FormData(e.target)
                uploadData.append('is_active', true)
                let response = await api.post('/machine/qrcode/', uploadData)
                if (response.data.success === 1) {
                    alert('QR code id  is created');
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
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === true) {
            const uploadData = new FormData(e.target);
            if (e.target.qr1.files[0]) {
                uploadData.append('qr', e.target.qr1.files[0])
            } else if (!userdata?.qr) {
                alert('Please upload the profile photo')
                return
            }

            let response = await api.patch(`/machine/qrcode/${id}/`, uploadData);
            if (response.data.success === 1) {
                alert('QR code id is updated');
                setValidated(false);
                setVisible2(false);
                getTopic();
            } else if (response.data.success === 0) {
                for (let i = 0; i < Object.values(response.data.result).length; i++) {
                    let a = Object.values(response.data.result)[i];
                    alert(a);
                }
            }
        }
        setValidated(true);
    };

    let getUserExcel = (item) => {
        const url = `${baseurl}` + '/' + item;
        const request = new Request(url, {
            method: 'GET',
            // headers: headers,
        });

        fetch(request)
            .then(response => {
                if (response.ok) {
                    // Convert the response to a blob and create a temporary URL to trigger the download
                    console.log(response)
                    return response.blob();
                } else {
                    console.error('Request failed:', response.statusText);
                }
            })
            .then(blob => {
                // Create a temporary URL for the blob
                const downloadUrl = window.URL.createObjectURL(blob);

                // Create an anchor element to initiate the download
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = downloadUrl;
                a.download = 'QR_code_Image_' + formatDate(new Date()) + '.png';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(downloadUrl);
            })
            .catch(error => {
                console.error('Network error:', error);
            });

    }


    const columns = [
        {
            key: 'sr_no',
            label: 'Sr No.',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            
        },
        {
            label: 'QR Code ID',
            key: 'qr_code_id',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Store ID',
            key: 'qr_store_id',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Store Name',
            key: 'qr_store_name',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },

        {
            label: 'Status',
            key: 'is_active',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Image',
            key: 'qr_code_img',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Created Date',
            key: 'created_at',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '130px' },
            sorter: false,
        },

        {
            key: 'Action',
            label: 'Action',
            // _style: { width: '9%' },
            filter: false,
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
        },
    ]
    const formatDate = (dateString) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        saveTopic(e);
        if (e.currentTarget.checkValidity()) {
            // disableButton();
        }
    };
    let active_options = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
    ]
    let get_status = (sta) => {
        // console.log(sta)
        let active = []
        for (let i = 0; i < active_options.length; i++) {
            let a = active_options[i]
            if (sta == a.label) {
                active.push(a)
            }
        }
        for (let i = 0; i < active_options.length; i++) {
            let a = active_options[i]
            if (sta != a.label) {
                active.push(a)
            }
        }
        setstatus1(active)
    }
    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0" style={{ color: '#2C384A' }}>
                        QR Code
                    </h3>
                    <CButton
                        onClick={() => {
                            setVisible1(!visible1);
                        }}
                        className="mt-2"
                        style={{ backgroundColor: selectedColor, color: 'white' ,border:'0px'}}
                        // style={{
                        //     backgroundColor: '#2596be',
                        //     color: 'white',
                        //     border: 'none',
                        //     fontWeight: '500',
                        // }}
                    >
                        Add QR Code
                    </CButton>
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
                                qr_code_img: (item) => (
                                    <td>
                                        <CCardImage
                                            className="smarttablecardimg"
                                            orientation="top"
                                            src={baseurl + item.qr_code_img}
                                        />
                                    </td>
                                ),
                                Action: (item) => (
                                    <td>
                                        <Link to="#">
                                            <CIcon

                                                icon={cilPencil}
                                                style={{ color: 'blue' }}
                                                size="md"
                                                title="Edit"
                                                onClick={() => [
                                                    setUserdata(item),
                                                    setid(item.id),
                                                    setVisible2(!visible2),
                                                    get_status(item.is_active),
                                                ]}
                                            />
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;

                                        <Link to="#" onClick={() => [
                                            setUserdata(item),
                                            setid(item.id),
                                            setVisible3(!visible3),
                                            get_status(item.is_active),
                                        ]}>
                                            <CImage src={e1} width={17} height={15} title="View QR Details" />
                                        </Link>
                                        <Link to="#" onClick={() => getUserExcel(item.qr_code_img)}>
                                            <CIcon
                                                icon={cilArrowBottom}
                                                style={{ color: 'blue' }}
                                                size="md"
                                                width="17"
                                                title="Download"
                                            />
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
                            }}
                            tableHeadProps={{
                                color: 'light',
                                align:'middle',
                               // className: 'align-middle',
                              }}
                              tableBodyProps={{
                                align:'middle',
                               // className: 'align-middle',
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
                    style={{ backgroundColor:selectedColor, color: 'white' }}
                >
                    <CModalTitle>QR Code</CModalTitle>
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
                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    QR Code Id<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_code_id"
                                    name="qr_code_id"
                                    required
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter QR Code id</CFormFeedback>
                            </CCol>
                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    QR store name<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_store_name"
                                    name="qr_store_name"
                                    required
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please create QR store name</CFormFeedback>
                            </CCol>

                        </CRow>
                        <CRow sm={12} className="">
                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    QR Store ID<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_store_id"
                                    name="qr_store_id"
                                    required
                                    // pattern="[A-Za-z\s]+"
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter QR store Id </CFormFeedback>
                            </CCol>

                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Upload QR Code<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="qr"
                                    name="qr"
                                    accept=".png, .jpg"
                                    pattern=".*\.(png|jpg)$"
                                    required
                                    onChange={handleChange}
                                />
                                <p> Image format must be .png or .jpg </p>
                                <CFormFeedback invalid>Please upload QR code</CFormFeedback>
                            </CCol>

                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            onClick={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
                            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC',border:'0px' }}
                        >
                            &nbsp;Close&nbsp;
                        </CButton>
                        <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white',border:'0px' }}
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
                    <CModalTitle>Update QR Code</CModalTitle>
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
                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    QR Code ID<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_code_id"
                                    name="qr_code_id"
                                    required
                                    // pattern="[A-Za-z\s]+"
                                    defaultValue={userdata?.qr_code_id}
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter QR code Id </CFormFeedback>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom01"> Status </CFormLabel>
                                <CFormSelect
                                    id="is_active"
                                    name="is_active"
                                    defaultValue={userdata?.is_active}
                                    required
                                    options={status1}
                                />
                                <CFormFeedback invalid>Please select status</CFormFeedback>
                            </CCol>
                            </CRow>

                            <CRow sm={12} className="">
                                <CCol sm={6}>
                                    <CFormLabel htmlFor="validationDefault01">
                                        QR store name<span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="qr_store_name"
                                        name="qr_store_name"
                                        required
                                        maxLength={50}
                                        defaultValue={userdata?.qr_store_name}

                                    />
                                    <CFormFeedback invalid>Please create  QR store name</CFormFeedback>
                                </CCol>
                                <CCol sm={6}>
                                    <CFormLabel htmlFor="validationDefault01">
                                        QR Store ID<span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="qr_store_id"
                                        name="qr_store_id"
                                        required
                                        // pattern="[A-Za-z\s]+"
                                        defaultValue={userdata?.qr_store_id}
                                        maxLength={50}
                                    />
                                    <CFormFeedback invalid>Please enter QR store Id </CFormFeedback>
                                </CCol>


                            </CRow>

                            <CRow md={12} className="mb-2">

                                <CCol md={6}>
                                    <CFormLabel htmlFor="validationDefault01">
                                        Upload QR Code <span className="text-danger">*</span>
                                        {/* {!userdata?.qr && <span className="text-danger">*</span>} */}
                                        {userdata?.qr ? '' : <span className="text-danger">*</span>}

                                    </CFormLabel>
                                    <CFormInput
                                        type="file"
                                        id="qr"
                                        size="sm"
                                        name="qr1"
                                        defaultValue=""
                                        accept=".png, .jpg"
                                        pattern=".*\.(png|jpg)$"
                                        required={!userdata?.qr}
                                        onChange={handleChange}
                                    />
                                    <p>Image format must be .png or .jpg</p>
                                    <CFormFeedback invalid>Please upload a QR Code</CFormFeedback>
                                </CCol>
                                {userdata?.qr && (
                                    <CCol md={6} className="mb-2">
                                        <CFormLabel htmlFor="validationDefault01">
                                            QR Code<span className="text-danger">*</span>
                                        </CFormLabel>
                                        <CCol sm={2}>
                                            <img src={baseurl + userdata.qr} width="200" height="120" alt="Current " />
                                        </CCol>
                                    </CCol>
                                )}
                            </CRow>


                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            onClick={() => [setVisible2(false), setValidated(false)]}
                            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC',border:'0px' }}
                        >
                            &nbsp;Close&nbsp;
                        </CButton>
                        <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white',border:'0px' }}>
                            <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" />
                            &nbsp;Submit
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
            {/* only Displaymodel window */}
            <CModal size={'lg'}
                visible={visible3}
                onClose={() => [setVisible3(false), setValidated(false)]}
                backdrop="static"
            >
                <CModalHeader
                    onClose={() => [setVisible3(false), setValidated(false)]}
                    style={{ backgroundColor: selectedColor, color: 'white' }}
                >
                    <CModalTitle>QR Code Details</CModalTitle>
                </CModalHeader>
                <CForm
                    className="row g-3 needs-validation"
                    style={{ margin: '10px' }}

                >
                    <CModalBody>
                        <CRow sm={12} className="">
                            <CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    QR Code ID<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_code_id"
                                    name="qr_code_id"
                                    required
                                    disabled
                                    defaultValue={userdata?.qr_code_id}
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter QR code Id </CFormFeedback>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom01"> Status </CFormLabel>
                                <CFormSelect
                                    id="is_active"
                                    name="is_active"
                                    defaultValue={userdata?.is_active}
                                    required
                                    options={status1}
                                    disabled
                                />
                                <CFormFeedback invalid>Please select status</CFormFeedback>
                            </CCol>


<CRow md={12} className='mb-2'>
<CCol sm={6}>
                                <CFormLabel htmlFor="validationDefault01">
                                    Store  Id<span className="text-danger">*</span>
                                </CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="qr_store_id"
                                    name="qr_store_id"
                                    required
                                    disabled
                                    defaultValue={userdata?.qr_store_id}
                                    maxLength={50}
                                />
                                <CFormFeedback invalid>Please enter Store Id </CFormFeedback>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom01"> Store Name </CFormLabel>
                                <CFormInput
                                    id="qr_store_name"
                                    name="qr_store_name"
                                    defaultValue={userdata?.qr_store_name}
                                    required
                                    options={status1}
                                    disabled
                                />
                                <CFormFeedback invalid>Please select store name</CFormFeedback>
                            </CCol>

</CRow>
                            <CRow md={12} className="mb-2">
                                {userdata?.qr && (
                                    <CCol md={6} className="mb-1">
                                        <CFormLabel htmlFor="validationDefault01">
                                            QR Code<span className="text-danger">*</span>
                                        </CFormLabel>
                                        <CCol sm={2}>
                                            <img src={baseurl + userdata.qr} width="200" height="120" alt="Current business card" />
                                        </CCol>
                                    </CCol>
                                )}
                            </CRow>

                        </CRow>

                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            onClick={() => [setVisible3(false), setValidated(false)]}
                            style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' ,border:'0px'}}
                        >
                            &nbsp;Close&nbsp;
                        </CButton>

                    </CModalFooter>
                </CForm>
            </CModal>

        </>
    )
}
export default Topic