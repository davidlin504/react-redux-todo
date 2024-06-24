import React, { useEffect, useState } from 'react';
import ListContainer from '../components/TodoList';

const TableContainer = ({ data }) => {
  const [current, setCurrent] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 2;

  // Function to calculate page numbers
  const calculatePageNumbers = () => {
    return Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1);
  };

  // Function to handle page change
  const handlePageChange = (number) => {
    setCurrent(number);
    setPaginatedData(getPaginatedData(number));
  };

  // Function to get paginated data for a given page number
  const getPaginatedData = (pageNumber) => {
    const indexOfLastTodo = pageNumber * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    return data.slice(indexOfFirstTodo, indexOfLastTodo);
  };

  // useEffect(() => {
  //   // Reset to page 1 when data changes significantly (not just length)
  //   setCurrent(1);
  //   setPaginatedData(getPaginatedData(1));
  // }, [data]); // Only reset if data reference changes

  return (
    <div>
      <ListContainer todos={paginatedData} />
      <div className="pagination">
        {calculatePageNumbers().map((number) => (
          <span
            key={number}
            onClick={() => handlePageChange(number)}
            className={current === number ? 'active' : ''}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TableContainer;
