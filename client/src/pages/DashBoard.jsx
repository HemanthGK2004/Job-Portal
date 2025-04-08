import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const DashBoard = () => {
    const navigate= useNavigate()
  return (

    <div className='bg-gray-100 min-h-screen'>
        {/* <h1>Dashboard</h1>
        <Outlet /> */}

        <div className='shadow py-4'>
            <div className='px-5 flex justify-between items-center'>
                <img onClick={e=>navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                <div className='flex items-center gap-4'>
                    <p className='max-sm:hidden text-gray-500'>
                        Welcome, Itz Hemanth
                    </p>
                    <div className='relative group'>
                        <img className='w-8 border rounded-full' src={assets.company_icon} alt="" />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none mt-2 p-2 bg-white rounded-md border text-sm text-center'>
                                <li className='py-1 px-2 cursor-pointer pr-10 mt-1 text-center'>LogOut</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-start'>
            <div className='inline-block min-h-screen border-r-2 rounded '>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                    {/* <h1 className='text-xl font-medium'>Dashboard</h1> */}
                    {/* <ul className='list-none mt-4'>
                        <li className='py-2 px-2 cursor-pointer hover:bg-blue-50 rounded-md'>Dashboard</li>
                        <li className='py-2 px-2 cursor-pointer hover:bg-blue-50 rounded-md'>Jobs</li>
                        <li className='py-2 px-2 cursor-pointer hover:bg-blue-50 rounded-md'>Applications</li>
                        <li className='py-2 px-2 cursor-pointer hover:bg-blue-50 rounded-md'>Settings</li>
                    </ul> */}
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
            </ul>
        </div>
        <div>
            <Outlet />
        </div>
        </div>
    </div>
  )
}

export default DashBoard
