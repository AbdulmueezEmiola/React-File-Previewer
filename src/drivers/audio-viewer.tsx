import { ReactEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLAudioElement>
  onLoad: ReactEventHandler<HTMLAudioElement>
}
const Audio = styled.audio`
  width: 100%;
`
export default function AudioViewer({ src, onError, onLoad }: Props) {
  return (
    <Audio src={src} controls className='audio' onError={onError} onCanPlay={onLoad}>
      Your browser does not support this audio tag
    </Audio>
  )
}
