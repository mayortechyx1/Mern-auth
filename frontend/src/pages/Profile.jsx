import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useUpdateMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Update = () => {
  const {userInfo} = useSelector((state)=>state.auth);

  // useStates for the form fields
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const dispatch = useDispatch();

  const [update, {isLoading}] = useUpdateMutation();

  useEffect(()=>{}, []);

  //submit function 
  const submitForm = async(e) => {
    e.preventDefault();
    
    if (password!=password2) {
      toast.error("Passwords do not match")
    }
    else {
      const data = {
        name, email, password
      }
      try {
        const res = await update(data).unwrap()
        dispatch(setCredentials({...res}))        
        toast.success("profile updated successfully")
      } catch (err) {
        toast.error(err?.data?.message||err.error)
      }
    }
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1> <FaUser/> Update Profile</h1>
        <p></p>
      </section>
      <section className='form'>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <input 
            type="text" 
            className='form-control' 
            id='name' 
            name='name' 
            placeholder='Enter your name' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <input 
            type="password" 
            className='form-control' 
            id='password2' 
            name='password2' 
            placeholder='Confirm password' 
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type='submit' className="btn btn-block">update</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Update