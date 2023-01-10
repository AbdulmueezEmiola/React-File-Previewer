import React from 'react'
import FromHTTP from '../components/loadFileViaHttp'
import AudioViewer from './audio-viewer'
import CSVViewer from './csv-viewer'
import DefaultViewer from './default-viewer'
import DocumentViewer from './document-viewer'
import HTMLViewer from './html-viewer'
import ImageViewer from './image-viewer'
import PDFViewer from './pdf-viewer'
import VideoViewer from './video-viewer'
interface Props {
  mimeType: string
  src: string
  onError: (e: any) => void
  onLoad: () => void
}
export default function DriverSelector({ mimeType, src, onError, onLoad }: Props) {
  switch (mimeType) {
    case 'text/csv':
      return (
        <FromHTTP
          renderer={(data) => <CSVViewer data={data} onLoad={onLoad} onError={(e) => onError(e)} />}
          src={src}
          onError={(e) => onError(e)}
        />
      )
    case 'text/plain':
      return (
        <FromHTTP
          renderer={(data) => <HTMLViewer src={data} onLoad={onLoad} type='text' />}
          src={src}
          onError={(e) => onError(e)}
        />
      )
    case 'text/html':
      return (
        <FromHTTP
          renderer={(data) => <HTMLViewer src={data} onLoad={onLoad} type='html' />}
          src={src}
          onError={(e) => onError(e)}
        />
      )
    case mimeType.startsWith('image/') && mimeType:
      return <ImageViewer src={src} onLoad={onLoad} onError={(e) => onError(e)} />
    case mimeType.startsWith('audio/') && mimeType:
      return <AudioViewer src={src} onLoad={() => onLoad()} onError={(e) => onError(e)} />
    case mimeType.startsWith('video/') && mimeType:
      return <VideoViewer src={src} onLoad={() => onLoad()} onError={(e) => onError(e)} />
    case 'application/pdf':
      return (
        <FromHTTP
          responseType='arraybuffer'
          renderer={(data) => <PDFViewer src={data} onLoad={onLoad} />}
          src={src}
          onError={(e) => onError(e)}
        />
      )
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
