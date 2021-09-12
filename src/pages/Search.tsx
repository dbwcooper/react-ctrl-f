import React, { useContext } from 'react';
import { SearchContext, SearchEventContext } from '../components';

export const SearchComponent = () => {
  const { searchValue, activeCount, totalCount } = useContext(SearchContext);
  const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
  return (
    <div style={{ padding: 16 }}>
      <input
        style={{ width: 200, marginRight: '12px', height: '24px' }}
        value={searchValue}
        onChange={onSearchChange}
      />
      <button style={{ height: '28px' }} title='Up' onClick={onPrev}>
        Prev
      </button>
      <span style={{ padding: '0px 12px' }}>
        {activeCount}/{totalCount}
      </span>
      <button
        style={{ height: '28px' }}
        title='Down'
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default SearchComponent;
