import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Shield, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PublicLayout } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { FadeIn } from '../components/ui/Animations'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setTimeout(() => {
      register(name, email, password)
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px]" />

        <FadeIn className="relative w-full max-w-md">
          <motion.div
            className="bg-surface-2 border border-border rounded-2xl p-8 shadow-2xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-brand-green/10 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-sm text-muted">Start automating your proxy access today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={16} />}
                required
              />
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Create Account
              </Button>
            </form>

            <p className="text-sm text-muted text-center mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-yellow hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </PublicLayout>
  )
}
