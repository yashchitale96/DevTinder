import Body from "./components/Body";

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {Provider} from 'react-redux';
import appStore from "./utils/appStore";
import Feed from './components/Feed';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
