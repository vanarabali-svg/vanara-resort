'use client'

import React, { useEffect, useRef, useState } from 'react'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
}

/**
 * Minimal, luxury-safe reveal on scroll using IntersectionObserver.
 * No external deps.
 */
export default function FadeIn({ children, className = '', delayMs = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { root: null, threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
