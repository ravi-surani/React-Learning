
import { Login, Logout, Signup, UpdateUser, RemoveUser, ActiveUser } from './Constents'
const storeData = {
    Users: [
        {
            id: '1',
            name: 'a',
            password: 'aa',
            email: 'aa@mail.com',
            number: '123',
            role: 'admin',
            active: true,
        },
        {
            id: '2',
            name: 'b',
            password: 'bb',
            email: 'bb@mail.com',
            number: '123',
            role: 'seller',
            active: true,
        },
        {
            id: '3',
            name: 'c',
            password: 'cc',
            email: 'cc@mail.com',
            number: '123',
            role: 'user',
            active: true,
        },

    ]

}
const loginReducer = (store = storeData, action) => {
    switch (action.type) {
        case Login: {
            let userFound = false
            store.Users.every(user => {
                if (user.email === action.loginDetails.email && user.password === action.loginDetails.password) {
                    userFound = user
                    return false
                } else {
                    return true
                }
            })
            return { ...store, ActiveUser: userFound }

        }
        case Signup: {
            action.signupDetails.role = 'user'
            action.signupDetails.id = store.Users.length + 1
            action.signupDetails.active = true
            store.Users.push(action.signupDetails)
            return { ...store, Users: [...store.Users], ActiveUser: action.signupDetails }
        }

        case Logout: {
            return { ...store, ActiveUser: false }
        }
        case UpdateUser: {
            store.Users.forEach((user) => {
                if (user.id === action.updateDetails.id) {
                    user.name = action.updateDetails.name
                    user.email = action.updateDetails.email
                    user.number = action.updateDetails.number
                }
            })
            return { ...store, Users: [...store.Users], }
        }
        case RemoveUser: {
            let newarr = store.Users.filter((user) => user.id != action.removeDetails.id)
            store.Users.filter((user) => user.id != action.removeDetails.id)

            return { ...store, Users: newarr }
        }

        case ActiveUser: {
            store.Users.forEach((user) => {
                if (user.id === action.ActiveUser.id) {
                    user.active = !user.active
                }
            })

            return { ...store, Users: [...store.Users], }
        }

        default: {
            return { ...store }
        }
    }
}

export { loginReducer } 