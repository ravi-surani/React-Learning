import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { UpdateUserAction, SignupAction } from '../../Redux/Actions'
import UserTableComponent from './UserTableComponent'
import { useNavigate } from 'react-router-dom'
import { SEARCH, ACTION, SORT } from '../../Redux/Constents'

function UsersListComponent({ UsersList, OnUpdateUser, OnSignupAction, LogedInUser }) {

    const [UserDetailsContainer, SetUserDetailsContainer] = useState({})
    const [FormVisible, SetFormVisible] = useState(false)
    const [FilteredUsersList, SetFilteredUsersList] = useState()
    const [FiltersContainer, SetFiltersContainer] = useState({ SortFilter: SORT.AZ })


    let navigate = useNavigate();
    useEffect(() => {
        if (!LogedInUser) {
            navigate("/login");
        }
    }, [LogedInUser, navigate])

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
        let NewList = UsersList

        if (FiltersContainer.SearchedText) {
            NewList = NewList.filter((user) => user.name.includes(FiltersContainer.SearchedText))
        }
        if (FiltersContainer.ActionFilter === ACTION.ACTIVE) {
            NewList = NewList.filter((user) => user.isactive)
        }
        else if (FiltersContainer.ActionFilter === ACTION.INACTIVE) {
            NewList = NewList.filter((user) => !user.isactive)
        }

        if (FiltersContainer.SortFilter === SORT.AZ) {
            NewList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        else if (FiltersContainer.SortFilter === SORT.ZA) {
            NewList.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        SetFilteredUsersList([...NewList])
    }, [UsersList, FiltersContainer])

    function OnUserDetailsChange(e) {
        SetUserDetailsContainer({ ...UserDetailsContainer, [e.target.name]: e.target.value })
    }

    function OnFilterChange(e) {
        SetFiltersContainer({ ...FiltersContainer, [e.target.name]: e.target.value })
    }

    function OnHideForm() {
        SetFormVisible(false)
        SetUserDetailsContainer(null)
    }

    return (
        <div>
            <div className="card" >
                <div className="card-header card">
                    <label>User List</label>
                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control form-control-sm' placeholder={SEARCH} value={FiltersContainer.SearchedText} name='SearchedText' onChange={OnFilterChange} />
                        </div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" value={FiltersContainer.ActionFilter} name='ActionFilter' onChange={OnFilterChange} >
                                <option value={ACTION.ALL} >{ACTION.ALL}</option>
                                <option value={ACTION.ACTIVE}>{ACTION.ACTIVE}</option>
                                <option value={ACTION.INACTIVE}>{ACTION.INACTIVE}</option>
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <select className="form-select form-select-sm" value={FiltersContainer.SortFilter} name='SortFilter' onChange={OnFilterChange} >
                                <option value={SORT.AZ} >Name {SORT.AZ}</option>
                                <option value={SORT.ZA}>Name {SORT.ZA}</option>
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
                                    <input type='text' placeholder='Name' name='name' className='form-control' value={UserDetailsContainer.name || ''} onChange={OnUserDetailsChange} />
                                </div>
                                <div className='col-md-3'>
                                    <input type='email' placeholder='Email' name='email' className='form-control' value={UserDetailsContainer.email || ''} onChange={OnUserDetailsChange} />
                                </div>
                                <div className='col-md-3'>
                                    <input type='number' placeholder='Number' name='number' className='form-control' value={UserDetailsContainer.number || ''} onChange={OnUserDetailsChange} />
                                </div>
                                <div className='col-md-3'>
                                    <input type='text' placeholder='Role' name='role' className='form-control' value={UserDetailsContainer.role || ''} onChange={OnUserDetailsChange} />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                                <button className='btn btn-danger btn-sm' onClick={OnHideForm}>Calcle</button>
                            </div>
                        </form>
                    }
                    <UserTableComponent OnEditUser={OnEditUser} FilteredUsersList={FilteredUsersList} />
                </div>
            </div>
        </div>
    )
}
const StateToProps = (state) => {
    return {
        LogedInUser: state.LogedInUser,
        UsersList: state.Users,
    }
}

const DispatchToprops = (dispatch) => {
    return {
        OnSignupAction: (details) => dispatch(SignupAction(details)),
        OnUpdateUser: (details) => dispatch(UpdateUserAction(details)),
    }
}
export default connect(StateToProps, DispatchToprops)(UsersListComponent)