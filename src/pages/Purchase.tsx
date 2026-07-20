import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Check, CreditCard, Wallet, Bitcoin, ArrowLeft, Shield, Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PublicLayout } from '../components/layout/DashboardLayout'
import { Footer } from '../components/layout/Footer'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { packages } from '../data/mockData'
import { formatCurrency } from '../utils/format'

type PaymentMethod = 'stripe' | 'paypal' | 'crypto'
type Step = 'select' | 'payment' | 'success'

const paymentMethods = [
  { id: 'stripe' as PaymentMethod, label: 'Credit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, Amex' },
  { id: 'paypal' as PaymentMethod, label: 'PayPal', icon: <Wallet size={20} />, desc: 'Pay with PayPal balance' },
  { id: 'crypto' as PaymentMethod, label: 'Crypto', icon: <Bitcoin size={20} />, desc: 'BTC, ETH, USDT' },
]

export default function Purchase() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('plan')
  const [selectedPkg, setSelectedPkg] = useState(preselected || 'pkg-pro')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [step, setStep] = useState<Step>('select')
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardError, setCardError] = useState('')

  const pkg = packages.find((p) => p.id === selectedPkg) || packages[1]

  const validateCard = () => {
    const digits = cardNumber.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(digits)) return 'Enter a valid card number.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) return 'Expiry must be in MM/YY format.'
    const [, yy] = cardExpiry.trim().split('/')
    const expiryDate = new Date(2000 + Number(yy), Number(cardExpiry.trim().split('/')[0]))
    if (expiryDate < new Date()) return 'Card has expired.'
    if (!/^\d{3,4}$/.test(cardCvc.trim())) return 'Enter a valid CVC.'
    return ''
  }

  const handlePayment = () => {
    if (paymentMethod === 'stripe') {
      const err = validateCard()
      if (err) {
        setCardError(err)
        return
      }
    }
    setCardError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 2000)
  }

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
          </RevealOnScroll>

          {/* Step indicator */}
          <RevealOnScroll delay={0.05}>
            <div className="flex items-center gap-4 mb-10">
              {['Select Plan', 'Payment', 'Complete'].map((label, i) => {
                const stepIndex = step === 'select' ? 0 : step === 'payment' ? 1 : 2
                const active = i <= stepIndex
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      active ? 'bg-brand-yellow text-black' : 'bg-surface-3 text-muted'
                    }`}>
                      {i < stepIndex ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-sm hidden sm:inline ${active ? 'text-white' : 'text-muted'}`}>{label}</span>
                    {i < 2 && <div className={`w-8 h-px ${active ? 'bg-brand-yellow' : 'bg-border'}`} />}
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>

          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div key="select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {packages.map((p) => (
                    <Card
                      key={p.id}
                      hover
                      className={`cursor-pointer transition-all ${selectedPkg === p.id ? 'border-brand-yellow/50 glow-yellow' : ''}`}
                      onClick={() => setSelectedPkg(p.id)}
                    >
                      {p.popular && <div className="mb-2"><Badge variant="yellow">Popular</Badge></div>}
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <p className="text-2xl font-bold mt-2">{formatCurrency(p.price)}</p>
                      <p className="text-xs text-muted mt-1">{p.dataLimitGB} GB / {p.durationDays} days</p>
                      <ul className="mt-4 space-y-1.5">
                        {p.features.slice(0, 3).map((f) => (
                          <li key={f} className="text-xs text-muted-light flex items-center gap-1.5">
                            <Check size={12} className="text-brand-green" /> {f}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                <Button size="lg" onClick={() => setStep('payment')}>Continue to Payment</Button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3 space-y-6">
                    <h1 className="text-2xl font-bold">Payment Method</h1>

                    <div className="grid grid-cols-3 gap-3">
                      {paymentMethods.map((pm) => (
                        <button
                          key={pm.id}
                          onClick={() => { setPaymentMethod(pm.id); setCardError('') }}
                          className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            paymentMethod === pm.id
                              ? 'border-brand-yellow/50 bg-brand-yellow/5'
                              : 'border-border bg-surface-2 hover:border-border-light'
                          }`}
                        >
                          <div className="flex justify-center mb-2 text-brand-yellow">{pm.icon}</div>
                          <p className="text-sm font-medium">{pm.label}</p>
                          <p className="text-xs text-muted mt-0.5">{pm.desc}</p>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === 'stripe' && (
                      <Card>
                        <div className="space-y-4">
                          <Input label="Card Number" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                          <div className="grid grid-cols-2 gap-4">
                            <Input label="Expiry" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                            <Input label="CVC" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
                          </div>
                          {cardError && <p className="text-xs text-danger">{cardError}</p>}
                        </div>
                      </Card>
                    )}

                    {paymentMethod === 'paypal' && (
                      <Card className="text-center py-8">
                        <Wallet size={40} className="mx-auto text-brand-yellow mb-4" />
                        <p className="text-sm text-muted">You will be redirected to PayPal to complete payment</p>
                      </Card>
                    )}

                    {paymentMethod === 'crypto' && (
                      <Card className="text-center py-8">
                        <Bitcoin size={40} className="mx-auto text-brand-yellow mb-4" />
                        <p className="text-sm text-muted mb-2">Send payment to:</p>
                        <p className="font-mono text-xs bg-surface-3 p-3 rounded-lg break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                      </Card>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep('select')}>Back</Button>
                      <Button size="lg" loading={loading} onClick={handlePayment}>
                        Pay {formatCurrency(pkg.price)}
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <Card className="sticky top-24">
                      <h3 className="font-semibold mb-4">Order Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted">{pkg.name} Plan</span>
                          <span>{formatCurrency(pkg.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Data</span>
                          <span>{pkg.dataLimitGB} GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Duration</span>
                          <span>{pkg.durationDays} days</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-brand-yellow">{formatCurrency(pkg.price)}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  className="inline-flex p-4 bg-brand-green/10 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Check size={40} className="text-brand-green" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
                <p className="text-muted-light mb-2">Your {pkg.name} plan has been activated.</p>
                <p className="text-sm text-muted mb-8">
                  Proxies are being created via Proxidize API. Credentials will appear in your dashboard shortly.
                </p>

                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border rounded-lg text-sm mb-8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap size={16} className="text-brand-yellow" />
                  Creating proxies...
                </motion.div>

                <div className="flex justify-center gap-4">
                  <Link to="/dashboard/proxies">
                    <Button icon={<Shield size={16} />}>View Proxies</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </PublicLayout>
  )
}
