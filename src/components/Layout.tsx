import React from 'react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  showError: boolean
  loading: boolean
  loader: ReactNode
}
export default function ({ children, showError, loader, loading }: Props) {
  if (showError) {
    return <div>Error Previewing file</div>
  } else {
    return children
  }
}
