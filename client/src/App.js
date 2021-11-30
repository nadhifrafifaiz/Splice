import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { checkLogin } from './redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './redux/actions/post';

import SignIn from './pages/Auth/SignIn';
import Register from './pages/Auth/Register';
import Posts from './pages/Posts/Posts';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile/Profile';
import Verification from "./pages/Auth/Verification";


function App() {
  const dispatch = useDispatch()
  const userGlobal = useSelector(state => state.user)
  const userLocalStorage = localStorage.getItem("token_slace")

  const keepLogin = () => {
    if (userLocalStorage) {
      dispatch(checkLogin(userLocalStorage))
    }
  }

  useEffect(() => {
    dispatch(getAllPosts())
    keepLogin()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Posts} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/verification/:token" component={Verification} exact />


        {userGlobal.isLogin ?
          <Redirect to="/" />
          :
          <>
            <Route path="/login" component={SignIn} exact />
            <Route path="/register" component={Register} exact />
          </>
        }

        <Route path="*"
          component={
            PageNotFound
          } />

      </Switch>
    </BrowserRouter >
  );
}

export default App;
