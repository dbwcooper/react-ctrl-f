import React, { Component } from 'react'

export default class DemoScroll extends Component {

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // document.addEventListener('scroll', () => {
    //   console.log('window.scrollTop: ', document.documentElement.scrollTop)
    // });
    window.addEventListener('scroll', () => {
      console.log('  window window.scrollTop: ', window.scrollY);
      
    });
    
  }
  render() {
    return (
      <div style={{ height: '1000px' }}>
        <header style={{ height: '200px', background: 'green' }}>
          header 部分
        </header>
        <div style={{ minHeight: '600px' }}>
          <div style={{ height: '1000px', width: '300px', border: '1px solid red'}}>
            内容块
          </div>
        </div>
        <footer style={{ height: '200px', background: 'green' }}>
          footer
        </footer>
      </div>
    )
  }
}
