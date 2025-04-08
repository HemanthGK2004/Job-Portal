import React, { createContext, useState } from "react";
// import { jobsData } from "../assets/assets";
import { useEffect } from "react";
import { jobsData } from "../assets/assets";

// 1. Create context
export const AppContext = createContext();

// 2. Provide context to children
export const AppContextProvider = ({ children }) => {
    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: "",
        // You can uncomment these if needed later
        // jobType: "",
        // salary: "",
        // experience: "",
        // datePosted: "",
    });

    const [isSearched, setIsSearched] = useState(false)

    const [jobs,setJobs] = useState([])
    
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    // 3. Create a function to update the context
    const fetchJobs = async () => {
        setJobs(jobsData)
    }
    useEffect(() => {
        fetchJobs();
    }, []);

    const values = {
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};
