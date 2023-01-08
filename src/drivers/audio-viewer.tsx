import React, { ReactEventHandler } from 'react'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLAudioElement>
  onLoad: ReactEventHandler<HTMLAudioElement>
}
export default function AudioViewer({ src, onError, onLoad }: Props) {
  return (
    <audio src={src} controls className='audio' onError={onError} onCanPlay={onLoad}>
      Your browser does not support this audio tag
    </audio>
  )
}
