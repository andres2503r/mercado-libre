import { NextPage } from 'next'
import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IPortal } from '@interfaces/shared/components/portal/Portal'

export const Portal: NextPage<IPortal> = (props) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted && !props.portalOpen && props.closeTime > 0) {
      const timeoutId = setTimeout(() => {
        setMounted(false)
        ref.current = null
      }, props.closeTime)

      return () => clearTimeout(timeoutId)
    } else if (mounted && !props.portalOpen) {
      setMounted(false)
      ref.current = null
    } else if (!mounted && props.portalOpen) {
      ref.current = document.querySelector<HTMLElement>(props.portalTag ?? '#portal')
      setMounted(true)
    }
  }, [mounted, props.closeTime, props.portalOpen, props.portalTag])

  return (
    mounted && ref.current
      ? createPortal(
        <div style={{
          display: 'grid',
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          placeItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: '20'
        }}>
          {props.children}
        </div>
        , ref.current)
      : null
  )
}
