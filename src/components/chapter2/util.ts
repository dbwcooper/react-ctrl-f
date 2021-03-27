
const Api =
  'https://devec.xxx.com/report-service/public/api/excel/e455e9ef-74f6-4540-8184-3c2f76224f67';

const IFRAME_ID = 'd_iframe_key_2020';
/**
 * 仅适用于以下场景
 * 1. api 请求方式为 get， 并返回文件流
 * 2. api 不是具体的文件名
 *    ok： https://xxxx/report-file/e455e9ef-74f6-4540-8184-3c2f76224f67
 *    error: https://xxxx/report-file/logo.xlsx
 * 3. api 的地址与当前页面的地址的 域名 必须一致！ (跨域)
 * 4. api 地址必须以 https 开头 见（https://developer.mozilla.org/zh-CN/docs/Security/MixedContent）
 * @param api string
 */
export const getIframeDownload = (api: string, onComplete?: (str: string | null) => void) => {
  let iframeDom = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
  if (iframeDom) {
    document.body.removeChild(iframeDom);
  }
  iframeDom = document.createElement('iframe');
  iframeDom.style.display = 'none';
  iframeDom.id = IFRAME_ID;
  iframeDom.src = api;
  // trigger download;
  iframeDom.onload = () => {
    // iframe 的地址与 当前页面的地址必须在相同的域名下! 才能拿到 contentDocument
    const iframeDoc = iframeDom.contentDocument;
    if (iframeDoc) {
      if (
        iframeDoc.readyState === 'complete' ||
        iframeDoc.readyState === 'interactive'
      ) {
        // 文件下载出错时；后端会返回一串字符，一般是一串json， 此时responseText有值
        // 文件正常下载时; responseText === null
        if (typeof onComplete === 'function') {
          const responseText = iframeDoc.body.textContent || null ;
          onComplete(responseText)
        }
      }
    }
  };
  document.body.appendChild(iframeDom);
};

/**
 * 1. api 请求方式为 get， 并返回文件流 | 或一个具体的文件
 * 2. api 的地址与当前页面的地址的 域名 必须一致！ (跨域)
 * 3. api 地址必须以 https 开头 见（https://developer.mozilla.org/zh-CN/docs/Security/MixedContent）
 * 
 * 缺点：
 *  1. 无法得知下载文件的进度
 *  2. ie下不 work
 * @param blob string｜blob
 * @param fileName 
 */
const A_ID = 'd_a_key_2020';
export const getADownload = (blob: Blob | string, fileName: string) => {
  const url = typeof blob === 'string' ? blob : window.URL.createObjectURL(blob);
  let aDom = document.getElementById(A_ID) as HTMLAnchorElement;
  if (!aDom) {
    aDom = document.createElement('a');
    document.body.appendChild(aDom);
  }
  aDom.id = A_ID;
  aDom.style.display = 'none';
  aDom.href = url;
  aDom.download = fileName; // ie dont work， download 属性添加之后，点击a 标签不会直接打开文件，而是下载这个文件。
  aDom.click();
  aDom.onload = () => {
    console.log('onload:')
  }
};


// saveAs， 建议使用 https://github.com/eligrey/FileSaver.js/
export function downloadUrlFile(url: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  // xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 获取图片blob数据并保存
      // saveAs(xhr.response, 'abc.xlsx');
    }
  };
 
  xhr.send();
}
  // 出错的情况下
  // timer第一次 iframeDoc.readyState 可能为 complete 但是iframeDoc.body.textContent 无返回值
  // const timer = setInterval(() => {
  //   // iframe 的地址与 当前页面的地址必须在相同的域名下! 才能拿到 contentDocument
  //   const iframeDoc = iframeDom.contentDocument;
  //   if (iframeDoc) {
  //     if (
  //       iframeDoc.readyState === 'complete' ||
  //       iframeDoc.readyState === 'interactive'
  //     ) {
  //       const responseText = iframeDoc.body.textContent;
  //       console.log('timer responseText: ', responseText);
  //       console.log('timer iframeDoc.readyState: ', iframeDoc.readyState);
  //     }
  //   }
  // }, 400);