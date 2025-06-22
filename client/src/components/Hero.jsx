import React, { useContext, useRef, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const jobPlaceholders = ["Frontend Developer", "Software Engineer", "UI/UX Designer", "Data Scientist"];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    // Rotate placeholder every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % jobPlaceholders.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const onSearch = () => {
        const title = titleRef.current.value.trim();
        const location = locationRef.current.value.trim();

        if (!title && !location) {
            alert("Please enter a job title or location to search.");
            return;
        }

        setSearchFilter({ title, location });
        setIsSearched(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className='flex flex-col justify-center p-10 bg-gray-100'>
            {/* Hero Text and Search */}
            <div className='container flex flex-col items-center gap-4 p-10 px-4 mx-auto text-white rounded-lg shadow-lg 2xl:px-20 bg-gradient-to-r from-purple-800 to-purple-950'>
                <h1 className='text-3xl font-bold text-center sm:text-4xl'>Find Your Dream Job</h1>
                <h2 className='mb-4 text-2xl font-medium md:text-3xl lg:text-4xl'>Over 10,000+ jobs to apply</h2>
                <p className='max-w-xl px-5 mx-auto mb-8 text-sm font-light text-center'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>

                {/* Search Section */}
                <div className='flex flex-wrap items-center w-full max-w-xl gap-2 px-4 py-2 mx-4 mt-4 text-gray-600 bg-white rounded sm:flex-nowrap sm:mx-auto sm:mt-0'>
                    <div className="flex items-center flex-1">
                        <img className='h-4 mr-2 sm:h-5' src={assets.search_icon} alt="Search Icon" />
                        <input
                            type="text"
                            placeholder={`e.g. ${jobPlaceholders[placeholderIndex]}`}
                            className='w-full p-2 text-xs rounded outline-none sm:text-sm'
                            ref={titleRef}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='flex items-center flex-1'>
                        <img className='h-4 mr-2 sm:h-5' src={assets.location_icon} alt="Location Icon" />
                        <input
                            type="text"
                            placeholder='Search for Location'
                            className='w-full p-2 text-xs rounded outline-none sm:text-sm'
                            ref={locationRef}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button onClick={onSearch} className='px-6 py-2 text-sm text-white bg-blue-600 rounded'>Search</button>
                </div>
            </div>

            {/* Trusted by section */}
            <div className='flex justify-center p-6 mx-2 mt-5 border border-gray-300 rounded-md shadow-md'>
                <div className='flex flex-wrap items-center justify-center gap-10 lg:gap-16'>
                    <p className='font-medium'>Trusted By</p>
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-6 transition-transform duration-300 hover:scale-105' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
