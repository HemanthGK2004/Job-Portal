import React, { useContext, useEffect, useState } from 'react'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import JobCard from './JobCard'

const JobList = () => {
    const {isSearched, searchFilter,setSearchFilter,jobs} = useContext(AppContext)
    const [showFilter,setShowFilter] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);

    const[filteredJobs, setFilteredJobs] = useState(jobs)
    const handleCategoryChange = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };
    const handleLocationChange = (location) => {
        setSelectedLocation((prev) =>
            prev.includes(location)
                ? prev.filter((loc) => loc !== location)
                : [...prev, location]
        );
    };
    useEffect(() => {

        const matchedCtaegory = job =>selectedCategory.length=== 0 || selectedCategory.includes(job.category)
        const matchedLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)
        const matchedTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchedLocationSearch = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(job => matchedCtaegory(job) && matchedLocation(job) && matchedTitle(job) && matchedLocationSearch(job))

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [selectedCategory, selectedLocation, searchFilter.title, searchFilter.location, jobs])

return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
        <div className='w-full lg:w-1/4 bg-white px-4'>
            {
                isSearched && (searchFilter.title!== "" || searchFilter.location !== "") &&(
                    <>
                    <h3 className='font-medium text-lg mb-4'>current Search</h3>
                    <div className='mb-4 text-gray-600'>
                        {searchFilter.title && (
                            <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded-full text-sm mr-2'>
                                {searchFilter.title}
                                <img onClick={e=>setSearchFilter(prev =>({...prev,title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                            </span>
                            )}
                        {searchFilter.location && (
                            <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded-full text-sm mr-2'>
                                {searchFilter.location}
                                <img onClick={e=>setSearchFilter(prev =>({...prev,location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                            </span>
                        )}
                    </div>
                    </>
                )
            }

            <button className='px-6 py-1.5 rounded border border-gray-300 text-gray-600 font-medium flex items-center gap-2.5' onClick={e=>setShowFilter(prev => !prev)}>
                {
                    showFilter ? "Close Filters" : "Show Filters"
                }
            </button>
            {/* category filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by categories</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobCategories.map((category, index) => (
                                    <li key={index} className='flex items-center gap-3 my-2'>
                                        <input className='scale-125' type="checkbox" onChange={()=>handleCategoryChange(category)}
                                        checked={selectedCategory.includes(category)} id={category}/>
                                        <label htmlFor={category}>{category}</label>
                                    </li>
                                ))
                            }
                        </ul>
                </div>
                        {/* location filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobLocations.map((location, index) => (
                                    <li key={index} className='flex items-center gap-3 my-2'>
                                        <input className='scale-125' type="checkbox"
                                        onChange={()=>handleLocationChange(location)}
                                        checked={selectedLocation.includes(location)} id={location}/>
                                        <label htmlFor={location}>{location}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                {/** Job List */}
                <section className='w-full lg:w-3/4 bg-white px-4 text-gray-800 max-lg:px-4'>
                    <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                    <p className='mb-8'>Get your desired job from top companies</p>
                    {filteredJobs.length === 0 ? (
                        <p className="text-gray-600 text-center mt-8">No jobs found. Try adjusting your filters.</p>
                        ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                                <JobCard key={index} job={job} />))}
                        </div>
                    )}

                {/* Pagination */}
                {
                    jobs.length > 0 && (
                        <div className='flex items-center justify-center gap-4 mt-10'>
                            <a href="#job-list">
                                <img src={assets.left_arrow_icon} alt="" onClick={()=>setCurrentPage(prev =>Math.max(prev-1,1))} />
                            </a>
                            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                <a href="#job-list" key={index}>
                                <button onClick={() => setCurrentPage(index + 1)}className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 === currentPage? "bg-blue-600 text-white": "text-gray-600 border border-gray-300"
                                }`}>
                                    {index + 1}
                                </button>
                                </a>
                            ))}
                            <a href="#job-list">
                                <img src={assets.right_arrow_icon} alt="" onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))}/>
                            </a>
                        </div>
                    )
                }
                </section>
        </div>
)
}

export default JobList;
