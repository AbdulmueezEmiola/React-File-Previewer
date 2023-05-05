import { useEffect } from 'react'
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon'

interface Props {
  onLoad: (value: boolean) => void
  mimeType: string
}
export default function DefaultViewer({ onLoad, mimeType }: Props) {
  useEffect(() => {
    onLoad(true)
  }, [onLoad])
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
      }}
    >
      <FileIcon extension={mimeType} {...defaultStyles[mimeType as DefaultExtensionType]} />
    </div>
  )
}
