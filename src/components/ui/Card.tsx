import clsx from 'clsx'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'yellow' | 'green' | 'none'
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Card({ children, className, hover = false, glow = 'none', padding = 'md', onClick }: CardProps) {
  const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' }
  const glowMap = { yellow: 'glow-yellow', green: 'glow-green', none: '' }

  return (
    <motion.div
      className={clsx(
        'bg-surface-2 border border-border rounded-xl',
        paddingMap[padding],
        hover && 'hover:border-border-light transition-colors duration-300 cursor-pointer',
        glowMap[glow],
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface StatCardProps {
  label: string
  value: ReactNode
  icon: ReactNode
  trend?: string
  trendUp?: boolean
}

export function StatCard({ label, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          {trend && (
            <p className={clsx('text-xs mt-2', trendUp ? 'text-brand-green' : 'text-danger')}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-2.5 bg-surface-3 rounded-lg text-brand-yellow">{icon}</div>
      </div>
    </Card>
  )
}

interface BadgeProps {
  children: ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'yellow'
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const variants = {
    success: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    neutral: 'bg-surface-3 text-muted-light border-border',
    yellow: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
  }

  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', variants[variant])}>
      {children}
    </span>
  )
}
