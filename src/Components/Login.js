import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { LoginAction, SignupAction } from '../Redux/Actions'

function Login({ LogedInUser, OnLoginAction, OnSignupAction }) {

  const [LoginForm, SetLoginForm] = useState(true)
  const [UserDetails, SetUserDetails] = useState({})

  let navigate = useNavigate();

  useEffect(() => {
    if (LogedInUser.Success) {
      navigate("/");
    }
  }, [LogedInUser, navigate])

  function submitForm(event) {
    event.preventDefault();
    if (LoginForm) {
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
        <label onClick={() => SetLoginForm(true)}>Login/</label>
        <label onClick={() => SetLoginForm(false)}>Signup</label>
      </div>
      {LogedInUser.Error}
      <div className="card-body">
        <form onSubmit={(e) => submitForm(e)}>
          {!LoginForm &&
            <>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="name" value={UserDetails.name} onChange={OnDetailsChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Contect Number</label>
                <input type="number" className="form-control" name='number' id="number" value={UserDetails.number} onChange={OnDetailsChange} />
              </div>
            </>
          }
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="email" value={UserDetails.email} onChange={OnDetailsChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={UserDetails.password} onChange={OnDetailsChange} />
          </div>
          <button type="submit" className="btn btn-primary">{LoginForm ? 'Login' : 'Signup'}</button>
        </form>
      </div>
    </div >
  )
}

const stateToProps = (props) => {
  return {
    LogedInUser: props.LogedInUser,
  }
}

const dispatchToprops = (dispatch) => {
  return {
    OnSignupAction: (details) => dispatch(SignupAction(details)),
    OnLoginAction: (details) => dispatch(LoginAction(details))
  }
}

export default connect(stateToProps, dispatchToprops)(Login)