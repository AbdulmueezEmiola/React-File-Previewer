import React from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onLoad: () => void
  type: 'text' | 'html'
}
const Iframe = styled.iframe`
  background-color: white;
  width: 100%;
  height: 100%;
`
export default function HTMLViewer({ src, onLoad, type }: Props) {
  return (
    <Iframe
      src={`data:text/${type == 'html' ? 'html' : 'plain'}; charset=utf-8,${encodeURIComponent(src)}`}
      onLoad={() => onLoad()}
      sandbox=''
    ></Iframe>
  )
}
