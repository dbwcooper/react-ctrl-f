import React from 'react';

interface MatchObjectProps {
  id: string;
  idCount: number;
}

interface IState {
  searchValue: string;
  totalCount: number;
  activeCount: number; // 当前选中 count, 小于等于 totalCount
  activeId: string; // 当前选中的 文本 对应的 id
  matchedList: MatchObjectProps[];
}

interface EventContextProps {
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onNext: (fixHeaderHeight: number) => void;
  onPrev: (fixHeaderHeight: number) => void;
  onUpdateMatchList: (matchedList: MatchObjectProps[]) => void;
}

interface MatchTextProps {
  id: string;
  text?: string;
  children?: React.ReactChild;
}

declare const SearchContext: React.Context<IState>;
declare const SearchEventContext: React.Context<EventContextProps>;
declare const SearchProvider: (props: {
    children: React.ReactNode;
}) => JSX.Element;

declare const MatchText: (data: MatchTextProps) => React.ReactElement<string>;

export { MatchText, SearchContext, SearchEventContext, SearchProvider };
