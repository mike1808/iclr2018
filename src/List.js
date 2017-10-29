import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid'
import Article from './Article';
import Checkbox from 'material-ui/Checkbox';


class List extends PureComponent {
  render() {
    const { papers, saved, onCheck } = this.props;

    return (
      <Grid container>
        {papers.map(paper => (
          <Grid item key={paper.id} xs={12}>
            <Grid container direction="row">
              <Grid item>
                <Checkbox
                  checked={saved[paper.id]}
                  onChange={(event, checked) => onCheck(paper.id, checked)}
                />
              </Grid>
              <Grid item xs>
                <Article
                  title={paper.title}
                  abstract={paper.abstract}
                  pdf={paper.pdf}
                  tldr={paper.tldr}
                  keywords={paper.keywords}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

List.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  saved: PropTypes.objectOf(PropTypes.bool).isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default List;
