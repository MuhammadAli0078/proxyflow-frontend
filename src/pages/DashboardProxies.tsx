import { useState } from 'react'
import { Copy, Check, RefreshCw, Download, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ProgressBar } from '../components/ui/Feedback'
import { RevealOnScroll } from '../components/ui/Animations'
import { Toast as ToastComponent } from '../components/ui/Feedback'
import { mockCredentials } from '../data/mockData'
import { formatDate, formatProxyString } from '../utils/format'

export default function DashboardProxies() {
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [refreshing, setRefreshing] = useState(false)

  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setToast({ visible: true, message: 'Proxy list refreshed!' })
      setTimeout(() => setToast({ visible: false, message: '' }), 2000)
    }, 800)
  }

  const filtered = mockCredentials.filter(
    (c) =>
      c.host.includes(search) ||
      c.username.includes(search) ||
      c.protocol.includes(search)
  )

  const copyProxy = (cred: typeof mockCredentials[0]) => {
    const str = formatProxyString(cred.host, cred.port, cred.username, cred.password, cred.protocol)
    navigator.clipboard.writeText(str)
    setCopiedId(cred.id)
    setToast({ visible: true, message: 'Proxy copied to clipboard!' })
    setTimeout(() => {
      setCopiedId(null)
      setToast({ visible: false, message: '' })
    }, 2000)
  }

  const exportCSV = () => {
    const header = 'Host,Port,Username,Password,Protocol,Status,Data Used,Data Limit,Expires\n'
    const rows = mockCredentials
      .map((c) =>
        `${c.host},${c.port},${c.username},${c.password},${c.protocol},${c.status},${c.dataUsedGB},${c.dataLimitGB},${c.expiresAt}`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'proxies.csv'
    a.click()
    setToast({ visible: true, message: 'CSV exported successfully!' })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  return (
    <div className="space-y-6">
      <ToastComponent message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Proxies</h1>
            <p className="text-sm text-muted mt-1">Manage and copy your proxy credentials</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={<Download size={14} />} onClick={exportCSV}>
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />}
              onClick={refresh}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="relative max-w-md">
          <Input
            placeholder="Search proxies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
      </RevealOnScroll>

      <div className="grid gap-4">
        {filtered.map((cred, i) => (
          <RevealOnScroll key={cred.id} delay={i * 0.05}>
            <Card hover>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={cred.status === 'active' ? 'success' : 'warning'}>
                      {cred.status}
                    </Badge>
                    <span className="text-xs text-muted uppercase">{cred.protocol}</span>
                    <span className="text-xs text-muted">Expires {formatDate(cred.expiresAt)}</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted mb-1">Host</p>
                      <p className="font-mono text-sm">{cred.host}:{cred.port}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Username</p>
                      <p className="font-mono text-sm">{cred.username}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Password</p>
                      <p className="font-mono text-sm">{'•'.repeat(cred.password.length)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Data Usage</p>
                      <ProgressBar value={cred.dataUsedGB} max={cred.dataLimitGB} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <Button
                    size="sm"
                    variant={copiedId === cred.id ? 'secondary' : 'primary'}
                    icon={copiedId === cred.id ? <Check size={14} /> : <Copy size={14} />}
                    onClick={() => copyProxy(cred)}
                  >
                    {copiedId === cred.id ? 'Copied!' : 'Copy Proxy'}
                  </Button>
                </div>
              </div>

              <motion.div
                className="mt-3 p-3 bg-surface-3 rounded-lg font-mono text-xs text-muted-light break-all"
                initial={{ height: 0, opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {formatProxyString(cred.host, cred.port, cred.username, cred.password, cred.protocol)}
              </motion.div>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
