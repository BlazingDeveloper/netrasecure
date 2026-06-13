import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RiBrainLine, RiDashboardLine, RiLockPasswordLine, RiDeviceLine, RiLightbulbLine, RiTimerFlashLine } from 'react-icons/ri'

function Counter({ target, suffix = '' }) {
  const isDecimal = !Number.isInteger(target)
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1200
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const val = isDecimal
            ? parseFloat((p * target).toFixed(1))
            : Math.floor(p * target)
          setCount(val)
          if (p < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, isDecimal])

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}</span>
}

const items = [
  {
    icon: RiBrainLine,
    title: 'AI-Powered Analysis',
    desc: 'Every scan runs through a multi-layer model trained on 50M+ threat samples.',
    stat: 50, statSuffix: 'M+', statLabel: 'Threat Samples',
    color: '#1d6fe8',
    size: 'lg:col-span-2 lg:row-span-2',
    bg: 'from-blue-950/80 to-navy-900/80',
  },
  {
    icon: RiDashboardLine,
    title: 'Unified Dashboard',
    desc: 'One place for URL results, chat history, and security health.',
    color: '#0ea5e9',
    size: '',
    bg: 'from-sky-950/60 to-navy-900/60',
  },
  {
    icon: RiLockPasswordLine,
    title: 'Privacy First',
    desc: 'Your scans and conversations are never stored or sold.',
    stat: 0, statSuffix: '', statLabel: 'Data Sold',
    color: '#22c55e',
    size: '',
    bg: 'from-green-950/60 to-navy-900/60',
  },
  {
    icon: RiDeviceLine,
    title: 'Cross-Device',
    desc: 'Web, mobile, and browser extension — same protection everywhere.',
    color: '#f97316',
    size: '',
    bg: 'from-orange-950/60 to-navy-900/60',
  },
  {
    icon: RiLightbulbLine,
    title: 'Smart Recommendations',
    desc: 'Proactive guidance based on your activity, not generic checklists.',
    color: '#a855f7',
    size: 'lg:col-span-2',
    bg: 'from-purple-950/60 to-navy-900/60',
  },
  {
    icon: RiTimerFlashLine,
    title: 'Fast Threat Detection',
    desc: 'Average response: under 1.8 seconds.',
    stat: 1.8, statSuffix: 's', statLabel: 'Second Avg.',
    color: '#f97316',
    size: '',
    bg: 'from-orange-950/60 to-navy-900/60',
  },
]

export default function WhyNetrasecure() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label mb-4 block">— Why NetraSecure</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-white">Built different.</span>
            <br />
            <span className="gradient-text">Works everywhere.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`${item.size} relative rounded-2xl p-6 overflow-hidden card-hover group cursor-default bg-gradient-to-br ${item.bg} border border-white/5`}
              >
                {/* Background glow */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: item.color }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed flex-1">{item.desc}</p>

                  {item.stat !== undefined && (
                    <div className="mt-auto pt-3 border-t border-white/5">
                      <span className="text-2xl font-bold font-mono" style={{ color: item.color }}>
                        <Counter target={item.stat} suffix={item.statSuffix || ''} />
                      </span>
                      <span className="text-xs text-slate-500 ml-2">{item.statLabel}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
