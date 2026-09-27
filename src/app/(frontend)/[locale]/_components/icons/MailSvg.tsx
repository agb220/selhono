import * as React from 'react'
import { SVGProps } from 'react'
const MailSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={52} height={52} fill="none" {...props}>
    <circle cx={26} cy={26} r={26} fill="#fff" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 21 8 7 8-7m-16.885-3h17.77A2.12 2.12 0 0 1 37 20.125v12.75A2.12 2.12 0 0 1 34.885 35h-17.77A2.12 2.12 0 0 1 15 32.875v-12.75A2.12 2.12 0 0 1 17.115 18Z"
    />
  </svg>
)
export default MailSvg
