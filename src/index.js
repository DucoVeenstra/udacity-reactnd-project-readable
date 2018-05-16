import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App';
import PostDetailPage from './components/post/PostDetailPage';
import PostFormNew from './components/post-form/PostForm_New';
import Page404 from './components/Page404';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/404" render={() => <Page404 />} />
        <Route path="/newPost" render={() => <PostFormNew />} />
        <Route path="/:category/:post_id" render={() => <PostDetailPage />} />
        <Route path="/:category" render={() => (<App />)} />
        <Route exact path="/" render={() => (<App />)} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
