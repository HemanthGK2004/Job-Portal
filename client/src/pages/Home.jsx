import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobList from '../components/JobList'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
        <NavBar />
        <Hero />
        <JobList />
        <AppDownload />
        <Footer />
    </div>
  )
}

export default Home
