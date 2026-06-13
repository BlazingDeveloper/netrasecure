import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {
  RiScanLine, RiShieldCheckLine, RiAlertLine, RiErrorWarningLine,
  RiLinkM, RiCheckLine, RiCloseLine
} from 'react-icons/ri'

const API_BASE = import.meta.env.VITE_API_URL || ''

const riskConfig = {
  safe: { color: '#22c55e', label: 'Safe', Icon: RiShieldCheckLine, bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  low_risk: { color: '#22c55e', label: 'Low Risk', Icon: RiShieldCheckLine, bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.15)' },
  suspicious: { color: '#f97316', label: 'Suspicious', Icon: RiAlertLine, bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  medium_risk: { color: '#f59e0b', label: 'Medium Risk', Icon: RiAlertLine, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  high_risk: { color: '#ef4444', label: 'High Risk', Icon: RiErrorWarningLine, bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
}

export default function ScannerSection() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const scan = async () => {
    const trimmed = url.trim()
    if (!trimmed) { setError('Please enter a URL to scan.'); return }
    setError('')
    setResult(null)
    setScanning(true)

    try {
      const { data } = await axios.post(`${API_BASE}/scan-url`, { url: trimmed })
      await new Promise(r => setTimeout(r, 1500 + Math.random() * 500)) // UX delay for animation simulating latency
      setResult(data)
      toast.success("URL Analysis Complete")
    } catch {
      setError('Scan failed. Make sure the backend server is running.')
      toast.error('Scan failed')
    } finally {
      setScanning(false)
    }
  }

  const cfg = result ? (riskConfig[result.status] || riskConfig.suspicious) : null

  return (
    <section id="scanner" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Scanner UI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 block">— URL Scanner</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Check before</span>
              <br />
              <span className="gradient-text">you click</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Paste any link — from an email, message, or social post — and get an instant risk assessment.
            </p>

            {/* Input */}
            <div className="glass-light rounded-2xl p-1.5 mb-4 border border-white/5">
              <div className="flex gap-2">
                <div className="flex items-center pl-4 text-slate-500">
                  <RiLinkM size={18} />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && scan()}
                  placeholder="https://example.com"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none py-3"
                />
                <button
                  onClick={scan}
                  disabled={scanning}
                  className="btn-primary flex items-center gap-2 rounded-xl text-sm disabled:opacity-50"
                >
                  {scanning ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                      </svg>
                      Scanning
                    </>
                  ) : (
                    <>
                      <RiScanLine size={16} />
                      Scan
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4 font-mono">{error}</p>}

            {/* Scanning animation */}
            <AnimatePresence>
              {scanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <RiScanLine className="text-blue-400 animate-pulse" size={16} />
                    <span className="text-sm text-slate-300">Analyzing threat signatures...</span>
                  </div>
                  {['Checking SSL certificate', 'Verifying domain reputation', 'Scanning for malware patterns', 'Evaluating phishing signals'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 mb-1.5">
                      <div className="w-3 h-3 rounded-full border border-blue-500/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      </div>
                      <span className="text-xs text-slate-500">{step}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {result && cfg && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl p-5 border"
                  style={{ background: cfg.bg, borderColor: cfg.border }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <cfg.Icon size={22} style={{ color: cfg.color }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{cfg.label}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${cfg.color}20`, color: cfg.color }}>
                          Score: {result.score}/100
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{result.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                    {Object.entries(result.checks || {}).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        {val
                          ? <RiCheckLine size={12} className="text-green-400" />
                          : <RiCloseLine size={12} className="text-red-400" />}
                        <span className="text-slate-400 capitalize">{key.replaceAll('_', ' ')}</span>
                        <span className={val ? 'text-green-400' : 'text-red-400'}>{val ? 'Pass' : 'Fail'}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-500 font-mono">
                    Domain: {result.domain} · {new Date(result.scannedAt).toLocaleTimeString()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-xs text-slate-500 font-mono">EXAMPLE RESULTS</p>
            {[
              { url: 'github.com', status: 'safe', score: 98, label: 'Safe', color: '#22c55e' },
              { url: 'bit.ly/3xHpQ2', status: 'suspicious', score: 42, label: 'Suspicious', color: '#f97316' },
              { url: 'login-verify-bank.net', status: 'high_risk', score: 8, label: 'High Risk', color: '#ef4444' },
            ].map(({ url: u, score, label, color }) => (
              <div key={u} className="glass-light rounded-xl p-4 border border-white/5 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-mono text-slate-300 mb-1 truncate">{u}</div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold" style={{ color }}>{label}</div>
                  <div className="text-[10px] font-mono text-slate-500">{score}/100</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
