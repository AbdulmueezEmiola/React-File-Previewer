import React from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'

const Table = styled.table`
  border-spacing: 0;
  border: 1px solid black;
  tr:last-child td {
    border-bottom: 0;
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }

  th:last-child,
  td:last-child {
    border-right: 0;
  }
`
interface Props {
  columns: {
    accessor: string
    Header: string
  }[]
  data: Record<string, string>[]
}
export default function CustomTable({ columns, data }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell, i) => {
                return (
                  <td {...cell.getCellProps()} key={i}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
