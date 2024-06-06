import React, { useState, useEffect } from 'react'
// import { CSmartTable } from '@coreui/react-pro'
// import { Link } from 'react-router-dom'
// import CreateProject from 'src/views/forms/CreateCheckPoint/CreateCheckPoint'
import useAxios from 'src/utils/useAxios'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
// import Select from 'react-select';
import { cilTrash, cilCheck, cilPencil, cilPlus,cilArrowBottom } from '@coreui/icons'
import {
  CTableBody,CTableHeaderCell,CTable,CTableDataCell,CTableHead,CTableRow,CButton,
  CAlert,CModal,CModalBody,CForm,CModalHeader,CModalTitle,CModalFooter,CFormFeedback,
  CCard,CFormLabel,CFormSelect,
  CRow,
  CCardBody,
  CCol,
  CFormInput,
} from '@coreui/react'
import * as XLSX from 'xlsx/xlsx.mjs'

const Projects = () => {
//   const history = useNavigate()
  let api = useAxios()
  let [notes1, setNotes1] = useState([])
  const [visible2, setVisible2] = useState(false)
  const [alerts, setAlerts] = useState(false)
 
  const EXTENSIONS = ['xlsx', 'xls', 'csv']
  const [data, setData] = useState(false)
  const [colDefs, setColDefs] = useState(false)

 
  const getExtension = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension)
  }
  const rowdata =[]

  const ImportExcel = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const bstr = event.target.result
      const workbook = XLSX.read(bstr, { type: 'binary' })

      const worksheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetname]

      const fileData = XLSX.utils.sheet_to_json(worksheet, { blankraws: '', header: 1 })
      console.log(fileData)
      for (var i=0 ;i < fileData.length;i++){
        let a = fileData[i]
        let options1 = 
            {
            modules_name: a[0],
            modules_no: a[1],
            sub_modules_name:a[2],
            sub_modules_no:a[3],
            module_permission_no:a[5],
            module_permission_name:a[4]
            }
        rowdata.push(options1)
        console.log(options1)
        }
        setNotes1(rowdata)
    }
    if (file) {
      if (getExtension(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert('Invalid input file type. Please select Excel or CSV file')
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  
  const saveProject = async (e) => {
    e.preventDefault()
    // let response = await api.post('/api/module_tablelist/',notes1)
    // if (response.status === 201 ) {
    //     setVisible2(true)
    //     setAlerts('data submited')
    // } else {
    //   setVisible2(true)
    //   setAlerts('Something went wrong!')
    // }
  }
  return (
    <>
      <CAlert color="success" dismissible visible={visible2} onClose={() => setVisible2(false)}>
        {alerts}
      </CAlert>
      <div className='row'>
      <CCol md={10}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
        <CFormInput
          type="file"
          className="btn btn-default btn-sm"
        //   style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white' }}
          onChange={ImportExcel}
        />
         </div>
        </CCol> 
        <CCol md={2}>
        <CButton
            type="submit"
            className="btn btn-default btn-sm "
            // style={{ backgroundColor: 'rgb(1, 50, 32)', color: 'white' }}
            onClick={saveProject}
        >
            <CIcon icon={cilCheck} style={{ color: 'White' }} size="sm" />Submit
        </CButton>
        </CCol>
        </div>
    </>
  )
}
export default Projects
