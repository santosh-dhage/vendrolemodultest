import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate, useParams } from 'react-router-dom'
import { CSmartTable, } from '@coreui/react-pro'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import {
    CRow,
    CCol,CButton
} from '@coreui/react-pro'
import AuthContext from 'src/context/AuthContext'
function Topic() {
    const history = useNavigate()
    let api = useAxios()
    let { id } = useParams()
    const { user, authTokens } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    const { selectedColor } = useColor();
    const navigate = useNavigate();
    useEffect(() => {
        getTopic()
    }, [])

    let getTopic = async () => {
        let response = await api.get(`api/get_user_list/${id}/`)
        // console.log(response)
        if (response.data.success === 1) {
            let data = []
            for (let i = 0; i < response.data.result.length; i++) {
                let a = response.data.result[i]
                // console.log(a)
                let options = {
                    id: a.id,
                    name: a.name,
                    email: a.email,
                    mobile_no: a.mobile_no,
                    address1: a.address1,
                    address2: a.address2,
                    pincode: a.pincode,
                    country: a.country,
                    landmark: a.landmark,
                    state: a.state,
                    created_at: a.created_at,
                    role: a.role,
                    created_by: a.created_by,
                    is_active: a.is_active === true ? 'Active' : 'Inactive',
                }
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

    const columns = [
        {
            key: 'sr_no',
            label: 'Sr No.',
            sorter: false,
            _props: { color: 'secondary', className: 'fw-semibold' },
        },
        {
            label: 'Name',
            key: 'name',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },
        {
            label: 'Email',
            key: 'email',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '100px' },
            sorter: false,
        },

        {
            label: 'Created Date',
            key: 'created_at',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '120px' },
            sorter: false,
        },

        {
            lable: 'Mobile No',
            key: 'mobile_no',
            _props: { color: 'secondary', className: 'fw-semibold' },
            _style: { minWidth: '80px' },
            sorter: false,
        },
        {
            label: 'Status',
            key: 'is_active',
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


    return (
        <> <div className="d-flex justify-content-start">
        <CButton
            style={{ backgroundColor: selectedColor, }}
            onClick={() => navigate(-1)}
        >
            Back
        </CButton>
    </div>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h3 className="mb-4" style={{ color: '#2C384A' }}>
                        Customer Users
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