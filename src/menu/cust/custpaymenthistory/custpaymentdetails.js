import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate, useParams } from 'react-router-dom'
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
import { cilPencil, cilCheck, cilTrash } from '@coreui/icons'
function Topic() {
    const history = useNavigate()
    let api = useAxios()
    let {id} = useParams()
    const { user, authTokens } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    let [notes1, setNotes1] = useState([])
    let [userdata, setUserdata] = useState()
    // const [id, setid] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [validated, setValidated] = useState(false)
    const [status, setstatus] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);

   

   

    useEffect(() => {
        getTopic()
    }, [])

    let getTopic = async () => {
        let response = await api.get(`/api/mstatusbymachineid/${id}/`)
        // console.log(response)
        if (response.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                // console.log(a)
                let options = {
                    id: a.id,
                    M_Id: a.M_Id,
                    Stock: a.Stock,                  
                    Capacity: a.Capacity,                  
                    Mode: a.Mode,                  
                    created_at: a.created_at,                  
                    // status: a.is_active === true ? 'Active' : 'Inactive',
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
    const navigate = useNavigate();
    
    const columns = [
        {
            key: 'sr_no',
            label: 'Sr No.',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '60px' },
        },
        {
            label: 'Machine ID',
            key: 'M_Id',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Capacity',
            key: 'Capacity',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        {
            label: 'Stock',
            key: 'Stock',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
        },
        // {
        //     label: 'Mode',
        //     key: 'Mode',
        //     _props: { color: 'secondary', className: 'fw-semibold' },
        // },
        {
            label: 'Created at',
            key: 'created_at',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            // _style: { minWidth: '100px' },
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
    return (
        <>
         <div className="mt-2 mb-1 d-flex justify-content-start">
                    <CButton
                    style={{backgroundColor:"#3c4b64",}}
                   // type="button"
                    //className="btn btn-default btn-sm "
                  //  style={{ backgroundColor: '#2A409A', color: 'white' }}
                        onClick={() => navigate(-1)} // navigate back one page
                    >
                    Back
                    </CButton>
                </div>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0" style={{ color: '#2C384A' }}>
                        Payment Details - {id}
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

                                sr_no: (item, index) => <td>{index + 1}</td>,
                                created_at: (item) => (
                                  <td>
                                   {formatDate(item.created_at)}
                                  </td>
                                ),
                                
                            }}
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
                                className: 'align-middle',
                              }}
                            // itemsPerPageOptions={[10, 20, 50, 100]}
                            // tableFilter
                            // tableProps={{
                            //     color: 'success-color-secondary',
                            //     hover: true,
                            //     border: '1.5px solid #074',
                            //     responsive: true,
                            // }}
                            // tableFilterLabel={'Search : '}
                            // tableFilterPlaceholder={'Enter String to Search'}
                            // itemsPerPageLabel={'Rows per page:'}
                            sorterValue={{ column: 'created_at', state: 'desc' }}
                        />
                    </CCol>
                </CRow>
            </div>
         
        </>
    )
}
export default Topic