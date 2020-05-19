### 文件下载 
常见处理文件下载方式有两种

- #### 新开浏览器tab下载 

  后端返回格式|如何处理|优点|缺点
  ---:|--|--|---
  文件流|window.open|简单|新开tab页面会有一瞬间的空白；ie下可能拦截； 无法处理接口异常；
  文件链接|window.open|简单|新开tab页面会有一瞬间的空白；ie下可能拦截； 无法处理接口异常；

- #### 当前页面下载 
  后端返回格式|如何处理|优点|缺点
  ---:|--|--|:---:
  文件流|iframe|能处理接口异常；有浏览器自带的进度条显示 交互友好|无
  文件链接|iframe|能处理接口异常；有浏览器自带的进度条显示 交互友好|无
  文件流| a|简单，ie 不兼容|无
  文件链接|a|简单，ie 不兼容|无
  
- #### 使用 a 标签
  - 要求 
    -  api 请求方式为 get， 并返回文件流 | 或一个具体的文件
    -  api 的地址与当前页面的地址的 域名 必须一致！ (跨域)
    -  api 地址必须以 https 开头 见 [MDN 安全策略](https://developer.mozilla.org/zh-CN/docs/Security/MixedContent)
 - 缺点
   - 无法得知下载文件的进度
   - ie下 a 标签没有 <span style="color: red;">download</span> 属性，点击a 标签会直接打开文件 而不是下载。
 - 代码
    ```ts
    const A_ID = 'd_a_key_2020';
    const getADownload = (blob: Blob | string, fileName: string) => {
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
    ``` 
- #### 使用 iframe 标签 (最靠谱)
  - 要求
    - api 请求方式为 get， 并返回文件流
    - api 的地址与当前页面的地址的 域名 必须一致！ (跨域)
    - api 地址必须以 https 开头 见 [MDN 安全策略](https://developer.mozilla.org/zh-CN/docs/Security/MixedContent)
    - api 不是具体的文件名   
     ok： https://xxxx/report-file/e455e9ef-74f6-4540-8184-3c2f76224f67
     error: https://xxxx/report-file/logo.xlsx

  - 代码 
    ```ts
    const getIframeDownload = (api: string, onComplete?: (str: string | null) => void) => {
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
    ```
- ### POST 方式下载
  代码 
  ```ts
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
  ```
  