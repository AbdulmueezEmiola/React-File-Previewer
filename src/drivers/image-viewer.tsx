import React, { ReactEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onError: ReactEventHandler<HTMLImageElement>
  onLoad: (value: boolean) => void
}

const Image = styled.img`
  width: 100%;
  height: 100%;
`
export default function ImageViewer({ src, onError, onLoad }: Props) {
  return <Image src={src} onError={onError} onLoad={() => onLoad(true)} />
}
