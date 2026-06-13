import React from 'react'
import { motion } from 'framer-motion'
import { RiStarFill } from 'react-icons/ri'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'CS Student, IIT Bombay',
    text: "I used to just Google links and hope for the best. NetraSecure gives me an actual answer with evidence behind it. The URL scanner flagged a phishing link from a scholarship scam I almost clicked.",
    rating: 5,
    avatar: 'AM',
    color: '#1d6fe8',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, EduTech Startup',
    text: "We use it for vetting links in customer support tickets. Our team doesn't have a security background, and the AI assistant explains things in a way that actually makes sense to non-technical people.",
    rating: 5,
    avatar: 'PN',
    color: '#0ea5e9',
  },
  {
    name: 'Ravi Shankar',
    role: 'Freelance Developer',
    text: "Clients send me all sorts of links and documents. Having a quick way to sanity-check something before opening it is honestly just good practice. Does what it says, no bloat.",
    rating: 4,
    avatar: 'RS',
    color: '#f97316',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">— What Users Say</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="gradient-text">Trusted by Security</span>
            <span className="text-white"> Engineering Teams</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-light rounded-2xl p-6 card-hover flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <RiStarFill key={i} size={13} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `${t.color}30`, border: `1px solid ${t.color}30` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
