import React, { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../containers/TaskContainer';
import styles from './styles.module.scss';
import Icon from '@material-ui/core/Icon';
import '../styles/app.scss'
import { fetchTestsThunk } from '../reducers/todoSlice'
import { loginThunk } from '../reducers/userSlice'
import TextField from '@material-ui/core/TextField';

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


  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

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

  function onkeypressed(evt, setsearch) {
      let code = evt.charCode || evt.keyCode;
      if (code == 27) {
          setsearch('');
      }
  }


  const rawData = changeSearchData(search)

  return (
    <div className={styles.container}>
      <div className='search-section'>
        <TextField
          placeholder='key words ...'
          helperText='Search press esc to clear'
          value={search}
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={e => onkeypressed(e, setsearch)}
        />
      </div>
      <TableContainer data={rawData} />
    </div>
  );
};

export default HomePage;
