import React from 'react'
import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiAlertLine, RiCheckLine, RiRobotLine } from 'react-icons/ri'

function DashboardPreview() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-blue-900/20 shadow-2xl shadow-black/60">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <div className="flex-1 flex justify-center">
          <div className="glass-light rounded-md px-3 py-0.5 text-[10px] text-slate-500 font-mono">
            app.netrasecure.ai/dashboard
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3">
        {/* Security Score */}
        <div className="glass-light rounded-xl p-3 flex flex-col items-center">
          <span className="text-[10px] text-slate-500 mb-2">Security Score</span>
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(29,111,232,0.15)" strokeWidth="6" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#1d6fe8" strokeWidth="6"
                strokeDasharray="163.4" strokeDashoffset="16" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white font-mono">94</span>
            </div>
          </div>
          <span className="text-[10px] text-green-400 mt-1">Excellent</span>
        </div>

        {/* Threat counts */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {[
            { label: 'Threats Blocked', val: '1,284', color: '#1d6fe8' },
            { label: 'URLs Scanned', val: '8,392', color: '#0ea5e9' },
            { label: 'High Risk', val: '12', color: '#f97316' },
            { label: 'Safe', val: '8,380', color: '#22c55e' },
          ].map(({ label, val, color }) => (
            <div key={label} className="glass-light rounded-lg p-2">
              <div className="text-[10px] text-slate-500 mb-1">{label}</div>
              <div className="font-bold font-mono text-sm" style={{ color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Recent scans */}
        <div className="col-span-3 glass-light rounded-xl p-3">
          <div className="text-[10px] text-slate-500 mb-2 font-mono">RECENT SCANS</div>
          {[
            { url: 'github.com/user/repo', status: 'Safe', color: '#22c55e', icon: RiCheckLine },
            { url: 'bit.ly/3xTR8pq', status: 'Suspicious', color: '#f97316', icon: RiAlertLine },
            { url: 'google.com/search', status: 'Safe', color: '#22c55e', icon: RiShieldCheckLine },
          ].map(({ url, status, color, icon: Icon }) => (
            <div key={url} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-[10px] text-slate-400 font-mono truncate flex-1">{url}</span>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <Icon size={10} style={{ color }} />
                <span className="text-[10px]" style={{ color }}>{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatPreview() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-blue-900/20">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center">
          <RiRobotLine size={14} className="text-blue-400" />
        </div>
        <div>
          <div className="text-xs font-medium text-white">Security AI</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 text-xs">
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center">
            <RiRobotLine size={10} className="text-blue-400" />
          </div>
          <div className="glass-light rounded-xl rounded-tl-none px-3 py-2 max-w-[80%]">
            <p className="text-slate-300 text-[11px]">Hello! How can I help you stay secure today?</p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <div className="bg-blue-600/20 rounded-xl rounded-tr-none px-3 py-2 max-w-[80%]">
            <p className="text-slate-300 text-[11px]">Is this email link safe to click?</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center">
            <RiRobotLine size={10} className="text-blue-400" />
          </div>
          <div className="glass-light rounded-xl rounded-tl-none px-3 py-2 max-w-[80%]">
            <p className="text-slate-300 text-[11px]">Paste the URL and I'll scan it. Also check: does the sender domain match exactly?</p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center">
            <RiRobotLine size={10} className="text-blue-400" />
          </div>
          <div className="glass-light rounded-xl rounded-tl-none px-3 py-2">
            <div className="flex gap-1 items-center h-3">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
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
          <span className="section-label mb-4 block">— Platform Preview</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-white">What you see when</span>
            <br />
            <span className="gradient-text">you log in</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            Clean information architecture. No dashboard overload, just the signals that matter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <DashboardPreview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <ChatPreview />

            {/* Mobile preview placeholder */}
            <div className="glass-light rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-slate-500 font-mono mb-3">MOBILE — QUICK SCAN</div>
              <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                <div className="flex-1 text-sm font-mono text-slate-400 truncate">https://example-link.com</div>
                <div className="flex-shrink-0 flex items-center gap-1.5 text-green-400 text-xs">
                  <RiShieldCheckLine size={14} />
                  Safe
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {['SSL ✓', 'Clean ✓', 'Rep. ✓', 'Safe ✓'].map(t => (
                  <div key={t} className="glass rounded-lg py-1.5 text-center text-[10px] text-green-400">{t}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
