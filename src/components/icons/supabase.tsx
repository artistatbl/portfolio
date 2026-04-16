import React from 'react'

interface SupabaseIconProps {
  className?: string
  size?: number
}

export const SupabaseIcon: React.FC<SupabaseIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" className={className}
      width={size}
      height={size}><g id="Слой_1"><path fill="currentColor" d="M24.2,30V6.3c0-1.8-2.3-2.6-3.4-1.2L4.5,25.9c-1.3,1.7-0.1,4.1,2,4.1H24.2z"/><path fill="currentColor" d="M24,18.4v23.7c0,1.8,2.4,2.6,3.5,1.2 l16.4-20.7c1.3-1.7,0.1-4.1-2.1-4.1H24z"/></g></svg>
  )
}

export default SupabaseIcon
