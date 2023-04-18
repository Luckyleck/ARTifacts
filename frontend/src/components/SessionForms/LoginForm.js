import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import logo from '../MainPage/assets/ART_white.png'

import { login, clearSessionErrors } from '../../store/session';

const LoginForm = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
        onClose();
    }
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [onClose, dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
    if (!sessionUser) onClose();
  }

  return (
    <div className='session-modal'>
    <div className='welcome'>
        <img src={logo} alt='logo' />
        <p>Welcome to ARTifacts!</p>
    </div>
        <form className="session-form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default LoginForm;