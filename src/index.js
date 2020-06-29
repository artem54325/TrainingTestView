import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Header from './views/layouts/_layoutHeader';
import Articles from './views/articles/index';
import CreateTests from './views/createTests/index';
import createThemes from './views/createThemes/index';
import Menu from './views/menu/index';
import Meeting from './views/meeting/index';
import TestingTests from './views/tests/index';
import Users from './views/users/index';
import VideoCall from './views/videoCalls/index';


const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Header/>
        <React.Fragment>
            <Switch>
                <Route path="/" component={Menu} exact={true}/>
                <Route path="/Articles" component={Articles}/>
                <Route path="/Tests" component={CreateTests}/>
                <Route path="/Themes" component={createThemes}/>
                <Route path="/Meeting" component={Meeting}/>
                <Route path="/Testing" component={TestingTests}/>
                <Route path="/Settings" component={Users}/>
                <Route path="/VideoCalls" component={VideoCall}/>
                {/* <Redirect to="/" /> */}
                <Route component={NoMatchPage} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
