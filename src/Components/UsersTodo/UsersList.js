import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { updateUserDetails, removeUser, signupAction, activeUser } from '../../Redux/Actions'
import UserTable from './UserTable'
function UsersList({ UsersList, ActiveUser, updateUser, removeUser, signupAction, activeUser }) {

    const [userDetails, setUserDetails] = useState({})
    const [showForm, setShowForm] = useState(false)

    useEffect(() => { setUserList(UsersList) }, [UsersList])

    const [userList, setUserList] = useState(UsersList)
    const AddOrEdit = useRef()
    const searchInput = useRef()
    const actionSelect = useRef()
    const sortSelect = useRef()

    function editUser(user) {
        setUserDetails(user)
        setShowForm(!showForm)
    }

    function submitform(event) {
        event.preventDefault();

        if (AddOrEdit.current.value === 'add') {
            signupAction(userDetails)
        }
        else if (AddOrEdit.current.value === 'edit') {

            updateUser(userDetails)
        }
        setShowForm(false)
        setUserDetails({})
    }

    function searchFilter() {

        let newlist = []
        if (searchInput.current.value.length) {
            newlist = UsersList.filter((user) => user.name === searchInput.current.value)
        }
        else {
            newlist = UsersList
        }
        if (actionSelect.current.value === '1') {
            newlist = newlist.filter((user) => user.active)
        }
        else if (actionSelect.current.value === '2') {
            newlist = newlist.filter((user) => !user.active)
        }
        else if (actionSelect.current.value === '0') {
            newlist = newlist
        }
        if (sortSelect.current.value === '0') {
            newlist.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        else if (sortSelect.current.value === '1') {
            newlist.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }

        setUserList([...newlist])
    }

    return (
        <div>
            {!ActiveUser && <Navigate to="/login" />}

            <div className="card" >

                <div className="card-header card">
                    <label>User List</label>
                    <div className='row'>
                        <div className='col-md-4'><input className='form-control form-control-sm' placeholder='Search' ref={searchInput} onChange={() => searchFilter()} /></div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" onChange={() => searchFilter()} ref={actionSelect}>
                                <option value="0" >All</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" onChange={() => searchFilter()} ref={sortSelect}>
                                <option value="0" >Name A-Z</option>
                                <option value="1">Name Z-A</option>
                            </select>
                        </div>
                        <div className='col-md-2 btn btn-info btn-sm' onClick={() => setShowForm(!showForm)}>Add</div>
                    </div>
                </div>
                <div className="card-body">
                    {((userDetails && userDetails.id) || showForm) &&
                        <form onSubmit={(e) => submitform(e)}>
                            <input type='hidden' ref={AddOrEdit} name='AddOrEdit' value={(userDetails && userDetails.id) ? 'edit' : 'add'} />
                            <input type='hidden' value={(userDetails && userDetails.id) ? userDetails.id : ''} readOnly />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <input type='text' placeholder='Name' className='form-control' value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='email' placeholder='Email' className='form-control' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='number' placeholder='Number' className='form-control' value={userDetails.number} onChange={(e) => setUserDetails({ ...userDetails, number: e.target.value })} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='text' placeholder='Role' className='form-control' value={userDetails.role} onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })} required />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                                <button className='btn btn-danger btn-sm' onClick={() => setShowForm(false)}>Calcle</button>
                            </div>
                        </form>
                    }


                    <UserTable activeUser={activeUser} editUser={editUser} removeUser={removeUser} userList={userList} />

                </div>


            </div>
        </div >
    )
}
const stateToProps = (state) => {

    return {
        ActiveUser: state.ActiveUser ?? false,
        UsersList: state.Users,
    }
}

const dispatchToprops = (dispatch) => {
    return {
        signupAction: (details) => dispatch(signupAction(details)),
        updateUser: (details) => dispatch(updateUserDetails(details)),
        removeUser: (details) => dispatch(removeUser(details)),
        activeUser: (details) => dispatch(activeUser(details)),
    }
}
export default connect(stateToProps, dispatchToprops)(UsersList)