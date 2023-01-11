// import React from 'react'
// import { useTable } from 'react-table'
// import { TableVirtuoso } from 'react-virtuoso'
// import styled from 'styled-components'

// const Table = styled.table`
//   border-spacing: 0;
//   border: 1px solid black;
//   tr:last-child td {
//     border-bottom: 0;
//   }

//   th,
//   td {
//     margin: 0;
//     padding: 0.5rem;
//     border-bottom: 1px solid black;
//     border-right: 1px solid black;
//   }

//   th:last-child,
//   td:last-child {
//     border-right: 0;
//   }
// `
// interface Props {
//   columns: {
//     accessor: string
//     Header: string
//   }[]
//   data: Record<string, string>[]
// }
// export default function CustomTable({ columns, data }: Props) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   })
//   return (
//     <>
//       test
//       <TableVirtuoso
//         totalCount={rows.length}
//         components={{
//           Table: () => <Table {...getTableProps()} />,
//           TableBody: React.forwardRef(() => <tbody {...getTableBodyProps()} />),
//           TableRow: (props: any) => {
//             const index = props['data-index']
//             const row = rows[index]
//             return <tr {...row.getRowProps()} key={row.id} />
//           },
//         }}
//         fixedHeaderContent={() => {
//           return headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()} style={{ background: 'white' }}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))
//         }}
//         itemContent={(index: number) => {
//           const row = rows[index]
//           prepareRow(row)
//           return row.cells.map((cell) => {
//             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//           })
//         }}
//       />
//     </>
//   )
// }
