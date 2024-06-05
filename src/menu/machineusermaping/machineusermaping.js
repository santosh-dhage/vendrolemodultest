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
  CFormSelect, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdown,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheck, cilTrash } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext';
function Topic() {
  const history = useNavigate()
  let api = useAxios()
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  let [notes3, setNotes3] = useState([])
  let [notes4, setNotes4] = useState([])
  let [notes11, setNotes11] = useState([])
  const { selectedColor } = useColor();
  let [userdata, setUserdata] = useState()
  const [id, setid] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validated, setValidated] = useState(false)
  const [status, setstatus] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  let [Customernamelist, setCustomernamelist] = useState([])

  const disableButton = () => {
    setIsDisabled(true)
  }


  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    let response1 = await api.get('/machine/api/get_unused_machine_map/');
    let response3 = await api.get('/machine/api/machine_user_mapping_by_admin_customer/');
    let response2 = await api.get('/api/get_customer_list/');
    if (response1.data.success === 1 && response2.data.success === 1) {

      let data = [{ label: '', value: '' },];
      for (let i = 0; i < response1.data.result.length; i++) {
        let a = response1.data.result[i];
        // if (a.is_active == 1) {
        let options = {
          value: a.id,
          label: a.machine_id,
        }
        data.push(options);
      }
      // }
      let data1 = [];
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i];
        if (a.is_active == 1) {
          let options = {
            value: a.id,
            label: a.email,
          };
          data1.push(options);
        }
      }
      //=====================================
      let data11 = [{ label: '', value: '' },];
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i];
        if (a.is_active == 1) {
          let options = {
            value: a.id,
            label: a.email,
          };
          data11.push(options);
        }
      }
      //=======================================
      let data3 = [];
      for (let i = 0; i < response3.data.result.length; i++) {
        let a = response3.data.result[i];
        // console.log(a)
        let options = {
          id: a.id,
          assigned_customer: a.assigned_customer?.email,
          assigned_customer_id: a.assigned_customer?.id,
          machine_id: a.machine?.machine_id,
          assigned_customer_date: a.assigned_customer_date,
          assigned_customer_name: a.assigned_customer_date,
        };
        data3.push(options);
      }
      setNotes(data);
      setNotes3(data1);
      setNotes2(data3);
      setNotes11(data11);


    } else if (response1.data.success === 0) {
      for (let i = 0; i < Object.values(response1.data.result).length; i++) {
        let a = Object.values(response1.data.result)[i]
        alert(a)
      }
    }
  }

  const get_training_data = async (item) => {
    let Customer_name = []
    notes3?.map((note) => {
      if (note.value == item.assigned_customer_id) {
        Customer_name.push(note)
      }
    });
    notes3?.map((note) => {
      if (note.value != item.assigned_customer_id) {
        Customer_name.push(note)
      }
    })
    setCustomernamelist(Customer_name)

    // let machine_name = []
    // notes?.map((note) => {
    //   if (note.value == item.machine) {
    //     machine_name.push(note)
    //   }
    // });
    // notes?.map((note) => {
    //   if (note.value != item.machine) {
    //     machine_name.push(note)
    //   }
    // })
    // setmachinenamelist(machine_name)
  };


  let getrefresh = () => {
    window.location.reload()
  }

  const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target);
      const currentDate = new Date().toISOString(); // Get current date in ISO format
      uploadData.append('assigned_customer_date', currentDate);
      let response = await api.post('/machine/machine-user-mapping/', uploadData);

      if (response.data.success === 1) {
        alert('Customer is mapped to Machine Id');
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
    } else {
      setValidated(true);
    }
  };


  const updateTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      let response = await api.patch(`/machine/machine-user-mapping/${id}/`, uploadData);
      if (response.data.success === 1) {
        alert('Customer mapped to Machine ID updated.')
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
    let response = await api.delete(`/api/users/${id}/`)
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
      label: 'Sr. No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    {
      label: 'Assigned Customer',
      key: 'assigned_customer',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '150px' },
      sorter: false,
    },
    {
      label: 'Assigned Machine Id',
      key: 'machine_id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '160px' },
      sorter: false,
    },
    {
      label: 'Assigned Date',
      key: 'assigned_customer_date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '120px' },
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
  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0" style={{ color: '#2C384A' }}>
            Machine Customer Mapping
          </h3>
          <CButton
            onClick={() => {
              setVisible1(!visible1)
            }}
            className="mt-2"
            style={{ backgroundColor: selectedColor, color: 'white' }}
            // style={{
            //   backgroundColor: '#2596be',
            //   color: 'white',
            //   border: 'none',
            //   fontWeight: '500',
            // }}
          >
            Map Machine
          </CButton>
        </div>

        <CRow>
          <CCol xs={12}>
            <CSmartTable
              activePage={1}
              clickableRows
              columns={columns}
              columnSorter
              items={notes2}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{
                Action: (item) => (
                  <td>
                    <Link to="#">
                      <CIcon
                        icon={cilPencil}
                        style={{ color: 'blue' }}
                        size="md"
                        title="Edit"
                        onClick={() => [setUserdata(item), setid(item.id),
                        get_training_data(item),
                        setVisible2(!visible2)]}
                      />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
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
                      {/* <CIcon icon={cilTrash} size="md" style={{ color: 'red' }} title="Delete" className='deleteicon'/> */}
                    </Link>{' '}
                    &nbsp;&nbsp;&nbsp;
                    <Link to={'/machinecustview/' + `${item.id}`}>
                      {/* <Link to={'/Paymentdetails/' + `${item.user_id}`}> */}
                      <CImage src={e1} width={17} height={15} title="View Details" />
                    </Link> &nbsp;&nbsp;&nbsp;
                  </td>
                ),

                sr_no: (item, index) => <td>{index + 1}</td>,
                assigned_customer_date: (item) => <td>{formatDate(item.assigned_customer_date)}</td>,
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
      <CModal size={'lg'}
        visible={visible1}
        onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Add Customer Mapping</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          style={{ margin: '10px' }}
          noValidate
          validated={validated}
          onSubmit={saveTopic}
        >
          <CModalBody>
            <CRow sm={12} className="">
              <CRow>
                <CCol sm={6}>
                  <CFormLabel htmlFor="validationDefault01">
                    Map Customer<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="assigned_customer" options={notes11} required />

                  <CFormFeedback invalid>Please select Customer</CFormFeedback>
                </CCol>
                <CCol sm={6}>

                  <CFormLabel htmlFor="validationDefault01">
                    Map Machine<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="machine" options={notes} required />

                  <CFormFeedback invalid>Please select Machine id</CFormFeedback>
                </CCol>
              </CRow>
            </CRow>

          </CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => [setVisible1(false), setValidated(false), setIsDisabled(false)]}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" style={{ backgroundColor: selectedColor, color: 'white' }}
              disabled={isDisabled}
            >
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
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
          style={{ backgroundColor:selectedColor, color: 'white' }}
        >
          <CModalTitle>Edit Customer Mapping</CModalTitle>
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
              <CRow>
                <CCol sm={6}>
                  <CFormLabel htmlFor="validationDefault01">
                    Map Customer<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="assigned_customer" options={Customernamelist}
                    defaultValue={userdata?.assigned_customer}
                    required />

                  <CFormFeedback invalid>Please select Customer</CFormFeedback>
                </CCol>
                <CCol sm={6}>

                  <CFormLabel htmlFor="validationDefault01">
                    Map Machine<span className="text-danger">*</span>
                  </CFormLabel>
                  {/* <CFormSelect name="machine" options={notes} 
                  required /> */}
                  <CFormInput
                    type="text"
                    id="name"
                    name="machine"
                    defaultValue={userdata?.machine_id}
                    required
                    disabled
                  />
                  <CFormFeedback invalid>Please select Machine id</CFormFeedback>
                </CCol>
              </CRow>
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
              {/* <CIcon icon={cilCheck} style={{ color: 'white' }} size="sm" /> */}
              &nbsp;Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}
export default Topic
