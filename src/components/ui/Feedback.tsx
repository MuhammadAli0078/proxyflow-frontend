import clsx from 'clsx'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md'
  color?: 'yellow' | 'green' | 'auto'
}

export function ProgressBar({ value, max = 100, showLabel = true, size = 'md', color = 'auto' }: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100)

  const barColor =
    color === 'auto'
      ? percent > 80
        ? 'bg-danger'
        : percent > 60
          ? 'bg-warning'
          : 'bg-brand-green'
      : color === 'yellow'
        ? 'bg-brand-yellow'
        : 'bg-brand-green'

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>{value} / {max} GB</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-surface-3 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <motion.div
          className={clsx('h-full rounded-full', barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-surface-2 border border-border rounded-xl p-6 w-full max-w-md shadow-2xl"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-white transition-colors cursor-pointer text-xl leading-none">
            &times;
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  visible: boolean
}

export function Toast({ message, type = 'success', visible }: ToastProps) {
  if (!visible) return null

  const colors = {
    success: 'border-brand-green/30 bg-brand-green/10 text-brand-green',
    error: 'border-danger/30 bg-danger/10 text-danger',
    info: 'border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow',
  }

  return (
    <motion.div
      className={clsx('fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border text-sm font-medium shadow-lg', colors[type])}
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {message}
    </motion.div>
  )
}
