import React, { useState, useEffect, useContext } from 'react'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import baseURl from 'src/utils/baseurl'
import { CSmartTable } from '@coreui/react-pro'
import {
  CRow,
  CCol,
  CImage, CCardImage, CButton, CModalFooter, CFormFeedback, CFormSelect, CFormLabel, CFormInput,
  CModalBody, CForm, CModalTitle, CModalHeader, CModal,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AuthContext from 'src/context/AuthContext'
import e1 from 'src/assets/images/eye.png'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilCheck, cilPencil, } from '@coreui/icons'
import { useColor } from 'src/menu/adminsetting/colorcontext';
function Topic() {
  let api = useAxios()
  let [notes, setNotes] = useState([])
  let [notes2, setNotes2] = useState([])
  const [id, setid] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const { selectedColor } = useColor();
  const [validated, setValidated] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false);
  let [notes4, setNotes4] = useState([])
  let [userdata, setUserdata] = useState()
  let [notes3, setNotes3] = useState([])
  // let [rqcodelist, setrqcodelist] = useState([])
  let [payment_type_mode, setpayment_type_mode] = useState([])
  let baseurl = baseURl()
  const disableButton = () => {
    setIsDisabled(true);
  };


  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    let response = await api.get('/machine/api/get_machine_and_qrcode_for_customer/')
    let response2 = await api.get('/machine/qrcode/')
    let response3 = await api.get('/machine/get_product_list/')
    let response4 = await api.get('/machine/modelcapacity/')
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
          product_type: a.product_type,
          amount: a.amount,
          model_no: a.model_no,
          name: a.name,
          payment_type: a.payment_type,
          status: a.is_active === true ? 'Active' : 'Inactive',
          // is_active: a.is_active == true ? 'Active' : 'Inactive',
        };
        data.push(options);
      }
      let data3 = [{ label: '', value: '' },];
      for (let i = 0; i < response3.data.result.length; i++) {
        let a = response3.data.result[i];
        // if (a.is_active == 1) {
        let options = {
          label: a.product_type,
          value: a.id,
          amount: a.amount,
          // model_no:a.model_no,
          // name:a.name,
        };

        data3.push(options);
        // }
      }
      let data2 = [];
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i];
        if (a.is_active == 1) {
          let options = {
            label: a.qr_code_id,
            value: a.id,
          };

          data2.push(options);
        }
      }
      let data4 = [{ label: '', value: '' },];
      for (let i = 0; i < response4.data.result.length; i++) {
        let a = response4.data.result[i];
        // if (a.is_active == 1) {
        let options = {
          // label: a.product_type,
          value: a.id,
          label: a.model_no,
          name: a.name,
        };

        data4.push(options);
        // }
      }
      setNotes4(data4)
      setNotes(data);
      setNotes2(data2);
      setNotes3(data3);
      // console.log(notes)
      // console.log(notes2)
    } else if (response.data.success === 0) {
      for (let i = 0; i < Object.values(response.data.result).length; i++) {
        let a = Object.values(response.data.result)[i]
        alert(a)
      }
    }
  }

  // const get_training_data = async (item) => {
  //     let qrname_name = []
  //     notes2?.map((note) => {
  //       if (note.value == item.rqcode_id) {
  //         qrname_name.push(note)
  //       }
  //     });
  //     notes2?.map((note) => {
  //       if (note.value != item.rqcode_id) {
  //         qrname_name.push(note)
  //       }
  //     })

  //     let payment_type_mode = []
  //     notes3?.map((note) => {
  //       if (note.value == item.payment_type) {
  //         payment_type_mode.push(note)
  //       }
  //     });
  //     notes3?.map((note) => {
  //       if (note.value != item.payment_type) {
  //         payment_type_mode.push(note)
  //       }
  //     })

  //     setrqcodelist(qrname_name)
  // setpayment_type_mode(payment_type_mode)
  //   };
  const updateTopic = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === true) {
      const uploadData = new FormData(e.target)
      let response = await api.patch(`/machine/machine-masters/${id}/`, uploadData)
      if (response.data.success === 1) {
        // alert(response.data.message)
        alert('Machine id is updated')
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
      label: 'Sr No.',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '60px' },
    },
    {
      label: 'Machine ID',
      key: 'machine_id',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'QR Code ID',
      key: 'rqcode',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Image',
      key: 'qr_code_img',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Product Type',
      key: 'product_type',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Amount',
      key: 'amount',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Model No',
      key: 'model_no',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Capacity',
      key: 'name',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      label: 'Payment Type',
      key: 'payment_type',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {

      label: 'Created Date',
      key: 'created_at',
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
    },
    {
      key: 'Action',
      label: 'Action',

      filter: false,
      sorter: false,
      _props: { color: 'secondary', className: 'fw-semibold' },
      _style: { minWidth: '100px' },
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
  const formattedDateTime = formatDate();
  // console.log(formattedDateTime);
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
                          //   get_training_data(item),
                        ]}
                      />
                    </Link>
                    &nbsp;&nbsp;&nbsp;

                    <Link to={'/Machineview/' + `${item.id}`}>

                      <CImage src={e1} width={17} height={15} title="View Details" />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
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
                //  className: 'align-middle',
              }}
              tableFilterLabel={'Search : '}
              tableFilterPlaceholder={'Enter String to Search'}
              itemsPerPageLabel={'Rows per page:'}
            />
          </CCol>
        </CRow>
      </div>
      <CModal size={'lg'}
        visible={visible2}
        onClose={() => [setVisible2(false), setValidated(false)]}
        backdrop="static"
      >
        <CModalHeader
          onClose={() => [setVisible2(false), setValidated(false)]}
          style={{ backgroundColor: selectedColor, color: 'white' }}
        >
          <CModalTitle>Update Machine Master</CModalTitle>
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
                  Product
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="product"
                  options={notes3}
                  defaultValue={userdata?.product}
                // required
                />
                <CFormFeedback invalid>Please select Product</CFormFeedback>
              </CCol>

              <CCol sm={6}>
                <CFormLabel htmlFor="validationDefault01">
                  Model Number
                  {/* <span className="text-danger">*</span> */}
                </CFormLabel>
                <CFormSelect
                  name="model_number"
                  options={notes4}
                  // required
                  defaultValue={userdata?.model_number}
                />
                <CFormFeedback invalid>Please select Model Number</CFormFeedback>
              </CCol>
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