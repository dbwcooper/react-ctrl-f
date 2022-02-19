import React from 'react';

interface MatchObjectProps {
  id: string;
  idCount: number;
}

interface IState {
  searchValue: string;
  totalCount: number;
  activeCount: number;
  activeId: string;
  matchedList: MatchObjectProps[];
  ignorecase?: boolean;
}

interface EventContextProps {
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onNext: (data: any) => void;
  onPrev: (data: any) => void;
  onUpdateMatchList: (matchedList: MatchObjectProps[]) => void;
}

interface MatchTextProps {
  id: string;
  text?: string;
  children?: React.ReactChild;
  ignorecase?: boolean;
}

interface SearchProviderProps {
  children: React.ReactNode;
  value?: {
    fixedHeaderHeight?: number;
    onScroll?: (id: string, fixedHeight?: number) => void;
    ignorecase?: boolean;
  };
}

declare const SearchContext: React.Context<IState>;
declare const SearchEventContext: React.Context<EventContextProps>;
declare const SearchProvider: (props: SearchProviderProps) => JSX.Element;

declare const MatchText: (data: MatchTextProps) => React.ReactElement<string>;

export { MatchText, SearchContext, SearchEventContext, SearchProvider };
