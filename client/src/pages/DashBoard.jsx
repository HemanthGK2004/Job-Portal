import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const DashBoard = () => {
    const navigate= useNavigate()
    const {companyData,setCompanyData,setCompanyToken}=useContext(AppContext)

    //function to log out
    const logOut = () => {
        setCompanyData(null)
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        navigate('/')
    }
    
    useEffect(() => {
        if(companyData){
            navigate('/dashboard/manage-jobs')
        }
    },[companyData])
    
    return (

    <div className='min-h-screen bg-gray-100'>
        {/* <h1>Dashboard</h1>
        <Outlet /> */}

        <div className='py-4 shadow'>
            <div className='flex items-center justify-between px-5'>
                <img onClick={e=>navigate('/')} className='cursor-pointer max-sm:w-32' src={assets.logo} alt="" />
                {companyData && (
                                    <div className='flex items-center gap-4'>
                                    <p className='text-black-600 max-sm:hidden'>
                                        Welcome, {companyData.name}
                                    </p>
                                    <div className='relative group'>
                                    <img className='object-cover w-10 h-10 border rounded-full' src={companyData.image} alt="Company" />
                                        <div className='absolute top-0 right-0 z-10 hidden pt-12 text-black rounded group-hover:block'>
                                            <ul className='p-2 mt-2 text-sm text-center list-none bg-white border rounded-md'>
                                                <li onClick={logOut} className='px-2 py-1 pr-10 mt-1 text-center cursor-pointer'>LogOut</li>
                                            </ul> 
                                        </div>
                                    </div>
                                </div>
                )}
            </div>
        </div>
        <div className='flex items-start'>
            <div className='inline-block min-h-screen border-r-2 rounded '>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                    {/* <h1 className='text-xl font-medium'>Dashboard</h1> */}
                    {/* <ul className='mt-4 list-none'>
                        <li className='px-2 py-2 rounded-md cursor-pointer hover:bg-blue-50'>Dashboard</li>
                        <li className='px-2 py-2 rounded-md cursor-pointer hover:bg-blue-50'>Jobs</li>
                        <li className='px-2 py-2 rounded-md cursor-pointer hover:bg-blue-50'>Applications</li>
                        <li className='px-2 py-2 rounded-md cursor-pointer hover:bg-blue-50'>Settings</li>
                    </ul> */}
                    <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/overview'}>
                        <img className='min-w-4' src={assets.dashboard_icon} alt="" />
                        <p className='max-sm:hidden'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                        <img className='min-w-4' src={assets.add_icon} alt="" />
                        <p className='max-sm:hidden'>Add Job</p>
                    </NavLink>
                    <NavLink className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                        <img className='min-w-4' src={assets.home_icon} alt="" />
                        <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>
                    <NavLink className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                        <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                        <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>
                    <NavLink className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-profile'}>
                        <img className='min-w-4' src={assets.person_icon} alt="Profile" />
                        <p className='max-sm:hidden'>View Profile</p>
                    </NavLink>
                    
                    
                    <li onClick={logOut} className='flex items-center w-full gap-2 p-3 cursor-pointer sm:px-6 hover:bg-gray-100'>
                        <img className='min-w-4' src={assets.logout_icon} alt="" />
                        <p className='max-sm:hidden'>Log Out</p>
                    </li>
                    
            </ul>
        </div>
        <div className='flex-1 h-full p-2 sm:p-5' >
            <Outlet />
        </div>
        
        </div>
    </div>
  )
}

export default DashBoard
