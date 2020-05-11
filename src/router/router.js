import React, { Fragment } from 'react'
import {HashRouter as Router, Route, Switch, hashHistory,/* , Redirect */ 
Redirect} from 'react-router-dom'
import Login from '@pages/login';
import Main from '@pages/main';
import Home from '@pages/home';
import AlarmList from '@pages/alarm';
import Error404 from '@pages/error';
import TrendList from '@pages/trend';
import TableSpaceList from '@pages/tableSpace';
import SectionSpaceList from '@pages/section';
export default () => (
  //是否开启history模式
  <Router>
    <Switch>
			{/*主页面非精确匹配*/}
			<Route path='/main' component={(props) =>
         <Main {...props}>
					 <Switch>
					    <Route {...props} path="/main/home" component={Home}></Route>
					    <Route {...props} path="/main/alarm-list" component={AlarmList}></Route>
							<Route {...props} path="/main/trend-list" component={TrendList}></Route>
							<Route {...props} path="/main/tablespace" component={TableSpaceList}></Route>
							<Route {...props} path="/main/section-space" component={SectionSpaceList}></Route>
							<Route {...props} path="/main/sql-report" component={Home}></Route>
							<Route {...props} path="/main/sql-bind" component={Home}></Route>
							<Route {...props} path="/main/sql-bind1" component={Home}></Route>
					    <Redirect to="/main/home"/>
					 </Switch>
				 </Main>
			}/>
      <Route path="/login" component={Login} />
			<Route path='*' component={Error404}/>
    </Switch>
  </Router>
)
