import React, { useContext, useEffect, useState } from 'react';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import JobCard from './JobCard';

const JobList = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [showFilter, setShowFilter] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [loading, setLoading] = useState(false);

    const jobsPerPage = 6;
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const handleCategoryChange = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocation((prev) =>
            prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategory([]);
        setSelectedLocation([]);
        setSearchFilter({ title: "", location: "" });
        setCurrentPage(1);
    };

    const scrollToTop = () => {
        const el = document.getElementById("job-list");
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const matchedCategory = (job) =>
                selectedCategory.length === 0 || selectedCategory.includes(job.category);
            const matchedLocation = (job) =>
                selectedLocation.length === 0 || selectedLocation.includes(job.location);
            const matchedTitle = (job) =>
                searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
            const matchedLocationSearch = (job) =>
                searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

            const newFilteredJobs = jobs
                .slice()
                .reverse()
                .filter((job) => matchedCategory(job) && matchedLocation(job) && matchedTitle(job) && matchedLocationSearch(job));

            setFilteredJobs(newFilteredJobs);
            setCurrentPage(1);
            setLoading(false);
        }, 300); // simulate loading delay

        return () => clearTimeout(timer);
    }, [selectedCategory, selectedLocation, searchFilter.title, searchFilter.location, jobs]);

    return (
        <div className='container flex flex-col py-8 mx-auto 2xl:px-20 lg:flex-row max-lg:space-y-8'>
            {/* Sidebar Filters */}
            <div className='w-full px-4 bg-white lg:w-1/4'>
                {(isSearched && (searchFilter.title || searchFilter.location)) || selectedCategory.length || selectedLocation.length ? (
                    <>
                        <h3 className='mb-4 text-lg font-medium'>Current Filters</h3>
                        <div className='flex flex-wrap gap-2 mb-4 text-gray-600'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded-full text-sm'>
                                    {searchFilter.title}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt="Remove title"
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded-full text-sm'>
                                    {searchFilter.location}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt="Remove location"
                                    />
                                </span>
                            )}
                            {selectedCategory.map((cat, i) => (
                                <span key={i} className='inline-flex items-center gap-2.5 bg-green-50 border-green-200 px-4 py-1.5 rounded-full text-sm'>
                                    {cat}
                                </span>
                            ))}
                            {selectedLocation.map((loc, i) => (
                                <span key={i} className='inline-flex items-center gap-2.5 bg-yellow-50 border-yellow-200 px-4 py-1.5 rounded-full text-sm'>
                                    {loc}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={handleClearFilters}
                            className='px-4 py-2 mb-4 text-sm text-white bg-red-500 rounded-md hover:bg-red-600'
                        >
                            Clear All Filters
                        </button>
                    </>
                ) : null}

                <button
                    className='px-6 py-1.5 rounded border border-gray-300 text-gray-600 font-medium flex items-center gap-2.5'
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    {showFilter ? "Close Filters" : "Show Filters"}
                </button>

                {/* Filters */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='py-4 text-lg font-medium'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map((category, index) => (
                            <li key={index} className='flex items-center gap-3 my-2'>
                                <input
                                    className='scale-125'
                                    type="checkbox"
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategory.includes(category)}
                                    id={`category-${category}`}
                                />
                                <label htmlFor={`category-${category}`}>{category}</label>
                            </li>
                        ))}
                    </ul>

                    <h4 className='py-4 text-lg font-medium pt-14'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li key={index} className='flex items-center gap-3 my-2'>
                                <input
                                    className='scale-125'
                                    type="checkbox"
                                    onChange={() => handleLocationChange(location)}
                                    checked={selectedLocation.includes(location)}
                                    id={`location-${location}`}
                                />
                                <label htmlFor={`location-${location}`}>{location}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listing */}
            <section className='w-full px-4 text-gray-800 bg-white lg:w-3/4 max-lg:px-4'>
                <h3 className='py-2 text-3xl font-medium' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>

                {loading ? (
                    <p className="text-center text-gray-600">Loading jobs...</p>
                ) : filteredJobs.length === 0 ? (
                    <p className="mt-8 text-center text-gray-600">No jobs found. Try adjusting your filters.</p>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-gray-500">{filteredJobs.length} job(s) found</p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredJobs
                                .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
                                .map((job, index) => (
                                    <JobCard key={index} job={job} />
                                ))}
                        </div>
                    </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='flex items-center justify-center gap-4 mt-10'>
                        <a href="#job-list">
                            <img
                                src={assets.left_arrow_icon}
                                alt="Previous Page"
                                className={`cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => {
                                    setCurrentPage(prev => Math.max(prev - 1, 1));
                                    scrollToTop();
                                }}
                            />
                        </a>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <a href="#job-list" key={index}>
                                <button
                                    onClick={() => {
                                        setCurrentPage(index + 1);
                                        scrollToTop();
                                    }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 
                                        ${index + 1 === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img
                                src={assets.right_arrow_icon}
                                alt="Next Page"
                                className={`cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => {
                                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                    scrollToTop();
                                }}
                            />
                        </a>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobList;
