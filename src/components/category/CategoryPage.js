import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

import CategoryMenuList from './CategoryMenuList';
import {fetchPostsByCategory, fetchPosts} from '../../actions/actionPosts';
import './category.css';

class CategoryPage extends Component {
  state = {
    selectedValue: this.props.match.params.category
  }

  onCategoryChange = (category) => {
    if (_.isEmpty(category)) {
      this.props.history.push('/');
      this.setState({selectedValue: null});
      this.props.dispatch(fetchPosts());
    } else {
      this.props.history.push(category);
      this.setState({selectedValue: category});
      this.props.dispatch(fetchPostsByCategory(category));
    }
  }

  render() {
    return(
      <CategoryMenuList 
        categories={this.props.categories}
        selectedCategory={this.state.selectedValue}
        onCategoryChange={this.onCategoryChange}/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps)(withRouter(CategoryPage));