import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PublicRoute from './components/PublicRoute.js';
import ApplyDoctor from './pages/ApplyDoctor.js';
import Notification from './pages/Notification.js';
import Doctors from './pages/admin/Doctors.js';
import Users from './pages/admin/Users.js';
import Profile from './pages/doctor/Profile.js';
import BookingPage from './pages/BookingPage.js';
import Appointments from './pages/Appointments.js';
import DoctorAppointment from './pages/doctor/DoctorAppointment.js';


function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner /> :
        <Routes>
            <Route path='/' element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
           <Route path='/login' element={ <PublicRoute><Login /></PublicRoute> } />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='/appointments' element={<ProtectedRoute><Appointments/></ProtectedRoute>} />
            <Route path='/doctor-appointments' element={<ProtectedRoute><DoctorAppointment/></ProtectedRoute>} />
            <Route path='/apply-doctor' element={<ProtectedRoute> <ApplyDoctor /> </ProtectedRoute>} />
            <Route path='/admin/doctors' element={<ProtectedRoute> <Doctors /> </ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
            <Route path='/doctor/profile/:id' element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
            <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoute> <BookingPage/> </ProtectedRoute>} />
            <Route path='/notification' element={<ProtectedRoute> <Notification /> </ProtectedRoute>} />
      </Routes>
        }
        
      </BrowserRouter>
    </>
  );
}

export default App;
