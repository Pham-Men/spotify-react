import './App.css';
import AppRouter from "./router/AppRouter";
import {useEffect} from "react";
import AuthService from "./service/auth.service";

function App() {

  useEffect(() => {
    const hash = window.location.hash
    let token =localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      localStorage.setItem("token", token)
    }
    AuthService.getUserProfile().then(res => {
    }).catch(err => {
      console.log(err)
    })

    return () => {
      localStorage.removeItem("token")
  }
  }, [])
  return (
    <AppRouter/>
  );
}

export default App;
