import { LoadUserFail, LoadUserRequest, LoadUserSuccess,LOGOUT_USER,LOGOUT_USER_FAIL ,LoginFail, LoginRequest, LoginSuccess, RegisterFail, RegisterRequest, RegisterSuccess } from "../constants"

const initialState = {
    user: {},
    error: [],
    message: {}
}

export default function AuthReduers(state = initialState, actions) {
    switch (actions.type) {

        case RegisterRequest:
        case LoginRequest:
        case LoadUserRequest:
            return {
                loading: true
            }

        case LoginSuccess:
        case LoadUserSuccess:
            return {
                // ...state,
                loading: false,
                isAuthenticated: true,
                user: actions.payload
            }
            case RegisterSuccess:
                return {
                    // ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: actions.payload
                }

        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                message:actions.payload

            }

        case LoadUserFail:
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
                error: actions.payload
            }

        case RegisterFail:
        case LoginFail:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: actions.payload
            }


        case LOGOUT_USER_FAIL:
            return {
                error: actions.payload,
                loading: false,
            }

        default:
            return state
    }
}
