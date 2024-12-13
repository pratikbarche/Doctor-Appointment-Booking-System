import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout.js';
import axios from 'axios';
import { message, Table} from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState();

  //get users
  const getDoctors = async () => { 
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.data.success)
      {
        setDoctors(res.data.data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  //handle acount status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus', { doctorId: record._id,userId:record.userId, status: status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success)
      {
        message.success(res.data.message);

      }
    } catch (error) {
      message.error('something went wrong');
      window.location.reload();
    }
  }

  //antd table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Phone No.",
      dataIndex: "phone"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='d-flex'>
          {record.status==='pending' ? <button className='btn btn-success' onClick={()=>handleAccountStatus(record,'approved')}>Approve</button> : <button className='btn btn-danger'>Reject</button>}
        </div>
      )
    }
  ];

  
  useEffect(() => { getDoctors() }, []);
  

  return (
      <Layout>
          <h1 className='text-center m-2'>Doctors List</h1>
          <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors;
