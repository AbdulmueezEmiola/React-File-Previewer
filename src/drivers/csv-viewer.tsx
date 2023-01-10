import { ReactEventHandler, useEffect, useState } from 'react'
import React from 'react'
import CSV from 'comma-separated-values'
import ReactDataGrid from 'react-data-grid'
import styled from 'styled-components'

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
const Container = styled.div`
  @layer rdg.Cell {
    .c1wupbe7-0-0-beta-20 {
      /* max-content does not work with size containment
   * dynamically switching between different containment styles incurs a heavy relayout penalty
   * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
   *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
   */
      contain: style;
      position: relative; /* needed for absolute positioning to work */
      padding-block: 0;
      padding-inline: 8px;
      border-inline-end: 1px solid var(--rdg-border-color);
      border-block-end: 1px solid var(--rdg-border-color);
      grid-row-start: var(--rdg-grid-row-start);
      background-color: inherit;

      white-space: nowrap;
      overflow: hidden;
      overflow: clip;
      text-overflow: ellipsis;
      outline: none;
    }

    .c1wupbe7-0-0-beta-20[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

  @layer rdg.Cell {
    .cd0kgiy7-0-0-beta-20 {
      position: sticky;
      /* Should have a higher value than 0 to show up above unfrozen cells */
      z-index: 1;
    }
  }

  @layer rdg.Cell {
    .c1730fa47-0-0-beta-20 {
      box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
    }
  }

  @layer rdg {
    @layer Defaults,
    FocusSink,
    CheckboxInput,
    CheckboxIcon,
    CheckboxLabel,
    Cell,
    HeaderCell,
    SummaryCell,
    EditCell,
    Row,
    HeaderRow,
    SummaryRow,
    GroupedRow,
    Root;

    @layer Defaults {
      .r104f42s7-0-0-beta-20 *,
      .r104f42s7-0-0-beta-20 *::before,
      .r104f42s7-0-0-beta-20 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {
      .r104f42s7-0-0-beta-20 {
        --rdg-color: #000;
        --rdg-border-color: #ddd;
        --rdg-summary-border-color: #aaa;
        --rdg-background-color: hsl(0deg 0% 100%);
        --rdg-header-background-color: hsl(0deg 0% 97.5%);
        --rdg-row-hover-background-color: hsl(0deg 0% 96%);
        --rdg-row-selected-background-color: hsl(207deg 76% 92%);
        --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);
        --rdg-checkbox-color: hsl(207deg 100% 29%);
        --rdg-checkbox-focus-color: hsl(207deg 100% 69%);
        --rdg-checkbox-disabled-border-color: #ccc;
        --rdg-checkbox-disabled-background-color: #ddd;
        --rdg-selection-color: #66afe9;
        --rdg-font-size: 14px;

        display: grid;

        color-scheme: var(--rdg-color-scheme, light dark);

        /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
        /* We set a stacking context so internal elements don't render on top of external elements. */
        contain: strict;
        content-visibility: auto;
        block-size: 350px;
        border: 1px solid var(--rdg-border-color);
        box-sizing: border-box;
        overflow: auto;
        background-color: var(--rdg-background-color);
        color: var(--rdg-color);
        font-size: var(--rdg-font-size);

        /* needed on Firefox */
      }
      .r104f42s7-0-0-beta-20::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-20.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;
        --rdg-border-color: #444;
        --rdg-summary-border-color: #555;
        --rdg-background-color: hsl(0deg 0% 13%);
        --rdg-header-background-color: hsl(0deg 0% 10.5%);
        --rdg-row-hover-background-color: hsl(0deg 0% 9%);
        --rdg-row-selected-background-color: hsl(207deg 76% 42%);
        --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);
        --rdg-checkbox-color: hsl(207deg 100% 79%);
        --rdg-checkbox-focus-color: hsl(207deg 100% 89%);
        --rdg-checkbox-disabled-border-color: #000;
        --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-20.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-20:not(.rdg-light) {
          --rdg-color: #ddd;
          --rdg-border-color: #444;
          --rdg-summary-border-color: #555;
          --rdg-background-color: hsl(0deg 0% 13%);
          --rdg-header-background-color: hsl(0deg 0% 10.5%);
          --rdg-row-hover-background-color: hsl(0deg 0% 9%);
          --rdg-row-selected-background-color: hsl(207deg 76% 42%);
          --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);
          --rdg-checkbox-color: hsl(207deg 100% 79%);
          --rdg-checkbox-focus-color: hsl(207deg 100% 89%);
          --rdg-checkbox-disabled-border-color: #000;
          --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

  @layer rdg.Root {
    .v7ly7s7-0-0-beta-20 {
      user-select: none;
    }

    .v7ly7s7-0-0-beta-20 .r1otpg647-0-0-beta-20 {
      cursor: move;
    }
  }

  @layer rdg.FocusSink {
    .fc4f4zb7-0-0-beta-20 {
      grid-column: 1/-1;
      pointer-events: none;
      /* Should have a higher value than 2 to show up above header row */
      z-index: 3;
    }
  }

  @layer rdg.Row {
    .r1otpg647-0-0-beta-20 {
      display: contents;
      line-height: var(--rdg-row-height);
      background-color: var(--rdg-background-color);
    }

    .r1otpg647-0-0-beta-20:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-20[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

    .r1otpg647-0-0-beta-20[aria-selected='true']:hover {
      background-color: var(--rdg-row-selected-hover-background-color);
    }
  }

  @layer rdg.FocusSink {
    .rel5gk27-0-0-beta-20 {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

  @layer rdg.FocusSink {
    .r1qymf1z7-0-0-beta-20::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }

  @layer rdg.CheckboxLabel {
    .c8rwwhf7-0-0-beta-20 {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      inset: 0;
      margin-inline-end: 1px; /* align checkbox in row group cell */
    }
  }

  @layer rdg.CheckboxInput {
    .c1rb4brs7-0-0-beta-20 {
      all: unset;
    }
  }

  @layer rdg.CheckboxIcon {
    .c1bvvwcc7-0-0-beta-20 {
      content: '';
      inline-size: 20px;
      block-size: 20px;
      border: 2px solid var(--rdg-border-color);
      background-color: var(--rdg-background-color);
    }

    .c1rb4brs7-0-0-beta-20:checked + .c1bvvwcc7-0-0-beta-20 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1rb4brs7-0-0-beta-20:focus + .c1bvvwcc7-0-0-beta-20 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

  @layer rdg.CheckboxLabel {
    .c1yg790j7-0-0-beta-20 {
      cursor: default;
    }

    .c1yg790j7-0-0-beta-20 .c1bvvwcc7-0-0-beta-20 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }

  @layer rdg.GroupCellContent {
    .gb8l2vs7-0-0-beta-20 {
      outline: none;
    }
  }

  @layer rdg.GroupCellCaret {
    .c1ggynjl7-0-0-beta-20 {
      margin-inline-start: 4px;
      stroke: currentColor;
      stroke-width: 1.5px;
      fill: transparent;
      vertical-align: middle;
    }

    .c1ggynjl7-0-0-beta-20 > path {
      transition: d 0.1s;
    }
  }

  @layer rdg.MeasuringCell {
    .m1l09lto7-0-0-beta-20 {
      contain: strict;
      grid-row: 1;
      visibility: hidden;
    }
  }

  @layer rdg.SortableHeaderCell {
    .h1e8ezgp7-0-0-beta-20 {
      cursor: pointer;
      display: flex;
    }

    .h1e8ezgp7-0-0-beta-20:focus {
      outline: none;
    }
  }

  @layer rdg.SortableHeaderCellName {
    .h1rrblhe7-0-0-beta-20 {
      flex-grow: 1;
      overflow: hidden;
      overflow: clip;
      text-overflow: ellipsis;
    }
  }

  @layer rdg.HeaderCell {
    .celq7o97-0-0-beta-20 {
      touch-action: none;
    }

    .celq7o97-0-0-beta-20::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }

  @layer rdg.HeaderRow {
    .h197vzie7-0-0-beta-20 {
      display: contents;
      line-height: var(--rdg-header-row-height);
      background-color: var(--rdg-header-background-color);
      font-weight: bold;
    }

    .h197vzie7-0-0-beta-20 > .c1wupbe7-0-0-beta-20 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-20 > .cd0kgiy7-0-0-beta-20 {
      z-index: 2;
    }
  }

  @layer rdg.Cell {
    .ccpfvsn7-0-0-beta-20 {
      background-color: #ccccff;
    }
  }

  @layer rdg.Cell {
    .c1bmg16t7-0-0-beta-20 {
      background-color: #ccccff;
    }

    .c1bmg16t7-0-0-beta-20.ccpfvsn7-0-0-beta-20 {
      background-color: #9999ff;
    }
  }

  @layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-20:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-20 > .c1wupbe7-0-0-beta-20:not(:last-child):not(.c1730fa47-0-0-beta-20) {
      border-inline-end: none;
    }
  }

  @layer rdg.SummaryCell {
    .s1n3hxke7-0-0-beta-20 {
      inset-block-start: var(--rdg-summary-row-top);
      inset-block-end: var(--rdg-summary-row-bottom);
    }
  }

  @layer rdg.SummaryRow {
    .snfqesz7-0-0-beta-20 {
      line-height: var(--rdg-summary-row-height);
    }

    .snfqesz7-0-0-beta-20 > .c1wupbe7-0-0-beta-20 {
      position: sticky;
    }
  }

  @layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-20 > .c1wupbe7-0-0-beta-20 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-20 > .cd0kgiy7-0-0-beta-20 {
      z-index: 2;
    }
  }

  @layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-20 > .c1wupbe7-0-0-beta-20 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

  @layer rdg.SummaryRow {
    .b1odhhml7-0-0-beta-20 > .c1wupbe7-0-0-beta-20 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }

  @layer rdg.EditCell {
    .c1tngyp17-0-0-beta-20 {
      padding: 0;
    }
  }

  @layer rdg.DragHandle {
    .cadd3bp7-0-0-beta-20 {
      cursor: move;
      position: absolute;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 8px;
      block-size: 8px;
      background-color: var(--rdg-selection-color);
    }

    .cadd3bp7-0-0-beta-20:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }

  @layer rdg.SortIcon {
    .a1mygwml7-0-0-beta-20 {
      fill: currentColor;
    }

    .a1mygwml7-0-0-beta-20 > path {
      transition: d 0.1s;
    }
  }

  @layer rdg.TextEditor {
    .tlmcuo07-0-0-beta-20 {
      appearance: none;

      box-sizing: border-box;
      inline-size: 100%;
      block-size: 100%;
      padding-block: 0;
      padding-inline: 6px;
      border: 2px solid #ccc;
      vertical-align: top;
      color: var(--rdg-color);
      background-color: var(--rdg-background-color);

      font-family: inherit;
      font-size: var(--rdg-font-size);
    }

    .tlmcuo07-0-0-beta-20:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-20::placeholder {
      color: #999;
      opacity: 1;
    }
  }
`
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

  return data ? (
    <Container>
      <ReactDataGrid columns={columns} rows={rows} />
    </Container>
  ) : (
    <></>
  )
}
