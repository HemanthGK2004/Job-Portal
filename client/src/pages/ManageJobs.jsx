import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Loading from '../components/Loading'
import { AppContext } from '../context/AppContext'


const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs,setJobs]=useState(false)
  const {backendUrl,companyToken}=useContext(AppContext)

  //Function to fetch copamy data
  const fetchCompanyJobs = async () => {
    try {
      const {data}= await axios.get(backendUrl + '/api/company/list-jobs',{
        headers:{
          Authorization: `Bearer ${companyToken}`
        }
      })
      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log("Company jobs fetched successfully:", data.jobsData);
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  //function to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/company/change-visibility',{
        id
      },{
        headers:{
          Authorization: `Bearer ${companyToken}`
        }
      })
      if(data.success){
        toast.success(data.message)
        fetchCompanyJobs()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }
      

  useEffect(() => {
    if(companyToken){
      fetchCompanyJobs()
    }
  }
  ,[companyToken])
  return jobs ?  jobs.length===0 ? (<div className='flex items-center justify-center min-h-[65vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
  </div>):(
    <div className='container max-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>

            <tr>
              <th className='px-4 py-2 text-left border-b max-sm:hidden'>#</th>
              <th className='px-4 py-2 text-left border-b'>Job Title</th>
              <th className='px-4 py-2 text-left border-b max-sm:hidden'>Date</th>
              <th className='px-4 py-2 text-left border-b max-sm:hidden'>Location</th>
              <th className='px-4 py-2 text-center border-b'>Applicants</th>
              <th className='px-4 py-2 text-left border-b'>Visible Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-100'>
                <td className='px-4 py-2 border-b max-sm:hidden'>{index + 1}</td>
                <td className='px-4 py-2 border-b'>{job.title}</td>
                <td className='px-4 py-2 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='px-4 py-2 border-b max-sm:hidden'>{job.location}</td>
                <td className='px-4 py-2 text-center border-b'>{job.applicants}</td>
                <td>
                <input
                  onChange={() => changeJobVisibility(job._id)}
                  className='ml-4 scale-125'
                  type='checkbox'
                    checked={job.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>
        <button onClick={()=>navigate('/dashboard/add-job')}  className='px-4 py-3 bg-blue-600 border border-black rounded-lg'> Add New Job</button>
      </div>

      
    </div>
  ):<Loading />
}

export default ManageJobs
