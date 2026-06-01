import * as React from 'react'
import { SVGProps } from 'react'
const ArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.01 7.938 13.723-.137M9.628 1.414l6.523 6.523-6.654 6.655"
    />
  </svg>
)
export default ArrowSvg
