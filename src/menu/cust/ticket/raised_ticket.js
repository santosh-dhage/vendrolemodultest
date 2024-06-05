import React, { useState, useEffect } from 'react';

import {
  CRow,
  CCol,
  CSmartTable,
} from '@coreui/react-pro';
import useAxios from 'src/utils/useAxios'
const Complaint = () => {

  const [notes, setNotes] = useState([]);
 
  let api = useAxios()
  useEffect(() => {
    getTopic();
  },[]);

  let getTopic = async () => {
    // let response = await api.get('machine/user_machine_mapped/')
    let response2 = await api.get('machine/ticket_list/')
    // let response3 = await api.get('machine/assignto/')
    //  let response=await api.get('machine/ticket_list/')
    // console.log(response.data.result.length)
    if ( response2.data.success === 1) {
      let data = []
      for (let i = 0; i < response2.data.result.length; i++) {
        let a = response2.data.result[i]
        let options = {
          ticket_no: a.ticsrno,
          date:formatDate1(a.created_at),
          time: formatTime(a.created_at),
          title: a.title,
          machine_id: a.machine_map,
          // assigned_to: '',
          priority: a.priority,
          status: a.status,
          problem_type: a.problem_type,
          discription: a.description,
          note: a.notes,
          email:a.email,
          name:a.name,
        };
        data.push(options)
      }


      setNotes(data)
      
    } else if (response2.data.success === 0) {
      // for (let i = 0; i < Object.values(response.data.result).length; i++) {
      //   let a = Object.values(response.data.result)[i]
      //   alert(a)
      // }
      console.log('hhhhhhhhh')
    }
  }

  const columns = [
    {
      key: 'sr_no',
      label: 'Sr No',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Ticket No',
      key: 'ticket_no',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Date',
      key: 'date',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Time',
      key: 'time',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Title',
      key: 'title',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Email',
      key: 'email',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Name',
      key: 'name',
      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      label: 'Machine ID',
      key: 'machine_id',

      _props: { color: 'secondary', className: 'fw-semibold' },

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

    },
    {
      key: 'status',
      label: 'Status',

      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      key: 'problem_type',
      label: 'Problem Type',

      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      key: 'discription',
      label: 'Description',

      _props: { color: 'secondary', className: 'fw-semibold' },

    },
    {
      key: 'note',
      label: 'Note',

      _props: { color: 'secondary', className: 'fw-semibold' },

    },
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
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }
  return (
    <>
      <div className="mb-3">
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

                sr_no: (item, index) => <td>{index + 1}</td>

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
