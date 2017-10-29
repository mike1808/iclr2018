import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import './App.css';
import List from './Articles';


class App extends Component {
  render() {
    return (
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Typography type="display1" component="h1" gutterBottom>
              ICLR 2018 Conference Open Review Submissions
            </Typography>
            <List />
          </Grid>
        </Grid>
    );
  }
}

export default App;
