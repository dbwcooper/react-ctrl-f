var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/components/index.ts
__export(exports, {
  MatchText: () => MatchText,
  SearchContext: () => SearchContext,
  SearchEventContext: () => SearchEventContext,
  SearchProvider: () => SearchProvider
});

// src/components/MatchContext.tsx
var import_react = __toModule(require("react"));

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
  onSearchChange: (event) => {
  },
  onPrev: () => {
  },
  onNext: () => {
  },
  onUpdateMatchList: (initialList) => {
  }
};
var SearchContext = (0, import_react.createContext)(defaultStore);
var SearchEventContext = (0, import_react.createContext)(searchEventStore);
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
var SearchProvider = (props) => {
  var _a;
  const [store, dispatch] = (0, import_react.useReducer)(reducer, defaultStore);
  const activeCount = store.activeCount;
  const totalCount = (_a = store.matchedList) == null ? void 0 : _a.length;
  const onSearchChange = (0, import_react.useCallback)((e) => {
    const searchValue = e.target.value;
    dispatch({ type: IActionTypes.setSearchValue, payload: { searchValue } });
  }, []);
  const onPrev = (0, import_react.useCallback)((fixedHeight) => {
    if (activeCount > 0) {
      let prevActiveCount = activeCount - 1 < 1 ? store.matchedList.length : activeCount - 1;
      let matchIndex = prevActiveCount - 1;
      let prevActiveId = store.matchedList[matchIndex].id;
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: { activeId: prevActiveId, activeCount: prevActiveCount }
      });
      scrollToView(prevActiveId, fixedHeight);
    }
  }, [activeCount, totalCount]);
  const onNext = (0, import_react.useCallback)((fixedHeight) => {
    if (activeCount > 0) {
      let nextActiveCount = activeCount + 1 > store.matchedList.length ? 1 : activeCount + 1;
      let matchIndex = nextActiveCount - 1;
      let nextActiveId = store.matchedList[matchIndex].id;
      dispatch({
        type: IActionTypes.setActiveMatch,
        payload: { activeId: nextActiveId, activeCount: nextActiveCount }
      });
      scrollToView(nextActiveId, fixedHeight);
    }
  }, [activeCount, totalCount]);
  const onUpdateMatchList = (0, import_react.useMemo)((initialList = []) => (matchList = []) => {
    initialList = initialList.concat(matchList);
    dispatch({ type: IActionTypes.setMatchList, payload: initialList });
  }, [store.searchValue]);
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ import_react.default.createElement(SearchContext.Provider, {
    value: __spreadProps(__spreadValues({}, store), {
      totalCount
    })
  }, /* @__PURE__ */ import_react.default.createElement(SearchEventContext.Provider, {
    value: {
      onSearchChange,
      onUpdateMatchList,
      onPrev,
      onNext
    }
  }, props.children));
};

// src/components/MatchText.tsx
var import_react2 = __toModule(require("react"));
var MARK = "__$CTRL_F$__";
function escapeStr(str) {
  return `${str}`.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
function getMatchId(prefixId, index) {
  return `${prefixId}_${index}`;
}
function getMatchText(keyword, text) {
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
  const regexp = new RegExp(escapeStr(keywordStr), "gi");
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
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, textStr);
  }
  const { searchValue, activeId } = (0, import_react2.useContext)(SearchContext);
  const { onUpdateMatchList } = (0, import_react2.useContext)(SearchEventContext);
  const matchData = (0, import_react2.useMemo)(() => getMatchText(searchValue, textStr), [searchValue]);
  (0, import_react2.useLayoutEffect)(() => {
    if (typeof matchData === "object") {
      const matchIds = matchData.matches.map((_, index) => ({
        id: getMatchId(id, index),
        idCount: index
      }));
      onUpdateMatchList(matchIds);
    }
  }, [matchData]);
  if (typeof matchData === "string") {
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, matchData);
  }
  const slicesLen = matchData.slices.length - 1;
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, matchData.slices.map((slice, index) => {
    if (index === slicesLen) {
      return slice;
    }
    const matchId = getMatchId(id, index);
    const color = matchId === activeId ? "#ff9632" : "#ffff00";
    const matchStr = matchData.matches[index];
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, {
      key: index
    }, slice, /* @__PURE__ */ import_react2.default.createElement("span", {
      id: matchId,
      style: {
        backgroundColor: color,
        display: "inline-block",
        whiteSpace: "pre-wrap"
      }
    }, matchStr));
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MatchText,
  SearchContext,
  SearchEventContext,
  SearchProvider
});
//# sourceMappingURL=index.js.map
