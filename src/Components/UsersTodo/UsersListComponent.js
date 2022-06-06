import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { UpdateUserAction, SignupAction } from '../../Redux/Actions'
import UserTableComponent from './UserTableComponent'

import { Search, Action, Sort } from '../../Redux/Constents'

function UsersListComponent({ UsersList, OnUpdateUser, OnSignupAction, }) {

    const [UserDetailsContainer, SetUserDetailsContainer] = useState({})
    const [FormVisible, SetFormVisible] = useState(false)
    const [FilterUsersList, SetFilterUsersList] = useState()
    const [SearchFilter, SetSearchFilter] = useState()
    const [ActionFilter, SetActionFilter] = useState()
    const [SortFilter, SetSortFilter] = useState()

    function OnEditUser(user) {
        SetUserDetailsContainer(user)
        SetFormVisible(true)
    }

    function submitform(event) {
        event.preventDefault();
        if (UserDetailsContainer.id) {
            OnUpdateUser(UserDetailsContainer)
        }
        else {
            OnSignupAction(UserDetailsContainer)
        }
        SetUserDetailsContainer({})
        SetFormVisible(false)
    }

    useEffect(() => {
        let newlist = UsersList

        if (SearchFilter) {
            newlist = newlist.filter((user) => user.name.includes(SearchFilter))
        }
        if (ActionFilter === Action.Active) {
            newlist = newlist.filter((user) => user.isactive)
        }
        else if (ActionFilter === Action.Inactive) {
            newlist = newlist.filter((user) => !user.isactive)
        }

        if (SortFilter === Sort.AZ) {
            newlist.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        else if (SortFilter === Sort.ZA) {
            newlist.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }

        SetFilterUsersList([...newlist])
    }, [UsersList, SearchFilter, ActionFilter, SortFilter])


    function OnUserDetailsChange(e) {
        SetUserDetailsContainer({ ...UserDetailsContainer, [e.target.name]: e.target.value })
    }


    return (
        <div>
            {/* {!ActiveUser && <Navigate to="/login" />} */}

            <div className="card" >

                <div className="card-header card">
                    <label>User List</label>
                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control form-control-sm' placeholder={Search} value={SearchFilter} onChange={(e) => SetSearchFilter(e.target.value)} />
                        </div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" value={ActionFilter} onChange={(e) => SetActionFilter(e.target.value)} >
                                <option value={Action.All} >{Action.All}</option>
                                <option value={Action.Active}>{Action.Active}</option>
                                <option value={Action.Inactive}>{Action.Inactive}</option>
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" value={SortFilter} onChange={(e) => SetSortFilter(e.target.value)} >
                                <option value={Sort.AZ} >Name {Sort.AZ}</option>
                                <option value={Sort.ZA}>Name {Sort.ZA}</option>
                            </select>
                        </div>
                        <div className='col-md-2 btn btn-info btn-sm' onClick={() => SetFormVisible(!FormVisible)}>Add</div>
                    </div>
                </div>
                <div className="card-body">
                    {FormVisible &&
                        <form onSubmit={(e) => submitform(e)}>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <input type='text' placeholder='Name' name='name' className='form-control' value={UserDetailsContainer.name} onChange={(e) => OnUserDetailsChange(e)} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='email' placeholder='Email' name='email' className='form-control' value={UserDetailsContainer.email} onChange={(e) => OnUserDetailsChange(e)} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='number' placeholder='Number' name='number' className='form-control' value={UserDetailsContainer.number} onChange={(e) => OnUserDetailsChange(e)} required />
                                </div>
                                <div className='col-md-3'>
                                    <input type='text' placeholder='Role' name='role' className='form-control' value={UserDetailsContainer.role} onChange={(e) => OnUserDetailsChange(e)} required />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                                <button className='btn btn-danger btn-sm' onClick={() => SetFormVisible(false)}>Calcle</button>
                            </div>
                        </form>
                    }



                    <UserTableComponent OnEditUser={OnEditUser} FilterUsersList={FilterUsersList} />

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
        OnSignupAction: (details) => dispatch(SignupAction(details)),
        OnUpdateUser: (details) => dispatch(UpdateUserAction(details)),
    }
}
export default connect(stateToProps, dispatchToprops)(UsersListComponent)