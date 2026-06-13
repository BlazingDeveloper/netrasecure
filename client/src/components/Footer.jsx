import React from 'react'
import { RiShieldLine, RiGithubLine, RiTwitterLine, RiLinkedinLine } from 'react-icons/ri'

const nav = {
  Product: ['URL Scanner', 'AI Assistant', 'Threat Detection', 'Mobile Security', 'Deepfake Detection'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Changelog'],
  Contact: ['support@netrasecure.ai', 'operations@anantnetra.com', 'Mon–Fri 9–6 IST'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <RiShieldLine className="text-blue-400" size={14} />
              </div>
              <span className="font-semibold text-sm">
                <span className="text-white">Netra</span>
                <span className="text-blue-400">Secure</span>
                <span className="text-slate-500 font-normal"> AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              AI-powered cybersecurity for students, professionals, and small teams.
            </p>
            <div className="flex gap-3">
              {[RiGithubLine, RiTwitterLine, RiLinkedinLine].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg glass-light flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AnantNetra Technologies. CIN: U62099RJ2026PTC112881
          </p>
          <div className="flex gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
