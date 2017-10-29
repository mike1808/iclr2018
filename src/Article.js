import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import LaunchIcon from 'material-ui-icons/Launch';
import LinkIcon from 'material-ui-icons/Link';

const styles = theme => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 32,
  },
  link: {
    marginRight: 5,
  },
  pdf: {
    marginLeft: 5,
    textDecoration: 'none'
  },
});


const Article = ({ id, title, abstract, pdf, classes, tldr, keywords }) => (
  <Paper className={classes.root} evalation={4} id={id}>
    <Typography type="headline" component="h3">
      <a className={classes.link} href={`#${id}`}>
        <LinkIcon />
      </a>
      {title}
      <a className={classes.pdf} href={`https://openreview.net${pdf}`} rel="noopener noreferrer" target="_blank">
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  tldr: PropTypes.string,
  pdf: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(Article);
