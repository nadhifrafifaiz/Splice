import SignIn from './pages/Auth/SignIn';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from './pages/Auth/Register';
import Posts from './pages/Posts/Posts';
import { useEffect } from 'react';
import { checkLogin } from './redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile/Profile';
import { getALlPosts } from './redux/actions/post';


function App() {
  const dispatch = useDispatch()
  const userGlobal = useSelector(state => state.user)
  const userLocalStorage = localStorage.getItem("token_slace")

  const keepLogin = () => {
    dispatch(getALlPosts())
    if (userLocalStorage) {
      dispatch(checkLogin(userLocalStorage))
    }
  }

  useEffect(() => {
    keepLogin()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Posts} exact />
        <Route path="/profile" component={Profile} exact />


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
