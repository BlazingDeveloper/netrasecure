import React from 'react'
import { motion } from 'framer-motion'
import {
  RiRobotLine, RiScanLine, RiBugLine, RiSmartphoneLine,
  RiEyeOffLine, RiRadarLine
} from 'react-icons/ri'

const features = [
  {
    icon: RiRobotLine,
    title: 'AI Assistant',
    desc: 'Get contextual cybersecurity guidance on demand. Ask about phishing patterns, safe browsing, or incident response — it knows the difference.',
    color: '#1d6fe8',
    accent: 'rgba(29,111,232,0.1)',
    span: 'lg:col-span-2',
  },
  {
    icon: RiScanLine,
    title: 'URL Scanner',
    desc: 'Paste any link before you click it. Our analysis checks domain reputation, SSL validity, and known malware signatures in under two seconds.',
    color: '#0ea5e9',
    accent: 'rgba(14,165,233,0.08)',
    span: '',
  },
  {
    icon: RiBugLine,
    title: 'Threat Detection',
    desc: 'Behavioral analysis and pattern recognition that flags anomalies before they escalate. Updated threat signatures every six hours.',
    color: '#f97316',
    accent: 'rgba(249,115,22,0.08)',
    span: '',
  },
  {
    icon: RiSmartphoneLine,
    title: 'Mobile Security',
    desc: 'Protection that follows you. App permission auditing, network monitoring, and safe browsing on every device.',
    color: '#22c55e',
    accent: 'rgba(34,197,94,0.08)',
    span: '',
  },
  {
    icon: RiEyeOffLine,
    title: 'Deepfake Detection',
    desc: 'Verify images and video content against AI-generated media signatures. Useful for journalists, HR teams, and security researchers.',
    color: '#a855f7',
    accent: 'rgba(168,85,247,0.08)',
    span: '',
  },
  {
    icon: RiRadarLine,
    title: 'Real-Time Monitoring',
    desc: 'Continuous background scanning with instant alerts. No manual checks, no missed threats, no waiting for a scheduled scan.',
    color: '#1d6fe8',
    accent: 'rgba(29,111,232,0.08)',
    span: 'lg:col-span-2',
  },
]

export default function Features() {
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
          <span className="section-label mb-4 block">— Platform Capabilities</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Security tools that actually</span>
            <br />
            <span className="gradient-text">make sense to use</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Built for people who aren't security experts, and capable enough for those who are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${f.span} glass-light rounded-2xl p-6 card-hover group cursor-default`}
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: f.accent, boxShadow: `0 0 20px ${f.color}20` }}
                >
                  <Icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-base">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>

                {/* Hover glow line */}
                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
