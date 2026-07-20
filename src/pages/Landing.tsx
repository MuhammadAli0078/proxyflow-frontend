import { Link } from 'react-router-dom'
import {
  Globe,
  Zap,
  Shield,
  BarChart3,
  CreditCard,
  Mail,
  ArrowRight,
  Check,
  Server,
  Lock,
  RefreshCw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PublicLayout } from '../components/layout/DashboardLayout'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { RevealOnScroll, AnimatedCounter, StaggerContainer, StaggerItem, PulseDot } from '../components/ui/Animations'
import { packages, stats } from '../data/mockData'
import { formatCurrency } from '../utils/format'

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Provisioning',
    description: 'Proxies are created automatically via Proxidize API the moment payment is confirmed.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: '195+ Countries',
    description: 'Residential IPs from real devices worldwide. Pay-as-you-go GB-based pricing.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Usage Monitoring',
    description: 'Real-time bandwidth tracking with alerts before limits are reached.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Auto Disable',
    description: 'Proxies are automatically disabled when data limits expire — no manual work.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Multi-Payment',
    description: 'Accept Stripe, PayPal, and crypto payments with instant verification.',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email Notifications',
    description: 'Automated emails for purchase confirmation, usage alerts, and expiry warnings.',
  },
]

const workflow = [
  { step: '01', title: 'Register', desc: 'Create your account in seconds', icon: <Lock size={20} /> },
  { step: '02', title: 'Buy Package', desc: 'Choose a plan that fits your needs', icon: <CreditCard size={20} /> },
  { step: '03', title: 'Payment', desc: 'Secure checkout with instant verification', icon: <Shield size={20} /> },
  { step: '04', title: 'Get Proxies', desc: 'Credentials delivered instantly', icon: <Server size={20} /> },
  { step: '05', title: 'Monitor', desc: 'Track usage in real-time dashboard', icon: <BarChart3 size={20} /> },
  { step: '06', title: 'Auto Manage', desc: 'Disabled automatically on expiry', icon: <RefreshCw size={20} /> },
]

export default function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-2 border border-border rounded-full text-xs text-muted-light mb-6">
                <PulseDot />
                Powered by Proxidize API
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Automate Your{' '}
                <span className="gradient-text">Proxy Business</span>
              </h1>
              <p className="text-lg text-muted-light leading-relaxed mb-8 max-w-lg">
                Create, manage, and resell residential proxies automatically. From payment to provisioning — fully automated with real-time monitoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Start Free
                  </Button>
                </Link>
                <Link to="/#pricing">
                  <Button variant="outline" size="lg">View Pricing</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border glow-yellow">
                <img
                  src="/images/hero-network.jpg"
                  alt="Global proxy network visualization"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
                        <rect fill="#111" width="600" height="400"/>
                        <circle cx="300" cy="200" r="80" fill="none" stroke="#f5c518" stroke-width="1" opacity="0.3"/>
                        <circle cx="300" cy="200" r="120" fill="none" stroke="#22c55e" stroke-width="1" opacity="0.2"/>
                        <circle cx="300" cy="200" r="160" fill="none" stroke="#f5c518" stroke-width="0.5" opacity="0.1"/>
                        <circle cx="300" cy="200" r="4" fill="#f5c518"/>
                        <circle cx="200" cy="150" r="3" fill="#22c55e"/>
                        <circle cx="400" cy="180" r="3" fill="#22c55e"/>
                        <circle cx="250" cy="280" r="3" fill="#22c55e"/>
                        <circle cx="380" cy="260" r="3" fill="#f5c518"/>
                        <line x1="300" y1="200" x2="200" y2="150" stroke="#333" stroke-width="1"/>
                        <line x1="300" y1="200" x2="400" y2="180" stroke="#333" stroke-width="1"/>
                        <line x1="300" y1="200" x2="250" y2="280" stroke="#333" stroke-width="1"/>
                        <line x1="300" y1="200" x2="380" y2="260" stroke="#333" stroke-width="1"/>
                      </svg>
                    `)
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0/80 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-surface-2 border border-border rounded-xl p-4 shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-green/10 rounded-lg">
                    <Globe className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Active Proxies</p>
                    <p className="text-lg font-bold">{stats.activeProxies.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 bg-surface-2 border border-border rounded-xl p-4 shadow-xl"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-yellow/10 rounded-lg">
                    <Zap className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Uptime SLA</p>
                    <p className="text-lg font-bold">{stats.uptime}%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Customers', value: stats.totalCustomers, suffix: '+' },
              { label: 'Active Proxies', value: stats.activeProxies, suffix: '+' },
              { label: 'Countries', value: stats.countries, suffix: '+' },
              { label: 'Uptime SLA', value: stats.uptime, suffix: '%' },
            ].map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-muted mt-1">{stat.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to <span className="gradient-text">Scale</span>
              </h2>
              <p className="text-muted-light max-w-2xl mx-auto">
                A complete proxy automation platform with customer dashboard, admin panel, and browser extension support.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card hover className="h-full">
                  <div className="p-2.5 bg-brand-yellow/10 rounded-lg w-fit text-brand-yellow mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-24 bg-surface-1 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-light">From registration to proxy delivery in six simple steps</p>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 0.08}>
                <div className="relative p-6 bg-surface-2 border border-border rounded-xl hover:border-brand-yellow/30 transition-colors duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-brand-yellow bg-brand-yellow/10 px-2 py-1 rounded">
                      {item.step}
                    </span>
                    <div className="p-2 bg-surface-3 rounded-lg text-muted-light group-hover:text-brand-yellow transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Simple, Transparent <span className="gradient-text">Pricing</span>
              </h2>
              <p className="text-muted-light">Residential per GB plans — no hidden fees, no monthly commitment</p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <RevealOnScroll key={pkg.id} delay={i * 0.1}>
                <Card
                  className={`relative h-full flex flex-col ${pkg.popular ? 'border-brand-yellow/40 glow-yellow' : ''}`}
                  hover
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-yellow text-black text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted">{pkg.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formatCurrency(pkg.price)}</span>
                    <span className="text-sm text-muted ml-1">/ {pkg.durationDays} days</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-light">
                        <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/purchase">
                    <Button
                      variant={pkg.popular ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-12 text-center">
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[80px]" />
              <div className="relative">
                <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Proxy Sales?</h2>
                <p className="text-muted-light mb-8 max-w-lg mx-auto">
                  Join thousands of customers using ProxyFlow to manage their proxy infrastructure effortlessly.
                </p>
                <Link to="/register">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </PublicLayout>
  )
}
