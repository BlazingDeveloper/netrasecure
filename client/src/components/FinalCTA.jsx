import React from 'react'
import { motion } from 'framer-motion'
import { RiArrowRightLine, RiMailLine } from 'react-icons/ri'

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-3xl px-8 py-16 sm:px-16 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1d6fe8, transparent)' }} />
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(29,111,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(29,111,232,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10">
            <span className="section-label mb-6 block justify-center">— Start Today</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Protect Your</span>
              <br />
              <span className="gradient-text">Digital Future</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Stay informed, stay secure, and make safer decisions online with AI-powered cybersecurity tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#scanner" className="btn-primary flex items-center gap-2 px-8 py-3.5">
                Get Started
                <RiArrowRightLine size={16} />
              </a>
              <a href="#contact" className="btn-ghost flex items-center gap-2 px-8 py-3.5">
                <RiMailLine size={16} />
                Contact Team
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
