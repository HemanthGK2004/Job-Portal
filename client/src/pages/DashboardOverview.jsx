import React, { useEffect, useState } from "react";

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalHired: 0,
    applicationsPerJob: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []); // Fetch data once when component mounts

  const fetchDashboardData = async () => {
    try {
      const company = JSON.parse(localStorage.getItem("company")); // Get company data from localStorage
      const token = localStorage.getItem("token");  // Get token from localStorage

      if (!company || !token) {
        throw new Error("Company data or token not found in localStorage");
      }

      const response = await fetch(`/api/company/${company._id}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        console.log("Dashboard Data:", data);  // Make sure the data is coming through correctly
        setDashboardData(data);  // Set the data in state
      } else {
        console.error("Failed to fetch dashboard data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div>
      <h2>Company Dashboard</h2>
      <div>
        <p>Total Jobs: {dashboardData.totalJobs}</p>
        <p>Total Applications: {dashboardData.totalApplications}</p>
        <p>Total Hired: {dashboardData.totalHired}</p>
        <h3>Applications per Job:</h3>
        <ul>
          {dashboardData.applicationsPerJob.map((job) => (
            <li key={job.title}>
              {job.title}: {job.applications} applications
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
