import "./navbar.css"
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
const Navbar = () => {
  const navigate = useNavigate()
  const loginSore = useSelector(state=>state)

  

  const dispatch = useDispatch() 
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">

        <span>{loginSore.user.username}</span>

          {!loginSore.isLogin && <button onClick={()=>navigate('/register')} className="navButton">Register</button>}
          {!loginSore.isLogin &&  <button onClick={()=>navigate('/login')} className="navButton">Login</button>}

          {loginSore.isLogin && <button onClick={()=>navigate('/transaction')} className="navButton">Transactions</button>}
          {loginSore.isLogin &&  <button onClick={()=>dispatch({type:'logout'})} className="navButton">Logout</button>}

        </div>
      </div>
    </div>
  )
}

export default Navbar
