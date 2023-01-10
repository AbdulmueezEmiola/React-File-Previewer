import React, { useEffect } from 'react'

interface Props {
  onLoad: () => void
}
export default function DefaultViewer({ onLoad }: Props) {
  useEffect(() => {
    onLoad()
  }, [onLoad])
  return <div>File can't be previewed</div>
}
