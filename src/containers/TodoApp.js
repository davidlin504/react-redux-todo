import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import MuiThemeProvider from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import * as todoActions from '../actions/todos';
import Paper from '@material-ui/core/Paper';

import Header from '../components/Header';
import SearchTable from '../components/SearchTable';


const theme = createTheme({
  palette: {
    primary: {
      // light: 如果省略將從 palette.primary.main 依照 tonalOffset 的值去計算
      main: '#ff4400',
      // dark: 如果省略將從 palette.primary.main 依照 tonalOffset 的值去計算,
      // contrastText: 如果省略將從 palette.primary.main 依照 contrastThreshold 的值去計算
    },
  }
});

const TodoApp = () => (
  <MuiThemeProvider theme={theme}>
    <div style={styles.container}>
      <Paper
        style={styles.paper}
      >
        <Header />
        <SearchTable />
      </Paper>
    </div>
  </MuiThemeProvider>
);

const styles = {
  container: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: 20,
    width: '50%',
  },
};

export default TodoApp
