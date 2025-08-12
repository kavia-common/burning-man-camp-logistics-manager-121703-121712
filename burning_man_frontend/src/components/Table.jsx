import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Table
 * Minimal table wrapper with headers and rows.
 */
function Table({ columns = [], data = [] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.accessor}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((c) => (
                <td key={(c.key || c.accessor) + '_' + (row.id || idx)}>
                  {typeof c.render === 'function' ? c.render(row) : row[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
