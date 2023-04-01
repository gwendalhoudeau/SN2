import React from 'react';
import ReactDOM from 'react-dom/frontend';
import App from './App';
import './styles/index.scss'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

//dev tools

import userReducer from './reducers/user.reducer';
import { getUsers } from './actions/users.actions';
import usersReducer from './reducers/users.reducer';
import postReducer from './reducers/post.reducer';
import { getPosts } from './actions/post.actions';
import errorReducer from './reducers/error.reducer';
import postsReducer from './reducers/posts.reducer';
import trendingReducer from './reducers/trending.reducer';


const store = configureStore({
    reducer: {
        user:userReducer,
        users:usersReducer,
        post:postReducer,
        error:errorReducer,
        allPosts:postsReducer,
        trending: trendingReducer
    }
})

store.dispatch(getUsers())
store.dispatch(getPosts())

const rootElement = ReactDOM.createRoot(document.getElementById('root'))
rootElement.render(
    <Provider store={store}>
        <App />
    </Provider>
)
