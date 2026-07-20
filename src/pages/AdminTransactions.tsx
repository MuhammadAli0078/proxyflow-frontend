import { Search } from 'lucide-react'
import { useState } from 'react'
import { Card, Badge } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { mockTransactions } from '../data/mockData'
import { formatCurrency, formatDate } from '../utils/format'

export default function AdminTransactions() {
  const [search, setSearch] = useState('')

  const filtered = mockTransactions.filter(
    (t) =>
      t.userName.toLowerCase().includes(search.toLowerCase()) ||
      t.packageName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  )

  const statusVariant = (status: string) => {
    if (status === 'completed') return 'success' as const
    if (status === 'pending') return 'warning' as const
    return 'danger' as const
  }

  return (
    <div className="space-y-6">
      <RevealOnScroll>
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-muted mt-1">Payment history and verification status</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="max-w-md">
          <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search size={16} />} />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Package</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Method</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-surface-3/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{tx.id}</td>
                    <td className="py-3 px-4">{tx.userName}</td>
                    <td className="py-3 px-4">{tx.packageName}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(tx.amount)}</td>
                    <td className="py-3 px-4 capitalize">{tx.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusVariant(tx.status)}>{tx.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted">{formatDate(tx.createdAt)}</td>
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
