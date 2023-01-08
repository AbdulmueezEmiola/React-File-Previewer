import React, { ReactEventHandler } from 'react'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLVideoElement>
  onLoad: () => void
}
export default function VideoViewer({ src, onError, onLoad }: Props) {
  return (
    <video src={src} controls onError={onError} onCanPlay={() => onLoad()}>
      Your browser does not support this audio tag
    </video>
  )
}
