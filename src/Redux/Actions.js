import { Login, Logout, Signup, UpdateUser, RemoveUser, ActiveUser } from './Constents'
const loginAction = (details) => {
    return {
        type: Login,
        loginDetails: details,
    }
}
const signupAction = (details) => {
    return {
        type: Signup,
        signupDetails: details,
    }
}
const logoutAction = () => {
    return {
        type: Logout,
    }
}
const updateUserDetails = (details) => {
    return {
        type: UpdateUser, updateDetails: details
    }
}
const removeUser = (details) => {
    return {
        type: RemoveUser, removeDetails: details
    }
}

const activeUser = (details) => {
    return {
        type: ActiveUser, ActiveUser: details
    }
}

export { loginAction, signupAction, logoutAction, updateUserDetails, removeUser, activeUser, }