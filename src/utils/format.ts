export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  return formatDate(dateStr)
}

export function formatProxyString(
  host: string,
  port: number,
  username: string,
  password: string,
  protocol: string
): string {
  return `${protocol}://${username}:${password}@${host}:${port}`
}

export function getUsagePercent(used: number, limit: number): number {
  return Math.min(Math.round((used / limit) * 100), 100)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
    case 'completed':
      return 'text-brand-green'
    case 'pending':
    case 'expired':
      return 'text-warning'
    case 'failed':
    case 'disabled':
    case 'suspended':
      return 'text-danger'
    default:
      return 'text-muted'
  }
}
