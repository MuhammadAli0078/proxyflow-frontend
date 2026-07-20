import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { Card, StatCard } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/Feedback'
import { RevealOnScroll } from '../components/ui/Animations'
import { mockCredentials, usageHistory } from '../data/mockData'

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  usage: Math.random() * 0.15 + 0.02,
}))

export default function DashboardUsage() {
  const totalUsed = mockCredentials.reduce((sum, c) => sum + c.dataUsedGB, 0)
  const totalLimit = mockCredentials.reduce((sum, c) => sum + c.dataLimitGB, 0)
  const percent = Math.round((totalUsed / totalLimit) * 100)

  return (
    <div className="space-y-8">
      <RevealOnScroll>
        <div>
          <h1 className="text-2xl font-bold">Usage Monitoring</h1>
          <p className="text-sm text-muted mt-1">Track your bandwidth consumption in real-time</p>
        </div>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-3 gap-4">
        <RevealOnScroll delay={0.05}>
          <StatCard label="Total Used" value={`${totalUsed.toFixed(2)} GB`} icon={<BarChart3 size={20} />} />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <StatCard label="Daily Average" value="0.61 GB" icon={<TrendingUp size={20} />} trend="+12% vs last week" trendUp />
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <StatCard
            label="Limit Warning"
            value={percent > 80 ? 'High' : 'Normal'}
            icon={<AlertTriangle size={20} />}
            trend={percent > 80 ? 'Approaching limit' : 'Within limits'}
            trendUp={percent <= 80}
          />
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.1}>
        <Card>
          <h2 className="text-lg font-semibold mb-2">Overall Data Consumption</h2>
          <ProgressBar value={totalUsed} max={totalLimit} color="auto" />
        </Card>
      </RevealOnScroll>

      <div className="grid lg:grid-cols-2 gap-6">
        <RevealOnScroll delay={0.15}>
          <Card>
            <h2 className="text-lg font-semibold mb-6">Daily Usage (7 days)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageHistory}>
                  <defs>
                    <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5c518" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f5c518" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} unit=" GB" />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="usageGB" stroke="#f5c518" fill="url(#dailyGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <Card>
            <h2 className="text-lg font-semibold mb-6">Hourly Usage (Today)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="hour" stroke="#888" fontSize={10} tickLine={false} interval={3} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} unit=" GB" />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="usage" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.25}>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Per-Proxy Breakdown</h2>
          <div className="space-y-4">
            {mockCredentials.map((cred) => (
              <div key={cred.id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-mono text-muted-light">{cred.username}</span>
                  <span className="text-muted">{cred.dataUsedGB} / {cred.dataLimitGB} GB</span>
                </div>
                <ProgressBar value={cred.dataUsedGB} max={cred.dataLimitGB} showLabel={false} size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </RevealOnScroll>
    </div>
  )
}
