import React from 'react'

export default function UserTable({ userList, activeUser, editUser, removeUser }) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contect Number</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.length ? userList.map((user, index) =>
                    <tr key={index}>
                        <th scope="row">{user.id}</th>
                        <td style={{ textDecoration: !user.active ? 'line-through' : '' }}>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.number}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className='btn btn-info btn-sm' onClick={() => activeUser(user)}>{user.active ? 'Inactive' : 'Active'}</button>
                            <button className='btn btn-primary btn-sm' onClick={() => editUser(user)}>Update</button>
                            <button className='btn btn-danger btn-sm' onClick={() => window.confirm('Delete this record') ? removeUser(user) : ''}>Remove</button>
                        </td>
                    </tr>)
                    : 'No data Found'}

            </tbody>
        </table>
    )
}
