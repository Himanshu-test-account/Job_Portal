import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);  // assuming you have isAuthenticated in user state

  
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Protect routes for authenticated users
  const ProtectedRoute = ({ element, redirectTo }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

  return (
    <>
      <Router future={{
          v7_startTransition: true, // Opt-in to state transition behavior
          v7_relativeSplatPath: true, // Opt-in to splat path resolution change
        }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={<Dashboard />} redirectTo="/login" />} 
          />
          <Route path="/post/application/:jobId" element={<PostApplication />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark"/>
      </Router>
    </>
  );
};

export default App;
