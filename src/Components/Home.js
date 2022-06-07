import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { LogoutAction } from '../Redux/Actions'


function Home({ LogedInUser, OnLogoutAction }) {

  
  let navigate = useNavigate();

  useEffect(() => {
    if (!LogedInUser) {
      navigate("/login");
    }
  }, [LogedInUser,navigate])

  return (
    <div>
      <div className="card" >

        <div className="card-header">
          <label>Wecome {LogedInUser.name}</label>
          <button type="button" className="btn btn-outline-danger" onClick={() => OnLogoutAction()}>Logout</button>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-horizontal">
            {LogedInUser.role === 'admin' && <li className="list-group-item" ><Link to='/userlist'> Manage Users</Link></li>}
            {(LogedInUser.role === 'admin' || LogedInUser.role === 'seller') && <li className="list-group-item">Manage Stores</li>}
            {(LogedInUser.role === 'admin' || LogedInUser.role === 'seller' || LogedInUser.role === 'user') && <li className="list-group-item">Manage Detils</li>}
          </ul>
        </div>

      </div>
    </div>
  )
}


const stateToProps = (state) => {

  return {
    LogedInUser: state.LogedInUser
  }
}
const dispatchToprops = (dispatch) => {
  return {
    OnLogoutAction: () => dispatch(LogoutAction())
  }
}

export default connect(stateToProps, dispatchToprops)(Home)