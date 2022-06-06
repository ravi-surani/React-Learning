import { Login, Logout, Signup, UpdateUser, RemoveUser, ActiveUser } from './Constents'

const LoginAction = (details) => {
    return {
        type: Login,
        LoginDetails: details,
    }
}
const SignupAction = (details) => {
    return {
        type: Signup,
        SignupDetails: details,
    }
}
const LogoutAction = () => {
    return {
        type: Logout,
    }
}
const UpdateUserAction = (details) => {
    return {
        type: UpdateUser,
        UpdateDetails: details
    }
}
const RemoveUserAction = (details) => {
    return {
        type: RemoveUser,
        RemoveDetails: details
    }
}

const ActiveUserAction = (details) => {
    return {
        type: ActiveUser,
        ActiveUserDetails: details
    }
}

export { LoginAction, SignupAction, LogoutAction, UpdateUserAction, RemoveUserAction, ActiveUserAction, }