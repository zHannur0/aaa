import React from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const PositionTable = ({ data, setPositions }) => {
  const handleDelete = async (id) => {
    const token = localStorage.getItem('ihunterToken');
    if (!token) return;

    try {
      await axios.delete(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPositions(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (!Array.isArray(data)) {
    return <p>No data available</p>;
  }

  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-md overflow-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr className="w-full border-b">
            <th className="py-2 px-4 text-left">Input positions</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">
                <div className="flex flex-col">
                  <span className="font-medium">{item.position}</span>
                </div>
              </td>
              <td className="py-2 px-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${item.status === 'Stopped' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-4">{item.date ? formatDate(item.date) : '--'}</td>
              <td className="py-2 px-4">
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleDelete(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
