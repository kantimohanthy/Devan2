interface DataTableProps {
  headers: string[];
}

export default function DataTable({
  headers,
}: DataTableProps) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-4 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border-t border-zinc-800">
            <td
              colSpan={headers.length}
              className="p-4 text-zinc-500"
            >
              No data found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}