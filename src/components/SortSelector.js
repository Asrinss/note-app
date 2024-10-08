import React from 'react';

const SortSelector = ({ sortBy, setSortBy }) => {
  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'favorite', label: 'Favorite' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div className="sort-selector">
      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;