import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { login, getUserById } from '../../redux/Auth/AuthSlice';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { key } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const response = await dispatch(login(formData)).unwrap();
      await dispatch(getUserById()).unwrap();
      toast.success(response.message);
      setLoading(false);
      navigateTo('/dashboard', {replace: true,})
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
    {loading && <Loader isLoading={loading} />}
    <div className="sign-in-container">
      <div className='sign-in-card'>
        <div className="sign-in-header">
        <div className="sign-in-badge">🛞 Transport Management</div>
        <div className="sign-in-title">Welcome Back</div>
        <div className="sign-in-sub">Sign in to your Tranzoop account</div>
        </div>
        <div className="sign-in-field" >
          <div className="sign-in-label">Username</div>
          <input className="sign-in-input" 
          placeholder="Username" 
          name='username'
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
          />
        </div>
        <div className="sign-in-field" >
          <div className="sign-in-label">Password</div>
          <div className="sign-in-password-wrapper">
        <input
          className="sign-in-input"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name='password'
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <span
          className="sign-in-eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
        </span>
      </div>
        </div>
      <button className="sign-in-btn" onClick={handleSubmit}>Login →</button>
      <div className="sign-in-back-link" onClick={()=>navigateTo('/')}>← Back</div>
      </div>
    </div>
    </div>
  )
}

export default SignIn