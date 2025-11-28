import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";


// User components
import Header from "./component/Header";
import MainContent from "./component/MainContent";
import Footer from "./component/Footer";

// Admin components
import AHeader from "./component/AHeader";
import AMainContent from "./component/AMainContent";
import AFooter from "./component/AFooter";

import UserProfile from "./component/UserProfile";
import Login from "./component/Login";
import Register from "./component/Register";
import AUsers from "./component/AUsers";
import ForgotPassword from "./component/ForgotPassword";

// Doctors components
import Doctors from "./component/Doctors";
import AddDoctor from "./component/AddDoctor";  
import UpdateDoctor from "./component/UpdateDoctor";
import DoctorProfile from "./component/DoctorProfile";


import Departments from "./component/Departments";
import AddDepartment from "./component/AddDepartment";
import UpdateDepartment from "./component/UpdateDepartment";

import Apatients from "./component/Apatients";
import Patients from "./component/Patients";
import AddPatient from "./component/AddPatient";
import UpdatePatient from "./component/UpdatePatient";
import PatientDetails from "./component/PatientDetails";

import Appointments from "./component/Appointments";
import AppointmentForm from "./component/AddAppointment";
import UserAppointments from "./component/UserAppointments";

import Medicines from "./component/Medicines";
import AddMedicine from "./component/AddMedicine";
import UpdateMedicine from "./component/UpdateMedicine";
import BuyMedicine from "./component/BuyMedicine";
import OrderMedicine from "./component/OrderMedicine";
import Billing from "./component/Billing";

import FeedbackList from "./component/FeedbackList";
import FeedbackForm from "./component/FeedbackForm";
import EditFeedback from "./component/EditFeedback";
import AdminFeedbackList from "./component/AdminFeedbackList";


import ContactForm from "./component/ContactForm";
import ContactList from "./component/ContactList";
import EditContact from "./component/EditContact";
import AdminContactList from "./component/AdminContactList";


import VideoCall from "./component/VideoCall";  
import VoiceMessage from "./component/VoiceMessage";
import Chat from "./component/Chat";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user from backend on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/me", { withCredentials: true });
        setCurrentUser(res.data.user);
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();

    // Listen for logout event
    const logoutListener = () => setCurrentUser(null);
    window.addEventListener("logout", logoutListener);
    return () => window.removeEventListener("logout", logoutListener);
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  const isLoggedInUser = !!currentUser?.email;
  const isLoggedInAdmin = currentUser?.role === "Admin";

  return (
    <Router>
      <Routes>
        {/* Public home page */}
        <Route
          path="/"
          element={
            <>
              <Header currentUser={currentUser} />
              <MainContent />
              <Footer />
            </>
          }
        />

        {/* Main user dashboard */}
        <Route
          path="/main"
          element={
            isLoggedInUser ? (
              <>
                <Header currentUser={currentUser} />
                <MainContent />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            isLoggedInAdmin ? (
              <>
                {/* <AHeader /> */}
                <AMainContent />
                {/* <AFooter /> */}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User profile */}
        <Route
          path="/userprofile"
          element={
            isLoggedInUser ? (
              <>
                <Header currentUser={currentUser} />
                <UserProfile currentUser={currentUser} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Users See*/} 
        <Route path="/admin/users" element={isLoggedInAdmin ? <AUsers /> : <Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* Departments */}
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment />} />
        <Route path="/departments/update/:id" element={<UpdateDepartment />} />

        {/* Doctors */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/doctors/update/:id" element={<UpdateDoctor />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />

        {/* Patients */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/apatients" element={<Apatients />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/apatients/update/:id" element={<UpdatePatient />} />
        <Route path="/patientdetails" element={<PatientDetails />} />

        {/* Appointments */}
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AppointmentForm />} />
        <Route path="/user/appointments" element={isLoggedInUser ? <UserAppointments userId={currentUser._id} /> : <Navigate to="/login" />} />
        
        {/* Medicines */}
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/add" element={<AddMedicine />} />
        <Route path="/medicines/update/:id" element={<UpdateMedicine />} />
        <Route
          path="/buymedicine"
          element={<BuyMedicine userId={currentUser?._id} />}
        />
        <Route path="/ordermedicine" element={<OrderMedicine />} />
        <Route path="/billing/:id" element={<Billing/>} />


        {/* Contact us */}

        <Route path="/contact" element={<ContactForm />} />
        <Route path="/contactlist" element={<ContactList />} />
        <Route path="/contactedit/:id" element={<EditContact />} />
        <Route
              path="/admin/contacts"
              element={
              isLoggedInAdmin ? <AdminContactList /> : <Navigate to="/login" />
                      }
        />


        
{/* Feedback */}
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedbacklist" element={<FeedbackList />} />
        <Route path="/feedbackedit/:id" element={<EditFeedback />} />
        <Route path="/admin/feedbacks" element={isLoggedInAdmin ? <AdminFeedbackList /> : <Navigate to="/login" />
                      }
        />

        <Route path="/VideoCall" element={<VideoCall />} />
        <Route path="/VoiceMessage" element={<VoiceMessage />} /> 
        <Route path="/Chat" element={<Chat />} />              
      </Routes>
    </Router>
  );
}
