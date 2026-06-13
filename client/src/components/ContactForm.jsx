import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { RiSendPlaneLine, RiCheckboxCircleLine, RiMailLine, RiPhoneLine, RiTimeLine } from 'react-icons/ri'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post(`${API_BASE}/contact`, form)
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-200"

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 block">— Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Have a question?</span>
              <br />
              <span className="gradient-text">We're here.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Whether it's a sales question, technical issue, or feedback on a scan result — our team gets back to you within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: RiMailLine, label: 'Email', value: 'support@netrasecure.ai' },
                { icon: RiTimeLine, label: 'Response Time', value: 'Within 24 hours' },
                { icon: RiPhoneLine, label: 'Hours', value: 'Mon–Fri, 9 AM – 6 PM IST' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass-light flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                    <div className="text-sm text-slate-200">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <RiCheckboxCircleLine size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Message sent</h3>
                    <p className="text-slate-400 text-sm max-w-xs">
                      We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 btn-ghost text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5 font-mono">Full Name</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Arjun Mehta"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5 font-mono">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="arjun@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 font-mono">Subject</label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="Question about URL Scanner"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 font-mono">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what you need..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm font-mono">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50"
                    >
                      {loading ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                        </svg>
                      ) : (
                        <RiSendPlaneLine size={16} />
                      )}
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
