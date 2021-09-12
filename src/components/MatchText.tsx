import React, { useContext, useMemo, useLayoutEffect } from 'react';

import { SearchContext, SearchEventContext } from './MatchContext';
import { MatchTextProps } from './Types';

const MARK = '__$CTRL_F$__';

function escapeStr(str: string) {
  return `${str}`.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

function getMatchId(prefixId: string, index: number) {
  return `${prefixId}_${index}`;
}

function getMatchText(
  keyword: string,
  text: string,
  ignorecase: boolean = true
) {
  let keywordStr = keyword;
  let textStr = text;
  if (typeof keyword === 'number') {
    keywordStr = `${keyword}`;
  }
  if (typeof text === 'number') {
    textStr = `${text}`;
  }
  if (
    typeof keywordStr !== 'string' ||
    !keywordStr.trim() ||
    typeof textStr !== 'string' ||
    !textStr.trim() ||
    !textStr.toLowerCase().includes(keywordStr.toLowerCase()) // case insensitive
  ) {
    return text;
  }
  const regexp = new RegExp(escapeStr(keywordStr), ignorecase ? 'gi' : 'g');
  const matches: string[] = []; // save matched string, we will use this to overwrite keywordStr in the result string
  const textWithMark = textStr.replace(regexp, (match) => {
    matches.push(match);
    return MARK;
  });
  const slices = textWithMark.split(MARK);
  const data = {
    slices,
    matches,
  };
  return data;
}

export const MatchText = (data: MatchTextProps): React.ReactElement<string> => {
  let textStr = data.text!;
  const id = data.id;
  if (typeof data.children === 'string') {
    textStr = data.children;
  }
  if (!textStr) {
    return <>{textStr}</>;
  }

  let { searchValue, activeId, ignorecase } = useContext(SearchContext);
  const { onUpdateMatchList } = useContext(SearchEventContext);
  ignorecase =
    typeof data.ignorecase === 'boolean' ? data.ignorecase : ignorecase;

  const matchData = useMemo(
    () => getMatchText(searchValue, textStr, ignorecase),
    [searchValue]
  );

  useLayoutEffect(() => {
    if (typeof matchData === 'object') {
      const matchIds = matchData.matches.map((_, index) => ({
        id: getMatchId(id, index),
        idCount: index,
      }));
      onUpdateMatchList(matchIds);
    }
  }, [matchData]);

  if (typeof matchData === 'string') {
    return <>{matchData}</>;
  }
  const slicesLen = matchData.slices.length - 1;
  return (
    <React.Fragment>
      {matchData.slices.map((slice, index) => {
        if (index === slicesLen) {
          return slice;
        }
        const matchId = getMatchId(id, index);
        const color = matchId === activeId ? '#ff9632' : '#ffff00';
        const matchStr = matchData.matches[index];
        return (
          <React.Fragment key={index}>
            {slice}
            <span
              id={matchId}
              style={{
                backgroundColor: color,
                display: 'inline-block',
                whiteSpace: 'pre-wrap',
              }}
            >
              {matchStr}
            </span>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default MatchText;
