import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/newuseAxios'
import axios from 'axios';
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
    CImage, CFormSelect,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, } from '@coreui/icons'
function Topic() {
    const history = useNavigate()
    let api = useAxios()
    const { user, authTokens } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    let [notes1, setNotes1] = useState([])
    let [notes2, setNotes2] = useState([])
    let [userdata, setUserdata] = useState()
    const [id, setid] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [validated, setValidated] = useState(false)
    const [status1, setstatus1] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);

    const disableButton = () => {
        setIsDisabled(true);
    };
    useEffect(() => {
      getTopic();
    }, []);
  
    let getTopic = async () => {
      let response = await api.get('saas/api/get_feedback_tenant_wise/')
    //   console.log(response)
      if (response.data.success === 1) {
        let data = []
        for (let i = 0; i < response.data.result.length; i++) {
          let a = response.data.result[i]
        //   console.log(a)
          let options = {
            firstname:a.firstname,
            lastname:a.lastname,
                            email: a.email,
                            mobile_no:a.mobile_no,
                            feedback:a.feedback,
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
    
    let getrefresh = () => {
        window.location.reload()
    }
   

    const columns = [
        {
            key: 'sr_no',
            label: 'Sr. No.',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '60px' },
        },
        {
            label: 'First Name',
            key: 'firstname',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '130px' },
        },
        {
            label: 'Last Name',
            key: 'lastname',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '130px' },
        },
        {
            label: 'Email',
            key: 'email',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '130px' },
        },
        {
            lable: 'Mobile No',
            key: 'mobile_no',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '80px' },
        },
        // {
        //     label: 'Country',
        //     key: 'country',
        //     sorter: false,
        //     _props: { color: 'secondary', className: 'fw-semibold' },
        //     _style: { minWidth: '60px' },
        // },
        // {
        //     label: 'Pincode',
        //     key: 'pincode',
        //     sorter: false,
        //     _props: { color: 'secondary', className: 'fw-semibold' },
        //     _style: { minWidth: '60px' },
        // },
      
        {
            label: 'Feedback',
            key: 'feedback',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '60px' },
        },
        {
            label: ' Feedback Date',
            key: 'created_at',
            sorter: false,
            SorterValue: 'asc',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '130px' },
        },
        // {
        //     key: 'Action',
        //     label: 'Action',
        //     // _style: { width: '9%' },
        //     filter: false,
        //     sorter: false,
        //     _props: { color: 'secondary', className: 'fw-semibold' },
        //     _style: { minWidth: '90px' },
        // },
    ]


    // }
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
        // saveTopic(e);
        if (e.currentTarget.checkValidity()) {
            disableButton();
        }
    };
    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0" style={{ color: '#2C384A' }}>
                     Client Feedback Details
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
                            sorterValue={{ coloumns: 'created_at', state: 'asc' }}
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
                                className: 'align-middle',
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