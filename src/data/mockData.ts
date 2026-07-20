import type { ApiConfig, ProxyCredential, ProxyPackage, Transaction, UsageRecord, User } from '../types'

export const packages: ProxyPackage[] = [
  {
    id: 'pkg-starter',
    name: 'Starter',
    description: 'Perfect for testing and small projects',
    price: 9.99,
    dataLimitGB: 1,
    durationDays: 7,
    type: 'residential',
    features: ['1 GB residential data', '195+ countries', 'HTTP & SOCKS5', 'Email support'],
  },
  {
    id: 'pkg-pro',
    name: 'Professional',
    description: 'For growing businesses and developers',
    price: 49.99,
    dataLimitGB: 10,
    durationDays: 30,
    type: 'residential',
    features: ['10 GB residential data', '195+ countries', 'HTTP & SOCKS5', 'Priority support', 'Usage analytics'],
    popular: true,
  },
  {
    id: 'pkg-enterprise',
    name: 'Enterprise',
    description: 'High-volume proxy access for teams',
    price: 199.99,
    dataLimitGB: 50,
    durationDays: 30,
    type: 'residential',
    features: ['50 GB residential data', '195+ countries', 'HTTP & SOCKS5', 'Dedicated support', 'Advanced analytics', 'API access'],
  },
]

export const mockCredentials: ProxyCredential[] = [
  {
    id: 'px-001',
    host: 'gate.proxidize.com',
    port: 8080,
    username: 'user_a8f3k2m9',
    password: 'Px7$mK2nQ9wL',
    protocol: 'http',
    status: 'active',
    dataUsedGB: 3.42,
    dataLimitGB: 10,
    expiresAt: '2026-08-12T00:00:00Z',
    createdAt: '2026-07-13T00:00:00Z',
  },
  {
    id: 'px-002',
    host: 'gate.proxidize.com',
    port: 8081,
    username: 'user_b2n7p4x1',
    password: 'Rt4#vN8jM3sK',
    protocol: 'socks5',
    status: 'active',
    dataUsedGB: 0.87,
    dataLimitGB: 10,
    expiresAt: '2026-08-12T00:00:00Z',
    createdAt: '2026-07-13T00:00:00Z',
  },
]

export const usageHistory: UsageRecord[] = [
  { date: 'Jul 7', usageGB: 0.3 },
  { date: 'Jul 8', usageGB: 0.5 },
  { date: 'Jul 9', usageGB: 0.8 },
  { date: 'Jul 10', usageGB: 0.4 },
  { date: 'Jul 11', usageGB: 0.6 },
  { date: 'Jul 12', usageGB: 0.9 },
  { date: 'Jul 13', usageGB: 0.7 },
]

export const mockCustomers: User[] = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@example.com', role: 'customer', createdAt: '2026-06-01', status: 'active' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'customer', createdAt: '2026-06-15', status: 'active' },
  { id: 'u3', name: 'Mike Torres', email: 'mike@example.com', role: 'customer', createdAt: '2026-07-01', status: 'inactive' },
  { id: 'u4', name: 'Emma Wilson', email: 'emma@example.com', role: 'customer', createdAt: '2026-07-05', status: 'active' },
  { id: 'u5', name: 'James Park', email: 'james@example.com', role: 'customer', createdAt: '2026-07-10', status: 'suspended' },
]

export const mockTransactions: Transaction[] = [
  { id: 'tx-001', userId: 'u1', userName: 'Alex Johnson', packageName: 'Professional', amount: 49.99, status: 'completed', paymentMethod: 'stripe', createdAt: '2026-07-13T10:30:00Z' },
  { id: 'tx-002', userId: 'u2', userName: 'Sarah Chen', packageName: 'Starter', amount: 9.99, status: 'completed', paymentMethod: 'paypal', createdAt: '2026-07-12T14:20:00Z' },
  { id: 'tx-003', userId: 'u4', userName: 'Emma Wilson', packageName: 'Enterprise', amount: 199.99, status: 'pending', paymentMethod: 'crypto', createdAt: '2026-07-13T08:00:00Z' },
  { id: 'tx-004', userId: 'u3', userName: 'Mike Torres', packageName: 'Professional', amount: 49.99, status: 'failed', paymentMethod: 'stripe', createdAt: '2026-07-11T16:45:00Z' },
]

export const mockApiConfig: ApiConfig = {
  baseUrl: 'https://api.proxidize.com/api/v1',
  token: 'px_live_••••••••••••••••••••',
  plan: 'Residential Per GB',
  lastSync: '2026-07-13T12:00:00Z',
}

export const stats = {
  totalCustomers: 1247,
  activeProxies: 3891,
  countries: 195,
  uptime: 99.9,
}
