import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CategoryMenuList = ({categories, selectedCategory, onCategoryChange}) => {

  const handleOptionChange = (changeEvent) => {
    onCategoryChange(changeEvent.target.value);
  };

  return (
    <nav className="filter-category">
      <div className="radio">
          <label className="filter-category-item">
            <input 
              type="radio" 
              value='' 
              checked={_.isNil(selectedCategory)} 
              onChange={handleOptionChange} />
            <span>All Posts</span>
          </label>
        </div>
      {categories.map((category, index) =>
        <div key={index} className="radio">
          <label className="filter-category-item">
            <input 
              type="radio" 
              value={category.name} 
              checked={selectedCategory === category.name} 
              onChange={handleOptionChange} />
            <span>{_.startCase(category.name)}</span>
          </label>
        </div>
      )}
    </nav>
  );
};

CategoryMenuList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryMenuList