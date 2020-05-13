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
import SqlReportList from '@pages/sqlReport';
import TrendMetric from '@pages/trendMetric';
import UserList from '@pages/user';
export default () => (
  //是否开启history模式
  <Router>
    <Switch>
			{/*主页面非精确匹配*/}
			<Route path='/main' component={(props) =>
         <Main {...props}>
					 <Switch>
					    <Route {...props} path="/main/alarm-list" component={AlarmList}></Route>
							<Route {...props} path="/main/trend-list" component={TrendList}></Route>
							<Route {...props} path="/main/tablespace" component={TableSpaceList}></Route>
							<Route {...props} path="/main/section-space" component={SectionSpaceList}></Route>
							<Route {...props} path="/main/sql-report" component={SqlReportList}></Route>
							<Route {...props} path="/main/trend-metric" component={TrendMetric}></Route>
							<Route {...props} path="/main/user-manager" component={UserList}></Route>
					    <Redirect to="/main/alarm-list"/>
					 </Switch>
				 </Main>
			}/>
      <Route path="/login" component={Login} />
			<Route path='*' component={Error404}/>
    </Switch>
  </Router>
)
