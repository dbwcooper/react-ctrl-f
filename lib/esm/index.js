var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/MatchContext.tsx
import React, {
  useReducer,
  useCallback,
  createContext,
  useEffect,
  useMemo
} from "react";

// src/components/Types.d.ts
var IActionTypes;
(function(IActionTypes2) {
  IActionTypes2["setSearchValue"] = "setSearchValue";
  IActionTypes2["setActiveMatch"] = "setActiveMatch";
  IActionTypes2["setMatchList"] = "setMatchList";
})(IActionTypes || (IActionTypes = {}));

// src/components/MatchContext.tsx
var scrollToView = (id, fixHeaderHeight = 0) => {
  const dom = document.getElementById(id);
  if (dom) {
    const topOfElement = dom.getBoundingClientRect().bottom + window.pageYOffset - fixHeaderHeight;
    window.scroll({
      top: topOfElement,
      behavior: "smooth"
    });
  }
};
var defaultStore = {
  searchValue: "",
  totalCount: 0,
  activeCount: 0,
  activeId: "",
  matchedList: []
};
var searchEventStore = {
  onSearchChange: () => {
  },
  onPrev: () => {
  },
  onNext: () => {
  },
  onUpdateMatchList: () => {
  }
};
var reducer = (state, action) => {
  if (action.type === IActionTypes.setSearchValue) {
    return __spreadProps(__spreadValues({}, state), {
      searchValue: action.payload.searchValue
    });
  }
  if (action.type === IActionTypes.setActiveMatch) {
    return __spreadProps(__spreadValues({}, state), {
      activeId: action.payload.activeId,
      activeCount: action.payload.activeCount
    });
  }
  if (action.type === IActionTypes.setMatchList) {
    return __spreadProps(__spreadValues({}, state), {
      matchedList: action.payload
    });
  }
  return state;
};
var SearchContext = createContext(defaultStore);
var SearchEventContext = createContext(searchEventStore);
var SearchProvider = (props) => {
  var _a, _b;
  const [store, dispatch] = useReducer(reducer, defaultStore);
  const activeCount = store.activeCount;
  const totalCount = (_a = store.matchedList) == null ? void 0 : _a.length;
  const onSearchChange = useCallback((e) => {
    const searchValue = e.target.value;
    dispatch({ type: IActionTypes.setSearchValue, payload: { searchValue } });
  }, []);
  const onPrev = useCallback((fixedHeaderHeight) => {
    var _a2, _b2, _c;
    if (activeCount > 0) {
      let prevActiveCount = activeCount - 1 < 1 ? store.matchedList.length : activeCount - 1;
      let matchIndex = prevActiveCount - 1;
      let prevActiveId = store.matchedList[matchIndex].id;
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: { activeId: prevActiveId, activeCount: prevActiveCount }
      });
      if (typeof fixedHeaderHeight !== "number") {
        fixedHeaderHeight = (_a2 = props.value) == null ? void 0 : _a2.fixedHeaderHeight;
      }
      if (typeof ((_b2 = props.value) == null ? void 0 : _b2.onScroll) === "function") {
        (_c = props.value) == null ? void 0 : _c.onScroll(prevActiveId, fixedHeaderHeight);
      } else {
        scrollToView(prevActiveId, fixedHeaderHeight);
      }
    }
  }, [activeCount, totalCount]);
  const onNext = useCallback((fixedHeaderHeight) => {
    var _a2, _b2, _c;
    if (activeCount > 0) {
      let nextActiveCount = activeCount + 1 > store.matchedList.length ? 1 : activeCount + 1;
      let matchIndex = nextActiveCount - 1;
      let nextActiveId = store.matchedList[matchIndex].id;
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: { activeId: nextActiveId, activeCount: nextActiveCount }
      });
      if (typeof fixedHeaderHeight !== "number") {
        fixedHeaderHeight = (_a2 = props.value) == null ? void 0 : _a2.fixedHeaderHeight;
      }
      if (typeof ((_b2 = props.value) == null ? void 0 : _b2.onScroll) === "function") {
        (_c = props.value) == null ? void 0 : _c.onScroll(nextActiveId, fixedHeaderHeight);
      } else {
        scrollToView(nextActiveId, fixedHeaderHeight);
      }
    }
  }, [activeCount, totalCount]);
  const onUpdateMatchList = useMemo((cacheList = []) => (matchList = []) => {
    cacheList = cacheList.concat(matchList);
    dispatch({ type: IActionTypes.setMatchList, payload: cacheList });
  }, [store.searchValue]);
  useEffect(() => {
    if (store.matchedList.length > 0) {
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: {
          activeId: store.matchedList[0].id,
          activeCount: 1
        }
      });
    }
  }, [store.matchedList]);
  return /* @__PURE__ */ React.createElement(SearchContext.Provider, {
    value: __spreadProps(__spreadValues({}, store), {
      totalCount,
      ignorecase: (_b = props.value) == null ? void 0 : _b.ignorecase
    })
  }, /* @__PURE__ */ React.createElement(SearchEventContext.Provider, {
    value: {
      onSearchChange,
      onUpdateMatchList,
      onPrev,
      onNext
    }
  }, props.children));
};

// src/components/MatchText.tsx
import React2, { useContext, useMemo as useMemo2, useLayoutEffect } from "react";
var MARK = "__$CTRL_F$__";
function escapeStr(str) {
  return `${str}`.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
function getMatchId(prefixId, index) {
  return `${prefixId}_${index}`;
}
function getMatchText(keyword, text, ignorecase = true) {
  let keywordStr = keyword;
  let textStr = text;
  if (typeof keyword === "number") {
    keywordStr = `${keyword}`;
  }
  if (typeof text === "number") {
    textStr = `${text}`;
  }
  if (typeof keywordStr !== "string" || !keywordStr.trim() || typeof textStr !== "string" || !textStr.trim() || !textStr.toLowerCase().includes(keywordStr.toLowerCase())) {
    return text;
  }
  const regexp = new RegExp(escapeStr(keywordStr), ignorecase ? "gi" : "g");
  const matches = [];
  const textWithMark = textStr.replace(regexp, (match) => {
    matches.push(match);
    return MARK;
  });
  const slices = textWithMark.split(MARK);
  const data = {
    slices,
    matches
  };
  return data;
}
var MatchText = (data) => {
  let textStr = data.text;
  const id = data.id;
  if (typeof data.children === "string") {
    textStr = data.children;
  }
  if (!textStr) {
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, textStr);
  }
  let { searchValue, activeId, ignorecase } = useContext(SearchContext);
  const { onUpdateMatchList } = useContext(SearchEventContext);
  ignorecase = typeof data.ignorecase === "boolean" ? data.ignorecase : ignorecase;
  const matchData = useMemo2(() => getMatchText(searchValue, textStr, ignorecase), [searchValue, textStr]);
  useLayoutEffect(() => {
    if (typeof matchData === "object") {
      const matchIds = matchData.matches.map((_, index) => ({
        id: getMatchId(id, index),
        idCount: index
      }));
      onUpdateMatchList(matchIds);
    }
  }, [matchData]);
  if (typeof matchData === "string") {
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, matchData);
  }
  const slicesLen = matchData.slices.length - 1;
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, matchData.slices.map((slice, index) => {
    if (index === slicesLen) {
      return slice;
    }
    const matchId = getMatchId(id, index);
    const color = matchId === activeId ? "#ff9632" : "#ffff00";
    const matchStr = matchData.matches[index];
    return /* @__PURE__ */ React2.createElement(React2.Fragment, {
      key: index
    }, slice, /* @__PURE__ */ React2.createElement("span", {
      id: matchId,
      style: {
        backgroundColor: color,
        display: "inline-block",
        whiteSpace: "pre-wrap"
      }
    }, matchStr));
  }));
};
export {
  MatchText,
  SearchContext,
  SearchEventContext,
  SearchProvider
};
//# sourceMappingURL=index.js.map
