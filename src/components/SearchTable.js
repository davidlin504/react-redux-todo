import React, { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../containers/TaskContainer';
import styles from './styles.module.scss';
import Icon from '@material-ui/core/Icon';
import '../styles/app.scss'
import { fetchTestsThunk } from '../reducers/todoSlice'
import { loginThunk } from '../reducers/userSlice'

const HomePage = () => {
  const { isLoading, setIsLoading } = useState(false)
  const dispatch = useDispatch();


  const onSubmitCallback = useCallback(
    (data) => {
      setIsLoading(true)
      dispatch(loginThunk(data))
      .unwrap()
      .then(res => {
        // setRedirectPath(`/${res.display_tabs[0]}`)
      })
      .catch(rejectedValueOrSerializedError => {
        // setErrorMessage(
        //     rejectedValueOrSerializedError === 401
        //       ? '帳號或密碼有誤'
        //       : '登入時遇到問題，再試一次',
        //   )
        })
      .finally(() => setIsLoading(false))
  })

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
      {/* <form onSubmit={() => onSubmitCallback(data)}>
      </form> */}
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
