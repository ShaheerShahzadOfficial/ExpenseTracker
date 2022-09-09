import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import AuthReduers from "../Reducers/User";
import { ExpensesReducer, NewExpensesReducer} from "../Reducers/Expenses"

const rootReducer = combineReducers({
    Auth: AuthReduers,
    expenses:ExpensesReducer,
    AddExpense:NewExpensesReducer,
})


const initialState = {
}


const Store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)


export default Store