import React, { useCallback } from 'react';
import { getIframeDownload } from './util';

const Api =
  'https://devec.synnex.com/report-service/public/api/excel/e455e9ef-74f6-4540-8184-3c2f76224f67';

const App = () => {

  const onClick = useCallback(() => {
    getIframeDownload(Api)
  }, [0])
  return (
    <div>
      <a href="http://localhost:9001/pdf" target="_blank" download="123">
        download pdf
      </a>
      <button onClick={onClick}>iframe download</button>
    </div>
  );
};

export default App;
