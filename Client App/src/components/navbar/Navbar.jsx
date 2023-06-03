import "./navbar.css"
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
const Navbar = () => {
const dispatch = useDispatch()
  useEffect(() => {
    const isLogin = sessionStorage.getItem('login')
    if (isLogin) {
      axios.get(`/userId/${isLogin}`)
        .then(user => {
          dispatch({ type: "login", payload: user.data });
      }).catch(err=>console.error(err))
    }
  },[])
  const navigate = useNavigate()
  const loginSore = useSelector(state=>state)

  

   
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">

        <span>{loginSore.user.username}</span>

          {!loginSore.isLogin && <button onClick={()=>navigate('/register')} className="navButton">Register</button>}
          {!loginSore.isLogin &&  <button onClick={()=>navigate('/login')} className="navButton">Login</button>}

          {loginSore.isLogin && <button onClick={()=>navigate('/transaction')} className="navButton">Transactions</button>}
          {loginSore.isLogin && <button onClick={() => {
            sessionStorage.removeItem('login') ; dispatch({type:'logout'})}} className="navButton">Logout</button>}

        </div>
      </div>
    </div>
  )
}

export default Navbar
