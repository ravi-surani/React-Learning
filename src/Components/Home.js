import React from 'react'
import { Navigate, Link, } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutAction } from '../Redux/Actions'

function Home({ ActiveUser, logoutAction }) {

  
  return (
    <div>


      {!ActiveUser && <Navigate to="/login" />}
      <div className="card" >

        <div className="card-header">
          <label>Wecome {ActiveUser.name}</label>
          <button type="button" className="btn btn-outline-danger" onClick={() => logoutAction()}>Logout</button>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-horizontal">
            {ActiveUser.role === 'admin' && <li className="list-group-item" ><Link to='/userlist'> Manage Users</Link></li>}
            {(ActiveUser.role === 'admin' || ActiveUser.role === 'seller') && <li className="list-group-item">Manage Stores</li>}
            {(ActiveUser.role === 'admin' || ActiveUser.role === 'seller' || ActiveUser.role === 'user') && <li className="list-group-item">Manage Detils</li>}
          </ul>
        </div>

      </div>
    </div>
  )
}


const stateToProps = (props) => {
  return {
    ActiveUser: props.ActiveUser ?? false
  }
}
const dispatchToprops = (dispatch) => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}



export default connect(stateToProps, dispatchToprops)(Home)