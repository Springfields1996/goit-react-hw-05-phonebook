import React from 'react';

export const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label>
        Sort by name
        <input
          style={{ marginLeft: 15 }}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
