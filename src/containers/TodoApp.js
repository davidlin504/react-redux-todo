import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import MuiThemeProvider from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import * as todoActions from '../actions/todos';
import Paper from '@material-ui/core/Paper';

import Header from '../components/Header';
import SearchTable from '../components/SearchTable';
import GitSection from '../components/GitSection';


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const TodoApp = () => (
  <MuiThemeProvider theme={theme}>
    <div style={styles.container}>
      <Paper
        style={styles.paper}
      >
        <Header />
        <SearchTable />
        <GitSection />
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
