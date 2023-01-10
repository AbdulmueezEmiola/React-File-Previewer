import { ReactEventHandler, useEffect, useState } from 'react'
import React from 'react'
import CSV from 'comma-separated-values'
import ReactDataGrid from 'react-data-grid'
import 'react-data-grid/lib/styles.css';

interface Props {
  data: string
  onError: ReactEventHandler<HTMLAudioElement>
  onLoad: () => void
}
type RowType = Record<string, string>[]
type ColumnType = {
  key: string
  name: string
  resizable: boolean
  sortable: boolean
  filterable: boolean
}[]
export default function CSVViewer({ data, onError, onLoad }: Props) {
  const [rows, setRows] = useState<RowType>([])
  const [columns, setColumns] = useState<ColumnType>([])

  const parse = (data: string) => {
    const rows: RowType = []
    const columns: ColumnType = []

    new CSV(data).forEach((array: any[]) => {
      if (columns.length < 1) {
        array.forEach((cell: string, idx: number) => {
          columns.push({
            key: `key-${idx}`,
            name: cell,
            resizable: true,
            sortable: true,
            filterable: true,
          })
        })
      } else {
        const row: Record<string, string> = {}
        array.forEach((cell, idx) => {
          row[`key-${idx}`] = cell
        })
        rows.push(row)
      }
    })
    return { rows, columns }
  }

  useEffect(() => {
    try {
      if (data) {
        const result = parse(data)
        console.log(result.columns)
        setRows(result.rows)
        setColumns(result.columns)
        onLoad()
      }
    } catch (e: any) {
      onError(e)
    }
  }, [data, onError, onLoad])

  return data ? <ReactDataGrid columns={columns} rows={rows} /> : <></>
}
