import SignIn from './pages/Auth/SignIn';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './pages/Auth/Register';
import Posts from './pages/Posts/Posts';
import { useEffect } from 'react';
import { checkLogin } from './redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './pages/PageNotFound';


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
    keepLogin()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        {userGlobal.isLogin === false &&
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </>
        }

        <Route path="*"
          element={
            <PageNotFound />
          } />

      </Routes>
    </BrowserRouter >
  );
}

export default App;
