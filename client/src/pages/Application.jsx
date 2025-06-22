import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { AppContext } from '../context/AppContext';

const Application = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEditing(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto flex flex-col gap-4 my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex flex-wrap gap-2 mt-3 mb-6'>
          {isEditing || (userData && userData.resume === '') ? (
            <>
              <label className='flex items-center' htmlFor='resumeUpload'>
                <p className='px-4 py-2 mr-2 text-blue-600 bg-blue-100 rounded-lg'>{resume ? resume.name : 'Select Resume'}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
                <img src={assets.profile_upload_icon} alt='upload icon' />
              </label>
              <button onClick={updateResume} className='px-4 py-2 bg-green-100 border border-black rounded'>
                Save
              </button>
            </>
          ) : (
            <div className='flex flex-wrap gap-2'>
              <a
                href={userData.resume}
                target='_blank'
                rel='noopener noreferrer'
                className='px-4 py-2 font-medium text-blue-600 bg-blue-100 rounded'>
                Resume
              </a>
              <button onClick={() => setIsEditing(true)} className='px-4 py-2 text-gray-500 border border-gray-300 rounded'>
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className='mb-4 text-xl font-semibold'>Applied Jobs</h2>

        {/* Table for medium and larger screens */}
        <div className='w-full overflow-x-auto'>
  <table className='min-w-full bg-white border rounded-lg'>
    <thead>
      <tr className='bg-gray-100'>
        <th className='px-4 py-3 text-sm text-left border-b'>Company</th>
        <th className='px-4 py-3 text-sm text-left border-b'>Job Title</th>
        <th className='px-4 py-3 text-sm text-left border-b max-sm:hidden'>Location</th>
        <th className='px-4 py-3 text-sm text-left border-b max-sm:hidden'>Date</th>
        <th className='px-4 py-3 text-sm text-left border-b'>Status</th>
      </tr>
    </thead>
    <tbody>
      {userApplications.map((job, index) => (
        <tr key={index} className='text-gray-700 hover:bg-gray-50'>
          <td className='flex items-center gap-2 px-4 py-3 border-b'>
            <img className='w-8 h-8 rounded-full' src={job.companyId.image} alt="" />
            <span className='text-sm'>{job.companyId.name}</span>
          </td>
          <td className='px-4 py-2 text-sm border-b'>{job.jobId.title}</td>
          <td className='px-4 py-2 text-sm border-b max-sm:hidden'>{job.jobId.location}</td>
          <td className='px-4 py-2 text-sm border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
          <td className='px-4 py-2 text-sm border-b'>
            <span className={`px-3 py-1 rounded-full text-xs font-medium
              ${job.status === "Accepted" ? "bg-green-100 text-green-600"
              : job.status === "Rejected" ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"}`}>
              {job.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Card view for mobile */}
        <div className='flex flex-col gap-4 md:hidden'>
          {userApplications.map((job, index) => (
            <div key={index} className='p-4 bg-white border rounded-lg shadow-sm'>
              <div className='flex items-center gap-3 mb-2'>
                <img className='w-10 h-10 rounded' src={job.companyId.image} alt='' />
                <div>
                  <p className='font-semibold text-gray-800'>{job.companyId.name}</p>
                  <p className='text-sm text-gray-500'>{job.jobId.title}</p>
                </div>
              </div>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Location:</span> {job.jobId.location}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Date:</span> {moment(job.date).format('ll')}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Status:</span>{' '}
                <span
                  className={`${
                    job.status === 'Accepted'
                      ? 'bg-green-100 text-green-600'
                      : job.status === 'Rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  } px-3 py-1 rounded inline-block`}>
                  {job.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
