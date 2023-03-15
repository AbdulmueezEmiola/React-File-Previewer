import { ReactEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLVideoElement>
  onLoad: (value: boolean) => void
  mimeType: string
}

const Video = styled.video`
  width: 100%;
  height: 100%;
`
export default function VideoViewer({ src, onError, onLoad, mimeType }: Props) {
  return (
    <Video src={src} controls onError={onError} onCanPlay={() => onLoad(true)} type={mimeType}>
      Your browser does not support this audio tag
    </Video>
  )
}
