import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/apply-job/${job._id}`);
  };

  return (
    <div className='p-6 transition-shadow duration-300 bg-white border shadow-sm rounded-xl hover:shadow-md'>
      {/* Company Logo */}
      <div className='flex items-center justify-between'>
        <img className='object-contain w-auto h-8' src={job.companyId.image} alt={job.companyId.name || 'Company Logo'} />
      </div>

      {/* Job Title */}
      <h4 className='mt-3 text-xl font-semibold text-gray-800'>{job.title}</h4>

      {/* Location & Level */}
      <div className='flex items-center gap-3 mt-2 text-xs sm:text-sm'>
        <span className='bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1.5 rounded-full'>{job.location}</span>
        <span className='bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-full'>{job.level}</span>
      </div>

      {/* Description */}
      <p
        className="mt-4 text-sm text-gray-600 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}
      ></p>

      {/* Action Buttons */}
      <div className='flex gap-4 mt-5 text-sm'>
        <button
          onClick={handleNavigation}
          className='px-4 py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700'
        >
          Apply Now
        </button>
        <button
          onClick={handleNavigation}
          className='px-4 py-2 text-gray-700 transition duration-200 border border-gray-500 rounded hover:bg-gray-100'
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
