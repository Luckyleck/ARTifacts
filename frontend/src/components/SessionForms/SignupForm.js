import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import logo from '../MainPage/assets/ART_white.png';


const SignupForm = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordType, setPasswordType] = useState('password')
  const [confirmType, setConfirmType] = useState('password')
  const errors = useSelector(state => state.errors.session);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

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

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
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

  return (
    <div className='session-modal'>
      <div className='welcome'>
          <img src={logo}></img>
          <p>Welcome to ARTifacts!</p>
      </div>

      <form className="session-form" onSubmit={handleSubmit}>
      <buttun className='closeForm' onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </buttun>

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

        <input
        type="submit"
        value="Sign Up"
        className='submit-form'
        // disabled
        />
      </form>
    </div>
  );
}

export default SignupForm;