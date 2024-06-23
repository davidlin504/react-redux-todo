import React, { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../containers/TaskContainer';
import styles from './styles.module.scss';
import Icon from '@material-ui/core/Icon';
import '../styles/app.scss'
import { fetchTestsThunk } from '../reducers/todoSlice'

const HomePage = () => {
  const dispatch = useDispatch();

  const fetchData = useCallback(
      () =>
        Promise.all([
          dispatch(fetchTestsThunk()).unwrap(),
        ]),
      [dispatch],
  )


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const data = useSelector((state) => state.todos || []);
  const [search, setsearch] = useState('');
  const [searchData, setsearchData] = useState(data);

  const changeSearchData = (text) => {
    return data.filter((el) => {
        return el.text.toLowerCase().indexOf(text.toLowerCase()) > -1;
    })
  };

  const debounceLoadData = useCallback(debounce(changeSearchData, 500), []);

  const handleSearch = (text) => {
    setsearch(text);
    // debounceLoadData(text)
  };

  const rawData = changeSearchData(search)

  return (
    <div className={styles.container}>
      <div className='search-section'>
        <input
          className={styles.search}
          value={search}
          placeholder='Search'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div onClick={() => setsearch('')}>
          <Icon
              className="material-icons"
              color="error"
            >
              clear
          </Icon>
        </div>
      </div>
      <TableContainer data={rawData} />
    </div>
  );
};

export default HomePage;
