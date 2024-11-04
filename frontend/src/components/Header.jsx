import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearCredentials } from "../slices/authSlice"
import { useLogoutMutation } from "../slices/userApiSlice"
import { toast } from "react-toastify"


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {userInfo} = useSelector((state)=>state.auth);
  const [logout] = useLogoutMutation();
  
  const onLogout = async(e) => {
    e.preventDefault();
    
    try {
      await logout().unwrap();
      dispatch(clearCredentials())
      navigate('/login')
    } catch (err) {
      const msg = err?.data?.message || err.error;
      toast.error(message)
    }
  }


  return (
    <header className="header" >
      <div className="logo">
        <Link to="/" >GoalSetter</Link>        
      </div>
      <ul>
        {userInfo? <li><button className="btn btn-reverse" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button></li> :
        <>
          <li><NavLink to= "/login">
            <FaSignInAlt /> Login
          </NavLink></li>
          <li><NavLink to= "/register">
            <FaUser /> Register
          </NavLink></li>
        </> }        
      </ul>

    </header>
  )
}

export default Header