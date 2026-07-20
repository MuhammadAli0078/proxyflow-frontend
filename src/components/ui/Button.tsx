import clsx from 'clsx'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children?: ReactNode
  loading?: boolean
  icon?: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variants = {
  primary: 'bg-brand-yellow text-black hover:bg-brand-yellow-dim font-semibold',
  secondary: 'bg-brand-green text-black hover:bg-brand-green-dim font-semibold',
  ghost: 'bg-transparent text-muted-light hover:text-white hover:bg-surface-3',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20 border border-danger/30',
  outline: 'bg-transparent border border-border-light text-muted-light hover:border-brand-yellow hover:text-brand-yellow',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading,
  icon,
  className,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icon}
      {children}
    </motion.button>
  )
}
