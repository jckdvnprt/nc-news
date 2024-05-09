import React from 'react';

function DropDownMenu({ sortBy, sortOrder, handleSortChange }) {
  return (
    <div className="sort-dropdowns">
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" name="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="votes">Votes</option>
      </select>
      <label htmlFor="sortOrder">Order:</label>
      <select id="sortOrder" name="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default DropDownMenu;
