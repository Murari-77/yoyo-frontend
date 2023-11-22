import React from 'react';

const Table = ({ headers, rows, handleActionClick, actionButtonText }) => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
            {handleActionClick && actionButtonText && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                  {column}
                </td>
              ))}
              {handleActionClick && actionButtonText && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-[#93349e] hover:bg-[#93349e] text-white px-4 py-2 rounded"
                    onClick={() => handleActionClick(rowIndex)}
                  >
                    {actionButtonText}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
