import React from 'react'

interface VercelIconProps {
  className?: string
  size?: number
}

export const VercelIcon: React.FC<VercelIconProps> = ({ className = '', size = 24 }) => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"  width={size} height={size} className={className}><path d="M64.002 8.576 128 119.424H0Zm0 0"/></svg>

  )
}

export default VercelIcon