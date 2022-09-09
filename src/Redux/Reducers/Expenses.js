import {
    AddExpenseFail, AddExpenseRequest, AddExpenseReset, AddExpenseSuccess, GetAllExpenseFail, GetAllExpenseRequest, GetAllExpenseSuccess,
    DeleteExpenseSuccess, DeleteExpenseRequest, DeleteExpenseFail, DeleteExpenseReset,  UpdateExpenseRequest,   UpdateExpenseSuccess,UpdateExpenseFail,UpdateExpenseReset


} from "../constants"


const initialState = {
    expenses: [null],
    error: {},
    loading: false
}


export function ExpensesReducer(state = initialState, actions) {
    switch (actions.type) {
        case GetAllExpenseRequest:
            return {
                loading: true,
                expenses: []
            }

        case GetAllExpenseSuccess:
            return {
                loading: false,
                expenses: actions.payload,
            }

        case GetAllExpenseFail:
            return {
                loading: false,
                error: actions.payload
            }

        default:
            return state
    }
}




const initialStates = {
    expense: {},
    error: {},

}

export function NewExpensesReducer(state = initialStates, actions) {
    switch (actions.type) {
        case AddExpenseRequest:
        case DeleteExpenseRequest:
            case UpdateExpenseRequest:
            return {
                loading: true,
                ...state
            }
        case AddExpenseSuccess:
            return {
                success: true,
                loading: false,
                expense: actions.payload,
            }

        case DeleteExpenseSuccess:
        case UpdateExpenseSuccess:
            return {
                success: true,
                loading: false,
            }

        case AddExpenseFail:
        case DeleteExpenseFail:
            case UpdateExpenseFail:

            return {
                success: false,
                loading: false,
                error: actions.payload
            }
        case AddExpenseReset:
            return {
                ...state,
                success: false,
                expense: {},
                loading: false
            }

        case DeleteExpenseReset:
            case UpdateExpenseReset:
            return {
                success: false,
                loading: false
            }

        default:
            return state
    }
}


