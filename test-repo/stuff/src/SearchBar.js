import React, { useState } from 'react';
import './SearchBar.css'; // Assuming you'll place the CSS in this file

const SearchBar = ({ data }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredData = data.filter(item => 
    item.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        value={searchInput} 
        onChange={e => setSearchInput(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        placeholder="Search..."
      />
      {showDropdown && (
        <div style={{ 
          border: '1px solid #ccc', 
          maxHeight: '150px', 
          overflowY: 'scroll', 
          position: 'absolute', 
          width: '100%' 
        }}>
          {filteredData.map((item, index) => (
            <div 
              key={index} 
              onClick={() => {
                setSearchInput(item);
                setShowDropdown(false);
              }}
              className="dropdown-item"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
