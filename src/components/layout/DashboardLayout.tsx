import { Link, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Globe,
  ShoppingCart,
  Settings,
  Users,
  Package,
  BarChart3,
  Key,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { Navbar } from './Navbar'

interface NavItem {
  to: string
  label: string
  icon: ReactNode
}

const customerNav: NavItem[] = [
  { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { to: '/dashboard/proxies', label: 'My Proxies', icon: <Globe size={18} /> },
  { to: '/dashboard/usage', label: 'Usage', icon: <BarChart3 size={18} /> },
  { to: '/purchase', label: 'Buy Package', icon: <ShoppingCart size={18} /> },
  { to: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> },
]

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { to: '/admin/customers', label: 'Customers', icon: <Users size={18} /> },
  { to: '/admin/packages', label: 'Packages', icon: <Package size={18} /> },
  { to: '/admin/transactions', label: 'Transactions', icon: <BarChart3 size={18} /> },
  { to: '/admin/api', label: 'API Config', icon: <Key size={18} /> },
  { to: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
]

function Sidebar({ items, collapsed, onToggle }: { items: NavItem[]; collapsed: boolean; onToggle: () => void }) {
  const location = useLocation()
  const { logout, user } = useAuth()

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-30 bg-surface-1 border-r border-border transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center p-2 rounded-lg text-muted hover:text-white hover:bg-surface-3 transition-colors cursor-pointer"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {items.map((item) => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20'
                    : 'text-muted-light hover:text-white hover:bg-surface-3'
                }`}
              >
                {item.icon}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          {!collapsed && user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-light hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}

export function DashboardLayout({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  const items = admin ? adminNav : customerNav

  if (!user) return <Navigate to="/login" replace />

  if (admin && user.role !== 'admin') return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <Sidebar items={items} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={`pt-16 transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-64'}`}
      >
        <div className="p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      {children}
    </div>
  )
}
