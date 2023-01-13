import { useEffect } from 'react'

interface Props {
  onLoad: (value: boolean) => void
}
export default function DefaultViewer({ onLoad }: Props) {
  useEffect(() => {
    onLoad(true)
  }, [onLoad])
  return <div>File can&apos;t be previewed</div>
}
