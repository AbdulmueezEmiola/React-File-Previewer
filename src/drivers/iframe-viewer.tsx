import React from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onLoad: (value: boolean) => void
}
const Iframe = styled.iframe`
  background-color: white;
  width: 100%;
  height: 100%;
`
export default function IFrameViewer({ src, onLoad }: Props) {
  return <Iframe src={src} onLoad={() => onLoad(true)} sandbox='allow-same-origin allow-download'></Iframe>
}
