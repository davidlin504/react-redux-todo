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
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
  const [group, setGroup] = useState('');
  const [searchData, setsearchData] = useState(data);

  const changeSearchData = (text) => {
    return data.filter((el) => {
        return el.tag.toLowerCase().indexOf(text.toLowerCase()) > -1;
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

  const rawData = !group ? changeSearchData(search) : changeSearchData(group)


  return (
    <div className={styles.container}>
      <FormControl className='search-section'>
        <TextField
          placeholder='key words ...'
          helperText='Search press esc to clear'
          value={search}
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={e => onkeypressed(e, setsearch)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="age-native-helper">Group</InputLabel>
        <NativeSelect
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
          >
          <option aria-label="None" value='' />
          <option value="tasks1">tasks1</option>
          <option value="tasks2">tasks2</option>
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      <TableContainer data={rawData} />
    </div>
  );
};

export default HomePage;
