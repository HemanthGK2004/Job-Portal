import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplication = () => {
  return (
    <div className='container p-4 mx-auto'>
        <div>
            <table className='w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4 py-2 text-left'>#</th>
                        <th className='px-4 py-2 text-left'>User Name</th>
                        <th className='px-4 py-2 text-left max-sm:hidden'>Job Title</th>
                        <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
                        <th className='px-4 py-2 text-left'>Resume</th>
                        <th className='px-4 py-2 text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {viewApplicationsPageData.map((application, index) => (
                        <tr key={index} className='text-gray-700 border-b hover:bg-gray-50'>
                            <td className='px-4 py-2 text-center border-b'>{index + 1}</td>
                            <td className='px-4 py-2 text-center border-b '>
                                <div className='flex items-center gap-2 mr-5'>
                                <img className='w-10 h-10 mr-rounded-full max-sm:hidden' src={application.imgSrc} alt="" />
                                <span>{application.name}</span>
                                </div>
                            </td>
                            <td className='px-4 py-2 border-b max-sm:hidden'>{application.jobTitle}</td>
                            <td className='px-4 py-2 border-b max-sm:hidden'>{application.location}</td>
                            <td className='px-4 py-2 border-b'>
                                <a href={application.resume} 
                                className='flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-100 rounded-lg'
                                target="_blank" rel="noopener noreferrer">View Resume <img src={assets.resume_download_icon} alt="" /></a>
                            </td>
                            <td className='relative px-4 py-2 border-b'>
                                <div className='relative inline-block text-left group'>
                                    <button className='text-gray-500 action:button'>...</button>
                                    <div className='absolute top-0 left-0 z-10 hidden w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg -0 group-hover:block md-left-0'>
                                        <button className='block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100'>Accept</button>
                                        <button className='block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100'>Reject</button>
                                    </div>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ViewApplication
