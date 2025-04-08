import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)

    //     console.log({
    //         title: titleRef.current.value,
    //         location: locationRef.current.value
    //     });
    }

    return (
        <div className='flex flex-col justify-center bg-gray-100 p-10'>
            <div className='container px-4 2xl:px-20 mx-auto flex flex-col items-center gap-4 bg-gradient-to-r from-purple-800 to-purple-950 text-white p-10 rounded-lg shadow-lg'>
                <h1 className='text-3xl sm:text-4xl font-bold text-center'>Find Your Dream Job</h1>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5 text-center'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>

                {/* Search Section */}
                <div className='flex items-center w-full gap-2 flex-wrap sm:flex-nowrap bg-white rounded text-gray-600 max-w-xl px-4 py-2 mx-4 sm:mx-auto'>
                    <div className="flex items-center flex-1">
                        <img className='h-4 sm:h-5 mr-2' src={assets.search_icon} alt="Search Icon" />
                        <input
                            type="text"
                            placeholder='Search for jobs'
                            className='text-xs sm:text-sm p-2 rounded outline-none w-full'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center flex-1'>
                        <img className='h-4 sm:h-5 mr-2' src={assets.location_icon} alt="Location Icon" />
                        <input
                            type="text"
                            placeholder='Search for Location'
                            className='text-xs sm:text-sm p-2 rounded outline-none w-full'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white text-sm'>Search</button>
                </div>
            </div>

            {/* Trusted by section */}
            <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex justify-center'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap items-center'>
                    <p className='font-medium'>Trusted By</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-6' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-6' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-6' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-6' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-6' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    )
}

export default Hero
