import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import WhyNetrasecure from './components/WhyNetrasecure'
import HowItWorks from './components/HowItWorks'
import ProductShowcase from './components/ProductShowcase'
import TrustSection from './components/TrustSection'
import ChatbotSection from './components/ChatbotSection'
import ScannerSection from './components/ScannerSection'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #1d6fe8 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <section id="features"><Features /></section>
          <section id="security"><WhyNetrasecure /></section>
          <ProductShowcase />
          <HowItWorks />
          <TrustSection />
          <section id="ai-assistant"><ChatbotSection /></section>
          <section id="scanner"><ScannerSection /></section>
          <Testimonials />
          <section id="contact"><ContactForm /></section>
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
