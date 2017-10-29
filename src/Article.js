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
});


const Article = ({ title, abstract, pdf, classes, tldr, keywords }) => (
  <Paper className={classes.root} evalation={4}>
    <Typography type="headline" component="h3">
      {title}
      <a className={classes.link} href={`https://openreview.net${pdf}`} rel="noopener noreferrer" target="_blank">
        <LaunchIcon /> PDF
      </a>
    </Typography>
    <Typography type="body2" component="p">
      <strong>TL;DR:</strong> {tldr}
    </Typography>
    <Typography type="body2" component="p">
      <strong>Keywords:</strong> {keywords.join(', ')}
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
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(Article);
