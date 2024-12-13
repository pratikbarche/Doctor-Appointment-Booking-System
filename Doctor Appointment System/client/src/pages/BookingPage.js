import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout.js';
import { DatePicker, message, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice.js'

const BookingPage = () => {
  const { user } = useSelector(state => state.user);
  const [doctors, setDoctors] = useState([]);
  const params = useParams();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
    
    //login user data
    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorById', {doctorId:params.doctorId},{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if (res.data.success)
            {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
  }
  
  //booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert('Date and Time required');
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment', {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctors,
        date: date,
        userInfo:user,
        time: time
      }, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success)
      {
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  }

  //check availability function
  const handleAvailability =async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/booking-availability', { doctorId: params.doctorId, date, time }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success)
      {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  }

    useEffect(() => {
      getUserData();
      //eslint-disable-next-line
    }, []);
  return (
      <Layout>
      <h3 className='text-center'>Booking Page</h3>
      <div className='container m-2'>
        {doctors && (
          <div>
            <h4>
            Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>
              Fees : {doctors.feesPerCunsaltaion}
            </h4>
            <h4>
              Timing : {/* Timing : {doctors.timing} */}
            </h4>
            <div className='d-flex flex-column w-50'>
              <DatePicker format='DD-MM-YYYY' className='m-2' onChange={(value) => {
                setIsAvailable(false)
                setDate(moment(value).format("DD-MM-YYYY"))
              }}/>
              <TimePicker format='HH:mm' className='m-2' onChange={(value) => { 
                setIsAvailable(false)
                setTime(
                  moment(value).format('HH:mm')
                )
              }} />
              <button className='btn btn-primary mt-2' onClick={handleAvailability}>
                Check Availability
              </button>
              {!isAvailable && (
                <button className='btn btn-dark mt-2' onClick={handleBooking}>
                Book Know
              </button>
              )}
            </div>

          </div>


          )}
      </div>
    </Layout>
  )
}

export default BookingPage
