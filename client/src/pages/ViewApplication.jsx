import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { AppContext } from '../context/AppContext'

const ViewApplication = () => {
    const { backendUrl, companyToken } = useContext(AppContext)
    const [applicants, setApplicants] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const fecthCompanyJobApplicants = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
                headers: {
                    Authorization: `Bearer ${companyToken}`
                }
            })
            if (data.success) {
                setApplicants(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const changeJobApplicationStatus = async (id, status) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/company/change-status`, {
                id,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${companyToken}`
                }
            })
            if (data.success) {
                toast.success(data.message)
                fecthCompanyJobApplicants()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fecthCompanyJobApplicants()
        }
    }, [companyToken])

    if (!applicants) return <Loading />

    const filteredApplicants = applicants
        .filter(item => item.jobId && item.userId)
        .filter(item => item.userId.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filteredApplicants.length === 0) {
        return <div className="p-4 text-xl sm:text-2xl">No matching applications found.</div>
    }

    return (
        <div className="container p-4 mx-auto">
            <div className="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:justify-between">
                <h2 className="text-xl font-semibold">Applications</h2>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Mobile View */}
            <div className="space-y-4 sm:hidden">
                {filteredApplicants.map((application, index) => (
                    <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={application.userId.image} alt="" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium">{application.userId.name}</p>
                                <p className="text-sm text-gray-500">{application.jobId.title} - {application.jobId.location}</p>
                            </div>
                        </div>

                        <a href={application.userId.resume} target="blank"
                            className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-sm text-blue-600 bg-blue-100 rounded-lg"
                            rel="noopener noreferrer">View Resume <img src={assets.resume_download_icon} className="w-4 h-4" alt="" /></a>

                        <div>
                            {application.status === "pending" ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => changeJobApplicationStatus(application._id, 'Accepted')}
                                        className="flex-1 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => changeJobApplicationStatus(application._id, 'Rejected')}
                                        className="flex-1 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md"
                                    >
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full 
                                    ${application.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                                        application.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                            'bg-yellow-100 text-yellow-600'}`}>
                                    {application.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block">
                <table className="w-full max-w-6xl bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">User Name</th>
                            <th className="px-4 py-2 text-left">Job Title</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Resume</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplicants.map((application, index) => (
                            <tr key={index} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <img className="w-10 h-10 rounded-full" src={application.userId.image} alt="" />
                                        <span>{application.userId.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{application.jobId.title}</td>
                                <td className="px-4 py-2">{application.jobId.location}</td>
                                <td className="px-4 py-2">
                                    <a href={application.userId.resume} target="blank"
                                        className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-100 rounded-lg"
                                        rel="noopener noreferrer">View Resume <img src={assets.resume_download_icon} className="w-4 h-4" alt="" /></a>
                                </td>
                                <td className="px-4 py-2">
                                    {application.status === "pending" ? (
                                        <div className="relative inline-block text-left group">
                                            <button className="text-gray-500">...</button>
                                            <div className="absolute top-0 left-0 z-10 hidden w-40 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg group-hover:block">
                                                <button
                                                    onClick={() => changeJobApplicationStatus(application._id, 'Accepted')}
                                                    className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => changeJobApplicationStatus(application._id, 'Rejected')}
                                                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full 
                                        ${application.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                                                application.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                                    'bg-yellow-100 text-yellow-600'}`}>
                                            {application.status}
                                        </div>
                                    )}
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
