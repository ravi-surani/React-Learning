
import { Login, Logout, Signup, UpdateUser, RemoveUser, ActiveUser, Success, Error } from './Constents'
const storeData = {
    Users: [
        {
            id: '1',
            name: 'abc',
            password: '00',
            email: 'abc@mail.com',
            number: '123',
            role: 'admin',
            isactive: true,
        },
        {
            id: '2',
            name: 'bdef',
            password: '00',
            email: 'def@mail.com',
            number: '456',
            role: 'seller',
            isactive: true,
        },
        {
            id: '3',
            name: 'mno',
            password: '00',
            email: 'mno@mail.com',
            number: '789',
            role: 'user',
            isactive: true,
        },

    ]

}
const UserReducer = (store = storeData, action) => {
    switch (action.type) {
        case Login: {
            let UserFound = false
            store.Users.every(user => {
                if (user.email === action.LoginDetails.email && user.password === action.LoginDetails.password) {
                    UserFound = user
                    return false
                } else {
                    return true
                }
            })
            document.cookie = `${JSON.stringify(UserFound)}`

            let Result = UserFound ? { Success: true, ...UserFound } : { Success: false, Error: 'User Not Found.' }

            return { ...store, LogedInUser: Result }
        }
        case Signup: {
            action.SignupDetails.role = 'user'
            action.SignupDetails.id = store.Users.length + 1
            action.SignupDetails.isactive = true
            store.Users.push(action.SignupDetails)
            document.cookie = `${JSON.stringify(action.SignupDetails)}`

            return { ...store, LogedInUser: { Success: true, ...action.SignupDetails } }

        }
        case Logout: {
            document.cookie = document.cookie + ';expires=Mon Jun 05 2022 10:19:48 UTC'
            return { ...store, LogedInUser: false, }
        }
        case UpdateUser: {
            store.Users.forEach((user) => {
                if (user.id === action.UpdateDetails.id) {
                    user.name = action.UpdateDetails.name
                    user.email = action.UpdateDetails.email
                    user.number = action.UpdateDetails.number
                }
            })
            return { ...store, Users: [...store.Users], }
        }
        case RemoveUser: {
            let FilteredArray = store.Users.filter((user) => user.id !== action.RemoveDetails.id)
            return { ...store, Users: FilteredArray }
        }
        case ActiveUser: {
            store.Users.forEach((user) => {
                if (user.id === action.ActiveUserDetails.id) {
                    user.isactive = !user.isactive
                }
            })
            return { ...store, Users: [...store.Users], }
        }

        default: {
            return { ...store, LogedInUser: document.cookie ? JSON.parse(document.cookie) : false }
        }
    }
}

export { UserReducer } 