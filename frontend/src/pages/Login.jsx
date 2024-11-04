import {useState, useEffect} from 'react'
import { FaSignInAlt} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth);
  const [login, {isLoading} ] = useLoginMutation();

  useEffect(()=>{
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo]);

  const submitForm = async(e) => {
    e.preventDefault();
    const data = {email, password};

    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (err) {
      const message = err?.data?.message || err.error;
      toast.error(message)
    }
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1> <FaSignInAlt/> Login </h1>
        <p> Login and start setting goals </p>
      </section>
      <section className='form'>
        <form onSubmit={submitForm}>
          
          <div className="form-group">
            <input 
            type="email" 
            className='form-control' 
            id='email' 
            name='email' 
            placeholder='Enter your email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className='form-control' 
              id='password' 
              name='password' 
              placeholder='Enter password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type='submit' className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login