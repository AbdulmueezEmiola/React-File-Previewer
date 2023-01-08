import React from 'react'

interface Props {
  src: string
  onLoad: Function
  type: 'text' | 'html'
}
export default function HTMLViewer({ src, onLoad, type }: Props) {
  return (
    <iframe
      src={`data:text/${type == 'html' ? 'html' : 'plain'}; charset=utf-8,${encodeURIComponent(src)}`}
      onLoad={() => onLoad()}
      height='100%'
      width='100%'
      sandbox=''
    ></iframe>
  )
}
