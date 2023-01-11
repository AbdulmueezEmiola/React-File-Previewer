import React from 'react'
import AudioViewer from './audio-viewer'
import CSVViewer from './csv-viewer'
import DefaultViewer from './default-viewer'
import DocumentViewer from './document-viewer'
import IFrameViewer from './iframe-viewer'
import ImageViewer from './image-viewer'
import VideoViewer from './video-viewer'
interface Props {
  mimeType: string
  src: string
  onError: (e: any) => void
  onLoad: (value: boolean) => void
}
export default function DriverSelector({ mimeType, src, onError, onLoad }: Props) {
  switch (mimeType) {
    case 'text/csv':
      return <CSVViewer onLoad={onLoad} onError={(e) => onError(e)} src={src} />
    case 'text/html':
    case 'text/plain':
    case 'application/pdf':
      return <IFrameViewer src={src} onLoad={onLoad} />
    case mimeType.startsWith('image/') && mimeType:
      return <ImageViewer src={src} onLoad={onLoad} onError={(e) => onError(e)} />
    case mimeType.startsWith('audio/') && mimeType:
      return <AudioViewer src={src} onLoad={() => onLoad(true)} onError={(e) => onError(e)} />
    case mimeType.startsWith('video/') && mimeType:
      return <VideoViewer src={src} onLoad={() => onLoad(true)} onError={(e) => onError(e)} />
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.ms-excel':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <DocumentViewer src={src} onLoad={onLoad} />
    default:
      return <DefaultViewer onLoad={onLoad} />
  }
}
