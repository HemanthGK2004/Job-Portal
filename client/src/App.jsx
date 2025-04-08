import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Application from './pages/Application'
import ApplyJob from './pages/ApplyJob'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import ManageJobs from './pages/ManageJobs'
import AddJob from './pages/AddJob'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'

// import './App.css'

const App = () => {

  const {showRecruiterLogin}=useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Application />} />
        <Route path='/dashboard' element={<DashBoard />}>
            <Route path='add-job' element={<AddJob/>} />
            <Route path='manage-jobs' element={<ManageJobs/>} />
            <Route path='view-applications' element={<ViewApplication/>} />
        </Route>
      </Routes>  
    </div>
  )
}

export default App
