import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//page imports
import { Home } from './pages/homepage'
import { AboutUs } from './pages/about-us'
import { Admin } from './pages/admin-page'
import { CreateAccount } from './pages/create-account'
import { FAQ } from './pages/faq-page'
import { ForgotPassword } from './pages/forgot-password-page'
import { SubmitLostItem } from './pages/lost-and-found-submission-form'
import { LostAndFound } from './pages/lost-and-found'
import { Profile } from './pages/profile-page'
import { Map } from './pages/school-map'
import { SignIn } from './pages/sign-in'
import { ViewItem } from './pages/view-specific-item'




function App() {
  const [count, setCount] = useState(0)

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
  };

  useEffect(()=>{
    fetchAPI();
    },[]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/submit-item" element={<SubmitLostItem/>}/>
        <Route path="/lost-and-found" element={<LostAndFound/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/view-item" element={<ViewItem/>}/>
      </Routes>
    </Router>
  )
}

export default App
