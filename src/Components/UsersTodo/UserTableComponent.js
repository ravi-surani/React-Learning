import React from 'react'
import { connect } from 'react-redux'
import { RemoveUserAction, ActiveUserAction } from '../../Redux/Actions'
function UserTableComponent({ FilteredUsersList, OnEditUser, OnActiveChange, OnRemoveUser }) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {FilteredUsersList ? FilteredUsersList.map((User) =>
                    <tr key={User.id}>
                        <th ><input type='checkbox' onChange={() => OnActiveChange(User)} {...User.isactive ?? 'checked'} /></th>
                        <th scope="row">{User.id}</th>
                        <td style={{ textDecoration: !User.isactive && 'line-through' }}>{User.name}</td>
                        <td>{User.email}</td>
                        <td>{User.number}</td>
                        <td>{User.role}</td>
                        <td className='btn-group'>
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