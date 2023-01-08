import React, { ReactEventHandler } from 'react'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLImageElement>
  onLoad: () => void
}

export default function ImageViewer({ src, onError, onLoad }: Props) {
  return <img src={src} onError={onError} onLoad={() => onLoad()} />
}
