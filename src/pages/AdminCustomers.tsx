import { useState } from 'react'
import { Search, MoreVertical, UserPlus, Ban, CheckCircle, Trash2 } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { Modal, Toast } from '../components/ui/Feedback'
import { mockCustomers } from '../data/mockData'
import { formatDate } from '../utils/format'
import type { User } from '../types'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<User[]>(mockCustomers)
  const [search, setSearch] = useState('')
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '' })

  const notify = (message: string) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  const statusVariant = (status: string) => {
    if (status === 'active') return 'success' as const
    if (status === 'inactive') return 'neutral' as const
    return 'danger' as const
  }

  const toggleSuspend = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' } : c))
    )
    setMenuOpenId(null)
    notify('Customer status updated')
  }

  const removeCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
    setMenuOpenId(null)
    notify('Customer removed')
  }

  const addCustomer = () => {
    if (!newName.trim() || !newEmail.trim() || !newEmail.includes('@')) {
      setFormError('Enter a valid name and email.')
      return
    }
    setCustomers((prev) => [
      {
        id: `u-${Date.now()}`,
        name: newName.trim(),
        email: newEmail.trim(),
        role: 'customer',
        createdAt: new Date().toISOString(),
        status: 'active',
      },
      ...prev,
    ])
    setNewName('')
    setNewEmail('')
    setFormError('')
    setAddOpen(false)
    notify('Customer added successfully!')
  }

  return (
    <div className="space-y-6">
      <Toast message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-sm text-muted mt-1">Manage registered customer accounts</p>
          </div>
          <Button size="sm" icon={<UserPlus size={14} />} onClick={() => setAddOpen(true)}>Add Customer</Button>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="max-w-md">
          <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search size={16} />} />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-surface-3/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-muted-light">{customer.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusVariant(customer.status)}>{customer.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted">{formatDate(customer.createdAt)}</td>
                    <td className="py-3 px-4 capitalize">{customer.role}</td>
                    <td className="py-3 px-4 relative">
                      <button
                        className="text-muted hover:text-white cursor-pointer"
                        onClick={() => setMenuOpenId(menuOpenId === customer.id ? null : customer.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {menuOpenId === customer.id && (
                        <div className="absolute right-4 top-9 z-10 w-44 bg-surface-2 border border-border rounded-lg shadow-xl overflow-hidden">
                          <button
                            onClick={() => toggleSuspend(customer.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-surface-3 cursor-pointer"
                          >
                            {customer.status === 'suspended' ? <CheckCircle size={14} /> : <Ban size={14} />}
                            {customer.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                          </button>
                          <button
                            onClick={() => removeCustomer(customer.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-danger hover:bg-surface-3 cursor-pointer"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted text-sm">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </RevealOnScroll>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Customer">
        <div className="space-y-4">
          <Input label="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Jane Doe" />
          <Input label="Email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="jane@example.com" />
          {formError && <p className="text-xs text-danger">{formError}</p>}
          <Button className="w-full" onClick={addCustomer}>Add Customer</Button>
        </div>
      </Modal>
    </div>
  )
}
