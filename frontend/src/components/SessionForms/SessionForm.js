import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors, login } from '../../store/session';
import logo from '../MainPage/assets/ART_white.png';
import { Modal } from '../context/Modal';
import LoginForm from './LoginForm';


const SessionForm = ({onClose, formType}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmType, setConfirmType] = useState('password');
  const errors = useSelector(state => state.errors.session);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState(formType)

  useEffect(() => {
    if (sessionUser) {
      onClose();
    }
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [onClose, dispatch, form]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSignupSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
    if (sessionUser) onClose();
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
    if (sessionUser) onClose();
  }

  const changePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return
    }
    setPasswordType('password');
  }

  const changeConfirmType = () => {
    if (confirmType === 'password') {
      setConfirmType('text');
      return
    }
    setConfirmType('password');
  }

  const switchSignInForm = () => {
    setForm('signin');
    setEmail('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setPasswordType('password');
    setConfirmType('password');
  }

  const switchSignUpForm = () => {
    setForm('signup');
    setEmail('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setPasswordType('password');
    setConfirmType('password');
  }

  return (
    <div className='session-modal'>
      <div className='welcome'>
          <img src={logo} alt='logo' />
          <p>Welcome to ARTifacts!</p>
          { form === 'signup' ? (
          <h3 className='switch'>Already have an account? <button onClick={switchSignInForm}>Log in</button></h3>):
          <h3 className='switch'>Don't have an account yet? <button onClick={switchSignUpForm}>Sign up</button></h3>}
      </div>

      {form === 'signup' ? (
      <form className="session-form" onSubmit={handleSignupSubmit}>
      <button className='closeForm' onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>

        
        <label>
          Email
        </label>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="example@user.io"
            className='session-input'
          />

        <div className="errors">{errors?.email}</div>
        
        <label>
          Username
        </label>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="example"
            className='session-input'
          />
        <div className="errors">{errors?.username}</div>
        
        <div className='input'>
        <label>
          Password
        </label>
          <input type={passwordType}
            value={password}
            onChange={update('password')}
            placeholder="******"
            className='session-input'
          />
          {passwordType === 'password' ?
          <i className="fa-solid fa-eye" onClick={changePasswordType}></i> :
          <i className="fa-solid fa-eye-slash" onClick={changePasswordType}></i>}
        </div>
        <div className="errors">{errors?.password}</div>
        
        <div className='input'>
        <label>
          Confirm Password
        </label>
          <input type={confirmType}
            value={password2}
            onChange={update('password2')}
            placeholder="******"
            className='session-input'
          />
        {confirmType === 'password' ?
        <i className="fa-solid fa-eye" onClick={changeConfirmType}></i> :
        <i className="fa-solid fa-eye-slash" onClick={changeConfirmType}></i>}
        </div>
        <div className="errors" id='confirm-error'>
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        
        {/* <input
          type="submit"
          value="Sign Up"
          className='submit-form'
          disabled={!email || !username || !password || password !== password2}
        /> */}

        { !email || !username || !password || password !== password2 ?
        <input
        type="submit"
        value="Sign Up"
        className='submit-form'
        /> :
        <input
        type="submit"
        value="Sign Up"
        className='submit-form'
        id='allow-submit'
        />
        }
      </form>) : (
               <form className="session-form" onSubmit={handleLoginSubmit}>
               <button className='closeForm' onClick={onClose}>
                   <i className="fa-solid fa-xmark"></i>
               </button>
               
               <label>
                   Email
               </label>
       
                   <input type="text"
                   value={email}
                   onChange={update('email')}
                   placeholder="Email"
                   className='session-input'
                   />
       
               <div className="errors">{errors?.email}</div>
               
               <label>
                   Password
               </label>
                   <input type="password"
                   value={password}
                   onChange={update('password')}
                   placeholder="Password"
                   className='session-input'
                   />
               
               <div className="errors">{errors?.password}</div>
       
               { !email || !password ?
               <input
                   type="submit"
                   value="Log In"
                   className='submit-form'
               /> : 
               <input
                   type="submit"
                   value="Log In"
                   className='submit-form'
                   id='allow-submit'
               />}
       
               </form>
      )}
    </div>
  );
}

export default SessionForm;