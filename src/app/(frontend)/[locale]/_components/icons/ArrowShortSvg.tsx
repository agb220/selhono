import * as React from 'react'
import { SVGProps } from 'react'
const ArrowShortSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={20} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 19 8-9-8-9"
    />
  </svg>
)
export default ArrowShortSvg
