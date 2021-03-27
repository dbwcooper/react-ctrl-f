常见场景： 
   左右布局的页面，左边为 菜单栏，右边为content 。  
   左侧的菜单高度 需要根据右边的 content 内容高度 进行自适应。
```html 
<div className="container">
  <div className="left">
    <div className="left-child">left</div>
  </div>
  <div className="right">...</div>
</div>
```
### container 为 flex布局 
- #### left 容器内只有一级嵌套 left -> left-child
  left 设置 height: 100%;   
  left-child 设置 height: 100%;
- ##### left 容器内多级嵌套
  设置left 容器为 position:relative;  
  .left-child 设置 position: absolute; height: 100%;    
  tips: 需要自己处理 padding 和 margin 的溢出问题   

### container 为 float 布局
- #### left 容器一级/多级嵌套都适用
  设置 container 为 position:relative;    
  .left-child 设置position: absolute; height: 100%;  
  right 快需要给 margin-left实现代码分割;
  