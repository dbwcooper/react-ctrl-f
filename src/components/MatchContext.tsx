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

  activeCount: 0, // actived count, less than or equal totalCount
  activeId: '', // active text id
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

  // Calculate previous match text
  const onPrev = useCallback(
    (fixedHeight) => {
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

  // Calculate next match text
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
        // cache initialList
        initialList = initialList.concat(matchList);
        dispatch({ type: IActionTypes.setMatchList, payload: initialList });
      },
    [store.searchValue]
  );

  useEffect(() => {
    // After calculating all match components, calculate totalCount and activeCount
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
