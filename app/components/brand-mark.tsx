import type { FC, SVGProps } from 'react'

const BrandMark: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect x="1" y="1" width="38" height="38" rx="6" fill="#122A1E" stroke="#181C19" strokeWidth="2" />
    <path d="M20 31V18.5" stroke="#EFE4C7" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 23.5C20 23.5 14.2 24 11.5 19.8C15.4 16.2 20 19 20 23.5Z" fill="#EFE4C7" />
    <path d="M20 17.5C20 17.5 25.8 18 28.5 13.8C24.6 10.2 20 13 20 17.5Z" fill="#C88238" />
    <path d="M13.5 31H26.5" stroke="#D2C5A7" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="28.6" cy="28.4" r="1.6" fill="#C88238" />
  </svg>
)

export default BrandMark
