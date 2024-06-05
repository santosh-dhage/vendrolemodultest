import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import { CSmartTable, } from '@coreui/react-pro'
import {

    CRow,
    CCol,
    CImage, CCardImage,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import baseURl from 'src/utils/baseurl'
import { cilArrowBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function Topic() {
    const history = useNavigate()
    let api = useAxios()
    const { user, authTokens } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    let [notes2, setNotes2] = useState([])
    const [id, setid] = useState(false)
    let baseurl = baseURl()



    useEffect(() => {
        getTopic()
    }, [])

    let getTopic = async () => {
        let response = await api.get('/machine/api/get_machine_and_qrcode_for_user/')
        let response2 = await api.get('/machine/qrcode/')
        // console.log(response)
        if (response.data.success === 1 && response2.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                // console.log(a)
                let options = {
                    id: a.id,
                    machine_id: a.machine_id,
                    rqcode: a.rqcode,
                    created_at: a.created_at,
                    qr_code_img: a.qr_code_img,
                    product_type:a.product_type,
                    amount:a.amount,
                    model_no:a.model_no,
                    name:a.name,
                    payment_type:a.payment_type,
                    status: a.is_active === true ? 'Active' : 'Inactive',
                };
                data.push(options);
            }
            let data2 = [];
            for (let i = 0; i < response2.data.result.length; i++) {
                let a = response2.data.result[i];
                let options = {
                    label: a.qr_code_id,
                    value: a.id,
                };

                data2.push(options);
            }
            setNotes(data);
            setNotes2(data2);
            // console.log(notes)
            // console.log(notes2)
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
            // _style: { minWidth: '75px' },
        },
        {
            label: 'Machine ID',
            key: 'machine_id',
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '120px' },
            sorter: false,
        },
        {
            label: 'QR Code ID',
            key: 'rqcode',
            _props: { color: 'secondary', className: 'fw-semibold' },
            sorter: false,
            // _style: { minWidth: '130px' },
        },
        {
            label: 'Image',
            key: 'qr_code_img',
            _props: { color: 'secondary', className: 'fw-semibold' },
            sorter: false,
            // _style: { minWidth: '130px' },
        },
        {
            label: 'Product Type',
            key: 'product_type',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Amount',
            key: 'amount',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Model No',
            key: 'model_no',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Capacity',
            key: 'name',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Payment Type',
            key: 'payment_type',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Created Date',
            key: 'created_at',
            _props: { color: 'secondary', className: 'fw-semibold' },
            sorter: false,
            // _style: { minWidth: '130px' },
        },
        {
            key: 'Action',
            label: 'Action',
            // _style: { width: '9%' },
            filter: false,
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '80px' },
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
    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0" style={{ color: '#2C384A' }}>
                        Machine Master
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

                                        &nbsp;&nbsp;&nbsp;

                                        <Link to={'/Machineview/' + `${item.id}`}>
                                            <CImage src={e1} width={17} height={15} title="View Details" />
                                        </Link>
                                        &nbsp;
                                        &nbsp;

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
                                className: 'align-middle',
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



        </>
    )
}
export default Topic