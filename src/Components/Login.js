import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router'
import { loginAction, signupAction } from '../Redux/Actions'

function Login({ loginStatus, loginAction, signupAction }) {

  const [loginForm, setLoginForm] = useState(true)
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submitForm(event) {
    event.preventDefault();
    if (loginForm) {
      loginAction({ email, password })
    }
    else {
      signupAction({ name, email, number, password })
    }
  }
  
  return (
    < div className="card" >
      {loginStatus && <Navigate to="/" />}
      <div className="card-header">
        <label onClick={() => setLoginForm(true)}>Login/</label>
        <label onClick={() => setLoginForm(false)}>Signup</label>
      </div>
      <div className="card-body">
        <form onSubmit={(e) => submitForm(e)}>
          {!loginForm &&
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>}
          {!loginForm &&
            <div className="mb-3">
              <label className="form-label">Contect Number</label>
              <input type="number" className="form-control" id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div >
  )
}


const stateToProps = (props) => {
  return {
    loginStatus: props.ActiveUser ?? false
  }
}
const dispatchToprops = (dispatch) => {
  return {
    signupAction: (details) => dispatch(signupAction(details)),
    loginAction: (details) => dispatch(loginAction(details))
  }
}

export default connect(stateToProps, dispatchToprops)(Login)