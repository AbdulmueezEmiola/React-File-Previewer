import { ReactEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLAudioElement>
  onLoad: ReactEventHandler<HTMLAudioElement>
  mimeType: string
}
const Audio = styled.audio`
  width: 100%;
`
export default function AudioViewer({ src, onError, onLoad, mimeType }: Props) {
  return (
    <Audio controls className='audio' onError={onError} onCanPlay={onLoad}>
      <source src={src} type={mimeType} />
      Your browser does not support this audio tag
    </Audio>
  )
}
