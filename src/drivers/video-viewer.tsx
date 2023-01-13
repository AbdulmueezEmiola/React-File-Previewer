import { ReactEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLVideoElement>
  onLoad: (value: boolean) => void
}

const Video = styled.video`
  width: 100%;
  height: 100%;
`
export default function VideoViewer({ src, onError, onLoad }: Props) {
  return (
    <Video src={src} controls onError={onError} onCanPlay={() => onLoad(true)}>
      Your browser does not support this audio tag
    </Video>
  )
}
