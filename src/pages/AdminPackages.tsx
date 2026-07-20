import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RevealOnScroll } from '../components/ui/Animations'
import { Modal, Toast } from '../components/ui/Feedback'
import { packages as initialPackages } from '../data/mockData'
import { formatCurrency } from '../utils/format'
import type { ProxyPackage } from '../types'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  dataLimitGB: '',
  durationDays: '',
  type: 'residential' as ProxyPackage['type'],
}

export default function AdminPackages() {
  const [packages, setPackages] = useState<ProxyPackage[]>(initialPackages)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '' })

  const notify = (message: string) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (pkg: ProxyPackage) => {
    setEditingId(pkg.id)
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: String(pkg.price),
      dataLimitGB: String(pkg.dataLimitGB),
      durationDays: String(pkg.durationDays),
      type: pkg.type,
    })
    setFormError('')
    setModalOpen(true)
  }

  const removePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id))
    notify('Package deleted')
  }

  const savePackage = () => {
    const price = Number(form.price)
    const dataLimitGB = Number(form.dataLimitGB)
    const durationDays = Number(form.durationDays)
    if (!form.name.trim() || !price || !dataLimitGB || !durationDays) {
      setFormError('Fill in all fields with valid values.')
      return
    }

    if (editingId) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: form.name, description: form.description, price, dataLimitGB, durationDays, type: form.type }
            : p
        )
      )
      notify('Package updated')
    } else {
      setPackages((prev) => [
        ...prev,
        {
          id: `pkg-${Date.now()}`,
          name: form.name,
          description: form.description,
          price,
          dataLimitGB,
          durationDays,
          type: form.type,
          features: [`${dataLimitGB} GB data`, `${durationDays}-day access`],
        },
      ])
      notify('Package created')
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <Toast message={toast.message} visible={toast.visible} />

      <RevealOnScroll>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Packages</h1>
            <p className="text-sm text-muted mt-1">Manage proxy packages and pricing</p>
          </div>
          <Button size="sm" icon={<Plus size={14} />} onClick={openAdd}>Add Package</Button>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((pkg, i) => (
          <RevealOnScroll key={pkg.id} delay={i * 0.08}>
            <Card className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p className="text-xs text-muted mt-0.5">{pkg.type} · {pkg.durationDays} days</p>
                </div>
                {pkg.popular && <Badge variant="yellow">Popular</Badge>}
              </div>

              <p className="text-3xl font-bold mb-1">{formatCurrency(pkg.price)}</p>
              <p className="text-sm text-muted mb-4">{pkg.dataLimitGB} GB data limit</p>

              <p className="text-sm text-muted-light mb-6">{pkg.description}</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Edit size={14} />} className="flex-1" onClick={() => openEdit(pkg)}>Edit</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  className="text-danger hover:text-danger"
                  aria-label="Delete"
                  onClick={() => removePackage(pkg.id)}
                />
              </div>
            </Card>
          </RevealOnScroll>
        ))}
        {packages.length === 0 && (
          <p className="text-sm text-muted col-span-full text-center py-8">No packages yet. Add one to get started.</p>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Package' : 'Add Package'}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Starter" />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Perfect for..." />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Price ($)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input label="Data (GB)" type="number" value={form.dataLimitGB} onChange={(e) => setForm({ ...form, dataLimitGB: e.target.value })} />
            <Input label="Days" type="number" value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: e.target.value })} />
          </div>
          {formError && <p className="text-xs text-danger">{formError}</p>}
          <Button className="w-full" onClick={savePackage}>{editingId ? 'Save Changes' : 'Create Package'}</Button>
        </div>
      </Modal>
    </div>
  )
}
