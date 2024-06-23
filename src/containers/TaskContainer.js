import React, { useEffect, useState } from 'react';
import '../styles/pagination.scss';
import ListContainer from '../components/TodoList';


const TableContainer = ({ data }) => {
  const [current, setcurrent] = useState(1);
  const [paginatedData, setpaginatedData] = useState([]);
  const itemsPerPage = 2;
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setcurrent(number);
    changePaginatedData(number);
  };

  const changePaginatedData = (index = current) => {
    pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const indexOfLastTodo = index * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    setpaginatedData(data.slice(indexOfFirstTodo, indexOfLastTodo));
  };

  useEffect(() => {
    setcurrent(1);
    changePaginatedData(1);
  }, [data]);

  return (
    <div>
      {/* <ListContainer todos={paginatedData} />
      <div className="pagination">
        {pageNumbers.map((number) => {
          return (
            <span
              key={number}
              onClick={(e) => handleClick(number)}
              className={current === number ? 'active' : ''}
            >
              {number}
            </span>
          );
        })}
      </div> */}
      <ListContainer todos={data} />
    </div>
  );
};

export default TableContainer;
