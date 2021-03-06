[简体中文](./README.zh_CN.md)

# react-ctrl-f

A library that use `React` to realize the function of `Ctrl + F` in web version

## Usage

```jsx
import {
  MatchText,
  SearchProvider,
  SearchContext,
  SearchEventContext,
} from 'react-ctrl-f';
```

### MatchText properties

- `id` is required, you need to set a unique ID
- `ignorecase` is optional, default is `true`
- case:
  ```jsx
  <MatchText id='match-text-id-1'>Hello world</MatchText>
  ```

### SearchContext

- Provide store to search component
  ```jsx
  const { searchValue, activeCount, totalCount } = useContext(SearchContext);
  ```

### SearchEventContext

- Three events are provided to update store

  ```jsx
  const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
  ```

### SearchProvider

`SearchProvider` need to Wrap all `SearchContext` , `SearchEventContext`
and `MatchText`

properties

- `value` is optional

  - `value.fixedHeaderHeight` is optional, type is number
  - `value.onScroll` is optional, custom onScroll function

- case:

  ```jsx
  import React from 'react';
  import { MatchText, SearchProvider } from 'react-ctrl-f';
  export default function App() {
    const { searchValue, activeCount, totalCount } = useContext(SearchContext);
    const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
    return (
      <SearchProvider>
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100%',
            border: '1px solid green',
          }}
        >
          <input
            style={{ width: 200, marginRight: '12px', height: '24px' }}
            value={searchValue}
            onChange={onSearchChange}
          />
          <button
            style={{ height: '28px' }}
            title='Up'
            onClick={() => onPrev(100)}
          >
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
        <p>
          <MatchText id='match-1'>
            React components implement a render() method that takes input data
            and returns what to display. This example uses an XML-like syntax
            called JSX. Input data that is passed into the component can be
            accessed by render() via this.props. JSX is optional and not
            required to use React.
          </MatchText>
        </p>
      </SearchProvider>
    );
  }
  ```

see example `src/pages/Home.tsx` and `src/pages/Search.tsx`
