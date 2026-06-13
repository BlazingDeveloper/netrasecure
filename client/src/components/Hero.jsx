import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RiArrowRightLine, RiScanLine, RiShieldCheckLine, RiRadarLine, RiEyeLine } from 'react-icons/ri'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1500
        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          setCount(Math.floor(progress * target))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function ShieldVisualization() {
  return (
    <div className="relative w-full h-[480px] flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-900/30 animate-spin-slow" />

      {/* Mid ring with dots */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-700/20" style={{ animation: 'spin 20s linear infinite reverse' }}>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/60"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(138px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Inner pulsing ring */}
      <div className="absolute w-[200px] h-[200px] rounded-full border border-blue-600/30 animate-pulse-slow" />

      {/* Central shield */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-[120px] h-[120px] flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-2xl" style={{ boxShadow: '0 0 60px rgba(29,111,232,0.4)' }} />
        <svg viewBox="0 0 80 90" className="relative z-10 w-20 h-20" fill="none">
          <path
            d="M40 4L8 18v22c0 18.8 13.7 36.4 32 41 18.3-4.6 32-22.2 32-41V18L40 4z"
            fill="url(#shieldGrad)"
            stroke="url(#strokeGrad)"
            strokeWidth="1.5"
          />
          <path
            d="M28 44l8 8 16-16"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="shieldGrad" x1="8" y1="4" x2="72" y2="86" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="strokeGrad" x1="8" y1="4" x2="72" y2="86" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating nodes */}
      {[
        { icon: RiShieldCheckLine, label: 'Protected', color: '#22c55e', x: '-160px', y: '-60px', delay: 0 },
        { icon: RiScanLine, label: 'Scanning', color: '#1d6fe8', x: '140px', y: '-80px', delay: 0.4 },
        { icon: RiRadarLine, label: 'Monitoring', color: '#f97316', x: '-150px', y: '80px', delay: 0.8 },
        { icon: RiEyeLine, label: 'Detection', color: '#a855f7', x: '130px', y: '90px', delay: 1.2 },
      ].map(({ icon: Icon, label, color, x, y, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, duration: 0.5 }}
          className="absolute glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium"
          style={{ transform: `translate(${x}, ${y})` }}
        >
          <Icon style={{ color }} size={14} />
          <span className="text-slate-300">{label}</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
        </motion.div>
      ))}

      {/* Connection lines (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <line x1="50%" y1="50%" x2="20%" y2="38%" stroke="#1d6fe8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="80%" y2="33%" stroke="#1d6fe8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="22%" y2="66%" stroke="#1d6fe8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="78%" y2="70%" stroke="#1d6fe8" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Mini dashboard widget */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-4 right-0 glass rounded-xl p-3 w-44"
      >
        <div className="text-[10px] text-slate-500 mb-2 font-mono">THREAT SCORE</div>
        <div className="flex items-end gap-1 mb-2">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h * 0.4}px`,
                background: i === 5 ? '#1d6fe8' : 'rgba(29,111,232,0.25)',
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-green-400">Safe</span>
          <span className="text-slate-500 font-mono">99.9%</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(29,111,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,111,232,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">AI-Powered Security Platform</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="gradient-text">Cybersecurity</span>
              <br />
              <span className="text-slate-300 font-light">For Everyday Users</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md"
            >
              Analyze suspicious links, detect threats, and receive intelligent security guidance through one unified platform.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a href="#features" className="btn-primary flex items-center gap-2">
                Explore Platform
                <RiArrowRightLine size={16} />
              </a>
              <a href="#scanner" className="btn-ghost flex items-center gap-2">
                <RiScanLine size={16} />
                Try Scanner
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: 10000, suffix: '+', label: 'Scans' },
                { value: 99.9, suffix: '%', label: 'Detection Accuracy' },
                { value: 24, suffix: '/7', label: 'Monitoring' },
              ].map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold text-white font-mono">
                    <AnimatedCounter target={value} suffix={suffix} />
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <ShieldVisualization />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #020817)' }} />
    </section>
  )
}
