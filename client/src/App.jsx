import 'quill/dist/quill.snow.css'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassword from './components/ForgotPassword'
import RecruiterLogin from './components/RecruiterLogin'
import ResetPassword from './components/ResetPassword'
import { AppContext } from './context/AppContext'
import AddJob from './pages/AddJob'
import Application from './pages/Application'
import ApplyJob from './pages/ApplyJob'
import DashBoard from './pages/DashBoard'
import DashboardOverview from './pages/DashboardOverview'
import Home from './pages/Home'
import ManageJobs from './pages/ManageJobs'
import RecruiterProfile from './pages/RecruiterProfile'
import ViewApplication from './pages/ViewApplication'
// import './App.css'

const App = () => {

  const {showRecruiterLogin,companyToken}=useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
              <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/apply-job/:id' element={<ApplyJob />} />
          <Route path='/applications' element={<Application />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          
          <Route path='/dashboard' element={<DashBoard />}>
            {companyToken ? (
              <>
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<ViewApplication />} />
                <Route path="view-profile" element={<RecruiterProfile />} />
                <Route path='overview' element={<DashboardOverview />} />

              </>
            ) : null}
          </Route>
        </Routes>
    </div>
  )
}

export default App
