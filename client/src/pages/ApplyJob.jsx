import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import kconvert from 'k-convert'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import JobCard from '../components/JobCard'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { AppContext } from '../context/AppContext'

const ApplyJob = () => {
    const { id } = useParams()
    const {getToken} = useAuth()
    const [JobData, setJobData] = useState(null)
    const [isApplied, setIsApplied] = useState(false)
    const { jobs,backendUrl,userData,userApplications,fetchUserApplications } = useContext(AppContext)
    const navigate = useNavigate()
    
    const fetchJob = async() => {
    try {
    const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
    if (data.success) {
        setJobData(data.job)
    } else {
        toast.error(data.message)
    }
    } catch (err) {
    toast.error(err.message)
    }
}
const applyHandler = async() => {
    try {
        if(!userData) {
            return toast.error("Please login to apply for the job")
        }
        if(!userData.resume) {
            navigate('/applications')
            return toast.error("Please upload your resume to apply for the job")
        }
        const token = await getToken()
        const { data } = await axios.post(backendUrl + '/api/users/apply', {
            jobId: JobData._id,
            // userId: userData._id,
            // companyId: JobData.companyId._id,
            // resume: userData.resume,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (data.success) {
            toast.success(data.message)
            fetchUserApplications()
        } else {
            toast.error(data.message)
        }
    }
    catch (err) {
        const message = err.response?.data?.message;
        if(err.response?.status === 400 && message === "Already applied for this job") {
            toast.info("Already applied for this job")
        }
        else {
            toast.error(message || "Something went wrong Please try again")
        }
    }
}
    const checkIfAlreadyApplied = () => {
        const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
        setIsApplied(hasApplied)
    }
        
        

useEffect(() => {
        fetchJob()
}, [id])
useEffect(() => {
    if(userApplications.length > 0 && JobData) {
        checkIfAlreadyApplied()
    }
},[JobData,userApplications,id])

return JobData ? (
    <>
    <NavBar />
    <div className='container flex flex-col min-h-screen px-4 py-10 mx-auto 2xl:px-20'>
        <div className='w-full text-black bg-white rounded-lg'>
            <div className='flex flex-wrap justify-center gap-8 py-20 mb-6 border md:justify-between px-14 bg-sky-50 border-sky-400 rounded-xl' >
                <div className='flex flex-col items-center md:flex-row'>
                <img
                src={JobData?.companyId?.image || assets.default_logo}
                alt=""
                className="h-24 p-4 mr-4 bg-white border rounded-lg max-md:mb-4"/>
                    <div className='text-center md:text-left text-neutral-900'>
                        <h1 className='text-2xl font-medium sm:text-4xl'>{JobData.title}</h1>
                    <div className='flex flex-row flex-wrap items-center gap-6 mt-3 text-gray-600 max-md:justify-cneter gap-y-2'>
                        <span className='flex items-center gap-2'>
                            <img src={assets.suitcase_icon} alt="" />
                            {JobData.companyId.name}
                        </span>
                        <span className='flex items-center gap-2'>
                            <img src={assets.location_icon} alt="" />
                            {JobData.location}
                        </span>
                        <span className='flex items-center gap-2'>
                            <img src={assets.person_icon} alt="" />
                            {JobData.level}
                        </span>
                        <span className='flex items-center gap-2'>
                            <img src={assets.money_icon} alt="" />
                            CTC: {kconvert.convertTo(JobData.salary)}
                        </span>
                    </div>
                </div>
                </div>
                <div className='flex flex-col justify-center text-sm text-end max-md:mx-auto max-md:text-center'>
                <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded'>{isApplied ? 'Already Applied' : 'Apply Now'}</button>
                {/* <p className='mt-2 text-gray-500'>
                    Apply before {moment(JobData.expiryDate).format("MMMM Do YYYY")}
                </p> */}
                <p className='mt-2 text-gray-500'>
                    Posted on {moment(JobData.date).fromNow()} 
                </p>
            </div>
            </div>
            <div className='flex flex-col items-start justify-between lg:flex-row'>
                <div className='w-full p-6 bg-white rounded-lg shadow lg:w-2/3'>
                    <h2 className='mb-4 text-2xl font-bold'>Job Description</h2>
                    <div className='rich-text' dangerouslySetInnerHTML={{__html:JobData.description}}></div>
                    <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>{isApplied ? 'Already Applied' : 'Apply Now'}</button>
                </div>
                {/* Right Section */}
                <div className='w-full mt-8 ce-y-5 ml- lg:w-1/3 lg:mt-0 lg:ml-8'>
                    <h2 className='p-2 text-2xl font-bold text-center text-black-500'>More Jobs from {JobData.companyId.name}</h2>
                    {jobs.filter(job =>job.id_id!==JobData._id && job.companyId._id === JobData.companyId._id)
                    .filter(job=>{
                        //set of applied jonIds
                        const appliedJobIds = new Set(userApplications.map(item => item.jobId._id && item.jobId._id))
                        //Return true if the job is not in the applied jobIds
                        return !appliedJobIds.has(job._id)
                    }).slice(0,4)
                    .map((job,index) => <JobCard key={index} job={job} className='mt-2 mg-5'/>)}
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
) : (
    <Loading />

)
}
export default ApplyJob
