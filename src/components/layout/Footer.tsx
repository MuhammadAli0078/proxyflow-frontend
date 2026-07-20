import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-brand-yellow" />
              <span className="text-lg font-bold">
                Proxy<span className="text-brand-yellow">Flow</span>
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Automated proxy reselling powered by Proxidize API. Create, manage, and monitor proxies effortlessly.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/purchase" className="hover:text-white transition-colors">Buy Proxy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { label: 'Twitter', href: 'https://twitter.com/proxyflow' },
                { label: 'GitHub', href: 'https://github.com/MuhammadAli0078' },
                { label: 'Email', href: 'mailto:support@proxyflow.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="p-2 bg-surface-3 rounded-lg text-xs text-muted hover:text-brand-yellow hover:bg-surface-4 transition-all duration-200"
                  title={label}
                >
                  {label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">&copy; 2026 ProxyFlow. All rights reserved.</p>
          <p className="text-xs text-muted">Powered by Proxidize API</p>
        </div>
      </div>
    </footer>
  )
}
