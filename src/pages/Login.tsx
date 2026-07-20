import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Shield, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PublicLayout } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { FadeIn } from '../components/ui/Animations'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const success = login(email, password)
      if (success) {
        const isAdmin = email.includes('admin')
        navigate(isAdmin ? '/admin' : '/dashboard')
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px]" />

        <FadeIn className="relative w-full max-w-md">
          <motion.div
            className="bg-surface-2 border border-border rounded-2xl p-8 shadow-2xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-brand-yellow/10 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-brand-yellow" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-sm text-muted">Sign in to your ProxyFlow account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />

              {error && (
                <motion.p
                  className="text-sm text-danger text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              <Button type="submit" className="w-full" loading={loading} icon={<ArrowRight size={16} />}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-3 bg-surface-3 rounded-lg border border-border">
              <p className="text-xs text-muted text-center mb-2">Demo accounts</p>
              <div className="flex flex-col gap-1 text-xs font-mono text-muted-light">
                <button type="button" className="hover:text-brand-yellow transition-colors cursor-pointer text-left" onClick={() => { setEmail('admin@proxyflow.com'); setPassword('demo') }}>
                  admin@proxyflow.com — Admin panel
                </button>
                <button type="button" className="hover:text-brand-yellow transition-colors cursor-pointer text-left" onClick={() => { setEmail('alex@example.com'); setPassword('demo') }}>
                  alex@example.com — Customer dashboard
                </button>
              </div>
            </div>

            <p className="text-sm text-muted text-center mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-yellow hover:underline">
                Register
              </Link>
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </PublicLayout>
  )
}
