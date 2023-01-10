import React, { useEffect, useState } from 'react'
import DriverSelector from './drivers/driver-selector'
import MimeTypes from 'mime-types'
import Loading from './components/loading'
import styled from 'styled-components'
interface Props {
  loader?: React.ReactNode
  mimeType?: string
  fileName?: string
  src: string
  onError?: (e: any) => void
}

const Container = styled.div`
  height: 100%;
`
export default function FileViewer({ loader = <Loading />, mimeType, src, onError, fileName }: Props) {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [fileType, setFileType] = useState('')
  const handleError = (e: any) => {
    setShowLoading(false)
    setShowError(true)
    onError && onError(e)
  }
  const handleLoad = () => {
    setShowLoading(false)
  }
  useEffect(() => {
    setShowError(false)
    if (mimeType) {
      setFileType(mimeType)
    } else if (fileName) {
      setFileType(MimeTypes.lookup(fileName).toString())
    }
    setShowLoading(true)
  }, [src, mimeType, fileName])
  if (showError) {
    return <div>Unfortunately, this file can&apos;t be previewed</div>
  }
  return (
    <>
      {showLoading && loader}
      <Container
        className='fileViewer'
        style={{
          visibility: showLoading ? 'hidden' : 'visible',
        }}
      >
        <DriverSelector mimeType={fileType} src={src} onLoad={handleLoad} onError={handleError} />
      </Container>
    </>
  )
}
