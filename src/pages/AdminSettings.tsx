import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { Toast } from '../components/ui/Feedback'

const STORAGE_KEY = 'proxyflow_admin_settings'

export default function AdminSettings() {
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
      return {}
    }
  })()

  const [siteName, setSiteName] = useState(stored.siteName ?? 'ProxyFlow')
  const [supportEmail, setSupportEmail] = useState(stored.supportEmail ?? 'support@proxyflow.com')
  const [autoDisable, setAutoDisable] = useState(stored.autoDisable ?? true)
  const [emailNotifications, setEmailNotifications] = useState(stored.emailNotifications ?? true)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ siteName, supportEmail, autoDisable, emailNotifications }))
    setToast({ visible: true, message: 'Admin settings saved!' })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <Toast message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div>
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p className="text-sm text-muted mt-1">Configure system-wide settings</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <Card>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings size={18} className="text-brand-yellow" /> General
          </h2>
          <div className="space-y-4">
            <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            <Input label="Support Email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Automation</h2>
          <div className="space-y-4">
            {[
              { label: 'Auto-disable on limit', desc: 'Automatically disable proxies when data limit is reached', state: autoDisable, set: setAutoDisable },
              { label: 'Email notifications', desc: 'Send automated emails for purchases and expiry', state: emailNotifications, set: setEmailNotifications },
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
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${item.state ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </RevealOnScroll>

      <Button icon={<Save size={16} />} onClick={handleSave}>Save Settings</Button>
    </div>
  )
}
