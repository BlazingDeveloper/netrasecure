import React from 'react'
import { motion } from 'framer-motion'
import { RiShieldLine, RiLockLine, RiBuildingLine, RiRocketLine, RiServerLine } from 'react-icons/ri'

const badges = [
  { icon: RiShieldLine, title: 'Security-First Architecture', desc: 'Built with zero-trust principles from day one.' },
  { icon: RiLockLine, title: 'Privacy Protected', desc: 'No scan data retained. No user activity sold.' },
  { icon: RiBuildingLine, title: 'MCA Registered', desc: 'Legally incorporated entity, fully compliant.' },
  { icon: RiRocketLine, title: 'Startup Ready', desc: 'Infrastructure scales from individual to team use.' },
  { icon: RiServerLine, title: 'Encrypted Infrastructure', desc: 'TLS 1.3 end-to-end. AES-256 at rest.' },
]

export default function TrustSection() {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">— Trust & Compliance</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-white">Security doesn't stop</span>
            <br />
            <span className="gradient-text">at the feature list</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            The infrastructure protecting your data is held to the same standard as the tools protecting your links.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`glass-light rounded-2xl p-5 flex gap-4 items-start card-hover ${i === 4 ? 'lg:col-span-1 sm:col-span-2 lg:col-start-2' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{b.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {['#StartupIndia', 'MCA Registered', 'TLS 1.3', 'AES-256', 'GDPR Aligned'].map((tag) => (
            <div key={tag} className="glass px-4 py-2 rounded-full text-xs text-slate-400 border border-white/5 font-mono">
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
