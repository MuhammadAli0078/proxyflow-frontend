import { useState } from 'react'
import { Key, RefreshCw, Save, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll, PulseDot } from '../components/ui/Animations'
import { Toast } from '../components/ui/Feedback'
import { mockApiConfig } from '../data/mockData'
import { formatDate } from '../utils/format'

export default function AdminApi() {
  const [token, setToken] = useState(() => localStorage.getItem('proxyflow_api_token') || mockApiConfig.token)
  const [baseUrl] = useState(mockApiConfig.baseUrl)
  const [showToken, setShowToken] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(() => localStorage.getItem('proxyflow_api_last_sync') || mockApiConfig.lastSync)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      const now = new Date().toISOString()
      setLastSync(now)
      localStorage.setItem('proxyflow_api_last_sync', now)
      setToast({ visible: true, message: 'API sync completed successfully!' })
      setTimeout(() => setToast({ visible: false, message: '' }), 2000)
    }, 1500)
  }

  const handleSave = () => {
    localStorage.setItem('proxyflow_api_token', token)
    setToast({ visible: true, message: 'API configuration saved!' })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <Toast message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">API Configuration</h1>
            <p className="text-sm text-muted mt-1">Manage Proxidize API integration settings</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-green">
            <PulseDot /> Connected
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-brand-yellow/10 rounded-lg">
              <Key size={20} className="text-brand-yellow" />
            </div>
            <div>
              <h2 className="font-semibold">Proxidize API</h2>
              <p className="text-xs text-muted">Residential Per GB plan</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input label="Base URL" value={baseUrl} readOnly className="opacity-70" />
            <div>
              <label className="text-sm text-muted-light font-medium mb-1.5 block">Bearer Token</label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 pr-10 text-sm font-mono text-white focus:outline-none focus:border-brand-yellow/50 transition-all"
                />
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white cursor-pointer"
                >
                  {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Input label="Plan" value="Residential Per GB" readOnly className="opacity-70" />
          </div>

          <div className="flex gap-3 mt-6">
            <Button icon={<Save size={16} />} onClick={handleSave}>Save Config</Button>
            <Button variant="outline" icon={<RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />} loading={syncing} onClick={handleSync}>
              Sync Now
            </Button>
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <Card>
          <h2 className="font-semibold mb-4">Connection Status</h2>
          <div className="space-y-3">
            {[
              { label: 'API Endpoint', value: baseUrl, ok: true },
              { label: 'Authentication', value: 'Bearer Token Valid', ok: true },
              { label: 'Plan', value: 'Residential Per GB', ok: true },
              { label: 'Last Sync', value: formatDate(lastSync), ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted">{item.label}</span>
                <span className="text-sm flex items-center gap-2">
                  {item.value}
                  {item.ok && <CheckCircle size={14} className="text-brand-green" />}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <Card>
          <h2 className="font-semibold mb-3">API Endpoints Reference</h2>
          <div className="space-y-2 font-mono text-xs">
            {[
              'POST /proxies — Create proxy',
              'GET /proxies — List proxies',
              'GET /proxies/:id — Get proxy details',
              'DELETE /proxies/:id — Disable proxy',
              'GET /usage — Get usage stats',
            ].map((endpoint) => (
              <div key={endpoint} className="p-2.5 bg-surface-3 rounded-lg text-muted-light">{endpoint}</div>
            ))}
          </div>
        </Card>
      </RevealOnScroll>
    </div>
  )
}
