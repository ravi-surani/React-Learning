import React from 'react'
import { connect } from 'react-redux'
import { RemoveUserAction, ActiveUserAction } from '../../Redux/Actions'
function UserTableComponent({ FilterUsersList, OnEditUser, OnActiveChange, OnRemoveUser }) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contect Number</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {FilterUsersList ? FilterUsersList.map((User) =>
                    <tr key={User.id}>
                        <th ><input type='checkbox' onChange={() => OnActiveChange(User)} {...User.isactive ?? 'checked'} /></th>
                        <th scope="row">{User.id}</th>
                        <td style={{ textDecoration: !User.isactive ? 'line-through' : '' }}>{User.name}</td>
                        <td>{User.email}</td>
                        <td>{User.number}</td>
                        <td>{User.role}</td>
                        <td>
                            <button className='btn btn-info btn-sm' onClick={() => OnActiveChange(User)}>{User.isactive ? 'Inactive' : 'Active'}</button>
                            <button className='btn btn-primary btn-sm' onClick={() => OnEditUser(User)}>Update</button>
                            <button className='btn btn-danger btn-sm' onClick={() => window.confirm('Delete this record') ? OnRemoveUser(User) : null}>Remove</button>
                        </td>
                    </tr>)
                    : 'No data Found'}

            </tbody>
        </table>
    )
}

const dispatchToprops = (dispatch) => {
    return {
        OnActiveChange: (details) => dispatch(ActiveUserAction(details)),
        OnRemoveUser: (details) => dispatch(RemoveUserAction(details)),
    }
}
export default connect(null, dispatchToprops)(UserTableComponent)