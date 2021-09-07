import React, {
  useReducer,
  useCallback,
  createContext,
  useEffect,
  useMemo,
} from 'react';

import {
  EventContextProps,
  MatchObjectProps,
  IState,
  IActions,
  IActionTypes,
} from './Types.d';

export const scrollToView = (id: string, fixHeaderHeight: number = 0) => {
  const dom = document.getElementById(id);
  if (dom) {
    const topOfElement =
      dom.getBoundingClientRect().bottom + window.pageYOffset - fixHeaderHeight;
    window.scroll({
      top: topOfElement,
      behavior: 'smooth',
    });
  }
};

const defaultStore: IState = {
  searchValue: '',
  totalCount: 0,

  activeCount: 0, // 当前选中 count, 小于等于 totalCount
  activeId: '', // 当前选中的 文本 对应的 id
  matchedList: [],
};

const searchEventStore: EventContextProps = {
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {},
  onPrev: () => {},
  onNext: () => {},
  onUpdateMatchList: (initialList: MatchObjectProps[]) => {},
};

export const SearchContext = createContext(defaultStore);
export const SearchEventContext = createContext(searchEventStore);

const reducer = (state: IState, action: IActions): IState => {
  if (action.type === IActionTypes.setSearchValue) {
    return {
      ...state,
      searchValue: action.payload.searchValue,
    };
  }

  if (action.type === IActionTypes.setActiveMatch) {
    return {
      ...state,
      activeId: action.payload.activeId,
      activeCount: action.payload.activeCount,
    };
  }
  if (action.type === IActionTypes.setMatchList) {
    return {
      ...state,
      matchedList: action.payload,
    };
  }
  return state;
};

export const SearchProvider = (props: { children: React.ReactNode }) => {
  const [store, dispatch] = useReducer(reducer, defaultStore);

  const activeCount = store.activeCount;
  const totalCount = store.matchedList?.length;
  const onSearchChange = useCallback((e) => {
    const searchValue = e.target.value;
    dispatch({ type: IActionTypes.setSearchValue, payload: { searchValue } });
  }, []);

  // 计算前一个 match
  const onPrev = useCallback(
    (fixedHeight) => {
      // prevCount 为 0 则说明 totalCount 也是 0, 这种情况不处理。
      if (activeCount > 0) {
        let prevActiveCount =
          activeCount - 1 < 1 ? store.matchedList.length : activeCount - 1;
        let matchIndex = prevActiveCount - 1;
        let prevActiveId = store.matchedList[matchIndex].id;
        dispatch({
          type: IActionTypes.setActiveMatch,
          payload: { activeId: prevActiveId, activeCount: prevActiveCount },
        });
        scrollToView(prevActiveId, fixedHeight);
      }
    },
    [activeCount, totalCount]
  );

  // 计算后一个 match
  const onNext = useCallback(
    (fixedHeight) => {
      if (activeCount > 0) {
        let nextActiveCount =
          activeCount + 1 > store.matchedList.length ? 1 : activeCount + 1;
        let matchIndex = nextActiveCount - 1;
        let nextActiveId = store.matchedList[matchIndex].id;
        dispatch({
          type: IActionTypes.setActiveMatch,
          payload: { activeId: nextActiveId, activeCount: nextActiveCount },
        });
        scrollToView(nextActiveId, fixedHeight);
      }
    },
    [activeCount, totalCount]
  );

  const onUpdateMatchList = useMemo(
    (initialList: MatchObjectProps[] = []) =>
      (matchList: MatchObjectProps[] = []) => {
        // 缓存 initialList
        initialList = initialList.concat(matchList);
        dispatch({ type: IActionTypes.setMatchList, payload: initialList });
      },
    [store.searchValue]
  );

  useEffect(() => {
    // 计算完所有 Match Component 之后，计算 totalCount 和 activeCount
    if (store.matchedList.length > 0) {
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: {
          activeId: store.matchedList[0].id,
          activeCount: 1,
        },
      });
    }
  }, [store.matchedList]);
  return (
    <SearchContext.Provider
      value={{
        ...store,
        totalCount,
      }}
    >
      <SearchEventContext.Provider
        value={{
          onSearchChange,
          onUpdateMatchList,
          onPrev,
          onNext,
        }}
      >
        {props.children}
      </SearchEventContext.Provider>
    </SearchContext.Provider>
  );
};
