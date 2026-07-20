import { Users, Globe, DollarSign, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { StatCard, Card, Badge } from '../components/ui/Card'
import { RevealOnScroll, PulseDot } from '../components/ui/Animations'
import { mockTransactions, stats } from '../data/mockData'
import { formatCurrency, formatRelativeTime } from '../utils/format'

const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6200 },
  { month: 'May', revenue: 7100 },
  { month: 'Jun', revenue: 8400 },
  { month: 'Jul', revenue: 9200 },
]

export default function AdminOverview() {
  const totalRevenue = mockTransactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-8">
      <RevealOnScroll>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted mt-1">System overview and key metrics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-green">
            <PulseDot /> API Connected
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <RevealOnScroll delay={0.05}>
          <StatCard label="Total Customers" value={stats.totalCustomers.toLocaleString()} icon={<Users size={20} />} trend="+48 this month" trendUp />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <StatCard label="Active Proxies" value={stats.activeProxies.toLocaleString()} icon={<Globe size={20} />} trend="+127 this week" trendUp />
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <StatCard label="Revenue (MTD)" value={formatCurrency(totalRevenue)} icon={<DollarSign size={20} />} trend="+18% vs last month" trendUp />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <StatCard label="Growth Rate" value="12.4%" icon={<TrendingUp size={20} />} trend="Monthly average" trendUp />
        </RevealOnScroll>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <RevealOnScroll delay={0.1} className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-6">Revenue Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5c518" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f5c518" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`$${v}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#f5c518" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {mockTransactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{tx.userName}</p>
                    <p className="text-xs text-muted">{tx.packageName} · {formatRelativeTime(tx.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(tx.amount)}</p>
                    <Badge variant={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </RevealOnScroll>
      </div>
    </div>
  )
}
