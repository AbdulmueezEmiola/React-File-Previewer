import { ReactElement, useEffect, useState } from 'react'

interface Props {
  src: string
  children: (data: any) => ReactElement<any>
  onError: (e: any) => void
  responseType?: XMLHttpRequestResponseType
}
export default function FromHTTP({ src, children, onError, responseType = 'arraybuffer' }: Props) {
  const [data, setData] = useState('')
  useEffect(() => {
    var req = new XMLHttpRequest()
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
  }, [src])
  return children(data)
}
