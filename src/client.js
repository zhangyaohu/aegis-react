import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux'
import Routes from './router/router'
import store from './store'
import '@styles/base.less'
//创建ReactDOM挂载到root节点下
const HotRoutes = hot(Routes);
ReactDOM.render(
  //react-redux容器store为react-redux状态
  <Provider store={store}>
    {
    /*
     理由配置
    */
    }
    <HotRoutes />
  </Provider>,
  document.getElementById('root')
)
