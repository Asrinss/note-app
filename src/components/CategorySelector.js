import React from 'react';

const CategorySelector = ({ currentCategory, setCurrentCategory }) => {
  const categories = ['All', 'General', 'Work', 'Personal', 'Ideas'];

  return (
    <div className="category-selector">
      <select 
        value={currentCategory} 
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;