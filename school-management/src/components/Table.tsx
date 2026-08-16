import React from "react";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}

export const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full mt-4 text-left border-collapse">
        <thead>
          <tr className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 pb-2">
            {columns.map((col) => (
              <th key={col.accessor} className={`py-3 px-3 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item) => renderRow(item))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400 text-xs">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
