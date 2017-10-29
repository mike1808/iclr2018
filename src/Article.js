import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import LaunchIcon from 'material-ui-icons/Launch';

const styles = theme => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 32,
  },
  link: {
    marginLeft: 5,
    textDecoration: 'none'
  },
  tldr: {
    fontWeight: 800,
  }
});


const Article = ({ title, abstract, pdf, classes, tldr }) => (
  <Paper className={classes.root} evalation={4}>
    <Typography type="headline" component="h3">
      {title}
      <a className={classes.link} href={`https://openreview.net${pdf}`} rel="noopener noreferrer" target="_blank">
        <LaunchIcon /> PDF
      </a>
    </Typography>
    <Typography type="body2" component="p" className={classes.tldr}>
      TL;DR: {tldr}
    </Typography>
    <Typography type="body1" component="p">
      {abstract}
    </Typography>
  </Paper>
);

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  tldr: PropTypes.string,
  pdf: PropTypes.string.isRequired,
};

export default withStyles(styles)(Article);
