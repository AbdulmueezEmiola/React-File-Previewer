import { ReactElement, useEffect, useState } from 'react'

interface Props {
  src: string
  renderer: (data: any) => ReactElement<any>
  onError: (e: any) => void
  responseType?: XMLHttpRequestResponseType
}
export default function FromHTTP({ src, renderer: children, onError, responseType }: Props) {
  const [data, setData] = useState('')
  useEffect(() => {
    const req = new XMLHttpRequest()
    req.open('GET', src, true)
    if (responseType) {
      req.responseType = responseType
    }
    req.onload = function () {
      if (req.status >= 300) {
        onError(req)
      } else {
        setData(req.response)
      }
    }
    req.send()
  }, [src, onError, responseType])
  return children(data)
}
