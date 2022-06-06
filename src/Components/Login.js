import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { LoginAction, SignupAction } from '../Redux/Actions'

function Login({ loginStatus, OnLoginAction, OnSignupAction }) {

  const [loginForm, setLoginForm] = useState(true)
  const [UserDetails, SetUserDetails] = useState({})

  let navigate = useNavigate();

  useEffect(() => {
    if (loginStatus.Success) {
      navigate("/");
    }
  }, [loginStatus])

  function submitForm(event) {
    event.preventDefault();
    if (loginForm) {
      OnLoginAction(UserDetails)
    }
    else {
      OnSignupAction(UserDetails)
    }
  }

  function OnDetailsChange(e) {
    SetUserDetails({ ...UserDetails, [e.target.name]: e.target.value.toLocaleLowerCase() })
  }



  return (
    < div className="card" >

      <div className="card-header">
        <label onClick={() => setLoginForm(true)}>Login/</label>
        <label onClick={() => setLoginForm(false)}>Signup</label>
      </div>

      {!loginStatus.Success && loginStatus.Error}

      <div className="card-body">
        <form onSubmit={(e) => submitForm(e)}>
          {!loginForm &&
            <>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="name" value={UserDetails.name} onChange={(e) => OnDetailsChange(e)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Contect Number</label>
                <input type="number" className="form-control" name='number' id="number" value={UserDetails.number} onChange={(e) => OnDetailsChange(e)} />
              </div>
            </>
          }
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="email" value={UserDetails.email} onChange={(e) => OnDetailsChange(e)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={UserDetails.password} onChange={(e) => OnDetailsChange(e)} />
          </div>
          <button type="submit" className="btn btn-primary">{loginForm ? 'Login' : 'Signup'}</button>
        </form>
      </div>
    </div >
  )
}


const stateToProps = (props) => {
  return {
    loginStatus: props.LogedInUser,
  }
}
const dispatchToprops = (dispatch) => {
  return {
    OnSignupAction: (details) => dispatch(SignupAction(details)),
    OnLoginAction: (details) => dispatch(LoginAction(details))
  }
}

export default connect(stateToProps, dispatchToprops)(Login)