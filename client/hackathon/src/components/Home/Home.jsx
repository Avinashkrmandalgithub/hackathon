import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Hero from '../Hero/Hero.jsx'
import Features from '../Features/Features.jsx'
import Role from '../Role/Role.jsx'
import Work from '../Work/Work.jsx'
import Testimonal from '../Testimonals/Testimonal.jsx'
import Footer from '../Footer/Footer.jsx'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Features />
        <Role />
        <Work />
        <Testimonal />
        <Footer />
    </>
  )
}

export default Home