import { ReactEventHandler, useEffect, useState } from 'react'
import React from 'react'
import CustomTable from '../components/tables'
import CSV from 'comma-separated-values'

interface Props {
  data: string
  onError: ReactEventHandler<HTMLAudioElement>
  onLoad: () => void
}
export default function CSVViewer({ data, onError, onLoad }: Props) {
  const [rows, setRows] = useState<Record<string, string>[]>([])
  const [columns, setColumns] = useState<
    {
      accessor: string
      Header: string
    }[]
  >([])
  useEffect(() => {
    try {
      const rowTemp: Record<string, string>[] = []
      const colTemp: {
        accessor: string
        Header: string
      }[] = []
      new CSV(data).forEach((array: any[]) => {
        if (colTemp.length < 1) {
          array.forEach((cell: string, idx: number) => {
            colTemp.push({
              accessor: `key-${idx}`,
              Header: cell,
            })
          })
        } else {
          const row: Record<string, string> = {}
          array.forEach((cell, idx) => {
            row[`key-${idx}`] = cell
          })
          rowTemp.push(row)
        }
      })
      setRows(rowTemp)
      setColumns(colTemp)
      onLoad()
    } catch (e: any) {
      onError(e)
    }
  }, [data, onError, onLoad])

  return <CustomTable columns={columns} data={rows} />
}
