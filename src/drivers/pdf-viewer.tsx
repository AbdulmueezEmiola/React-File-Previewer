import React from 'react'

interface Props {
  src: string
  onLoad: Function
}
export default function PDFViewer({ src, onLoad }: Props) {
  return (
    <iframe
      src={window.URL.createObjectURL(new Blob([src], { type: 'application/pdf' }))}
      onLoad={() => onLoad()}
      height='100%'
      width='100%'
    ></iframe>
  )
}
