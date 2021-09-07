import React, { useContext } from 'react';
import { SearchContext, SearchEventContext } from '../../lib';

export const SearchComponent = () => {
  const { searchValue, activeCount, totalCount } = useContext(SearchContext);
  const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
  return (
    <div className='snx-padding-2'>
      <input
        style={{ width: 200, marginRight: '12px', height: '24px' }}
        value={searchValue}
        onChange={onSearchChange}
      />
      <button style={{ height: '28px' }} title='Up' onClick={() => onPrev(100)}>
        Prev
      </button>
      <span style={{ padding: '0px 12px' }}>
        {activeCount}/{totalCount}
      </span>
      <button
        style={{ height: '28px' }}
        title='Down'
        onClick={() => onNext(100)}
      >
        Next
      </button>
    </div>
  );
};

export default SearchComponent;
