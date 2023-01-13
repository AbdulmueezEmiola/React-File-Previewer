import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
  onLoad: (value: boolean) => void
  onError: (e: any) => void
}
const Iframe = styled.iframe`
  background-color: white;
  width: 100%;
  height: 100%;
`
export default function HTMLViewer({ src, onLoad, onError }: Props) {
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
  return <Iframe src={`data:text/html; charset=utf-8,${encodeURIComponent(data)}`} sandbox=''></Iframe>
}
