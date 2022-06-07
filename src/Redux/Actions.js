import { LOGON, SIGNUP, LOGOUT, UPDATEUSER, REMOVEUSER, ACTIVEUSER, } from './Constents'

const LoginAction = (details) => {
    return {
        type: LOGON,
        LoginDetails: details,
    }
}
const SignupAction = (details) => {
    return {
        type: SIGNUP,
        SignupDetails: details,
    }
}
const LogoutAction = () => {
    return {
        type: LOGOUT,
    }
}
const UpdateUserAction = (details) => {
    return {
        type: UPDATEUSER,
        UpdateDetails: details
    }
}
const RemoveUserAction = (details) => {
    return {
        type: REMOVEUSER,
        RemoveDetails: details
    }
}

const ActiveUserAction = (details) => {
    return {
        type: ACTIVEUSER,
        ActiveUserDetails: details
    }
}

export { LoginAction, SignupAction, LogoutAction, UpdateUserAction, RemoveUserAction, ActiveUserAction, }