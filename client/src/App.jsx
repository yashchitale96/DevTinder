import Body from "./components/Body";

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {Provider} from 'react-redux';
import appStore from "./utils/appStore";
import Feed from './components/Feed';
import Connection from "./components/Connection";
import Request from "./components/Request";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connection  />} />
            <Route path="/request" element={<Request  />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
