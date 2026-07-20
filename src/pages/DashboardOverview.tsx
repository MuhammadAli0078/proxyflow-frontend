import { Link } from 'react-router-dom'
import { Globe, BarChart3, ShoppingCart, ArrowUpRight, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { StatCard } from '../components/ui/Card'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/Feedback'
import { RevealOnScroll, PulseDot } from '../components/ui/Animations'
import { mockCredentials, usageHistory } from '../data/mockData'
import { formatDate, getUsagePercent } from '../utils/format'
import { useAuth } from '../hooks/useAuth'

export default function DashboardOverview() {
  const { user } = useAuth()
  const totalUsed = mockCredentials.reduce((sum, c) => sum + c.dataUsedGB, 0)
  const totalLimit = mockCredentials.reduce((sum, c) => sum + c.dataLimitGB, 0)
  const activeCount = mockCredentials.filter((c) => c.status === 'active').length

  return (
    <div className="space-y-8">
      <RevealOnScroll>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
            <p className="text-sm text-muted mt-1">Here's an overview of your proxy services</p>
          </div>
          <Link to="/purchase">
            <Button icon={<ShoppingCart size={16} />}>Buy Package</Button>
          </Link>
        </div>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <RevealOnScroll delay={0.05}>
          <StatCard
            label="Active Proxies"
            value={activeCount}
            icon={<Globe size={20} />}
            trend="+2 this month"
            trendUp
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <StatCard
            label="Data Used"
            value={`${totalUsed.toFixed(1)} GB`}
            icon={<BarChart3 size={20} />}
            trend={`${getUsagePercent(totalUsed, totalLimit)}% of limit`}
            trendUp={getUsagePercent(totalUsed, totalLimit) < 80}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <StatCard
            label="Data Remaining"
            value={`${(totalLimit - totalUsed).toFixed(1)} GB`}
            icon={<Activity size={20} />}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <StatCard
            label="Plan Status"
            value={<span className="flex items-center gap-2"><PulseDot /> Active</span>}
            icon={<ArrowUpRight size={20} />}
            trend="Expires Aug 12, 2026"
            trendUp
          />
        </RevealOnScroll>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <RevealOnScroll delay={0.1} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Usage Overview</h2>
              <Link to="/dashboard/usage" className="text-xs text-brand-yellow hover:underline">
                View details
              </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageHistory}>
                  <defs>
                    <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} unit=" GB" />
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#aaa' }}
                  />
                  <Area type="monotone" dataKey="usageGB" stroke="#22c55e" fill="url(#usageGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <Card className="h-full">
            <h2 className="text-lg font-semibold mb-4">Data Usage</h2>
            <ProgressBar value={totalUsed} max={totalLimit} />
            <div className="mt-6 space-y-3">
              {mockCredentials.map((cred) => (
                <div key={cred.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-light font-mono truncate max-w-[140px]">{cred.username}</span>
                  <span className="text-muted">{cred.dataUsedGB} / {cred.dataLimitGB} GB</span>
                </div>
              ))}
            </div>
          </Card>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.2}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Proxies</h2>
            <Link to="/dashboard/proxies" className="text-xs text-brand-yellow hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted border-b border-border">
                  <th className="text-left py-3 font-medium">Endpoint</th>
                  <th className="text-left py-3 font-medium">Protocol</th>
                  <th className="text-left py-3 font-medium">Usage</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {mockCredentials.map((cred) => (
                  <tr key={cred.id} className="border-b border-border/50 hover:bg-surface-3/50 transition-colors">
                    <td className="py-3 font-mono text-xs">{cred.host}:{cred.port}</td>
                    <td className="py-3 uppercase text-xs">{cred.protocol}</td>
                    <td className="py-3">{cred.dataUsedGB} GB</td>
                    <td className="py-3">
                      <Badge variant={cred.status === 'active' ? 'success' : 'warning'}>{cred.status}</Badge>
                    </td>
                    <td className="py-3 text-muted">{formatDate(cred.expiresAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </RevealOnScroll>
    </div>
  )
}
