import React, { useEffect } from 'react'

interface Props {
  onLoad: () => void
}
export default function DefaultViewer({ onLoad }: Props) {
  useEffect(() => {
    onLoad()
  }, [onLoad])
  return <div>File can&apos;t be previewed</div>
}
