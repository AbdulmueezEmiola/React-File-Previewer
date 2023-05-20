import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

interface Props {
  src: string
  onLoad: (value: boolean) => void
  onError: (e: any) => void
}

export default function TextViewer({ src, onLoad, onError }: Props) {
  const [data, setData] = useState('')
  useEffect(() => {
    const req = new XMLHttpRequest()
    req.open('GET', src, true)
    req.onload = function (e) {
      if (req.status >= 300) {
        onError(e)
      } else {
        setData(req.response)
        onLoad(true)
      }
    }
    req.send()
    return () => {
      req.abort()
    }
  }, [src])
  return <Container>{data}</Container>
}
