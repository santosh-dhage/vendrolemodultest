
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from 'src/context/AuthContext';
import axios from 'axios';
import {
  CButton,
  CFormInput,
  CForm, CCard,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CFormLabel,
  CImage,
  CFormSelect,
  CFormTextarea,
  CFormFeedback, CSmartTable,
} from '@coreui/react-pro';
import GifSrc from 'src/assets/Blog/Feedback.gif'
import useAxios from 'src/utils/useAxios'
import { useColor } from 'src/menu/adminsetting/colorcontext';
import { Background } from 'victory';

const Complaint = () => {
  const history = useNavigate();
  const { user, authTokens } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [software, setSoftware] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [other, setOther] = useState([]);
  const [id, setid] = useState(false);
  let api = useAxios()
  let [notes1, setNotes1] = useState([])
  let [notes2, setNotes2] = useState([])
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { selectedColor } = useColor();
  useEffect(() => {
    getTopic();
  }, []);

  let getTopic = async () => {
    // let response = await api.get('machine/user_machine_mapped/')
    let response2 = await api.get('machine/ticket_list/')
    // let response3 = await api.get('machine/assignto/')
    //  let response=await api.get('machine/ticket_list/')
    // console.log(response.data.result.length)
    if (response2.data.success === 1) {
      let software = []
      let hardware = []
      let other = []
      let data =[]
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i]
        let options = {
          ticket_no: a.ticsrno,
          date: formatDate1(a.created_at),
          time: formatTime(a.created_at),
          title: a.title,
          machine_id: a.machine_map,
          // assigned_to: '',
          priority: a.priority,
          status: a.status,
          problem_type: a.problem_type,
          discription: a.description,
          note: a.notes,
          email: a.email,
          name: a.name,
        };
        if (options.problem_type == 'software') {
          software.push(options)
        }
        if (options.problem_type == 'hardware') {
          hardware.push(options)
        }
        if (options.problem_type == 'other') {
          other.push(options)
        }
        data.push(options)
      }
  setSoftware(software);
  setHardware(hardware);
        setOther(other);
      setNotes(data)

    } else if (response2.data.success === 0) {
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //   alert(a)
      // }
      console.log('hhhhhhhhh')
    }
  }


  const getrefresh = () => {
    window.location.reload();
  };

  const disableButton = () => {
    setIsDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted');
    saveTopic(e);
    if (e.currentTarget.checkValidity()) {
      disableButton();
    }
  };

  const saveTopic = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target);
      // uploadData.append('machine_mapping',1);
      let response = await api.post('/machine/create_ticket/', uploadData);

      // console.log(e.machine_map + "santosh");

      // for (let i = 0; i < notes1.length; i++) {
      //   if (notes1[i].mid == e.machine_map) {
      //     uploadData.append('machine_map', notes1[i].id)
      //   }
      // }
      // uploadData.append('machine_mapping',1);
      // let response = await api.post('/machine/ticket/', uploadData);
      if (response.data.success === 1) {
        alert('Ticket is Created');
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
    else {
      setValidated(true);
    }
  };
  const columns = [
    {
      key: 'sr_no',
      label: 'Sr. No.',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Ticket No',
      key: 'ticket_no',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '115px' },
    },
    {
      label: 'Date',
      key: 'date',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '80px' },
    },
    {
      label: 'Time',
      key: 'time',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '20px' },
    },
    {
      label: 'Title',
      key: 'title',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Email',
      key: 'email',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Name',
      key: 'name',
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Machine ID',
      key: 'machine_id',

      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    // {
    //   label: 'Assinged To',
    //   key: 'assigned_to',
    //   _props: { color: 'secondary', className: 'fw-semibold' },

    // },
    {
      label: 'Priority',
      key: 'priority',

      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '50px' },
    },
    {
      key: 'status',
      label: 'Status',

      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      key: 'problem_type',
      label: 'Problem Type',

      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '50px' },
    },
    {
      key: 'discription',
      label: 'Description',

      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '130px' },
    },
    // {
    //   key: 'note',
    //   label: 'Note',

    //   _props: { color: 'secondary', className: 'fw-semibold' },
    //   _style: { minWidth: '100px' },
    // },
  ]

  function formatDate1(date) {
    if (date == null) {
      return
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const formatTime = (dateString) => {
    if (dateString == null) {
      return "          ";
    }
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
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
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }


  return (
    <>
      <div className="mb-3">
        {/* <div className="d-flex justify-content-between align-items-center mb-2">

          <CButton
            onClick={() => {
              setVisible1(!visible1)
            }}
            className="mt-2"

            style={{ backgroundColor: selectedColor, color: 'white', border: '0px' }}
          >
            Create Ticket
          </CButton>
        </div> */}
        <h3>Ticket History</h3>
        <CRow>
        <div className="d-grid gap-4 d-md-flex justify-content-md-start mt-3 mb-2">

            <CButton
              color="success"
              type="button"
              className="btn btn-default btn-sm"
              // onClick={problemTypesoftware}
              onClick={()=>(setNotes(software))}
              style={{
                backgroundColor: selectedColor, color: 'white', borderRadius: '5px', boxShadow: "3px 3px 3px 1px rgba(0,0,0,0.25)",
                //  boxShadow: favorite == true ? "inset 2px 2px 2px black" : ""
              }}
            >
              {/* <CIcon icon={cilPlus} style={{ color: 'White' }} size="sm" /> */}
              Software Problems
            </CButton>
            <CButton
              color="success"
              type="button"
              onClick={()=>(setNotes(hardware))}
              className="btn btn-default btn-sm "
              style={{
                backgroundColor: selectedColor, color: 'white', borderRadius: '5px', boxShadow: "3px 3px 3px 1px rgba(0,0,0,0.25)",

              }}
            >
              {/* <CIcon icon={cilPlus} style={{ color: 'White' }} size="sm" /> */}
              Hardware Problems
            </CButton>
         
            <CButton
              onClick={()=>setNotes(other)}
              // className="btn btn-default btn-sm "
              style={{
                backgroundColor: selectedColor, color: 'white', borderRadius: '5px', boxShadow: "3px 3px 3px 1px rgba(0,0,0,0.25)",

              }}
            >
              {/* <CIcon icon={cilPlus} style={{ color: 'White' }} size="sm" /> */}
              Other Problems
            </CButton>

        </div>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CSmartTable
              activePage={1}
              clickableRows
              columns={columns}

              items={notes}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{

                sr_no: (item, index) => <td>{index + 1}</td>,
                // status: (item) => {
                //   return (<CFormSelect style={{ border: '0px' }}>
                //     <option>{item.status}</option>
                //     <option value="software" >In Progress</option>
                //     <option value="hardware">Pending</option>
                //     <option value="other">Solved</option>
                //   </CFormSelect>)
                // },
              }}
              // sorterValue={{ coloumns: 'created_at', state: 'asc' }}
              itemsPerPageOptions={[10, 20, 50, 100]}
              // tableFilter
              tableProps={{
                color: 'success-color-secondary',
                hover: true,
                border: '1.5px solid #074',
                responsive: true,

              }}
              tableHeadProps={{
                color: 'light',
                align: 'middle',
                className: 'align-middle',
              }}
              tableBodyProps={{
                align: 'middle',
                className: 'align-middle',
              }}

              // tableFilterLabel={'Search : '}
              // tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
            />
          </CCol>
        </CRow>
      </div>


    </>
  );
};

export default Complaint;
