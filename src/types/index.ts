export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  createdAt: string
  status: 'active' | 'inactive' | 'suspended'
}

export interface ProxyPackage {
  id: string
  name: string
  description: string
  price: number
  dataLimitGB: number
  durationDays: number
  type: 'residential' | 'mobile'
  features: string[]
  popular?: boolean
}

export interface ProxyCredential {
  id: string
  host: string
  port: number
  username: string
  password: string
  protocol: 'http' | 'socks5'
  status: 'active' | 'expired' | 'disabled'
  dataUsedGB: number
  dataLimitGB: number
  expiresAt: string
  createdAt: string
}

export interface UsageRecord {
  date: string
  usageGB: number
}

export interface Transaction {
  id: string
  userId: string
  userName: string
  packageName: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  paymentMethod: 'stripe' | 'paypal' | 'crypto'
  createdAt: string
}

export interface ApiConfig {
  baseUrl: string
  token: string
  plan: string
  lastSync: string
}
