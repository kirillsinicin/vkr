import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import TaskStore from './store/TaskStore';
import ProfileStore from './store/ProfileStore';
import ResponseStore from './store/ResponseStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        taskStore: new TaskStore(),
        profileStore: new ProfileStore(),
        responseStore: new ResponseStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
