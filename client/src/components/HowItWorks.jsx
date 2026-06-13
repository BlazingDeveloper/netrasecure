import React from 'react'
import { motion } from 'framer-motion'
import { RiUploadLine, RiCpuLine, RiBarChartLine, RiCheckboxCircleLine } from 'react-icons/ri'

const steps = [
  {
    num: '01',
    icon: RiUploadLine,
    title: 'Submit URL',
    desc: 'Paste any link or type your security question into the platform.',
    color: '#1d6fe8',
  },
  {
    num: '02',
    icon: RiCpuLine,
    title: 'AI Analysis',
    desc: 'Our model checks domain records, SSL certificates, and threat databases simultaneously.',
    color: '#0ea5e9',
  },
  {
    num: '03',
    icon: RiBarChartLine,
    title: 'Threat Evaluation',
    desc: 'Results are scored on a risk scale with detailed breakdowns for each signal.',
    color: '#f97316',
  },
  {
    num: '04',
    icon: RiCheckboxCircleLine,
    title: 'Recommendations',
    desc: 'Actionable next steps, not a wall of technical output. Know exactly what to do.',
    color: '#22c55e',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">— How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="gradient-text">Four steps.</span>
            <span className="text-white"> Full picture.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #1d6fe8, #0ea5e9, #f97316, #22c55e, transparent)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-[104px] h-[104px] rounded-2xl flex items-center justify-center glass-light transition-all duration-300 group-hover:scale-105"
                      style={{ borderColor: `${step.color}30` }}
                    >
                      {/* Glow bg */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `${step.color}10`, boxShadow: `0 0 30px ${step.color}30` }}
                      />
                      <Icon size={32} style={{ color: step.color }} className="relative z-10" />
                    </div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                      style={{ background: step.color, color: '#020817' }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <span className="font-mono text-xs mb-2" style={{ color: step.color }}>{step.num}</span>
                  <h3 className="font-semibold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
