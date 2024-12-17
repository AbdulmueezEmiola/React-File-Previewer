import React, { useEffect, useState } from 'react'
import DriverSelector from './drivers/driver-selector'
import MimeTypes from 'mime'
import Loading from './components/loading'
import styled from 'styled-components'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { DefaultExtensionType } from 'react-file-icon'

interface Props {
  loader?: React.ReactNode
  mimeType?: string
  fileName?: string
  src: string
  onError?: (e: any) => void
  autoPlay?: boolean
  containerErrorStyle?: React.CSSProperties
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`
export default function FileViewer({
  loader = <Loading />,
  mimeType,
  src,
  onError,
  fileName,
  autoPlay,
  containerErrorStyle,
}: Props) {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [fileType, setFileType] = useState('')
  const handleError = (e: any) => {
    setShowLoading(false)
    setShowError(true)
    onError && onError(e)
  }
  const handleLoad = (e: boolean) => {
    setShowLoading(!e)
  }
  useEffect(() => {
    setShowLoading(true)
    setShowError(false)
    if (mimeType) {
      setFileType(mimeType)
    } else if (fileName) {
      setFileType(MimeTypes.getType(fileName) ?? '')
    }
  }, [src, mimeType, fileName])
  if (showError) {
    return (
      <div
        style={
          containerErrorStyle
            ? containerErrorStyle
            : {
                width: '50px',
                height: '50px',
              }
        }
      >
        <FileIcon
          extension={MimeTypes.getExtension(fileType) ?? ''}
          {...defaultStyles[MimeTypes.getExtension(fileType) as DefaultExtensionType]}
        />
      </div>
    )
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
        <DriverSelector
          mimeType={fileType}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          autoPlay={autoPlay ?? false}
        />
      </Container>
    </>
  )
}
