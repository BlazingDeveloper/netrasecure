import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { RiRobotLine, RiSendPlaneLine, RiUserLine } from 'react-icons/ri'

const API_BASE = import.meta.env.VITE_API_URL || ''

const suggestions = [
  'How do I spot a phishing email?',
  'Is using public Wi-Fi safe?',
  'What makes a strong password?',
  'How does 2FA protect me?',
]

export default function ChatbotSection() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm NetraSecure AI. Ask me anything about staying safe online — phishing, passwords, VPNs, two-factor auth, or anything else security-related." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const { data } = await axios.post(`${API_BASE}/chat`, { message: msg })
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Couldn't reach the server. Make sure the backend is running." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 block">— AI Security Assistant</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Security answers,</span>
              <br />
              <span className="gradient-text">not just alerts</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Most security tools tell you something is wrong. Ours explains why, and what to do about it — in plain language.
            </p>

            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-mono mb-3">TRY ASKING ABOUT</p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full text-left glass-light rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-white hover:border-blue-500/30 transition-all duration-200 card-hover"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass rounded-2xl overflow-hidden border border-blue-900/20 shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <RiRobotLine size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">NetraSecure AI</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Online — Security Assistant
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <RiRobotLine size={12} className="text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600/25 text-white rounded-tr-none'
                          : 'glass-light text-slate-300 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <RiUserLine size={12} className="text-slate-400" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {loading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center">
                      <RiRobotLine size={12} className="text-blue-400" />
                    </div>
                    <div className="glass-light rounded-2xl rounded-tl-none px-4 py-3">
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                            style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="glass-light rounded-xl flex items-center gap-2 px-4 py-2.5">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask a security question..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 flex items-center justify-center transition-colors"
                  >
                    <RiSendPlaneLine size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
