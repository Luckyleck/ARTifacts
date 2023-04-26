import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors, login } from '../../store/session';
import logo from '../MainPage/assets/ART_white.png';

const SessionForm = ({onClose, formType}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmType, setConfirmType] = useState('password');
  const errors = useSelector(state => state.errors.session);
  const sessionUser = useSelector(state => state.session.user);
  const [form, setForm] = useState(formType);

  useEffect(() => {
    if (sessionUser) onClose();
    return () => dispatch(clearSessionErrors());
  }, [dispatch, sessionUser, form, onClose]);

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
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
    if (sessionUser) onClose();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
    if (sessionUser) onClose();
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: 'demo-user@appacademy.io', password: 'starwars' }));
  };

  const changePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const changeConfirmType = () => {
    if (confirmType === 'password') {
      setConfirmType('text');
      return;
    }
    setConfirmType('password');
  };

  const switchSignInForm = () => {
    setForm('signin');
    setEmail('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setPasswordType('password');
    setConfirmType('password');
  };

  const switchSignUpForm = () => {
    setForm('signup');
    setEmail('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setPasswordType('password');
    setConfirmType('password');
  };

  return (
    <div className="session-modal">
      <div className="welcome">
        <img src={logo} alt="logo" />
        <p>Welcome to ARTifacts!</p>
        {form === 'signup' ? (
          <h3 className="switch">Already have an account?<button onClick={switchSignInForm}>Log in</button></h3>
        ) : (
          <h3 className="switch">Don"t have an account yet?<button onClick={switchSignUpForm}>Sign up</button></h3>
        )}
      </div>

      {form === 'signup' ? (
        <form className="session-form">
          <button type="button" onClick={onClose} className="close-form">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={update('email')}
            placeholder="example@user.io"
            className="session-input"
            autoComplete="false"
          />
          <div className="errors">{errors?.email}</div>
          <label>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={update('username')}
            placeholder="example"
            className="session-input"
            autoComplete="false"
          />
          <div className="errors">{errors?.username}</div>
          <div className="input">
            <label>
              Password
            </label>
            <input
              type={passwordType}
              value={password}
              onChange={update('password')}
              placeholder="******"
              className="session-input"
              autoComplete="false"
            />
            {passwordType === 'password' ? (
              <i onClick={changePasswordType} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={changePasswordType} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
          <div className="errors">{errors?.password}</div>
          <div className="input">
            <label>
              Confirm Password
            </label>
            <input
              type={confirmType}
              value={password2}
              onChange={update('password2')}
              placeholder="******"
              className="session-input"
              autoComplete="false"
            />
            {confirmType === 'password' ? (
              <i onClick={changeConfirmType} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={changeConfirmType} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
          <div id="confirm-error" className="errors">
            {password !== password2 && (
              "Confirm Password field must match"
            )}
          </div>
          {!username || !email || !password || password !== password2 ? (
            <button
              type="submit"
              onClick={handleSignupSubmit}
              className="submit-form"
            >Sign Up</button>
          ) : (
            <button
              type="submit"
              onClick={handleSignupSubmit}
              id="allow-submit"
              className="submit-form"
            >Sign Up</button>
          )}
        </form>
      ) : (
        <form className="session-form">
          <button type="button" onClick={onClose} className="close-form">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className="session-input"
            autoComplete="false"
          />
          <div className="errors">{errors?.email}</div>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className="session-input"
            autoComplete="false"
          />
          <div className="errors">{errors?.password}</div>
          {!email || !password ? (
            <button
                type="submit"
                value="Log In"
                className="submit-form"
                onClick={handleLoginSubmit}
                disabled
              >Log In</button>
          ) : ( 
            <button
              type="submit"
              onClick={handleLoginSubmit}
              className="submit-form allow-submit"
            >Log In</button>
          )}
          <button
            type="submit"
            onClick={demoLogin}
            id="demo-login"
            className="submit-form allow-submit"
          >Demo Login</button>
        </form>
      )}
    </div>
  );
};

export default SessionForm;