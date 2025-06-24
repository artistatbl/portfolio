import React from 'react'

interface AdobeIconProps {
  className?: string
  size?: number
}

export const AdobeIcon: React.FC<AdobeIconProps> = ({ className = '', size = 24 }) => {
  return (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Adobe--Streamline-Simple-Icons" className={className}
      width={size}
      height={size}>
  <desc>
    Adobe Streamline Icon: https://streamlinehq.com
  </desc>
  <title>Adobe</title>
  <path d="m13.966 22.624 -1.69 -4.281H8.122l3.892 -9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" fill="#000000" strokeWidth="1"></path>
</svg>
  )
}

export default AdobeIcon