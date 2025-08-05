import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { TripLog } from '../types/trip_types';
import "./trips_table.css"

const customHeaders: Record<string, string> = {
    tripDate: "Date",
    total_emissions: "Total Emissions (kg)",
    transportType: "Transport Method",
};

const columnHelper = createColumnHelper<TripLog>();
const tripLogKeys: (keyof TripLog)[]  = ["total_emissions", "transportType", "tripDate", "origin", "destination", "vehicle", "fuel"];

const columns = tripLogKeys.map(key =>
  columnHelper.accessor(key, {
    header: customHeaders[key] !== undefined ? customHeaders[key] : key.charAt(0).toUpperCase() + key.slice(1),
    cell: info => info.getValue(),
  })
);

export function TripsTable({tripLogs}: {tripLogs: TripLog[]}) {
  const table = useReactTable({
    data: tripLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  )
}
