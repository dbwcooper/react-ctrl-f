import React from 'react';

export enum IActionTypes {
  setSearchValue = 'setSearchValue',
  setActiveMatch = 'setActiveMatch',
  setMatchList = 'setMatchList',
}

export interface MatchObjectProps {
  id: string;
  idCount: number;
}

export interface IState {
  searchValue: string;
  totalCount: number;
  activeCount: number;
  activeId: string;
  matchedList: MatchObjectProps[];
}

export interface EventContextProps {
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onNext: (fixHeaderHeight: number) => void;
  onPrev: (fixHeaderHeight: number) => void;
  onUpdateMatchList: (matchedList: MatchObjectProps[]) => void;
}

export interface IAction1 {
  type: IActionTypes.setSearchValue;
  payload: {
    searchValue: string;
  };
}

export interface IAction2 {
  type: IActionTypes.setActiveMatch;
  payload: {
    activeId: string;
    activeCount: number;
  };
}

export interface IAction3 {
  type: IActionTypes.setMatchList;
  payload: MatchObjectProps[];
}
export type IActions = IAction1 | IAction2 | IAction3;

export interface MatchTextProps {
  id: string;
  text?: string;
  children?: React.ReactChild;
}
