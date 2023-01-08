import React from 'react'

interface Props {
  src: string
  onLoad: Function
}
export default function DocumentViewer({ src, onLoad }: Props) {
  return (
    <iframe
      id='msdoc-iframe'
      title='msdoc-iframe'
      height='100%'
      width='100%'
      onLoad={() => onLoad()}
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`}
    />
  )
}
