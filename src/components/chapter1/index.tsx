import React from 'react';
import { example1, example2 } from './codeExample';
import CodePreview from '../common/CodePreview';
import './style.less';
import './style2.less';

let height = 200;
export default () => {
  const refRightDom = React.createRef<HTMLDivElement>();
  const refRightDom2 = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (refRightDom) {
      const timer = setInterval(() => {
        height += 10;
        refRightDom.current!.style.height = height + 'px';
        if (height > 300) {
          clearInterval(timer);
        }
      }, 1000);
    }
  }, []);
  React.useEffect(() => {
    if (refRightDom2) {
      const timer = setInterval(() => {
        height += 10;
        refRightDom2.current!.style.height = height + 'px';
        if (height > 300) {
          clearInterval(timer);
        }
      }, 1000);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="col-8">
          <div className="left">
            <div className="left-child">left</div>
          </div>
        </div>
        <div className="col-16">
          <div className="right" ref={refRightDom}>
            right <div>js 让这个块自动增高</div>
          </div>
        </div>
      </div>
      <div>
        <h3>1. 父容器为 flex布局</h3>
        <ol className="common-ul">
          <li>
            <p>left容器内只有一级嵌套；</p>
            <p className="active">left 设置 height：100%</p>
            <p className="active">left-child 设置 height: 100%;</p>
            <CodePreview>{example1}</CodePreview>
          </li>
          <li>
            <p>left容器内多级嵌套；</p>
            <p className="active">
              <ul>
                <li>设置left容器 为 position: relative;</li>
                <li>.left-child 设置position: absolute; height: 100%;</li>
                <li>tips: 需要自己处理 padding 和margin 溢出的问题</li>
              </ul>
            </p>
            <CodePreview>{example2}</CodePreview>
          </li>
        </ol>
      </div>
      <div>
        <h3>2. 父容器为 float</h3>
        <ul>
          <li>设置 container 为 position: relative;</li>
          <li>.left-child 设置position: absolute; height: 100%;</li>
          <li>
            tips: 如果 right于left一样 也为 float 布局，此时必须给left加一个定宽
          </li>
        </ul>
      </div>
      <div className="container-2">
        <div className="col-8">
          <div className="left">
            <div>
              <div>
                <div>left</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-16">
          <div className="right" ref={refRightDom2}>
            right <div>js 让这个块自动增高</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
