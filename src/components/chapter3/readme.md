### 产生白屏的原因

1. 页面白屏原因：
   网站加载一个 html 模版页面，使用打包后的 js 生成对应的 html 标签，在这个过程中，js 加载的网络时间，js 生成 dom 的时间段页面都是白屏

### ssr 流程


### ssr 遇到的问题

- ### 无法找到静态资源文件。
  在我们创建的 node server 中需要加入静态资源的路由识别。例如
  ```javascript
  const uri = url.parse(req.url).pathname;
  if (uri === '/') {
    // 首页 渲染 html页面
    res.end(serverData);
  } else {
    //输出打包后的静态文件 index.js
    fs.createReadStream('./server/build/index.js').pipe(res);
  }
  ```
  tips: 默认为 package.json 所在目录作为根路径
- ### require is not defined
  - 原因: 出现这种问题一般是 因为 服务端打包的文件规范为 commonjs， 会输出类似 `module.exports = require(\"fs\");` 的代码，在浏览器端无法识别。
  - 解决方案: 在启动 server 时；server 端打包 react 文件通过 `renderToString` 能获取到 html 结构；同时 client 端打包 `ReactDOM.hydrate` ；在 server 端返回的 html 结构内引用 client 端打包的 js，对 html 结构进行事件绑定。

- ### 如何处理数据
  - server 端可以用 getInitialProps （getStaticProps/getServerSideProps）方法获取异步数据，然后渲染到组件上，然后再通过 renderTotring 方法转换为 html结构
    - getInitialProps 只有在 page上才有此方法，目前猜测是因为后端路由的关系，一个路由对应一个页面，但是这个页面里面有多少组件这是未知的
  - client 端可以通过 useEffects 方法获取异步数据
  
  TODO：待手动实现 getInitialProps

- ### document is not defined
  根本原因: 
  ``` style-loader ``` 会将css打入js中，在js中生成style标签，使用 ``` document.createElement("style”)```; 然而服务端没有 ``` document ``` 这个api。
  使用 ``` mini-css-extract-plugin ``` 插件将css代码从 js文件中抽离出来,
  不要在服务端打包的js中使用 ``` document ``` ;

- ###  如何理解 getServerSideProps （getInitialProps）
  - #### async await
    - async 标志了当前函数的返回值为一个promise 对象；
    - await 等待一个表达式，如果是 函数hello 内部返回了一个promise对象，则 await阻塞接下来的代码执行。
    - async 默认会返回一个promise 对象。
      ```javascript
      async function hello() {
        console.log('hello');
        const a = await fetch('https://www.baidu.com');
        console.log('a: ', a)
        console.log('end.')
      }
      hello()
      // hello （console.log输出）     
      // Promise {<pending>}  （如果没有返回值，async 函数默认会返回一个promise对象）
      ```
      并没有输出 a 和end. 因为被阻塞了。
      ```js
      const b = async () => {
        return 1 + 1; // no
        // console.log('b'); no
        // return fetch('https://www.baidu.com'); yes
      }
      async function hello2() {
        console.log('hello');
        const a = await b;
        console.log('a: ', a)
        console.log('end.')
      }
      hello2()
      // hello
      // a: 2
      // end.
      // Promise {<pending>}  （如果没有返回值，async 函数默认会返回一个promise对象）

      /// await 这里不会阻塞后续表达式执行，因为 await后面不是一个promise对象
      ```


  