import React, { createContext, useState } from "react";
// import { jobsData } from "../assets/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 1. Create context
export const AppContext = createContext();

// 2. Provide context to children
export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()
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

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null)
    const [userApplications,setUserApplications] = useState([])

    //

    // 3. Create a function to update the context
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/jobs");
            if (data.success) {
                setJobs(data.jobs);
                console.log("Jobs fetched successfully:", data.jobs);
            }
            else {
                toast.error(data.message || "Failed to fetch jobs.");
                // console.error("Failed to fetch jobs:", data.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Error fetching jobs.");
        }
    }
    //Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const {data}= await axios.get(backendUrl + "/api/company/company", {
                headers: {
                    Authorization: `Bearer ${companyToken}`,
                },
            });
            if (data.success) {
                setCompanyData(data.company);
                console.log("Company data fetched successfully:", data);
            } else {
                toast.error(data.message || "Failed to fetch company data.");
                // console.error("Failed to fetch company data:", data.message);
            }

        } catch (error) {
            toast.error(error.message || "Error fetching company data.");
            // console.error("Error fetching company data:", error.message);
            
        }
    }

    //function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(backendUrl + "/api/users/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                setUserData(data.user);
                console.log("User data fetched successfully:", data);
            } else {
                toast.error(data.message || "Failed to fetch user data.");
                // console.error("Failed to fetch user data:", data.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Error fetching user data.");
            // console.error("Error fetching user data:", error.message);
        }
    }

    const fetchUserApplications = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(backendUrl + "/api/users/applications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                setUserApplications(data.applications);
                console.log("User applications fetched successfully:", data);
            } else {
                toast.error(data.message || "Failed to fetch user applications.");
                // console.error("Failed to fetch user applications:", data.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Error fetching user applications.");
            // console.error("Error fetching user applications:", error.message);
        }
    }
        
    useEffect(() => {
        if(user){
        fetchUserData();
        fetchUserApplications();
        }
    }, [user]);


    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem("companyToken");
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, []);
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    const values = {
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl,
        userData,setUserData,
        userApplications,setUserApplications,
        fetchUserData,fetchUserApplications
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};
