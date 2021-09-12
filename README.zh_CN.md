[English](./README.md)

# react-ctrl-f

一个使用 `React` 实现网页版 `ctrl + f` 功能的库

## 用法

```js
import {
  MatchText,
  SearchProvider,
  SearchContext,
  SearchEventContext,
} from 'react-ctrl-f';
```

## API 说明

### MatchText

- `id` 是必须的, 你需要设置一个唯一的 id
- `ignorecase` 是可选项，默认是 `true`

- 示例：
  ```jsx
  <MatchText id='match-text-id-1'>Hello world</MatchText>
  ```

### SearchContext

- 给 Search 组件提供 store
  ```jsx
  const { searchValue, activeCount, totalCount } = useContext(SearchContext);
  ```

### SearchEventContext

- 给 Search 组件提供 三个事件，用于更新 store

  ```jsx
  const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
  ```

### SearchProvider

`SearchContext` 的 Provider, 需要使用 `SearchProvider` 包裹 `Search` 和 `MatchText` 组件。

- `value` 是可选项

  - `value.fixedHeaderHeight` 是可选项, 类型是 `number`
  - `value.onScroll` 是可选项，传入一个自定义的函数

- 示例：

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

查看演示例子 `src/pages/Home.tsx` and `src/pages/Search.tsx`
