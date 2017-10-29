import React, { Component } from 'react';
import { createSelector } from 'reselect';
import lunr from 'lunr';
import Grid from 'material-ui/Grid';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Autosuggest from './Autosuggest';

import papersData from './data.json';
import List from './List';


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: papersData,
      query: '',
      onlySaved: false,
      saved: JSON.parse(window.localStorage.getItem('savedPaperIds')) || {},
    };

    this.inverted = new Map(papersData.map(paper => [paper.id, paper]));
    this.keywordsMap = new Map();
    papersData.forEach(paper => {
      paper.keywords.forEach(kw => {
        if (this.keywordsMap.has(kw)) {
          this.keywordsMap.get(kw).push(paper.id);
        } else {
          this.keywordsMap.set(kw, [paper.id]);
        }
      })
    });

    this.keywordsOptions = Array.from(this.keywordsMap.entries())
      .map(([kw, ids]) => [kw, ids.length])
      .sort((a, b) => b[1] - a[1])
      .map(a => a[0]);

    this.idx = lunr(function () {
      this.field('title');
      this.field('abstract');
      this.field('kw');
      this.field('tldr');

      papersData.forEach(paper => {
        paper.kw = paper.keywords.join(' ');
        this.add(paper);
      });
    });

    this.papersSelector = createSelector(
      state => state.query,
      state => state.onlySaved,
      state => state.saved,
      (query, onlySaved, saved) => {
        let papers = query ?
          this.idx.search(query).map(result => this.inverted.get(result.ref))
          :
          papersData;

        if (onlySaved) {
          papers = papers.filter(paper => saved[paper.id]);
        }

        return papers;
      }
    )
  }

  handleQueryChange = (query) => {
    this.setState({ query }, this.updateFilteredPapers);
  };

  handleSaveCheck = (paperId, checked) => {
    const saved = {
      ...this.state.saved,
      [paperId]: checked,
    };

    window.localStorage.setItem('savedPaperIds', JSON.stringify(saved));

    this.setState({
      saved,
    }, this.updateFilteredPapers)
  };

  handleOnlySaveChange = (event, checked) => {
    this.setState({ onlySaved: checked }, this.updateFilteredPapers);
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.keywordsOptions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  };

  updateFilteredPapers() {
    this.setState({ papers: this.papersSelector(this.state) });
  }

  render() {
    const { papers, query, onlySaved, saved } = this.state;

    return (
      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <FormGroup row>
            <Autosuggest
              value={query}
              onChange={this.handleQueryChange}
              getSuggestions={this.getSuggestions}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={onlySaved}
                  onChange={this.handleOnlySaveChange}
                />
              }
              label="Only saved"
              style={{ marginLeft: 10 }}
            />
          </FormGroup>


        </Grid>
        <Grid item xs={12}>
          <List papers={papers} saved={saved} onCheck={this.handleSaveCheck} />
        </Grid>
      </Grid>
    )
  }
}

Articles.propTypes = {};

export default Articles;
