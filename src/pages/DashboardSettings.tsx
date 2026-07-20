import { useState } from 'react'
import { User, Mail, Bell, Shield, Save } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { Toast } from '../components/ui/Feedback'
import { useAuth } from '../hooks/useAuth'

const NOTIF_KEY = 'proxyflow_notif_prefs'

export default function DashboardSettings() {
  const { user, updateProfile } = useAuth()
  const storedNotifs = (() => {
    try {
      return JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}')
    } catch {
      return {}
    }
  })()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [emailNotifs, setEmailNotifs] = useState(storedNotifs.emailNotifs ?? true)
  const [usageAlerts, setUsageAlerts] = useState(storedNotifs.usageAlerts ?? true)
  const [expiryAlerts, setExpiryAlerts] = useState(storedNotifs.expiryAlerts ?? true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setError('Enter a valid name and email.')
      return
    }
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        setError('Enter both your current and new password to change it.')
        return
      }
      if (newPassword.length < 8) {
        setError('New password must be at least 8 characters.')
        return
      }
    }
    setError('')
    updateProfile({ name: name.trim(), email: email.trim() })
    localStorage.setItem(NOTIF_KEY, JSON.stringify({ emailNotifs, usageAlerts, expiryAlerts }))
    setCurrentPassword('')
    setNewPassword('')
    setToast({ visible: true, message: 'Settings saved successfully!' })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <Toast message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted mt-1">Manage your account and notification preferences</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <Card>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={18} className="text-brand-yellow" /> Profile
          </h2>
          <div className="space-y-4">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} icon={<User size={16} />} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={16} />} />
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <Card>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-brand-yellow" /> Notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Receive emails for important account updates', state: emailNotifs, set: setEmailNotifs },
              { label: 'Usage alerts', desc: 'Get notified when reaching 80% of data limit', state: usageAlerts, set: setUsageAlerts },
              { label: 'Expiry warnings', desc: 'Alert 3 days before proxy expiration', state: expiryAlerts, set: setExpiryAlerts },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.set(!item.state)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    item.state ? 'bg-brand-green' : 'bg-surface-4'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      item.state ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <Card>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield size={18} className="text-brand-yellow" /> Security
          </h2>
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              icon={<Shield size={16} />}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              icon={<Shield size={16} />}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>
        </Card>
      </RevealOnScroll>

      <Button icon={<Save size={16} />} onClick={handleSave}>Save Changes</Button>
    </div>
  )
}
