import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
  return (
      <>
          <div className='card m-2' style={{cursor:'pointer'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
              <div className='card-header'>
                  Dr.{doctor.firstName} {doctor.lastName}
              </div>
              <div className='card-body'>
                  <p>
                      <b>Specialization</b> {doctor.specialization}
                  </p>
                  <p>
                      <b>Experiance</b> {doctor.experiance}
                  </p>
                  <p>
                      <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltaion}
                  </p>
                  <p>
                      <b>Timing</b> {doctor.timing[0]}-{doctor.timing[1]}
                  </p>
              </div>
          </div>
      </>
  )
}

export default DoctorList
