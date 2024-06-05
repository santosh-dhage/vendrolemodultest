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
  let [notes11, setNotes11] = useState([])
  let [notes12,setNotes12]=useState([]);
  const { selectedColor } = useColor();
  let [userdata, setUserdata] = useState()
  const [id, setid] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  let [usernamelist, setusernamelist] = useState([])
  let [machinenamelist, setmachinenamelist] = useState([])

  const disableButton = () => {
    setIsDisabled(true)
  }



  useEffect(() => {
    getTopic()
  }, [])
  let getTopic = async () => {
    let response1 = await api.get('/machine/api/get_unused_machine_map/');
    let response3 = await api.get('/machine/api/machine_user_mapping_by_admin_user/');
    let response2 = await api.get('/api/get_user_list/');
    if (response1.data.success === 1 && response2.data.success === 1) {

      let data = [];
      for (let i = 0; i < response1.data.result.length; i++) {
        let a = response1.data.result[i];
        // if (a.status == 1) {    
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
//======================================
let data12 = [{value:'',label:''},];
for (let i = 0; i < response1.data.result.length; i++) {
  let a = response1.data.result[i];
  // if (a.status == 1) {    
  let options = {
    value: a.id,
    label: a.machine_id,
  }
  data12.push(options);
}
let data11 = [{value:'',label:''},];
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
//======================================
      let data3 = [];
      for (let i = 0; i < response3.data.result.length; i++) {
        let a = response3.data.result[i];
        // console.log(a)
        let options = {
          id: a.id,
          assigned_user: a?.assigned_user?.email,
          assigned_user_id: a?.assigned_user?.id,
          machine_id_id: a?.machine_id?.id,
          machine_id: a?.machine?.machine_id,
          assigned_user_date: a?.assigned_user_date
        };
        data3.push(options);
      }
      setNotes(data);
      setNotes3(data1);
      setNotes2(data3);
      setNotes11(data11)
      setNotes12(data12)
    } else if (response1.data.success === 0) {
      for (let i = 0; i < Object.values(response1.data.result).length; i++) {
        let a = Object.values(response1.data.result)[i]
        alert(a)
      }
    }
  }

  let getrefresh = () => {
    window.location.reload()
  }

  const get_training_data = async (item) => {
    let user_name = []
    notes3?.map((note) => {
      if (note.value == item.assigned_user_id) {
        user_name.push(note)
      }
    });
    notes3?.map((note) => {
      if (note.value != item.assigned_user_id) {
        user_name.push(note)
      }
    })
    setusernamelist(user_name)

    let machine_name = []
    notes?.map((note) => {
      if (note.value == item.machine_id_id) {
        machine_name.push(note)
      }
    });
    notes?.map((note) => {
      if (note.value != item.machine_id_id) {
        machine_name.push(note)
      }
    })
    setmachinenamelist(machine_name)
  };


  const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target);
      const currentDate = new Date().toISOString(); // Get current date in ISO format
      uploadData.append('assigned_user_date', currentDate);
      let response = await api.post('/machine/machine-user-mapping/', uploadData);

      if (response.data.success === 1) {
        alert('User is mapped to Machine Id');
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
        alert('Member is updated')
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



  const columns = [
    {
      key: 'sr_no',
      label: 'Sr. No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    {
      label: 'Assigned User',
      key: 'assigned_user',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '150px' },
      sorter: false,
    },
    {
      label: 'Assigned Machine ID',
      key: 'machine_id',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '160px' },
      sorter: false,
    },
    {
      label: 'Assigned Date',
      key: 'assigned_user_date',
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

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0" style={{ color: '#2C384A' }}>
            Machine User Mapping
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
                    <Link to={'/machineuserview/' + `${item.id}`}>
                      <CImage src={e1} width={17} height={15} title="View Details" />
                    </Link> &nbsp;&nbsp;&nbsp;
                  </td>
                ),

                sr_no: (item, index) => <td>{index + 1}</td>,
                assigned_user_date: (item) => <td>{formatDate(item.assigned_user_date)}</td>,
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
          <CModalTitle>Add  User Mapping</CModalTitle>
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
                    Map User<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="assigned_user" options={notes11} required />

                  <CFormFeedback invalid>Please select User</CFormFeedback>
                </CCol>
                <CCol sm={6}>

                  <CFormLabel htmlFor="validationDefault01">
                    Map Machine<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="machine" options={notes12} required />
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
            <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white' }}
              disabled={isDisabled}
            >
              &nbsp; {isDisabled ? 'Submit' : 'Submit'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CModal size={'lg'}
        visible={visible2}
        onClose={() => [setVisible2(false), setValidated(false), setIsDisabled(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible2(false), setValidated(false), setIsDisabled(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Edit User Mapping</CModalTitle>
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
                    Map User<span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect name="assigned_user"
                    options={usernamelist}
                    defaultValue={userdata?.assigned_user}
                    required />

                  <CFormFeedback invalid>Please select User</CFormFeedback>
                </CCol>
                <CCol sm={6}>

                  <CFormLabel htmlFor="validationDefault01">
                    Map Machine<span className="text-danger">*</span>
                  </CFormLabel>
                  {/* <CFormSelect name="machine"
                    defaultValue={userdata?.machine}
                    options={machinenamelist}
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
              onClick={() => [setVisible2(false), setValidated(false), setIsDisabled(false)]}
              style={{ backgroundColor: '#F5F5F5', color: 'black', borderColor: '#DCDCDC' }}
            >
              &nbsp;Close&nbsp;
            </CButton>
            <CButton type="submit" style={{ backgroundColor:selectedColor, color: 'white' }}>
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
