import { memo, useEffect, useState } from 'react'
import React from 'react'
import CSV from 'comma-separated-values'
import { TableVirtuoso } from 'react-virtuoso'
import styled from 'styled-components'

interface Props {
  src: string
  onError: (e: any) => void
  onLoad: (value: boolean) => void
}

const TD = styled.td`
  border: 1px solid black;
`
const CSVViewer = ({ src, onError, onLoad }: Props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const req = new XMLHttpRequest()
    req.open('GET', src, true)
    req.onload = function (e) {
      if (req.status >= 300) {
        onError(e)
      } else {
        setData(new CSV(req.response).parse())
        onLoad(true)
      }
    }
    req.send()
    return () => {
      req.abort()
    }
  }, [src])

  return (
    <TableVirtuoso
      style={{ height: '100%', whiteSpace: 'nowrap' }}
      data={data}
      itemContent={(index, row: string[]) => (
        <>
          {row.map((x, i) => (
            <TD key={`${index}-${i}`}>{x}</TD>
          ))}
        </>
      )}
    />
  )
}

export default memo(CSVViewer)
